const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const http = require('http');

const PORT = 8088;
const workspaceDir = __dirname;

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0].replace(/^\//, ''));
  if (!reqPath || reqPath === '') reqPath = 'index.html';
  const filePath = path.join(workspaceDir, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html; charset=utf-8',
      '.js': 'text/javascript; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml'
    };
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, async () => {
  console.log(`Test server running at http://localhost:${PORT}`);
  
  const screenshotsDir = path.join(workspaceDir, 'test_screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const viewports = [
    { name: 'desktop_1920', width: 1920, height: 1080 },
    { name: 'desktop_1440', width: 1440, height: 900 },
    { name: 'laptop_1366', width: 1366, height: 768 },
    { name: 'tablet_1024', width: 1024, height: 768 },
    { name: 'tablet_portrait', width: 768, height: 1024 },
    { name: 'mobile_pro_max', width: 430, height: 932 },
    { name: 'mobile_standard', width: 390, height: 844 },
    { name: 'mobile_compact', width: 375, height: 812 }
  ];

  let totalErrors = 0;

  for (const vp of viewports) {
    console.log(`\n--- Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.error(`[Browser Error]: ${msg.text()}`);
        errors.push(msg.text());
      }
    });
    page.on('pageerror', err => {
      console.error(`[Page Error]: ${err.message}`);
      errors.push(err.message);
    });

    await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    // 1. Initial State Screenshot (Mosaic / Hero Top)
    await page.screenshot({ path: path.join(screenshotsDir, `${vp.name}_01_top.png`) });

    // 2. Scroll to Hero
    await page.evaluate(() => window.scrollTo({ top: 300, behavior: 'instant' }));
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(screenshotsDir, `${vp.name}_02_hero.png`) });

    // 3. Scroll to How It Works (Ripple Scene)
    await page.evaluate(() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'instant' }));
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(screenshotsDir, `${vp.name}_03_how_it_works.png`) });

    // 4. Scroll to Bento Feature Grid
    await page.evaluate(() => document.getElementById('bento-section')?.scrollIntoView({ behavior: 'instant' }));
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(screenshotsDir, `${vp.name}_04_bento.png`) });

    // 5. Scroll to Large Typography Statement
    await page.evaluate(() => document.getElementById('statement-section')?.scrollIntoView({ behavior: 'instant' }));
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(screenshotsDir, `${vp.name}_05_typography_statement.png`) });

    // 6. Scroll to Collections
    await page.evaluate(() => document.getElementById('collections-section')?.scrollIntoView({ behavior: 'instant' }));
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(screenshotsDir, `${vp.name}_06_collections.png`) });

    // 7. Scroll to Testimonials
    await page.evaluate(() => document.getElementById('testimonials-section')?.scrollIntoView({ behavior: 'instant' }));
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(screenshotsDir, `${vp.name}_07_testimonials.png`) });

    // 8. Scroll to Grand Footer
    await page.evaluate(() => document.getElementById('atelier-footer')?.scrollIntoView({ behavior: 'instant' }));
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(screenshotsDir, `${vp.name}_08_footer.png`) });

    // 9. Test Language Switcher
    if (vp.name === 'desktop_1440') {
      const langBtn = await page.$('#lang-toggle-btn');
      if (langBtn) {
        await langBtn.click();
        await page.waitForTimeout(300);
        await page.screenshot({ path: path.join(screenshotsDir, `${vp.name}_09_english_toggle.png`) });
        console.log('Language switcher toggled to English successfully.');
      }
    }

    if (errors.length > 0) {
      console.error(`Viewport ${vp.name} had ${errors.length} errors.`);
      totalErrors += errors.length;
    } else {
      console.log(`Viewport ${vp.name} PASSED with 0 errors.`);
    }

    await page.close();
  }

  await browser.close();
  server.close();

  console.log(`\n========================================`);
  console.log(`QA Verification Complete. Total Errors: ${totalErrors}`);
  console.log(`========================================`);
  process.exit(totalErrors > 0 ? 1 : 0);
});
