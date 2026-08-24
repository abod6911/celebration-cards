import React from 'react';
import { useApp } from '../../context/AppContext';
import { Smartphone, Tablet, Monitor } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PhoneMockupCanvasProps {
  viewport: 'mobile' | 'tablet' | 'desktop';
  setViewport: (vp: 'mobile' | 'tablet' | 'desktop') => void;
  selectedBlockId: string;
  onSelectBlock: (id: string) => void;
}

export const PhoneMockupCanvas: React.FC<PhoneMockupCanvasProps> = ({
  viewport,
  setViewport,
  selectedBlockId,
  onSelectBlock
}) => {
  const { event, blocks, guests, lang } = useApp();
  const sampleGuest = guests[0] || { nameAr: 'هاشم النماري', nameEn: 'Hashim Al-Nimari', token: 'k82f9x', allowedSeats: 2, tableNo: 'VIP 01' };

  return (
    <div className="bg-gradient-to-br from-[#F4EFE6] to-[#ECE5D8] rounded-[32px] border border-gold-champagne/30 p-4 sm:p-6 flex flex-col items-center justify-start min-h-[750px] relative overflow-hidden shadow-inner">
      <div className="mb-4 z-20 flex items-center gap-2 p-1 rounded-2xl bg-white/80 backdrop-blur-md border border-gold-champagne/30 shadow-sm">
        <button
          type="button"
          onClick={() => setViewport('mobile')}
          className={cn(
            "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition",
            viewport === 'mobile' ? "bg-emerald-950 text-gold-champagne shadow-xs" : "text-slate-600 hover:text-slate-900"
          )}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>جوال (390px)</span>
        </button>

        <button
          type="button"
          onClick={() => setViewport('tablet')}
          className={cn(
            "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition",
            viewport === 'tablet' ? "bg-emerald-950 text-gold-champagne shadow-xs" : "text-slate-600 hover:text-slate-900"
          )}
        >
          <Tablet className="w-3.5 h-3.5" />
          <span>لوحي (768px)</span>
        </button>

        <button
          type="button"
          onClick={() => setViewport('desktop')}
          className={cn(
            "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition",
            viewport === 'desktop' ? "bg-emerald-950 text-gold-champagne shadow-xs" : "text-slate-600 hover:text-slate-900"
          )}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>حاسوب</span>
        </button>
      </div>

      <div 
        className={cn(
          "transition-all duration-300 bg-[#FAF7F2] overflow-y-auto max-h-[660px] shadow-2xl relative",
          viewport === 'mobile' && "w-[380px] rounded-[48px] border-[10px] border-[#1C1A17] ring-2 ring-gold-400/40",
          viewport === 'tablet' && "w-[620px] rounded-[36px] border-[10px] border-[#1C1A17]",
          viewport === 'desktop' && "w-full max-w-[820px] rounded-2xl border border-slate-300"
        )}
      >
        {viewport === 'mobile' && (
          <div className="sticky top-2 inset-x-0 mx-auto w-24 h-5 rounded-full bg-black z-30 flex items-center justify-end px-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-white/20" />
          </div>
        )}

        <div className="p-4 space-y-4">
          {blocks.filter(b => b.enabled).map(blk => {
            const isSelected = selectedBlockId === blk.id;

            return (
              <div
                key={blk.id}
                onClick={() => onSelectBlock(blk.id)}
                className={cn(
                  "relative rounded-3xl transition-all duration-200 cursor-pointer",
                  isSelected && "ring-2 ring-emerald-800 ring-offset-2"
                )}
              >
                {blk.type === 'hero' && (
                  <div 
                    className="p-6 rounded-3xl text-center text-white space-y-4 shadow-md relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(180deg, rgba(6, 35, 25, 0.4) 0%, rgba(6, 35, 25, 0.9) 100%), url("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80") center/cover no-repeat'
                    }}
                  >
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 text-gold-200 text-[10px] font-bold border border-white/20">
                      <span>✨</span>
                      <span>دعوة زفاف خاصة</span>
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-white leading-tight">
                      {lang === 'ar' ? event.titleAr : event.titleEn}
                    </h2>
                    <div className="w-12 h-0.5 bg-gold-champagne mx-auto rounded-full" />
                    <p className="text-xs text-white/90 leading-relaxed">
                      {lang === 'ar' ? event.dateFormattedAr : event.dateFormattedEn}
                    </p>
                  </div>
                )}

                {blk.type === 'welcome' && (
                  <div className="p-5 rounded-3xl bg-white border border-gold-champagne/20 text-center space-y-2 shadow-xs">
                    <div className="text-[10px] font-bold text-gold-700 uppercase">دعوة كريمة مخصصة</div>
                    <div className="text-lg font-serif font-bold text-emerald-950">
                      أهلاً بك، <span className="underline decoration-gold-champagne">{sampleGuest.nameAr}</span> 🤍
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      يسعدنا ويشرفنا حضوركم لتكتمل فرحتنا بمشاركتكم أسعد لحظات العمر.
                    </p>
                  </div>
                )}

                {blk.type === 'blessing' && (
                  <div className="p-5 rounded-3xl bg-white/70 text-center space-y-2">
                    <div className="text-xs font-serif text-gold-700 font-bold">بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ</div>
                    <p className="text-xs font-serif text-emerald-950 leading-loose">
                      ❝ {event.blessingVerseAr} ❞
                    </p>
                    <div className="w-8 h-0.5 bg-gold-champagne mx-auto rounded-full opacity-60" />
                  </div>
                )}

                {blk.type === 'countdown' && (
                  <div className="p-4 rounded-3xl bg-gradient-to-br from-gold-50 to-white border border-gold-300/50 text-center space-y-3 shadow-xs">
                    <div className="text-xs font-bold text-emerald-950 font-serif">العد التنازلي لليلة العمر</div>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="p-2 rounded-xl bg-white border border-gold-champagne/30 text-center">
                        <div className="text-lg font-bold font-serif text-emerald-950">51</div>
                        <div className="text-[9px] text-slate-400 font-bold">يوم</div>
                      </div>
                      <div className="p-2 rounded-xl bg-white border border-gold-champagne/30 text-center">
                        <div className="text-lg font-bold font-serif text-emerald-950">16</div>
                        <div className="text-[9px] text-slate-400 font-bold">ساعة</div>
                      </div>
                      <div className="p-2 rounded-xl bg-white border border-gold-champagne/30 text-center">
                        <div className="text-lg font-bold font-serif text-emerald-950">42</div>
                        <div className="text-[9px] text-slate-400 font-bold">دقيقة</div>
                      </div>
                      <div className="p-2 rounded-xl bg-white border border-gold-champagne/30 text-center">
                        <div className="text-lg font-bold font-serif text-gold-700">20</div>
                        <div className="text-[9px] text-slate-400 font-bold">ثانية</div>
                      </div>
                    </div>
                  </div>
                )}

                {blk.type === 'venue' && (
                  <div className="p-4 rounded-3xl bg-white border border-slate-200 text-center space-y-3 shadow-xs">
                    <div className="h-32 rounded-2xl overflow-hidden relative">
                      <img src="https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Venue" />
                    </div>
                    <div className="text-xs font-bold text-slate-900">{event.venueAr}</div>
                    <p className="text-[10px] text-slate-500">{event.addressAr}</p>
                  </div>
                )}

                {blk.type === 'rsvp' && (
                  <div className="p-5 rounded-3xl bg-white border-2 border-gold-champagne/50 text-center space-y-3 shadow-md">
                    <div className="text-xs font-bold text-gold-700 font-serif">تأكيد الحضور (RSVP)</div>
                    <div className="text-sm font-bold text-emerald-950">هل يسعدنا حضوركم ومشاركتنا الفرحة؟</div>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="py-2.5 rounded-xl bg-emerald-950 text-white font-bold text-xs">
                        يشرفني الحضور 🤍
                      </div>
                      <div className="py-2.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs">
                        أعتذر بلطف 💌
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
