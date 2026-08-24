import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Heart, 
  Clock, 
  Calendar, 
  MapPin, 
  Shirt, 
  Utensils, 
  Image, 
  QrCode,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Trash2,
  Plus
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const BlockLibraryPanel: React.FC<{ selectedBlockId: string; onSelectBlock: (id: string) => void }> = ({
  selectedBlockId,
  onSelectBlock
}) => {
  const { blocks, reorderBlocks, toggleBlock, addBlock, removeBlock, lang, t } = useApp();

  const blockIcons: Record<string, React.ReactNode> = {
    hero: <Sparkles className="w-4 h-4 text-gold-700" />,
    welcome: <Heart className="w-4 h-4 text-emerald-700" />,
    blessing: <Sparkles className="w-4 h-4 text-gold-600" />,
    countdown: <Clock className="w-4 h-4 text-amber-600" />,
    timeline: <Calendar className="w-4 h-4 text-emerald-800" />,
    venue: <MapPin className="w-4 h-4 text-rose-600" />,
    dresscode: <Shirt className="w-4 h-4 text-gold-800" />,
    catering: <Utensils className="w-4 h-4 text-amber-700" />,
    gallery: <Image className="w-4 h-4 text-sky-600" />,
    rsvp: <Heart className="w-4 h-4 text-emerald-600" />,
    qr_pass: <QrCode className="w-4 h-4 text-gold-700" />,
  };

  const blockNames: Record<string, { ar: string; en: string }> = {
    hero: { ar: 'واجهة الدعوة الرئيسية', en: 'Hero Banner' },
    welcome: { ar: 'الترحيب بالضيف الكريم', en: 'Personalized Greeting' },
    blessing: { ar: 'الآية الكريمة ودعاء الزواج', en: 'Blessing Verse' },
    countdown: { ar: 'العد التنازلي للحفل', en: 'Live Countdown' },
    timeline: { ar: 'جدول وفقرات الأمسية', en: 'Event Itinerary' },
    venue: { ar: 'موقع القاعة والخرائط', en: 'Venue & Maps' },
    dresscode: { ar: 'قواعد وألوان الزي', en: 'Dress Code' },
    catering: { ar: 'قائمة الطعام والضيافة', en: 'Dining Menu' },
    gallery: { ar: 'معرض الصور التذكارية', en: 'Photo Gallery' },
    rsvp: { ar: 'نموذج تأكيد الحضور (RSVP)', en: 'RSVP Form' },
    qr_pass: { ar: 'بطاقة الدخول الرسمية (VIP)', en: 'VIP Gate Pass' },
  };

  const availableToAdd = ['dresscode', 'catering', 'gallery'];

  return (
    <div className="bg-white rounded-[32px] border border-gold-champagne/20 shadow-card-luxury p-5 flex flex-col h-[750px]">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
        <div>
          <h3 className="text-xs font-bold text-slate-900">{t('builder_tab_content')}</h3>
          <p className="text-[10px] text-slate-400">ترتيب وتفعيل أقسام الدعوة</p>
        </div>
        
        <div className="flex items-center gap-1">
          {availableToAdd.map(type => {
            const isAdded = blocks.some(b => b.type === type);
            if (isAdded) return null;
            return (
              <button
                key={type}
                type="button"
                onClick={() => addBlock(type)}
                className="px-2.5 py-1 rounded-xl bg-gold-50 hover:bg-gold-100 text-gold-900 border border-gold-300/60 text-[10px] font-bold flex items-center gap-1 transition shadow-2xs"
              >
                <Plus className="w-3 h-3" />
                <span>{blockNames[type]?.[lang] || type}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {blocks.map((blk, idx) => {
          const isSelected = selectedBlockId === blk.id;
          const name = blockNames[blk.type]?.[lang] || blk.type;
          const icon = blockIcons[blk.type] || <Sparkles className="w-4 h-4" />;

          return (
            <div
              key={blk.id}
              onClick={() => onSelectBlock(blk.id)}
              className={cn(
                "p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-2 group shadow-2xs",
                isSelected
                  ? "bg-emerald-50/80 border-emerald-700 ring-1 ring-emerald-600"
                  : "bg-white border-slate-200/80 hover:border-gold-400/60 hover:bg-gold-50/30"
              )}
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <span className="text-slate-400 group-hover:text-slate-600 text-xs select-none">⋮⋮</span>
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                  {icon}
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-slate-800 truncate">{name}</div>
                  <div className={cn("text-[10px] font-medium", blk.enabled ? "text-emerald-700" : "text-slate-400")}>
                    {blk.enabled ? '● مفعّل' : '○ مخفي'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => reorderBlocks(idx, idx - 1)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 disabled:opacity-20"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={idx === blocks.length - 1}
                  onClick={() => reorderBlocks(idx, idx + 1)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 disabled:opacity-20"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => toggleBlock(blk.id)}
                  className={cn("p-1 rounded-lg hover:bg-slate-100", blk.enabled ? "text-slate-600" : "text-slate-400")}
                >
                  {blk.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
                {blk.type !== 'hero' && blk.type !== 'rsvp' && (
                  <button
                    type="button"
                    onClick={() => removeBlock(blk.id)}
                    className="p-1 rounded-lg hover:bg-rose-50 text-rose-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
