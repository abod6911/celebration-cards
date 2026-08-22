/**
 * CELEBRIA — CINEMATIC SPATIAL ENGINE & CAMERA TIMELINE
 * Luxury Celebration, Wedding & Event Cards Platform
 */

(function () {
  'use strict';

  window.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      setTimeout(initSpatialExperience, 150);
      return;
    }
    initSpatialExperience();
  });

  function initSpatialExperience() {
    gsap.registerPlugin(ScrollTrigger);

    const progressBar = document.getElementById('scroll-progress-line');

    // 1. Scroll Progress Bar
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? winScroll / height : 0;
      if (progressBar) {
        progressBar.style.transform = `scaleX(${scrolled})`;
      }
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 2. Opening Camera Zoom: Mosaic -> Hero (Desktop / Tablet)
    if (!prefersReducedMotion && window.innerWidth > 768) {
      const mosaicSection = document.getElementById('mosaic-overview-section');
      const mosaicCanvas = document.getElementById('mosaic-canvas');
      const openingHeroTile = document.getElementById('opening-hero-tile');

      if (mosaicSection && mosaicCanvas) {
        const openingTL = gsap.timeline({
          scrollTrigger: {
            trigger: mosaicSection,
            start: 'top top',
            end: '+=900',
            pin: true,
            scrub: 0.8,
          }
        });

        openingTL
          .to(mosaicCanvas, {
            scale: 2.5,
            y: -140,
            opacity: 0.2,
            ease: 'power2.inOut',
            duration: 1
          })
          .to(openingHeroTile, {
            scale: 1.45,
            borderColor: 'rgba(212, 175, 55, 0.9)',
            boxShadow: '0 0 100px rgba(212, 175, 55, 0.5)',
            opacity: 1,
            ease: 'power1.out',
            duration: 0.8
          }, 0)
          .to('#mosaic-zoom-hint', {
            opacity: 0,
            y: -20,
            duration: 0.3
          }, 0);
      }

      // Final Camera Pull-Back (Footer -> Full Mosaic Overview)
      const closingSection = document.getElementById('closing-mosaic-stage');
      const closingCanvas = document.getElementById('closing-mosaic-canvas');

      if (closingSection && closingCanvas) {
        gsap.fromTo(closingCanvas, 
          { scale: 1.6, opacity: 0.3, z: 150 },
          {
            scale: 1,
            opacity: 1,
            z: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: closingSection,
              start: 'top 85%',
              end: 'bottom bottom',
              scrub: 1.2
            }
          }
        );
      }
    }

    // 3. Staggered Mask Hero Reveal
    const heroWords = document.querySelectorAll('.hero-reveal-word');
    if (heroWords.length > 0) {
      gsap.from(heroWords, {
        scrollTrigger: {
          trigger: '#hero-section',
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1.1,
        ease: 'power3.out'
      });
    }

    // 4. Numeric Metric Counters in Bento Grid
    const counters = document.querySelectorAll('.counter-val');
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target') || '0');
      const suffix = counter.getAttribute('data-suffix') || '';
      const prefix = counter.getAttribute('data-prefix') || '';

      ScrollTrigger.create({
        trigger: counter,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: target,
            duration: 2.2,
            ease: 'power2.out',
            onUpdate: function () {
              const current = Math.floor(this.targets()[0].val);
              counter.textContent = `${prefix}${current.toLocaleString()}${suffix}`;
            }
          });
        }
      });
    });

    // 5. Staggered Bento Cards Entrance
    const bentoCards = document.querySelectorAll('.bento-card');
    if (bentoCards.length > 0) {
      gsap.from(bentoCards, {
        scrollTrigger: {
          trigger: '#bento-section',
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        scale: 0.97,
        stagger: 0.12,
        duration: 0.85,
        ease: 'power2.out'
      });
    }

    // 6. Testimonials Stagger
    const reviewCards = document.querySelectorAll('.testimonial-card');
    if (reviewCards.length > 0) {
      gsap.from(reviewCards, {
        scrollTrigger: {
          trigger: '#testimonials-section',
          start: 'top 80%',
        },
        y: 45,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out'
      });
    }

    // 7. Interactive Spotlight Follower
    const heroContainer = document.querySelector('.hero-container');
    const heroSpotlight = document.querySelector('.hero-spotlight');
    if (heroContainer && heroSpotlight) {
      heroContainer.addEventListener('mousemove', (e) => {
        const rect = heroContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        gsap.to(heroSpotlight, {
          x: x - rect.width / 2,
          y: y - rect.height / 2,
          duration: 0.7,
          ease: 'power2.out'
        });
      });
    }

    // 8. Luxury Web Audio Synthesizer (Chime Sound Effect)
    initLuxuryAudio();

    // 9. Bilingual Language Switcher (AR / EN)
    initI18n();

    // 10. WhatsApp Concierge Modal
    initWhatsAppConcierge();

    // 11. Refresh Lucide Icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  function initLuxuryAudio() {
    let audioCtx = null;
    let soundEnabled = false;
    const soundToggle = document.getElementById('sound-toggle-btn');

    function playChime(freq = 528, duration = 1.0) {
      if (!soundEnabled) return;
      try {
        if (!audioCtx) {
          audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.4, audioCtx.currentTime + duration);

        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + duration);
      } catch (err) {
        console.warn('Audio play error:', err);
      }
    }

    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        if (soundEnabled) {
          soundToggle.classList.add('text-[#d4af37]', 'border-[#d4af37]');
          playChime(659.25, 0.8);
        } else {
          soundToggle.classList.remove('text-[#d4af37]', 'border-[#d4af37]');
        }
      });
    }

    document.querySelectorAll('.hero-cta-btn, .highlight-pill, .bento-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (soundEnabled) playChime(440, 0.4);
      });
    });
  }

  function initI18n() {
    const langBtn = document.getElementById('lang-toggle-btn');
    if (!langBtn) return;

    const translations = {
      ar: {
        dir: 'rtl',
        lang: 'ar',
        nav_tagline: 'منصة بطاقات ودعوات الاحتفالات الفاخرة',
        nav_explore: 'نماذج البطاقات',
        nav_how: 'كيف تعمل',
        nav_features: 'المزايا الذكية',
        nav_reviews: 'تجارب أصحاب الحفل',
        nav_contact: 'تواصل معنا',
        nav_whatsapp: 'طلب تصميم خاص عبر واتساب',
        mosaic_title: 'خريطة المنصة السينمائية',
        mosaic_hero_label: 'المدخل الملكي للدعوة',
        mosaic_how_label: 'رحلة تصميم البطاقة',
        mosaic_features_label: 'المزايا والتقنيات الذكية',
        mosaic_reviews_label: 'تجارب العملاء',
        mosaic_footer_label: 'أتيليه البطاقات والدعوات',
        hero_badge: 'أتيليه بطاقات الزفاف والاحتفالات الفاخرة',
        hero_h1_1: 'دعوات تُصاغ',
        hero_h1_2: 'لتخليد أسعد اللحظات',
        hero_desc: 'نبتكر في سيليبريا أرقى بطاقات ودعوات الاحتفالات الرقمية والمطبوعة، بتصاميم ملكية مذهبة، وتأكيد حضور ذكي (RSVP) عبر واتساب، وباركود دخول VIP مخصص لكل ضيف.',
        hero_cta: 'صمّم بطاقة دعوتك الآن',
        hero_cta_sec: 'استكشف تشكيلات البطاقات الملكية',
        card_preview_title: 'دعوة زفاف آل سعود & آل الشيخ',
        card_preview_date: 'الجمعة، 15 شعبان 1448 هـ — قصر الضيافة الملكي',
        card_preview_cta: 'تأكيد الحضور ومسح رمز الدخول (VIP QR)',
        how_lead: 'رحلة دعوة تتجاوز التوقعات',
        how_phrase_1: 'نصنع من تفاصيل حفلكم',
        how_pill: 'دعوة استثنائية',
        how_phrase_2: 'تليق بمقام ضيوفكم',
        how_sub: 'من الفكرة والخط العربي المذهب، إلى إرسال الدعوات الذكية ومتابعة تأكيد الحضور الفوري لضيوفكم بكل سلاسة وأناقة.',
        bento_tag: 'تقنيات الدعوات الفاخرة',
        bento_title: 'لماذا يختار أصحاب الأفراح والمناسبات الراقية منصة سيليبريا؟',
        bento_card1_title: 'بطاقة دعوة تفاعلية وتأكيد حضور ذكي',
        bento_card1_desc: 'رابط خاص لكل ضيف مع بطاقة تفاعلية سينمائية، تأكيد فوري بالاسم وعدد المرافقين، وموقع القاعة عبر خرائط Google مباشرة.',
        bento_stat1_num: '100%',
        bento_stat1_label: 'تسليم فوري ومزامنة فورية للضيوف',
        bento_stat2_num: '3',
        bento_stat2_suffix: ' ثوانٍ',
        bento_stat2_label: 'سرعة فتح بطاقة الدعوة عبر كافة الهواتف',
        bento_stat3_num: '50000',
        bento_stat3_prefix: '+',
        bento_stat3_label: 'بطاقة دعوة فاخرة تم إرسالها للأفراح والفعاليات',
        bento_card4_title: 'طباعة قطنية فاخرة وختم الشمع الملكي',
        bento_card4_desc: 'إمكانية الحصول على نسخ ورقية مطبوعة على ورق قطني إيطالي مذهب مع أختام شمع ملكية مخصصة بحروف العروسين.',
        typo_line1: 'بطاقة الدعوة ليست مجرد كرت',
        typo_pill: 'بصمة الفخامة الأولى',
        typo_line2: 'لأرقى ليالي العمر',
        testimonials_tag: 'ثقة نعتز بها',
        testimonials_title: 'ماذا يقول أصحاب الأعراس والمناسبات الكبرى؟',
        footer_title: 'سيليبريا — أتيليه بطاقات ودعوات الاحتفالات الفاخرة',
        footer_sub: 'المملكة العربية السعودية — الرياض / جدة / الخليج العربي. بطاقات ودعوات تُصاغ لتبقى خالدة في الذاكرة.',
        footer_hours: 'خدمة العملاء ومصممو الدعوات متاحون يومياً على مدار 24 ساعة',
        footer_cta: 'تواصل مع مستشار بطاقات الدعوة الخاص بك',
        footer_rights: 'جميع الحقوق محفوظة © منصة سيليبريا لبطاقات الاحتفالات 2026'
      },
      en: {
        dir: 'ltr',
        lang: 'en',
        nav_tagline: 'Luxury Celebration & Wedding Cards Platform',
        nav_explore: 'Card Collections',
        nav_how: 'How It Works',
        nav_features: 'Smart Features',
        nav_reviews: 'Host Reviews',
        nav_contact: 'Contact Us',
        nav_whatsapp: 'Custom Invitation Order',
        mosaic_title: 'Cinematic Platform Overview',
        mosaic_hero_label: 'Royal Invitation Entrance',
        mosaic_how_label: 'Invitation Creation Flow',
        mosaic_features_label: 'Smart Features & Tech',
        mosaic_reviews_label: 'Host Endorsements',
        mosaic_footer_label: 'Invitation Atelier',
        hero_badge: 'Luxury Celebration & Wedding Cards Atelier',
        hero_h1_1: 'Invitations Crafted',
        hero_h1_2: 'To Immortalize Grand Moments',
        hero_desc: 'At Celebria, we craft bespoke digital and gilded physical invitation suites for luxury weddings and galas, featuring instant WhatsApp RSVP tracking and personalized VIP QR guest passes.',
        hero_cta: 'Design Your Custom Invitation',
        hero_cta_sec: 'Explore Royal Invitation Suites',
        card_preview_title: 'Royal Wedding of The Al-Saud & Al-Sheikh',
        card_preview_date: 'Friday, 15 Sha’ban 1448 H — Royal Palace Banquet Hall',
        card_preview_cta: 'Confirm Attendance & Access VIP QR Pass',
        how_lead: 'An Invitation Journey Beyond Extraordinary',
        how_phrase_1: 'Transforming Your Event Details Into',
        how_pill: 'An Exceptional Invitation',
        how_phrase_2: 'Worthy of Your Esteemed Guests',
        how_sub: 'From gilded Arabic calligraphy to smart guest delivery and real-time attendance analytics, designed with supreme elegance.',
        bento_tag: 'Elevated Invitation Technology',
        bento_title: 'Why Elite Wedding Hosts & Event Curators Choose Celebria',
        bento_card1_title: 'Interactive Digital Invitation & Instant RSVP',
        bento_card1_desc: 'Personalized private links for each guest with cinematic animations, live companion confirmations, and instant Google Maps directions.',
        bento_stat1_num: '100%',
        bento_stat1_label: 'Instant Delivery & Real-Time Guest Sync',
        bento_stat2_num: '3',
        bento_stat2_suffix: ' sec',
        bento_stat2_label: 'Lightning Fast Load Time on All Devices',
        bento_stat3_num: '50000',
        bento_stat3_prefix: '+',
        bento_stat3_label: 'Luxury Invitations Delivered for Prestigious Events',
        bento_card4_title: 'Italian Cotton Paper & Bespoke Wax Seals',
        bento_card4_desc: 'Luxury physical keepsakes with gold foil letterpress, Italian cotton stock, and custom monogram wax seals.',
        typo_line1: 'An Invitation Is Never Just A Card',
        typo_pill: 'The First Mark of Grandeur',
        typo_line2: 'For Life’s Most Unforgettable Nights',
        testimonials_tag: 'Distinguished Trust',
        testimonials_title: 'What Wedding Hosts & Gala Planners Say About Celebria',
        footer_title: 'Celebria — Fine Celebration Cards Atelier',
        footer_sub: 'Kingdom of Saudi Arabia — Riyadh / Jeddah / Arabian Gulf. Invitations crafted to stay forever in memory.',
        footer_hours: 'Invitation Designers & Concierge Available 24/7',
        footer_cta: 'Consult Your Private Invitation Specialist',
        footer_rights: 'All Rights Reserved © Celebria Invitation Atelier 2026'
      }
    };

    let currentLang = 'ar';

    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'ar' ? 'en' : 'ar';
      const t = translations[currentLang];
      
      document.documentElement.dir = t.dir;
      document.documentElement.lang = t.lang;
      langBtn.textContent = currentLang === 'ar' ? 'English' : 'العربية';

      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
          el.textContent = t[key];
        }
      });

      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    });
  }

  function initWhatsAppConcierge() {
    window.openConciergeWhatsApp = function (customMsg) {
      const phone = '966500000000';
      const isArabic = document.documentElement.lang !== 'en';
      const text = customMsg || (isArabic 
        ? 'مرحباً منصة سيليبريا، أود تصميم بطاقة دعوة زفاف / احتفال فاخرة مع نظام تأكيد الحضور الذكي.' 
        : 'Hello Celebria Platform, I would like to design a bespoke luxury celebration & wedding invitation suite with smart RSVP tracking.');
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
    };
  }

})();
