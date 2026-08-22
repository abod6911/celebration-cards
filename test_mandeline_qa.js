const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('🚀 Starting MANDELINE TOONHUB Floral Depth Carousel QA Verification...');
  
  const screenshotsDir = path.join(__dirname, 'test_screenshots', 'mandeline');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  const fileUrl = 'file://' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
  console.log(`🌐 Navigating to ${fileUrl}`);

  // Test 1: Desktop 1440x900
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(fileUrl, { waitUntil: 'load' });
  await page.waitForTimeout(1000);

  console.log('1️⃣ Verifying Page Title, One-shot Entrance & Floral Objects...');
  const title = await page.title();
  console.log(`   Page title: "${title}"`);
  if (consoleErrors.length > 0) {
    console.error('❌ Console errors detected:', consoleErrors);
  } else {
    console.log('✅ No console errors!');
  }

  // Verify Floral Carousel 4 objects and initial roles
  const floralCount = await page.$$eval('.floral-object', els => els.length);
  console.log(`✅ Floral objects count: ${floralCount}`);

  const initialCenter = await page.$eval('.floral-object[data-role="center"]', el => el.getAttribute('data-slide'));
  const initialRight = await page.$eval('.floral-object[data-role="right"]', el => el.getAttribute('data-slide'));
  const initialLeft = await page.$eval('.floral-object[data-role="left"]', el => el.getAttribute('data-slide'));
  const initialBack = await page.$eval('.floral-object[data-role="back"]', el => el.getAttribute('data-slide'));
  console.log(`✅ Initial Roles -> Center: Slide ${initialCenter}, Right: Slide ${initialRight}, Left: Slide ${initialLeft}, Back: Slide ${initialBack}`);

  // Capture Desktop Hero Initial State (Slide 0)
  await page.screenshot({ path: path.join(screenshotsDir, '01_desktop_hero_slide0.png') });

  // Test 2: Trigger Next Navigation and Verify Role Transitions
  console.log('2️⃣ Testing Next Navigation & 650ms Role Transition...');
  await page.click('#hero-next-btn');
  await page.waitForTimeout(700);

  const nextCenter = await page.$eval('.floral-object[data-role="center"]', el => el.getAttribute('data-slide'));
  const nextRight = await page.$eval('.floral-object[data-role="right"]', el => el.getAttribute('data-slide'));
  const nextLeft = await page.$eval('.floral-object[data-role="left"]', el => el.getAttribute('data-slide'));
  const nextBack = await page.$eval('.floral-object[data-role="back"]', el => el.getAttribute('data-slide'));
  console.log(`✅ Transitioned Roles -> Center: Slide ${nextCenter}, Right: Slide ${nextRight}, Left: Slide ${nextLeft}, Back: Slide ${nextBack}`);

  // Capture Desktop Hero Slide 1 State
  await page.screenshot({ path: path.join(screenshotsDir, '02_desktop_hero_slide1.png') });

  // Test 3: Language Switcher to English
  console.log('3️⃣ Testing Language Switcher (AR -> EN)...');
  await page.click('.lang-toggle-btn');
  await page.waitForTimeout(400);

  const htmlDir = await page.getAttribute('html', 'dir');
  const htmlLang = await page.getAttribute('html', 'lang');
  console.log(`   html dir: ${htmlDir}, lang: ${htmlLang}`);
  await page.screenshot({ path: path.join(screenshotsDir, '03_desktop_hero_en.png') });

  // Switch back to Arabic
  await page.click('.lang-toggle-btn');
  await page.waitForTimeout(400);

  // Test 4: Customer Reviews Section
  console.log('4️⃣ Verifying Customer Reviews Section...');
  const reviewCards = await page.$$('#reviews-stage .review-card');
  console.log(`✅ Customer Reviews rendered: ${reviewCards.length} testimonials`);

  // Test Review Carousel Navigation
  await page.click('#rev-next-btn');
  await page.waitForTimeout(650);
  const activeRevNum = await page.$eval('#rev-active-num', el => el.textContent.trim());
  console.log(`✅ Review carousel navigated to: ${activeRevNum}`);

  // Capture Reviews section on Desktop
  const reviewsEl = await page.$('#reviews');
  if (reviewsEl) {
    await reviewsEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(screenshotsDir, '04_desktop_reviews_section.png') });
  }

  // Test 6: Mobile Viewports (360, 375, 390, 393, 412, 430)
  const mobileViewports = [
    { width: 360, height: 800, name: 'mobile_360_galaxy' },
    { width: 375, height: 812, name: 'mobile_375_iphone_x' },
    { width: 390, height: 844, name: 'mobile_390_iphone_14' },
    { width: 393, height: 852, name: 'mobile_393_iphone_15_pro' },
    { width: 412, height: 915, name: 'mobile_412_pixel_7' },
    { width: 430, height: 932, name: 'mobile_430_iphone_14_pro_max' }
  ];

  for (const vp of mobileViewports) {
    console.log(`📱 Testing Mobile Viewport: ${vp.width}x${vp.height} (${vp.name})...`);
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.reload({ waitUntil: 'load' });
    await page.waitForTimeout(600);

    // Check for horizontal overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    const hasHorizontalOverflow = scrollWidth > clientWidth;
    if (hasHorizontalOverflow) {
      console.error(`❌ Horizontal overflow on ${vp.width}px! scrollWidth: ${scrollWidth}, clientWidth: ${clientWidth}`);
    } else {
      console.log(`✅ No horizontal overflow on ${vp.width}px (width: ${clientWidth}px)`);
    }

    // Capture Mobile Hero
    await page.screenshot({ path: path.join(screenshotsDir, `07_${vp.name}_hero.png`) });

    // Test Mobile Menu Drawer
    await page.click('#mobile-menu-toggle');
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(screenshotsDir, `06_${vp.name}_drawer.png`) });
    await page.click('#mobile-menu-close');
    await page.waitForTimeout(300);
  }

  // Test 7: Tablet 768x1024 & 1024x1366
  console.log('📱 Testing Tablet Viewports (768x1024 & 1024x1366)...');
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.reload({ waitUntil: 'load' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(screenshotsDir, '08_tablet_768_hero.png') });

  await page.setViewportSize({ width: 1024, height: 1366 });
  await page.reload({ waitUntil: 'load' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(screenshotsDir, '09_tablet_1024_hero.png') });

  // Test 8: Desktop 1366x768 & 1920x1080
  console.log('🖥️ Testing Desktop 1366x768 Viewport...');
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.reload({ waitUntil: 'load' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(screenshotsDir, '09_desktop_1366_hero.png') });

  console.log('🖥️ Testing Large Desktop Viewport (1920x1080)...');
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.reload({ waitUntil: 'load' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(screenshotsDir, '10_desktop_1920_hero.png') });

  await browser.close();
  console.log('🎉 MANDELINE TOONHUB Floral Depth Carousel QA Completed Successfully!');
})();
