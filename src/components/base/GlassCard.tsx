// ============================================
// GlassCard — Reusable glassmorphism wrapper
// ============================================
// Usage:
//   <GlassCard>Content</GlassCard>
//   <GlassCard hover glow="green" padding="lg">Content</GlassCard>
// ============================================

import { type ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'green' | 'blue' | 'red' | 'purple';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const paddingMap = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
} as const;

export default function GlassCard({
  children,
  className = '',
  hover = false,
  glow,
  padding = 'md',
  onClick,
}: GlassCardProps) {
  const glowClass = glow ? `glass-glow-${glow}` : '';
  const hoverClass = hover
    ? 'cursor-pointer transition-all duration-200 hover:shadow-card-hover hover:border-border-glass-hover'
    : '';
  const paddingClass = paddingMap[padding];

  return (
    <div
      className={`glass glass-shine ${glowClass} ${hoverClass} ${paddingClass} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}
