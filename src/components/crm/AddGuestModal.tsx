import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { X, UserPlus } from 'lucide-react';

interface AddGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddGuestModal: React.FC<AddGuestModalProps> = ({ isOpen, onClose }) => {
  const { addGuest, tables, lang } = useApp();
  const [nameAr, setNameAr] = useState('');
  const [phone, setPhone] = useState('');
  const [allowedSeats, setAllowedSeats] = useState(1);
  const [groupAr, setGroupAr] = useState('عائلة كبار الشخصيات');
  const [tableNo, setTableNo] = useState('VIP 01');
  const [mealChoice, setMealChoice] = useState<'beef' | 'salmon' | 'vegetarian'>('beef');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [privateNotes, setPrivateNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameAr.trim()) return;

    addGuest({
      nameAr,
      nameEn: nameAr,
      phone,
      groupAr,
      groupEn: groupAr,
      isFamily: allowedSeats > 1,
      allowedSeats,
      attendingCount: 0,
      rsvpStatus: 'not_sent',
      familyMembers: [nameAr],
      companions: [],
      mealChoice,
      dietaryNotes,
      tableNo,
      inviteSent: false,
      inviteSentAt: null,
      reminderSent: false,
      privateNotes,
      wishes: '',
      isVIP: tableNo.includes('VIP'),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-emerald-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl border border-gold-champagne/30 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gold-50 text-gold-900 flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-slate-900">إضافة ضيف جديد</h3>
              <p className="text-[10px] text-slate-400">إدراج ضيف في سجل الحفل الرسمي وتخصيص المقاعد</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">اسم الضيف / العائلة (بالعربي): *</label>
            <input
              type="text"
              required
              placeholder="مثال: سعادة الأستاذ أحمد المنصور"
              value={nameAr}
              onChange={e => setNameAr(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 text-slate-800 focus:bg-white outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">رقم الجوال:</label>
              <input
                type="text"
                placeholder="+9665..."
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 text-slate-800 focus:bg-white outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">عدد المقاعد المصرحة:</label>
              <input
                type="number"
                min="1"
                max="10"
                value={allowedSeats}
                onChange={e => setAllowedSeats(parseInt(e.target.value, 10) || 1)}
                className="w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 text-slate-800 focus:bg-white outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">المجموعة / التصنيف:</label>
              <input
                type="text"
                value={groupAr}
                onChange={e => setGroupAr(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 text-slate-800 focus:bg-white outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">الطاولة المخصصة:</label>
              <select
                value={tableNo}
                onChange={e => setTableNo(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 text-slate-800 focus:bg-white outline-none"
              >
                <option value="Unassigned">غير محدد (Unassigned)</option>
                {tables.map(t => (
                  <option key={t.id} value={t.number}>{t.number} - {t.nameAr}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">الوجبة المفضلة المبدئية:</label>
            <select
              value={mealChoice}
              onChange={e => setMealChoice(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 text-slate-800 focus:bg-white outline-none"
            >
              <option value="beef">🥩 لحم العجل بالكمأة (Truffle Beef)</option>
              <option value="salmon">🐟 السلمون الأطلسي (Salmon)</option>
              <option value="vegetarian">🥗 نباتي فاخر (Vegetarian)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">ملاحظات خاصة للمنظمين:</label>
            <textarea
              rows={2}
              placeholder="مثال: قريب العريس من الدرجة الأولى..."
              value={privateNotes}
              onChange={e => setPrivateNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 text-slate-800 focus:bg-white outline-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
            >
              إلغاء
            </button>

            <Button variant="gold" size="sm" type="submit">
              حفظ بيانات الضيف ✓
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
