import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../ui/Card';

export const AnalyticsView: React.FC = () => {
  const { stats, guests, t } = useApp();

  const mealCounts = {
    beef: guests.filter(g => g.mealChoice === 'beef').length,
    salmon: guests.filter(g => g.mealChoice === 'salmon').length,
    vegetarian: guests.filter(g => g.mealChoice === 'vegetarian').length,
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">{t('analytics_title')}</h2>
        <p className="text-xs text-slate-500 mt-0.5">{t('analytics_subtitle')}</p>
      </div>

      <Card variant="white" className="p-6 space-y-4">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">مراحل استجابة وتفاعل الضيوف (Conversion Funnel)</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
            <div className="text-2xl font-serif font-bold text-slate-900">{stats.totalGuests}</div>
            <div className="text-xs font-bold text-slate-600">1. إجمالي المدعوين</div>
            <div className="text-[10px] text-slate-400">100% من السجل</div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-1">
            <div className="text-2xl font-serif font-bold text-blue-900">{guests.filter(g => g.inviteSent).length}</div>
            <div className="text-xs font-bold text-blue-800">2. تم إرسال الدعوة</div>
            <div className="text-[10px] text-blue-600">عبر WhatsApp</div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
            <div className="text-2xl font-serif font-bold text-emerald-900">{stats.confirmedGuests}</div>
            <div className="text-xs font-bold text-emerald-800">3. أكدوا الحضور</div>
            <div className="text-[10px] text-emerald-600">{stats.responseRate}% نسبة التأكيد</div>
          </div>

          <div className="p-4 rounded-2xl bg-gold-50 border border-gold-300 text-center space-y-1">
            <div className="text-2xl font-serif font-bold text-gold-950">{stats.checkedInGuests}</div>
            <div className="text-xs font-bold text-gold-900">4. حضروا بالقاعة</div>
            <div className="text-[10px] text-gold-700">تم مسح بطاقة QR</div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card variant="white" className="p-5 text-center space-y-2">
          <div className="text-2xl font-serif font-bold text-emerald-950">{mealCounts.beef}</div>
          <div className="text-xs font-bold text-slate-800">🥩 لحم العجل بالكمأة</div>
          <p className="text-[10px] text-slate-400">Truffle Beef Medallion</p>
        </Card>

        <Card variant="white" className="p-5 text-center space-y-2">
          <div className="text-2xl font-serif font-bold text-emerald-950">{mealCounts.salmon}</div>
          <div className="text-xs font-bold text-slate-800">🐟 السلمون الأطلسي</div>
          <p className="text-[10px] text-slate-400">Atlantic Herb Salmon</p>
        </Card>

        <Card variant="white" className="p-5 text-center space-y-2">
          <div className="text-2xl font-serif font-bold text-emerald-950">{mealCounts.vegetarian}</div>
          <div className="text-xs font-bold text-slate-800">🥗 الخيار النباتي الفاخر</div>
          <p className="text-[10px] text-slate-400">Gourmet Vegetarian</p>
        </Card>
      </div>
    </div>
  );
};
