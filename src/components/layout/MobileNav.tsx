import React from 'react';
import { useApp } from '../../context/AppContext';
import { ViewType } from '../../types';
import { LayoutDashboard, Sparkles, Users, MessageSquare, QrCode } from 'lucide-react';
import { cn } from '../../lib/utils';

export const MobileNav: React.FC = () => {
  const { view, setView, t } = useApp();

  const items: { id: ViewType; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: t('nav_overview'), icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'builder', label: t('nav_builder'), icon: <Sparkles className="w-5 h-5" /> },
    { id: 'guests', label: t('nav_guests'), icon: <Users className="w-5 h-5" /> },
    { id: 'messages', label: t('nav_messages'), icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'checkin', label: t('nav_checkin'), icon: <QrCode className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-3 inset-x-4 z-40 lg:hidden">
      <div className="rounded-full glass-panel-emerald px-4 py-2 flex items-center justify-around shadow-2xl border border-gold-champagne/40">
        {items.map(item => {
          const isActive = view === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setView(item.id)}
              className={cn(
                "flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-2xl transition-all duration-200",
                isActive ? "text-gold-champagne scale-110 font-bold" : "text-white/65 hover:text-white"
              )}
            >
              <span>{item.icon}</span>
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
