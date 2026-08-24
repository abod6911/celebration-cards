import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../ui/Card';

export const RSVPConversionBar: React.FC = () => {
  const { stats, t } = useApp();
  const total = Math.max(stats.totalGuests, 1);

  const confirmedPct = Math.round((stats.confirmedGuests / total) * 100);
  const awaitingPct = Math.round((stats.awaitingGuests / total) * 100);
  const declinedPct = Math.round((stats.declinedGuests / total) * 100);

  return (
    <Card variant="white" className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">{t('rsvp_breakdown_title')}</h3>
        <span className="text-xs font-bold text-emerald-900 font-mono">{stats.responseRate}% مستجيب</span>
      </div>

      <div className="h-3 w-full rounded-full bg-slate-100 flex overflow-hidden p-0.5 border border-slate-200">
        <div style={{ width: confirmedPct + '%' }} className="h-full bg-emerald-600 rounded-full transition-all duration-500" />
        <div style={{ width: awaitingPct + '%' }} className="h-full bg-amber-500 transition-all duration-500" />
        <div style={{ width: declinedPct + '%' }} className="h-full bg-burgundy-600 rounded-full transition-all duration-500" />
      </div>

      <div className="grid grid-cols-3 gap-2 pt-1 text-center">
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
          <span className="block text-sm font-serif font-bold text-emerald-900">{confirmedPct}%</span>
          <span className="text-[10px] text-emerald-700 font-bold">{t('rsvp_legend_confirmed')} ({stats.confirmedGuests})</span>
        </div>

        <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100">
          <span className="block text-sm font-serif font-bold text-amber-900">{awaitingPct}%</span>
          <span className="text-[10px] text-amber-700 font-bold">{t('rsvp_legend_awaiting')} ({stats.awaitingGuests})</span>
        </div>

        <div className="p-3 rounded-2xl bg-burgundy-50 border border-burgundy-100">
          <span className="block text-sm font-serif font-bold text-burgundy-900">{declinedPct}%</span>
          <span className="text-[10px] text-burgundy-700 font-bold">{t('rsvp_legend_declined')} ({stats.declinedGuests})</span>
        </div>
      </div>
    </Card>
  );
};
