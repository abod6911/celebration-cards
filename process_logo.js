const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const logoBase64 = fs.readFileSync(path.join(__dirname, 'assets', 'images', 'medellin-logo.webp')).toString('base64');
  const dataUri = `data:image/webp;base64,${logoBase64}`;

  const result = await page.evaluate(async (imgSrc) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        const size = Math.min(w, h);

        // 1. Transparent Color Variants (Light, Gold, Dark)
        function createVariant(color) {
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');

          ctx.drawImage(img, 0, 0);
          const imgData = ctx.getImageData(0, 0, w, h);
          const d = imgData.data;

          for (let i = 0; i < d.length; i += 4) {
            const r = d[i];
            const g = d[i + 1];
            const b = d[i + 2];
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;

            // Invert luminance for alpha (dark lines become opaque, white becomes transparent)
            let alpha = 255 - lum;
            if (alpha < 30) alpha = 0;
            else alpha = Math.min(255, (alpha - 30) * 1.35);

            if (color === 'gold') {
              d[i] = 212;
              d[i + 1] = 175;
              d[i + 2] = 55;
            } else if (color === 'light') {
              d[i] = 255;
              d[i + 1] = 255;
              d[i + 2] = 255;
            } else if (color === 'dark') {
              d[i] = 18;
              d[i + 1] = 16;
              d[i + 2] = 15;
            }
            d[i + 3] = alpha;
          }

          ctx.putImageData(imgData, 0, 0);
          return canvas.toDataURL('image/png');
        }

        // 2. Circular Cropped Clean Badge (Original black on white circular badge with transparent outside)
        function createCircularBadge(isDark) {
          const canvas = document.createElement('canvas');
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext('2d');

          // Circular clip
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, (size / 2) - 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();

          if (isDark) {
            ctx.fillStyle = '#090807';
            ctx.fill();
            // Draw light variant centered
            const lightCanvas = document.createElement('canvas');
            lightCanvas.width = w;
            lightCanvas.height = h;
            const lCtx = lightCanvas.getContext('2d');
            lCtx.drawImage(img, 0, 0);
            const lData = lCtx.getImageData(0, 0, w, h);
            const ld = lData.data;
            for (let i = 0; i < ld.length; i += 4) {
              const lum = 0.299 * ld[i] + 0.587 * ld[i + 1] + 0.114 * ld[i + 2];
              let alpha = 255 - lum;
              if (alpha < 30) alpha = 0;
              else alpha = Math.min(255, (alpha - 30) * 1.35);
              ld[i] = 245;
              ld[i + 1] = 230;
              ld[i + 2] = 190;
              ld[i + 3] = alpha;
            }
            lCtx.putImageData(lData, 0, 0);
            ctx.drawImage(lightCanvas, (size - w) / 2, (size - h) / 2);
          } else {
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
            ctx.drawImage(img, (size - w) / 2, (size - h) / 2);
          }

          return canvas.toDataURL('image/png');
        }

        resolve({
          light: createVariant('light'),
          gold: createVariant('gold'),
          dark: createVariant('dark'),
          badgeWhite: createCircularBadge(false),
          badgeDark: createCircularBadge(true)
        });
      };
      img.src = imgSrc;
    });
  }, dataUri);

  function saveBase64(dataUrl, filename) {
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    fs.writeFileSync(path.join(__dirname, 'assets', 'images', filename), base64Data, 'base64');
    console.log(`Saved ${filename}`);
  }

  saveBase64(result.light, 'medellin-logo-light.png');
  saveBase64(result.gold, 'medellin-logo-gold.png');
  saveBase64(result.dark, 'medellin-logo-dark.png');
  saveBase64(result.badgeWhite, 'medellin-logo-badge-white.png');
  saveBase64(result.badgeDark, 'medellin-logo-badge-dark.png');

  await browser.close();
})();

