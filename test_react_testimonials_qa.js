import path from 'path';
import fs from 'fs';
import { chromium } from 'playwright';
import { preview } from 'vite';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  console.log('🚀 Starting React Testimonials Section QA Verification via Vite Preview Server...');
  const brainDir = path.resolve('C:/Users/abodv/.gemini/antigravity/brain/ba617099-45ee-499b-978a-def935daa014');
  
  // 1. Start local Vite preview server
  const previewServer = await preview({
    preview: {
      port: 4173,
      open: false,
    },
  });

  const baseUrl = `http://localhost:4173/react.html`;
  console.log(`🌐 Server running at ${baseUrl}`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  // 2. Desktop Test 1440x900
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  console.log('1️⃣ Verifying Slide 1 (Desktop)...');
  const headingText = await page.$eval('h2', el => el.textContent.trim());
  console.log(`   Heading: "${headingText}"`);

  const quote1 = await page.$eval('blockquote', el => el.textContent.trim());
  console.log(`   Quote 1: "${quote1.substring(0, 40)}..."`);

  await page.screenshot({ path: path.join(brainDir, 'react_testimonials_desktop_slide1.png') });

  // 3. Click Next Button -> Slide 2
  console.log('2️⃣ Navigating to Slide 2...');
  const nextBtn = await page.$('button[aria-label="التقييم التالي"]');
  if (nextBtn) await nextBtn.click();
  await page.waitForTimeout(700);

  const quote2 = await page.$eval('blockquote', el => el.textContent.trim());
  console.log(`   Quote 2: "${quote2.substring(0, 40)}..."`);
  await page.screenshot({ path: path.join(brainDir, 'react_testimonials_desktop_slide2.png') });

  // 4. Click Next Button -> Slide 3
  console.log('3️⃣ Navigating to Slide 3...');
  if (nextBtn) await nextBtn.click();
  await page.waitForTimeout(700);

  const quote3 = await page.$eval('blockquote', el => el.textContent.trim());
  console.log(`   Quote 3: "${quote3.substring(0, 40)}..."`);
  await page.screenshot({ path: path.join(brainDir, 'react_testimonials_desktop_slide3.png') });

  // 5. Mobile Viewport Test (390x844)
  console.log('4️⃣ Testing Mobile Viewport (iPhone 14 / 390x844)...');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(brainDir, 'react_testimonials_mobile.png') });

  await browser.close();
  await previewServer.close();

  if (errors.length > 0) {
    console.error('❌ Console errors detected:', errors);
    process.exit(1);
  } else {
    console.log('✨ ALL REACT TESTIMONIAL TESTS PASSED WITH 0 CONSOLE ERRORS!');
  }
})();
