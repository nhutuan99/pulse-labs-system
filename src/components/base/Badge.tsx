// ============================================
// Badge — Colored pill/tag component
// ============================================
// Usage:
//   <Badge colorScheme="green">MUA</Badge>
//   <Badge colorScheme="red" variant="outline" size="xs">SELL</Badge>
// ============================================

import { type ReactNode } from 'react';

type BadgeColorScheme = 'green' | 'red' | 'blue' | 'yellow' | 'purple' | 'neutral';
type BadgeVariant = 'solid' | 'subtle' | 'outline';
type BadgeSize = 'xs' | 'sm';

interface BadgeProps {
  children: ReactNode;
  colorScheme?: BadgeColorScheme;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const COLOR_MAP: Record<BadgeColorScheme, Record<BadgeVariant, string>> = {
  green: {
    solid: 'bg-primary text-white',
    subtle: 'bg-accent-green-dim text-accent-green',
    outline: 'border border-primary/30 bg-primary/10 text-primary',
  },
  red: {
    solid: 'bg-accent-red text-white',
    subtle: 'bg-accent-red-dim text-accent-red',
    outline: 'border border-accent-red/30 bg-accent-red-dim text-accent-red',
  },
  blue: {
    solid: 'bg-accent-blue text-white',
    subtle: 'bg-accent-blue-dim text-accent-blue',
    outline: 'border border-accent-blue/20 bg-accent-blue-dim text-accent-blue',
  },
  yellow: {
    solid: 'bg-accent-yellow text-bg-app',
    subtle: 'bg-accent-yellow-dim text-accent-yellow',
    outline: 'border border-accent-yellow/30 bg-accent-yellow-dim text-accent-yellow',
  },
  purple: {
    solid: 'bg-accent-purple text-white',
    subtle: 'bg-accent-purple/10 text-accent-purple',
    outline: 'border border-accent-purple/30 bg-accent-purple/10 text-accent-purple',
  },
  neutral: {
    solid: 'bg-white/10 text-text-primary',
    subtle: 'bg-white/5 text-text-secondary',
    outline: 'border border-white/10 bg-white/5 text-text-primary',
  },
};

const SIZE_MAP: Record<BadgeSize, string> = {
  xs: 'px-1.5 py-0.5 text-[8px]',
  sm: 'px-2 py-0.5 text-[10px]',
};

export default function Badge({
  children,
  colorScheme = 'green',
  variant = 'subtle',
  size = 'sm',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-bold tracking-wider uppercase ${COLOR_MAP[colorScheme][variant]} ${SIZE_MAP[size]} ${className}`}
    >
      {children}
    </span>
  );
}
