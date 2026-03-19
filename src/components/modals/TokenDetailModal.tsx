'use client';

// ============================================
// TokenDetailModal — 4-Tab Modal (Stitch Screens 5/2/7/4)
// ============================================
// Tabs: Tổng quan | Tokenomics | Social | Rủi ro
// ============================================

import { useState } from 'react';
import { HiOutlineX } from 'react-icons/hi';

interface TokenModalProps {
  token: {
    symbol: string;
    name: string;
    pair: string;
    price: string;
    change: string;
    up: boolean;
    score: number;
  };
  onClose: () => void;
}

const TABS = ['Tổng quan', 'Tokenomics', 'Social', 'Rủi ro'] as const;
type TabKey = (typeof TABS)[number];

export default function TokenDetailModal({ token, onClose }: TokenModalProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('Tổng quan');

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[100] bg-black/60" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
        <div
          className="glass-elevated w-full max-w-lg max-h-[90vh] overflow-y-auto no-scrollbar"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                  {token.symbol}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-white">
                      {token.symbol}
                    </span>
                    <span className="text-sm text-text-secondary">({token.symbol})</span>
                    <span className="text-[9px] font-bold bg-primary text-bg-app px-2 py-0.5 rounded uppercase tracking-wider">
                      Tăng trưởng
                    </span>
                  </div>
                  <p className="text-[10px] text-text-secondary uppercase">Rank #30</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:text-white transition-colors"
              >
                <HiOutlineX size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-white/5">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-medium transition-colors relative ${
                    activeTab === tab
                      ? 'text-primary'
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 pt-2">
            {activeTab === 'Tổng quan' && <OverviewTab token={token} />}
            {activeTab === 'Tokenomics' && <TokenomicsTab />}
            {activeTab === 'Social' && <SocialTab />}
            {activeTab === 'Rủi ro' && <RiskTab />}
          </div>

          {/* CTA Button */}
          <div className="px-6 pb-6">
            <button className="w-full bg-primary text-white font-bold py-3.5 rounded-xl text-sm hover:brightness-110 transition-all">
              XEM CHI TIẾT DỰ ÁN →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ---- Tổng quan Tab (Screen 5) ----
function OverviewTab({ token }: { token: TokenModalProps['token'] }) {
  return (
    <div className="space-y-5">
      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'GIÁ HIỆN TẠI', value: token.price },
          { label: '24H CHANGE', value: token.change, color: token.up ? 'text-primary' : 'text-accent-red' },
          { label: 'VOLUME 24H', value: '$22.9M' },
          { label: 'MARKET CAP', value: '$0' },
        ].map((stat) => (
          <div key={stat.label} className="p-3 bg-white/5 rounded-xl border border-white/5">
            <p className="text-[9px] font-bold text-text-secondary uppercase tracking-wider mb-1">
              {stat.label}
            </p>
            <p className={`text-sm font-bold ${stat.color || 'text-white'}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Price Chart */}
      <div className="bg-white/5 rounded-xl border border-white/5 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" />
            </svg>
            <span className="text-sm font-bold text-white">{token.symbol} Price Chart</span>
          </div>
          <div className="flex p-0.5 bg-white/5 rounded-lg">
            {['7d', '14d', '30d'].map((p) => (
              <button
                key={p}
                className={`px-2.5 py-1 text-[10px] font-bold rounded ${
                  p === '30d' ? 'bg-primary text-white' : 'text-text-secondary'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <svg className="w-full h-32" viewBox="0 0 400 120">
          {/* Chart grid */}
          <line x1="0" y1="30" x2="400" y2="30" stroke="rgba(255,255,255,0.05)" />
          <line x1="0" y1="60" x2="400" y2="60" stroke="rgba(255,255,255,0.05)" />
          <line x1="0" y1="90" x2="400" y2="90" stroke="rgba(255,255,255,0.05)" />
          {/* Price line */}
          <path
            d="M0 100 C50 95, 80 90, 120 80 S180 40, 220 35 S280 45, 310 30 S360 50, 400 45"
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Volume bars */}
          {[20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380].map((x, i) => (
            <rect
              key={x}
              x={x}
              y={105 - (i % 3 === 0 ? 15 : 8)}
              width="12"
              height={i % 3 === 0 ? 15 : 8}
              rx="1"
              fill={i % 4 === 2 ? 'rgba(244,63,94,0.4)' : 'rgba(16,185,129,0.4)'}
            />
          ))}
        </svg>
      </div>

      {/* Bottom score badges */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
          <div className="flex items-center gap-1.5 mb-2">
            <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
            </svg>
            <span className="text-[9px] font-bold text-text-secondary uppercase">
              Trending Score
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex-1 h-1.5 bg-white/10 rounded-full mr-2">
              <div className="h-full bg-primary rounded-full w-[86%]" />
            </div>
            <span className="text-sm font-bold text-white">{token.score * 10}</span>
          </div>
        </div>
        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
          <div className="flex items-center gap-1.5 mb-2">
            <svg className="w-3.5 h-3.5 text-accent-red" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
            <span className="text-[9px] font-bold text-text-secondary uppercase">
              Social Score
            </span>
          </div>
          <p className="text-xs text-text-secondary">Loading...</p>
        </div>
        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
          <div className="flex items-center gap-1.5 mb-2">
            <svg className="w-3.5 h-3.5 text-accent-purple" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.94s4.18 1.36 4.18 3.85c0 1.89-1.44 2.93-3.12 3.19z" />
            </svg>
            <span className="text-[9px] font-bold text-text-secondary uppercase">
              Tokenomics
            </span>
          </div>
          <p className="text-xs text-text-secondary">Loading...</p>
        </div>
      </div>
    </div>
  );
}

// ---- Tokenomics Tab (Screen 4/6) ----
function TokenomicsTab() {
  const supplyData = [
    { label: 'TOTAL SUPPLY', value: '1,000,000,000', sub: '1B Tokens' },
    { label: 'CIRCULATING SUPPLY', value: '450,000,000', sub: '45% Unlocked', highlight: true },
    { label: 'NEXT UNLOCK', value: 'Mar 20, 2026', sub: 'In ~18 months' },
  ];

  const distribution = [
    { name: 'Community', pct: 50, color: '#10B981', colorClass: 'bg-primary' },
    { name: 'Treasury', pct: 20, color: '#3B82F6', colorClass: 'bg-accent-blue' },
    { name: 'Team', pct: 15, color: '#A855F7', colorClass: 'bg-accent-purple' },
    { name: 'Advisors', pct: 15, color: '#F43F5E', colorClass: 'bg-accent-red' },
  ];

  return (
    <div className="space-y-5">
      {/* Supply cards */}
      <div className="grid grid-cols-3 gap-3">
        {supplyData.map((s) => (
          <div key={s.label} className="p-3 bg-white/5 rounded-xl border border-white/5">
            <p className="text-[9px] font-bold text-text-secondary uppercase tracking-wider mb-1">
              {s.label}
            </p>
            <p className={`text-sm font-bold ${s.highlight ? 'text-primary' : 'text-white'}`}>
              {s.value}
            </p>
            <p className={`text-[10px] ${s.highlight ? 'text-primary/80' : 'text-text-secondary'}`}>
              {s.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Supply Distribution — Donut + Legend */}
      <div className="bg-white/5 rounded-xl border border-white/5 p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2.03 0v8.99H22c-.47-4.74-4.24-8.52-8.97-8.99zm0 11.01V22c4.74-.47 8.5-4.25 8.97-8.99h-8.97z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Supply Distribution</h4>
            <p className="text-[9px] text-text-secondary uppercase tracking-wider">
              Allocation Strategy
            </p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          {/* SVG Donut */}
          <div className="relative w-36 h-36 shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              {(() => {
                let offset = 0;
                return distribution.map((d) => {
                  const dashArray = (d.pct / 100) * 251.2;
                  const dashOffset = -offset;
                  offset += dashArray;
                  return (
                    <circle
                      key={d.name}
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={d.color}
                      strokeWidth="10"
                      strokeDasharray={`${dashArray} ${251.2 - dashArray}`}
                      strokeDashoffset={dashOffset}
                    />
                  );
                });
              })()}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-white">100%</span>
              <span className="text-[8px] text-text-secondary uppercase tracking-wider">
                Allocated
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3 flex-1">
            {distribution.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${d.colorClass}`} />
                  <span className="text-xs font-medium text-text-secondary">{d.name}</span>
                </div>
                <span className="text-sm font-bold text-white">{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vesting Schedule */}
      <div className="bg-white/5 rounded-xl border border-white/5 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
              </svg>
            </div>
            <div>
              <span className="text-sm font-bold text-white">Vesting Schedule</span>
              <span className="text-[9px] text-text-secondary ml-1">(24 Months)</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-[9px] text-text-secondary uppercase tracking-wider">
              Cumulative Unlocked
            </span>
          </div>
        </div>
        <svg className="w-full h-24" viewBox="0 0 400 100">
          <defs>
            <linearGradient id="vestGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 95 C40 92, 80 88, 120 80 S200 55, 260 40 S340 20, 400 10"
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M0 95 C40 92, 80 88, 120 80 S200 55, 260 40 S340 20, 400 10 L400 100 L0 100 Z"
            fill="url(#vestGrad)"
          />
          {/* X-axis labels */}
          <text x="0" y="98" fill="rgba(148,163,184,0.6)" fontSize="8" fontFamily="monospace">
            M0
          </text>
          <text x="190" y="98" fill="rgba(148,163,184,0.6)" fontSize="8" fontFamily="monospace">
            M12
          </text>
          <text x="380" y="98" fill="rgba(148,163,184,0.6)" fontSize="8" fontFamily="monospace">
            M24
          </text>
        </svg>
      </div>
    </div>
  );
}

// ---- Social Tab (Screen 7) ----
function SocialTab() {
  return (
    <div className="space-y-5">
      {/* Sentiment + Volume */}
      <div className="grid grid-cols-2 gap-4">
        {/* Sentiment Score */}
        <div className="bg-white/5 rounded-xl border border-white/5 p-4 text-center">
          <p className="text-[9px] font-bold text-text-secondary uppercase tracking-wider mb-3">
            Sentiment Score
          </p>
          <div className="relative w-24 h-24 mx-auto mb-2">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#10B981"
                strokeWidth="6"
                strokeDasharray={`${(75 / 100) * 251.2} ${251.2 - (75 / 100) * 251.2}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-white">75</span>
              <span className="text-[9px] font-bold text-primary uppercase">Bullish</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 text-[10px]">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> POS: 82%
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-red" /> NEG: 18%
            </span>
          </div>
        </div>

        {/* Social Volume */}
        <div className="bg-white/5 rounded-xl border border-white/5 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[9px] font-bold text-text-secondary uppercase tracking-wider">
              Social Volume 24H
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-white">12,482</span>
              <span className="text-[10px] font-bold text-primary">+12%</span>
            </div>
          </div>
          <svg className="w-full h-20" viewBox="0 0 200 80">
            <path
              d="M0 60 C20 55, 40 50, 60 40 S100 55, 120 30 S160 50, 180 20 L200 25"
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Hot Tags */}
      <div className="bg-white/5 rounded-xl border border-white/5 p-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[9px] font-bold text-text-secondary uppercase tracking-wider">
            Hot Tags:
          </span>
          {['#G-Token', '#BTC', '#Bullish', '#VietnamWeb3', '#Gem', '#Correction'].map((tag, i) => (
            <span
              key={tag}
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                i === 0 || i === 2
                  ? 'text-primary border-primary/30 bg-primary/10'
                  : i === 5
                    ? 'text-accent-red border-accent-red/30 bg-accent-red-dim'
                    : 'text-text-primary border-white/10 bg-white/5'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Top Influencer Mentions */}
      <div>
        <h4 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-3">
          Top Influencer Mentions
        </h4>
        <div className="space-y-3">
          <div className="bg-white/5 rounded-xl border border-white/5 p-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                CK
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-white">CryptoKhang.eth</span>
                  <span className="text-[8px] font-bold bg-primary text-bg-app px-1.5 py-0.5 rounded uppercase">
                    Bullish
                  </span>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  &ldquo;Đồ thị G đang có dấu hiệu tích lũy cực tốt tại vùng hỗ trợ mạnh. Target ngắn hạn +30%. #G-Token #CryptoVN&rdquo;
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl border border-white/5 p-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-text-muted/20 flex items-center justify-center text-xs font-bold text-text-secondary shrink-0">
                WA
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-white">WhaleAlert_VN</span>
                  <span className="text-[8px] font-bold bg-white/10 text-text-secondary px-1.5 py-0.5 rounded uppercase">
                    Neutral
                  </span>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  &ldquo;Khối lượng giao dịch mạng xã hội của G tăng vọt 200% trong 4 giờ qua. Sự chú ý đang đổ dồn vào đây.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Rủi ro Tab (Screen 2) ----
function RiskTab() {
  return (
    <div className="space-y-5">
      {/* Risk Assessment */}
      <div className="bg-white/5 rounded-xl border border-white/5 p-5">
        <p className="text-[9px] font-bold text-text-secondary uppercase tracking-wider mb-1">
          Risk Assessment
        </p>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-white">Medium-Low</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-primary">24</span>
            <span className="text-sm text-text-secondary">/100</span>
          </div>
        </div>
        {/* Risk bar */}
        <div className="h-2 rounded-full overflow-hidden flex">
          <div className="w-1/3 bg-primary" />
          <div className="w-1/3 bg-accent-yellow" />
          <div className="w-1/3 bg-accent-red" />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[9px] font-bold text-primary">LOW</span>
          <span className="text-[9px] font-bold text-accent-yellow">MEDIUM</span>
          <span className="text-[9px] font-bold text-accent-red">HIGH</span>
        </div>
      </div>

      {/* Safety Checks + Honeypot */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-xl border border-white/5 p-4">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
            </svg>
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
              Safety Checks
            </span>
          </div>
          <div className="space-y-2.5">
            {[
              { label: 'Contract Verified', ok: true },
              { label: 'Liquidity Locked', ok: true },
              { label: 'No Mint Function', ok: true },
              { label: 'Ownership Renounced', ok: false },
            ].map((check) => (
              <div key={check.label} className="flex items-center justify-between">
                <span className="text-xs text-text-secondary">{check.label}</span>
                {check.ok ? (
                  <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-accent-red" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Honeypot Detection */}
        <div className="bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
            </svg>
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
              Honeypot Detection
            </span>
          </div>
          <div className="w-14 h-14 rounded-full border-2 border-primary/30 bg-primary/10 flex items-center justify-center my-2">
            <svg className="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <p className="text-sm font-bold text-primary">PASSED</p>
          <p className="text-[9px] text-text-secondary uppercase tracking-wider">
            No Malicious Code Detected
          </p>
        </div>
      </div>

      {/* Whale Concentration */}
      <div className="bg-white/5 rounded-xl border border-white/5 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
              Whale Concentration
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xs font-bold text-white">Top 10 Holders:</span>
            <span className="text-xs font-bold text-primary">12.4%</span>
          </div>
        </div>
        {/* Bar chart */}
        <div className="flex items-end gap-2 h-20">
          {[65, 45, 30, 25, 20, 18, 15, 12, 10, 8].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-primary/40 rounded-t bar-dynamic-h"
              style={{ '--bar-h': `${h}%` } as React.CSSProperties}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[9px] text-text-secondary">TOP 1</span>
          <span className="text-[9px] text-text-secondary">TOP 5</span>
          <span className="text-[9px] text-text-secondary">TOP 10</span>
        </div>
      </div>
    </div>
  );
}
