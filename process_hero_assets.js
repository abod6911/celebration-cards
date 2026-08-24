const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('🌸 Processing and extracting transparent Hero assets...');

  const brainDir = 'C:\\Users\\abodv\\.gemini\\antigravity\\brain\\ba617099-45ee-499b-978a-def935daa014';
  const outDir = path.join(__dirname, 'assets', 'hero');

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Find latest generated files in brainDir
  const brainFiles = fs.readdirSync(brainDir);
  
  function getLatest(prefix) {
    const matches = brainFiles.filter(f => f.startsWith(prefix) && f.endsWith('.jpg'));
    matches.sort();
    return matches.length ? path.join(brainDir, matches[matches.length - 1]) : null;
  }

  const assetsToProcess = [
    { name: 'mandeline-hero-01-ivory', src: getLatest('mandeline_hero_01_ivory') },
    { name: 'mandeline-hero-02-blush', src: getLatest('mandeline_hero_02_blush') },
    { name: 'mandeline-hero-03-burgundy', src: getLatest('mandeline_hero_03_burgundy') },
    { name: 'mandeline-hero-04-orchid', src: getLatest('mandeline_hero_04_orchid') },
    { name: 'mandeline-fg-branch', src: getLatest('mandeline_fg_branch') }
  ];

  const bgSrc = getLatest('mandeline_hero_bg');
  if (bgSrc) {
    const bgDest = path.join(outDir, 'mandeline-hero-bg.jpg');
    fs.copyFileSync(bgSrc, bgDest);
    console.log(`✅ Copied atmospheric background -> ${bgDest}`);
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  for (const asset of assetsToProcess) {
    if (!asset.src) {
      console.warn(`⚠️ Source file not found for ${asset.name}`);
      continue;
    }

    console.log(`🔄 Processing ${asset.name} from ${path.basename(asset.src)}...`);
    const imgDataUrl = `data:image/jpeg;base64,${fs.readFileSync(asset.src).toString('base64')}`;

    const processedData = await page.evaluate(async (dataUrl) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgData.data;
          const len = data.length;

          // Black threshold parameters
          const darkThreshold = 10;
          const blendRange = 28; // 10 to 38

          for (let i = 0; i < len; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // Maximum color intensity
            const maxVal = Math.max(r, g, b);

            if (maxVal <= darkThreshold) {
              data[i + 3] = 0; // Completely transparent
            } else if (maxVal < darkThreshold + blendRange) {
              // Smooth cosine transition for antialiased edges
              const t = (maxVal - darkThreshold) / blendRange;
              const alphaFactor = 0.5 * (1 - Math.cos(Math.PI * t));
              const alpha = Math.round(alphaFactor * 255);
              data[i + 3] = alpha;

              // De-blacken edge fringe
              if (alphaFactor > 0.05) {
                data[i] = Math.min(255, Math.round(r / alphaFactor));
                data[i + 1] = Math.min(255, Math.round(g / alphaFactor));
                data[i + 2] = Math.min(255, Math.round(b / alphaFactor));
              }
            } else {
              data[i + 3] = 255;
            }
          }

          ctx.putImageData(imgData, 0, 0);

          resolve({
            png: canvas.toDataURL('image/png'),
            webp: canvas.toDataURL('image/webp', 0.92)
          });
        };
        img.src = dataUrl;
      });
    }, imgDataUrl);

    // Save PNG
    const pngBuffer = Buffer.from(processedData.png.replace(/^data:image\/png;base64,/, ''), 'base64');
    const pngPath = path.join(outDir, `${asset.name}.png`);
    fs.writeFileSync(pngPath, pngBuffer);

    // Save WebP
    const webpBuffer = Buffer.from(processedData.webp.replace(/^data:image\/webp;base64,/, ''), 'base64');
    const webpPath = path.join(outDir, `${asset.name}.webp`);
    fs.writeFileSync(webpPath, webpBuffer);

    const pngStat = fs.statSync(pngPath);
    const webpStat = fs.statSync(webpPath);
    console.log(`✅ Saved ${asset.name}.webp (${(webpStat.size / 1024).toFixed(1)} KB) & .png (${(pngStat.size / 1024).toFixed(1)} KB)`);
  }

  await browser.close();
  console.log('🎉 All transparent Hero assets extracted successfully!');
})();
