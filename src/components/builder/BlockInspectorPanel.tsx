import React from 'react';
import { useApp } from '../../context/AppContext';
import { Palette, Layers, Film } from 'lucide-react';
import { cn } from '../../lib/utils';

export const BlockInspectorPanel: React.FC<{ selectedBlockId: string }> = ({ selectedBlockId }) => {
  const { event, updateEvent, blocks, updateBlock, lang, t } = useApp();
  const activeBlock = blocks.find(b => b.id === selectedBlockId);

  const themes = [
    { id: 'royal-arabic', nameAr: 'الملكي العربي', nameEn: 'Royal Arabic', colors: ['#0A2E23', '#D4AF37', '#FAF7F2'] },
    { id: 'modern-editorial', nameAr: 'المودرن التحريري', nameEn: 'Modern Editorial', colors: ['#111827', '#E5E7EB', '#FFFFFF'] },
    { id: 'romantic-garden', nameAr: 'الحديقة الرومانسية', nameEn: 'Romantic Garden', colors: ['#40534C', '#D69E9E', '#F7F6F2'] },
    { id: 'saudi-elegance', nameAr: 'الفخامة السعودية', nameEn: 'Saudi Elegance', colors: ['#482E1D', '#DFBA73', '#FAF5EF'] },
    { id: 'night-ceremony', nameAr: 'الليلة الساهرة', nameEn: 'Night Ceremony', colors: ['#0B0F19', '#F3CE72', '#131A2B'] },
  ];

  const openingStyles = [
    { id: 'hanging-card', labelAr: 'بطاقة معلّقة (التوقيع الملكي)', icon: '🎗️' },
    { id: 'video-hanging-card', labelAr: 'فيديو مخصص + بطاقة معلقة', icon: '🎬🎗️' },
    { id: 'video-card', labelAr: 'فيديو + بطاقة بختم الشمع', icon: '✨' },
    { id: 'video', labelAr: 'فيديو سينمائي مخصص', icon: '📹' },
    { id: 'card-reveal', labelAr: 'بطاقة تفاعلية (ختم الشمع)', icon: '✉️' },
    { id: 'none', labelAr: 'دخول مباشر بدون افتتاحية', icon: '⚡' },
  ];

  return (
    <div className="bg-white rounded-[32px] border border-gold-champagne/20 shadow-card-luxury p-5 flex flex-col h-[750px] overflow-y-auto space-y-6">
      <div className="space-y-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
          <Palette className="w-4 h-4 text-gold-700" />
          <span>طابع ونمط الدعوة (Theme)</span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {themes.map(th => (
            <div
              key={th.id}
              onClick={() => updateEvent({ activeTheme: th.id as any })}
              className={cn(
                "p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between",
                event.activeTheme === th.id 
                  ? "bg-emerald-50 border-emerald-700 ring-1 ring-emerald-600" 
                  : "bg-slate-50/60 border-slate-200 hover:bg-slate-100"
              )}
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {th.colors.map(c => (
                    <span key={c} style={{ backgroundColor: c }} className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-800">{lang === 'ar' ? th.nameAr : th.nameEn}</span>
              </div>
              {event.activeTheme === th.id && <span className="text-emerald-700 font-bold text-xs">✓</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
          <Film className="w-4 h-4 text-gold-700" />
          <span>{t('builder_opening_title')}</span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {openingStyles.map(st => (
            <div
              key={st.id}
              onClick={() => updateEvent({ openingStyle: st.id as any })}
              className={cn(
                "p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-xs font-bold",
                event.openingStyle === st.id
                  ? "bg-gold-50 border-gold-600 ring-1 ring-gold-500 text-gold-950"
                  : "bg-slate-50/60 border-slate-200 hover:bg-slate-100 text-slate-700"
              )}
            >
              <div className="flex items-center gap-2">
                <span>{st.icon}</span>
                <span>{st.labelAr}</span>
              </div>
              {event.openingStyle === st.id && <span className="text-gold-700 font-bold">✓</span>}
            </div>
          ))}
        </div>
      </div>

      {activeBlock && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <Layers className="w-4 h-4 text-emerald-700" />
            <span>تعديل محتوى: {activeBlock.type}</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">عنوان القسم:</label>
              <input
                type="text"
                value={activeBlock.data?.titleAr || ''}
                onChange={e => updateBlock(activeBlock.id, { data: { ...activeBlock.data, titleAr: e.target.value } })}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 text-slate-800 focus:bg-white outline-none"
              />
            </div>

            {activeBlock.type === 'hero' && (
              <div>
                <label className="block font-bold text-slate-700 mb-1">أسماء العروسين:</label>
                <input
                  type="text"
                  value={event.coupleNamesAr || ''}
                  onChange={e => updateEvent({ coupleNamesAr: e.target.value, titleAr: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl bg-slate-50 text-slate-800 focus:bg-white outline-none"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
