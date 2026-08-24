import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Guest } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { AddGuestModal } from './AddGuestModal';
import { GuestDetailDrawer } from './GuestDetailDrawer';
import { Search, UserPlus, Download, Edit, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export const GuestCRM: React.FC = () => {
  const { guests, t, deleteGuest, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

  const filteredGuests = guests.filter(g => {
    const matchesSearch = !search || 
      g.nameAr.toLowerCase().includes(search.toLowerCase()) || 
      g.phone.includes(search) || 
      g.groupAr.toLowerCase().includes(search.toLowerCase()) ||
      g.tableNo.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (filterStatus === 'all') return true;
    if (filterStatus === 'attending') return g.rsvpStatus === 'attending';
    if (filterStatus === 'awaiting') return g.rsvpStatus === 'awaiting';
    if (filterStatus === 'declined') return g.rsvpStatus === 'declined';
    if (filterStatus === 'checkedin') return g.checkedIn;
    if (filterStatus === 'families') return g.allowedSeats > 1;
    if (filterStatus === 'not_sent') return !g.inviteSent;

    return true;
  });

  const filterChips = [
    { id: 'all', label: t('filter_all'), count: guests.length },
    { id: 'attending', label: t('filter_attending'), count: guests.filter(g => g.rsvpStatus === 'attending').length },
    { id: 'awaiting', label: t('filter_awaiting'), count: guests.filter(g => g.rsvpStatus === 'awaiting').length },
    { id: 'declined', label: t('filter_declined'), count: guests.filter(g => g.rsvpStatus === 'declined').length },
    { id: 'checkedin', label: t('filter_checkedin'), count: guests.filter(g => g.checkedIn).length },
    { id: 'families', label: t('filter_families'), count: guests.filter(g => g.allowedSeats > 1).length },
    { id: 'not_sent', label: t('filter_not_sent'), count: guests.filter(g => !g.inviteSent).length },
  ];

  const exportCSV = () => {
    let csv = 'Name,Phone,Group,Seats,Status,Table\n';
    guests.forEach(g => {
      csv += `"${g.nameAr}","${g.phone}","${g.groupAr}",${g.allowedSeats},"${g.rsvpStatus}","${g.tableNo}"\n`;
    });
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `QuickRSVP_Guests_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showToast('تم تصدير ملف CSV بنجاح ✓');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">{t('crm_title')}</h2>
          <p className="text-xs text-slate-500 mt-0.5">{t('crm_subtitle')}</p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="gold"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            icon={<UserPlus className="w-4 h-4" />}
          >
            {t('crm_btn_add')}
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={exportCSV}
            icon={<Download className="w-4 h-4" />}
          >
            {t('crm_btn_export')}
          </Button>
        </div>
      </div>

      <Card variant="white" className="space-y-3 p-4">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('crm_search_ph')}
            className="w-full pe-10 ps-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:ring-2 focus:ring-emerald-800/20 outline-none transition"
          />
          <Search className="absolute end-3.5 top-3 text-slate-400 w-4 h-4" />
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          {filterChips.map(chip => (
            <button
              key={chip.id}
              type="button"
              onClick={() => setFilterStatus(chip.id)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5",
                filterStatus === chip.id
                  ? "bg-emerald-950 text-gold-champagne shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              )}
            >
              <span>{chip.label}</span>
              <span className={cn(
                "px-1.5 py-0.2 text-[10px] rounded-full font-mono font-bold",
                filterStatus === chip.id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
              )}>
                {chip.count}
              </span>
            </button>
          ))}
        </div>
      </Card>

      <div className="bg-white rounded-[32px] border border-gold-champagne/20 shadow-card-luxury overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start border-collapse">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-4 px-4 text-start">{t('col_name')}</th>
                <th className="py-4 px-4 text-start">{t('col_phone')}</th>
                <th className="py-4 px-4 text-center">{t('col_seats')}</th>
                <th className="py-4 px-4 text-center">{t('col_status')}</th>
                <th className="py-4 px-4 text-start">{t('col_table')}</th>
                <th className="py-4 px-4 text-end">{t('col_actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredGuests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-bold">
                    لا توجد نتائج مطابقة
                  </td>
                </tr>
              ) : (
                filteredGuests.map(g => {
                  return (
                    <tr 
                      key={g.id}
                      onClick={() => setSelectedGuest(g)}
                      className="hover:bg-gold-50/40 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold-100 to-gold-200 text-emerald-950 font-serif font-bold text-xs flex items-center justify-center shrink-0 border border-gold-champagne/30">
                            {g.nameAr.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{g.nameAr}</span>
                              {g.tableNo.includes('VIP') && (
                                <span className="px-1.5 py-0.2 rounded-md bg-gold-100 text-gold-900 border border-gold-300 text-[9px] font-bold">
                                  VIP
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500">{g.groupAr}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-600 dir-ltr text-start">
                        {g.phone || '—'}
                      </td>

                      <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                        {g.allowedSeats} مقاعد
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        {g.rsvpStatus === 'attending' && (
                          <Badge variant="emerald">✓ حاضر ({g.attendingCount})</Badge>
                        )}
                        {g.rsvpStatus === 'awaiting' && (
                          <Badge variant="amber">⏳ بانتظار الرد</Badge>
                        )}
                        {g.rsvpStatus === 'declined' && (
                          <Badge variant="rose">✕ اعتذر</Badge>
                        )}
                        {g.rsvpStatus === 'not_sent' && (
                          <Badge variant="slate">لم تُرسل</Badge>
                        )}
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-emerald-900">
                        {g.tableNo || 'Unassigned'}
                      </td>

                      <td className="py-3.5 px-4 text-end" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedGuest(g)}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteGuest(g.id)}
                            className="p-2 rounded-xl hover:bg-rose-50 text-rose-500 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddGuestModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <GuestDetailDrawer guest={selectedGuest} onClose={() => setSelectedGuest(null)} />
    </div>
  );
};
