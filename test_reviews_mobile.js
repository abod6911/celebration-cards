const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('file:///C:/مشاريع mit/مشورع بطايق الاحتفالات/index.html');
  await page.waitForTimeout(600);
  const reviewsEl = await page.$('#reviews');
  await reviewsEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const out = path.join(__dirname, 'test_screenshots', '04_mobile_reviews_section.png');
  await page.screenshot({ path: out });
  fs.copyFileSync(out, 'C:\\Users\\abodv\\.gemini\\antigravity\\brain\\ba617099-45ee-499b-978a-def935daa014\\04_mobile_reviews_section.png');
  console.log('Saved mobile reviews screenshot:', out);
  await browser.close();
})();
