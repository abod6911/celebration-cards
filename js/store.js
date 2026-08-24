/**
 * QuickRSVP - Central State Store & Persistence Layer
 * Handles Event State, Guest CRM Records, Reorderable Sections, Themes, and History
 */

const Store = {
  STORAGE_KEY: 'quickrsvp_state_v2',

  state: {
    event: {
      id: 'evt_wedding_2026',
      titleAr: 'حفل زفاف مايا & ليام',
      titleEn: 'Wedding of Maya & Liam',
      coupleNamesAr: 'مايا & ليام',
      coupleNamesEn: 'Maya & Liam',
      groomAr: 'ليام أحمد',
      brideAr: 'مايا النماري',
      dateIso: '2026-10-14T19:30:00',
      dateFormattedAr: 'الأربعاء، 14 أكتوبر 2026',
      dateFormattedEn: 'Wednesday, October 14, 2026',
      timeAr: '7:30 مساءً',
      timeEn: '7:30 PM',
      venueAr: 'قاعة القصر الكبير - جدة',
      venueEn: 'The Grand Palace Hall - Jeddah',
      addressAr: 'طريق الكورنيش، حي الشاطئ، جدة، المملكة العربية السعودية',
      addressEn: 'Corniche Road, Ash Shati, Jeddah, Saudi Arabia',
      googleMapsUrl: 'https://maps.google.com/?q=21.5833,39.1667',
      appleMapsUrl: 'http://maps.apple.com/?q=21.5833,39.1667',
      rsvpDeadline: '2026-09-30',
      activeTheme: 'royal-arabic',
      openingStyle: 'hanging-card', // 'hanging-card' | 'video-hanging-card' | 'video-card' | 'video' | 'card-reveal' | 'couple-reveal' | 'none'
      hangingCard: {
        animationIntensity: 'cinematic', // 'calm' | 'cinematic' | 'static'
        ribbonStyle: 'theme-adaptive',
        showGrommet: true
      },
      videoInvitation: {
        sourceType: 'template', // 'template' | 'upload'
        templateId: 'tpl_royal_emerald',
        customVideoUrl: '',
        posterUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-bride-with-a-bouquet-43152-large.mp4',
        duration: 12,
        aspectRatio: '9:16',
        mutedStart: true,
        skipEnabled: true,
        transition: 'video-to-card', // 'video-to-hero' | 'video-to-card'
        overlays: [
          {
            id: 'ov_1',
            startTime: 1,
            endTime: 4.5,
            text: 'دعوة خاصة ومميزة إلى',
            variable: '',
            position: 'center',
            animation: 'fade',
            fontStyle: 'serif',
            color: '#EFE9DE'
          },
          {
            id: 'ov_2',
            startTime: 2.5,
            endTime: 7.5,
            text: '',
            variable: '{guest_name}',
            position: 'center',
            animation: 'soft-rise',
            fontStyle: 'serif',
            color: '#D4AF37',
            isHighlight: true
          },
          {
            id: 'ov_3',
            startTime: 7.5,
            endTime: 12,
            text: 'يتشرفان بدعوتكم لمشاركتهما فرحة العمر',
            variable: '{couple_names}',
            position: 'center',
            animation: 'fade',
            fontStyle: 'serif',
            color: '#FFFFFF'
          }
        ]
      },
      coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
      welcomePhoto: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      blessingVerseAr: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
      blessingVerseEn: 'And of His signs is that He created for you spouses that you may find tranquility in them; and placed affection and mercy between you.',
      settings: {
        allowPlusOne: true,
        enableMeals: true,
        enableSongs: true,
        enableGallery: true,
        requireRsvpConfirmation: true,
        showCountdown: true,
        showDressCode: true,
        showTimeline: true
      }
    },

    // Guests Directory with realistic Saudi/Gulf and international guest data
    guests: [
      {
        id: 'gst_01',
        token: 'k82f9x',
        nameAr: 'هاشم النماري',
        nameEn: 'Hashim Al-Nimari',
        phone: '+966505123456',
        groupAr: 'عائلة النماري',
        groupEn: 'Al-Nimari Family',
        allowedSeats: 2,
        attendingCount: 2,
        rsvpStatus: 'attending', // 'attending' | 'declined' | 'awaiting' | 'not_sent'
        companions: [
          { name: 'سارة النماري', meal: 'salmon', allergies: 'None' }
        ],
        mealChoice: 'beef',
        dietaryNotes: 'لا توجد حساسية غذائية',
        tableNo: 'VIP 01',
        inviteSent: true,
        inviteSentAt: '2026-08-10 14:30',
        reminderSent: true,
        checkedIn: true,
        checkedInAt: '2026-10-14 19:42',
        privateNotes: 'شقيق العروس - طاولة كبار الشخصيات',
        wishes: 'ألف مبروك لأجمل عروسين، بارك الله لكما وعليكما وجمع بينكما في خير 🤍'
      },
      {
        id: 'gst_02',
        token: 'm49p2q',
        nameAr: 'د. طارق المنصور',
        nameEn: 'Dr. Tariq Al-Mansoor',
        phone: '+966554891234',
        groupAr: 'الأصدقاء وزملاء العمل',
        groupEn: 'Close Colleagues',
        allowedSeats: 1,
        attendingCount: 1,
        rsvpStatus: 'attending',
        companions: [],
        mealChoice: 'beef',
        dietaryNotes: 'خالي من المكسرات',
        tableNo: '04',
        inviteSent: true,
        inviteSentAt: '2026-08-10 14:32',
        reminderSent: false,
        checkedIn: false,
        checkedInAt: null,
        privateNotes: 'صديق العريس المقرب',
        wishes: 'Congratulations Maya & Liam! Wishing you lifetime happiness!'
      },
      {
        id: 'gst_03',
        token: 'w71x5e',
        nameAr: 'المهندس ريان الغامدي',
        nameEn: 'Eng. Rayan Al-Ghamdi',
        phone: '+966567123987',
        groupAr: 'عائلة الغامدي',
        groupEn: 'Al-Ghamdi Family',
        allowedSeats: 4,
        attendingCount: 4,
        rsvpStatus: 'attending',
        companions: [
          { name: 'نورة الغامدي', meal: 'salmon', allergies: 'None' },
          { name: 'فيصل الغامدي', meal: 'beef', allergies: 'None' },
          { name: 'ريما الغامدي', meal: 'vegetarian', allergies: 'Vegetarian' }
        ],
        mealChoice: 'beef',
        dietaryNotes: 'أطباق نباتية لأحد الأفراد',
        tableNo: '06',
        inviteSent: true,
        inviteSentAt: '2026-08-10 14:35',
        reminderSent: true,
        checkedIn: true,
        checkedInAt: '2026-10-14 20:05',
        privateNotes: 'عائلة كاملة (4 أفراد)',
        wishes: 'تهانينا القلبية للعروسين، دياركم عامرة بالأفراح والمسرات دائماً 🌹'
      },
      {
        id: 'gst_04',
        token: 'z38b6k',
        nameAr: 'أستاذة منى الشريف',
        nameEn: 'Mona Al-Sharif',
        phone: '+966541298765',
        groupAr: 'صديقات العروس',
        groupEn: "Bride's Friends",
        allowedSeats: 2,
        attendingCount: 0,
        rsvpStatus: 'declined',
        companions: [],
        mealChoice: null,
        dietaryNotes: '',
        tableNo: 'Unassigned',
        inviteSent: true,
        inviteSentAt: '2026-08-10 14:40',
        reminderSent: false,
        checkedIn: false,
        checkedInAt: null,
        privateNotes: 'خارج المملكة في مهمة عمل',
        wishes: 'ألف مبروك يا مايا الغالية، كنت أتمنى أكون حاضرة معكم، الله يوفقكم ويسعدكم يارب 🤍'
      },
      {
        id: 'gst_05',
        token: 'p94c1v',
        nameAr: 'خالد بن سلطان الزهراني',
        nameEn: 'Khalid Al-Zahrani',
        phone: '+966503344556',
        groupAr: 'عائلة الزهراني',
        groupEn: 'Al-Zahrani Family',
        allowedSeats: 2,
        attendingCount: 0,
        rsvpStatus: 'awaiting',
        companions: [],
        mealChoice: null,
        dietaryNotes: '',
        tableNo: '08',
        inviteSent: true,
        inviteSentAt: '2026-08-11 10:15',
        reminderSent: true,
        checkedIn: false,
        checkedInAt: null,
        privateNotes: 'تم إرسال تذكير عبر واتساب',
        wishes: ''
      },
      {
        id: 'gst_06',
        token: 'h57y9d',
        nameAr: 'سعادة الأستاذ فهد السديري',
        nameEn: 'Fahad Al-Sudairi',
        phone: '+966509988776',
        groupAr: 'ضيوف الشرف',
        groupEn: 'Honored Guests',
        allowedSeats: 2,
        attendingCount: 2,
        rsvpStatus: 'attending',
        companions: [
          { name: 'حرمه المصون', meal: 'salmon', allergies: 'None' }
        ],
        mealChoice: 'beef',
        dietaryNotes: '',
        tableNo: 'VIP 02',
        inviteSent: true,
        inviteSentAt: '2026-08-10 15:00',
        reminderSent: false,
        checkedIn: true,
        checkedInAt: '2026-10-14 19:50',
        privateNotes: 'طاولة كبار الشخصيات VIP',
        wishes: 'بارك الله لهما وبارك عليهما وجمع بينهما في خير، كل التوفيق للعروسين.'
      },
      {
        id: 'gst_07',
        token: 't23u8f',
        nameAr: 'عمر القحطاني',
        nameEn: 'Omar Al-Qahtani',
        phone: '+966562233445',
        groupAr: 'أصدقاء الجامعة',
        groupEn: 'University Friends',
        allowedSeats: 1,
        attendingCount: 0,
        rsvpStatus: 'not_sent',
        companions: [],
        mealChoice: null,
        dietaryNotes: '',
        tableNo: '10',
        inviteSent: false,
        inviteSentAt: null,
        reminderSent: false,
        checkedIn: false,
        checkedInAt: null,
        privateNotes: 'بانتظار تأكيد رقم الجوال الصحيح',
        wishes: ''
      }
    ],

    // Active modular invitation blocks in builder
    activeBlocks: [
      {
        id: 'blk_hero',
        type: 'hero',
        enabled: true,
        data: {
          titleAr: 'مايا & ليام',
          titleEn: 'Maya & Liam',
          subtitleAr: 'حفل زفاف فاخر ومميز',
          subtitleEn: 'A Celebration of Eternal Love',
          dateAr: 'الأربعاء، 14 أكتوبر 2026',
          dateEn: 'Wednesday, October 14, 2026',
          venueAr: 'قاعة القصر الكبير • جدة',
          venueEn: 'The Grand Palace Hall • Jeddah',
          bgImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'blk_welcome',
        type: 'welcome',
        enabled: true,
        data: {
          greetingAr: 'دعوة شخصية كريمة',
          greetingEn: 'Exclusive Personal Invitation',
          messageAr: 'يسعدنا ويشرفنا حضوركم لتكتمل فرحتنا بمشاركتكم أسعد لحظات العمر.',
          messageEn: 'We are overjoyed to share this unforgettable milestone with you.'
        }
      },
      {
        id: 'blk_blessing',
        type: 'blessing',
        enabled: true,
        data: {
          titleAr: 'بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ',
          titleEn: 'In The Name of God',
          verseAr: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
          verseEn: 'And of His signs is that He created for you mates that you may find tranquility in them, and He placed between you affection and mercy.'
        }
      },
      {
        id: 'blk_countdown',
        type: 'countdown',
        enabled: true,
        data: {
          titleAr: 'العد التنازلي لليلة العمر',
          titleEn: 'Counting Down To The Big Day',
          targetDate: '2026-10-14T19:30:00'
        }
      },
      {
        id: 'blk_timeline',
        type: 'timeline',
        enabled: true,
        data: {
          titleAr: 'جدول وفقرات الحفل',
          titleEn: 'Wedding Itinerary',
          events: [
            { timeAr: '7:30 م', timeEn: '7:30 PM', titleAr: 'استقبال الضيوف والقهوة السعودية', titleEn: 'Guest Welcome & Reception' },
            { timeAr: '8:30 م', timeEn: '8:30 PM', titleAr: 'موكب وزفة العروسين', titleEn: 'Grand Entrance & Zaffe' },
            { timeAr: '10:00 م', timeEn: '10:00 PM', titleAr: 'مأدبة العشاء الفاخرة', titleEn: 'Royal Wedding Dinner' },
            { timeAr: '11:15 م', timeEn: '11:15 PM', titleAr: 'مراسم تقطيع كعكة الزفاف', titleEn: 'Cake Cutting Ceremony' },
            { timeAr: '12:30 ص', timeEn: '12:30 AM', titleAr: 'ختام الحفل وتوديع الضيوف', titleEn: 'Celebration Finale' }
          ]
        }
      },
      {
        id: 'blk_venue',
        type: 'venue',
        enabled: true,
        data: {
          titleAr: 'موقع الحفل والخرائط',
          titleEn: 'Venue Location & Directions',
          venueNameAr: 'قاعة القصر الكبير - قاعة الملوك',
          venueNameEn: 'The Grand Palace - Royal Ballroom',
          addressAr: 'طريق الكورنيش الشمالي، حي الشاطئ، جدة',
          addressEn: 'North Corniche Road, Ash Shati, Jeddah',
          photo: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=800&q=80',
          googleMapsUrl: 'https://maps.google.com/?q=21.5833,39.1667',
          appleMapsUrl: 'http://maps.apple.com/?q=21.5833,39.1667'
        }
      },
      {
        id: 'blk_calendar',
        type: 'calendar',
        enabled: true,
        data: {
          titleAr: 'إضافة الموعد إلى التقويم',
          titleEn: 'Save The Date to Calendar',
          subAr: 'احفظ موعد ليلتنا السعيدة مباشرة في تقويم هاتفك',
          subEn: 'Save our wedding date directly to your calendar',
          eventTitle: 'حفل زفاف مايا & ليام | Wedding of Maya & Liam',
          description: 'حفل زفاف قاعة القصر الكبير، جدة'
        }
      },
      {
        id: 'blk_dresscode',
        type: 'dresscode',
        enabled: true,
        data: {
          titleAr: 'قواعد وألوان الزي',
          titleEn: 'Dress Code & Palette',
          descAr: 'يسعدنا حضوركم بالزي الرسمي الفاخر (ثوب وبشت للرجال / فساتين سهرة أنيقة للسيدات)',
          descEn: 'Formal Black Tie & Traditional Luxury Attire',
          colors: [
            { nameAr: 'الزمردي الداكن', nameEn: 'Royal Emerald', hex: '#0A2E23' },
            { nameAr: 'الذهبي الدافئ', nameEn: 'Warm Gold', hex: '#D4AF37' },
            { nameAr: 'العاجي الفاخر', nameEn: 'Ivory Pearl', hex: '#FFFDF9' },
            { nameAr: 'الأسود الملكي', nameEn: 'Midnight Black', hex: '#111827' }
          ]
        }
      },
      {
        id: 'blk_rsvp',
        type: 'rsvp',
        enabled: true,
        data: {
          titleAr: 'تأكيد الحضور (RSVP)',
          titleEn: 'RSVP Confirmation',
          deadlineAr: 'يرجى تأكيد الحضور قبل 30 سبتمبر 2026',
          deadlineEn: 'Kindly respond by September 30, 2026'
        }
      },
      {
        id: 'blk_catering',
        type: 'catering',
        enabled: true,
        data: {
          titleAr: 'قائمة الطعام الفاخرة',
          titleEn: 'Fine Dining Menu',
          subtitleAr: 'تجربة ضيافة ملكية منتقاة بعناية',
          subtitleEn: 'A Curated Culinary Experience',
          dishes: [
            { id: 'beef', nameAr: 'شرائح لحم العجل الفاخر بصلصة الكمأة والموريل', nameEn: 'Truffle & Morel Crusted Angus Filet' },
            { id: 'salmon', nameAr: 'فيليه السلمون الأطلسي المشوي مع صلصة الليمون والأعشاب', nameEn: 'Pan-Seared Atlantic Salmon with Citrus Herb Butter' },
            { id: 'vegetarian', nameAr: 'ريزوتو الفطر البري مع جبن البارميزان المعتق وزيت الكمأة', nameEn: 'Wild Forest Mushroom Risotto with Aged Truffle' }
          ]
        }
      },
      {
        id: 'blk_song',
        type: 'song',
        enabled: true,
        data: {
          titleAr: 'اقترح أغنيتك المفضلة مع الـ DJ 🎵',
          titleEn: 'Request a Song with the DJ 🎵',
          subtitleAr: 'شاركنا الأغنية التي تحب أن ترقص عليها في ليلتنا المميزة',
          subtitleEn: 'Tell us which tune will get you on the dance floor'
        }
      },
      {
        id: 'blk_gallery',
        type: 'gallery',
        enabled: true,
        data: {
          titleAr: 'معرض الصور التذكارية',
          titleEn: 'Shared Memories Gallery',
          subtitleAr: 'لحظات لا تُنسى من رحلتنا معاً',
          subtitleEn: 'Precious Moments from Our Journey',
          images: [
            'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'
          ]
        }
      },
      {
        id: 'blk_travel',
        type: 'travel',
        enabled: false,
        data: {
          titleAr: 'الإقامة والتنقل للضيوف من خارج المدينة',
          titleEn: 'Accommodations & Travel',
          hotelAr: 'فندق بارك حياة جدة (خصم خاص برمز: MAYA2026)',
          hotelEn: 'Park Hyatt Jeddah (Special Rate Code: MAYA2026)',
          valetAr: 'خدمة صف السيارات (Valet Parking) متاحة ومجانية عند المدخل الرئيسي',
          valetEn: 'Complimentary Valet Parking available at main entrance'
        }
      },
      {
        id: 'blk_qr_pass',
        type: 'qr_pass',
        enabled: true,
        data: {
          titleAr: 'بطاقة الدخول الرقمية (VIP Pass)',
          titleEn: 'Digital VIP Entry Pass',
          noticeAr: 'يرجى إبراز الباركود عند البوابة للدخول السريع دون انتظار',
          noticeEn: 'Present this digital pass at the venue entrance for express check-in'
        }
      }
    ],

    // Activity Stream
    activity: [
      { id: 'act_1', type: 'checkin', guestName: 'هاشم النماري', time: '19:42', textAr: 'تم تسجيل الدخول عند البوابة الرئيسية', textEn: 'Checked in at the main gate' },
      { id: 'act_2', type: 'checkin', guestName: 'سعادة الأستاذ فهد السديري', time: '19:50', textAr: 'تم التحقق من بطاقة VIP بنجاح', textEn: 'VIP Pass verified successfully' },
      { id: 'act_3', type: 'rsvp_yes', guestName: 'المهندس ريان الغامدي', time: '14:20', textAr: 'أكد الحضور مع 3 مرافقين (+1)', textEn: 'Confirmed attendance with 3 guests' },
      { id: 'act_4', type: 'rsvp_no', guestName: 'أستاذة منى الشريف', time: '12:15', textAr: 'اعتذرت عن الحضور مع رسالة تهنئة دافئة', textEn: 'Regretfully declined with warm blessings' },
      { id: 'act_5', type: 'invite', guestName: 'خالد الزهراني', time: '10:15', textAr: 'تم إرسال بطاقة الدعوة عبر واتساب', textEn: 'Invitation dispatched via WhatsApp' }
    ]
  },

  // Undo / Redo History stack for Builder
  history: [],
  historyIndex: -1,

  init() {
    this.loadFromStorage();
    this.saveSnapshot();
  },

  loadFromStorage() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.event && parsed.guests && parsed.activeBlocks) {
          this.state.event = {
            ...this.state.event,
            ...parsed.event,
            videoInvitation: {
              ...this.state.event.videoInvitation,
              ...(parsed.event.videoInvitation || {})
            }
          };
          this.state.guests = parsed.guests;
          this.state.activeBlocks = parsed.activeBlocks;
        }
      }
    } catch (e) {
      console.warn('Could not load from localStorage, using default state', e);
    }
  },

  saveToStorage() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
      // Dispatch custom event for UI updates
      if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
        window.dispatchEvent(new CustomEvent('quickrsvp:state_updated'));
      }
    } catch (e) {
      console.error('Could not save to localStorage', e);
    }
  },

  saveSnapshot() {
    // Keep max 20 history states
    const snapshot = JSON.stringify(this.state.activeBlocks);
    if (this.historyIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIndex + 1);
    }
    this.history.push(snapshot);
    if (this.history.length > 20) this.history.shift();
    this.historyIndex = this.history.length - 1;
  },

  undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.state.activeBlocks = JSON.parse(this.history[this.historyIndex]);
      this.saveToStorage();
      return true;
    }
    return false;
  },

  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      this.state.activeBlocks = JSON.parse(this.history[this.historyIndex]);
      this.saveToStorage();
      return true;
    }
    return false;
  },

  // Guest Management Methods
  getGuests() {
    return this.state.guests;
  },

  getGuestByToken(token) {
    return this.state.guests.find(g => g.token === token) || this.state.guests[0];
  },

  getGuestById(id) {
    return this.state.guests.find(g => g.id === id);
  },

  addGuest(guestData) {
    const token = (typeof crypto !== 'undefined' && crypto.getRandomValues)
      ? Array.from(crypto.getRandomValues(new Uint8Array(5))).map(b => b.toString(36).padStart(2, '0')).join('').substring(0, 8)
      : Math.random().toString(36).substring(2, 10);
    const newGuest = {
      id: 'gst_' + Date.now(),
      token: token,
      nameAr: guestData.nameAr || guestData.nameEn || 'ضيف جديد',
      nameEn: guestData.nameEn || guestData.nameAr || 'New Guest',
      phone: guestData.phone || '',
      groupAr: guestData.groupAr || 'عام',
      groupEn: guestData.groupEn || 'General',
      allowedSeats: parseInt(guestData.allowedSeats, 10) || 1,
      attendingCount: 0,
      rsvpStatus: 'not_sent',
      companions: [],
      mealChoice: null,
      dietaryNotes: '',
      tableNo: guestData.tableNo || 'Unassigned',
      inviteSent: false,
      inviteSentAt: null,
      reminderSent: false,
      checkedIn: false,
      checkedInAt: null,
      privateNotes: guestData.privateNotes || '',
      wishes: ''
    };
    this.state.guests.unshift(newGuest);
    this.saveToStorage();
    return newGuest;
  },

  updateGuest(id, updates) {
    const idx = this.state.guests.findIndex(g => g.id === id);
    if (idx !== -1) {
      this.state.guests[idx] = { ...this.state.guests[idx], ...updates };
      this.saveToStorage();
      return this.state.guests[idx];
    }
    return null;
  },

  deleteGuest(id) {
    this.state.guests = this.state.guests.filter(g => g.id !== id);
    this.saveToStorage();
  },

  // RSVP Submission by Guest
  submitRsvp(token, rsvpData) {
    const guest = this.getGuestByToken(token);
    if (!guest) return false;

    guest.rsvpStatus = rsvpData.status; // 'attending' or 'declined'
    guest.attendingCount = rsvpData.status === 'attending' ? (parseInt(rsvpData.attendingCount, 10) || 1) : 0;
    guest.companions = rsvpData.companions || [];
    guest.mealChoice = rsvpData.mealChoice || null;
    guest.dietaryNotes = rsvpData.dietaryNotes || '';
    guest.wishes = rsvpData.wishes || '';

    // Record activity
    const now = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    this.state.activity.unshift({
      id: 'act_' + Date.now(),
      type: rsvpData.status === 'attending' ? 'rsvp_yes' : 'rsvp_no',
      guestName: guest.nameAr || guest.nameEn,
      time: now,
      textAr: rsvpData.status === 'attending' ? `أكد الحضور (${guest.attendingCount} أفراد)` : 'اعتذر عن الحضور مع أطيب التمنيات',
      textEn: rsvpData.status === 'attending' ? `Confirmed attendance (${guest.attendingCount} guests)` : 'Declined with warm blessings'
    });

    this.saveToStorage();
    return true;
  },

  // Gate Check-In Verification
  checkInGuest(tokenOrId) {
    const guest = this.state.guests.find(g => g.token === tokenOrId || g.id === tokenOrId);
    if (!guest) {
      return { success: false, reason: 'not_found' };
    }

    if (guest.checkedIn) {
      return {
        success: false,
        reason: 'already_checked_in',
        guest: guest,
        checkedInAt: guest.checkedInAt
      };
    }

    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    guest.checkedIn = true;
    guest.checkedInAt = now;

    // Record activity
    this.state.activity.unshift({
      id: 'act_' + Date.now(),
      type: 'checkin',
      guestName: guest.nameAr || guest.nameEn,
      time: now,
      textAr: `تم تسجيل الدخول عند البوابة (${guest.attendingCount || guest.allowedSeats} مقاعد)`,
      textEn: `Checked in at the gate (${guest.attendingCount || guest.allowedSeats} seats)`
    });

    this.saveToStorage();
    return { success: true, guest: guest, checkedInAt: now };
  },

  overrideCheckIn(tokenOrId) {
    const guest = this.state.guests.find(g => g.token === tokenOrId || g.id === tokenOrId);
    if (guest) {
      guest.checkedIn = true;
      this.saveToStorage();
      return true;
    }
    return false;
  },

  // Stats Aggregation Helpers
  getStats() {
    const totalGuests = this.state.guests.reduce((acc, g) => acc + (g.allowedSeats || 1), 0);
    const confirmedGuests = this.state.guests
      .filter(g => g.rsvpStatus === 'attending')
      .reduce((acc, g) => acc + (g.attendingCount || g.allowedSeats || 1), 0);
    const declinedCount = this.state.guests.filter(g => g.rsvpStatus === 'declined').length;
    const awaitingCount = this.state.guests.filter(g => g.rsvpStatus === 'awaiting' || g.rsvpStatus === 'not_sent').length;
    const checkedInCount = this.state.guests
      .filter(g => g.checkedIn)
      .reduce((acc, g) => acc + (g.attendingCount || g.allowedSeats || 1), 0);

    const answeredCount = confirmedGuests + declinedCount;
    const rate = totalGuests > 0 ? Math.round((confirmedGuests / totalGuests) * 100) : 0;

    return {
      totalGuests,
      confirmedGuests,
      declinedCount,
      awaitingCount,
      checkedInCount,
      responseRate: rate
    };
  },

  // Reset to Factory Demo Data
  resetDemoData() {
    localStorage.removeItem(this.STORAGE_KEY);
    location.reload();
  }
};

if (typeof window !== 'undefined') {
  window.Store = Store;
  Store.init();
}
