const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
  await page.goto('file:///C:/مشاريع mit/مشورع بطايق الاحتفالات/index.html');
  await page.waitForTimeout(500);
  const reviewsCount = await page.$$eval('#reviews-stage .review-card', els => els.length);
  console.log('Reviews count in DOM:', reviewsCount);
  const revHTML = await page.$eval('#reviews-stage', el => el.innerHTML);
  console.log('reviews-stage HTML snippet:', revHTML.substring(0, 300));
  await browser.close();
})();
