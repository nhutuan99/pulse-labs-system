'use client';

// ============================================
// FearGreedGauge — Circular sentiment gauge
// ============================================

import GlassCard from '@/components/base/GlassCard';

interface FearGreedGaugeProps {
  value?: number;
  label?: string;
}

function getGaugeColorClass(value: number): string {
  if (value <= 25) return 'text-accent-red';
  if (value <= 45) return 'text-accent-yellow';
  if (value <= 55) return 'text-text-secondary';
  return 'text-accent-green';
}

function getGaugeStrokeVar(value: number): string {
  if (value <= 25) return 'var(--color-accent-red)';
  if (value <= 45) return 'var(--color-accent-yellow)';
  if (value <= 55) return 'var(--color-text-secondary)';
  return 'var(--color-accent-green)';
}

function getGaugeLabel(value: number): string {
  if (value <= 25) return 'Extreme Fear';
  if (value <= 45) return 'Fear';
  if (value <= 55) return 'Neutral';
  if (value <= 75) return 'Greed';
  return 'Extreme Greed';
}

export default function FearGreedGauge({ value = 78, label }: FearGreedGaugeProps) {
  const colorClass = getGaugeColorClass(value);
  const strokeColor = getGaugeStrokeVar(value);
  const statusLabel = label || getGaugeLabel(value);
  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference - (value / 100) * circumference;

  return (
    <GlassCard padding="md" className="flex flex-col items-center">
      <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-text-muted">
        Market Sentiment
      </p>

      {/* Gauge */}
      <div className="relative flex h-28 w-28 items-center justify-center">
        <svg className="-rotate-90" width="112" height="112" viewBox="0 0 112 112">
          {/* Background circle */}
          <circle
            cx="56" cy="56" r="45"
            fill="none"
            stroke="var(--color-border-glass)"
            strokeWidth="8"
          />
          {/* Value arc */}
          <circle
            cx="56" cy="56" r="45"
            fill="none"
            stroke={strokeColor}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className={`text-3xl font-bold ${colorClass}`}>{value}</span>
        </div>
      </div>

      {/* Label */}
      <span className={`mt-2 text-sm font-medium ${colorClass}`}>
        {statusLabel}
      </span>
    </GlassCard>
  );
}
