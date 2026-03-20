// ============================================
// SignalCard — Individual trading signal card
// ============================================
// Refactored to use base components: Badge
// ============================================

import { HiArrowCircleUp, HiArrowCircleDown, HiMinusCircle, HiEye } from 'react-icons/hi';
import type { IconType } from 'react-icons';
import { Badge } from '@/components/base';

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

const TYPE_CONFIG: Record<
  string,
  {
    label: string;
    color: string;
    borderClass: string;
    Icon: IconType;
    badgeScheme: 'green' | 'red' | 'neutral' | 'green';
  }
> = {
  buy: {
    label: 'MUA',
    color: 'text-accent-green',
    borderClass: 'signal-border-buy',
    Icon: HiArrowCircleUp,
    badgeScheme: 'green',
  },
  sell: {
    label: 'BÁN',
    color: 'text-accent-red',
    borderClass: 'signal-border-sell',
    Icon: HiArrowCircleDown,
    badgeScheme: 'red',
  },
  hold: {
    label: 'GIỮ',
    color: 'text-text-muted',
    borderClass: 'signal-border-hold',
    Icon: HiMinusCircle,
    badgeScheme: 'neutral',
  },
  watch: {
    label: 'THEO DÕI',
    color: 'text-primary',
    borderClass: 'signal-border-watch',
    Icon: HiEye,
    badgeScheme: 'green',
  },
};

const STRENGTH_CONFIG: Record<
  string,
  { label: string; badgeScheme: 'green' | 'yellow' | 'green' }
> = {
  weak: { label: 'Yếu', badgeScheme: 'green' },
  moderate: { label: 'Trung bình', badgeScheme: 'yellow' },
  strong: { label: 'Mạnh', badgeScheme: 'green' },
};

function getHoursLeft(expiresAt: Date): number {
  return Math.max(0, Math.floor((expiresAt.getTime() - Date.now()) / (1000 * 60 * 60)));
}

export default function SignalCard({ signal }: { signal: Signal }) {
  const typeConfig = TYPE_CONFIG[signal.type];
  const strengthConfig = STRENGTH_CONFIG[signal.strength];
  const hoursLeft = getHoursLeft(signal.expiresAt);

  return (
    <div
      className={`glass rounded-xl p-3 ${typeConfig.borderClass} hover:shadow-card-hover transition-all duration-200`}
    >
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`text-base ${typeConfig.color}`}>
            <typeConfig.Icon size={18} />
          </span>
          <span className="text-text-primary text-sm font-bold">{signal.tokenSymbol}</span>
          <Badge colorScheme={typeConfig.badgeScheme} variant="subtle" size="xs">
            {typeConfig.label}
          </Badge>
        </div>
        <span
          className={`text-lg font-bold ${signal.confidence > 70 ? 'text-accent-green' : 'text-accent-red'}`}
        >
          {signal.confidence}%
        </span>
      </div>

      {/* Reason */}
      <p className="text-text-secondary mb-2 line-clamp-2 text-xs">{signal.reason}</p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <Badge colorScheme={strengthConfig.badgeScheme} variant="subtle" size="xs">
          {strengthConfig.label}
        </Badge>
        <span className="text-text-muted flex items-center gap-1 text-[10px]">
          🕐 {hoursLeft}h còn lại
        </span>
      </div>
    </div>
  );
}

export type { Signal };
