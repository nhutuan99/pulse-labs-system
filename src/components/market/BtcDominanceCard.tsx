'use client';

// ============================================
// BtcDominanceCard — BTC dominance stat card
// ============================================

import GlassCard from '@/components/base/GlassCard';

interface BtcDominanceCardProps {
  dominance?: number;
  change?: number;
}

export default function BtcDominanceCard({ dominance = 54.3, change = -0.8 }: BtcDominanceCardProps) {
  const isAltSeason = dominance < 50;

  return (
    <GlassCard padding="md">
      <p className="mb-1 text-[10px] font-medium uppercase tracking-widest text-text-muted">
        BTC Dominance
      </p>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-text-primary">{dominance}%</span>
        <span className={`text-xs font-medium ${change >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
          {change >= 0 ? '▲' : '▼'} {Math.abs(change)}%
        </span>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-bg-app">
        <div
          className="h-full rounded-full bg-accent-yellow transition-all duration-700 bar-dynamic"
          style={{ '--bar-w': `${dominance}%` } as React.CSSProperties}
        />
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px]">
        <span className="text-text-muted">Altcoin</span>
        <span className={`font-medium ${isAltSeason ? 'text-accent-green' : 'text-accent-yellow'}`}>
          {isAltSeason ? '🟢 Altcoin Season' : '🟡 Bitcoin Season'}
        </span>
        <span className="text-text-muted">BTC</span>
      </div>
    </GlassCard>
  );
}
