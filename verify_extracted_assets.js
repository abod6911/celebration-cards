const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('🔍 Generating visual inspection preview for transparent Hero assets...');

  const previewHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Mandeline Hero Assets QA Preview</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        .checkerboard {
          background-color: #333;
          background-image: linear-gradient(45deg, #222 25%, transparent 25%),
                            linear-gradient(-45deg, #222 25%, transparent 25%),
                            linear-gradient(45deg, transparent 75%, #222 75%),
                            linear-gradient(-45deg, transparent 75%, #222 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }
      </style>
    </head>
    <body class="bg-[#090807] text-white p-8 font-sans">
      <h1 class="text-3xl font-bold mb-2">Mandeline Hero Isolated Floral Assets QA</h1>
      <p class="text-stone-400 mb-8">Verification of genuine alpha transparency, clean edges, and lighting consistency</p>
      
      <!-- Over Checkerboard to prove real transparency -->
      <h2 class="text-xl font-semibold mb-4 text-[#D4AF37]">1. Transparency Test (Over Contrast Grid)</h2>
      <div class="grid grid-cols-4 gap-6 mb-12">
        <div class="checkerboard p-4 rounded-2xl flex flex-col items-center">
          <img src="assets/hero/mandeline-hero-01-ivory.webp" class="h-80 object-contain drop-shadow-2xl" />
          <span class="mt-3 text-xs font-semibold">01 Ivory Peonies & Roses</span>
        </div>
        <div class="checkerboard p-4 rounded-2xl flex flex-col items-center">
          <img src="assets/hero/mandeline-hero-02-blush.webp" class="h-80 object-contain drop-shadow-2xl" />
          <span class="mt-3 text-xs font-semibold">02 Dusty Blush Garden</span>
        </div>
        <div class="checkerboard p-4 rounded-2xl flex flex-col items-center">
          <img src="assets/hero/mandeline-hero-03-burgundy.webp" class="h-80 object-contain drop-shadow-2xl" />
          <span class="mt-3 text-xs font-semibold">03 Velvet Burgundy & Cappuccino</span>
        </div>
        <div class="checkerboard p-4 rounded-2xl flex flex-col items-center">
          <img src="assets/hero/mandeline-hero-04-orchid.webp" class="h-80 object-contain drop-shadow-2xl" />
          <span class="mt-3 text-xs font-semibold">04 Royal White Orchids</span>
        </div>
      </div>

      <!-- Over Atmospheric Background -->
      <h2 class="text-xl font-semibold mb-4 text-[#D4AF37]">2. Composite Test (Over Hero Atmospheric Background)</h2>
      <div class="relative w-full h-[480px] rounded-3xl overflow-hidden mb-8 border border-white/10 flex items-center justify-center">
        <img src="assets/hero/mandeline-hero-bg.jpg" class="absolute inset-0 w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-[#090807] via-transparent to-black/30"></div>
        <div class="relative z-10 flex items-end justify-center gap-8 h-full pb-8">
          <img src="assets/hero/mandeline-hero-01-ivory.webp" class="h-72 object-contain" />
          <img src="assets/hero/mandeline-hero-02-blush.webp" class="h-72 object-contain" />
          <img src="assets/hero/mandeline-hero-03-burgundy.webp" class="h-72 object-contain" />
          <img src="assets/hero/mandeline-hero-04-orchid.webp" class="h-72 object-contain" />
        </div>
      </div>
    </body>
    </html>
  `;

  const previewPath = path.join(__dirname, 'test_asset_preview.html');
  fs.writeFileSync(previewPath, previewHtml);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  await page.goto('file://' + previewPath.replace(/\\/g, '/'));
  await page.waitForTimeout(500);

  const outScreenshot = path.join(__dirname, 'test_screenshots', 'mandeline_assets_qa.png');
  await page.screenshot({ path: outScreenshot, fullPage: true });
  
  // Copy to brain artifacts
  fs.copyFileSync(outScreenshot, 'C:\\Users\\abodv\\.gemini\\antigravity\\brain\\ba617099-45ee-499b-978a-def935daa014\\mandeline_assets_qa.png');

  await browser.close();
  console.log(`✅ Asset QA screenshot generated: ${outScreenshot}`);
})();
