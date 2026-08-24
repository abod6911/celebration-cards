import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'glass' | 'white' | 'emerald' | 'gold';
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'white',
  hoverEffect = false,
  ...props
}) => {
  const base = "rounded-3xl p-5 sm:p-6 transition-all duration-300";
  
  const variants = {
    white: "bg-white border border-gold-champagne/15 shadow-card-luxury",
    glass: "glass-panel shadow-glass",
    emerald: "glass-panel-emerald text-white",
    gold: "bg-gradient-to-br from-gold-50 to-gold-100/60 border border-gold-300/60 shadow-xs text-gold-950"
  };

  return (
    <div className={cn(base, variants[variant], hoverEffect && "glass-card-hover cursor-pointer", className)} {...props}>
      {children}
    </div>
  );
};
