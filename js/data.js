/**
 * MANDELINE / MEDELLIN (ميديلين) — Central Data & Localization Architecture
 * Complete Business Information, Floral Hero Scenes, Collections, Occasions, Real Customer Reviews & Bilingual Dictionaries
 */

window.MandelineData = {
  businessConfig: {
    brandAr: "ميديلين للورد",
    brandEn: "MEDELLIN Fine Floral Atelier",
    cityAr: "جدة، المملكة العربية السعودية",
    cityEn: "Jeddah, Saudi Arabia",
    currencyAr: "ر.س",
    currencyEn: "SAR",
    whatsappNumber: "966500000000",
    phone: "+966 50 000 0000",
    instagram: "medellin.flowers",
    tiktok: "medellin.flowers",
    googleMapsUrl: "https://maps.google.com/?q=Jeddah+Saudi+Arabia",
    storeHoursAr: "يومياً من 9:00 صباحاً حتى 11:00 مساءً",
    storeHoursEn: "Daily from 9:00 AM to 11:00 PM"
  },

  // 4 Cohesive Floral Hero Scenes for Synchronized Carousel
  heroSlides: [
    {
      id: "ivory",
      bgTone: "#090807",
      image: "assets/hero/mandeline-hero-01-ivory.webp",
      titleAr: "باقة لـامور إيتيرنيل",
      titleEn: "L'Amour Peonies & Garden Roses",
      subtitleAr: "ورود جاردن عاجية وبيوني وشامبين",
      subtitleEn: "Ivory Garden Roses, Peonies & Champagne"
    },
    {
      id: "blush",
      bgTone: "#120D10",
      image: "assets/hero/mandeline-hero-02-blush.webp",
      titleAr: "باقة بلومينغ داون الوردي",
      titleEn: "Blooming Dawn Dusty Blush Garden",
      subtitleAr: "بيوني وردي وورود داستي روز ناعمة",
      subtitleEn: "Dusty Blush Peonies & Muted Rose"
    },
    {
      id: "burgundy",
      bgTone: "#180E10",
      image: "assets/hero/mandeline-hero-03-burgundy.webp",
      titleAr: "باقة فيلفيت تويلايت البرغندية",
      titleEn: "Velvet Twilight Burgundy & Cappuccino",
      subtitleAr: "ورود برغندية مخملية وكابتشينو فاخرة",
      subtitleEn: "Velvet Burgundy & Cappuccino Roses"
    },
    {
      id: "orchid",
      bgTone: "#0F1113",
      image: "assets/hero/mandeline-hero-04-orchid.webp",
      titleAr: "سنتربيس رويال سولاس الملكية",
      titleEn: "Royal Solace White Orchids",
      subtitleAr: "أوركيد فالينوبسيس ملكي وتيوليب نقي",
      subtitleEn: "Royal Phalaenopsis Orchids & White Tulips"
    }
  ],

  occasions: [
    {
      id: "romance",
      titleAr: "ذكرى وحب",
      titleEn: "Anniversary & Romance",
      countAr: "12 باقة متوفرة",
      countEn: "12 Curated Bouquets",
      descAr: "تنسيقات رومانسية ساحرة من ورود الجاردن والبيوني لتوثيق أصدق المشاعر.",
      descEn: "Enchanting romantic arrangements of heirloom garden roses and peonies.",
      image: "assets/images/occasion-romance.jpg",
      defaultBudget: "650",
      recommendedPalette: "champagne_blush"
    },
    {
      id: "celebration",
      titleAr: "تهنئة وتخرج",
      titleEn: "Celebrations & Milestones",
      countAr: "8 باقات متوفرة",
      countEn: "8 Exclusive Designs",
      descAr: "باقات مبهجة تفيض فخامة وأناقة لتشارك أحبابك أجمل لحظات نجاحهم.",
      descEn: "Vibrant and lavish bouquets crafted to celebrate triumphs and milestones.",
      image: "assets/images/occasion-celebration.jpg",
      defaultBudget: "650",
      recommendedPalette: "champagne_blush"
    },
    {
      id: "gratitude",
      titleAr: "شكر وتقدير",
      titleEn: "Gratitude & Appreciation",
      countAr: "10 باقات متوفرة",
      countEn: "10 Refined Gestures",
      descAr: "هدية تعبر عن الامتنان بأرقى لغة نباتية وألوان هادئة تأسر القلوب.",
      descEn: "Refined floral gestures expressing profound gratitude in serene palettes.",
      image: "assets/images/occasion-gratitude.jpg",
      defaultBudget: "350",
      recommendedPalette: "white_gold"
    },
    {
      id: "bespoke",
      titleAr: "تنسيق ومناسبات خاصة",
      titleEn: "VIP Bespoke & Events",
      countAr: "تصاميم معمارية خاصة",
      countEn: "Architectural Installations",
      descAr: "تصاميم معمارية استثنائية للمجالس الفاخرة، وحفلات الاستقبال والزفاف في جدة.",
      descEn: "Sculptural architectural floral installations for luxury receptions in Jeddah.",
      image: "assets/images/occasion-bespoke.jpg",
      defaultBudget: "custom",
      recommendedPalette: "bespoke"
    }
  ],

  collections: [
    {
      id: "lamour",
      category: "bouquets",
      titleAr: "باقة لامور إيتيرنيل",
      titleEn: "L'Amour Éternel Grand Bouquet",
      subtitleAr: "ورود جاردن إنجليزية، بيوني فرنسي، وشريط حريري فاخر",
      subtitleEn: "English garden roses, French peonies & raw silk ribbon",
      priceAr: "650 ر.س",
      priceEn: "650 SAR",
      priceVal: 650,
      image: "assets/images/collection-roses.jpg",
      tagAr: "الأكثر طلباً",
      tagEn: "Bestseller",
      stemCountAr: "28 زهرة جاردن وبيوني نادر",
      stemCountEn: "28 Heirloom Garden Stems",
      originAr: "استيراد مباشر من كولومبيا وهولندا",
      originEn: "Direct Import: Colombia & Holland",
      fragranceAr: "عطر وردي كلاسيكي ناعم ومهدئ",
      fragranceEn: "Subtle Classic English Rose Fragrance",
      dimensionsAr: "ارتفاع 50 سم × عرض 40 سم",
      dimensionsEn: "Height 50cm × Width 40cm",
      detailsAr: "تنسيق يدوي آسر يجمع أجود ورود الجاردن المورقة والبيوني الوردي والرانوكولاس مع تغليف كريمي فاخر وشريط حرير عاجي متدفق.",
      detailsEn: "An iconic hand-tied bouquet featuring lush David Austin garden roses, blush peonies, and ranunculus wrapped in matte cream paper."
    },
    {
      id: "twilight",
      category: "vases",
      titleAr: "فازة توايلايت جدة",
      titleEn: "Jeddah Twilight Bronze Vase",
      subtitleAr: "كالا مخملية داكنة، ورود كابتشينو، وفازة سيراميك برونزية",
      subtitleEn: "Velvet black calla, cappuccino roses & artisan bronze vessel",
      priceAr: "850 ر.س",
      priceEn: "850 SAR",
      priceVal: 850,
      image: "assets/images/collection-burgundy.jpg",
      tagAr: "إصدار مسائي حصري",
      tagEn: "Evening Noir",
      stemCountAr: "22 زهرة كالا وكابتشينو فاخرة",
      stemCountEn: "22 Dark Calla & Cappuccino Stems",
      originAr: "مزارع هولندا وجبال الأنديز",
      originEn: "Netherlands & Andes Mountain Farms",
      fragranceAr: "نفحات عشبية مخملية عميقة ودافئة",
      fragranceEn: "Warm Velvet & Deep Earthy Notes",
      dimensionsAr: "ارتفاع 45 سم × عرض 35 سم",
      dimensionsEn: "Height 45cm × Width 35cm",
      detailsAr: "تحفة نحتية عميقة بدرجات البرغندي المخملي والكابتشينو داخل فازة سيراميكية أثرية تضفي لمسة فندقية فاخرة على أي ركن.",
      detailsEn: "A deep, sculptural floral statement in a handcrafted fluted bronze vessel, featuring dark burgundy calla and cappuccino blooms."
    },
    {
      id: "solace",
      category: "vases",
      titleAr: "سنتربيس رويال سولاس",
      titleEn: "Royal Solace Orchid Centerpiece",
      subtitleAr: "أوركيد فالينوبسيس أبيض، تيوليب فرنسي، وكريستال مضلع",
      subtitleEn: "Cascading Phalaenopsis orchids & French champagne tulips",
      priceAr: "1,200 ر.س",
      priceEn: "1,200 SAR",
      priceVal: 1200,
      image: "assets/images/collection-orchids.jpg",
      tagAr: "فخامة كلاسيكية",
      tagEn: "Signature Luxury",
      stemCountAr: "شلال 6 فروع أوركيد ملكي + 15 تيوليب",
      stemCountEn: "6 Royal Orchid Sprays + 15 Tulips",
      originAr: "مزارع تايلاند وهولندا الفاخرة",
      originEn: "Thailand & Royal Dutch Greenhouses",
      fragranceAr: "نقاء عطري زهري منعش وخفيف",
      fragranceEn: "Pristine Crisp Floral Scent",
      dimensionsAr: "ارتفاع 65 سم × عرض 50 سم",
      dimensionsEn: "Height 65cm × Width 50cm",
      detailsAr: "شلال من زهور الأوركيد البيضاء النقية مع الهيدرانجيا وتيوليب الشمبانيا في فازة زجاجية كريستالية مضلعة تشع نقاءً وبهاءً.",
      detailsEn: "A grand cascading arrangement of pristine white Phalaenopsis orchids and champagne tulips in an artisanal crystal urn."
    },
    {
      id: "installation",
      category: "events",
      titleAr: "تنسيقات معمارية كبرى للمناسبات",
      titleEn: "Bespoke Grand Floral Architecture",
      subtitleAr: "أقواس وشلالات زهرية ضخمة لحفلات الاستقبال والزفاف",
      subtitleEn: "Palatial floral clouds and sculptural arches for luxury events",
      priceAr: "حسب متطلبات المناسبة",
      priceEn: "Custom Quote",
      priceVal: null,
      image: "assets/images/collection-bespoke.jpg",
      tagAr: "خدمة VIP",
      tagEn: "VIP Concierge",
      stemCountAr: "أكثر من 500 زهرة طازجة يتم اختيارها خصيصاً",
      stemCountEn: "500+ Fresh Stems Custom Selected",
      originAr: "شحنات طازجة خاصة للمناسبة",
      originEn: "Dedicated Direct Harvest Airfreight",
      fragranceAr: "عبير حدائقي فواح يملأ المكان",
      fragranceEn: "Opulent Ambient Floral Atmosphere",
      dimensionsAr: "تنسيق مخصص حسب مساحة القاعة أو الفيلا",
      dimensionsEn: "Tailored to Venue & Villa Architecture",
      detailsAr: "فريق ميديلين الهندسي يصمم ديكورات زهرية غامرة تحول مساحات الأفراح والمؤتمرات الكبرى في جدة إلى واحة ملكية خيالية.",
      detailsEn: "Our floral architects conceptualize and construct bespoke floral installations, transforming luxury venues in Jeddah."
    }
  ],

  // Instagram UGC Moments Gallery (#MedellinMoments)
  ugcMoments: [
    {
      id: "ugc-1",
      handle: "@nora_alotaibi",
      locationAr: "جدة · حي الشاطئ",
      locationEn: "Jeddah · Al Shati",
      captionAr: "أجمل هدية وصلتني في ذكرى زواجنا.. تفاصيل التغليف تفوق الخيال 🤍✨",
      captionEn: "The most exquisite anniversary gift. The craftsmanship is pure poetry 🤍✨",
      image: "assets/images/occasion-romance.jpg",
      tagAr: "ذكرى زواج",
      tagEn: "Anniversary"
    },
    {
      id: "ugc-2",
      handle: "@dr_faisal_k",
      locationAr: "جدة · حي الروضة",
      locationEn: "Jeddah · Al Rawdah",
      captionAr: "شكراً بوتيك ميديلين على سرعة التوصيل والإتقان الفندقي لسنتربيس المجلس 🌿",
      captionEn: "Thank you Medellin for the 2-hour express delivery and hotel-grade elegance 🌿",
      image: "assets/images/collection-orchids.jpg",
      tagAr: "ضيافة خاصة",
      tagEn: "VIP Reception"
    },
    {
      id: "ugc-3",
      handle: "@lama.weddings",
      locationAr: "جدة · فندق بارك حياة",
      locationEn: "Jeddah · Park Hyatt",
      captionAr: "مدخل القاعة مع شلالات ورد ميديلين كان حديث كل الحضور بلا استثناء 🕊️",
      captionEn: "The grand floral arch transformed the ballroom into a dreamlike sanctuary 🕊️",
      image: "assets/images/collection-bespoke.jpg",
      tagAr: "حفل زفاف",
      tagEn: "Royal Wedding"
    },
    {
      id: "ugc-4",
      handle: "@sara_alghalib",
      locationAr: "جدة · برج الماسة",
      locationEn: "Jeddah · Diamond Tower",
      captionAr: "الورد نضر جداً ورائحته الطبيعية تملأ المكان.. احترافية نفتخر فيها بجدة!",
      captionEn: "Unbelievable freshness and natural fragrance. Proud to have this in Jeddah!",
      image: "assets/images/collection-roses.jpg",
      tagAr: "باقة إهداء",
      tagEn: "Gift Bouquet"
    }
  ],

  // Real Customer Reviews
  customerReviews: [
    {
      id: "review-01",
      quoteAr: "التنسيق كان قمة في الرقي، الورد وصل نضر جداً والتغليف والكرت أضاف لمسة فاخرة أذهلت الجميع في المناسبة.",
      quoteEn: "The arrangement was the epitome of elegance. The flowers arrived exceptionally fresh, and the bespoke wrapping stunned everyone.",
      customerName: "سارة آل غالب",
      cityAr: "جدة — حي الشاطئ",
      cityEn: "Jeddah — Al Shati",
      occasionAr: "هدية ذكرى زواج",
      occasionEn: "Anniversary Gift",
      source: "WhatsApp",
      rating: null,
      date: null
    },
    {
      id: "review-02",
      quoteAr: "تعامل المنسق وسرعة الاستجابة في الواتساب احترافية لأبعد حد. جهزوا لي فازة خاصة للتخرج ووصلت في أقل من ساعتين.",
      quoteEn: "The florist's responsiveness on WhatsApp was remarkably professional. They crafted a custom graduation vase and delivered in under two hours.",
      customerName: "د. طارق الحارثي",
      cityAr: "جدة — حي الروضة",
      cityEn: "Jeddah — Al Rawdah",
      occasionAr: "باقة تهنئة تخرج",
      occasionEn: "Graduation Celebration",
      source: "WhatsApp",
      rating: null,
      date: null
    },
    {
      id: "review-03",
      quoteAr: "ميديلين بالنسبة لي هو الخيار الأول في جدة لأي مناسبة عائلية أو رسمية. ذوقهم رفيع ويعرفون تماماً كيف يترجمون المشاعر بورد نادر.",
      quoteEn: "Medellin is my premier destination in Jeddah for family and corporate gifts. Their taste is exquisite in translating emotions into rare botanicals.",
      customerName: "نورة باخشوين",
      cityAr: "جدة — حي الأندلس",
      cityEn: "Jeddah — Al Andalus",
      occasionAr: "تنسيق مجلس خاص",
      occasionEn: "Private Reception",
      source: "Instagram",
      rating: null,
      date: null
    }
  ],

  translations: {
    ar: {
      langBtn: "English",
      nav: {
        home: "الرئيسية",
        occasions: "المناسبات",
        collections: "تشكيلاتنا",
        experience: "تجربة الإهداء",
        concierge: "صمم باقتك",
        reviews: "قالوا عنا",
        atelier: "عن ميديلين",
        contact: "تواصل معنا",
        orderNow: "احجز تنسيقك",
        wishlist: "المفضلة"
      },
      hero: {
        eyebrow: "ميديلين · أتيليه الزهور الفاخرة · جدة",
        words: ["زهور", "تبقى", "في", "الذاكرة"],
        supporting: "أخبرنا بالمناسبة والميزانية، ونحن نعتني بالباقي لنصنع من الورد لحظة إنسانية خالدة.",
        ctaExplore: "استكشف المجموعات",
        ctaWhatsapp: "تحدث مع المنسق الخاص",
        slideIndicator: "التنسيق"
      },
      trustBadges: [
        {
          icon: "truck",
          title: "توصيل فوري خلال ساعتين",
          desc: "سيارات مبردة مخصصة تغطي كافة أحياء جدة"
        },
        {
          icon: "flower-2",
          title: "استيراد يومي نضر",
          desc: "من نخبة مزارع هولندا والإكوادور وكينيا"
        },
        {
          icon: "gift",
          title: "تغليف إهداء فاخر",
          desc: "ورق مخملي مات مع شريط حريري وكرت قطني"
        },
        {
          icon: "shield-check",
          title: "ضمان الجودة والنضارة 100%",
          desc: "معاينة صور التنسيق عبر واتساب قبل التوصيل"
        }
      ],
      occasionsSec: {
        eyebrow: "اختر حسب النية والمناسبة",
        title: "ما هي مناسبتك القادمة؟",
        subtitle: "صممنا مجموعات متخصصة تناسب كل لحظة إنسانية لتجعل إهداءك مؤثراً وراسخاً في الذاكرة.",
        selectCta: "اختر هذه المناسبة"
      },
      collectionsSec: {
        eyebrow: "إبداعات الأتيليه",
        title: "تشكيلات ميديلين المختارة",
        subtitle: "زهور مستوردة نضرة يومياً من أرقى المزارع العالمية، تنسق بشغف ودقة فنية استثنائية.",
        filterAll: "الكل",
        filterBouquets: "باقات الإهداء",
        filterVases: "فازات وسنتربيس",
        filterEvents: "مناسبات خاصة",
        orderItem: "طلب هذا التنسيق",
        viewDetails: "تفاصيل الباقة ⤢"
      },
      stepsSec: {
        eyebrow: "سلاسة وفخامة",
        title: "هديتك.. بكل بساطة وأريحية",
        subtitle: "لا داعي للحيرة والبحث الطويل، إليك كيف نعتني بإهدائك من البداية حتى الاستلام:",
        step1Title: "1. حدد المناسبة والميزانية",
        step1Desc: "اختر نوع المناسبة وحدد الميزانية التي تناسبك دون أي تعقيد.",
        step2Title: "2. لمسات فنية مخصصة",
        step2Desc: "منسقو ميديلين يختارون أندر الزهور وينسقونها بتغليف إهداء فاخر مع كرت رسالتك.",
        step3Title: "3. توصيل فوري أنيق",
        step3Desc: "سيارات مبردة مخصصة تضمن وصول الزهور بنضارتها التامة في الموعد المحدد."
      },
      conciergeSec: {
        eyebrow: "المنسق الشخصي التفاعلي",
        title: "صمم باقتك المخصصة",
        subtitle: "3 خطوات بصرية سلسة لتحديد تفضيلاتك وسنقوم بتجهيز رسالة طلبك مباشرة مع فريق التنسيق في ميديلين.",
        step1Label: "1. المناسبة والهدف",
        step2Label: "2. الميزانية ولوحة الألوان",
        step3Label: "3. موعد التوصيل وكرت الإهداء",
        stepOccasion: "اختر مناسبة الإهداء:",
        stepBudget: "حدد الميزانية التقريبية:",
        stepPalette: "درجات الألوان المفضلة:",
        stepDelivery: "موعد التوصيل المطلوب:",
        stepDeliveryPlaceholder: "مثال: اليوم 8:00 مساءً / غداً بعد الظهر",
        stepNote: "نص كرت الإهداء الفاخر:",
        stepNotePlaceholder: "اكتب رسالتك هنا ليتم تضمينها في الكرت الملكي...",
        paletteRomantic: "شامبين ووردي ناعم (Champagne & Blush)",
        paletteVelvet: "برغندي مخملي وداكن (Velvet Burgundy)",
        paletteWhite: "أبيض ملكي وذهبي (Royal White & Gold)",
        paletteCustom: "على ذوق المنسق المحترف (Florist Choice)",
        budgetOption1: "350 ر.س (لمسة كلاسيكية أنيقة)",
        budgetOption2: "650 ر.س (باقة فاخرة متكاملة)",
        budgetOption3: "1,200 ر.س (فازة ملكية كبيرة)",
        budgetOption4: "تنسيق خاص / ميزانية مفتوحة",
        nextStepBtn: "المتابعة للخطوة التالية ←",
        prevStepBtn: "→ الرجوع للخطوة السابقة",
        submitBtn: "إرسال الطلب المخصص للمنسق عبر واتساب",
        cardPreviewTitle: "معاينة كرت الإهداء الملكي",
        cardPlaceholder: "سيتم كتابة رسالتكم هنا بخط عربي أنيق على ورق قطني فاخر...",
        guarantee: "✨ يتم الرد الفوري من المنسق مع إرسال صور الزهور المتاحة للتأكيد قبل التجهيز."
      },
      ugcSec: {
        eyebrow: "لحظات ميديلين في جدة",
        title: "وثّقوا أجمل اللحظات مع #MedellinMoments",
        subtitle: "مقتطفات من تجارب عملائنا وحفلات الاستقبال الفاخرة التي زيّناها في عروس البحر الأحمر."
      },
      reviewsSec: {
        eyebrow: "انطباعات وتجارب حقيقية",
        title: "قالوا عن ميديلين",
        subtitle: "آراء عملائنا هي أجمل جزء من كل هدية نجهزها.",
        ctaHeading: "خلّ هديتك القادمة من ميديلين",
        ctaSub: "تواصل معنا مباشرة عبر واتساب لنبدأ بتصميم باقتك فوراً",
        ctaBtn: "اطلب عبر واتساب",
        verified: "تجربة إهداء موثقة"
      },
      atelierSec: {
        eyebrow: "عالم ميديلين",
        title: "حرفة صياغة المشاعر في جدة",
        quote: "«الورد ليس مجرد نبات، بل هو الرسول الصامت الذي يقول ما تعجز عنه الكلمات.»",
        p1: "في ميديلين، ننظر إلى كل زهرة كعنصر فني فريد. نستورد ورودنا يومياً من هولندا والإكوادور وكينيا، ونعتني بترطيبها وتهذيبها لتمنحكم أطول فترة نضارة وعبق.",
        p2: "نحن نؤمن أن الهدية الفاخرة تكتمل بالتفاصيل: التغليف المخملي المات، الأشرطة الحريرية المتناغمة، وكرت الإهداء المصنوع من الورق القطني الفاخر.",
        stat1Num: "100%",
        stat1Label: "زهور طبيعية نضرة يومياً",
        stat2Num: "2h",
        stat2Label: "توصيل سريع داخل جدة",
        stat3Num: "4.9/5",
        stat3Label: "تقييم عملاء النخبة"
      },
      contactSec: {
        eyebrow: "تفضل بزيارتنا أو تواصل",
        title: "بوتيك ميديلين — جدة",
        subtitle: "يسعدنا استقبالكم في فرعنا أو خدمتكم عبر قنوات التواصل السريع.",
        locationTitle: "موقع الأتيليه",
        locationVal: "حي الروضة / طريق التحلية، جدة، المملكة العربية السعودية",
        hoursTitle: "ساعات العمل",
        hoursVal: "يومياً من 9:00 صباحاً حتى 11:00 مساءً",
        contactTitle: "خدمة العملاء والواتساب",
        contactVal: "متاح للمحادثة الفورية وتأكيد الطلبات",
        mapsBtn: "فتح الموقع في خرائط Google",
        whatsappBtn: "محادثة فورية مع المنسق"
      },
      quickView: {
        stemCount: "عدد الأغصان والزهور:",
        origin: "منشأ الاستيراد:",
        fragrance: "الطابع العطري:",
        dimensions: "الأبعاد التقريبية:",
        orderBtn: "طلب هذه الباقة عبر واتساب",
        closeBtn: "إغلاق"
      },
      newsletter: {
        title: "العضوية الخاصة ودعوات المعاينات الحصرية",
        sub: "انضم لنخبة عملاء ميديلين لتصلك إشعارات وصول أندر الزهور وتنسيقات المناسبات الخاصة.",
        placeholder: "أدخل بريدك الإلكتروني...",
        btn: "انضمام للعضوية",
        success: "شكراً لانضمامكم لنخبة ميديلين. سنتواصل معكم قريباً ✨"
      },
      footer: {
        about: "ميديلين — أتيليه الزهور الفاخرة في جدة. نصنع من كل مناسبة ذكرى استثنائية من خلال تنسيقات نباتية ملهمة وتجربة إهداء متكاملة.",
        quickLinks: "روابط سريعة",
        occasions: "المناسبات",
        collections: "التشكيلات",
        concierge: "صمم باقتك",
        reviews: "قالوا عنا",
        contact: "الموقع والتواصل",
        rights: "جميع الحقوق محفوظة © بوتيك ميديلين للزهور 2026."
      },
      floatingCta: "اطلب باقتك عبر واتساب"
    },

    en: {
      langBtn: "العربية",
      nav: {
        home: "Home",
        occasions: "Occasions",
        collections: "Collections",
        experience: "Gifting Experience",
        concierge: "Bespoke Configurator",
        reviews: "Reviews",
        atelier: "About Medellin",
        contact: "Contact",
        orderNow: "Book Atelier",
        wishlist: "Wishlist"
      },
      hero: {
        eyebrow: "MEDELLIN · FINE FLORAL ATELIER · JEDDAH",
        words: ["Flowers,", "Made", "to", "Be", "Remembered."],
        supporting: "Tell us the occasion and your budget. We craft the quintessential floral gift and deliver it with uncompromised grace across Jeddah.",
        ctaExplore: "Explore Collections",
        ctaWhatsapp: "Chat with Private Florist",
        slideIndicator: "Arrangement"
      },
      trustBadges: [
        {
          icon: "truck",
          title: "2-Hour Express Delivery",
          desc: "Climate-controlled delivery across all Jeddah districts"
        },
        {
          icon: "flower-2",
          title: "Fresh Daily Botanical Import",
          desc: "Heirloom blooms sourced daily from Holland & Ecuador"
        },
        {
          icon: "gift",
          title: "Bespoke Velvet Packaging",
          desc: "Matte imported paper, raw silk ribbons & cotton card"
        },
        {
          icon: "shield-check",
          title: "100% Quality & Freshness Guarantee",
          desc: "Live photo preview sent on WhatsApp prior to dispatch"
        }
      ],
      occasionsSec: {
        eyebrow: "Shop by Intent",
        title: "WHAT IS THE OCCASION?",
        subtitle: "We curated specialized collections designed to articulate your sentiment with emotional depth and aesthetic restraint.",
        selectCta: "Select This Occasion"
      },
      collectionsSec: {
        eyebrow: "Atelier Creations",
        title: "SIGNATURE FLORAL MASTERPIECES",
        subtitle: "Freshly imported heirloom blooms from world-renowned growers, arranged with sculptural precision.",
        filterAll: "All",
        filterBouquets: "Gift Bouquets",
        filterVases: "Vases & Centerpieces",
        filterEvents: "Bespoke Events",
        orderItem: "Order This Design",
        viewDetails: "View Details ⤢"
      },
      stepsSec: {
        eyebrow: "Seamless & Effortless",
        title: "YOUR GIFT, MADE EFFORTLESS",
        subtitle: "No confusion, no guesswork. Here is how Medellin handles your floral gesture with absolute care:",
        step1Title: "1. Select Occasion & Budget",
        step1Desc: "Pick your reason to celebrate and set your budget tier in seconds.",
        step2Title: "2. Master Florist Touch",
        step2Desc: "Our artisans hand-select pristine stems, wrapping them in matte luxury paper with silk ribbons.",
        step3Title: "3. Express Chilled Delivery",
        step3Desc: "Delivered in climate-controlled vehicles ensuring peak bloom freshness across Jeddah."
      },
      conciergeSec: {
        eyebrow: "Interactive Bespoke Configurator",
        title: "CUSTOM ARRANGEMENT BUILDER",
        subtitle: "3 intuitive steps to configure your tailored arrangement with instant WhatsApp direct sync.",
        step1Label: "1. Occasion & Intent",
        step2Label: "2. Budget & Palette",
        step3Label: "3. Delivery & Calligraphy Card",
        stepOccasion: "Select the Occasion:",
        stepBudget: "Select Approximate Budget:",
        stepPalette: "Preferred Color Palette:",
        stepDelivery: "Desired Delivery Date/Time:",
        stepDeliveryPlaceholder: "e.g., Tonight 8:00 PM / Tomorrow Afternoon",
        stepNote: "Luxury Gift Card Message:",
        stepNotePlaceholder: "Type your heartfelt message for the cotton stationery...",
        paletteRomantic: "Champagne & Soft Blush",
        paletteVelvet: "Velvet Burgundy & Noir",
        paletteWhite: "Royal White & Gold Accents",
        paletteCustom: "Florist's Creative Choice",
        budgetOption1: "350 SAR (Classic Refined Gesture)",
        budgetOption2: "650 SAR (Grand Statement Bouquet)",
        budgetOption3: "1,200 SAR (Royal Crystal Urn)",
        budgetOption4: "Custom VIP / Open Budget",
        nextStepBtn: "Continue to Next Step ←",
        prevStepBtn: "→ Back to Previous Step",
        submitBtn: "Send Tailored Request to Concierge on WhatsApp",
        cardPreviewTitle: "Royal Letterpress Card Preview",
        cardPlaceholder: "Your words will appear here in bespoke typography on cotton paper...",
        guarantee: "✨ Our florist will reply immediately with live photos of today's blooms for your final approval."
      },
      ugcSec: {
        eyebrow: "Medellin Moments in Jeddah",
        title: "CURATED MOMENTS WITH #MedellinMoments",
        subtitle: "A visual journal of real celebrations, private receptions, and luxury moments across the Bride of the Red Sea."
      },
      reviewsSec: {
        eyebrow: "Client Impressions",
        title: "WORDS FROM OUR CUSTOMERS",
        subtitle: "The moments our customers share are part of every arrangement we create.",
        ctaHeading: "Let Your Next Gift Be From Medellin",
        ctaSub: "Connect with our floral concierge directly on WhatsApp to craft your bespoke piece.",
        ctaBtn: "Order via WhatsApp",
        verified: "Verified Gifting Moment"
      },
      atelierSec: {
        eyebrow: "The World of Medellin",
        title: "THE ART OF FLORAL POETRY IN JEDDAH",
        quote: "“Flowers are the silent ambassadors of the heart, speaking when words falter.”",
        p1: "At Medellin, we treat every stem as an individual sculpture. Sourced daily from premier farms across the globe, each flower is delicately conditioned to ensure lasting vibrance and natural scent.",
        p2: "We believe luxury lies in refined restraint: matte imported wrapping, tonal silk ribbons, and heavyweight cotton letterpress stationery.",
        stat1Num: "100%",
        stat1Label: "Fresh Daily Botanical Import",
        stat2Num: "2h",
        stat2Label: "Express Delivery in Jeddah",
        stat3Num: "4.9/5",
        stat3Label: "Discerning Client Rating"
      },
      contactSec: {
        eyebrow: "Visit Our Atelier",
        title: "MEDELLIN BOUTIQUE — JEDDAH",
        subtitle: "We welcome you to visit our physical atelier or connect with our concierge digitally.",
        locationTitle: "Atelier Address",
        locationVal: "Al Rawdah / Tahlia Street, Jeddah, Saudi Arabia",
        hoursTitle: "Opening Hours",
        hoursVal: "Daily from 9:00 AM to 11:00 PM",
        contactTitle: "Concierge & WhatsApp",
        contactVal: "Instant assistance and direct bespoke order confirmation",
        mapsBtn: "Open in Google Maps",
        whatsappBtn: "Chat with Concierge"
      },
      quickView: {
        stemCount: "Stem & Bloom Count:",
        origin: "Botanical Origin:",
        fragrance: "Scent Profile:",
        dimensions: "Approx. Dimensions:",
        orderBtn: "Order via WhatsApp",
        closeBtn: "Close"
      },
      newsletter: {
        title: "VIP Private Previews & Membership",
        sub: "Join the discerning circle of Medellin patrons for first access to rare seasonal blooms and holiday releases.",
        placeholder: "Enter your email address...",
        btn: "Join VIP Circle",
        success: "Thank you for joining Medellin VIP. We look forward to connecting with you ✨"
      },
      footer: {
        about: "Medellin — Fine floral boutique in Jeddah. Elevating gifting into an unforgettable emotional experience through intentional botanical design.",
        quickLinks: "Quick Links",
        occasions: "Occasions",
        collections: "Collections",
        concierge: "Bespoke Configurator",
        reviews: "Customer Words",
        contact: "Location & Contact",
        rights: "All rights reserved © Medellin Floral Boutique 2026."
      },
      floatingCta: "Order via WhatsApp"
    }
  }
};
