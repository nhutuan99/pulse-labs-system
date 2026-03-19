'use client';

// ============================================
// AiRecommendationCard — AI insight card
// ============================================

import GlassCard from '@/components/base/GlassCard';  
import { SiGooglegemini } from 'react-icons/si';

interface AiRecommendationCardProps {
  signal?: 'STRONG_BUY' | 'MODERATE_BUY' | 'NEUTRAL' | 'MODERATE_SELL' | 'STRONG_SELL';
  reasoning?: string;
}

const SIGNAL_CONFIG = {
  STRONG_BUY: { label: 'Strong Buy', color: 'text-accent-green', bg: 'bg-accent-green-dim' },
  MODERATE_BUY: { label: 'Moderate Buy', color: 'text-accent-green', bg: 'bg-accent-green-dim' },
  NEUTRAL: { label: 'Neutral', color: 'text-text-secondary', bg: 'bg-bg-elevated' },
  MODERATE_SELL: { label: 'Moderate Sell', color: 'text-accent-red', bg: 'bg-accent-red-dim' },
  STRONG_SELL: { label: 'Strong Sell', color: 'text-accent-red', bg: 'bg-accent-red-dim' },
} as const;

export default function AiRecommendationCard({
  signal = 'MODERATE_BUY',
  reasoning = 'RSI in bullish territory (72). MACD histogram positive. Volume above 20-day MA confirming trend continuation. Support at $62,400 holding strong.',
}: AiRecommendationCardProps) {
  const config = SIGNAL_CONFIG[signal];

  return (
    <GlassCard padding="md">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[10px] font-medium uppercase tracking-widest text-text-muted">
          AI Recommendation
        </p>
        <span className="flex items-center gap-1 text-[10px] text-text-muted">
          <SiGooglegemini size={12} />
          Gemini AI
        </span>
      </div>

      {/* Signal badge */}
      <div className={`mb-3 inline-flex items-center gap-2 rounded-lg ${config.bg} px-3 py-1.5`}>
        <span className={`text-sm font-bold ${config.color}`}>{config.label}</span>
      </div>

      {/* Text */}
      <p className="text-sm leading-relaxed text-text-secondary">
        {reasoning}
      </p>
    </GlassCard>
  );
}
