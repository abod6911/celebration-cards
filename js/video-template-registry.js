/**
 * QuickRSVP - Luxury Wedding Video Template Registry
 * Curated HD video presets matching each bespoke wedding theme,
 * with high-res poster frames, recommended aspect ratios, and default overlay timing.
 */

const VideoTemplateRegistry = {
  templates: {
    tpl_royal_emerald: {
      id: 'tpl_royal_emerald',
      nameAr: 'الزمرد الملكي المذهب (Royal Emerald)',
      nameEn: 'Royal Emerald & Gold Calligraphy',
      themeId: 'royal-arabic',
      aspectRatio: '9:16',
      duration: 12,
      posterUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-bride-with-a-bouquet-43152-large.mp4',
      ambientColor: 'rgba(6, 35, 25, 0.85)',
      descriptionAr: 'خلفية سينمائية فاخرة بالحرير الزمردي وجزيئات الذهب المضيئة مع لمسات الخط العربي',
      descriptionEn: 'Emerald silk with floating golden particles and royal calligraphy atmosphere',
      defaultOverlays: [
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

    tpl_editorial_minimal: {
      id: 'tpl_editorial_minimal',
      nameAr: 'المودرن التحريري (Modern Editorial)',
      nameEn: 'Editorial Minimalist Monogram',
      themeId: 'modern-editorial',
      aspectRatio: '9:16',
      duration: 10,
      posterUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-wedding-rings-on-a-table-43144-large.mp4',
      ambientColor: 'rgba(15, 23, 42, 0.85)',
      descriptionAr: 'طابع عصري راقٍ بخطوط تحريرية ناعمة وتباين أبيض وأسود مع سكون سينمائي',
      descriptionEn: 'High-fashion editorial aesthetic with bold serif typography and black & white contrast',
      defaultOverlays: [
        {
          id: 'ov_1',
          startTime: 1,
          endTime: 4,
          text: 'EXCLUSIVE INVITATION',
          variable: '',
          position: 'top-center',
          animation: 'fade',
          fontStyle: 'sans',
          color: '#C5A059'
        },
        {
          id: 'ov_2',
          startTime: 2,
          endTime: 6.5,
          text: '',
          variable: '{guest_name}',
          position: 'center',
          animation: 'mask-reveal',
          fontStyle: 'serif',
          color: '#FFFFFF',
          isHighlight: true
        },
        {
          id: 'ov_3',
          startTime: 6.5,
          endTime: 10,
          text: 'Celebrating the union of',
          variable: '{couple_names}',
          position: 'bottom-center',
          animation: 'soft-rise',
          fontStyle: 'sans',
          color: '#FAF7F2'
        }
      ]
    },

    tpl_romantic_garden: {
      id: 'tpl_romantic_garden',
      nameAr: 'الحديقة الرومانسية (Romantic Garden)',
      nameEn: 'Botanical Garden & Rose Gold',
      themeId: 'romantic-garden',
      aspectRatio: '9:16',
      duration: 11,
      posterUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-bride-wearing-a-wedding-dress-43147-large.mp4',
      ambientColor: 'rgba(40, 54, 44, 0.8)',
      descriptionAr: 'أجواء طبيعية حالمة ببتلات الورد وإضاءة الشمس الذهبية الناعمة',
      descriptionEn: 'Botanical dreamscape with natural sunlight, florals, and warm rose gold hues',
      defaultOverlays: [
        {
          id: 'ov_1',
          startTime: 1,
          endTime: 4.5,
          text: 'بكل الحب والسرور نتشرف بدعوة',
          variable: '',
          position: 'center',
          animation: 'fade',
          fontStyle: 'serif',
          color: '#F4F1EA'
        },
        {
          id: 'ov_2',
          startTime: 2.5,
          endTime: 7,
          text: '',
          variable: '{guest_name}',
          position: 'center',
          animation: 'soft-rise',
          fontStyle: 'serif',
          color: '#E8D099',
          isHighlight: true
        },
        {
          id: 'ov_3',
          startTime: 7,
          endTime: 11,
          text: 'في حفل زفاف',
          variable: '{couple_names}',
          position: 'center',
          animation: 'fade',
          fontStyle: 'serif',
          color: '#FFFFFF'
        }
      ]
    },

    tpl_saudi_elegance: {
      id: 'tpl_saudi_elegance',
      nameAr: 'الفخامة السعودية (Saudi Elegance)',
      nameEn: 'Saudi Heritage & Amber Atmosphere',
      themeId: 'saudi-elegance',
      aspectRatio: '9:16',
      duration: 12,
      posterUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-bride-with-a-bouquet-43152-large.mp4',
      ambientColor: 'rgba(30, 20, 10, 0.85)',
      descriptionAr: 'فخامة أصيلة بلمسات الضيافة السعودية والرمال الذهبية والإضاءة الدافئة',
      descriptionEn: 'Warm amber tones, luxury lanterns, and noble Saudi hospitality aesthetics',
      defaultOverlays: [
        {
          id: 'ov_1',
          startTime: 1,
          endTime: 4,
          text: 'أهلاً وسهلاً بك في ليلة العمر',
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
          text: 'حفل زفاف',
          variable: '{couple_names}',
          position: 'center',
          animation: 'fade',
          fontStyle: 'serif',
          color: '#FFFFFF'
        }
      ]
    },

    tpl_night_ceremony: {
      id: 'tpl_night_ceremony',
      nameAr: 'الليلة الساهرة (Night Ceremony)',
      nameEn: 'Starlight Midnight & Champagne Glow',
      themeId: 'night-ceremony',
      aspectRatio: '9:16',
      duration: 12,
      posterUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-wedding-rings-on-a-table-43144-large.mp4',
      ambientColor: 'rgba(5, 10, 25, 0.9)',
      descriptionAr: 'سماء ليلية ساحرة ونجوم متلألئة مع لمعان الشمبانيا الفاخر والشموع',
      descriptionEn: 'Midnight blue cinematic ambience with starlight bokeh and glowing champagne sparkles',
      defaultOverlays: [
        {
          id: 'ov_1',
          startTime: 1,
          endTime: 4,
          text: 'دعوة خاصة لحضور ليلة من ألف ليلة',
          variable: '',
          position: 'center',
          animation: 'fade',
          fontStyle: 'serif',
          color: '#E2E8F0'
        },
        {
          id: 'ov_2',
          startTime: 2.5,
          endTime: 7.5,
          text: '',
          variable: '{guest_name}',
          position: 'center',
          animation: 'scale',
          fontStyle: 'serif',
          color: '#F1C40F',
          isHighlight: true
        },
        {
          id: 'ov_3',
          startTime: 7.5,
          endTime: 12,
          text: 'زفاف',
          variable: '{couple_names}',
          position: 'center',
          animation: 'soft-rise',
          fontStyle: 'serif',
          color: '#FFFFFF'
        }
      ]
    }
  },

  getTemplate(id) {
    return this.templates[id] || this.templates.tpl_royal_emerald;
  },

  getAllTemplates() {
    return Object.values(this.templates);
  },

  getTemplateByTheme(themeId) {
    const list = Object.values(this.templates);
    return list.find(t => t.themeId === themeId) || this.templates.tpl_royal_emerald;
  }
};

if (typeof window !== 'undefined') {
  window.VideoTemplateRegistry = VideoTemplateRegistry;
}
