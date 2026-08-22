import React from 'react';
import { cn } from '@/lib/utils';
import { AnimatedText } from './AnimatedText';

export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: React.ReactNode;
  className?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  icon,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        'group relative inline-flex items-center justify-center gap-2 rounded-full h-11 px-7 text-xs font-semibold uppercase tracking-wider',
        'bg-white/90 hover:bg-white text-black transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer',
        className
      )}
      {...props}
    >
      <AnimatedText text={text} />
      {icon && <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
    </button>
  );
};
