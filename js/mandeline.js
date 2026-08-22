/**
 * MANDELINE (مندلين) — Final Premium Interactive Controller & Motion Engine
 * Combines: TOONHUB Synchronized Floral Carousel + Vantage One-Shot Staged Entrance +
 * Lithos Spotlight Reveal + Velorah-style Parallax Reviews + Bilingual Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.MandelineData;
  if (!data) return;

  // --- Global App State ---
  let currentLang = localStorage.getItem('mandeline_lang') || 'ar';
  let activeFilter = 'all';
  let activeModalItem = null;
  
  // Hero Carousel State
  let heroActiveIdx = 0;
  let isHeroAnimating = false;
  let heroAutoTimer = null;
  const heroSlideCount = (data.heroSlides && data.heroSlides.length) || 4;

  // Reviews Carousel State
  let revActiveIdx = 0;
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
  const heroSpotlight = document.getElementById('hero-spotlight');
  const heroHeadline = document.getElementById('hero-headline');
  const heroPrimaryCta = document.getElementById('hero-primary-cta');
  const heroPrevBtn = document.getElementById('hero-prev-btn');
  const heroNextBtn = document.getElementById('hero-next-btn');
  const heroActiveNum = document.getElementById('hero-active-num');
  const heroCarouselSlides = document.querySelectorAll('.hero-carousel-slide');
  
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
  
  const reviewsTrack = document.getElementById('reviews-carousel-track');
  const revPrevBtn = document.getElementById('rev-prev-btn');
  const revNextBtn = document.getElementById('rev-next-btn');
  const reviewsDots = document.getElementById('reviews-dots');

  // --- 1. VANTAGE-INSPIRED ONE-SHOT CINEMATIC ENTRANCE ---
  function initOneShotEntrance() {
    renderHeroWords();
    
    // Remove motion-pending and add hero-loaded after brief layout stability
    requestAnimationFrame(() => {
      setTimeout(() => {
        htmlEl.classList.remove('motion-pending');
        if (heroSection) heroSection.classList.add('hero-loaded');
      }, 100);
    });
  }

  function renderHeroWords() {
    if (!heroHeadline) return;
    const t = data.translations[currentLang].hero;
    const words = t.words;
    
    heroHeadline.innerHTML = '';
    words.forEach((word, idx) => {
      const wrap = document.createElement('span');
      wrap.className = 'word-mask-wrap mx-1.5 inline-block';
      
      const span = document.createElement('span');
      span.className = `reveal-word delay-${idx === 0 ? '300' : idx === 1 ? '440' : idx === 2 ? '700' : '900'} inline-block`;
      span.textContent = word;
      
      wrap.appendChild(span);
      heroHeadline.appendChild(wrap);
    });
  }

  // --- 2. TOONHUB-INSPIRED SYNCHRONIZED FLORAL CAROUSEL ---
  function updateHeroCarouselRoles() {
    if (!heroCarouselSlides.length) return;

    heroCarouselSlides.forEach((slide, idx) => {
      // Calculate circular offset relative to heroActiveIdx
      const offset = (idx - heroActiveIdx + heroSlideCount) % heroSlideCount;

      if (offset === 0) {
        slide.setAttribute('data-role', 'center');
      } else if (offset === 1) {
        slide.setAttribute('data-role', 'right');
      } else if (offset === heroSlideCount - 1) {
        slide.setAttribute('data-role', 'left');
      } else {
        slide.setAttribute('data-role', 'back');
      }
    });

    // Update background tone smoothly
    const currentSlideData = data.heroSlides[heroActiveIdx];
    if (currentSlideData && heroSection) {
      heroSection.style.setProperty('--hero-bg-tone', currentSlideData.bgTone || '#090807');
      if (heroSpotlight && currentSlideData.revealImage) {
        heroSpotlight.style.backgroundImage = `url('${currentSlideData.revealImage}')`;
      }
    }

    // Update indicator counter
    if (heroActiveNum) {
      heroActiveNum.textContent = `0${heroActiveIdx + 1}`;
    }
  }

  function goToHeroSlide(targetIdx) {
    if (isHeroAnimating) return;
    isHeroAnimating = true;

    heroActiveIdx = (targetIdx + heroSlideCount) % heroSlideCount;
    updateHeroCarouselRoles();

    setTimeout(() => {
      isHeroAnimating = false;
    }, 650); // 650ms animation lock matching TOONHUB easing duration
  }

  function nextHeroSlide() {
    goToHeroSlide(heroActiveIdx + 1);
  }

  function prevHeroSlide() {
    goToHeroSlide(heroActiveIdx - 1);
  }

  if (heroNextBtn) heroNextBtn.addEventListener('click', () => { resetHeroAutoTimer(); nextHeroSlide(); });
  if (heroPrevBtn) heroPrevBtn.addEventListener('click', () => { resetHeroAutoTimer(); prevHeroSlide(); });

  // Auto-advance Timer (7.5s interval, paused on reduced-motion or user interaction)
  function startHeroAutoTimer() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    clearInterval(heroAutoTimer);
    heroAutoTimer = setInterval(nextHeroSlide, 7500);
  }

  function resetHeroAutoTimer() {
    clearInterval(heroAutoTimer);
    startHeroAutoTimer();
  }

  startHeroAutoTimer();

  // Mobile Touch Swipe for Hero Carousel
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
          isAr ? prevHeroSlide() : nextHeroSlide();
        } else {
          isAr ? nextHeroSlide() : prevHeroSlide();
        }
      }
    }, { passive: true });
  }

  // --- 3. DESKTOP SPOTLIGHT & POINTER PARALLAX (Lithos RAF Lerp) ---
  let isPointerInside = false;
  let mouseX = window.innerWidth * 0.7;
  let mouseY = window.innerHeight * 0.5;
  let spotX = mouseX;
  let spotY = mouseY;
  let rafId = null;

  function updateMotionLoop() {
    // Lerp smooth interpolation (0.09 factor)
    spotX += (mouseX - spotX) * 0.09;
    spotY += (mouseY - spotY) * 0.09;

    if (heroSpotlight) {
      heroSpotlight.style.setProperty('--spot-x', `${spotX.toFixed(1)}px`);
      heroSpotlight.style.setProperty('--spot-y', `${spotY.toFixed(1)}px`);
    }

    if (heroSection) {
      const rect = heroSection.getBoundingClientRect();
      const normX = ((spotX - rect.width / 2) / (rect.width / 2));
      const normY = ((spotY - rect.height / 2) / (rect.height / 2));

      // Multi-layer pointer parallax
      heroSection.style.setProperty('--bg-shift-x', `${(normX * -2).toFixed(1)}px`);
      heroSection.style.setProperty('--bg-shift-y', `${(normY * -2).toFixed(1)}px`);
      heroSection.style.setProperty('--main-shift-x', `${(normX * -5).toFixed(1)}px`);
      heroSection.style.setProperty('--main-shift-y', `${(normY * -5).toFixed(1)}px`);
      heroSection.style.setProperty('--fg-shift-x', `${(normX * -9).toFixed(1)}px`);
      heroSection.style.setProperty('--fg-shift-y', `${(normY * -9).toFixed(1)}px`);
    }

    if (isPointerInside) {
      rafId = requestAnimationFrame(updateMotionLoop);
    }
  }

  if (heroSection && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    heroSection.addEventListener('mouseenter', (e) => {
      isPointerInside = true;
      const rect = heroSection.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      spotX = mouseX;
      spotY = mouseY;
      if (heroSpotlight) heroSpotlight.style.setProperty('--spot-opacity', '1');
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateMotionLoop);
    });

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });

    heroSection.addEventListener('mouseleave', () => {
      isPointerInside = false;
      if (heroSpotlight) heroSpotlight.style.setProperty('--spot-opacity', '0');
      if (heroSection) {
        heroSection.style.setProperty('--main-shift-x', '0px');
        heroSection.style.setProperty('--main-shift-y', '0px');
      }
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

  // --- 5. CUSTOMER REVIEWS & PARALLAX DEPTH ENGINE ---
  function renderReviews() {
    if (!reviewsTrack) return;
    const isAr = currentLang === 'ar';
    const reviews = data.customerReviews || [];

    reviewsTrack.innerHTML = reviews.map((rev, idx) => {
      const quote = isAr ? rev.quoteAr : (rev.quoteEn || rev.quoteAr);
      const occasion = isAr ? rev.occasionAr : (rev.occasionEn || rev.occasionAr);
      const initial = rev.customerName ? rev.customerName.charAt(0) : '✦';
      const isCenter = idx === revActiveIdx;
      const role = isCenter ? 'active' : 'neighbor';

      return `
        <div class="review-slide rounded-3xl p-8 bg-gradient-to-b from-[#181514] to-[#12100F] border border-white/10 shadow-xl flex flex-col justify-between" data-role="${role}">
          <div>
            <div class="flex items-center justify-between gap-4 mb-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] font-bold text-sm flex items-center justify-center font-display">
                  ${initial}
                </div>
                <div>
                  <h4 class="text-sm font-bold text-white font-display">${rev.customerName}</h4>
                  <p class="text-[11px] text-stone-400">${rev.city || 'جدة'}</p>
                </div>
              </div>
              <span class="text-[10px] text-[#D4AF37] font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10">
                ${occasion}
              </span>
            </div>
            
            <p class="text-sm text-stone-300 font-light leading-relaxed mb-6 font-serif-ar">
              «${quote}»
            </p>
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-white/5 text-[11px] text-stone-500">
            <span>تجربة إهداء معتمدة</span>
            <span class="text-[#D4AF37]">✦</span>
          </div>
        </div>
      `;
    }).join('');

    // Render Indicator Dots
    if (reviewsDots) {
      reviewsDots.innerHTML = reviews.map((_, idx) => `
        <button 
          type="button" 
          onclick="window.goToReviewSlide(${idx})" 
          class="w-2 h-2 rounded-full transition-all cursor-pointer ${idx === revActiveIdx ? 'w-6 bg-[#D4AF37]' : 'bg-white/20 hover:bg-white/40'}"
          aria-label="Review ${idx + 1}"
        ></button>
      `).join('');
    }
  }

  window.goToReviewSlide = function(idx) {
    revActiveIdx = (idx + reviewCount) % reviewCount;
    renderReviews();
  };

  if (revNextBtn) revNextBtn.addEventListener('click', () => { window.goToReviewSlide(revActiveIdx + 1); });
  if (revPrevBtn) revPrevBtn.addEventListener('click', () => { window.goToReviewSlide(revActiveIdx - 1); });

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

    renderHeroWords();
    updateHeroCarouselRoles();
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
              class="w-full py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#F8F5EF] hover:bg-[#D4AF37] hover:text-black text-stone-800 border border-[#E2D8C9] transition-all duration-300 flex items-center justify-center gap-2 group-hover:border-[#D4AF37]"
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
      ? `مرحباً بوتيك مندلين للزهور 🌸\nأرغب بطلب: *${title}* (${price}).\nهل التنسيق متوفر للتوصيل السريع اليوم في جدة؟`
      : `Hello Mandeline Floral Atelier 🌸\nI would like to order: *${title}* (${price}).\nIs this arrangement available for express delivery today in Jeddah?`;

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
        ? `مرحباً بوتيك مندلين للزهور 🌸\nأرغب بطلب تنسيق مخصص عبر المنسق الشخصي:\n` +
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

  // --- 12. SCROLL & PROGRESSIVE MOTION CONTROLLER ---
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

        // Hero scroll-out parallax
        if (scrollY < window.innerHeight && heroHeadline) {
          const offset = scrollY * 0.15;
          const opacity = Math.max(0, 1 - (scrollY / 700));
          heroHeadline.style.transform = `translateY(-${offset.toFixed(1)}px)`;
          heroHeadline.style.opacity = opacity.toFixed(2);
        }

        // Reviews section foreground parallax (Velorah concept)
        const reviewsSection = document.getElementById('reviews');
        if (reviewsSection) {
          const rect = reviewsSection.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const shiftY = ((window.innerHeight - rect.top) * 0.08) - 30;
            reviewsSection.style.setProperty('--reviews-fg-y', `${shiftY.toFixed(1)}px`);
          }
        }

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
    mobileMenuDrawer.classList.remove('translate-x-full', '-translate-x-full', 'hidden');
    mobileMenuDrawer.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileMenuDrawer) return;
    const isAr = currentLang === 'ar';
    mobileMenuDrawer.classList.add(isAr ? '-translate-x-full' : 'translate-x-full');
    mobileMenuDrawer.setAttribute('aria-expanded', 'false');
    setTimeout(() => {
      mobileMenuDrawer.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
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
