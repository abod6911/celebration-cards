import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'emerald' | 'amber' | 'rose' | 'slate';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'emerald',
  className,
  icon
}) => {
  const base = "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border";
  
  const variants = {
    gold: "bg-gold-50 text-gold-900 border-gold-500/40 shadow-xs",
    emerald: "bg-emerald-50 text-emerald-800 border-emerald-200",
    amber: "bg-amber-50 text-amber-800 border-amber-200",
    rose: "bg-burgundy-50 text-burgundy-800 border-burgundy-200",
    slate: "bg-slate-100 text-slate-700 border-slate-200"
  };

  return (
    <span className={cn(base, variants[variant], className)}>
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
