'use client';

// ============================================
// MarketPhaseCard — Hero market status card
// ============================================
// Refactored to use base components:
// GlassCard, CircularGauge, ProgressBar, SectionHeader
// ============================================

import { GlassCard, CircularGauge, ProgressBar, SectionHeader } from '@/components/base';

const PHASE_CONFIG = {
  ACCUMULATE: {
    label: 'Tích lũy',
    color: 'text-accent-green',
    bg: 'bg-accent-green-dim',
    emoji: '🟢',
  },
  PRE_BULL: { label: 'Chuẩn bị tăng', color: 'text-primary', bg: 'bg-primary-light', emoji: '🔵' },
  BULL_RUN: {
    label: 'Tăng trưởng',
    color: 'text-accent-green',
    bg: 'bg-accent-green-dim',
    emoji: '🚀',
  },
  FOMO: {
    label: 'Đỉnh FOMO',
    color: 'text-accent-yellow',
    bg: 'bg-accent-yellow-dim',
    emoji: '⚠️',
  },
  PRE_BEAR: {
    label: 'Chuẩn bị giảm',
    color: 'text-accent-red',
    bg: 'bg-accent-red-dim',
    emoji: '🟠',
  },
  BEAR_RUN: { label: 'Suy thoái', color: 'text-accent-red', bg: 'bg-accent-red-dim', emoji: '🔴' },
} as const;

type PhaseKey = keyof typeof PHASE_CONFIG;

interface MarketPhaseCardProps {
  phase?: PhaseKey;
  confidence?: number;
  rsiValue?: number;
  momentum?: string;
  recommendations?: string[];
}

export default function MarketPhaseCard({
  phase = 'ACCUMULATE',
  confidence = 72,
  rsiValue = 72,
  momentum = 'High',
  recommendations = [
    'Gom dần tại vùng hỗ trợ',
    'Đặt Stop Loss dưới đáy gần nhất',
    'Chia nhỏ vốn, DCA theo tuần',
  ],
}: MarketPhaseCardProps) {
  const config = PHASE_CONFIG[phase];

  return (
    <GlassCard padding="lg" className="relative overflow-hidden" glow="green">
      {/* Gradient background accent */}
      <div className="bg-accent-green absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-5 blur-3xl" />

      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-text-muted mb-1 text-xs font-medium tracking-widest uppercase">
            Giai đoạn thị trường
          </p>
          <h2 className={`text-2xl font-bold ${config.color} text-glow-green`}>
            {config.emoji} {config.label}
          </h2>
          <p className="text-text-secondary mt-1 text-sm">
            Phase {Object.keys(PHASE_CONFIG).indexOf(phase) + 1} / 6
          </p>
        </div>

        {/* Confidence dial */}
        <CircularGauge value={confidence} size={80} strokeWidth={6} label="Confidence" />
      </div>

      {/* Indicator row */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        <div className="border-border-glass bg-bg-elevated rounded-xl border p-3">
          <p className="text-text-muted text-[10px] tracking-wider uppercase">Relative Strength</p>
          <p className="text-text-primary mt-1 text-lg font-bold">{rsiValue}</p>
          <ProgressBar
            value={rsiValue}
            colorScheme="green"
            size="sm"
            trackClassName="bg-bg-app"
            className="mt-1.5"
          />
        </div>
        <div className="border-border-glass bg-bg-elevated rounded-xl border p-3">
          <p className="text-text-muted text-[10px] tracking-wider uppercase">Momentum</p>
          <p className="text-accent-green mt-1 text-lg font-bold">{momentum}</p>
          <div className="mt-1.5 flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full ${i <= 4 ? 'bg-accent-green' : 'bg-bg-app'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <SectionHeader className="mb-3">Khuyến nghị</SectionHeader>
        <div className="space-y-2">
          {recommendations.map((rec, i) => (
            <div
              key={i}
              className="border-border-glass bg-bg-elevated flex items-start gap-2 rounded-lg border p-3"
            >
              <span className="bg-accent-green-dim text-accent-green mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold">
                {i + 1}
              </span>
              <span className="text-text-secondary text-sm">{rec}</span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
