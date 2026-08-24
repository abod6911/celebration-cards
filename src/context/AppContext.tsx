import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, ViewType, Guest, Table, EventDetails, Block, ActivityItem } from '../types';
import { Language, translations } from '../lib/i18n';
import { soundFx } from '../lib/sound';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  view: ViewType;
  setView: (view: ViewType) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof translations['ar']) => string;
  
  event: EventDetails;
  updateEvent: (updates: Partial<EventDetails>) => void;
  
  guests: Guest[];
  addGuest: (guest: Omit<Guest, 'id' | 'token' | 'checkedIn' | 'checkedInAt'>) => void;
  updateGuest: (id: string, updates: Partial<Guest>) => void;
  deleteGuest: (id: string) => void;
  checkInGuest: (tokenOrId: string) => { success: boolean; reason?: string; guest?: Guest };
  
  tables: Table[];
  addTable: (table: Omit<Table, 'id'>) => void;
  updateTable: (id: string, updates: Partial<Table>) => void;
  deleteTable: (id: string) => void;
  assignGuestToTable: (guestId: string, tableNo: string) => void;
  
  blocks: Block[];
  updateBlock: (id: string, updates: Partial<Block>) => void;
  reorderBlocks: (fromIndex: number, toIndex: number) => void;
  toggleBlock: (id: string) => void;
  addBlock: (type: string) => void;
  removeBlock: (id: string) => void;
  
  activity: ActivityItem[];
  
  toast: string | null;
  showToast: (msg: string) => void;
  
  stats: {
    totalGuests: number;
    confirmedGuests: number;
    awaitingGuests: number;
    declinedGuests: number;
    checkedInGuests: number;
    responseRate: number;
  };
}

const initialEvent: EventDetails = {
  id: 'evt_maya_liam_2026',
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
  venueAr: 'قاعة القصر الكبير للمؤتمرات • جدة',
  venueEn: 'The Grand Palace Hall • Jeddah',
  addressAr: 'طريق الكورنيش، حي الشاطئ، جدة، المملكة العربية السعودية',
  addressEn: 'Corniche Road, Ash Shati, Jeddah, Saudi Arabia',
  googleMapsUrl: 'https://maps.google.com/?q=21.5833,39.1667',
  appleMapsUrl: 'http://maps.apple.com/?q=21.5833,39.1667',
  rsvpDeadline: '2026-09-30',
  activeTheme: 'royal-arabic',
  openingStyle: 'hanging-card',
  hangingCard: {
    animationIntensity: 'cinematic',
    ribbonStyle: 'royal-emerald',
    showGrommet: true,
  },
  videoInvitation: {
    sourceType: 'template',
    templateId: 'tpl_royal_emerald',
    customVideoUrl: '',
    posterUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-bride-with-a-bouquet-43152-large.mp4',
    duration: 12,
    aspectRatio: '9:16',
    mutedStart: true,
    skipEnabled: true,
    transition: 'video-to-card',
    overlays: [
      { id: 'ov_1', startTime: 1, endTime: 4.5, text: 'دعوة خاصة ومميزة إلى', variable: '', position: 'center', animation: 'fade', fontStyle: 'serif', color: '#EFE9DE' },
      { id: 'ov_2', startTime: 2.5, endTime: 7.5, text: '', variable: '{guest_name}', position: 'center', animation: 'soft-rise', fontStyle: 'serif', color: '#D4AF37', isHighlight: true },
      { id: 'ov_3', startTime: 7.5, endTime: 12, text: 'يتشرفان بدعوتكم لمشاركتهما فرحة العمر', variable: '{couple_names}', position: 'center', animation: 'fade', fontStyle: 'serif', color: '#FFFFFF' }
    ]
  },
  coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
  welcomePhoto: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
  blessingVerseAr: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
  blessingVerseEn: 'And of His signs is that He created for you mates that you may find tranquility in them, and He placed between you affection and mercy.',
  settings: {
    allowPlusOne: true,
    enableMeals: true,
    enableSongs: true,
    enableGallery: true,
    requireRsvpConfirmation: true,
    showCountdown: true,
    showDressCode: true,
    showTimeline: true,
    allowRsvpEdit: true,
  }
};

const initialGuests: Guest[] = [
  {
    id: 'gst_01',
    token: 'k82f9x',
    nameAr: 'هاشم النماري',
    nameEn: 'Hashim Al-Nimari',
    phone: '+966505123456',
    groupAr: 'عائلة النماري',
    groupEn: 'Al-Nimari Family',
    isFamily: true,
    allowedSeats: 2,
    attendingCount: 2,
    rsvpStatus: 'attending',
    familyMembers: ['هاشم النماري', 'سارة النماري'],
    companions: [{ name: 'سارة النماري', meal: 'salmon', allergies: 'None' }],
    mealChoice: 'beef',
    dietaryNotes: 'لا توجد حساسية غذائية',
    tableNo: 'VIP 01',
    inviteSent: true,
    inviteSentAt: '2026-08-10 14:30',
    reminderSent: true,
    checkedIn: true,
    checkedInAt: '07:42 م',
    checkedInBy: 'staff_gate_1',
    privateNotes: 'شقيق العروس - طاولة كبار الشخصيات',
    wishes: 'ألف مبروك لأجمل عروسين، بارك الله لكما وعليكما وجمع بينكما في خير 🤍',
    isVIP: true,
    opened: true,
    updatedAt: Date.now() - 3600000,
  },
  {
    id: 'gst_02',
    token: 'm49p2q',
    nameAr: 'د. طارق المنصور',
    nameEn: 'Dr. Tariq Al-Mansoor',
    phone: '+966554891234',
    groupAr: 'الأصدقاء وزملاء العمل',
    groupEn: 'Close Colleagues',
    isFamily: false,
    allowedSeats: 1,
    attendingCount: 1,
    rsvpStatus: 'attending',
    familyMembers: ['د. طارق المنصور'],
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
    wishes: 'Congratulations Maya & Liam! Wishing you lifetime happiness!',
    isVIP: false,
    opened: true,
    updatedAt: Date.now() - 7200000,
  },
  {
    id: 'gst_03',
    token: 'w71x5e',
    nameAr: 'المهندس ريان الغامدي',
    nameEn: 'Eng. Rayan Al-Ghamdi',
    phone: '+966567123987',
    groupAr: 'عائلة الغامدي',
    groupEn: 'Al-Ghamdi Family',
    isFamily: true,
    allowedSeats: 4,
    attendingCount: 4,
    rsvpStatus: 'attending',
    familyMembers: ['المهندس ريان الغامدي', 'نورة الغامدي', 'فيصل الغامدي', 'ريما الغامدي'],
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
    checkedInAt: '08:05 م',
    checkedInBy: 'staff_gate_2',
    privateNotes: 'عائلة كاملة (4 أفراد)',
    wishes: 'تهانينا القلبية للعروسين، دياركم عامرة بالأفراح والمسرات دائماً 🌹',
    isVIP: false,
    opened: true,
    updatedAt: Date.now() - 10800000,
  },
  {
    id: 'gst_04',
    token: 'z38b6k',
    nameAr: 'أستاذة منى الشريف',
    nameEn: 'Mona Al-Sharif',
    phone: '+966541298765',
    groupAr: 'صديقات العروس',
    groupEn: "Bride's Friends",
    isFamily: false,
    allowedSeats: 2,
    attendingCount: 0,
    rsvpStatus: 'declined',
    familyMembers: ['أستاذة منى الشريف'],
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
    wishes: 'ألف مبروك يا مايا الغالية، كنت أتمنى أكون حاضرة معكم، الله يوفقكم ويسعدكم يارب 🤍',
    isVIP: false,
    opened: true,
    updatedAt: Date.now() - 14400000,
  },
  {
    id: 'gst_05',
    token: 'p94c1v',
    nameAr: 'خالد بن سلطان الزهراني',
    nameEn: 'Khalid Al-Zahrani',
    phone: '+966503344556',
    groupAr: 'عائلة الزهراني',
    groupEn: 'Al-Zahrani Family',
    isFamily: true,
    allowedSeats: 2,
    attendingCount: 0,
    rsvpStatus: 'awaiting',
    familyMembers: ['خالد بن سلطان الزهراني', 'حرمه المصون'],
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
    wishes: '',
    isVIP: false,
    opened: false,
    updatedAt: Date.now() - 18000000,
  },
  {
    id: 'gst_06',
    token: 'h57y9d',
    nameAr: 'سعادة الأستاذ فهد السديري',
    nameEn: 'Fahad Al-Sudairi',
    phone: '+966509988776',
    groupAr: 'ضيوف الشرف',
    groupEn: 'Honored Guests',
    isFamily: true,
    allowedSeats: 2,
    attendingCount: 2,
    rsvpStatus: 'attending',
    familyMembers: ['سعادة الأستاذ فهد السديري', 'حرمه المصون'],
    companions: [{ name: 'حرمه المصون', meal: 'salmon', allergies: 'None' }],
    mealChoice: 'beef',
    dietaryNotes: '',
    tableNo: 'VIP 02',
    inviteSent: true,
    inviteSentAt: '2026-08-10 15:00',
    reminderSent: false,
    checkedIn: true,
    checkedInAt: '07:50 م',
    checkedInBy: 'staff_gate_1',
    privateNotes: 'طاولة كبار الشخصيات VIP',
    wishes: 'بارك الله لهما وبارك عليهما وجمع بينهما في خير، كل التوفيق للعروسين.',
    isVIP: true,
    opened: true,
    updatedAt: Date.now() - 21600000,
  },
  {
    id: 'gst_07',
    token: 't23u8f',
    nameAr: 'عمر القحطاني',
    nameEn: 'Omar Al-Qahtani',
    phone: '+966562233445',
    groupAr: 'أصدقاء الجامعة',
    groupEn: 'University Friends',
    isFamily: false,
    allowedSeats: 1,
    attendingCount: 0,
    rsvpStatus: 'not_sent',
    familyMembers: ['عمر القحطاني'],
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
    wishes: '',
    isVIP: false,
    opened: false,
    updatedAt: Date.now() - 25200000,
  }
];

const initialTables: Table[] = [
  { id: 'tbl_01', number: 'VIP 01', nameAr: 'طاولة كبار الشخصيات - عائلة العروس', nameEn: "VIP 01 - Bride's Family", capacity: 10, type: 'vip', shape: 'round' },
  { id: 'tbl_02', number: 'VIP 02', nameAr: 'طاولة كبار الشخصيات - عائلة العريس', nameEn: "VIP 02 - Groom's Family", capacity: 10, type: 'vip', shape: 'round' },
  { id: 'tbl_03', number: '04', nameAr: 'طاولة أصدقاء وزملاء العريس', nameEn: "04 - Groom's Friends", capacity: 8, type: 'friends', shape: 'round' },
  { id: 'tbl_04', number: '06', nameAr: 'طاولة عائلة الغامدي الكريمة', nameEn: '06 - Al-Ghamdi Family', capacity: 8, type: 'family', shape: 'banquet' },
  { id: 'tbl_05', number: '08', nameAr: 'طاولة عائلة الزهراني', nameEn: '08 - Al-Zahrani Family', capacity: 8, type: 'family', shape: 'round' },
  { id: 'tbl_06', number: '10', nameAr: 'طاولة أصدقاء الجامعة', nameEn: '10 - University Friends', capacity: 8, type: 'friends', shape: 'round' }
];

const initialBlocks: Block[] = [
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
    id: 'blk_rsvp',
    type: 'rsvp',
    enabled: true,
    data: {
      titleAr: 'تأكيد الحضور (RSVP)',
      titleEn: 'RSVP Confirmation',
      deadlineAr: 'يرجى تأكيد الحضور قبل 30 سبتمبر 2026',
      deadlineEn: 'Kindly respond by September 30, 2026'
    }
  }
];

const initialActivity: ActivityItem[] = [
  { id: 'act_1', type: 'checkin', guestName: 'هاشم النماري', time: '07:42 م', textAr: 'سجل الحضور عند البوابة (VIP 01)', textEn: 'Checked in at Gate (VIP 01)', tableNo: 'VIP 01' },
  { id: 'act_2', type: 'checkin', guestName: 'سعادة الأستاذ فهد السديري', time: '07:50 م', textAr: 'سجل الحضور عند البوابة (VIP 02)', textEn: 'Checked in at Gate (VIP 02)', tableNo: 'VIP 02' },
  { id: 'act_3', type: 'rsvp_yes', guestName: 'المهندس ريان الغامدي', time: '08:05 م', textAr: 'أكد الحضور مع عائلته (4 مقاعد)', textEn: 'Confirmed with family (4 seats)', tableNo: '06' },
  { id: 'act_4', type: 'rsvp_no', guestName: 'أستاذة منى الشريف', time: 'منذ ساعتين', textAr: 'اعتذرت عن الحضور مع أطيب التمنيات', textEn: 'Declined with warm blessings' }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('owner');
  const [view, setView] = useState<ViewType>('showcase');
  const [lang, setLangState] = useState<Language>('ar');
  const [event, setEvent] = useState<EventDetails>(initialEvent);
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [activity, setActivity] = useState<ActivityItem[]>(initialActivity);
  const [toast, setToast] = useState<string | null>(null);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    try { localStorage.setItem('quickrsvp_lang', newLang); } catch (e) {}
  };

  useEffect(() => {
    const saved = localStorage.getItem('quickrsvp_lang') as Language;
    if (saved) {
      setLang(saved);
    } else {
      setLang('ar');
    }
  }, []);

  const t = (key: keyof typeof translations['ar']): string => {
    return translations[lang]?.[key] || translations['ar'][key] || String(key);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const updateEvent = (updates: Partial<EventDetails>) => {
    setEvent(prev => ({ ...prev, ...updates }));
    showToast(lang === 'ar' ? 'تم حفظ التعديلات بنجاح ✓' : 'Saved changes successfully ✓');
  };

  const addGuest = (guestData: Omit<Guest, 'id' | 'token' | 'checkedIn' | 'checkedInAt'>) => {
    const token = Math.random().toString(36).substring(2, 9);
    const newGuest: Guest = {
      ...guestData,
      id: 'gst_' + Date.now(),
      token,
      checkedIn: false,
      checkedInAt: null,
      updatedAt: Date.now()
    };
    setGuests(prev => [newGuest, ...prev]);
    showToast(lang === 'ar' ? 'تمت إضافة الضيف بنجاح ✓' : 'Guest added successfully ✓');
  };

  const updateGuest = (id: string, updates: Partial<Guest>) => {
    setGuests(prev => prev.map(g => g.id === id ? { ...g, ...updates, updatedAt: Date.now() } : g));
  };

  const deleteGuest = (id: string) => {
    setGuests(prev => prev.filter(g => g.id !== id));
    showToast(lang === 'ar' ? 'تم حذف الضيف من السجل' : 'Guest removed from directory');
  };

  const checkInGuest = (tokenOrId: string) => {
    const cleanToken = tokenOrId.includes('/entry/') ? tokenOrId.split('/entry/')[1].split('?')[0] : tokenOrId.trim();
    const guest = guests.find(g => g.token === cleanToken || g.id === cleanToken);

    if (!guest) {
      soundFx.playWarning();
      return { success: false, reason: 'not_found' };
    }

    if (guest.checkedIn) {
      soundFx.playWarning();
      return { success: false, reason: 'already_checked_in', guest };
    }

    const time = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    updateGuest(guest.id, { checkedIn: true, checkedInAt: time });
    soundFx.playSuccess();

    setActivity(prev => [{
      id: 'act_' + Date.now(),
      type: 'checkin',
      guestName: guest.nameAr || guest.nameEn,
      time,
      textAr: `سجل الحضور عند البوابة (${guest.tableNo})`,
      textEn: `Checked in at Gate (${guest.tableNo})`,
      tableNo: guest.tableNo
    }, ...prev]);

    return { success: true, guest };
  };

  const addTable = (tableData: Omit<Table, 'id'>) => {
    const newTable: Table = {
      ...tableData,
      id: 'tbl_' + Date.now()
    };
    setTables(prev => [...prev, newTable]);
    showToast(lang === 'ar' ? 'تمت إضافة الطاولة بنجاح ✓' : 'Table created successfully ✓');
  };

  const updateTable = (id: string, updates: Partial<Table>) => {
    setTables(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTable = (id: string) => {
    const tbl = tables.find(t => t.id === id);
    if (tbl) {
      setGuests(prev => prev.map(g => g.tableNo === tbl.number ? { ...g, tableNo: 'Unassigned' } : g));
      setTables(prev => prev.filter(t => t.id !== id));
      showToast(lang === 'ar' ? 'تم حذف الطاولة' : 'Table deleted');
    }
  };

  const assignGuestToTable = (guestId: string, tableNo: string) => {
    updateGuest(guestId, { tableNo });
    showToast(lang === 'ar' ? `تم تعيين الضيف إلى ${tableNo}` : `Guest assigned to ${tableNo}`);
  };

  const updateBlock = (id: string, updates: Partial<Block>) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const reorderBlocks = (fromIndex: number, toIndex: number) => {
    setBlocks(prev => {
      const copy = [...prev];
      const [moved] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, moved);
      return copy;
    });
  };

  const toggleBlock = (id: string) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, enabled: !b.enabled } : b));
  };

  const addBlock = (type: string) => {
    const newBlock: Block = {
      id: 'blk_' + type + '_' + Date.now(),
      type,
      enabled: true,
      data: { titleAr: type, titleEn: type }
    };
    setBlocks(prev => [...prev, newBlock]);
    showToast(lang === 'ar' ? 'تمت إضافة القسم إلى الدعوة ✓' : 'Section added to invitation ✓');
  };

  const removeBlock = (id: string) => {
    setBlocks(prev => prev.filter(b => b.id !== id));
    showToast(lang === 'ar' ? 'تم حذف القسم' : 'Section removed');
  };

  // Stats calculation
  const totalGuests = guests.reduce((sum, g) => sum + (g.allowedSeats || 1), 0);
  const confirmedGuests = guests.filter(g => g.rsvpStatus === 'attending').reduce((sum, g) => sum + (g.attendingCount || g.allowedSeats || 1), 0);
  const awaitingGuests = guests.filter(g => g.rsvpStatus === 'awaiting' || g.rsvpStatus === 'not_sent').reduce((sum, g) => sum + (g.allowedSeats || 1), 0);
  const declinedGuests = guests.filter(g => g.rsvpStatus === 'declined').length;
  const checkedInGuests = guests.filter(g => g.checkedIn).reduce((sum, g) => sum + (g.attendingCount || g.allowedSeats || 1), 0);
  const responseRate = totalGuests > 0 ? Math.round((confirmedGuests / totalGuests) * 100) : 0;

  return (
    <AppContext.Provider value={{
      role, setRole,
      view, setView,
      lang, setLang, t,
      event, updateEvent,
      guests, addGuest, updateGuest, deleteGuest, checkInGuest,
      tables, addTable, updateTable, deleteTable, assignGuestToTable,
      blocks, updateBlock, reorderBlocks, toggleBlock, addBlock, removeBlock,
      activity,
      toast, showToast,
      stats: {
        totalGuests,
        confirmedGuests,
        awaitingGuests,
        declinedGuests,
        checkedInGuests,
        responseRate
      }
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
