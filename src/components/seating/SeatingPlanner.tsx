import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Plus, AlertTriangle, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export const SeatingPlanner: React.FC = () => {
  const { tables, guests, addTable, deleteTable, assignGuestToTable, t, lang } = useApp();
  const [newTableNumber, setNewTableNumber] = useState('');
  const [newTableName, setNewTableName] = useState('');
  const [newTableCapacity, setNewTableCapacity] = useState(8);
  const [isAddTableOpen, setIsAddTableOpen] = useState(false);

  const unassignedGuests = guests.filter(g => !g.tableNo || g.tableNo === 'Unassigned');

  const handleCreateTable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTableNumber.trim()) return;

    addTable({
      number: newTableNumber,
      nameAr: newTableName || ('طاولة ' + newTableNumber),
      nameEn: newTableName || ('Table ' + newTableNumber),
      capacity: newTableCapacity,
      type: newTableNumber.includes('VIP') ? 'vip' : 'family',
      shape: 'round',
    });

    setNewTableNumber('');
    setNewTableName('');
    setIsAddTableOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">{t('seating_title')}</h2>
          <p className="text-xs text-slate-500 mt-0.5">{t('seating_subtitle')}</p>
        </div>

        <Button
          variant="gold"
          size="sm"
          onClick={() => setIsAddTableOpen(!isAddTableOpen)}
          icon={<Plus className="w-4 h-4" />}
        >
          {t('seating_btn_add_table')}
        </Button>
      </div>

      {isAddTableOpen && (
        <Card variant="white" className="p-5 border border-gold-300 shadow-lg animate-fadeIn">
          <form onSubmit={handleCreateTable} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">رقم الطاولة:</label>
              <input
                type="text"
                required
                placeholder="مثال: 12 أو VIP 03"
                value={newTableNumber}
                onChange={e => setNewTableNumber(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">اسم / تصنيف الطاولة:</label>
              <input
                type="text"
                placeholder="مثال: عائلة النماري"
                value={newTableName}
                onChange={e => setNewTableName(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">السعة (عدد المقاعد):</label>
              <input
                type="number"
                min="2"
                max="20"
                value={newTableCapacity}
                onChange={e => setNewTableCapacity(parseInt(e.target.value, 10) || 8)}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 outline-none"
              />
            </div>

            <div className="flex items-end gap-2">
              <Button variant="gold" size="sm" type="submit" className="w-full">
                إنشاء الطاولة ✓
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tables.map(tbl => {
              const seatedGuests = guests.filter(g => g.tableNo === tbl.number);
              const allocatedSeats = seatedGuests.reduce((sum, g) => sum + (g.attendingCount || g.allowedSeats || 1), 0);
              const remaining = tbl.capacity - allocatedSeats;
              const isOverbooked = allocatedSeats > tbl.capacity;
              const isVip = tbl.type === 'vip' || tbl.number.includes('VIP');

              return (
                <div
                  key={tbl.id}
                  className={cn(
                    "p-5 rounded-3xl border transition-all relative space-y-4 shadow-card-luxury",
                    isVip 
                      ? "bg-gradient-to-br from-white via-gold-50/40 to-gold-100/30 border-gold-300/80 ring-1 ring-gold-400/40" 
                      : "bg-white border-slate-200"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={cn(
                        "w-10 h-10 rounded-2xl flex items-center justify-center font-serif font-bold text-sm shadow-xs",
                        isVip ? "bg-emerald-950 text-gold-champagne border border-gold-champagne/40" : "bg-slate-100 text-slate-800"
                      )}>
                        {tbl.number}
                      </div>
                      <div>
                        <div className="font-serif font-bold text-sm text-slate-900">{lang === 'ar' ? tbl.nameAr : tbl.nameEn}</div>
                        <div className="text-[11px] text-slate-500">
                          السعة: {tbl.capacity} مقاعد
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteTable(tbl.id)}
                      className="p-1.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="py-2 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-gold-champagne/40 flex flex-col items-center justify-center bg-gold-50/50 shadow-inner">
                      <span className="font-serif font-bold text-lg text-emerald-950">{allocatedSeats} / {tbl.capacity}</span>
                      <span className="text-[9px] text-slate-500 font-bold">
                        {remaining >= 0 ? ('متبقي ' + remaining) : ('زيادة ' + Math.abs(remaining))}
                      </span>
                    </div>
                  </div>

                  {isOverbooked && (
                    <div className="p-2.5 rounded-xl bg-burgundy-50 border border-burgundy-200 text-burgundy-900 text-[11px] font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-burgundy-600 shrink-0" />
                      <span>تجاوز السعة بـ {Math.abs(remaining)} مقاعد!</span>
                    </div>
                  )}

                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">الضيوف المعينون ({seatedGuests.length})</div>
                    {seatedGuests.length === 0 ? (
                      <div className="py-2 text-center text-slate-400 text-xs italic">لا يوجد ضيوف حالياً</div>
                    ) : (
                      seatedGuests.map(g => (
                        <div key={g.id} className="p-2 rounded-xl bg-slate-50 flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800 truncate">{g.nameAr}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-500 font-bold">{g.allowedSeats} مقاعد</span>
                            <button
                              type="button"
                              onClick={() => assignGuestToTable(g.id, 'Unassigned')}
                              className="text-rose-500 hover:underline text-[10px] font-bold"
                            >
                              إزالة
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <Card variant="white" className="p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {t('seating_unassigned_title')} ({unassignedGuests.length})
              </h3>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {unassignedGuests.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs italic">
                  تم تسكين وتعيين كافة الضيوف بنجاح ✓
                </div>
              ) : (
                unassignedGuests.map(g => (
                  <div key={g.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs truncate">{g.nameAr}</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold">
                        {g.allowedSeats} مقاعد
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        onChange={e => {
                          if (e.target.value) assignGuestToTable(g.id, e.target.value);
                        }}
                        defaultValue=""
                        className="w-full px-2.5 py-1.5 rounded-xl border bg-white text-slate-800 text-xs outline-none"
                      >
                        <option value="" disabled>اختر الطاولة للتسكين...</option>
                        {tables.map(t => (
                          <option key={t.id} value={t.number}>{t.number} - {t.nameAr}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
