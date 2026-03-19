'use client';

// ============================================
// MarketStatusCard — Left Column (Stitch Screen 3)
// ============================================
// glass-ultra card: phase name, sentiment/target pills,
// confidence bar, Fear/Greed + BTC Dom, AI recommendations.
// ============================================

export default function MarketStatusCard() {
  return (
    <div className="glass-ultra overflow-hidden flex flex-col">
      {/* Top section */}
      <div className="p-6 pb-4 flex flex-col gap-5">
        {/* Header: Icon + Phase name */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 flex items-center justify-center rounded-2xl bg-primary/20 border border-primary/30 glowing-green">
              <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Tăng trưởng mạnh
              </h2>
              <p className="text-[11px] text-text-secondary font-medium flex items-center gap-1.5">
                Bitcoin <span className="w-1 h-1 rounded-full bg-text-muted" /> Sóng 2{' '}
                <span className="text-primary/80 ml-2 font-bold text-[9px] uppercase tracking-tighter">
                  Current: 66.4K
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Sentiment + Target pills */}
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 px-3 py-2.5 bg-white/5 rounded-xl border border-white/5">
            <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
            <div className="flex flex-col">
              <span className="text-[8px] font-bold text-text-secondary uppercase tracking-wider leading-none">
                Tâm lý
              </span>
              <span className="text-[11px] font-bold text-white">Lạc quan</span>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-2 px-3 py-2.5 bg-white/5 rounded-xl border border-white/5">
            <svg className="w-4 h-4 text-accent-blue" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
            <div className="flex flex-col">
              <span className="text-[8px] font-bold text-text-secondary uppercase tracking-wider leading-none">
                Mục tiêu
              </span>
              <span className="text-[11px] font-bold text-white">Lợi nhuận</span>
            </div>
          </div>
        </div>

        {/* Confidence bar */}
        <div className="space-y-2 pt-1">
          <div className="flex justify-between items-center text-[10px]">
            <span className="font-bold text-text-secondary uppercase tracking-widest">
              Độ tin cậy
            </span>
            <span className="font-extrabold text-primary">88%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full rounded-full glowing-green w-[88%]"
            />
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="px-6 pb-6 pt-2 space-y-6">
        {/* Fear/Greed + BTC Dom badges */}
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center justify-between px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
            <span className="text-[9px] font-bold text-text-secondary uppercase">
              Fear/Greed
            </span>
            <span className="text-[11px] font-black text-accent-red">11</span>
          </div>
          <div className="flex-1 flex items-center justify-between px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
            <span className="text-[9px] font-bold text-text-secondary uppercase">
              BTC Dom
            </span>
            <span className="text-[11px] font-black text-white">56%</span>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
              Khuyến nghị
            </h3>
            <div className="flex items-center gap-1.5 bg-accent-blue-dim text-accent-blue px-2 py-0.5 rounded-full border border-accent-blue/20">
              <span className="text-[8px] font-black uppercase tracking-tighter">
                AI System
              </span>
            </div>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <div className="w-1 h-1 rounded-full bg-primary" />
              <span className="text-xs font-medium text-slate-300">
                Canh mua khi điều chỉnh
              </span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-1 h-1 rounded-full bg-primary" />
              <span className="text-xs font-medium text-slate-300">
                Nắm giữ vị thế dài hạn
              </span>
            </li>
            <li className="flex items-center gap-3 opacity-60">
              <div className="w-1 h-1 rounded-full bg-text-muted" />
              <span className="text-xs font-medium text-slate-400">
                Đặt Stop Loss an toàn
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
