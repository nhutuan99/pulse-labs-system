'use client';

// ============================================
// FearGreedGauge — Circular sentiment gauge
// ============================================
// Refactored to use base components:
// GlassCard, CircularGauge
// ============================================

import { GlassCard, CircularGauge } from '@/components/base';

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

  return (
    <GlassCard padding="md" className="flex flex-col items-center">
      <p className="text-text-muted mb-3 text-[10px] font-medium tracking-widest uppercase">
        Market Sentiment
      </p>

      {/* Gauge */}
      <CircularGauge
        value={value}
        size={112}
        strokeWidth={8}
        strokeColor={strokeColor}
        center={<span className={`text-3xl font-bold ${colorClass}`}>{value}</span>}
      />

      {/* Label */}
      <span className={`mt-2 text-sm font-medium ${colorClass}`}>{statusLabel}</span>
    </GlassCard>
  );
}
