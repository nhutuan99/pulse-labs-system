'use client';

// ============================================
// SignalCard — Individual trading signal card
// ============================================

import { HiArrowCircleUp, HiArrowCircleDown, HiMinusCircle, HiEye } from 'react-icons/hi';
import type { IconType } from 'react-icons';

interface Signal {
  id: string;
  tokenSymbol: string;
  type: 'buy' | 'sell' | 'hold' | 'watch';
  strength: 'weak' | 'moderate' | 'strong';
  confidence: number;
  reason: string;
  createdAt: Date;
  expiresAt: Date;
}

const TYPE_CONFIG: Record<string, { label: string; color: string; borderClass: string; Icon: IconType }> = {
  buy: { label: 'MUA', color: 'text-accent-green', borderClass: 'signal-border-buy', Icon: HiArrowCircleUp },
  sell: { label: 'BÁN', color: 'text-accent-red', borderClass: 'signal-border-sell', Icon: HiArrowCircleDown },
  hold: { label: 'GIỮ', color: 'text-text-muted', borderClass: 'signal-border-hold', Icon: HiMinusCircle },
  watch: { label: 'THEO DÕI', color: 'text-primary', borderClass: 'signal-border-watch', Icon: HiEye },
};

const STRENGTH_CONFIG = {
  weak: { label: 'Yếu', color: 'text-accent-green', bg: 'bg-accent-green-dim' },
  moderate: { label: 'Trung bình', color: 'text-accent-yellow', bg: 'bg-accent-yellow-dim' },
  strong: { label: 'Mạnh', color: 'text-primary', bg: 'bg-primary-light' },
} as const;

export default function SignalCard({ signal }: { signal: Signal }) {
  const typeConfig = TYPE_CONFIG[signal.type];
  const strengthConfig = STRENGTH_CONFIG[signal.strength];
  const hoursLeft = Math.max(0, Math.floor((signal.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60)));

  return (
    <div className={`glass rounded-xl p-3 ${typeConfig.borderClass} transition-all duration-200 hover:shadow-card-hover`}>
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`text-base ${typeConfig.color}`}><typeConfig.Icon size={18} /></span>
          <span className="text-sm font-bold text-text-primary">{signal.tokenSymbol}</span>
          <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${typeConfig.color} bg-bg-elevated`}>
            {typeConfig.label}
          </span>
        </div>
        <span className={`text-lg font-bold ${signal.confidence > 70 ? 'text-accent-green' : 'text-accent-red'}`}>
          {signal.confidence}%
        </span>
      </div>

      {/* Reason */}
      <p className="mb-2 text-xs text-text-secondary line-clamp-2">{signal.reason}</p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${strengthConfig.color} ${strengthConfig.bg}`}>
          {strengthConfig.label}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-text-muted">
          🕐 {hoursLeft}h còn lại
        </span>
      </div>
    </div>
  );
}

export type { Signal };
