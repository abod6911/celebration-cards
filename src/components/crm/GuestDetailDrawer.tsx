import React from 'react';
import { useApp } from '../../context/AppContext';
import { Guest } from '../../types';
import { X, Eye, MessageSquare, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface GuestDetailDrawerProps {
  guest: Guest | null;
  onClose: () => void;
}

export const GuestDetailDrawer: React.FC<GuestDetailDrawerProps> = ({ guest, onClose }) => {
  const { deleteGuest, showToast, tables, updateGuest } = useApp();

  if (!guest) return null;

  const handleSendWa = () => {
    const text = encodeURIComponent(`السلام عليكم ورحمة الله وبركاته ${guest.nameAr} 🤍\nيسعدنا دعوتكم لحفل زفاف مايا & ليام.\nرابط الدعوة وتأكيد الحضور:\nhttps://quickrsvp.me/i/${guest.token}`);
    window.open(`https://wa.me/${guest.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
    updateGuest(guest.id, { inviteSent: true, inviteSentAt: new Date().toISOString() });
    showToast('تم فتح محادثة WhatsApp وتحديث حالة الإرسال ✓');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-xs" onClick={onClose} />
      
      <div className="absolute inset-y-0 end-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-s border-gold-champagne/30">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-slate-900">الملف التفصيلي للضيف</h3>
            <button type="button" onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-700">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
            <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-950 to-emerald-850 text-white border border-gold-champagne/30 space-y-3 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gold-champagne text-emerald-950 font-serif font-bold text-xl flex items-center justify-center shrink-0">
                  {guest.nameAr.charAt(0)}
                </div>
                <div>
                  <h4 className="text-base font-bold font-serif">{guest.nameAr}</h4>
                  <p className="text-xs text-emerald-200">{guest.groupAr} • {guest.allowedSeats} مقاعد</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between text-[11px] font-mono">
                <span>TOKEN: {guest.token}</span>
                <span className="text-gold-200 font-bold">{guest.tableNo}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a
                href="quickrsvp_invitation_mobile_fast.html"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-center transition flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>معاينة الدعوة</span>
              </a>

              <Button
                variant="gold"
                size="sm"
                onClick={handleSendWa}
                icon={<MessageSquare className="w-3.5 h-3.5" />}
              >
                إرسال واتساب
              </Button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">الاسم بالعربي:</label>
                <input
                  type="text"
                  value={guest.nameAr}
                  onChange={e => updateGuest(guest.id, { nameAr: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl bg-slate-50 text-slate-800 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">الجوال:</label>
                  <input
                    type="text"
                    value={guest.phone}
                    onChange={e => updateGuest(guest.id, { phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-slate-50 text-slate-800 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">المقاعد المخصصة:</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={guest.allowedSeats}
                    onChange={e => updateGuest(guest.id, { allowedSeats: parseInt(e.target.value, 10) || 1 })}
                    className="w-full px-3 py-2 border rounded-xl bg-slate-50 text-slate-800 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">الطاولة المخصصة:</label>
                <select
                  value={guest.tableNo}
                  onChange={e => updateGuest(guest.id, { tableNo: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl bg-slate-50 text-slate-800 outline-none"
                >
                  <option value="Unassigned">غير محدد</option>
                  {tables.map(t => (
                    <option key={t.id} value={t.number}>{t.number} - {t.nameAr}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">ملاحظات خاصة للمنظمين:</label>
                <textarea
                  rows={2}
                  value={guest.privateNotes}
                  onChange={e => updateGuest(guest.id, { privateNotes: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl bg-slate-50 text-slate-800 outline-none"
                />
              </div>
            </div>

            {guest.wishes && (
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                <div className="font-bold text-amber-900">تهنئة الضيف للعروسين:</div>
                <p className="text-slate-700 leading-relaxed italic">"{guest.wishes}"</p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => { deleteGuest(guest.id); onClose(); }}
                className="w-full py-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold transition flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>حذف الضيف من السجل</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
