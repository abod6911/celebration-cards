import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Guest } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { QrCode, CheckCircle2, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

export const VIPScannerPortal: React.FC = () => {
  const { checkInGuest, stats, t, guests } = useApp();
  const [manualToken, setManualToken] = useState('');
  const [lastScanned, setLastScanned] = useState<{ status: 'success' | 'already' | 'not_found'; guest?: Guest } | null>(null);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualToken.trim()) return;

    const res = checkInGuest(manualToken);
    if (res.success) {
      setLastScanned({ status: 'success', guest: res.guest });
    } else if (res.reason === 'already_checked_in') {
      setLastScanned({ status: 'already', guest: res.guest });
    } else {
      setLastScanned({ status: 'not_found' });
    }
    setManualToken('');
  };

  const handleSimulateScan = (guest: Guest) => {
    const res = checkInGuest(guest.token);
    if (res.success) {
      setLastScanned({ status: 'success', guest: res.guest });
    } else if (res.reason === 'already_checked_in') {
      setLastScanned({ status: 'already', guest: res.guest });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">{t('checkin_title')}</h2>
          <p className="text-xs text-slate-500 mt-0.5">{t('checkin_subtitle')}</p>
        </div>

        <div className="p-3 rounded-2xl bg-emerald-950 text-gold-champagne border border-gold-champagne/40 shadow-emerald-glow flex items-center gap-3">
          <div className="text-2xl font-serif font-bold">{stats.checkedInGuests} / {stats.confirmedGuests}</div>
          <div className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">الحاضرون بالقاعة</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-[36px] bg-gradient-to-br from-emerald-950 via-[#061812] to-emerald-900 p-6 sm:p-8 text-white border border-gold-champagne/30 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[460px]">
            <div className="relative w-64 h-64 rounded-3xl border-2 border-gold-champagne/60 p-3 flex items-center justify-center bg-black/40 backdrop-blur-md shadow-2xl">
              <div className="absolute top-0 start-0 w-6 h-6 border-t-4 border-s-4 border-gold-champagne rounded-tl-xl" />
              <div className="absolute top-0 end-0 w-6 h-6 border-t-4 border-e-4 border-gold-champagne rounded-tr-xl" />
              <div className="absolute bottom-0 start-0 w-6 h-6 border-b-4 border-s-4 border-gold-champagne rounded-bl-xl" />
              <div className="absolute bottom-0 end-0 w-6 h-6 border-b-4 border-e-4 border-gold-champagne rounded-br-xl" />

              <div className="absolute inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-gold-champagne to-transparent animate-scanLine shadow-gold" />
              <QrCode className="w-28 h-28 text-white/30" />
            </div>

            <p className="text-xs text-emerald-200/80 font-medium mt-6 text-center max-w-sm">
              وجه كاميرا الجهاز نحو رمز الاستجابة السريعة (QR Pass) الموجود في دعوة الضيف للتحقق الفوري
            </p>

            <form onSubmit={handleManualSubmit} className="w-full max-w-md mt-6 flex gap-2">
              <input
                type="text"
                placeholder="أو أدخل رمز الدخول يدوياً (Token)..."
                value={manualToken}
                onChange={e => setManualToken(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-emerald-200/50 text-xs outline-none focus:ring-2 focus:ring-gold-champagne/50 font-mono text-center"
              />
              <Button variant="gold" size="sm" type="submit">
                تحقق
              </Button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          {lastScanned && (
            <div className={cn(
              "p-6 rounded-3xl border shadow-xl animate-fadeIn space-y-3",
              lastScanned.status === 'success' && "bg-emerald-50 border-emerald-500 text-emerald-950",
              lastScanned.status === 'already' && "bg-amber-50 border-amber-500 text-amber-950",
              lastScanned.status === 'not_found' && "bg-rose-50 border-rose-500 text-rose-950"
            )}>
              <div className="flex items-center gap-3">
                {lastScanned.status === 'success' && <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />}
                {lastScanned.status === 'already' && <AlertTriangle className="w-8 h-8 text-amber-600 shrink-0" />}
                {lastScanned.status === 'not_found' && <AlertTriangle className="w-8 h-8 text-rose-600 shrink-0" />}
                
                <div>
                  <h4 className="font-serif font-bold text-base">
                    {lastScanned.status === 'success' && 'تم تأكيد الدخول والترحيب بالضيف ✓'}
                    {lastScanned.status === 'already' && 'تنبيه: تم تسجيل الدخول مسبقاً!'}
                    {lastScanned.status === 'not_found' && 'رمز الدخول غير صالح أو غير موجود'}
                  </h4>
                  {lastScanned.guest && (
                    <p className="text-xs font-bold mt-0.5">
                      {lastScanned.guest.nameAr} • طاولة ({lastScanned.guest.tableNo})
                    </p>
                  )}
                </div>
              </div>

              {lastScanned.guest && (
                <div className="p-3 rounded-2xl bg-white/80 border border-black/5 text-xs space-y-1">
                  <div>عدد الأفراد: <span className="font-bold">{lastScanned.guest.allowedSeats} مقاعد</span></div>
                  <div>المجموعة: <span className="font-bold">{lastScanned.guest.groupAr}</span></div>
                  {lastScanned.guest.privateNotes && (
                    <div className="text-slate-600 italic">ملاحظة: {lastScanned.guest.privateNotes}</div>
                  )}
                </div>
              )}
            </div>
          )}

          <Card variant="white" className="p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">سجل وصول الضيوف السريع</h3>
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {guests.map(g => (
                <div key={g.id} className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between text-xs">
                  <div className="min-w-0">
                    <div className="font-bold text-slate-900 truncate">{g.nameAr}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{g.tableNo} • TOKEN: {g.token}</div>
                  </div>

                  {g.checkedIn ? (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-950 font-bold text-[10px]">
                      حضر ({g.checkedInAt})
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSimulateScan(g)}
                      className="px-2.5 py-1 rounded-full bg-gold-100 hover:bg-gold-200 text-gold-950 font-bold text-[10px] border border-gold-300 transition"
                    >
                      تسجيل دخول
                    </button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
