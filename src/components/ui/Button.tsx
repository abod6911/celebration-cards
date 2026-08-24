import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  icon,
  ...props
}) => {
  const base = "inline-flex items-center justify-center font-bold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-2xl";
  
  const variants = {
    primary: "bg-emerald-900 text-gold-champagne hover:bg-emerald-850 border border-gold-champagne/30 shadow-md",
    gold: "btn-gold-sweep bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 text-emerald-950 hover:opacity-95 shadow-gold font-extrabold",
    secondary: "bg-white text-emerald-950 border border-gold-champagne/25 hover:bg-gold-50/60 shadow-xs",
    outline: "bg-transparent text-emerald-900 border border-emerald-900/30 hover:bg-emerald-900/5",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
    danger: "bg-burgundy-600 text-white hover:bg-burgundy-700 shadow-sm"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2.5 text-xs sm:text-sm gap-2",
    lg: "px-6 py-3.5 text-sm sm:text-base gap-2.5"
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
