/**
 * QuickRSVP - Modular Invitation Section Registry
 * Comprehensive art direction per section: fluid typography, open canvas verses,
 * split desktop layouts, editorial timelines, and responsive composition
 */

const SectionRegistry = {
  sections: {
    // ========================================================================
    // 1. HERO ENTRANCE (Full-Bleed, Cinematic & Responsive)
    // ========================================================================
    hero: {
      type: 'hero',
      nameAr: 'واجهة الدعوة الرئيسية (Hero)',
      nameEn: 'Hero Entrance',
      icon: 'sparkles',
      category: 'essentials',
      isFixed: true,
      renderGuest(data, guest, lang) {
        const title = lang === 'ar' ? data.titleAr : data.titleEn;
        const subtitle = lang === 'ar' ? data.subtitleAr : data.subtitleEn;
        const date = lang === 'ar' ? data.dateAr : data.dateEn;
        const venue = lang === 'ar' ? data.venueAr : data.venueEn;
        const bg = data.bgImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80';

        return `
          <div class="relative min-h-[92vh] md:min-h-[100svh] w-full rounded-3xl md:rounded-[40px] overflow-hidden flex flex-col justify-between p-6 md:p-16 text-center text-white shadow-2xl transition-all" style="background: var(--invite-hero-overlay), url('${bg}') center/cover no-repeat;">
            
            <!-- Top Eyebrow Monogram Badge -->
            <div class="pt-4 flex justify-center">
              <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-widest uppercase text-[var(--invite-accent-light)]">
                <span>✨</span>
                <span>${lang === 'ar' ? 'دعوة زفاف خاصة' : 'EXCLUSIVE WEDDING INVITATION'}</span>
              </div>
            </div>

            <!-- Grand Couple Typography -->
            <div class="my-auto py-12 space-y-4 max-w-3xl mx-auto">
              <h1 class="wedding-hero-title font-bold text-white drop-shadow-lg tracking-tight">
                ${title}
              </h1>
              <div class="w-16 h-0.5 mx-auto bg-[var(--invite-accent)] rounded-full opacity-80"></div>
              <p class="text-sm md:text-lg font-light text-white/90 max-w-xl mx-auto leading-relaxed drop-shadow-sm">
                ${subtitle}
              </p>
            </div>

            <!-- Bottom Date, Venue & Scroll Cue -->
            <div class="space-y-6 max-w-xl mx-auto w-full">
              <div class="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs md:text-sm text-white/95">
                <div class="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/15 shadow-sm">
                  <span>📅</span>
                  <span class="font-medium">${date}</span>
                </div>
                <div class="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/15 shadow-sm">
                  <span>📍</span>
                  <span class="font-medium">${venue}</span>
                </div>
              </div>

              <!-- Animated Scroll Down Hint -->
              <div class="pt-2 flex flex-col items-center gap-1 text-[11px] text-white/70 animate-bounce">
                <span>${lang === 'ar' ? 'انزل للأسفل' : 'Scroll down'}</span>
                <span>↓</span>
              </div>
            </div>

          </div>
        `;
      },
      renderInspector(data, lang) {
        return `
          <div class="space-y-4 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'أسماء العروسين (عربي):' : 'Couple Names (AR):'}</label>
              <input type="text" value="${data.titleAr || ''}" oninput="Builder.updateActiveBlockField('titleAr', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white shadow-sm">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'الأسماء بالإنجليزية:' : 'Couple Names (EN):'}</label>
              <input type="text" value="${data.titleEn || ''}" oninput="Builder.updateActiveBlockField('titleEn', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white shadow-sm">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'عبارة الترحيب الفرعية:' : 'Subtitle:'}</label>
              <input type="text" value="${data.subtitleAr || ''}" oninput="Builder.updateActiveBlockField('subtitleAr', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white shadow-sm">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'تاريخ وموعد الحفل:' : 'Date & Time:'}</label>
              <input type="text" value="${data.dateAr || ''}" oninput="Builder.updateActiveBlockField('dateAr', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white shadow-sm">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'القاعة والمدينة:' : 'Venue & City:'}</label>
              <input type="text" value="${data.venueAr || ''}" oninput="Builder.updateActiveBlockField('venueAr', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white shadow-sm">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'رابط صورة الغلاف:' : 'Cover Image URL:'}</label>
              <input type="text" value="${data.bgImage || ''}" oninput="Builder.updateActiveBlockField('bgImage', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white shadow-sm">
            </div>
          </div>
        `;
      }
    },

    // ========================================================================
    // 2. PERSONALIZED GUEST WELCOME
    // ========================================================================
    welcome: {
      type: 'welcome',
      nameAr: 'الترحيب المخصص بالضيف',
      nameEn: 'Personalized Greeting',
      icon: 'heart',
      category: 'essentials',
      renderGuest(data, guest, lang) {
        const guestName = guest ? (lang === 'ar' ? guest.nameAr : guest.nameEn) : (lang === 'ar' ? 'ضيفنا الكريم' : 'Honored Guest');
        const greeting = lang === 'ar' ? data.greetingAr : data.greetingEn;
        const msg = lang === 'ar' ? data.messageAr : data.messageEn;

        return `
          <div class="theme-card max-w-2xl mx-auto p-8 md:p-12 text-center space-y-5 rounded-[32px] bg-[var(--invite-surface)] border border-[var(--invite-border)] shadow-md">
            <div class="w-14 h-14 mx-auto rounded-full bg-[var(--invite-primary)]/10 text-[var(--invite-primary)] border border-[var(--invite-border)] flex items-center justify-center text-2xl shadow-xs">
              🕊️
            </div>
            
            <div class="space-y-2">
              <span class="text-xs font-bold uppercase tracking-widest text-[var(--invite-accent)]">${greeting}</span>
              <h2 class="wedding-section-title font-bold text-[var(--invite-primary)]">
                ${lang === 'ar' ? 'أهلاً بك،' : 'Welcome,'} <span class="underline decoration-[var(--invite-accent)] decoration-2 underline-offset-8">${guestName}</span> 🤍
              </h2>
            </div>

            <p class="text-sm md:text-base text-[var(--invite-text-muted)] leading-relaxed max-w-lg mx-auto">
              ${msg}
            </p>
          </div>
        `;
      },
      renderInspector(data, lang) {
        return `
          <div class="space-y-4 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'عنوان الترحيب العلوي:' : 'Eyebrow Title:'}</label>
              <input type="text" value="${data.greetingAr || ''}" oninput="Builder.updateActiveBlockField('greetingAr', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'نص رسالة الترحيب الشخصية:' : 'Message Text:'}</label>
              <textarea rows="3" oninput="Builder.updateActiveBlockField('messageAr', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white">${data.messageAr || ''}</textarea>
            </div>
          </div>
        `;
      }
    },

    // ========================================================================
    // 3. QURANIC BLESSING / VERSE (Open Canvas with No Card Stack!)
    // ========================================================================
    blessing: {
      type: 'blessing',
      nameAr: 'الآية الكريمة ودعاء الزواج',
      nameEn: 'Wedding Blessing & Story',
      icon: 'sparkles',
      category: 'personal',
      renderGuest(data, guest, lang) {
        const title = lang === 'ar' ? data.titleAr : data.titleEn;
        const verse = lang === 'ar' ? data.verseAr : data.verseEn;

        return `
          <div class="py-12 md:py-20 text-center space-y-6 max-w-3xl mx-auto px-4">
            <div class="text-xs md:text-sm font-serif text-[var(--invite-accent)] tracking-widest uppercase">${title}</div>
            
            <div class="relative py-4 px-6 md:px-12">
              <span class="text-4xl md:text-6xl font-serif text-[var(--invite-accent)]/30 select-none">❝</span>
              <p class="wedding-verse-text text-[var(--invite-primary)] font-medium leading-loose md:leading-loose px-2">
                ${verse}
              </p>
              <span class="text-4xl md:text-6xl font-serif text-[var(--invite-accent)]/30 select-none">❞</span>
            </div>

            <!-- Refined Central Gold Line -->
            <div class="w-24 h-0.5 mx-auto theme-ornament-divider rounded-full"></div>
          </div>
        `;
      },
      renderInspector(data, lang) {
        return `
          <div class="space-y-4 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'العنوان العلوي:' : 'Title:'}</label>
              <input type="text" value="${data.titleAr || ''}" oninput="Builder.updateActiveBlockField('titleAr', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'نص الآية أو التهنئة:' : 'Verse Text:'}</label>
              <textarea rows="4" oninput="Builder.updateActiveBlockField('verseAr', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white">${data.verseAr || ''}</textarea>
            </div>
          </div>
        `;
      }
    },

    // ========================================================================
    // 4. LIVE COUNTDOWN (Full-Width High-Contrast Typography)
    // ========================================================================
    countdown: {
      type: 'countdown',
      nameAr: 'العداد التنازلي للحفل',
      nameEn: 'Live Countdown Clock',
      icon: 'clock',
      category: 'essentials',
      renderGuest(data, guest, lang) {
        const title = lang === 'ar' ? data.titleAr : data.titleEn;

        return `
          <div class="theme-card max-w-3xl mx-auto p-8 md:p-12 text-center space-y-8 rounded-[36px] bg-gradient-to-b from-[var(--invite-surface)] to-[var(--invite-surface-alt)] border border-[var(--invite-border)] shadow-lg">
            
            <div class="space-y-1">
              <span class="text-xs font-bold uppercase tracking-widest text-[var(--invite-accent)]">COUNTDOWN</span>
              <h2 class="wedding-section-title font-bold text-[var(--invite-primary)]">${title}</h2>
            </div>

            <!-- 4 Bold Typographic Digits -->
            <div class="grid grid-cols-4 gap-3 md:gap-6 max-w-xl mx-auto" data-target="${data.targetDate || '2026-10-14T19:30:00'}">
              
              <div class="p-4 md:p-6 rounded-2xl bg-[var(--invite-surface)] border border-[var(--invite-border)]/60 shadow-xs flex flex-col items-center">
                <span class="text-3xl md:text-5xl font-bold font-serif text-[var(--invite-primary)]" id="cd-days">54</span>
                <span class="text-[11px] md:text-xs font-semibold text-[var(--invite-text-muted)] mt-1 uppercase tracking-wider">${lang === 'ar' ? 'يوم' : 'Days'}</span>
              </div>

              <div class="p-4 md:p-6 rounded-2xl bg-[var(--invite-surface)] border border-[var(--invite-border)]/60 shadow-xs flex flex-col items-center">
                <span class="text-3xl md:text-5xl font-bold font-serif text-[var(--invite-primary)]" id="cd-hours">08</span>
                <span class="text-[11px] md:text-xs font-semibold text-[var(--invite-text-muted)] mt-1 uppercase tracking-wider">${lang === 'ar' ? 'ساعة' : 'Hours'}</span>
              </div>

              <div class="p-4 md:p-6 rounded-2xl bg-[var(--invite-surface)] border border-[var(--invite-border)]/60 shadow-xs flex flex-col items-center">
                <span class="text-3xl md:text-5xl font-bold font-serif text-[var(--invite-primary)]" id="cd-mins">24</span>
                <span class="text-[11px] md:text-xs font-semibold text-[var(--invite-text-muted)] mt-1 uppercase tracking-wider">${lang === 'ar' ? 'دقيقة' : 'Mins'}</span>
              </div>

              <div class="p-4 md:p-6 rounded-2xl bg-[var(--invite-surface)] border border-[var(--invite-border)]/60 shadow-xs flex flex-col items-center">
                <span class="text-3xl md:text-5xl font-bold font-serif text-[var(--invite-accent)] animate-pulse" id="cd-secs">30</span>
                <span class="text-[11px] md:text-xs font-semibold text-[var(--invite-text-muted)] mt-1 uppercase tracking-wider">${lang === 'ar' ? 'ثانية' : 'Secs'}</span>
              </div>

            </div>
          </div>
        `;
      },
      renderInspector(data, lang) {
        return `
          <div class="space-y-4 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'عنوان العداد:' : 'Title:'}</label>
              <input type="text" value="${data.titleAr || ''}" oninput="Builder.updateActiveBlockField('titleAr', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'تاريخ الهدف (ISO):' : 'Target Date (ISO):'}</label>
              <input type="datetime-local" value="${data.targetDate ? data.targetDate.substring(0,16) : '2026-10-14T19:30'}" oninput="Builder.updateActiveBlockField('targetDate', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white">
            </div>
          </div>
        `;
      }
    },

    // ========================================================================
    // 5. EVENT TIMELINE & ITINERARY (Vertical Editorial Flow)
    // ========================================================================
    timeline: {
      type: 'timeline',
      nameAr: 'جدول وفقرات الحفل (Itinerary)',
      nameEn: 'Event Schedule & Timeline',
      icon: 'calendar',
      category: 'event_details',
      renderGuest(data, guest, lang) {
        const title = lang === 'ar' ? data.titleAr : data.titleEn;
        const events = data.events || [];

        return `
          <div class="max-w-3xl mx-auto py-8 md:py-12 space-y-8 px-4">
            
            <div class="text-center space-y-1">
              <span class="text-xs font-bold uppercase tracking-widest text-[var(--invite-accent)]">ITINERARY</span>
              <h2 class="wedding-section-title font-bold text-[var(--invite-primary)]">${title}</h2>
            </div>

            <!-- Vertical Editorial Schedule Flow -->
            <div class="relative max-w-xl mx-auto space-y-6 before:absolute before:top-4 before:bottom-4 before:right-6 md:before:right-8 before:w-0.5 before:bg-[var(--invite-accent)]/30">
              ${events.map((ev, i) => `
                <div class="relative flex items-start gap-4 md:gap-6 bg-[var(--invite-surface)] p-5 rounded-2xl border border-[var(--invite-border)] shadow-xs transition hover:translate-x-1">
                  <div class="w-10 h-10 rounded-full bg-[var(--invite-primary)] text-[var(--invite-accent-light)] flex items-center justify-center text-sm font-bold shrink-0 shadow-sm z-10">
                    ${i + 1}
                  </div>
                  <div class="flex-1 space-y-0.5">
                    <div class="text-xs font-bold text-[var(--invite-accent)]">${lang === 'ar' ? ev.timeAr : ev.timeEn}</div>
                    <div class="text-sm md:text-base font-bold text-[var(--invite-text)]">${lang === 'ar' ? ev.titleAr : ev.titleEn}</div>
                  </div>
                </div>
              `).join('')}
            </div>

          </div>
        `;
      },
      renderInspector(data, lang) {
        return `
          <div class="space-y-4 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'عنوان الجدول:' : 'Title:'}</label>
              <input type="text" value="${data.titleAr || ''}" oninput="Builder.updateActiveBlockField('titleAr', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white">
            </div>
            <p class="text-[11px] text-slate-500">${lang === 'ar' ? 'تم ضبط جدول الفقرات مسبقاً' : 'Pre-configured timeline events'}</p>
          </div>
        `;
      }
    },

    // ========================================================================
    // 6. VENUE & LOCATION (Split Desktop Layout with Instant Map Actions)
    // ========================================================================
    venue: {
      type: 'venue',
      nameAr: 'موقع القاعة والخرائط',
      nameEn: 'Venue Location & Maps',
      icon: 'mapPin',
      category: 'essentials',
      renderGuest(data, guest, lang) {
        const title = lang === 'ar' ? data.titleAr : data.titleEn;
        const venue = lang === 'ar' ? data.venueNameAr : data.venueNameEn;
        const address = lang === 'ar' ? data.addressAr : data.addressEn;
        const photo = data.photo || 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1000&q=80';

        return `
          <div class="theme-card max-w-4xl mx-auto rounded-[36px] overflow-hidden bg-[var(--invite-surface)] border border-[var(--invite-border)] shadow-lg">
            
            <div class="grid grid-cols-1 md:grid-cols-12">
              
              <!-- Left (6 Cols on Desktop): Large Venue Photo -->
              <div class="md:col-span-6 h-64 md:h-auto min-h-[280px] relative overflow-hidden group">
                <img src="${photo}" class="w-full h-full object-cover transition duration-700 group-hover:scale-105" alt="Venue">
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6 md:hidden">
                  <div class="text-white">
                    <div class="font-bold text-lg">${venue}</div>
                    <div class="text-xs text-white/80">${address}</div>
                  </div>
                </div>
              </div>

              <!-- Right (6 Cols on Desktop): Details & Direct Navigation Buttons -->
              <div class="md:col-span-6 p-6 md:p-10 flex flex-col justify-between space-y-6 text-right">
                
                <div class="space-y-3">
                  <span class="text-xs font-bold uppercase tracking-widest text-[var(--invite-accent)]">LOCATION & DIRECTIONS</span>
                  <h2 class="text-2xl md:text-3xl font-bold font-serif text-[var(--invite-primary)]">${title}</h2>
                  <div class="hidden md:block space-y-1 pt-2">
                    <div class="font-bold text-base text-[var(--invite-text)]">${venue}</div>
                    <div class="text-xs text-[var(--invite-text-muted)] leading-relaxed">${address}</div>
                  </div>
                </div>

                <!-- One-Tap Map Directions -->
                <div class="space-y-3 pt-2">
                  <a href="${data.googleMapsUrl || 'https://maps.google.com'}" target="_blank" class="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-[var(--invite-primary)] text-white text-xs font-bold shadow-md hover:opacity-90 transition">
                    <span>📍</span>
                    <span>${lang === 'ar' ? 'فتح في Google Maps' : 'Open in Google Maps'}</span>
                  </a>
                  <a href="${data.appleMapsUrl || 'http://maps.apple.com'}" target="_blank" class="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-[var(--invite-surface-alt)] text-[var(--invite-primary)] border border-[var(--invite-border)] text-xs font-bold shadow-xs hover:bg-[var(--invite-accent)]/15 transition">
                    <span>🗺️</span>
                    <span>${lang === 'ar' ? 'فتح في Apple Maps' : 'Open in Apple Maps'}</span>
                  </a>
                </div>

              </div>

            </div>

          </div>
        `;
      },
      renderInspector(data, lang) {
        return `
          <div class="space-y-4 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'اسم القاعة:' : 'Venue Name:'}</label>
              <input type="text" value="${data.venueNameAr || ''}" oninput="Builder.updateActiveBlockField('venueNameAr', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'العنوان التفصيلي:' : 'Address:'}</label>
              <input type="text" value="${data.addressAr || ''}" oninput="Builder.updateActiveBlockField('addressAr', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'رابط صورة القاعة:' : 'Venue Photo URL:'}</label>
              <input type="text" value="${data.photo || ''}" oninput="Builder.updateActiveBlockField('photo', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white">
            </div>
          </div>
        `;
      }
    },

    // ========================================================================
    // 7. DRESS CODE & PALETTE
    // ========================================================================
    dresscode: {
      type: 'dresscode',
      nameAr: 'قواعد وألوان الزي (Dress Code)',
      nameEn: 'Dress Code & Palette',
      icon: 'shirt',
      category: 'event_details',
      renderGuest(data, guest, lang) {
        const title = lang === 'ar' ? data.titleAr : data.titleEn;
        const desc = lang === 'ar' ? data.descAr : data.descEn;
        const colors = data.colors || [];

        return `
          <div class="theme-card max-w-3xl mx-auto p-8 md:p-12 text-center space-y-6 rounded-[32px] bg-[var(--invite-surface)] border border-[var(--invite-border)] shadow-md">
            
            <div class="space-y-1">
              <span class="text-xs font-bold uppercase tracking-widest text-[var(--invite-accent)]">DRESS CODE</span>
              <h2 class="wedding-section-title font-bold text-[var(--invite-primary)]">${title}</h2>
            </div>

            <p class="text-xs md:text-sm text-[var(--invite-text-muted)] max-w-md mx-auto leading-relaxed">
              ${desc}
            </p>

            <!-- Luxury Circular Color Palette -->
            <div class="pt-3 space-y-3">
              <div class="text-[11px] font-bold text-[var(--invite-accent)] tracking-widest uppercase">
                ${lang === 'ar' ? 'لوحة الألوان المفضلة للحفل' : 'WEDDING COLOR PALETTE'}
              </div>
              
              <div class="flex items-center justify-center gap-4 md:gap-6 pt-1">
                ${colors.map(c => `
                  <div class="flex flex-col items-center gap-2">
                    <div class="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[var(--invite-border)] shadow-md transition hover:scale-110" style="background-color: ${c.hex};"></div>
                    <span class="text-[11px] font-semibold text-[var(--invite-text)]">${lang === 'ar' ? c.nameAr : c.nameEn}</span>
                  </div>
                `).join('')}
              </div>
            </div>

          </div>
        `;
      },
      renderInspector(data, lang) {
        return `
          <div class="space-y-4 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'عنوان القسم:' : 'Title:'}</label>
              <input type="text" value="${data.titleAr || ''}" oninput="Builder.updateActiveBlockField('titleAr', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'الوصف والإرشادات:' : 'Description:'}</label>
              <textarea rows="3" oninput="Builder.updateActiveBlockField('descAr', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white">${data.descAr || ''}</textarea>
            </div>
          </div>
        `;
      }
    },

    // ========================================================================
    // 8. PROGRESSIVE RSVP MODULE
    // ========================================================================
    rsvp: {
      type: 'rsvp',
      nameAr: 'نموذج تأكيد الحضور (RSVP)',
      nameEn: 'Interactive RSVP Module',
      icon: 'rsvp',
      category: 'essentials',
      isFixed: true,
      renderGuest(data, guest, lang) {
        return `<div id="interactive-rsvp-mount-container" data-token="${guest ? guest.token : 'k82f9x'}"></div>`;
      },
      renderInspector(data, lang) {
        return `
          <div class="space-y-4 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'عنوان النموذج:' : 'RSVP Title:'}</label>
              <input type="text" value="${data.titleAr || ''}" oninput="Builder.updateActiveBlockField('titleAr', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'الموعد النهائي للتأكيد:' : 'Deadline Note:'}</label>
              <input type="text" value="${data.deadlineAr || ''}" oninput="Builder.updateActiveBlockField('deadlineAr', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white">
            </div>
          </div>
        `;
      }
    },

    // ========================================================================
    // 9. FINE CATERING & MENU
    // ========================================================================
    catering: {
      type: 'catering',
      nameAr: 'قائمة الطعام والضيافة',
      nameEn: 'Fine Dining Menu',
      icon: 'utensils',
      category: 'event_details',
      renderGuest(data, guest, lang) {
        const title = lang === 'ar' ? data.titleAr : data.titleEn;
        const subtitle = lang === 'ar' ? data.subtitleAr : data.subtitleEn;
        const dishes = data.dishes || [];

        return `
          <div class="theme-card max-w-3xl mx-auto p-8 md:p-12 space-y-6 rounded-[32px] bg-[var(--invite-surface)] border border-[var(--invite-border)] shadow-md">
            
            <div class="text-center space-y-1">
              <span class="text-xs font-bold uppercase tracking-widest text-[var(--invite-accent)]">FINE DINING</span>
              <h2 class="wedding-section-title font-bold text-[var(--invite-primary)]">${title}</h2>
              <p class="text-xs md:text-sm text-[var(--invite-text-muted)]">${subtitle}</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              ${dishes.map(d => `
                <div class="p-5 rounded-2xl bg-[var(--invite-surface-alt)]/60 border border-[var(--invite-border)] flex flex-col justify-between space-y-3 text-right">
                  <span class="text-2xl">🍽️</span>
                  <div>
                    <div class="font-bold text-xs md:text-sm text-[var(--invite-primary)]">${lang === 'ar' ? d.nameAr : d.nameEn}</div>
                    <div class="text-[10px] text-[var(--invite-accent)] font-semibold mt-1">${lang === 'ar' ? 'طبق رئيسي فاخر' : 'Signature Entrée'}</div>
                  </div>
                </div>
              `).join('')}
            </div>

          </div>
        `;
      },
      renderInspector(data, lang) {
        return `
          <div class="space-y-4 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'عنوان القائمة:' : 'Title:'}</label>
              <input type="text" value="${data.titleAr || ''}" oninput="Builder.updateActiveBlockField('titleAr', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'الوصف الفرعي:' : 'Subtitle:'}</label>
              <input type="text" value="${data.subtitleAr || ''}" oninput="Builder.updateActiveBlockField('subtitleAr', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white">
            </div>
          </div>
        `;
      }
    },

    // ========================================================================
    // 10. SHARED MEMORIES GALLERY (Editorial Masonry Layout)
    // ========================================================================
    gallery: {
      type: 'gallery',
      nameAr: 'معرض الصور التذكارية',
      nameEn: 'Shared Photo Gallery',
      icon: 'image',
      category: 'media',
      renderGuest(data, guest, lang) {
        const title = lang === 'ar' ? data.titleAr : data.titleEn;
        const images = data.images || [];

        return `
          <div class="max-w-4xl mx-auto py-8 md:py-12 space-y-8 px-4">
            
            <div class="text-center space-y-1">
              <span class="text-xs font-bold uppercase tracking-widest text-[var(--invite-accent)]">MEMORIES</span>
              <h2 class="wedding-section-title font-bold text-[var(--invite-primary)]">${title}</h2>
            </div>

            <!-- Staggered Editorial Gallery Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              ${images.map((img, i) => `
                <div class="aspect-4/5 rounded-3xl overflow-hidden border border-[var(--invite-border)] shadow-sm group cursor-pointer ${i === 1 ? 'sm:translate-y-4' : ''}" onclick="openPhotoLightbox('${img}')">
                  <img src="${img}" class="w-full h-full object-cover transition duration-500 group-hover:scale-105" alt="Gallery Photo">
                </div>
              `).join('')}
            </div>

          </div>
        `;
      },
      renderInspector(data, lang) {
        return `
          <div class="space-y-4 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'عنوان المعرض:' : 'Title:'}</label>
              <input type="text" value="${data.titleAr || ''}" oninput="Builder.updateActiveBlockField('titleAr', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white">
            </div>
          </div>
        `;
      }
    },

    // ========================================================================
    // 11. SONG REQUEST (DJ)
    // ========================================================================
    song: {
      type: 'song',
      nameAr: 'اقتراح أغاني للحفل (DJ)',
      nameEn: 'Song Request (DJ)',
      icon: 'music',
      category: 'interaction',
      renderGuest(data, guest, lang) {
        const title = lang === 'ar' ? data.titleAr : data.titleEn;
        const subtitle = lang === 'ar' ? data.subtitleAr : data.subtitleEn;

        return `
          <div class="theme-card max-w-xl mx-auto p-8 md:p-10 space-y-4 rounded-[32px] bg-[var(--invite-surface)] border border-[var(--invite-border)] shadow-md text-center">
            <div class="w-12 h-12 rounded-full bg-[var(--invite-accent)]/15 border border-[var(--invite-border)] flex items-center justify-center mx-auto text-xl">
              🎵
            </div>
            
            <div class="space-y-1">
              <span class="text-xs font-bold uppercase tracking-widest text-[var(--invite-accent)]">DJ REQUESTS</span>
              <h2 class="text-2xl font-bold font-serif text-[var(--invite-primary)]">${title}</h2>
              <p class="text-xs text-[var(--invite-text-muted)]">${subtitle}</p>
            </div>

            <div class="space-y-2 pt-2 text-right">
              <input type="text" id="song-input-title" placeholder="${lang === 'ar' ? 'اسم الأغنية أو الفنان...' : 'Song title or artist...'}" class="w-full px-4 py-3 text-xs rounded-xl bg-[var(--invite-surface-alt)] border border-[var(--invite-border)] text-[var(--invite-text)] focus:ring-2 focus:ring-[var(--invite-primary)] outline-none">
              <button onclick="submitSongRequest()" class="w-full py-3 rounded-xl bg-[var(--invite-primary)] text-white text-xs font-bold hover:opacity-90 transition shadow-sm">
                ${lang === 'ar' ? 'إرسال الاقتراح إلى الـ DJ 🎶' : 'Submit Song to DJ 🎶'}
              </button>
            </div>
          </div>
        `;
      },
      renderInspector(data, lang) {
        return `
          <div class="space-y-4 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'العنوان:' : 'Title:'}</label>
              <input type="text" value="${data.titleAr || ''}" oninput="Builder.updateActiveBlockField('titleAr', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white">
            </div>
          </div>
        `;
      }
    },

    // ========================================================================
    // 12. CALENDAR & REMINDER (Add to Calendar)
    // ========================================================================
    calendar: {
      type: 'calendar',
      nameAr: 'إضافة الحفل إلى التقويم',
      nameEn: 'Add to Calendar',
      icon: 'calendar',
      category: 'essentials',
      renderGuest(data, guest, lang) {
        const title = lang === 'ar' ? data.titleAr : data.titleEn;
        const sub = lang === 'ar' ? data.subAr : data.subEn;

        return `
          <div class="theme-card max-w-xl mx-auto p-6 md:p-8 space-y-4 rounded-3xl bg-[var(--invite-surface)] border border-[var(--invite-border)] shadow-sm text-center">
            <div class="space-y-1">
              <span class="text-xs font-bold uppercase tracking-widest text-[var(--invite-accent)]">REMINDER</span>
              <h3 class="text-xl font-bold font-serif text-[var(--invite-primary)]">${title}</h3>
              <p class="text-xs text-[var(--invite-text-muted)]">${sub}</p>
            </div>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+of+Maya+%26+Liam&dates=20261014T163000Z/20261014T213000Z&details=Wedding+Celebration&location=Jeddah" target="_blank" class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[var(--invite-primary)] text-white text-xs font-bold shadow hover:opacity-90 transition flex items-center justify-center gap-2">
                <span>🗓️</span>
                <span>Google Calendar</span>
              </a>
              <button onclick="downloadIcsCalendar()" class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[var(--invite-surface-alt)] text-[var(--invite-primary)] border border-[var(--invite-border)] text-xs font-bold hover:bg-[var(--invite-accent)]/15 transition flex items-center justify-center gap-2">
                <span>🍏</span>
                <span>Apple / Outlook (.ics)</span>
              </button>
            </div>
          </div>
        `;
      },
      renderInspector(data, lang) {
        return `
          <div class="space-y-4 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'العنوان:' : 'Title:'}</label>
              <input type="text" value="${data.titleAr || ''}" oninput="Builder.updateActiveBlockField('titleAr', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white">
            </div>
          </div>
        `;
      }
    },

    // ========================================================================
    // 13. TRAVEL & ACCOMMODATION
    // ========================================================================
    travel: {
      type: 'travel',
      nameAr: 'الإقامة وخدمة صف السيارات (Valet)',
      nameEn: 'Travel & Accommodation',
      icon: 'car',
      category: 'event_details',
      renderGuest(data, guest, lang) {
        const title = lang === 'ar' ? data.titleAr : data.titleEn;
        const hotel = lang === 'ar' ? data.hotelAr : data.hotelEn;
        const valet = lang === 'ar' ? data.valetAr : data.valetEn;

        return `
          <div class="theme-card max-w-3xl mx-auto p-8 md:p-10 space-y-6 rounded-[32px] bg-[var(--invite-surface)] border border-[var(--invite-border)] shadow-md text-center">
            <div class="space-y-1">
              <span class="text-xs font-bold uppercase tracking-widest text-[var(--invite-accent)]">GUEST SERVICES</span>
              <h2 class="wedding-section-title font-bold text-[var(--invite-primary)]">${title}</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
              <div class="p-5 rounded-2xl bg-[var(--invite-surface-alt)]/60 border border-[var(--invite-border)] space-y-2">
                <div class="flex items-center gap-2 text-sm font-bold text-[var(--invite-primary)]">
                  <span>🏨</span>
                  <span>${lang === 'ar' ? 'الفندق وخصم الحجوزات' : 'Hotel Booking'}</span>
                </div>
                <p class="text-xs text-[var(--invite-text-muted)] leading-relaxed">${hotel}</p>
              </div>

              <div class="p-5 rounded-2xl bg-[var(--invite-surface-alt)]/60 border border-[var(--invite-border)] space-y-2">
                <div class="flex items-center gap-2 text-sm font-bold text-[var(--invite-primary)]">
                  <span>🚗</span>
                  <span>${lang === 'ar' ? 'خدمة صف السيارات (Valet)' : 'Valet Parking'}</span>
                </div>
                <p class="text-xs text-[var(--invite-text-muted)] leading-relaxed">${valet}</p>
              </div>
            </div>
          </div>
        `;
      },
      renderInspector(data, lang) {
        return `
          <div class="space-y-4 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'العنوان:' : 'Title:'}</label>
              <input type="text" value="${data.titleAr || ''}" oninput="Builder.updateActiveBlockField('titleAr', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white">
            </div>
          </div>
        `;
      }
    },

    // ========================================================================
    // 14. VIP DIGITAL ENTRY PASS
    // ========================================================================
    qr_pass: {
      type: 'qr_pass',
      nameAr: 'بطاقة الدخول الرقمية (QR Pass)',
      nameEn: 'VIP Digital Entry Pass',
      icon: 'qrCode',
      category: 'final',
      isFixed: true,
      renderGuest(data, guest, lang) {
        const title = lang === 'ar' ? data.titleAr : data.titleEn;
        const notice = lang === 'ar' ? data.noticeAr : data.noticeEn;
        const guestName = guest ? (lang === 'ar' ? guest.nameAr : guest.nameEn) : 'هاشم النماري';
        const groupName = guest ? (lang === 'ar' ? guest.groupAr : guest.groupEn) : 'عائلة النماري';
        const table = guest ? guest.tableNo : 'VIP 01';
        const seats = guest ? (guest.attendingCount || guest.allowedSeats || 1) : 2;
        const token = guest ? guest.token : 'k82f9x';

        return `
          <div class="theme-card max-w-xl mx-auto p-8 md:p-12 space-y-6 rounded-[36px] bg-gradient-to-b from-[var(--invite-surface)] to-[var(--invite-surface-alt)] border-2 border-[var(--invite-accent)] shadow-2xl text-center relative overflow-hidden">
            
            <div class="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[var(--invite-primary)] via-[var(--invite-accent)] to-[var(--invite-primary)]"></div>

            <div class="space-y-1">
              <span class="text-[10px] font-bold tracking-widest uppercase text-[var(--invite-accent)]">OFFICIAL ENTRY PASS</span>
              <h2 class="wedding-section-title font-bold text-[var(--invite-primary)] flex flex-wrap items-center justify-center gap-2">
                <span class="whitespace-nowrap">${lang === 'ar' ? 'بطاقة الدخول الرقمية' : 'Digital Entry Pass'}</span>
                <span class="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-[var(--invite-accent)]/20 text-[var(--invite-accent)] whitespace-nowrap">VIP PASS</span>
              </h2>
            </div>

            <div class="bg-[var(--invite-surface)] p-5 rounded-2xl border border-[var(--invite-border)] text-xs space-y-2.5 max-w-sm mx-auto shadow-inner text-right">
              <div class="flex justify-between items-center border-b border-[var(--invite-border)] pb-2">
                <span class="text-[var(--invite-text-muted)]">${lang === 'ar' ? 'اسم الضيف:' : 'Guest Name:'}</span>
                <span class="font-bold text-[var(--invite-primary)] text-sm">${guestName}</span>
              </div>
              <div class="flex justify-between items-center border-b border-[var(--invite-border)] pb-2">
                <span class="text-[var(--invite-text-muted)]">${lang === 'ar' ? 'المجموعة:' : 'Group:'}</span>
                <span class="font-semibold text-[var(--invite-text)]">${groupName}</span>
              </div>
              <div class="flex justify-between items-center border-b border-[var(--invite-border)] pb-2">
                <span class="text-[var(--invite-text-muted)]">${lang === 'ar' ? 'المقاعد المصرحة:' : 'Admitted Seats:'}</span>
                <span class="font-bold text-[var(--invite-accent)]">${seats} ${lang === 'ar' ? 'أفراد' : 'Guests'}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-[var(--invite-text-muted)]">${lang === 'ar' ? 'الطاولة المخصصة:' : 'Table:'}</span>
                <span class="font-bold text-[var(--invite-primary)]">${table}</span>
              </div>
            </div>

            <!-- Dynamic QR Canvas -->
            <div class="p-5 bg-white rounded-2xl border-2 border-[var(--invite-accent)] inline-block shadow-md">
              <div id="guest-qrcode-canvas" data-qr-payload="https://quickrsvp.me/entry/${token}" class="mx-auto flex items-center justify-center min-w-[140px] min-h-[140px]"></div>
              <div class="text-[10px] font-mono font-bold text-gray-500 mt-2">TOKEN: ${token}</div>
            </div>

            <p class="text-[11px] text-[var(--invite-text-muted)] max-w-xs mx-auto">
              ${notice}
            </p>

            <button onclick="window.print()" class="px-6 py-3 rounded-2xl bg-[var(--invite-primary)] text-white text-xs font-bold shadow hover:opacity-90 transition inline-flex items-center gap-2">
              <span>🖨️</span>
              <span>${lang === 'ar' ? 'طباعة أو حفظ البطاقة' : 'Print or Save Pass'}</span>
            </button>
          </div>
        `;
      },
      renderInspector(data, lang) {
        return `
          <div class="space-y-4 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'عنوان البطاقة:' : 'Title:'}</label>
              <input type="text" value="${data.titleAr || ''}" oninput="Builder.updateActiveBlockField('titleAr', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'ملاحظة الإرشاد:' : 'Notice:'}</label>
              <input type="text" value="${data.noticeAr || ''}" oninput="Builder.updateActiveBlockField('noticeAr', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white">
            </div>
          </div>
        `;
      }
    }
  },

  getCategories() {
    return [
      { id: 'essentials', nameAr: 'عناصر الزفاف الأساسية', nameEn: 'Core Essentials', icon: '💍' },
      { id: 'schedule', nameAr: 'المواعيد والموقع', nameEn: 'Schedule & Venue', icon: '📍' },
      { id: 'experience', nameAr: 'تجربة الضيوف والتأكيد', nameEn: 'Guest RSVP & Dining', icon: '🤍' },
      { id: 'media', nameAr: 'الوسائط والذكريات', nameEn: 'Media & Highlights', icon: '📸' }
    ];
  },

  get(type) {
    return this.sections[type];
  },

  getAll() {
    return Object.values(this.sections);
  },

  getByCategory(catKey) {
    return Object.values(this.sections).filter(s => s.category === catKey);
  }
};

if (typeof window !== 'undefined') {
  window.SectionRegistry = SectionRegistry;
}
