// ============================================
// StatCard — Small metric display box
// ============================================
// Usage:
//   <StatCard label="GIÁ HIỆN TẠI" value="$0.0098" />
//   <StatCard label="24H CHANGE" value="+12.45%" valueColor="text-primary" />
// ============================================

import { type ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | ReactNode;
  /** Optional text color for value */
  valueColor?: string;
  /** Optional subtitle */
  sub?: string;
  /** Optional sub text color */
  subColor?: string;
  className?: string;
}

export default function StatCard({
  label,
  value,
  valueColor = 'text-white',
  sub,
  subColor = 'text-text-secondary',
  className = '',
}: StatCardProps) {
  return (
    <div className={`rounded-xl border border-white/5 bg-white/5 p-3 ${className}`}>
      <p className="text-text-secondary mb-1 text-[9px] font-bold tracking-wider uppercase">
        {label}
      </p>
      <p className={`text-sm font-bold ${valueColor}`}>{value}</p>
      {sub && <p className={`text-[10px] ${subColor}`}>{sub}</p>}
    </div>
  );
}
