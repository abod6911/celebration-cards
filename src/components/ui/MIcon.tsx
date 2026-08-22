import React from 'react';
import { cn } from '@/lib/utils';

export interface MIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  size?: number;
  fill?: boolean;
  weight?: number;
  className?: string;
}

export const MIcon: React.FC<MIconProps> = ({
  name,
  size = 20,
  fill = false,
  weight = 400,
  className,
  style,
  ...props
}) => {
  return (
    <span
      className={cn('material-symbols-outlined select-none inline-flex items-center justify-center leading-none', className)}
      style={{
        fontSize: `${size}px`,
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${Math.min(Math.max(size, 20), 48)}`,
        ...style,
      }}
      {...props}
    >
      {name}
    </span>
  );
};
