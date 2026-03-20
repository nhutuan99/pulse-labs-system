// ============================================
// SectionHeader — Uppercase tracking label
// ============================================
// Usage:
//   <SectionHeader>Khuyến nghị</SectionHeader>
//   <SectionHeader action={<Badge>AI</Badge>}>Recommendations</SectionHeader>
// ============================================

import { type ReactNode } from 'react';

interface SectionHeaderProps {
  children: ReactNode;
  /** Optional element on the right side */
  action?: ReactNode;
  /** Whether to include bottom border */
  border?: boolean;
  className?: string;
}

export default function SectionHeader({
  children,
  action,
  border = false,
  className = '',
}: SectionHeaderProps) {
  return (
    <div
      className={`flex items-center justify-between ${
        border ? 'border-b border-white/5 pb-2' : ''
      } ${className}`}
    >
      <h3 className="text-text-secondary text-[10px] font-bold tracking-widest uppercase">
        {children}
      </h3>
      {action}
    </div>
  );
}
