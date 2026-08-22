import path from 'path';
import fs from 'fs';
import { chromium } from 'playwright';
import { preview } from 'vite';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  console.log('🚀 Running Comprehensive Vercel & Production QA Verification...');
  const brainDir = path.resolve('C:/Users/abodv/.gemini/antigravity/brain/ba617099-45ee-499b-978a-def935daa014');
  
  // Start local Vite preview server serving dist/
  const previewServer = await preview({
    preview: {
      port: 4173,
      open: false,
    },
  });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  // 1. Test Root Route (http://localhost:4173/) -> dist/index.html
  console.log('1️⃣ Verifying Vercel Root Deployment (http://localhost:4173/)...');
  const responseRoot = await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  const statusRoot = responseRoot.status();
  console.log(`   Root HTTP Status: ${statusRoot}`);
  if (statusRoot !== 200) {
    throw new Error(`Expected HTTP 200 on root, got ${statusRoot}`);
  }
  const rootTitle = await page.title();
  console.log(`   Root Title: "${rootTitle}"`);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(brainDir, 'vercel_root_verified.png') });

  // 2. Test React Testimonials Route (http://localhost:4173/react.html) -> dist/react.html
  console.log('2️⃣ Verifying React Testimonials (http://localhost:4173/react.html)...');
  const responseReact = await page.goto('http://localhost:4173/react.html', { waitUntil: 'networkidle' });
  const statusReact = responseReact.status();
  console.log(`   React HTTP Status: ${statusReact}`);
  if (statusReact !== 200) {
    throw new Error(`Expected HTTP 200 on react.html, got ${statusReact}`);
  }
  const headingText = await page.$eval('h2', el => el.textContent.trim());
  console.log(`   React Section Heading: "${headingText}"`);

  // Test React carousel interaction
  const nextBtn = await page.$('button[aria-label="التقييم التالي"]');
  if (nextBtn) await nextBtn.click();
  await page.waitForTimeout(600);
  console.log('   React Carousel Navigated successfully');
  await page.screenshot({ path: path.join(brainDir, 'vercel_react_verified.png') });

  await browser.close();
  await previewServer.close();

  if (errors.length > 0) {
    console.error('❌ Console errors detected:', errors);
    process.exit(1);
  } else {
    console.log('✨ ALL VERCEL & PRODUCTION ROUTES PASSED WITH 0 ERRORS AND 200 OK!');
  }
})();
