'use client';

// ============================================
// MarketPhaseCard — Hero market status card
// ============================================

import GlassCard from '@/components/base/GlassCard';  

const PHASE_CONFIG = {
  ACCUMULATE: { label: 'Tích lũy', color: 'text-accent-green', bg: 'bg-accent-green-dim', emoji: '🟢' },
  PRE_BULL: { label: 'Chuẩn bị tăng', color: 'text-primary', bg: 'bg-primary-light', emoji: '🔵' },
  BULL_RUN: { label: 'Tăng trưởng', color: 'text-accent-green', bg: 'bg-accent-green-dim', emoji: '🚀' },
  FOMO: { label: 'Đỉnh FOMO', color: 'text-accent-yellow', bg: 'bg-accent-yellow-dim', emoji: '⚠️' },
  PRE_BEAR: { label: 'Chuẩn bị giảm', color: 'text-accent-red', bg: 'bg-accent-red-dim', emoji: '🟠' },
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
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-accent-green opacity-5 blur-3xl" />

      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-widest text-text-muted">
            Giai đoạn thị trường
          </p>
          <h2 className={`text-2xl font-bold ${config.color} text-glow-green`}>
            {config.emoji} {config.label}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Phase {Object.keys(PHASE_CONFIG).indexOf(phase) + 1} / 6
          </p>
        </div>

        {/* Confidence dial */}
        <div className="flex flex-col items-center">
          <div className="relative flex h-20 w-20 items-center justify-center">
            <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40" cy="40" r="34"
                fill="none"
                stroke="var(--color-border-glass)"
                strokeWidth="6"
              />
              <circle
                cx="40" cy="40" r="34"
                fill="none"
                stroke="var(--color-accent-green)"
                strokeWidth="6"
                strokeDasharray={`${(confidence / 100) * 213.6} 213.6`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <span className="absolute text-base font-bold text-text-primary">{confidence}</span>
          </div>
          <span className="mt-1 text-[10px] text-text-muted">Confidence</span>
        </div>
      </div>

      {/* Indicator row */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border-glass bg-bg-elevated p-3">
          <p className="text-[10px] uppercase tracking-wider text-text-muted">Relative Strength</p>
          <p className="mt-1 text-lg font-bold text-text-primary">{rsiValue}</p>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-bg-app">
            <div
              className="h-full rounded-full bg-accent-green transition-all duration-700 bar-dynamic"
              style={{ '--bar-w': `${rsiValue}%` } as React.CSSProperties}
            />
          </div>
        </div>
        <div className="rounded-xl border border-border-glass bg-bg-elevated p-3">
          <p className="text-[10px] uppercase tracking-wider text-text-muted">Momentum</p>
          <p className="mt-1 text-lg font-bold text-accent-green">{momentum}</p>
          <div className="mt-1.5 flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full ${
                  i <= 4 ? 'bg-accent-green' : 'bg-bg-app'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-text-muted">
          Khuyến nghị
        </p>
        <div className="space-y-2">
          {recommendations.map((rec, i) => (
            <div
              key={i}
              className="flex items-start gap-2 rounded-lg border border-border-glass bg-bg-elevated p-3"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-green-dim text-[10px] font-bold text-accent-green">
                {i + 1}
              </span>
              <span className="text-sm text-text-secondary">{rec}</span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
