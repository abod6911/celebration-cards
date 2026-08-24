import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../ui/Card';
import { Users, UserCheck, Clock, MailX, DoorOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export const MetricCardsGrid: React.FC = () => {
  const { stats, t, setView } = useApp();

  const cards = [
    {
      id: 'confirmed',
      title: t('stat_confirmed'),
      value: stats.confirmedGuests,
      unit: t('stat_confirmed_unit'),
      subtext: stats.responseRate + '% ' + t('stat_rate_sub'),
      icon: <UserCheck className="w-6 h-6 text-emerald-600" />,
      isPrimary: true,
      onClick: () => setView('guests'),
    },
    {
      id: 'total',
      title: t('stat_total'),
      value: stats.totalGuests,
      unit: 'مدعو',
      subtext: 'يشمل العائلات والمرافقين',
      icon: <Users className="w-5 h-5 text-gold-700" />,
      onClick: () => setView('guests'),
    },
    {
      id: 'awaiting',
      title: t('stat_awaiting'),
      value: stats.awaitingGuests,
      unit: 'بانتظار الرد',
      subtext: 'بانتظار تأكيد الحضور',
      icon: <Clock className="w-5 h-5 text-amber-600" />,
      onClick: () => setView('messages'),
    },
    {
      id: 'declined',
      title: t('stat_declined'),
      value: stats.declinedGuests,
      unit: 'معتذر',
      subtext: 'مع تمنيات مباركة',
      icon: <MailX className="w-5 h-5 text-burgundy-600" />,
      onClick: () => setView('guests'),
    },
    {
      id: 'checkedin',
      title: t('stat_checkedin'),
      value: stats.checkedInGuests,
      unit: 'حاضر بالقاعة',
      subtext: 'تم التحقق عند البوابة',
      icon: <DoorOpen className="w-5 h-5 text-emerald-700" />,
      onClick: () => setView('checkin'),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, idx) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.06 }}
          className={card.isPrimary ? "sm:col-span-2 lg:col-span-2" : ""}
        >
          <Card 
            variant="white" 
            hoverEffect 
            onClick={card.onClick}
            className="h-full flex flex-col justify-between p-5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">{card.title}</span>
              <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shadow-xs">
                {card.icon}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-emerald-950">
                  {card.value}
                </span>
                <span className="text-xs font-bold text-slate-500">{card.unit}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium truncate">{card.subtext}</p>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
