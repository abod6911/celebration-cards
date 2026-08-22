/**
 * MANDELINE / MEDELLIN (ميديلين) — Luxury E-Commerce Interactive Engine
 * Orchestrates:
 * 1. Synchronized Floral Depth Hero Carousel (TOONHUB 3D Layering)
 * 2. Prestige Trust-Badge System
 * 3. Interactive 3-Step Bespoke Floral Configurator with Live Calligraphy Card Preview
 * 4. Wishlist Drawer & Toast Notification System
 * 5. Botanical Quick-View Lightbox with Full Stem Specifications
 * 6. Instagram UGC Feed (#MedellinMoments)
 * 7. Customer Reviews Frame & Dual-Layer Parallax
 * 8. VIP Private Previews Newsletter
 * 9. Real-time AR/EN Localization Sync
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.MandelineData;
  if (!data) return;

  // Ensure page always starts from the very top on load/reload
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  if (!window.location.hash || window.location.hash === '#' || window.location.hash === '#hero-section') {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }

  // --- Global App State ---
  let currentLang = localStorage.getItem('mandeline_lang') || 'ar';
  let activeFilter = 'all';
  let activeModalItem = null;
  let currentConfigStep = 1;
  
  // Wishlist State (Persistent)
  let wishlist = JSON.parse(localStorage.getItem('medellin_wishlist') || '[]');
  
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

  // Concierge Custom Builder State
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
  const heroPrevBtn = document.getElementById('hero-prev-btn');
  const heroNextBtn = document.getElementById('hero-next-btn');
  const heroActiveNum = document.getElementById('hero-active-num');
  
  const navHeader = document.getElementById('main-nav');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const langToggleBtns = document.querySelectorAll('.lang-toggle-btn');
  const wishlistCountBadge = document.getElementById('wishlist-count-badge');
  const wishlistDrawer = document.getElementById('wishlist-drawer');
  const wishlistItemsContainer = document.getElementById('wishlist-items-container');
  
  const trustBadgesContainer = document.getElementById('trust-badges-container');
  const occasionsContainer = document.getElementById('occasions-container');
  const collectionsContainer = document.getElementById('collections-container');
  const ugcContainer = document.getElementById('ugc-container');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const floatingWhatsappBtn = document.getElementById('floating-whatsapp-bar');
  const quickViewModal = document.getElementById('quick-view-modal');
  const toastContainer = document.getElementById('luxury-toast-container');
  
  const reviewsSection = document.getElementById('reviews');
  const reviewsStage = document.getElementById('reviews-stage');
  const revPrevBtn = document.getElementById('rev-prev-btn');
  const revNextBtn = document.getElementById('rev-next-btn');
  const revActiveNum = document.getElementById('rev-active-num');

  // --- 1. CINEMATIC ONE-SHOT ENTRANCE ---
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

  // --- 2. SYNCHRONIZED FLORAL DEPTH CAROUSEL ---
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

  if (heroPrevBtn) {
    heroPrevBtn.addEventListener('click', () => {
      clearInterval(heroAutoTimer);
      navigateHero('prev');
      startHeroAutoPlay();
    });
  }

  if (heroNextBtn) {
    heroNextBtn.addEventListener('click', () => {
      clearInterval(heroAutoTimer);
      navigateHero('next');
      startHeroAutoPlay();
    });
  }

  function startHeroAutoPlay() {
    clearInterval(heroAutoTimer);
    heroAutoTimer = setInterval(() => {
      if (!document.hidden && !isHeroAnimating) {
        navigateHero('next');
      }
    }, 6000);
  }
  startHeroAutoPlay();

  // Keyboard navigation for hero
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      currentLang === 'ar' ? navigateHero('prev') : navigateHero('next');
    } else if (e.key === 'ArrowLeft') {
      currentLang === 'ar' ? navigateHero('next') : navigateHero('prev');
    }
  });

  // Touch Swipe for Hero
  let heroTouchStartX = 0;
  if (heroSection) {
    heroSection.addEventListener('touchstart', (e) => {
      heroTouchStartX = e.touches[0].clientX;
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
      const heroTouchEndX = e.changedTouches[0].clientX;
      const diff = heroTouchEndX - heroTouchStartX;
      if (Math.abs(diff) > 45) {
        clearInterval(heroAutoTimer);
        if (diff > 0) {
          currentLang === 'ar' ? navigateHero('next') : navigateHero('prev');
        } else {
          currentLang === 'ar' ? navigateHero('prev') : navigateHero('next');
        }
        startHeroAutoPlay();
      }
    }, { passive: true });
  }

  // --- 3. PRESTIGE TRUST BADGES BAR ---
  function renderTrustBadges() {
    if (!trustBadgesContainer) return;
    const badges = data.translations[currentLang].trustBadges || [];

    trustBadgesContainer.innerHTML = badges.map(badge => `
      <div class="trust-badge-card group">
        <div class="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
          <i data-lucide="${badge.icon}" class="w-5 h-5"></i>
        </div>
        <div class="min-w-0">
          <h4 class="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug">${badge.title}</h4>
          <p class="text-[10px] sm:text-xs text-stone-400 font-medium truncate mt-0.5">${badge.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // --- 4. OCCASIONS SECTION ---
  function renderOccasions() {
    if (!occasionsContainer) return;
    const isAr = currentLang === 'ar';
    const tSec = data.translations[currentLang].occasionsSec;

    occasionsContainer.innerHTML = data.occasions.map((occ) => {
      const title = isAr ? occ.titleAr : occ.titleEn;
      const count = isAr ? occ.countAr : occ.countEn;
      const desc = isAr ? occ.descAr : occ.descEn;

      return `
        <div class="group relative overflow-hidden rounded-3xl bg-white border-2 border-[#E5DBC7] shadow-md hover:shadow-2xl hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between">
          <div class="relative aspect-4/3 overflow-hidden bg-stone-100">
            <img 
              src="${occ.image}" 
              alt="${title}"
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 group-hover:opacity-75 transition-opacity"></div>
            
            <div class="absolute top-3.5 ${isAr ? 'right-3.5' : 'left-3.5'}">
              <span class="bg-black/80 border border-[#D4AF37]/50 text-[10px] sm:text-[11px] font-bold text-[#F3E5AB] px-3 py-1 rounded-full shadow-md backdrop-blur-md">
                ${count}
              </span>
            </div>

            <div class="absolute bottom-4 ${isAr ? 'right-4 text-right' : 'left-4 text-left'} text-white">
              <h3 class="text-xl font-bold font-display drop-shadow-md tracking-tight">${title}</h3>
            </div>
          </div>
          <div class="p-6 flex-1 flex flex-col justify-between">
            <p class="text-sm text-stone-800 font-medium leading-relaxed mb-6">${desc}</p>
            <button 
              type="button"
              onclick="window.selectOccasionAndScroll('${occ.id}', '${occ.defaultBudget}', '${occ.recommendedPalette}')"
              class="w-full py-3.5 px-4 rounded-2xl text-xs font-bold uppercase tracking-wider bg-stone-950 hover:bg-[#D4AF37] text-white hover:text-black border border-stone-900 hover:border-[#D4AF37] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
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
    window.goToConfigStep(1);

    const targetSection = document.getElementById('concierge');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- 5. COLLECTIONS SECTION & WISHLIST INTEGRATION ---
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
      const isSaved = wishlist.includes(item.id);

      return `
        <div class="flower-card rounded-3xl bg-white border-2 border-[#E5DBC7] overflow-hidden flex flex-col justify-between group shadow-md hover:shadow-2xl hover:border-[#D4AF37] transition-all duration-300 relative">
          <div class="relative aspect-4/3 overflow-hidden bg-stone-100 cursor-pointer" onclick="window.openQuickView('${item.id}')">
            <img 
              src="${item.image}" 
              alt="${title}"
              loading="lazy"
              class="flower-card-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            <!-- Tag Badge -->
            <div class="absolute top-3.5 ${isAr ? 'right-3.5' : 'left-3.5'}">
              <span class="bg-black/80 border border-[#D4AF37]/50 text-[11px] font-bold text-[#F3E5AB] px-3.5 py-1.5 rounded-full shadow-md backdrop-blur-md">
                ${tag}
              </span>
            </div>

            <!-- Wishlist Heart Button -->
            <button 
              type="button"
              onclick="event.stopPropagation(); window.toggleWishlist('${item.id}');"
              class="absolute top-3.5 ${isAr ? 'left-3.5' : 'right-3.5'} w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all z-10 shadow-lg cursor-pointer"
              aria-label="Toggle wishlist"
            >
              <svg class="w-4 h-4 ${isSaved ? 'fill-[#D4AF37] stroke-[#D4AF37]' : 'stroke-white fill-none'}" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </button>

            <!-- Quick View Overlay -->
            <div class="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span class="bg-white text-xs font-bold text-stone-950 px-4 py-2 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-transform shadow-xl border border-stone-200">
                ${tSec.viewDetails}
              </span>
            </div>
          </div>

          <div class="p-6 flex-1 flex flex-col justify-between">
            <div class="mb-4">
              <h3 class="font-display font-extrabold text-lg text-stone-950 leading-snug mb-1.5">${title}</h3>
              <p class="text-xs text-stone-700 font-medium line-clamp-2 leading-relaxed mb-3">${subtitle}</p>
              <div class="text-base font-extrabold text-[#9E7A1C] font-display">${price}</div>
            </div>

            <div class="flex items-center gap-2 pt-3 border-t border-stone-100">
              <button 
                type="button" 
                onclick="window.orderDirectItem('${item.id}')"
                class="flex-1 py-3 px-3 rounded-xl text-xs font-bold text-black bg-[#D4AF37] hover:bg-[#E2C766] transition-all text-center shadow-md cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
              >
                <i data-lucide="message-circle" class="w-4 h-4 shrink-0"></i>
                <span class="whitespace-nowrap">${isAr ? 'طلب التنسيق' : 'Order Now'}</span>
              </button>
              <button 
                type="button" 
                onclick="window.openQuickView('${item.id}')"
                class="py-3 px-4 rounded-xl text-xs font-bold text-stone-900 bg-stone-100 hover:bg-stone-200 transition-colors text-center cursor-pointer shrink-0 active:scale-95"
                aria-label="${tSec.viewDetails}"
              >
                <span class="whitespace-nowrap">${isAr ? 'التفاصيل' : 'Details'}</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-[#D4AF37]', 'text-black');
        b.classList.add('text-stone-300');
      });
      btn.classList.add('bg-[#D4AF37]', 'text-black');
      btn.classList.remove('text-stone-300');
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

  // --- 6. WISHLIST MANAGEMENT ---
  window.toggleWishlist = function(itemId) {
    const idx = wishlist.indexOf(itemId);
    const item = data.collections.find(c => c.id === itemId);
    const isAr = currentLang === 'ar';
    const title = item ? (isAr ? item.titleAr : item.titleEn) : 'التنسيق';

    if (idx > -1) {
      wishlist.splice(idx, 1);
      showLuxuryToast(isAr ? `تمت إزالة ${title} من المفضلة` : `Removed ${title} from saved items`);
    } else {
      wishlist.push(itemId);
      showLuxuryToast(isAr ? `تم حفظ ${title} في المفضلة ✨` : `Saved ${title} to wishlist ✨`);
    }

    localStorage.setItem('medellin_wishlist', JSON.stringify(wishlist));
    updateWishlistBadge();
    renderCollections();
    renderWishlistItems();
  };

  function updateWishlistBadge() {
    if (wishlistCountBadge) {
      wishlistCountBadge.textContent = wishlist.length;
      wishlistCountBadge.style.display = wishlist.length > 0 ? 'flex' : 'none';
    }
  }
  updateWishlistBadge();

  window.openWishlistDrawer = function() {
    if (!wishlistDrawer) return;
    renderWishlistItems();
    wishlistDrawer.classList.remove('hidden');
    wishlistDrawer.classList.add('flex');
    document.body.style.overflow = 'hidden';
  };

  window.closeWishlistDrawer = function() {
    if (!wishlistDrawer) return;
    wishlistDrawer.classList.add('hidden');
    wishlistDrawer.classList.remove('flex');
    document.body.style.overflow = '';
  };

  function renderWishlistItems() {
    if (!wishlistItemsContainer) return;
    const isAr = currentLang === 'ar';

    if (wishlist.length === 0) {
      wishlistItemsContainer.innerHTML = `
        <div class="py-12 text-center text-stone-500">
          <svg class="w-12 h-12 mx-auto stroke-stone-300 fill-none mb-3" viewBox="0 0 24 24" stroke-width="1.5">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
          <p class="text-sm font-semibold">${isAr ? 'لم تقم بحفظ أي تنسيقات بعد' : 'No saved arrangements yet'}</p>
          <p class="text-xs text-stone-400 mt-1">${isAr ? 'انقر على رمز القلب لحفظ التنسيقات المفضلة' : 'Click the heart icon on any bouquet to save it'}</p>
        </div>
      `;
      return;
    }

    const savedItems = data.collections.filter(c => wishlist.includes(c.id));
    wishlistItemsContainer.innerHTML = savedItems.map(item => {
      const title = isAr ? item.titleAr : item.titleEn;
      const price = isAr ? item.priceAr : item.priceEn;

      return `
        <div class="flex items-center gap-3 p-3 rounded-2xl bg-white border border-stone-200 shadow-xs">
          <img src="${item.image}" alt="${title}" class="w-16 h-16 rounded-xl object-cover shrink-0" />
          <div class="flex-1 min-w-0">
            <h4 class="text-xs font-bold text-stone-900 truncate font-display">${title}</h4>
            <div class="text-xs font-extrabold text-[#9E7A1C] mt-0.5">${price}</div>
          </div>
          <button 
            type="button" 
            onclick="window.orderDirectItem('${item.id}')"
            class="p-2 rounded-xl bg-[#D4AF37] text-black hover:bg-[#E2C766] transition-colors"
            title="${isAr ? 'طلب عبر واتساب' : 'Order on WhatsApp'}"
          >
            <i data-lucide="message-circle" class="w-4 h-4"></i>
          </button>
          <button 
            type="button" 
            onclick="window.toggleWishlist('${item.id}')"
            class="p-2 rounded-xl bg-stone-100 hover:bg-rose-100 text-stone-400 hover:text-rose-600 transition-colors"
            title="${isAr ? 'إزالة' : 'Remove'}"
          >
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      `;
    }).join('');

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // --- 7. INTERACTIVE 3-STEP BESPOKE CONFIGURATOR ---
  window.goToConfigStep = function(step) {
    currentConfigStep = step;
    const step1 = document.getElementById('config-step-1');
    const step2 = document.getElementById('config-step-2');
    const step3 = document.getElementById('config-step-3');

    const tab1 = document.getElementById('config-step-tab-1');
    const tab2 = document.getElementById('config-step-tab-2');
    const tab3 = document.getElementById('config-step-tab-3');

    if (step1) step1.classList.toggle('hidden', step !== 1);
    if (step2) step2.classList.toggle('hidden', step !== 2);
    if (step3) step3.classList.toggle('hidden', step !== 3);

    if (tab1) tab1.classList.toggle('active', step === 1);
    if (tab2) tab2.classList.toggle('active', step === 2);
    if (tab3) tab3.classList.toggle('active', step === 3);
  };

  window.updateCalligraphyPreview = function(text) {
    const previewEl = document.getElementById('calligraphy-card-text');
    if (!previewEl) return;
    if (text.trim().length > 0) {
      previewEl.textContent = `« ${text.trim()} »`;
    } else {
      const isAr = currentLang === 'ar';
      previewEl.textContent = isAr 
        ? '« سيتم كتابة رسالتكم هنا بخط عربي أنيق على ورق قطني فاخر... »'
        : '“Your words will appear here in bespoke typography on cotton paper...”';
    }
  };

  function renderConciergeOptions() {
    const isAr = currentLang === 'ar';
    const t = data.translations[currentLang].conciergeSec;

    // Step 1: Occasions
    const occasionContainer = document.getElementById('concierge-occasions-grid');
    if (occasionContainer) {
      occasionContainer.innerHTML = data.occasions.map(occ => {
        const title = isAr ? occ.titleAr : occ.titleEn;
        const isSelected = conciergeState.occasion === occ.id;
        return `
          <div 
            onclick="window.setConciergeOccasion('${occ.id}')"
            class="config-option-card ${isSelected ? 'selected' : ''}"
          >
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-xs font-bold ${isSelected ? 'text-[#F3E5AB]' : 'text-stone-200'} font-display">${title}</span>
              <span class="w-3.5 h-3.5 rounded-full border ${isSelected ? 'border-[#D4AF37] bg-[#D4AF37]' : 'border-white/30'} flex items-center justify-center">
                ${isSelected ? '<span class="w-1.5 h-1.5 rounded-full bg-black"></span>' : ''}
              </span>
            </div>
            <p class="text-[10px] text-stone-400 line-clamp-2">${isAr ? occ.descAr : occ.descEn}</p>
          </div>
        `;
      }).join('');
    }

    // Step 2: Budget Tiers
    const budgetContainer = document.getElementById('concierge-budget-grid');
    if (budgetContainer) {
      const budgets = [
        { id: '350', label: t.budgetOption1, tier: '350 SAR' },
        { id: '650', label: t.budgetOption2, tier: '650 SAR' },
        { id: '1200', label: t.budgetOption3, tier: '1,200 SAR' },
        { id: 'custom', label: t.budgetOption4, tier: 'VIP Open' }
      ];

      budgetContainer.innerHTML = budgets.map(b => {
        const isSelected = conciergeState.budget === b.id;
        return `
          <div 
            onclick="window.setConciergeBudget('${b.id}')"
            class="config-option-card ${isSelected ? 'selected' : ''}"
          >
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-bold ${isSelected ? 'text-[#F3E5AB]' : 'text-stone-200'}">${b.label}</span>
              <span class="w-3.5 h-3.5 rounded-full border ${isSelected ? 'border-[#D4AF37] bg-[#D4AF37]' : 'border-white/30'} flex items-center justify-center">
                ${isSelected ? '<span class="w-1.5 h-1.5 rounded-full bg-black"></span>' : ''}
              </span>
            </div>
          </div>
        `;
      }).join('');
    }

    // Step 2: Color Palettes
    const paletteContainer = document.getElementById('concierge-palette-grid');
    if (paletteContainer) {
      const palettes = [
        { id: 'champagne_blush', label: t.paletteRomantic, swatch: 'from-[#FAF0E6] to-[#E8D3CE]' },
        { id: 'burgundy_noir', label: t.paletteVelvet, swatch: 'from-[#3A171B] to-[#120D10]' },
        { id: 'white_gold', label: t.paletteWhite, swatch: 'from-[#FFFFFF] to-[#D4AF37]' },
        { id: 'florist_choice', label: t.paletteCustom, swatch: 'from-[#D4AF37] to-[#8C6B14]' }
      ];

      paletteContainer.innerHTML = palettes.map(p => {
        const isSelected = conciergeState.palette === p.id;
        return `
          <div 
            onclick="window.setConciergePalette('${p.id}')"
            class="config-option-card ${isSelected ? 'selected' : ''}"
          >
            <div class="flex items-center gap-2.5">
              <div class="w-5 h-5 rounded-full bg-gradient-to-tr ${p.swatch} border border-white/40 shrink-0 shadow-xs"></div>
              <span class="text-xs font-bold ${isSelected ? 'text-[#F3E5AB]' : 'text-stone-200'} truncate">${p.label}</span>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  window.setConciergeOccasion = function(id) {
    conciergeState.occasion = id;
    renderConciergeOptions();
  };

  window.setConciergeBudget = function(id) {
    conciergeState.budget = id;
    renderConciergeOptions();
  };

  window.setConciergePalette = function(id) {
    conciergeState.palette = id;
    renderConciergeOptions();
  };

  window.handleConciergeSubmit = function(e) {
    if (e) e.preventDefault();
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
  };

  // --- 8. INSTAGRAM UGC FEED (#MedellinMoments) ---
  function renderUgcMoments() {
    if (!ugcContainer) return;
    const isAr = currentLang === 'ar';
    const moments = data.ugcMoments || [];

    ugcContainer.innerHTML = moments.map(m => {
      const location = isAr ? m.locationAr : m.locationEn;
      const caption = isAr ? m.captionAr : m.captionEn;
      const tag = isAr ? m.tagAr : m.tagEn;

      return `
        <div class="ugc-card group">
          <img src="${m.image}" alt="${m.handle}" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-5 flex flex-col justify-between">
            <div class="flex items-center justify-between">
              <span class="bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#F3E5AB] text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md">
                ${tag}
              </span>
              <span class="text-[10px] text-stone-400 font-mono">${location}</span>
            </div>

            <div>
              <p class="text-xs text-stone-200 font-medium leading-relaxed mb-2.5 line-clamp-3">
                ${caption}
              </p>
              <div class="flex items-center gap-1.5 text-xs font-bold text-[#D4AF37] font-mono">
                <svg class="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                </svg>
                <span>${m.handle}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- 9. QUICK VIEW LIGHTBOX MODAL ---
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

    // Botanical Specs
    const stemsEl = document.getElementById('modal-stems');
    const originEl = document.getElementById('modal-origin');
    const fragranceEl = document.getElementById('modal-fragrance');
    const dimensionsEl = document.getElementById('modal-dimensions');

    if (stemsEl) stemsEl.textContent = isAr ? (item.stemCountAr || '24 زهرة نادرة') : (item.stemCountEn || '24 Heirloom Stems');
    if (originEl) originEl.textContent = isAr ? (item.originAr || 'هولندا والإكوادور') : (item.originEn || 'Holland & Ecuador');
    if (fragranceEl) fragranceEl.textContent = isAr ? (item.fragranceAr || 'زهري طبيعي ناعم') : (item.fragranceEn || 'Delicate Natural Floral');
    if (dimensionsEl) dimensionsEl.textContent = isAr ? (item.dimensionsAr || 'ارتفاع 50 سم × عرض 40 سم') : (item.dimensionsEn || 'H 50cm × W 40cm');

    quickViewModal.classList.remove('hidden');
    quickViewModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  };

  window.closeQuickView = function() {
    if (!quickViewModal) return;
    quickViewModal.classList.add('hidden');
    quickViewModal.classList.remove('flex');
    document.body.style.overflow = '';
  };

  if (quickViewModal) {
    quickViewModal.addEventListener('click', (e) => {
      if (e.target === quickViewModal) window.closeQuickView();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeQuickView();
      window.closeWishlistDrawer();
    }
  });

  const modalOrderBtn = document.getElementById('modal-order-btn');
  if (modalOrderBtn) {
    modalOrderBtn.addEventListener('click', () => {
      if (activeModalItem) {
        window.orderDirectItem(activeModalItem.id);
        window.closeQuickView();
      }
    });
  }

  // --- 10. REVIEWS CAROUSEL ---
  function renderReviews() {
    if (!reviewsStage) return;
    const isAr = currentLang === 'ar';

    reviewsStage.innerHTML = data.customerReviews.map((rev, idx) => {
      const quote = isAr ? rev.quoteAr : rev.quoteEn;
      const city = isAr ? rev.cityAr : rev.cityEn;
      const occasion = isAr ? rev.occasionAr : rev.occasionEn;
      const isActive = idx === revActiveIdx;

      return `
        <div class="review-slide ${isActive ? 'is-active' : ''}" data-index="${idx}" aria-hidden="${!isActive}">
          <div class="review-card-content max-w-xl mx-auto text-center px-4 sm:px-6">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#F3E5AB] text-[10px] font-bold tracking-widest uppercase mb-4 shadow-sm">
              <span>✦</span>
              <span>${occasion}</span>
            </div>

            <blockquote class="text-base sm:text-lg lg:text-xl font-serif italic text-white font-bold leading-relaxed mb-6 drop-shadow-md">
              « ${quote} »
            </blockquote>

            <div class="flex flex-col items-center justify-center">
              <h4 class="text-sm sm:text-base font-bold font-display text-[#D4AF37]">${rev.customerName}</h4>
              <p class="text-xs text-stone-400 font-medium mt-0.5">${city}</p>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (revActiveNum) {
      revActiveNum.textContent = `0${revActiveIdx + 1}`;
    }
  }

  function navigateReviews(direction) {
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
    }, 500);
  }

  if (revPrevBtn) {
    revPrevBtn.addEventListener('click', () => {
      clearInterval(revAutoTimer);
      navigateReviews('prev');
      startRevAutoPlay();
    });
  }

  if (revNextBtn) {
    revNextBtn.addEventListener('click', () => {
      clearInterval(revAutoTimer);
      navigateReviews('next');
      startRevAutoPlay();
    });
  }

  function startRevAutoPlay() {
    clearInterval(revAutoTimer);
    revAutoTimer = setInterval(() => {
      if (!document.hidden && isReviewsInView && !isRevAnimating) {
        navigateReviews('next');
      }
    }, 7000);
  }
  startRevAutoPlay();

  // Reviews Parallax Observer
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

    const stageRange = isDesktop ? 100 : 30;
    const stageY = (0.5 - progress) * stageRange;
    reviewsSection.style.setProperty('--reviews-stage-y', `${stageY.toFixed(1)}px`);
  }

  // --- 11. TOAST NOTIFICATION UTILITY ---
  function showLuxuryToast(message) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'luxury-toast px-5 py-3 rounded-full bg-[#1A1716] border border-[#D4AF37]/50 text-white text-xs font-bold shadow-2xl backdrop-blur-xl flex items-center gap-2.5 pointer-events-auto';
    toast.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // --- 12. VIP NEWSLETTER FORM ---
  window.handleNewsletterSubmit = function(e) {
    if (e) e.preventDefault();
    const emailInput = document.getElementById('newsletter-email-input');
    if (!emailInput || !emailInput.value.trim()) return;

    const isAr = currentLang === 'ar';
    const successMsg = data.translations[currentLang].newsletter.success;
    showLuxuryToast(successMsg);
    emailInput.value = '';
  };

  // --- 13. LANGUAGE SWITCHER ENGINE ---
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
    renderTrustBadges();
    renderOccasions();
    renderCollections();
    renderReviews();
    renderConciergeOptions();
    renderUgcMoments();

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

  // --- 14. SCROLL CONTROLLER & PERFORMANCE RAF ---
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

        // Reviews Parallax
        updateReviewsParallax();

        // Floating WhatsApp Bar on mobile
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

  // --- 15. MOBILE MENU DRAWER ---
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

  // --- 16. SCROLL REVEAL OBSERVER ---
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

  // --- INITIAL EXECUTION ---
  applyTranslations();
  initOneShotEntrance();
});
