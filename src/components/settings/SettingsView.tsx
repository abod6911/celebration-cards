import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../ui/Card';

export const SettingsView: React.FC = () => {
  const { event, updateEvent, t } = useApp();

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      <div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">{t('settings_title')}</h2>
        <p className="text-xs text-slate-500 mt-0.5">{t('settings_subtitle')}</p>
      </div>

      <Card variant="white" className="p-6 space-y-4">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">إعدادات وضوابط الحفل العامة</h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
            <div>
              <div className="font-bold text-slate-900">السماح بتحديد الوجبات المفضلة</div>
              <div className="text-[11px] text-slate-500">تمكين الضيوف من اختيار نوع الوجبة أثناء تأكيد الحضور</div>
            </div>
            <input
              type="checkbox"
              checked={event.settings.enableMeals}
              onChange={e => updateEvent({ settings: { ...event.settings, enableMeals: e.target.checked } })}
              className="w-4 h-4 text-emerald-800 rounded"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
            <div>
              <div className="font-bold text-slate-900">إظهار العد التنازلي المباشر</div>
              <div className="text-[11px] text-slate-500">عرض مؤقت العد التنازلي التفاعلي على صفحة الدعوة</div>
            </div>
            <input
              type="checkbox"
              checked={event.settings.showCountdown}
              onChange={e => updateEvent({ settings: { ...event.settings, showCountdown: e.target.checked } })}
              className="w-4 h-4 text-emerald-800 rounded"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
            <div>
              <div className="font-bold text-slate-900">إظهار جدول فقرات الحفل</div>
              <div className="text-[11px] text-slate-500">عرض أوقات الاستقبال، الزفة، العشاء، ومراسم الكعكة</div>
            </div>
            <input
              type="checkbox"
              checked={event.settings.showTimeline}
              onChange={e => updateEvent({ settings: { ...event.settings, showTimeline: e.target.checked } })}
              className="w-4 h-4 text-emerald-800 rounded"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
