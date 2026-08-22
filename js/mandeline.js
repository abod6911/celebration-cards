/**
 * MANDELINE (مندلين) — Final Premium Interactive Controller & Motion Engine
 * Adapts: TOONHUB Synchronized Floral Depth Carousel + Vantage One-Shot Entrance +
 * Velorah-style Parallax Liquid-Glass Reviews + Bilingual Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.MandelineData;
  if (!data) return;

  // --- Global App State ---
  let currentLang = localStorage.getItem('mandeline_lang') || 'ar';
  let activeFilter = 'all';
  let activeModalItem = null;
  
  // Hero Floral Depth Carousel State (TOONHUB Architecture)
  let heroActiveIdx = 0;
  let isHeroAnimating = false;
  let heroAutoTimer = null;
  const floralObjects = document.querySelectorAll('.floral-object');
  const heroSlideCount = (data.heroSlides && data.heroSlides.length) || floralObjects.length || 4;

  // Reviews Carousel State
  let revActiveIdx = 0;
  let isRevAnimating = false;
  let revAutoTimer = null;
  let isReviewsInView = false;
  const reviewCount = (data.customerReviews && data.customerReviews.length) || 3;

  // Concierge Form State
  const conciergeState = {
    occasion: 'romance',
    budget: '650',
    palette: 'champagne_blush',
    delivery: '',
    note: ''
  };

  // --- DOM Elements ---
  const htmlEl = document.documentElement;
  const heroSection = document.getElementById('hero-section');
  const heroHeadline = document.getElementById('hero-headline');
  const heroPrimaryCta = document.getElementById('hero-primary-cta');
  const heroPrevBtn = document.getElementById('hero-prev-btn');
  const heroNextBtn = document.getElementById('hero-next-btn');
  const heroActiveNum = document.getElementById('hero-active-num');
  
  const navHeader = document.getElementById('main-nav');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const langToggleBtns = document.querySelectorAll('.lang-toggle-btn');
  
  const occasionsContainer = document.getElementById('occasions-container');
  const collectionsContainer = document.getElementById('collections-container');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const conciergeForm = document.getElementById('concierge-form');
  const floatingWhatsappBtn = document.getElementById('floating-whatsapp-bar');
  const quickViewModal = document.getElementById('quick-view-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const expandCanvasCard = document.getElementById('expand-canvas-card');
  
  const reviewsSection = document.getElementById('reviews');
  const reviewsStage = document.getElementById('reviews-stage');
  const revPrevBtn = document.getElementById('rev-prev-btn');
  const revNextBtn = document.getElementById('rev-next-btn');
  const revActiveNum = document.getElementById('rev-active-num');

  // --- 1. VANTAGE-INSPIRED ONE-SHOT CINEMATIC ENTRANCE ---
  function initOneShotEntrance() {
    renderHeroHeadlineLines();
    updateFloralCarouselRoles();
    
    requestAnimationFrame(() => {
      setTimeout(() => {
        htmlEl.classList.remove('motion-pending');
        if (heroSection) heroSection.classList.add('hero-loaded');
      }, 100);
    });
  }

  function renderHeroHeadlineLines() {
    if (!heroHeadline) return;
    const isAr = currentLang === 'ar';
    const line1 = isAr ? 'زهور تبقى' : 'Blooms That';
    const line2 = isAr ? 'في الذاكرة' : 'Linger in Memory';

    heroHeadline.innerHTML = `
      <span class="hero-line-mask">
        <span class="hero-line-inner delay-300">${line1}</span>
      </span>
      <span class="hero-line-mask">
        <span class="hero-line-inner delay-440">${line2}</span>
      </span>
    `;
  }

  // --- 2. TOONHUB-INSPIRED SYNCHRONIZED FLORAL DEPTH CAROUSEL ---
  function updateFloralCarouselRoles() {
    if (!floralObjects.length) return;

    floralObjects.forEach((obj, idx) => {
      const offset = (idx - heroActiveIdx + heroSlideCount) % heroSlideCount;

      if (offset === 0) {
        obj.setAttribute('data-role', 'center');
      } else if (offset === 1) {
        obj.setAttribute('data-role', 'right');
      } else if (offset === heroSlideCount - 1) {
        obj.setAttribute('data-role', 'left');
      } else {
        obj.setAttribute('data-role', 'back');
      }
    });

    const currentSlideData = data.heroSlides && data.heroSlides[heroActiveIdx];
    if (currentSlideData && heroSection) {
      heroSection.style.setProperty('--hero-bg-tone', currentSlideData.bgTone || '#090807');
    }

    if (heroActiveNum) {
      heroActiveNum.textContent = `0${heroActiveIdx + 1}`;
    }
  }

  function navigateHero(direction) {
    if (isHeroAnimating) return;
    isHeroAnimating = true;

    if (direction === 'next') {
      heroActiveIdx = (heroActiveIdx + 1) % heroSlideCount;
    } else {
      heroActiveIdx = (heroActiveIdx - 1 + heroSlideCount) % heroSlideCount;
    }

    updateFloralCarouselRoles();

    setTimeout(() => {
      isHeroAnimating = false;
    }, 650);
  }

  if (heroNextBtn) heroNextBtn.addEventListener('click', () => { resetHeroAutoTimer(); navigateHero('next'); });
  if (heroPrevBtn) heroPrevBtn.addEventListener('click', () => { resetHeroAutoTimer(); navigateHero('prev'); });

  function startHeroAutoTimer() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    clearInterval(heroAutoTimer);
    heroAutoTimer = setInterval(() => navigateHero('next'), 7500);
  }

  function resetHeroAutoTimer() {
    clearInterval(heroAutoTimer);
    startHeroAutoTimer();
  }

  startHeroAutoTimer();

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      resetHeroAutoTimer();
      currentLang === 'ar' ? navigateHero('next') : navigateHero('prev');
    } else if (e.key === 'ArrowRight') {
      resetHeroAutoTimer();
      currentLang === 'ar' ? navigateHero('prev') : navigateHero('next');
    }
  });

  // Mobile Touch Swipe for Floral Carousel
  let touchStartX = 0;
  let touchStartY = 0;

  if (heroSection) {
    heroSection.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      const deltaY = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
        resetHeroAutoTimer();
        const isAr = currentLang === 'ar';
        if (deltaX < 0) {
          isAr ? navigateHero('prev') : navigateHero('next');
        } else {
          isAr ? navigateHero('next') : navigateHero('prev');
        }
      }
    }, { passive: true });
  }

  // --- 3. RESTRAINED DESKTOP POINTER DEPTH PARALLAX ---
  if (heroSection && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = window.innerWidth * 0.5;
    let mouseY = window.innerHeight * 0.5;
    let currentX = mouseX;
    let currentY = mouseY;
    let isMouseInside = false;
    let rafParallax = null;

    function parallaxLoop() {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      const rect = heroSection.getBoundingClientRect();
      const normX = ((currentX - rect.width / 2) / (rect.width / 2));
      const normY = ((currentY - rect.height / 2) / (rect.height / 2));

      heroSection.style.setProperty('--bg-shift-x', `${(normX * -2).toFixed(1)}px`);
      heroSection.style.setProperty('--bg-shift-y', `${(normY * -2).toFixed(1)}px`);
      heroSection.style.setProperty('--side-shift-x', `${(normX * -3.5).toFixed(1)}px`);
      heroSection.style.setProperty('--side-shift-y', `${(normY * -3.5).toFixed(1)}px`);
      heroSection.style.setProperty('--main-shift-x', `${(normX * -5.5).toFixed(1)}px`);
      heroSection.style.setProperty('--main-shift-y', `${(normY * -5.5).toFixed(1)}px`);
      heroSection.style.setProperty('--fg-shift-x', `${(normX * -7.5).toFixed(1)}px`);
      heroSection.style.setProperty('--fg-shift-y', `${(normY * -7.5).toFixed(1)}px`);

      if (isMouseInside) {
        rafParallax = requestAnimationFrame(parallaxLoop);
      }
    }

    heroSection.addEventListener('mouseenter', (e) => {
      isMouseInside = true;
      const rect = heroSection.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      currentX = mouseX;
      currentY = mouseY;
      cancelAnimationFrame(rafParallax);
      rafParallax = requestAnimationFrame(parallaxLoop);
    });

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });

    heroSection.addEventListener('mouseleave', () => {
      isMouseInside = false;
      heroSection.style.setProperty('--main-shift-x', '0px');
      heroSection.style.setProperty('--main-shift-y', '0px');
      heroSection.style.setProperty('--fg-shift-x', '0px');
      heroSection.style.setProperty('--fg-shift-y', '0px');
    });
  }

  // --- 4. MAGNETIC HERO CTA (Desktop) ---
  if (heroPrimaryCta && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    heroPrimaryCta.addEventListener('mousemove', (e) => {
      const rect = heroPrimaryCta.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) * 0.2;
      const y = (e.clientY - (rect.top + rect.height / 2)) * 0.2;
      heroPrimaryCta.style.setProperty('--btn-mag-x', `${x.toFixed(1)}px`);
      heroPrimaryCta.style.setProperty('--btn-mag-y', `${y.toFixed(1)}px`);
    });

    heroPrimaryCta.addEventListener('mouseleave', () => {
      heroPrimaryCta.style.setProperty('--btn-mag-x', '0px');
      heroPrimaryCta.style.setProperty('--btn-mag-y', '0px');
    });
  }

  // --- 5. CUSTOMER REVIEWS & PARALLAX LIQUID-GLASS ARCHITECTURE ---
  function renderReviews() {
    if (!reviewsStage) return;
    const isAr = currentLang === 'ar';
    const reviews = data.customerReviews || [];

    reviewsStage.innerHTML = reviews.map((rev, idx) => {
      const quote = isAr ? rev.quoteAr : (rev.quoteEn || rev.quoteAr);
      const occasion = isAr ? rev.occasionAr : (rev.occasionEn || rev.occasionAr);
      const city = isAr ? (rev.cityAr || 'جدة') : (rev.cityEn || 'Jeddah');
      const author = rev.customerName || '';
      const initial = author ? author.charAt(0) : '✦';
      
      const offset = (idx - revActiveIdx + reviewCount) % reviewCount;
      let role = 'active';
      if (offset === 1) role = 'next';
      else if (offset === reviewCount - 1) role = 'prev';
      else if (offset !== 0) role = 'prev';

      return `
        <div class="review-card" data-idx="${idx}" data-role="${role}">
          <div>
            <div class="flex items-center justify-between gap-4 mb-5">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] font-bold text-sm flex items-center justify-center font-display">
                  ${initial}
                </div>
                <div>
                  <h4 class="text-sm font-bold text-white font-display">${author}</h4>
                  <p class="text-[11px] text-stone-400">${city}</p>
                </div>
              </div>
              <span class="text-[10px] text-[#D4AF37] font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10">
                ${occasion}
              </span>
            </div>
            
            <p class="text-base sm:text-lg lg:text-xl text-stone-100 font-light leading-relaxed mb-6 font-display">
              «${quote}»
            </p>
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-stone-400">
            <span data-i18n="reviewsSec.verified">${data.translations[currentLang].reviewsSec.verified || 'تجربة إهداء موثقة'}</span>
            <span class="text-[#D4AF37] font-mono text-xs">${rev.source || 'WhatsApp'}</span>
          </div>
        </div>
      `;
    }).join('');

    if (revActiveNum) {
      revActiveNum.textContent = `0${revActiveIdx + 1}`;
    }
  }

  function navigateReview(direction) {
    if (isRevAnimating) return;
    isRevAnimating = true;

    if (direction === 'next') {
      revActiveIdx = (revActiveIdx + 1) % reviewCount;
    } else {
      revActiveIdx = (revActiveIdx - 1 + reviewCount) % reviewCount;
    }

    renderReviews();

    setTimeout(() => {
      isRevAnimating = false;
    }, 600);
  }

  if (revNextBtn) revNextBtn.addEventListener('click', () => { resetRevAutoTimer(); navigateReview('next'); });
  if (revPrevBtn) revPrevBtn.addEventListener('click', () => { resetRevAutoTimer(); navigateReview('prev'); });

  function startRevAutoTimer() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    clearInterval(revAutoTimer);
    revAutoTimer = setInterval(() => {
      if (isReviewsInView) navigateReview('next');
    }, 8000);
  }

  function resetRevAutoTimer() {
    clearInterval(revAutoTimer);
    startRevAutoTimer();
  }

  startRevAutoTimer();

  // Reviews mobile touch swipe
  let revTouchStartX = 0;
  let revTouchStartY = 0;

  if (reviewsSection) {
    reviewsSection.addEventListener('touchstart', (e) => {
      revTouchStartX = e.touches[0].clientX;
      revTouchStartY = e.touches[0].clientY;
    }, { passive: true });

    reviewsSection.addEventListener('touchend', (e) => {
      const deltaX = e.changedTouches[0].clientX - revTouchStartX;
      const deltaY = e.changedTouches[0].clientY - revTouchStartY;
      if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
        resetRevAutoTimer();
        const isAr = currentLang === 'ar';
        if (deltaX < 0) {
          isAr ? navigateReview('prev') : navigateReview('next');
        } else {
          isAr ? navigateReview('next') : navigateReview('prev');
        }
      }
    }, { passive: true });

    reviewsSection.addEventListener('mouseenter', () => clearInterval(revAutoTimer));
    reviewsSection.addEventListener('mouseleave', () => resetRevAutoTimer());
  }

  // Two-Layer Parallax Optimization with IntersectionObserver & RAF batching
  const reviewsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isReviewsInView = entry.isIntersecting;
    });
  }, { rootMargin: '100px 0px 100px 0px' });

  if (reviewsSection) reviewsObserver.observe(reviewsSection);

  function updateReviewsParallax() {
    if (!reviewsSection || !isReviewsInView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = reviewsSection.getBoundingClientRect();
    const windowH = window.innerHeight;
    const progress = Math.max(0, Math.min(1, (windowH - rect.top) / (windowH + rect.height)));
    const isDesktop = window.innerWidth >= 1024;

    const stageRange = isDesktop ? 120 : 35;
    const fgRange = isDesktop ? 220 : 65;

    const stageY = (0.5 - progress) * stageRange;
    const fgY = (0.5 - progress) * fgRange;

    reviewsSection.style.setProperty('--reviews-stage-y', `${stageY.toFixed(1)}px`);
    reviewsSection.style.setProperty('--reviews-fg-y', `${fgY.toFixed(1)}px`);
  }

  // --- 6. LANGUAGE SWITCHER ENGINE ---
  function applyTranslations() {
    const t = data.translations[currentLang];
    htmlEl.lang = currentLang;
    htmlEl.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

    document.title = currentLang === 'ar' 
      ? `${data.businessConfig.brandAr} — بوتيك الزهور الفاخرة في جدة`
      : `${data.businessConfig.brandEn} — Fine Floral Boutique Jeddah`;

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
      if (val !== null) el.textContent = val;
    });

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
      if (val !== null) el.setAttribute('placeholder', val);
    });

    langToggleBtns.forEach(btn => {
      btn.textContent = t.langBtn;
      btn.setAttribute('aria-label', currentLang === 'ar' ? 'Switch to English' : 'التحويل إلى العربية');
    });

    renderHeroHeadlineLines();
    updateFloralCarouselRoles();
    renderMarquee();
    renderOccasions();
    renderCollections();
    renderReviews();
    renderConciergeOptions();

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

  // --- 7. MARQUEE RENDERER ---
  function renderMarquee() {
    const marqueeContainer = document.getElementById('marquee-content');
    if (!marqueeContainer) return;
    const items = data.translations[currentLang].marquee;
    const content = items.map(text => `
      <span class="inline-flex items-center gap-4 text-xs tracking-wider uppercase font-medium text-stone-300">
        <span>${text}</span>
        <span class="text-[#D4AF37] opacity-60">✦</span>
      </span>
    `).join('');
    
    marqueeContainer.innerHTML = `${content} ${content} ${content}`;
  }

  // --- 8. OCCASIONS SECTION ---
  function renderOccasions() {
    if (!occasionsContainer) return;
    const isAr = currentLang === 'ar';
    const tSec = data.translations[currentLang].occasionsSec;

    occasionsContainer.innerHTML = data.occasions.map((occ) => {
      const title = isAr ? occ.titleAr : occ.titleEn;
      const desc = isAr ? occ.descAr : occ.descEn;
      return `
        <div class="group relative overflow-hidden rounded-2xl bg-white border border-[#E2D8C9] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between">
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
              class="w-full py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#F8F5EF] hover:bg-[#D4AF37] hover:text-black text-stone-800 border border-[#E2D8C9] transition-all duration-300 flex items-center justify-center gap-2 group-hover:border-[#D4AF37] cursor-pointer"
            >
              <span>${tSec.selectCta}</span>
              <span class="text-sm transition-transform ${isAr ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}">${isAr ? '←' : '→'}</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

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

  // --- 9. COLLECTIONS SECTION & FILTER TABS ---
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
        <div class="flower-card rounded-2xl bg-white border border-[#E2D8C9] overflow-hidden flex flex-col justify-between group shadow-sm">
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
              <span class="glass-pill text-xs font-semibold text-stone-900 bg-white/85 px-4 py-2 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
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
                class="py-2.5 px-3 rounded-xl text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors text-center cursor-pointer"
              >
                ${tSec.viewDetails}
              </button>
              <button 
                type="button" 
                onclick="window.orderDirectItem('${item.id}')"
                class="py-2.5 px-3 rounded-xl text-xs font-semibold text-stone-950 bg-[#D4AF37] hover:bg-[#E2C766] transition-colors text-center shadow-xs cursor-pointer"
              >
                ${tSec.orderItem}
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

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

  window.orderDirectItem = function(itemId) {
    const item = data.collections.find(c => c.id === itemId);
    if (!item) return;
    const isAr = currentLang === 'ar';
    const title = isAr ? item.titleAr : item.titleEn;
    const price = isAr ? item.priceAr : item.priceEn;

    const msg = isAr
      ? `مرحباً بوتيك ميديلين للزهور 🌸\nأرغب بطلب: *${title}* (${price}).\nهل التنسيق متوفر للتوصيل السريع اليوم في جدة؟`
      : `Hello Medellin Floral Atelier 🌸\nI would like to order: *${title}* (${price}).\nIs this arrangement available for express delivery today in Jeddah?`;

    const url = `https://wa.me/${data.businessConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  // --- 10. QUICK VIEW / LIGHTBOX MODAL ---
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

  // --- 11. INTERACTIVE BESPOKE CONCIERGE ENGINE ---
  function renderConciergeOptions() {
    const isAr = currentLang === 'ar';
    const t = data.translations[currentLang].conciergeSec;

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

  if (conciergeForm) {
    conciergeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const isAr = currentLang === 'ar';

      const deliveryInput = document.getElementById('concierge-delivery-input');
      const noteInput = document.getElementById('concierge-note-input');

      const deliveryVal = deliveryInput ? deliveryInput.value.trim() : '';
      const noteVal = noteInput ? noteInput.value.trim() : '';

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
        ? `مرحباً بوتيك ميديلين للزهور 🌸\nأرغب بطلب تنسيق مخصص عبر المنسق الشخصي:\n` +
          `• المناسبة: *${occName}*\n` +
          `• الميزانية التقريبية: *${budgetLabel}*\n` +
          `• درجات الألوان: *${paletteLabel}*\n` +
          (deliveryVal ? `• موعد التوصيل المطلوب: *${deliveryVal}*\n` : '') +
          (noteVal ? `• نص كرت الإهداء: "${noteVal}"\n` : '') +
          `\nيرجى تأكيد الاستلام وإرسال صور الورد للتأكيد. شكراً لكم.`
        : `Hello Medellin Floral Atelier 🌸\nI would like to place a bespoke floral order:\n` +
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

  // --- 12. SCROLL CONTROLLER & PERFORMANCE RAF ---
  let isScrollPending = false;
  window.addEventListener('scroll', () => {
    if (!isScrollPending) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Navbar state
        if (navHeader) {
          if (scrollY > 50) {
            navHeader.classList.add('scrolled');
          } else {
            navHeader.classList.remove('scrolled');
          }
        }

        // Reviews Two-Layer Parallax
        updateReviewsParallax();

        // Floating WhatsApp Bar appearance on mobile
        if (floatingWhatsappBtn) {
          if (scrollY > 350) {
            floatingWhatsappBtn.classList.remove('translate-y-32', 'opacity-0');
            floatingWhatsappBtn.classList.add('translate-y-0', 'opacity-100');
          } else {
            floatingWhatsappBtn.classList.add('translate-y-32', 'opacity-0');
            floatingWhatsappBtn.classList.remove('translate-y-0', 'opacity-100');
          }
        }

        isScrollPending = false;
      });
      isScrollPending = true;
    }
  }, { passive: true });

  // --- 13. MOBILE MENU DRAWER ---
  function openMobileMenu() {
    if (!mobileMenuDrawer) return;
    mobileMenuDrawer.classList.remove('hidden');
    mobileMenuDrawer.classList.add('flex');
    mobileMenuDrawer.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileMenuDrawer) return;
    mobileMenuDrawer.setAttribute('aria-expanded', 'false');
    mobileMenuDrawer.classList.add('hidden');
    mobileMenuDrawer.classList.remove('flex');
    document.body.style.overflow = '';
  }

  if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openMobileMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
  
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // --- 14. SCROLL REVEAL OBSERVER & EXPANDING CANVAS OBSERVER ---
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.scroll-reveal').forEach(el => {
    revealObserver.observe(el);
  });

  if (expandCanvasCard) {
    const expandObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          expandCanvasCard.classList.add('is-expanded');
        }
      });
    }, {
      threshold: 0.25
    });
    expandObserver.observe(expandCanvasCard);
  }

  // --- INITIAL EXECUTION ---
  applyTranslations();
  initOneShotEntrance();
});
