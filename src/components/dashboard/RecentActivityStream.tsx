import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../ui/Card';

export const RecentActivityStream: React.FC = () => {
  const { activity, t, setView } = useApp();

  return (
    <Card variant="white" className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">{t('recent_activity_title')}</h3>
        <button
          type="button"
          onClick={() => setView('guests')}
          className="text-xs text-emerald-900 font-bold hover:underline inline-flex items-center gap-1"
        >
          <span>{t('view_all_directory')}</span>
        </button>
      </div>

      <div className="space-y-2.5">
        {activity.map((item) => (
          <div 
            key={item.id}
            className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-between gap-3 text-xs hover:bg-gold-50/40 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-emerald-950 text-gold-champagne font-serif font-bold text-xs flex items-center justify-center shrink-0 border border-gold-champagne/30">
                {item.guestName.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-slate-900 truncate">{item.guestName}</div>
                <div className="text-[11px] text-slate-500 truncate">{item.textAr}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {item.type === 'checkin' && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-950 font-bold text-[10px] border border-emerald-300">
                  🚪 تم الدخول
                </span>
              )}
              {item.type === 'rsvp_yes' && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                  ✓ مؤكد
                </span>
              )}
              {item.type === 'rsvp_no' && (
                <span className="px-2 py-0.5 rounded-full bg-burgundy-50 text-burgundy-800 font-bold text-[10px] border border-burgundy-200">
                  ✕ اعتذر
                </span>
              )}
              <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
