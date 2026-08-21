/**
 * MANDELINE (مندلين) — Core Interactive Controller & Motion Engine
 * Features: Word-by-word reveal, RAF-lerped cursor spotlight, i18n, concierge generator, lightbox, drawer nav
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.MandelineData;
  if (!data) return;

  // --- App State ---
  let currentLang = localStorage.getItem('mandeline_lang') || 'ar';
  let activeFilter = 'all';
  let activeModalItem = null;

  // Concierge Form State
  const conciergeState = {
    occasion: 'romance',
    budget: '650',
    palette: 'champagne_blush',
    delivery: '',
    note: ''
  };

  // DOM Elements
  const htmlEl = document.documentElement;
  const heroSection = document.getElementById('hero-section');
  const heroBgContainer = document.getElementById('hero-bg-container');
  const heroSpotlight = document.getElementById('hero-spotlight');
  const heroHeadline = document.getElementById('hero-headline');
  const navHeader = document.getElementById('main-nav');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const langToggleBtns = document.querySelectorAll('.lang-toggle-btn');
  const occasionsContainer = document.getElementById('occasions-container');
  const collectionsContainer = document.getElementById('collections-container');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const conciergeForm = document.getElementById('concierge-form');
  const conciergeSubmitBtn = document.getElementById('concierge-submit-btn');
  const floatingWhatsappBtn = document.getElementById('floating-whatsapp-bar');
  const quickViewModal = document.getElementById('quick-view-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  // --- 1. HERO WORD-BY-WORD REVEAL ENGINE (TerraElix Concept) ---
  function renderHeroWords() {
    if (!heroHeadline) return;
    const t = data.translations[currentLang].hero;
    const words = t.words;
    
    // Clear and build wrapped word spans
    heroHeadline.innerHTML = '';
    words.forEach((word, idx) => {
      const span = document.createElement('span');
      span.className = `reveal-word delay-${(idx + 2) * 100} mx-1.5 inline-block`;
      span.textContent = word;
      heroHeadline.appendChild(span);
    });

    // Trigger loaded states after slight tick
    setTimeout(() => {
      if (heroBgContainer) heroBgContainer.classList.add('loaded');
      if (heroSection) heroSection.classList.add('hero-loaded');
    }, 150);
  }

  // --- 2. DESKTOP FLORAL SPOTLIGHT ENGINE (Lithos Concept - RAF + Lerp) ---
  let isPointerActive = false;
  let mouseX = window.innerWidth * 0.75;
  let mouseY = window.innerHeight * 0.55;
  let spotX = mouseX;
  let spotY = mouseY;
  let rafId = null;

  function updateSpotlightLoop() {
    // Lerp smooth interpolation (0.09 factor)
    spotX += (mouseX - spotX) * 0.09;
    spotY += (mouseY - spotY) * 0.09;

    if (heroSpotlight) {
      heroSpotlight.style.setProperty('--spot-x', `${spotX.toFixed(1)}px`);
      heroSpotlight.style.setProperty('--spot-y', `${spotY.toFixed(1)}px`);
    }

    if (isPointerActive) {
      rafId = requestAnimationFrame(updateSpotlightLoop);
    }
  }

  if (heroSection && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    heroSection.addEventListener('mouseenter', (e) => {
      isPointerActive = true;
      const rect = heroSection.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      spotX = mouseX;
      spotY = mouseY;
      if (heroSpotlight) heroSpotlight.style.setProperty('--spot-opacity', '1');
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateSpotlightLoop);
    });

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });

    heroSection.addEventListener('mouseleave', () => {
      isPointerActive = false;
      if (heroSpotlight) heroSpotlight.style.setProperty('--spot-opacity', '0');
    });
  }

  // --- 3. LANGUAGE SWITCHER ENGINE ---
  function applyTranslations() {
    const t = data.translations[currentLang];
    htmlEl.lang = currentLang;
    htmlEl.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

    // Update document title & meta
    document.title = currentLang === 'ar' 
      ? `${data.businessConfig.brandAr} — بوتيك الزهور الفاخرة في جدة`
      : `${data.businessConfig.brandEn} — Fine Floral Boutique Jeddah`;

    // Update text elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const keyPath = el.getAttribute('data-i18n').split('.');
      let val = t;
      for (const key of keyPath) {
        if (val && val[key] !== undefined) {
          val = val[key];
        } else {
          val = null;
          break;
        }
      }
      if (val !== null) {
        el.textContent = val;
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const keyPath = el.getAttribute('data-i18n-placeholder').split('.');
      let val = t;
      for (const key of keyPath) {
        if (val && val[key] !== undefined) {
          val = val[key];
        } else {
          val = null;
          break;
        }
      }
      if (val !== null) {
        el.setAttribute('placeholder', val);
      }
    });

    // Update Lang button text
    langToggleBtns.forEach(btn => {
      btn.textContent = t.langBtn;
      btn.setAttribute('aria-label', currentLang === 'ar' ? 'Switch to English' : 'التحويل إلى العربية');
    });

    // Update dynamic components
    renderHeroWords();
    renderMarquee();
    renderOccasions();
    renderCollections();
    renderConciergeOptions();

    // Re-initialize Lucide Icons for dynamic content
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('mandeline_lang', lang);
    applyTranslations();
  }

  langToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      setLanguage(currentLang === 'ar' ? 'en' : 'ar');
    });
  });

  // --- 4. MARQUEE RENDERER ---
  function renderMarquee() {
    const marqueeContainer = document.getElementById('marquee-content');
    if (!marqueeContainer) return;
    const items = data.translations[currentLang].marquee;
    const content = items.map(text => `
      <span class="inline-flex items-center gap-4 text-xs lg:text-sm tracking-wider uppercase font-medium text-stone-300">
        <span>${text}</span>
        <span class="text-[#D4AF37] opacity-60">✦</span>
      </span>
    `).join('');
    
    // Duplicate to ensure seamless continuous loop
    marqueeContainer.innerHTML = `${content} ${content} ${content}`;
  }

  // --- 5. OCCASIONS SECTION ---
  function renderOccasions() {
    if (!occasionsContainer) return;
    const isAr = currentLang === 'ar';
    const tSec = data.translations[currentLang].occasionsSec;

    occasionsContainer.innerHTML = data.occasions.map((occ) => {
      const title = isAr ? occ.titleAr : occ.titleEn;
      const desc = isAr ? occ.descAr : occ.descEn;
      return `
        <div class="group relative overflow-hidden rounded-2xl bg-white border border-[#E5DED2] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between">
          <div class="relative aspect-4/3 overflow-hidden bg-stone-100">
            <img 
              src="${occ.image}" 
              alt="${title}"
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
            <div class="absolute bottom-4 ${isAr ? 'right-4 text-right' : 'left-4 text-left'} text-white">
              <h3 class="text-xl font-bold font-display drop-shadow-sm">${title}</h3>
            </div>
          </div>
          <div class="p-6 flex-1 flex flex-col justify-between">
            <p class="text-sm text-stone-600 leading-relaxed mb-6">${desc}</p>
            <button 
              type="button"
              onclick="window.selectOccasionAndScroll('${occ.id}', '${occ.defaultBudget}', '${occ.recommendedPalette}')"
              class="w-full py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#FAF7F2] hover:bg-[#D4AF37] hover:text-black text-stone-800 border border-[#E5DED2] transition-all duration-300 flex items-center justify-center gap-2 group-hover:border-[#D4AF37]"
            >
              <span>${tSec.selectCta}</span>
              <span class="text-sm transition-transform group-hover:translate-x-1 ${isAr ? 'group-hover:-translate-x-1' : ''}">${isAr ? '←' : '→'}</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // Global helper for occasion card CTA
  window.selectOccasionAndScroll = function(occId, budget, palette) {
    conciergeState.occasion = occId;
    if (budget && budget !== 'undefined') conciergeState.budget = budget;
    if (palette && palette !== 'undefined') conciergeState.palette = palette;
    
    renderConciergeOptions();

    const targetSection = document.getElementById('concierge');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- 6. COLLECTIONS SECTION & FILTER TABS ---
  function renderCollections() {
    if (!collectionsContainer) return;
    const isAr = currentLang === 'ar';
    const tSec = data.translations[currentLang].collectionsSec;

    const filtered = activeFilter === 'all'
      ? data.collections
      : data.collections.filter(c => c.category === activeFilter);

    collectionsContainer.innerHTML = filtered.map((item) => {
      const title = isAr ? item.titleAr : item.titleEn;
      const subtitle = isAr ? item.subtitleAr : item.subtitleEn;
      const price = isAr ? item.priceAr : item.priceEn;
      const tag = isAr ? item.tagAr : item.tagEn;

      return `
        <div class="flower-card rounded-2xl bg-white border border-[#E5DED2] overflow-hidden flex flex-col justify-between group shadow-sm">
          <div class="relative aspect-4/3 overflow-hidden bg-stone-100 cursor-pointer" onclick="window.openQuickView('${item.id}')">
            <img 
              src="${item.image}" 
              alt="${title}"
              loading="lazy"
              class="flower-card-img w-full h-full object-cover"
            />
            <div class="absolute top-3 ${isAr ? 'right-3' : 'left-3'}">
              <span class="glass-pill text-[11px] font-semibold text-white px-3 py-1 rounded-full shadow-sm">
                ${tag}
              </span>
            </div>
            <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span class="glass-pill-light text-xs font-semibold text-stone-900 px-4 py-2 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
                ${tSec.viewDetails} ⤢
              </span>
            </div>
          </div>

          <div class="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-baseline justify-between gap-2 mb-1">
                <h3 class="font-display font-bold text-lg text-stone-900 leading-snug">${title}</h3>
              </div>
              <p class="text-xs text-stone-500 mb-3">${subtitle}</p>
              <div class="text-sm font-semibold text-[#D4AF37] mb-6">${price}</div>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <button 
                type="button" 
                onclick="window.openQuickView('${item.id}')"
                class="py-2.5 px-3 rounded-xl text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors text-center"
              >
                ${tSec.viewDetails}
              </button>
              <button 
                type="button" 
                onclick="window.orderDirectItem('${item.id}')"
                class="py-2.5 px-3 rounded-xl text-xs font-semibold text-stone-950 bg-[#D4AF37] hover:bg-[#E2C766] transition-colors text-center shadow-xs"
              >
                ${tSec.orderItem}
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-stone-900', 'text-white');
        b.classList.add('bg-white', 'text-stone-700');
      });
      btn.classList.add('bg-stone-900', 'text-white');
      btn.classList.remove('bg-white', 'text-stone-700');
      activeFilter = btn.getAttribute('data-filter') || 'all';
      renderCollections();
    });
  });

  // Direct Product WhatsApp Order
  window.orderDirectItem = function(itemId) {
    const item = data.collections.find(c => c.id === itemId);
    if (!item) return;
    const isAr = currentLang === 'ar';
    const title = isAr ? item.titleAr : item.titleEn;
    const price = isAr ? item.priceAr : item.priceEn;

    const msg = isAr
      ? `مرحباً بوتيك مندلين للزهور 🌸\nأرغب بطلب: *${title}* (${price}).\nهل التنسيق متوفر للتوصيل السريع اليوم في جدة؟`
      : `Hello Mandeline Floral Atelier 🌸\nI would like to order: *${title}* (${price}).\nIs this arrangement available for express delivery today in Jeddah?`;

    const url = `https://wa.me/${data.businessConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  // --- 7. QUICK VIEW / LIGHTBOX MODAL ---
  window.openQuickView = function(itemId) {
    const item = data.collections.find(c => c.id === itemId);
    if (!item || !quickViewModal) return;
    activeModalItem = item;
    const isAr = currentLang === 'ar';

    document.getElementById('modal-img').src = item.image;
    document.getElementById('modal-img').alt = isAr ? item.titleAr : item.titleEn;
    document.getElementById('modal-title').textContent = isAr ? item.titleAr : item.titleEn;
    document.getElementById('modal-subtitle').textContent = isAr ? item.subtitleAr : item.subtitleEn;
    document.getElementById('modal-desc').textContent = isAr ? item.detailsAr : item.detailsEn;
    document.getElementById('modal-price').textContent = isAr ? item.priceAr : item.priceEn;
    document.getElementById('modal-tag').textContent = isAr ? item.tagAr : item.tagEn;

    quickViewModal.classList.remove('hidden');
    quickViewModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    if (!quickViewModal) return;
    quickViewModal.classList.add('hidden');
    quickViewModal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (quickViewModal) {
    quickViewModal.addEventListener('click', (e) => {
      if (e.target === quickViewModal) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  const modalOrderBtn = document.getElementById('modal-order-btn');
  if (modalOrderBtn) {
    modalOrderBtn.addEventListener('click', () => {
      if (activeModalItem) {
        window.orderDirectItem(activeModalItem.id);
        closeModal();
      }
    });
  }

  // --- 8. INTERACTIVE BESPOKE CONCIERGE ENGINE ---
  function renderConciergeOptions() {
    const isAr = currentLang === 'ar';
    const t = data.translations[currentLang].conciergeSec;

    // Render Occasion Radios
    const occasionContainer = document.getElementById('concierge-occasions-grid');
    if (occasionContainer) {
      occasionContainer.innerHTML = data.occasions.map(occ => {
        const title = isAr ? occ.titleAr : occ.titleEn;
        const isSelected = conciergeState.occasion === occ.id;
        return `
          <label class="cursor-pointer">
            <input type="radio" name="c_occasion" value="${occ.id}" ${isSelected ? 'checked' : ''} class="peer sr-only">
            <div class="p-3.5 rounded-xl border text-xs font-semibold text-center transition-all peer-checked:bg-[#D4AF37] peer-checked:text-black peer-checked:border-[#D4AF37] peer-checked:shadow-sm bg-white/5 border-white/10 text-stone-300 hover:border-white/30">
              ${title}
            </div>
          </label>
        `;
      }).join('');
    }

    // Render Budget Radios
    const budgetContainer = document.getElementById('concierge-budget-grid');
    if (budgetContainer) {
      const budgets = [
        { id: '350', label: t.budgetOption1 },
        { id: '650', label: t.budgetOption2 },
        { id: '1200', label: t.budgetOption3 },
        { id: 'custom', label: t.budgetOption4 }
      ];

      budgetContainer.innerHTML = budgets.map(b => {
        const isSelected = conciergeState.budget === b.id;
        return `
          <label class="cursor-pointer">
            <input type="radio" name="c_budget" value="${b.id}" ${isSelected ? 'checked' : ''} class="peer sr-only">
            <div class="p-3.5 rounded-xl border text-xs font-semibold text-center transition-all peer-checked:bg-[#D4AF37] peer-checked:text-black peer-checked:border-[#D4AF37] peer-checked:shadow-sm bg-white/5 border-white/10 text-stone-300 hover:border-white/30">
              ${b.label}
            </div>
          </label>
        `;
      }).join('');
    }

    // Render Palette Radios
    const paletteContainer = document.getElementById('concierge-palette-grid');
    if (paletteContainer) {
      const palettes = [
        { id: 'champagne_blush', label: t.paletteRomantic },
        { id: 'burgundy_noir', label: t.paletteVelvet },
        { id: 'white_gold', label: t.paletteWhite },
        { id: 'florist_choice', label: t.paletteCustom }
      ];

      paletteContainer.innerHTML = palettes.map(p => {
        const isSelected = conciergeState.palette === p.id;
        return `
          <label class="cursor-pointer">
            <input type="radio" name="c_palette" value="${p.id}" ${isSelected ? 'checked' : ''} class="peer sr-only">
            <div class="p-3.5 rounded-xl border text-xs font-semibold text-center transition-all peer-checked:bg-[#D4AF37] peer-checked:text-black peer-checked:border-[#D4AF37] peer-checked:shadow-sm bg-white/5 border-white/10 text-stone-300 hover:border-white/30">
              ${p.label}
            </div>
          </label>
        `;
      }).join('');
    }

    // Bind Radio Change Handlers
    document.querySelectorAll('input[name="c_occasion"]').forEach(el => {
      el.addEventListener('change', (e) => { conciergeState.occasion = e.target.value; });
    });
    document.querySelectorAll('input[name="c_budget"]').forEach(el => {
      el.addEventListener('change', (e) => { conciergeState.budget = e.target.value; });
    });
    document.querySelectorAll('input[name="c_palette"]').forEach(el => {
      el.addEventListener('change', (e) => { conciergeState.palette = e.target.value; });
    });
  }

  // Concierge Form Submission to WhatsApp
  if (conciergeForm) {
    conciergeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const isAr = currentLang === 'ar';

      const deliveryInput = document.getElementById('concierge-delivery-input');
      const noteInput = document.getElementById('concierge-note-input');

      const deliveryVal = deliveryInput ? deliveryInput.value.trim() : '';
      const noteVal = noteInput ? noteInput.value.trim() : '';

      // Find labels
      const occObj = data.occasions.find(o => o.id === conciergeState.occasion);
      const occName = occObj ? (isAr ? occObj.titleAr : occObj.titleEn) : conciergeState.occasion;

      let budgetLabel = conciergeState.budget;
      if (conciergeState.budget === '350') budgetLabel = isAr ? '350 ر.س (كلاسيكية)' : '350 SAR (Classic)';
      else if (conciergeState.budget === '650') budgetLabel = isAr ? '650 ر.س (فاخرة)' : '650 SAR (Grand)';
      else if (conciergeState.budget === '1200') budgetLabel = isAr ? '1,200 ر.س (ملكية)' : '1,200 SAR (Royal)';
      else if (conciergeState.budget === 'custom') budgetLabel = isAr ? 'تنسيق خاص / ميزانية مفتوحة' : 'Custom VIP / Open';

      let paletteLabel = conciergeState.palette;
      if (conciergeState.palette === 'champagne_blush') paletteLabel = isAr ? 'شامبين ووردي ناعم' : 'Champagne & Soft Blush';
      else if (conciergeState.palette === 'burgundy_noir') paletteLabel = isAr ? 'برغندي مخملي' : 'Velvet Burgundy';
      else if (conciergeState.palette === 'white_gold') paletteLabel = isAr ? 'أبيض ملكي وذهبي' : 'Royal White & Gold';
      else if (conciergeState.palette === 'florist_choice') paletteLabel = isAr ? 'على ذوق المنسق المحترف' : 'Florist Choice';

      const msg = isAr
        ? `مرحباً بوتيك مندلين للزهور 🌸\nأرغب بطلب تنسيق مخصص عبر المنسّق الشخصي:\n` +
          `• المناسبة: *${occName}*\n` +
          `• الميزانية التقريبية: *${budgetLabel}*\n` +
          `• درجات الألوان: *${paletteLabel}*\n` +
          (deliveryVal ? `• موعد التوصيل المطلوب: *${deliveryVal}*\n` : '') +
          (noteVal ? `• نص كرت الإهداء: "${noteVal}"\n` : '') +
          `\nيرجى تأكيد الاستلام وإرسال صور الورد للتأكيد. شكراً لكم.`
        : `Hello Mandeline Floral Atelier 🌸\nI would like to place a bespoke floral order:\n` +
          `• Occasion: *${occName}*\n` +
          `• Approximate Budget: *${budgetLabel}*\n` +
          `• Preferred Colors: *${paletteLabel}*\n` +
          (deliveryVal ? `• Desired Delivery: *${deliveryVal}*\n` : '') +
          (noteVal ? `• Card Message: "${noteVal}"\n` : '') +
          `\nPlease confirm and share live photos of today's blooms. Thank you.`;

      const url = `https://wa.me/${data.businessConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    });
  }

  // --- 9. NAVBAR SCROLL & FLOATING CTA BEHAVIOR ---
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar translucency
    if (navHeader) {
      if (scrollY > 50) {
        navHeader.classList.add('scrolled');
      } else {
        navHeader.classList.remove('scrolled');
      }
    }

    // Floating WhatsApp Bar appearance on mobile
    if (floatingWhatsappBtn) {
      if (scrollY > 400) {
        floatingWhatsappBtn.classList.remove('translate-y-32', 'opacity-0');
        floatingWhatsappBtn.classList.add('translate-y-0', 'opacity-100');
      } else {
        floatingWhatsappBtn.classList.add('translate-y-32', 'opacity-0');
        floatingWhatsappBtn.classList.remove('translate-y-0', 'opacity-100');
      }
    }
  }, { passive: true });

  // --- 10. MOBILE MENU DRAWER ---
  function openMobileMenu() {
    if (!mobileMenuDrawer) return;
    mobileMenuDrawer.classList.remove('translate-x-full', '-translate-x-full', 'hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileMenuDrawer) return;
    const isAr = currentLang === 'ar';
    mobileMenuDrawer.classList.add(isAr ? '-translate-x-full' : 'translate-x-full');
    setTimeout(() => {
      mobileMenuDrawer.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  }

  if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openMobileMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
  
  // Close menu on nav link clicks
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // --- 11. SCROLL REVEAL OBSERVER ---
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.scroll-reveal').forEach(el => {
    revealObserver.observe(el);
  });

  // --- INITIAL RENDER ---
  applyTranslations();
});
