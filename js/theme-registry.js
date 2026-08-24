/**
 * QuickRSVP - 5 Bespoke Wedding Theme Registry
 * Manages semantic tokens, fonts, palettes, and miniature visual preview cards for the builder
 */

const ThemeRegistry = {
  themes: {
    'royal-arabic': {
      id: 'royal-arabic',
      nameAr: 'الملكي العربي',
      nameEn: 'Royal Arabic',
      taglineAr: 'فخامة سعودية أصيلة • زمردي داكن وذهب دافئ',
      taglineEn: 'Saudi Royal Luxury • Emerald & Warm Gold',
      palette: ['#0A2E23', '#D4AF37', '#FAF7F2', '#FFFDF9'],
      headingFont: "'Amiri', 'Cairo', serif",
      bodyFont: "'Tajawal', 'Plus Jakarta Sans', sans-serif",
      bgClass: 'bg-[#FAF7F2]',
      borderClass: 'border-[#D4AF37]/40',
      badgeBg: '#0A2E23',
      badgeText: '#D4AF37'
    },

    'modern-editorial': {
      id: 'modern-editorial',
      nameAr: 'المودرن التحريري',
      nameEn: 'Modern Editorial',
      taglineAr: 'طابع مجلات الموضة • أبيض وأسود ومساحات شاسعة',
      taglineEn: 'High Fashion Editorial • Stark Monochrome',
      palette: ['#111827', '#6B7280', '#F9F9FB', '#FFFFFF'],
      headingFont: "'Playfair Display', 'IBM Plex Sans Arabic', serif",
      bodyFont: "'IBM Plex Sans Arabic', 'Plus Jakarta Sans', sans-serif",
      bgClass: 'bg-[#F9F9FB]',
      borderClass: 'border-slate-300',
      badgeBg: '#111827',
      badgeText: '#FFFFFF'
    },

    'romantic-garden': {
      id: 'romantic-garden',
      nameAr: 'الحديقة الرومانسية',
      nameEn: 'Romantic Garden',
      taglineAr: 'أخضر ميرمية هادئ ووردي ترابي مع لمسات طبيعية حالمة',
      taglineEn: 'Sage & Dusty Rose • Botanical Ethereal Glow',
      palette: ['#40534C', '#D69E9E', '#F7F6F2', '#FFFFFF'],
      headingFont: "'Playfair Display', 'Cairo', serif",
      bodyFont: "'Tajawal', 'Plus Jakarta Sans', sans-serif",
      bgClass: 'bg-[#F7F6F2]',
      borderClass: 'border-[#D69E9E]/40',
      badgeBg: '#40534C',
      badgeText: '#F7E7E7'
    },

    'saudi-elegance': {
      id: 'saudi-elegance',
      nameAr: 'الفخامة السعودية',
      nameEn: 'Saudi Elegance',
      taglineAr: 'أصالة نجد والحجاز • برونز كراميل دافئ وذهب رمال الصحراء',
      taglineEn: 'Regional Heritage • Desert Gold & Camel Bronze',
      palette: ['#482E1D', '#DFBA73', '#FAF5EF', '#FFFDFB'],
      headingFont: "'Amiri', 'Cairo', serif",
      bodyFont: "'Tajawal', 'Plus Jakarta Sans', sans-serif",
      bgClass: 'bg-[#FAF5EF]',
      borderClass: 'border-[#DFBA73]/50',
      badgeBg: '#482E1D',
      badgeText: '#DFBA73'
    },

    'night-ceremony': {
      id: 'night-ceremony',
      nameAr: 'الليلة الساهرة',
      nameEn: 'Night Ceremony',
      taglineAr: 'سماء ليلية كحلية ساحرة مع لمعان ذهبي سينمائي متلألئ',
      taglineEn: 'Midnight Starlight • Celestial Gold & Dark Glass',
      palette: ['#0B0F19', '#F3CE72', '#131A2B', '#FFFFFF'],
      headingFont: "'Playfair Display', 'Cairo', serif",
      bodyFont: "'Plus Jakarta Sans', 'Tajawal', sans-serif",
      bgClass: 'bg-[#0B0F19]',
      borderClass: 'border-[#F3CE72]/30',
      badgeBg: '#F3CE72',
      badgeText: '#0B0F19'
    }
  },

  getTheme(id) {
    return this.themes[id] || this.themes['royal-arabic'];
  },

  getAllThemes() {
    return Object.values(this.themes);
  },

  applyThemeToElement(el, themeId) {
    const theme = this.getTheme(themeId);
    if (!el || !theme) return;
    el.setAttribute('data-theme', theme.id);
  },

  // Generates a rich miniature visual invitation mockup preview card for the theme picker in builder
  renderThemePreviewCard(theme, isSelected, lang) {
    const name = lang === 'ar' ? theme.nameAr : theme.nameEn;
    const tagline = lang === 'ar' ? theme.taglineAr : theme.taglineEn;
    const isDark = theme.id === 'night-ceremony' || theme.id === 'modern-editorial';

    return `
      <div onclick="Builder.selectTheme('${theme.id}')" class="group relative cursor-pointer rounded-2xl border-2 transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md ${isSelected ? 'border-[var(--brand)] ring-2 ring-[var(--brand)]/30 scale-[1.02]' : 'border-slate-200 hover:border-slate-300'}">
        
        <!-- Miniature Mockup Header -->
        <div class="p-3.5 ${theme.bgClass} space-y-2 border-b border-slate-100">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full" style="background-color: ${theme.badgeBg}; color: ${theme.badgeText}; font-family: ${theme.headingFont};">
              ${name}
            </span>
            <div class="flex gap-1">
              ${theme.palette.map(c => `<span class="w-3 h-3 rounded-full border border-black/10 shadow-xs" style="background-color: ${c};"></span>`).join('')}
            </div>
          </div>

          <!-- Mini Typographic Hero Snippet -->
          <div class="text-center py-2 space-y-0.5">
            <div class="text-xs font-bold leading-tight" style="font-family: ${theme.headingFont}; color: ${theme.palette[0]};">
              ${lang === 'ar' ? 'مايا & ليام' : 'Maya & Liam'}
            </div>
            <div class="text-[9px] font-medium opacity-75" style="color: ${theme.palette[0]}; font-family: ${theme.bodyFont};">
              ${lang === 'ar' ? '14 أكتوبر 2026 • جدة' : 'Oct 14, 2026 • Jeddah'}
            </div>
          </div>

          <!-- Mini Button Snippet -->
          <div class="w-24 mx-auto py-1 rounded-md text-[9px] font-bold text-center shadow-xs" style="background-color: ${theme.badgeBg}; color: ${theme.badgeText};">
            ${lang === 'ar' ? 'تأكيد الحضور' : 'RSVP'}
          </div>
        </div>

        <!-- Card Footer -->
        <div class="p-2.5 bg-white text-right flex items-center justify-between">
          <div class="text-[10px] text-slate-500 font-medium truncate max-w-[200px]">${tagline}</div>
          ${isSelected ? '<span class="text-xs font-bold text-emerald-600">✓</span>' : ''}
        </div>

      </div>
    `;
  }
};

if (typeof window !== 'undefined') {
  window.ThemeRegistry = ThemeRegistry;
}
