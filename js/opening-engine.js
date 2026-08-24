/**
 * QuickRSVP - Cinematic Video Invitation & Physical Hanging Card Opening Engine
 * Supports 7 Experience Modes:
 * 1. 'hanging-card' (Physical Suspended Luxury Card with Idle Sway & 1:1 Gesture Drag)
 * 2. 'video-hanging-card' (Personalized Video -> Resolves to Physical Hanging Card -> Reveal)
 * 3. 'video-card' (Personalized Video -> Resolves to Interactive Card -> Swipe Reveal)
 * 4. 'video' (Cinematic Video with Dynamic Real-Time Personalization Overlays)
 * 5. 'card-reveal' (Interactive Luxury Invitation Card with Tactile Swipe-Up)
 * 6. 'couple-reveal' (Couple Silhouette Scene)
 * 7. 'none' (Direct Invitation)
 */

const OpeningEngine = {
  activeOpeningStyle: 'hanging-card',
  isDragging: false,
  startY: 0,
  currentDeltaY: 0,
  threshold: 100,
  currentGuest: null,
  containerEl: null,
  cardEl: null,
  ribbonEl: null,
  overlayEl: null,
  videoEl: null,
  isPlayingVideo: false,
  isMuted: true,

  // Helper to safely escape HTML to prevent XSS
  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  // Dynamic Variable Parser
  parseVariables(text, guest, lang = 'ar') {
    if (!text) return '';
    const event = Store.state?.event || {};

    const guestName = (lang === 'ar' ? guest?.nameAr : guest?.nameEn) || guest?.nameAr || (lang === 'ar' ? 'ضيفنا الكريم' : 'Honored Guest');
    const familyName = (lang === 'ar' ? guest?.groupAr : guest?.groupEn) || guest?.groupAr || (lang === 'ar' ? 'عائلتكم الكريمة' : 'Family');
    const coupleNames = (lang === 'ar' ? event.coupleNamesAr : event.coupleNamesEn) || (lang === 'ar' ? 'مايا & ليام' : 'Maya & Liam');
    const eventDate = (lang === 'ar' ? event.dateFormattedAr : event.dateFormattedEn) || (lang === 'ar' ? 'الأربعاء، 14 أكتوبر 2026' : 'Wednesday, October 14, 2026');
    const venue = (lang === 'ar' ? event.venueAr : event.venueEn) || (lang === 'ar' ? 'قاعة القصر الكبير - جدة' : 'The Grand Palace - Jeddah');
    const seats = `${guest?.attendingCount || guest?.allowedSeats || 1} ${lang === 'ar' ? 'مقاعد' : 'seats'}`;
    const table = guest?.tableNo || (lang === 'ar' ? 'طاولة مخصصة' : 'Reserved Table');

    let parsed = text
      .replace(/\{guest_name\}/g, guestName)
      .replace(/\{family_name\}/g, familyName)
      .replace(/\{couple_names\}/g, coupleNames)
      .replace(/\{event_date\}/g, eventDate)
      .replace(/\{venue\}/g, venue)
      .replace(/\{seats\}/g, seats)
      .replace(/\{table\}/g, table);

    return this.escapeHtml(parsed);
  },

  mount(containerEl, guest, openingStyle, forceReplay = false) {
    if (!containerEl) return;
    this.containerEl = containerEl;
    this.currentGuest = guest || Store.state?.guests?.[0] || { token: 'k82f9x', nameAr: 'هاشم النماري', nameEn: 'Hashim Al-Nemari' };
    this.activeOpeningStyle = openingStyle || Store.state?.event?.openingStyle || 'hanging-card';

    // Direct mode: skip immediately
    if (this.activeOpeningStyle === 'none') {
      containerEl.innerHTML = '';
      return;
    }

    // Session Memory Check
    const token = this.currentGuest.token;
    const isAlreadyOpened = typeof sessionStorage !== 'undefined' && sessionStorage.getItem(`quickrsvp_intro_seen_${token}`);
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isAlreadyOpened && !forceReplay) {
      containerEl.innerHTML = '';
      return;
    }

    if (prefersReducedMotion && !forceReplay) {
      // In reduced motion, still allow simple static reveal unless already seen
      if (isAlreadyOpened) {
        containerEl.innerHTML = '';
        return;
      }
    }

    this.render();
  },

  render() {
    const guest = this.currentGuest;
    const lang = typeof I18n !== 'undefined' ? I18n.currentLang : 'ar';
    const themeId = Store.state?.event?.activeTheme || 'royal-arabic';
    const event = Store.state?.event || {};
    const videoConfig = event.videoInvitation || {};
    const hangingConfig = event.hangingCard || { animationIntensity: 'cinematic' };
    const template = typeof VideoTemplateRegistry !== 'undefined'
      ? VideoTemplateRegistry.getTemplate(videoConfig.templateId || 'tpl_royal_emerald')
      : null;

    const posterUrl = videoConfig.posterUrl || template?.posterUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80';
    const videoUrl = videoConfig.sourceType === 'upload' && videoConfig.customVideoUrl
      ? videoConfig.customVideoUrl
      : (template?.videoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-bride-with-a-bouquet-43152-large.mp4');

    const isVideoMode = this.activeOpeningStyle === 'video' || this.activeOpeningStyle === 'video-card' || this.activeOpeningStyle === 'video-hanging-card';
    const isHangingCard = this.activeOpeningStyle === 'hanging-card' || this.activeOpeningStyle === 'video-hanging-card';

    // Animation intensity class
    let intensityClass = 'hanging-animated-cinematic';
    if (hangingConfig.animationIntensity === 'calm') intensityClass = 'hanging-animated-calm';
    else if (hangingConfig.animationIntensity === 'static') intensityClass = 'hanging-animated-static';

    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) intensityClass = 'hanging-animated-static';

    this.containerEl.innerHTML = `
      <div id="interactive-opening-overlay" class="fixed inset-0 z-50 flex flex-col items-center justify-between overflow-hidden transition-all select-none" style="background-color: var(--invite-bg, #FAF7F2);" data-theme="${themeId}">
        
        ${isVideoMode ? `
          <!-- ========================================================= -->
          <!-- 1. CINEMATIC PERSONALIZED VIDEO LAYER                     -->
          <!-- ========================================================= -->
          <div id="cinematic-video-layer" class="absolute inset-0 z-20 flex items-center justify-center bg-black transition-opacity duration-500 overflow-hidden">
            
            <video
              id="personalized-wedding-video"
              class="w-full h-full object-cover"
              poster="${posterUrl}"
              src="${videoUrl}"
              playsinline
              muted
              autoplay
              preload="auto"
            ></video>

            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60 pointer-events-none"></div>

            <div id="video-dynamic-overlays-mount" class="absolute inset-x-4 sm:inset-x-8 top-16 bottom-20 flex flex-col justify-center items-center pointer-events-none text-center z-30">
            </div>

            <div class="absolute top-4 inset-x-4 z-40 flex items-center justify-between pointer-events-auto">
              <div class="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white font-serif text-xs font-bold flex items-center gap-1.5 shadow-md">
                <span>✨</span>
                <span>${lang === 'ar' ? 'دعوة زفاف خاصة' : 'EXCLUSIVE INVITATION'}</span>
              </div>

              <div class="flex items-center gap-2">
                <button type="button" id="btn-video-audio-toggle" onclick="OpeningEngine.toggleAudio()" class="px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/25 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md active:scale-95">
                  <span id="video-audio-icon">🔇</span>
                  <span id="video-audio-label">${lang === 'ar' ? 'تشغيل الصوت' : 'Play Audio'}</span>
                </button>

                <button type="button" onclick="OpeningEngine.skipVideo()" class="px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-xs font-bold transition shadow-md active:scale-95">
                  <span>${lang === 'ar' ? 'تخطي' : 'Skip'} ✕</span>
                </button>
              </div>
            </div>

            <div class="absolute bottom-3 inset-x-6 z-40 pointer-events-none">
              <div class="h-1 w-full rounded-full bg-white/20 overflow-hidden">
                <div id="video-playback-progress" class="h-full bg-[var(--invite-accent, #D4AF37)] transition-all duration-150" style="width: 0%"></div>
              </div>
            </div>

          </div>
        ` : ''}

        ${isHangingCard ? `
          <!-- ========================================================= -->
          <!-- 2. PHYSICAL HANGING INVITATION CARD LAYER                 -->
          <!-- ========================================================= -->
          <div id="hanging-card-layer" class="relative z-10 w-full h-full flex flex-col items-center justify-between overflow-hidden transition-all duration-500 ${isVideoMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}">
            
            <!-- Soft Ambient Glow -->
            <div class="absolute inset-0 pointer-events-none opacity-50 bg-radial from-[var(--invite-accent)]/20 via-transparent to-[var(--invite-primary)]/10"></div>

            <!-- Top Suspension Anchor & Silk Ribbon -->
            <div class="w-full flex flex-col items-center z-10 pointer-events-none">
              <!-- Ceiling Mount Bar -->
              <div class="h-1.5 w-28 sm:w-36 bg-gradient-to-r from-transparent via-[var(--invite-border)] to-transparent rounded-full opacity-60"></div>
              
              <!-- Fine Silk Ribbon / Cord -->
              <div id="hanging-ribbon-line" class="hanging-ribbon w-4 sm:w-5 h-20 sm:h-28 transition-transform duration-100 will-change-transform"></div>
            </div>

            <!-- Physical Hanging Card Container -->
            <div id="hanging-card-interactive" class="hanging-card-container ${intensityClass} my-auto z-10 w-full max-w-sm sm:max-w-md px-4 sm:px-6 cursor-grab active:cursor-grabbing transition-transform duration-100 will-change-transform touch-none">
              
              <!-- Metallic Eyelet Grommet at Top of Card -->
              <div class="w-full flex justify-center -mb-3 z-20 relative">
                <div class="hanging-grommet w-6 h-6 rounded-full flex items-center justify-center">
                  <div class="w-2.5 h-2.5 rounded-full bg-black/40 shadow-inner"></div>
                </div>
              </div>

              <!-- Main Card Paper Surface -->
              <div id="hanging-card-paper" class="p-6 sm:p-8 rounded-[36px] bg-[var(--invite-surface)] border-2 border-[var(--invite-border)] shadow-2xl text-center space-y-6 relative overflow-hidden backdrop-blur-xs">
                
                <!-- Delicate Corner Border Accents -->
                <div class="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[var(--invite-accent)]/40 rounded-tr-xl pointer-events-none"></div>
                <div class="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[var(--invite-accent)]/40 rounded-tl-xl pointer-events-none"></div>
                <div class="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[var(--invite-accent)]/40 rounded-br-xl pointer-events-none"></div>
                <div class="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[var(--invite-accent)]/40 rounded-bl-xl pointer-events-none"></div>

                <!-- Gold Monogram Seal Header -->
                <div class="w-16 h-16 mx-auto rounded-full bg-[var(--invite-accent)] text-[var(--invite-primary)] flex items-center justify-center text-xl font-serif font-bold shadow-lg border-2 border-white/60">
                  M&L
                </div>

                <!-- Personalized Guest Title Block -->
                <div class="space-y-1.5 border-b border-[var(--invite-border)]/60 pb-4">
                  <span class="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[var(--invite-accent)]">
                    ${lang === 'ar' ? 'دعوة خاصة ومميزة إلى' : 'SPECIAL INVITATION TO'}
                  </span>
                  <h3 id="hanging-guest-name" class="text-xl sm:text-2xl font-bold font-serif text-[var(--invite-primary)] underline decoration-[var(--invite-accent)]/50 decoration-2 underline-offset-6">
                    ${this.parseVariables('{guest_name}', guest, lang)}
                  </h3>
                </div>

                <!-- Couple Names & Wedding Date -->
                <div class="space-y-1 py-1">
                  <h2 id="hanging-couple-names" class="text-2xl sm:text-3xl font-bold font-serif text-[var(--invite-text)]">
                    ${lang === 'ar' ? event.coupleNamesAr : event.coupleNamesEn}
                  </h2>
                  <p class="text-xs text-[var(--invite-text-muted)] font-medium">
                    ${lang === 'ar' ? event.dateFormattedAr : event.dateFormattedEn} • ${lang === 'ar' ? 'جدة' : 'Jeddah'}
                  </p>
                </div>

                <!-- Direct Accessible Action Button -->
                <div class="pt-2">
                  <button type="button" onclick="OpeningEngine.commitReveal()" class="w-full py-3.5 px-6 rounded-2xl bg-[var(--invite-primary)] text-white text-xs font-bold shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2">
                    <span>✉️</span>
                    <span>${lang === 'ar' ? 'فتح بطاقة الدعوة' : 'Open Invitation'}</span>
                  </button>
                </div>

              </div>

            </div>

            <!-- Bottom Swipe Instruction -->
            <div class="pb-6 z-10 flex flex-col items-center gap-1.5 text-[11px] font-bold text-[var(--invite-primary)]/80 animate-pulse">
              <span class="text-sm">↑</span>
              <span>${lang === 'ar' ? 'اسحب البطاقة للأعلى لفتح الدعوة' : 'Pull up the card to open invitation'}</span>
            </div>

          </div>
        ` : `
          <!-- ========================================================= -->
          <!-- 3. TACTILE INVITATION CARD LAYER (For card-reveal)        -->
          <!-- ========================================================= -->
          <div id="tactile-card-layer" class="relative z-10 w-full h-full flex flex-col items-center justify-between p-4 sm:p-6 transition-all duration-500 ${isVideoMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}">
            <div class="absolute inset-0 pointer-events-none opacity-40 bg-radial from-[var(--invite-accent)]/20 via-transparent to-[var(--invite-primary)]/10"></div>

            <div class="pt-4 z-10">
              <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--invite-surface)] border border-[var(--invite-border)] text-xs font-serif font-bold text-[var(--invite-primary)] shadow-sm">
                <span>✨</span>
                <span>${lang === 'ar' ? 'دعوة زفاف خاصة' : 'EXCLUSIVE INVITATION'}</span>
              </div>
            </div>

            <div id="tactile-opening-card" class="my-auto z-10 w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-[36px] bg-[var(--invite-surface)] border-2 border-[var(--invite-border)] shadow-2xl text-center space-y-6 cursor-grab active:cursor-grabbing transition-transform duration-100 will-change-transform touch-none">
              ${this.activeOpeningStyle === 'couple-reveal' ? `
                <div class="w-24 h-24 mx-auto rounded-full bg-[var(--invite-primary)]/10 text-[var(--invite-accent)] flex items-center justify-center text-4xl shadow-inner border border-[var(--invite-border)]">
                  🕊️
                </div>
              ` : `
                <div class="w-16 h-16 mx-auto rounded-full bg-[var(--invite-accent)] text-[var(--invite-primary)] flex items-center justify-center text-xl font-serif font-bold shadow-lg border-2 border-white/50">
                  M&L
                </div>
              `}

              <div class="space-y-1.5 border-b border-[var(--invite-border)]/60 pb-4">
                <span class="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[var(--invite-accent)]">
                  ${lang === 'ar' ? 'دعوة خاصة ومميزة إلى' : 'SPECIAL INVITATION TO'}
                </span>
                <h3 class="text-xl sm:text-2xl font-bold font-serif text-[var(--invite-primary)] underline decoration-[var(--invite-accent)]/50 decoration-2 underline-offset-6">
                  ${this.parseVariables('{guest_name}', guest, lang)}
                </h3>
              </div>

              <div class="space-y-1 py-1">
                <h2 class="text-2xl sm:text-3xl font-bold font-serif text-[var(--invite-text)]">
                  ${lang === 'ar' ? event.coupleNamesAr : event.coupleNamesEn}
                </h2>
                <p class="text-xs text-[var(--invite-text-muted)] font-medium">
                  ${lang === 'ar' ? event.dateFormattedAr : event.dateFormattedEn} • ${lang === 'ar' ? 'جدة' : 'Jeddah'}
                </p>
              </div>

              <div class="pt-2">
                <button type="button" onclick="OpeningEngine.commitReveal()" class="w-full py-3.5 px-6 rounded-2xl bg-[var(--invite-primary)] text-white text-xs font-bold shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2">
                  <span>✉️</span>
                  <span>${lang === 'ar' ? 'فتح بطاقة الدعوة' : 'Open Invitation'}</span>
                </button>
              </div>
            </div>

            <div class="pb-4 z-10 flex flex-col items-center gap-1.5 text-[11px] font-bold text-[var(--invite-primary)]/80 animate-bounce">
              <span>↑</span>
              <span>${lang === 'ar' ? 'اسحب للأعلى لفتح الدعوة' : 'Swipe up to open invitation'}</span>
            </div>
          </div>
        `}

      </div>
    `;

    this.overlayEl = document.getElementById('interactive-opening-overlay');
    this.cardEl = document.getElementById(isHangingCard ? 'hanging-card-interactive' : 'tactile-opening-card');
    this.ribbonEl = document.getElementById('hanging-ribbon-line');
    this.videoEl = document.getElementById('personalized-wedding-video');

    if (isVideoMode && this.videoEl) {
      this.initVideoPlayer();
    } else if (isHangingCard) {
      this.bindHangingCardGestures();
    } else {
      this.bindTactileCardGestures();
    }
  },

  // Initialize Video Player
  initVideoPlayer() {
    if (!this.videoEl) return;

    const video = this.videoEl;
    const lang = typeof I18n !== 'undefined' ? I18n.currentLang : 'ar';
    const guest = this.currentGuest;
    const overlaysMount = document.getElementById('video-dynamic-overlays-mount');
    const progressBar = document.getElementById('video-playback-progress');

    const event = Store.state?.event || {};
    const videoConfig = event.videoInvitation || {};
    const template = typeof VideoTemplateRegistry !== 'undefined'
      ? VideoTemplateRegistry.getTemplate(videoConfig.templateId || 'tpl_royal_emerald')
      : null;

    const overlays = (videoConfig.overlays && videoConfig.overlays.length > 0)
      ? videoConfig.overlays
      : (template?.defaultOverlays || []);

    this.isPlayingVideo = true;

    // Error handling & fallback: if video fails to stream, display high-res poster with dynamic overlays
    video.onerror = () => {
      console.warn('Video stream error or offline, displaying high-res poster with dynamic overlays.');
      if (overlaysMount && overlaysMount.children.length === 0) {
        const guestHighlight = this.parseVariables('{guest_name}', guest, lang);
        overlaysMount.innerHTML = `
          <div class="my-2 p-3 sm:p-4 rounded-2xl max-w-lg mx-auto backdrop-blur-xs transition-all duration-300 animate-fadeIn">
            <div class="text-sm font-light text-white/90 mb-1">${lang === 'ar' ? 'دعوة خاصة ومميزة إلى' : 'SPECIAL INVITATION TO'}</div>
            <div class="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--invite-accent, #D4AF37)] drop-shadow-md">
              ${guestHighlight}
            </div>
          </div>
        `;
      }
    };

    // Timeupdate synchronization
    video.ontimeupdate = () => {
      const currentTime = video.currentTime;
      const duration = video.duration || videoConfig.duration || 12;

      if (progressBar && duration > 0) {
        const pct = Math.min((currentTime / duration) * 100, 100);
        progressBar.style.width = `${pct}%`;
      }

      if (overlaysMount) {
        const activeOverlays = overlays.filter(ov => currentTime >= ov.startTime && currentTime <= ov.endTime);

        if (activeOverlays.length === 0) {
          overlaysMount.innerHTML = '';
        } else {
          overlaysMount.innerHTML = activeOverlays.map(ov => {
            const rawText = ov.variable ? this.parseVariables(ov.variable, guest, lang) : this.parseVariables(ov.text, guest, lang);
            const isHighlight = ov.isHighlight || ov.variable === '{guest_name}';

            let animationClass = 'animate-fadeIn';
            if (ov.animation === 'soft-rise') animationClass = 'animate-bounce';
            else if (ov.animation === 'scale') animationClass = 'scale-105 transition-transform duration-700';

            return `
              <div class="my-2 p-3 sm:p-4 rounded-2xl max-w-lg mx-auto backdrop-blur-xs transition-all duration-300 ${animationClass}">
                <div class="font-serif ${isHighlight ? 'text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--invite-accent, #D4AF37)] drop-shadow-md' : 'text-sm sm:text-lg font-light text-white/95 drop-shadow-sm'}">
                  ${rawText}
                </div>
              </div>
            `;
          }).join('');
        }
      }
    };

    video.onended = () => {
      this.transitionVideoToNext();
    };

    video.play().catch(err => {
      console.log('Autoplay muted attempt result:', err);
    });
  },

  toggleAudio() {
    if (!this.videoEl) return;
    const lang = typeof I18n !== 'undefined' ? I18n.currentLang : 'ar';
    const iconEl = document.getElementById('video-audio-icon');
    const labelEl = document.getElementById('video-audio-label');

    this.isMuted = !this.isMuted;
    this.videoEl.muted = this.isMuted;
    if (!this.isMuted) {
      this.videoEl.volume = 1;
    }

    if (iconEl) iconEl.innerText = this.isMuted ? '🔇' : '🔊';
    if (labelEl) labelEl.innerText = this.isMuted ? (lang === 'ar' ? 'تشغيل الصوت' : 'Play Audio') : (lang === 'ar' ? 'كتم الصوت' : 'Mute');
  },

  skipVideo() {
    this.transitionVideoToNext();
  },

  // Transition from Video to Hanging Card or Hero
  transitionVideoToNext() {
    const videoLayer = document.getElementById('cinematic-video-layer');
    const hangingLayer = document.getElementById('hanging-card-layer');
    const cardLayer = document.getElementById('tactile-card-layer');

    if (this.videoEl) {
      this.videoEl.pause();
    }

    if (this.activeOpeningStyle === 'video-hanging-card' && hangingLayer) {
      if (videoLayer) {
        videoLayer.style.opacity = '0';
        videoLayer.style.pointerEvents = 'none';
        setTimeout(() => {
          if (videoLayer) videoLayer.remove();
        }, 500);
      }

      hangingLayer.classList.remove('opacity-0', 'pointer-events-none');
      hangingLayer.classList.add('opacity-100');
      this.bindHangingCardGestures();
    } else if (this.activeOpeningStyle === 'video-card' && cardLayer) {
      if (videoLayer) {
        videoLayer.style.opacity = '0';
        videoLayer.style.pointerEvents = 'none';
        setTimeout(() => {
          if (videoLayer) videoLayer.remove();
        }, 500);
      }

      cardLayer.classList.remove('opacity-0', 'pointer-events-none');
      cardLayer.classList.add('opacity-100');
      this.bindTactileCardGestures();
    } else {
      this.commitReveal();
    }
  },

  // Bind Direct 1:1 Pointer Tracking for Physical Hanging Card
  bindHangingCardGestures() {
    const overlay = this.overlayEl || document.getElementById('interactive-opening-overlay');
    const card = this.cardEl || document.getElementById('hanging-card-interactive');
    const ribbon = this.ribbonEl || document.getElementById('hanging-ribbon-line');
    if (!overlay || !card) return;

    overlay.addEventListener('pointerdown', (e) => {
      this.isDragging = true;
      this.startY = e.clientY;
      this.currentDeltaY = 0;
      card.style.transition = 'none';
      if (ribbon) ribbon.style.transition = 'none';
      card.classList.remove('hanging-animated-cinematic', 'hanging-animated-calm');
      overlay.setPointerCapture(e.pointerId);
    });

    overlay.addEventListener('pointermove', (e) => {
      if (!this.isDragging) return;
      const deltaY = e.clientY - this.startY;

      if (deltaY < 0) {
        this.currentDeltaY = deltaY;
        const progress = Math.min(Math.abs(deltaY) / 260, 1);

        card.style.transform = `translateY(${deltaY}px) scale(${1 + progress * 0.05})`;
        if (ribbon) {
          ribbon.style.transform = `scaleY(${Math.max(1 - progress * 0.6, 0.1)})`;
          ribbon.style.opacity = `${1 - progress * 0.7}`;
        }
        overlay.style.opacity = `${1 - progress * 0.35}`;
      }
    });

    const endDrag = () => {
      if (!this.isDragging) return;
      this.isDragging = false;

      if (Math.abs(this.currentDeltaY) >= this.threshold) {
        this.commitReveal();
      } else {
        // Snap back smoothly
        card.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        card.style.transform = 'translateY(0) scale(1)';
        if (ribbon) {
          ribbon.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
          ribbon.style.transform = 'scaleY(1)';
          ribbon.style.opacity = '1';
        }
        overlay.style.transition = 'opacity 0.4s ease';
        overlay.style.opacity = '1';

        // Re-enable idle animation after settle
        setTimeout(() => {
          const intensity = Store.state?.event?.hangingCard?.animationIntensity || 'cinematic';
          if (intensity !== 'static') {
            card.classList.add(`hanging-animated-${intensity}`);
          }
        }, 400);
      }
    };

    overlay.addEventListener('pointerup', endDrag);
    overlay.addEventListener('pointercancel', endDrag);

    // Desktop Mouse Wheel support
    overlay.addEventListener('wheel', (e) => {
      if (e.deltaY > 30) {
        this.commitReveal();
      }
    }, { passive: true });

    // Keyboard support
    const keyHandler = (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        this.commitReveal();
        window.removeEventListener('keydown', keyHandler);
      }
    };
    window.addEventListener('keydown', keyHandler);
  },

  // Bind Gestures for standard Tactile Card (Wax Seal)
  bindTactileCardGestures() {
    const overlay = this.overlayEl || document.getElementById('interactive-opening-overlay');
    const card = this.cardEl || document.getElementById('tactile-opening-card');
    if (!overlay || !card) return;

    overlay.addEventListener('pointerdown', (e) => {
      this.isDragging = true;
      this.startY = e.clientY;
      this.currentDeltaY = 0;
      card.style.transition = 'none';
      overlay.setPointerCapture(e.pointerId);
    });

    overlay.addEventListener('pointermove', (e) => {
      if (!this.isDragging) return;
      const deltaY = e.clientY - this.startY;

      if (deltaY < 0) {
        this.currentDeltaY = deltaY;
        const progress = Math.min(Math.abs(deltaY) / 300, 1);
        card.style.transform = `translateY(${deltaY}px) scale(${1 - progress * 0.05})`;
        overlay.style.opacity = `${1 - progress * 0.4}`;
      }
    });

    const endDrag = () => {
      if (!this.isDragging) return;
      this.isDragging = false;

      if (Math.abs(this.currentDeltaY) >= this.threshold) {
        this.commitReveal();
      } else {
        card.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease';
        card.style.transform = 'translateY(0) scale(1)';
        overlay.style.transition = 'opacity 0.4s ease';
        overlay.style.opacity = '1';
      }
    };

    overlay.addEventListener('pointerup', endDrag);
    overlay.addEventListener('pointercancel', endDrag);

    overlay.addEventListener('wheel', (e) => {
      if (e.deltaY > 30) {
        this.commitReveal();
      }
    }, { passive: true });

    const keyHandler = (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        this.commitReveal();
        window.removeEventListener('keydown', keyHandler);
      }
    };
    window.addEventListener('keydown', keyHandler);
  },

  // Shared Element Transformation into Wedding Hero
  commitReveal() {
    const overlay = this.overlayEl || document.getElementById('interactive-opening-overlay');
    const card = this.cardEl || document.getElementById('hanging-card-interactive') || document.getElementById('tactile-opening-card');

    // Trigger subtle haptic feedback if supported
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate(15); } catch (e) {}
    }

    if (card) {
      card.style.transition = 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease';
      card.style.transform = 'translateY(-120vh) scale(1.08)';
      card.style.opacity = '0';
    }

    if (overlay) {
      overlay.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';

      setTimeout(() => {
        if (overlay) overlay.remove();
      }, 550);
    }

    // Save session memory
    if (this.currentGuest && typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(`quickrsvp_intro_seen_${this.currentGuest.token}`, 'true');
    }

    // Smooth scroll to top of Wedding Hero
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  replay(containerEl, guest) {
    if (this.currentGuest && typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem(`quickrsvp_intro_seen_${this.currentGuest.token}`);
    }
    this.mount(containerEl, guest, Store.state?.event?.openingStyle || 'hanging-card', true);
  }
};

if (typeof window !== 'undefined') {
  window.OpeningEngine = OpeningEngine;
}
