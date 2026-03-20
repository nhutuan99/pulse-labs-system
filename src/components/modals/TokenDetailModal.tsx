'use client';

// ============================================
// TokenDetailModal — 4-Tab Modal (Stitch Screens 5/2/7/4)
// ============================================
// Refactored to use base components:
// Modal, Button, Tabs, StatCard, Badge, CircularGauge, Avatar,
// ProgressBar, SectionHeader
// ============================================

import { useState } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import {
  Modal,
  Button,
  Tabs,
  StatCard,
  Badge,
  CircularGauge,
  Avatar,
  ProgressBar,
  SectionHeader,
} from '@/components/base';

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

const TAB_ITEMS = ['Tổng quan', 'Tokenomics', 'Social', 'Rủi ro'] as const;
type TabKey = (typeof TAB_ITEMS)[number];

export default function TokenDetailModal({ token, onClose }: TokenModalProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('Tổng quan');

  const customHeader = (
    <div className="p-6 pb-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar initials={token.symbol} size="lg" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">{token.symbol}</span>
              <span className="text-text-secondary text-sm">({token.symbol})</span>
              <Badge colorScheme="green" variant="solid" size="xs">
                Tăng trưởng
              </Badge>
            </div>
            <p className="text-text-secondary text-[10px] uppercase">Rank #30</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-text-secondary flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:text-white"
        >
          <HiOutlineX size={20} />
        </button>
      </div>

      <Tabs items={TAB_ITEMS} activeKey={activeTab} onChange={setActiveTab} />
    </div>
  );

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      size="lg"
      header={customHeader}
      footer={<Button fullWidth>XEM CHI TIẾT DỰ ÁN →</Button>}
    >
      {/* Tab Content */}
      <div className="p-6 pt-2">
        {activeTab === 'Tổng quan' && <OverviewTab token={token} />}
        {activeTab === 'Tokenomics' && <TokenomicsTab />}
        {activeTab === 'Social' && <SocialTab />}
        {activeTab === 'Rủi ro' && <RiskTab />}
      </div>
    </Modal>
  );
}

// ---- Tổng quan Tab (Screen 5) ----
function OverviewTab({ token }: { token: TokenModalProps['token'] }) {
  return (
    <div className="space-y-5">
      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-3">
        <StatCard label="GIÁ HIỆN TẠI" value={token.price} />
        <StatCard
          label="24H CHANGE"
          value={token.change}
          valueColor={token.up ? 'text-primary' : 'text-accent-red'}
        />
        <StatCard label="VOLUME 24H" value="$22.9M" />
        <StatCard label="MARKET CAP" value="$0" />
      </div>

      {/* Price Chart */}
      <div className="rounded-xl border border-white/5 bg-white/5 p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="text-primary h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" />
            </svg>
            <span className="text-sm font-bold text-white">{token.symbol} Price Chart</span>
          </div>
          <div className="flex rounded-lg bg-white/5 p-0.5">
            {['7d', '14d', '30d'].map((p) => (
              <button
                key={p}
                className={`rounded px-2.5 py-1 text-[10px] font-bold ${
                  p === '30d' ? 'bg-primary text-white' : 'text-text-secondary'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <svg className="h-32 w-full" viewBox="0 0 400 120">
          <line x1="0" y1="30" x2="400" y2="30" stroke="rgba(255,255,255,0.05)" />
          <line x1="0" y1="60" x2="400" y2="60" stroke="rgba(255,255,255,0.05)" />
          <line x1="0" y1="90" x2="400" y2="90" stroke="rgba(255,255,255,0.05)" />
          <path
            d="M0 100 C50 95, 80 90, 120 80 S180 40, 220 35 S280 45, 310 30 S360 50, 400 45"
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {[
            20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360,
            380,
          ].map((x, i) => (
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
        <div className="rounded-xl border border-white/5 bg-white/5 p-3">
          <div className="mb-2 flex items-center gap-1.5">
            <svg className="text-primary h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
            </svg>
            <SectionHeader className="!border-0 !pb-0">Trending Score</SectionHeader>
          </div>
          <div className="flex items-center justify-between">
            <ProgressBar value={86} className="mr-2 flex-1" />
            <span className="text-sm font-bold text-white">{token.score * 10}</span>
          </div>
        </div>
        <StatCard label="Social Score" value="Loading..." valueColor="text-text-secondary" />
        <StatCard label="Tokenomics" value="Loading..." valueColor="text-text-secondary" />
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
          <StatCard
            key={s.label}
            label={s.label}
            value={s.value}
            valueColor={s.highlight ? 'text-primary' : 'text-white'}
            sub={s.sub}
            subColor={s.highlight ? 'text-primary/80' : 'text-text-secondary'}
          />
        ))}
      </div>

      {/* Supply Distribution — Donut + Legend */}
      <div className="rounded-xl border border-white/5 bg-white/5 p-5">
        <div className="mb-4 flex items-center gap-2">
          <div className="bg-primary/10 flex h-7 w-7 items-center justify-center rounded-lg">
            <svg className="text-primary h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2.03 0v8.99H22c-.47-4.74-4.24-8.52-8.97-8.99zm0 11.01V22c4.74-.47 8.5-4.25 8.97-8.99h-8.97z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Supply Distribution</h4>
            <p className="text-text-secondary text-[9px] tracking-wider uppercase">
              Allocation Strategy
            </p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          {/* SVG Donut */}
          <div className="relative h-36 w-36 shrink-0">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
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
              <span className="text-text-secondary text-[8px] tracking-wider uppercase">
                Allocated
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 space-y-3">
            {distribution.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${d.colorClass}`} />
                  <span className="text-text-secondary text-xs font-medium">{d.name}</span>
                </div>
                <span className="text-sm font-bold text-white">{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vesting Schedule */}
      <div className="rounded-xl border border-white/5 bg-white/5 p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 flex h-7 w-7 items-center justify-center rounded-lg">
              <svg className="text-primary h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
              </svg>
            </div>
            <div>
              <span className="text-sm font-bold text-white">Vesting Schedule</span>
              <span className="text-text-secondary ml-1 text-[9px]">(24 Months)</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="bg-primary h-2 w-2 rounded-full" />
            <span className="text-text-secondary text-[9px] tracking-wider uppercase">
              Cumulative Unlocked
            </span>
          </div>
        </div>
        <svg className="h-24 w-full" viewBox="0 0 400 100">
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
        <div className="rounded-xl border border-white/5 bg-white/5 p-4 text-center">
          <SectionHeader className="mb-3 justify-center">Sentiment Score</SectionHeader>
          <CircularGauge
            value={75}
            size={96}
            strokeWidth={6}
            center={
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">75</span>
                <span className="text-primary text-[9px] font-bold uppercase">Bullish</span>
              </div>
            }
            className="mx-auto mb-2"
          />
          <div className="flex items-center justify-center gap-4 text-[10px]">
            <span className="flex items-center gap-1">
              <span className="bg-primary h-1.5 w-1.5 rounded-full" /> POS: 82%
            </span>
            <span className="flex items-center gap-1">
              <span className="bg-accent-red h-1.5 w-1.5 rounded-full" /> NEG: 18%
            </span>
          </div>
        </div>

        {/* Social Volume */}
        <div className="rounded-xl border border-white/5 bg-white/5 p-4">
          <div className="mb-3 flex items-center justify-between">
            <SectionHeader>Social Volume 24H</SectionHeader>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-white">12,482</span>
              <span className="text-primary text-[10px] font-bold">+12%</span>
            </div>
          </div>
          <svg className="h-20 w-full" viewBox="0 0 200 80">
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
      <div className="rounded-xl border border-white/5 bg-white/5 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <SectionHeader>Hot Tags:</SectionHeader>
          {[
            { tag: '#G-Token', scheme: 'green' as const },
            { tag: '#BTC', scheme: 'neutral' as const },
            { tag: '#Bullish', scheme: 'green' as const },
            { tag: '#VietnamWeb3', scheme: 'neutral' as const },
            { tag: '#Gem', scheme: 'neutral' as const },
            { tag: '#Correction', scheme: 'red' as const },
          ].map(({ tag, scheme }) => (
            <Badge key={tag} colorScheme={scheme} variant="outline" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Top Influencer Mentions */}
      <div>
        <SectionHeader className="mb-3">Top Influencer Mentions</SectionHeader>
        <div className="space-y-3">
          <div className="rounded-xl border border-white/5 bg-white/5 p-4">
            <div className="flex items-start gap-3">
              <Avatar
                initials="CK"
                size="md"
                colorScheme="green"
                className="shrink-0 rounded-full"
              />
              <div className="flex-1">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-bold text-white">CryptoKhang.eth</span>
                  <Badge colorScheme="green" variant="solid" size="xs">
                    Bullish
                  </Badge>
                </div>
                <p className="text-text-secondary text-[11px] leading-relaxed">
                  &ldquo;Đồ thị G đang có dấu hiệu tích lũy cực tốt tại vùng hỗ trợ mạnh. Target
                  ngắn hạn +30%. #G-Token #CryptoVN&rdquo;
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/5 p-4">
            <div className="flex items-start gap-3">
              <Avatar
                initials="WA"
                size="md"
                colorScheme="neutral"
                className="shrink-0 rounded-full"
              />
              <div className="flex-1">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-bold text-white">WhaleAlert_VN</span>
                  <Badge colorScheme="neutral" variant="solid" size="xs">
                    Neutral
                  </Badge>
                </div>
                <p className="text-text-secondary text-[11px] leading-relaxed">
                  &ldquo;Khối lượng giao dịch mạng xã hội của G tăng vọt 200% trong 4 giờ qua. Sự
                  chú ý đang đổ dồn vào đây.&rdquo;
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
      <div className="rounded-xl border border-white/5 bg-white/5 p-5">
        <SectionHeader className="mb-1">Risk Assessment</SectionHeader>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Medium-Low</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-primary text-2xl font-bold">24</span>
            <span className="text-text-secondary text-sm">/100</span>
          </div>
        </div>
        {/* Risk bar */}
        <div className="flex h-2 overflow-hidden rounded-full">
          <div className="bg-primary w-1/3" />
          <div className="bg-accent-yellow w-1/3" />
          <div className="bg-accent-red w-1/3" />
        </div>
        <div className="mt-1 flex justify-between">
          <span className="text-primary text-[9px] font-bold">LOW</span>
          <span className="text-accent-yellow text-[9px] font-bold">MEDIUM</span>
          <span className="text-accent-red text-[9px] font-bold">HIGH</span>
        </div>
      </div>

      {/* Safety Checks + Honeypot */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/5 bg-white/5 p-4">
          <div className="mb-3 flex items-center gap-2">
            <svg className="text-primary h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
            </svg>
            <SectionHeader>Safety Checks</SectionHeader>
          </div>
          <div className="space-y-2.5">
            {[
              { label: 'Contract Verified', ok: true },
              { label: 'Liquidity Locked', ok: true },
              { label: 'No Mint Function', ok: true },
              { label: 'Ownership Renounced', ok: false },
            ].map((check) => (
              <div key={check.label} className="flex items-center justify-between">
                <span className="text-text-secondary text-xs">{check.label}</span>
                {check.ok ? (
                  <svg className="text-primary h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                ) : (
                  <svg className="text-accent-red h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Honeypot Detection */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-white/5 bg-white/5 p-4 text-center">
          <div className="mb-3 flex items-center gap-2">
            <svg className="text-primary h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
            </svg>
            <SectionHeader>Honeypot Detection</SectionHeader>
          </div>
          <div className="border-primary/30 bg-primary/10 my-2 flex h-14 w-14 items-center justify-center rounded-full border-2">
            <svg className="text-primary h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <p className="text-primary text-sm font-bold">PASSED</p>
          <p className="text-text-secondary text-[9px] tracking-wider uppercase">
            No Malicious Code Detected
          </p>
        </div>
      </div>

      {/* Whale Concentration */}
      <div className="rounded-xl border border-white/5 bg-white/5 p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="text-primary h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
            <SectionHeader>Whale Concentration</SectionHeader>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xs font-bold text-white">Top 10 Holders:</span>
            <span className="text-primary text-xs font-bold">12.4%</span>
          </div>
        </div>
        <div className="flex h-20 items-end gap-2">
          {[65, 45, 30, 25, 20, 18, 15, 12, 10, 8].map((h, i) => (
            <div
              key={i}
              className="bg-primary/40 bar-dynamic-h flex-1 rounded-t"
              style={{ '--bar-h': `${h}%` } as React.CSSProperties}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between">
          <span className="text-text-secondary text-[9px]">TOP 1</span>
          <span className="text-text-secondary text-[9px]">TOP 5</span>
          <span className="text-text-secondary text-[9px]">TOP 10</span>
        </div>
      </div>
    </div>
  );
}
