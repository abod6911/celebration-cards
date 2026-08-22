const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const brainDir = 'C:\\Users\\abodv\\.gemini\\antigravity\\brain\\ba617099-45ee-499b-978a-def935daa014';
  const localDir = path.join(__dirname, 'test_screenshots');
  if (!fs.existsSync(localDir)) fs.mkdirSync(localDir, { recursive: true });

  // 1. Desktop Viewport (1440x900) - Arabic
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto('file:///C:/مشاريع mit/مشورع بطايق الاحتفالات/index.html');
  await desktopPage.waitForTimeout(600);
  
  const dHeroPath = path.join(localDir, 'verify_desktop_hero.png');
  await desktopPage.screenshot({ path: dHeroPath });
  fs.copyFileSync(dHeroPath, path.join(brainDir, 'verify_desktop_hero.png'));

  // Scroll to Collections on Desktop (Arabic)
  const dCollections = await desktopPage.$('#collections');
  if (dCollections) {
    await dCollections.scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(500);
    const dCollPath = path.join(localDir, 'verify_desktop_collections.png');
    await desktopPage.screenshot({ path: dCollPath });
    fs.copyFileSync(dCollPath, path.join(brainDir, 'verify_desktop_collections.png'));
  }

  // Scroll to Reviews on Desktop (Arabic)
  const dReviews = await desktopPage.$('#reviews');
  if (dReviews) {
    await dReviews.scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(500);
    const dRevPath = path.join(localDir, 'verify_desktop_reviews.png');
    await desktopPage.screenshot({ path: dRevPath });
    fs.copyFileSync(dRevPath, path.join(brainDir, 'verify_desktop_reviews.png'));
  }

  // Switch to English on Desktop
  await desktopPage.click('.lang-toggle-btn');
  await desktopPage.waitForTimeout(500);
  const dHeroEnPath = path.join(localDir, 'verify_desktop_hero_en.png');
  await desktopPage.screenshot({ path: dHeroEnPath });
  fs.copyFileSync(dHeroEnPath, path.join(brainDir, 'verify_desktop_hero_en.png'));

  await desktopPage.close();

  // 2. Mobile Viewport (390x844 iPhone 14)
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('file:///C:/مشاريع mit/مشورع بطايق الاحتفالات/index.html');
  await mobilePage.waitForTimeout(600);

  const mHeroPath = path.join(localDir, 'verify_mobile_hero.png');
  await mobilePage.screenshot({ path: mHeroPath });
  fs.copyFileSync(mHeroPath, path.join(brainDir, 'verify_mobile_hero.png'));

  // Scroll to Reviews on Mobile
  const mReviews = await mobilePage.$('#reviews');
  if (mReviews) {
    await mReviews.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(500);
    const mRevPath = path.join(localDir, 'verify_mobile_reviews.png');
    await mobilePage.screenshot({ path: mRevPath });
    fs.copyFileSync(mRevPath, path.join(brainDir, 'verify_mobile_reviews.png'));
  }
  await mobilePage.close();

  await browser.close();
  console.log('✅ Captured verification screenshots successfully!');
})();
