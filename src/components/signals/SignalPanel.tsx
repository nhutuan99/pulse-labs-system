'use client';

// ============================================
// SignalPanel — Trading signals sidebar panel
// ============================================

import GlassCard from '@/components/base/GlassCard';
import SignalCard, { type Signal } from './SignalCard';

const MOCK_SIGNALS: Signal[] = [
  {
    id: '1',
    tokenSymbol: 'BTC',
    type: 'buy',
    strength: 'strong',
    confidence: 85,
    reason: 'RSI oversold + MACD bullish crossover + Support $62,400',
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
  },
  {
    id: '2',
    tokenSymbol: 'ETH',
    type: 'sell',
    strength: 'moderate',
    confidence: 62,
    reason: 'Resistance rejection tại $3,600. FOMO phase — rủi ro cao',
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
  },
  {
    id: '3',
    tokenSymbol: 'SOL',
    type: 'buy',
    strength: 'strong',
    confidence: 91,
    reason: 'Breakout khỏi vùng tích lũy $140. Volume surge 300%',
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    tokenSymbol: 'AVAX',
    type: 'watch',
    strength: 'weak',
    confidence: 45,
    reason: 'Đang test support $34. Chờ xác nhận phá vỡ hoặc bật lại',
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000),
  },
  {
    id: '5',
    tokenSymbol: 'DOGE',
    type: 'hold',
    strength: 'moderate',
    confidence: 58,
    reason: 'Sideway trong range $0.075-$0.09. Chờ breakout',
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 36 * 60 * 60 * 1000),
  },
];

export default function SignalPanel() {
  const buySignals = MOCK_SIGNALS.filter((s) => s.type === 'buy');
  const sellSignals = MOCK_SIGNALS.filter((s) => s.type === 'sell');

  return (
    <GlassCard padding="md" className="flex h-full flex-col">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">⚡</span>
          <h3 className="text-sm font-bold text-text-primary">Trading Signals</h3>
        </div>
        <div className="flex gap-1.5">
          <span className="rounded-full bg-accent-green-dim px-2 py-0.5 text-[10px] font-bold text-accent-green">
            {buySignals.length} Buy
          </span>
          <span className="rounded-full bg-accent-red-dim px-2 py-0.5 text-[10px] font-bold text-accent-red">
            {sellSignals.length} Sell
          </span>
        </div>
      </div>

      {/* Signal List */}
      <div className="custom-scroll flex-1 space-y-2 overflow-y-auto pr-1">
        {MOCK_SIGNALS.map((signal) => (
          <SignalCard key={signal.id} signal={signal} />
        ))}
      </div>
    </GlassCard>
  );
}
