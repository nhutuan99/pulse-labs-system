'use client';

// ============================================
// RealTimeTicker — Static Price Bar
// ============================================
// Matches Stitch prototype: BTC/ETH/SOL/BNB with
// border separators, Global Fear & Greed on right.
// ============================================

const TICKER_DATA = [
  { pair: 'BTC/USDT', price: '$96,413.87', change: '+2.45%', up: true },
  { pair: 'ETH/USDT', price: '$2,654.12', change: '-1.12%', up: false },
  { pair: 'SOL/USDT', price: '$184.10', change: '+5.21%', up: true },
  { pair: 'BNB/USDT', price: '$612.45', change: '+0.85%', up: true },
];

export default function RealTimeTicker() {
  return (
    <div className="nav-blur border-b border-white/5 overflow-x-auto no-scrollbar whitespace-nowrap h-11 flex items-center px-6 gap-8">
      {TICKER_DATA.map((t, i) => (
        <div
          key={t.pair}
          className={`flex items-center gap-3 ${
            i < TICKER_DATA.length - 1 ? 'pr-8 border-r border-white/5' : ''
          }`}
        >
          <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
            {t.pair}
          </span>
          <span className="text-sm font-semibold text-text-primary">
            {t.price}
          </span>
          <span
            className={`text-[11px] font-bold ${
              t.up ? 'text-primary' : 'text-accent-red'
            }`}
          >
            {t.change}
          </span>
        </div>
      ))}

      {/* Global Sentiment — right side */}
      <div className="ml-auto flex items-center gap-3">
        <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
          Global Fear &amp; Greed:
        </span>
        <div className="flex items-center gap-2 bg-accent-orange-dim px-2 py-0.5 rounded border border-accent-orange/20">
          <span className="text-xs font-bold text-accent-orange">
            64 (Greed)
          </span>
        </div>
      </div>
    </div>
  );
}
