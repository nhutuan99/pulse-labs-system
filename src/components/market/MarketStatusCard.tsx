'use client';

// ============================================
// MarketStatusCard — Left Column (Stitch Screen 3)
// ============================================
// Refactored to use base components:
// Badge, ProgressBar, SectionHeader
// ============================================

import { Badge, ProgressBar, SectionHeader } from '@/components/base';

export default function MarketStatusCard() {
  return (
    <div className="glass-ultra flex flex-col overflow-hidden">
      {/* Top section */}
      <div className="flex flex-col gap-5 p-6 pb-4">
        {/* Header: Icon + Phase name */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-primary/20 border-primary/30 glowing-green flex h-11 w-11 items-center justify-center rounded-2xl border">
              <svg className="text-primary h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white">Tăng trưởng mạnh</h2>
              <p className="text-text-secondary flex items-center gap-1.5 text-[11px] font-medium">
                Bitcoin <span className="bg-text-muted h-1 w-1 rounded-full" /> Sóng 2{' '}
                <span className="text-primary/80 ml-2 text-[9px] font-bold tracking-tighter uppercase">
                  Current: 66.4K
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Sentiment + Target pills */}
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-3 py-2.5">
            <svg className="text-primary h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
            <div className="flex flex-col">
              <span className="text-text-secondary text-[8px] leading-none font-bold tracking-wider uppercase">
                Tâm lý
              </span>
              <span className="text-[11px] font-bold text-white">Lạc quan</span>
            </div>
          </div>
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-3 py-2.5">
            <svg className="text-accent-blue h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
            <div className="flex flex-col">
              <span className="text-text-secondary text-[8px] leading-none font-bold tracking-wider uppercase">
                Mục tiêu
              </span>
              <span className="text-[11px] font-bold text-white">Lợi nhuận</span>
            </div>
          </div>
        </div>

        {/* Confidence bar */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-text-secondary font-bold tracking-widest uppercase">
              Độ tin cậy
            </span>
            <span className="text-primary font-extrabold">88%</span>
          </div>
          <ProgressBar value={88} colorScheme="green" size="sm" />
        </div>
      </div>

      {/* Bottom section */}
      <div className="space-y-6 px-6 pt-2 pb-6">
        {/* Fear/Greed + BTC Dom badges */}
        <div className="flex items-center gap-3">
          <div className="flex flex-1 items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">
            <span className="text-text-secondary text-[9px] font-bold uppercase">Fear/Greed</span>
            <span className="text-accent-red text-[11px] font-black">11</span>
          </div>
          <div className="flex flex-1 items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">
            <span className="text-text-secondary text-[9px] font-bold uppercase">BTC Dom</span>
            <span className="text-[11px] font-black text-white">56%</span>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="space-y-4">
          <SectionHeader
            border
            action={
              <Badge colorScheme="blue" variant="outline" size="xs" className="tracking-tighter">
                AI System
              </Badge>
            }
          >
            Khuyến nghị
          </SectionHeader>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <div className="bg-primary h-1 w-1 rounded-full" />
              <span className="text-xs font-medium text-slate-300">Canh mua khi điều chỉnh</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="bg-primary h-1 w-1 rounded-full" />
              <span className="text-xs font-medium text-slate-300">Nắm giữ vị thế dài hạn</span>
            </li>
            <li className="flex items-center gap-3 opacity-60">
              <div className="bg-text-muted h-1 w-1 rounded-full" />
              <span className="text-xs font-medium text-slate-400">Đặt Stop Loss an toàn</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
