import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Calendar, MapPin, MessageSquare, Clock, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const HeroEventCard: React.FC = () => {
  const { event, lang, t, setView, stats, guests } = useApp();
  const [timeLeft, setTimeLeft] = useState({ days: 51, hours: 16, mins: 42, secs: 20 });

  useEffect(() => {
    const target = new Date(event.dateIso || '2026-10-14T19:30:00').getTime();
    const interval = setInterval(() => {
      const diff = target - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [event.dateIso]);

  const notSentCount = guests.filter(g => !g.inviteSent).length;
  const awaitingCount = guests.filter(g => g.rsvpStatus === 'awaiting').length;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-[36px] overflow-hidden p-6 sm:p-10 text-white shadow-2xl border border-gold-champagne/30"
      style={{
        background: 'linear-gradient(135deg, #061A13 0%, #0A2E23 45%, #0F3D2E 80%, #061812 100%)'
      }}
    >
      <div className="absolute -top-24 -end-24 w-96 h-96 rounded-full bg-gold-champagne/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -start-24 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-champagne/15 border border-gold-champagne/40 text-gold-champagne text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? event.dateFormattedAr : event.dateFormattedEn}</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              {lang === 'ar' ? event.titleAr : event.titleEn}
            </h1>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-100/90 font-medium">
              <MapPin className="w-4 h-4 text-gold-champagne shrink-0" />
              <span>{lang === 'ar' ? event.venueAr : event.venueEn}</span>
              <a 
                href={event.googleMapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gold-champagne hover:underline inline-flex items-center gap-0.5 text-xs font-bold"
              >
                <span>(الخريطة)</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="pt-2 space-y-2 max-w-md">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>{t('dash_hero_rsvp_rate')}</span>
              <span className="font-mono text-gold-champagne font-extrabold text-sm">{stats.responseRate}%</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-black/40 p-0.5 border border-white/10 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: stats.responseRate + '%' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-200 shadow-gold"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-auto shrink-0">
          <div className="p-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 shadow-inner flex items-center justify-around gap-4 text-center">
            <div className="px-2">
              <div className="text-2xl font-serif font-bold text-gold-champagne">{timeLeft.days}</div>
              <div className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">{t('dash_days')}</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="px-2">
              <div className="text-2xl font-serif font-bold text-gold-champagne">{timeLeft.hours}</div>
              <div className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">{t('dash_hours')}</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="px-2">
              <div className="text-2xl font-serif font-bold text-gold-champagne">{timeLeft.mins}</div>
              <div className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">{t('dash_mins')}</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="px-2">
              <div className="text-2xl font-serif font-bold text-gold-shimmer animate-pulse">{timeLeft.secs}</div>
              <div className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">{t('dash_secs')}</div>
            </div>
          </div>

          <div>
            {notSentCount > 0 ? (
              <Button
                variant="gold"
                size="lg"
                onClick={() => setView('messages')}
                icon={<MessageSquare className="w-4 h-4" />}
                className="w-full shadow-gold"
              >
                {t('dash_smart_cta_invites')} ({notSentCount})
              </Button>
            ) : awaitingCount > 0 ? (
              <Button
                variant="gold"
                size="lg"
                onClick={() => setView('messages')}
                icon={<Clock className="w-4 h-4" />}
                className="w-full shadow-gold"
              >
                {t('dash_smart_cta_reminders')} ({awaitingCount})
              </Button>
            ) : (
              <Button
                variant="gold"
                size="lg"
                onClick={() => setView('checkin')}
                icon={<Sparkles className="w-4 h-4" />}
                className="w-full shadow-gold"
              >
                {t('dash_smart_cta_checkin')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
