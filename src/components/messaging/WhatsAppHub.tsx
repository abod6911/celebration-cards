import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MessageSquare, Send } from 'lucide-react';
import { cn } from '../../lib/utils';

export const WhatsAppHub: React.FC = () => {
  const { guests, event, showToast, updateGuest, t } = useApp();
  const [segment, setSegment] = useState<'not_sent' | 'awaiting' | 'attending' | 'all'>('not_sent');
  const [templateText, setTemplateText] = useState(
    'السلام عليكم ورحمة الله وبركاته {اسم_الضيف} 🤍\n\nيتشرف {اسم_العروسين} بدعوتكم الكريمة لحضور حفل الزفاف المبارك.\n\n📍 المكان: {موقع_القاعة}\n📅 الموعد: {تاريخ_الحفل}\n\n🔗 رابط بطاقتكم الرسمية وتأكيد الحضور:\n{رابط_الدعوة}\n\nحضوركم يشرفنا ويسعدنا!'
  );

  const targetGuests = guests.filter(g => {
    if (segment === 'not_sent') return !g.inviteSent;
    if (segment === 'awaiting') return g.rsvpStatus === 'awaiting';
    if (segment === 'attending') return g.rsvpStatus === 'attending';
    return true;
  });

  const sampleGuest = targetGuests[0] || guests[0] || { nameAr: 'هاشم النماري', phone: '+966505123456', token: 'k82f9x' };

  const renderedPreview = templateText
    .replace(/{اسم_الضيف}/g, sampleGuest.nameAr)
    .replace(/{اسم_العروسين}/g, event.titleAr)
    .replace(/{موقع_القاعة}/g, event.venueAr)
    .replace(/{تاريخ_الحفل}/g, event.dateFormattedAr)
    .replace(/{رابط_الدعوة}/g, 'https://quickrsvp.me/i/' + sampleGuest.token);

  const insertVariable = (varCode: string) => {
    setTemplateText(prev => prev + ' ' + varCode);
  };

  const handleSendSingle = (guest: typeof sampleGuest) => {
    const text = encodeURIComponent(
      templateText
        .replace(/{اسم_الضيف}/g, guest.nameAr)
        .replace(/{اسم_العروسين}/g, event.titleAr)
        .replace(/{موقع_القاعة}/g, event.venueAr)
        .replace(/{تاريخ_الحفل}/g, event.dateFormattedAr)
        .replace(/{رابط_الدعوة}/g, 'https://quickrsvp.me/i/' + guest.token)
    );
    window.open('https://wa.me/' + guest.phone.replace(/[^0-9]/g, '') + '?text=' + text, '_blank');
    updateGuest(guest.id, { inviteSent: true, inviteSentAt: new Date().toISOString() });
    showToast('تم فتح محادثة WhatsApp وتحديث الحالة ✓');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">{t('wa_title')}</h2>
        <p className="text-xs text-slate-500 mt-0.5">{t('wa_subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          <Card variant="white" className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="block font-bold text-slate-800 text-xs">الشريحة المستهدفة للإرسال:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'not_sent', label: 'لم تُرسل بعد', count: guests.filter(g => !g.inviteSent).length },
                  { id: 'awaiting', label: 'بانتظار الرد', count: guests.filter(g => g.rsvpStatus === 'awaiting').length },
                  { id: 'attending', label: 'المؤكد حضورهم', count: guests.filter(g => g.rsvpStatus === 'attending').length },
                  { id: 'all', label: 'كافة الضيوف', count: guests.length },
                ].map(seg => (
                  <button
                    key={seg.id}
                    type="button"
                    onClick={() => setSegment(seg.id as any)}
                    className={cn(
                      "p-3 rounded-2xl border text-center transition-all text-xs font-bold",
                      segment === seg.id 
                        ? "bg-emerald-950 text-gold-champagne border-gold-champagne/40 shadow-xs" 
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    )}
                  >
                    <div>{seg.label}</div>
                    <div className="text-[10px] opacity-80 mt-0.5 font-mono">{seg.count} ضيف</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="block font-bold text-slate-800 text-xs">المتغيرات الديناميكية (انقر للإدراج):</label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: 'اسم الضيف', code: '{اسم_الضيف}' },
                  { label: 'أسماء العروسين', code: '{اسم_العروسين}' },
                  { label: 'موقع القاعة', code: '{موقع_القاعة}' },
                  { label: 'تاريخ الحفل', code: '{تاريخ_الحفل}' },
                  { label: 'رابط الدعوة المخصص', code: '{رابط_الدعوة}' },
                ].map(v => (
                  <button
                    key={v.code}
                    type="button"
                    onClick={() => insertVariable(v.code)}
                    className="px-2.5 py-1 rounded-xl bg-gold-50 hover:bg-gold-100 text-gold-900 border border-gold-300 text-[11px] font-bold transition shadow-2xs"
                  >
                    + {v.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="block font-bold text-slate-800 text-xs">نص الرسالة:</label>
              <textarea
                rows={7}
                value={templateText}
                onChange={e => setTemplateText(e.target.value)}
                className="w-full p-4 rounded-2xl border bg-slate-50 text-slate-800 text-xs focus:bg-white focus:ring-2 focus:ring-emerald-800/20 outline-none leading-relaxed"
              />
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs font-bold">
                <span>قائمة الإرسال الفردي السريع ({targetGuests.length})</span>
              </div>

              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {targetGuests.map(g => (
                  <div key={g.id} className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{g.nameAr}</span>
                      <span className="text-[10px] text-slate-400 font-mono dir-ltr">{g.phone}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSendSingle(g)}
                      className="btn-gold-sweep px-3 py-1 rounded-xl bg-emerald-950 text-gold-champagne text-[11px] font-bold flex items-center gap-1 shadow-xs"
                    >
                      <Send className="w-3 h-3" />
                      <span>إرسال</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-[#EFEAE2] rounded-[36px] border-[8px] border-[#1C1A17] p-4 shadow-2xl space-y-4 min-h-[560px] flex flex-col justify-between">
            <div className="p-3 rounded-2xl bg-[#075E54] text-white flex items-center gap-3 shadow-xs">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                💍
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-xs truncate">{event.titleAr}</div>
                <div className="text-[10px] text-emerald-100">حساب أعمال موثّق • متصل الآن</div>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-end p-2">
              <div className="max-w-[90%] self-end bg-[#E7FFDB] text-slate-900 p-4 rounded-2xl rounded-br-xs shadow-xs border border-[#CDEAC0] space-y-2 text-xs leading-relaxed">
                <div className="whitespace-pre-wrap">{renderedPreview}</div>
                <div className="text-[9px] text-slate-400 text-end font-mono">10:45 م ✓✓</div>
              </div>
            </div>

            <div className="p-2 rounded-2xl bg-white border border-slate-200 text-slate-400 text-xs flex items-center justify-between px-3">
              <span>اكتب رسالة...</span>
              <span>🎙️</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
