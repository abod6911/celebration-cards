import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ViewType } from '../../types';
import { 
  LayoutDashboard, 
  Sparkles, 
  Users, 
  Armchair, 
  MessageSquare, 
  QrCode, 
  BarChart3, 
  Settings,
  ChevronDown,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const Sidebar: React.FC = () => {
  const { view, setView, t, lang, event, guests } = useApp();
  const [eventDropdownOpen, setEventDropdownOpen] = useState(false);

  const navItems: { id: ViewType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: t('nav_overview'), icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'builder', label: t('nav_builder'), icon: <Sparkles className="w-4 h-4" />, badge: lang === 'ar' ? 'فاخر' : 'Luxury' },
    { id: 'guests', label: t('nav_guests'), icon: <Users className="w-4 h-4" />, badge: String(guests.length) },
    { id: 'seating', label: t('nav_seating'), icon: <Armchair className="w-4 h-4" />, badge: lang === 'ar' ? 'جديد' : 'New' },
    { id: 'messages', label: t('nav_messages'), icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'checkin', label: t('nav_checkin'), icon: <QrCode className="w-4 h-4" /> },
    { id: 'analytics', label: t('nav_analytics'), icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'settings', label: t('nav_settings'), icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-72 shrink-0 hidden lg:block select-none">
      <div className="sticky top-6 rounded-[32px] glass-panel p-5 space-y-6 shadow-glass border border-gold-champagne/25">
        
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 pt-1 cursor-pointer" onClick={() => setView('overview')}>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-950 to-emerald-850 border border-gold-champagne/40 flex items-center justify-center text-gold-champagne font-serif font-bold text-xl shadow-gold shrink-0">
            Q
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-lg text-emerald-950 tracking-tight">{t('brand_name')}</span>
              <span className="px-2 py-0.5 text-[9px] font-extrabold rounded-full bg-gold-100 text-gold-900 border border-gold-300">
                VIP
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate">{t('brand_tagline')}</p>
          </div>
        </div>

        {/* Marital Crest Event Switcher Widget */}
        <div className="relative">
          <div 
            onClick={() => setEventDropdownOpen(!eventDropdownOpen)}
            className="p-3.5 rounded-2xl bg-gradient-to-br from-gold-50 via-white to-gold-100/40 border border-gold-300/60 shadow-xs cursor-pointer hover:border-gold-500/50 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-emerald-950 text-gold-champagne flex items-center justify-center font-serif font-bold text-xs shrink-0 border border-gold-champagne/30">
                💍
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-emerald-950 truncate font-serif">
                  {lang === 'ar' ? event.titleAr : event.titleEn}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 font-semibold mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{t('event_active_badge')}</span>
                </div>
              </div>
            </div>
            <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0", eventDropdownOpen && "rotate-180")} />
          </div>

          {/* Event Dropdown Menu */}
          {eventDropdownOpen && (
            <div className="absolute top-full inset-x-0 mt-2 p-2 rounded-2xl bg-white border border-gold-300/60 shadow-xl z-50 space-y-1 animate-fadeIn">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-xs font-bold text-emerald-950 flex items-center justify-between">
                <div>
                  <div>{lang === 'ar' ? event.titleAr : event.titleEn}</div>
                  <div className="text-[10px] text-emerald-700 font-normal">14 أكتوبر 2026 • نشط</div>
                </div>
                <span className="text-emerald-700">✓</span>
              </div>
              <div className="p-2.5 rounded-xl hover:bg-slate-50 text-xs text-slate-600 cursor-pointer">
                <div>عشاء عقد القران العائلي</div>
                <div className="text-[10px] text-slate-400">20 سبتمبر 2026 • قريباً</div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Group Items */}
        <nav className="space-y-1.5 relative">
          {navItems.map(item => {
            const isActive = view === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setView(item.id)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-200 relative group",
                  isActive 
                    ? "bg-emerald-950 text-gold-champagne shadow-emerald-glow font-extrabold border border-gold-champagne/30" 
                    : "text-slate-700 hover:bg-gold-50/80 hover:text-emerald-950"
                )}
              >
                {/* Gold active indicator */}
                {isActive && (
                  <span className="absolute start-0 inset-y-2 w-1.5 bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700 rounded-full" />
                )}

                <div className="flex items-center gap-3">
                  <span className={cn("transition-transform group-hover:scale-110", isActive ? "text-gold-champagne" : "text-slate-400 group-hover:text-emerald-900")}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-mono font-bold",
                    isActive ? "bg-gold-champagne text-emerald-950" : "bg-slate-100 text-slate-600 group-hover:bg-gold-100 group-hover:text-gold-900"
                  )}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* VIP Concierge Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950 to-emerald-900 text-white border border-gold-champagne/30 space-y-1.5 shadow-md">
          <div className="flex items-center gap-2 font-bold text-xs text-gold-champagne">
            <ShieldCheck className="w-4 h-4" />
            <span>{t('nav_vip_concierge')}</span>
          </div>
          <p className="text-[11px] text-emerald-100/80 leading-relaxed">
            {t('nav_concierge_desc')}
          </p>
        </div>

      </div>
    </aside>
  );
};
