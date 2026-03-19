'use client';

// ============================================
// MarketSignalsPanel — Right Column (Stitch Screen 3)
// ============================================
// glass card with LIVE badge, signal cards
// (Breakout/Liquidation), Configuration/History footer.
// ============================================

export default function MarketSignalsPanel() {
  return (
    <div className="glass h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
          Market Signals
        </h3>
        <div className="flex items-center gap-1.5 bg-primary/10 px-2 py-1 rounded-lg border border-primary/20">
          <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
          <span className="text-[9px] font-bold text-primary uppercase tracking-tighter">
            Live
          </span>
        </div>
      </div>

      {/* Signal cards */}
      <div className="p-6 space-y-4 overflow-y-auto max-h-[640px] no-scrollbar flex-1">
        {/* Breakout Signal */}
        <div className="p-4 bg-white/5 rounded-[18px] border border-white/5 hover:border-primary/30 transition-all cursor-default relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[9px] font-bold bg-primary text-bg-app px-2 py-0.5 rounded uppercase tracking-wider">
                Breakout
              </span>
              <span className="text-[10px] font-mono text-text-secondary">
                14:23:05
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold text-white tracking-tight">
                BTC/USDT
              </span>
              <span className="text-[11px] font-mono text-primary">
                $14.2M Vol
              </span>
            </div>
            {/* Strength bars */}
            <div className="flex gap-1.5">
              <div className="flex-1 h-1 bg-primary/20 rounded-full overflow-hidden">
                <div className="h-full w-full bg-primary/40" />
              </div>
              <div className="flex-1 h-1 bg-primary/20 rounded-full overflow-hidden">
                <div className="h-full w-full bg-primary/60" />
              </div>
              <div className="flex-1 h-1 bg-primary rounded-full" />
            </div>
          </div>
        </div>

        {/* Liquidation Signal */}
        <div className="p-4 bg-white/5 rounded-[18px] border border-white/5 hover:border-accent-red/30 transition-all cursor-default relative overflow-hidden group">
          <div className="absolute inset-0 bg-accent-red/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[9px] font-bold bg-accent-red text-white px-2 py-0.5 rounded uppercase tracking-wider">
                Liquidation
              </span>
              <span className="text-[10px] font-mono text-text-secondary">
                14:18:22
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-white tracking-tight">
                ETH/USDT
              </span>
              <span className="text-[11px] font-mono text-accent-red">
                $1.2M Short
              </span>
            </div>
            <p className="text-[11px] text-text-secondary leading-relaxed">
              Selling pressure detected on Deribit.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-white/5 p-5 flex items-center justify-between">
        <button className="text-[10px] font-bold text-text-secondary hover:text-white transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
          </svg>
          Configuration
        </button>
        <button className="text-[10px] font-bold text-text-secondary hover:text-white uppercase tracking-widest">
          History
        </button>
      </div>
    </div>
  );
}
