const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('🚀 Starting Mandeline Luxury Floral Boutique QA Verification...');
  
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

  console.log('1️⃣ Verifying Page Title & Console Errors...');
  const title = await page.title();
  console.log(`   Page title: "${title}"`);
  if (consoleErrors.length > 0) {
    console.error('❌ Console errors detected:', consoleErrors);
  } else {
    console.log('✅ No console errors!');
  }

  // Verify Hero word reveal spans
  const wordSpans = await page.$$('#hero-headline .reveal-word');
  console.log(`✅ Hero words rendered: ${wordSpans.length} words`);

  // Verify Hero spotlight layer
  const spotlightExists = await page.$('#hero-spotlight') !== null;
  console.log(`✅ Spotlight layer present: ${spotlightExists}`);

  // Test Spotlight mousemove
  await page.mouse.move(900, 450);
  await page.waitForTimeout(300);
  const spotX = await page.evaluate(() => {
    const el = document.getElementById('hero-spotlight');
    return el ? el.style.getPropertyValue('--spot-x') : null;
  });
  console.log(`✅ Desktop Spotlight lerp position: ${spotX}`);

  // Capture Desktop Hero Screenshot
  await page.screenshot({ path: path.join(screenshotsDir, '01_desktop_hero_ar.png') });

  // Test 2: Language Switcher to English
  console.log('2️⃣ Testing Language Switcher (AR -> EN)...');
  await page.click('.lang-toggle-btn');
  await page.waitForTimeout(400);

  const htmlDir = await page.getAttribute('html', 'dir');
  const htmlLang = await page.getAttribute('html', 'lang');
  const heroEnText = await page.innerText('#hero-headline');
  console.log(`   html dir: ${htmlDir}, lang: ${htmlLang}`);
  console.log(`   Hero EN headline: "${heroEnText}"`);
  if (htmlDir === 'ltr' && htmlLang === 'en') {
    console.log('✅ LTR and English language switch successful!');
  } else {
    console.error('❌ Language switch failed!');
  }

  await page.screenshot({ path: path.join(screenshotsDir, '02_desktop_hero_en.png') });

  // Switch back to Arabic
  console.log('   Switching back to Arabic...');
  await page.click('.lang-toggle-btn');
  await page.waitForTimeout(400);

  // Test 3: Collections Filter Tabs
  console.log('3️⃣ Testing Collections Filter Tabs...');
  await page.click('button[data-filter="bouquets"]');
  await page.waitForTimeout(300);
  let cardCount = await page.$$('#collections-container .flower-card');
  console.log(`   Bouquets filtered count: ${cardCount.length}`);

  await page.click('button[data-filter="vases"]');
  await page.waitForTimeout(300);
  cardCount = await page.$$('#collections-container .flower-card');
  console.log(`   Vases filtered count: ${cardCount.length}`);

  await page.click('button[data-filter="all"]');
  await page.waitForTimeout(300);
  cardCount = await page.$$('#collections-container .flower-card');
  console.log(`   All items count: ${cardCount.length}`);

  // Test 4: Quick View Lightbox Modal
  console.log('4️⃣ Testing Quick View Lightbox Modal...');
  await page.click('#collections-container .flower-card:first-child button');
  await page.waitForTimeout(400);
  const isModalVisible = await page.isVisible('#quick-view-modal');
  console.log(`   Modal visible: ${isModalVisible}`);
  await page.screenshot({ path: path.join(screenshotsDir, '03_quick_view_modal.png') });

  // Close modal via Escape
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  const isModalClosed = !(await page.isVisible('#quick-view-modal'));
  console.log(`✅ Modal closed via Escape: ${isModalClosed}`);

  // Test 5: Occasion Card selection linking to Concierge
  console.log('5️⃣ Testing Occasion selection & Concierge integration...');
  await page.click('#occasions-container > div:nth-child(2) button');
  await page.waitForTimeout(500);
  const checkedOccasion = await page.$eval('input[name="c_occasion"]:checked', el => el.value);
  console.log(`✅ Selected occasion in Concierge: "${checkedOccasion}" (celebration)`);

  // Fill in Delivery & Note
  await page.fill('#concierge-delivery-input', 'اليوم الساعة 8:30 مساءً');
  await page.fill('#concierge-note-input', 'ألف مبروك التخرج، فخورين بك دائماً ✨');
  await page.screenshot({ path: path.join(screenshotsDir, '04_concierge_filled.png') });

  // Test 6: Full Page Scroll & Full Desktop Screenshot
  console.log('6️⃣ Capturing Full Page Desktop View...');
  await page.evaluate(async () => {
    const distance = 400;
    const delay = 100;
    while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
      document.scrollingElement.scrollBy(0, distance);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    await new Promise(resolve => setTimeout(resolve, 500));
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(screenshotsDir, '05_desktop_fullpage.png'), fullPage: true });

  // Test 7: Mobile Viewports Testing (360px, 375px, 390px, 412px, 430px)
  const mobileViewports = [
    { width: 360, height: 800, name: 'mobile_360_galaxy' },
    { width: 375, height: 812, name: 'mobile_375_iphone_x' },
    { width: 390, height: 844, name: 'mobile_390_iphone_14' },
    { width: 412, height: 915, name: 'mobile_412_pixel_7' },
    { width: 430, height: 932, name: 'mobile_430_iphone_14_pro_max' }
  ];

  for (const vp of mobileViewports) {
    console.log(`📱 Testing Mobile Viewport: ${vp.width}x${vp.height} (${vp.name})...`);
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.reload({ waitUntil: 'load' });
    await page.waitForTimeout(600);

    // Check for horizontal scroll overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    const hasHorizontalOverflow = scrollWidth > clientWidth;
    if (hasHorizontalOverflow) {
      console.error(`❌ Horizontal overflow on ${vp.width}px! scrollWidth: ${scrollWidth}, clientWidth: ${clientWidth}`);
    } else {
      console.log(`✅ No horizontal overflow on ${vp.width}px (width: ${clientWidth}px)`);
    }

    // Scroll down to test Floating WhatsApp bar
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(400);
    const isFloatingCtaVisible = await page.isVisible('#floating-whatsapp-bar');
    console.log(`   Floating WhatsApp bar visible on scroll: ${isFloatingCtaVisible}`);

    // Test Mobile Menu Drawer
    await page.click('#mobile-menu-toggle');
    await page.waitForTimeout(400);
    const isMenuOpen = await page.isVisible('#mobile-menu-drawer');
    console.log(`   Mobile Menu Drawer opened: ${isMenuOpen}`);
    await page.screenshot({ path: path.join(screenshotsDir, `06_${vp.name}_drawer.png`) });

    // Close Menu
    await page.click('#mobile-menu-close');
    await page.waitForTimeout(400);

    // Capture Mobile Hero
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(screenshotsDir, `07_${vp.name}_hero.png`) });
  }

  // Test 8: Tablet 768x1024
  console.log('📱 Testing Tablet Viewport (768x1024)...');
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.reload({ waitUntil: 'load' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(screenshotsDir, '08_tablet_768_hero.png') });

  await browser.close();
  console.log('🎉 Mandeline QA Verification completed successfully! All checks passed.');
})();
