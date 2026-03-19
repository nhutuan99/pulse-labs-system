'use client';

// ============================================
// Dashboard — Main Page (Stitch Screen 3)
// ============================================
// 3-column grid-cols-12 layout: 3 + 6 + 3
// Left: MarketStatusCard
// Center: TrendingTable
// Right: MarketSignalsPanel
// ============================================

import { useState } from 'react';
import MarketStatusCard from '@/components/market/MarketStatusCard';
import TrendingTable from '@/components/trending/TrendingTable';
import MarketSignalsPanel from '@/components/signals/MarketSignalsPanel';
import TokenDetailModal from '@/components/modals/TokenDetailModal';

export default function DashboardPage() {
  const [selectedToken, setSelectedToken] = useState<{
    symbol: string;
    name: string;
    pair: string;
    price: string;
    change: string;
    up: boolean;
    score: number;
  } | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 p-6 xl:p-8 max-w-[1600px] mx-auto w-full">
        {/* Left Column — Market Status */}
        <div className="xl:col-span-3 space-y-6">
          <MarketStatusCard />
        </div>

        {/* Center Column — Trending Tokens */}
        <div className="xl:col-span-6">
          <TrendingTable
            onTokenClick={(token) => setSelectedToken(token)}
          />
        </div>

        {/* Right Column — Market Signals */}
        <div className="xl:col-span-3">
          <MarketSignalsPanel />
        </div>
      </div>

      {/* Token Detail Modal */}
      {selectedToken && (
        <TokenDetailModal
          token={selectedToken}
          onClose={() => setSelectedToken(null)}
        />
      )}
    </>
  );
}
