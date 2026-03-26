'use client';

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
      <div className="mx-auto grid w-full max-w-400 grid-cols-1 gap-6 p-6 xl:grid-cols-12 xl:p-8">
        <div className="space-y-6 xl:col-span-3">
          <MarketStatusCard />
        </div>

        <div className="xl:col-span-6">
          <TrendingTable onTokenClick={(token) => setSelectedToken(token)} />
        </div>

        <div className="xl:col-span-3">
          <MarketSignalsPanel />
        </div>
      </div>

      {selectedToken && (
        <TokenDetailModal token={selectedToken} onClose={() => setSelectedToken(null)} />
      )}
    </>
  );
}
