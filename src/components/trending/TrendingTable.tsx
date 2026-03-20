'use client';

// ============================================
// TrendingTable — Center Column (Stitch Screen 3)
// ============================================
// Refactored to use base components:
// Tabs, Badge, Button, Avatar
// ============================================

import { useState } from 'react';
import { Tabs, Badge, Button, Avatar } from '@/components/base';

interface TrendingToken {
  symbol: string;
  name: string;
  pair: string;
  price: string;
  change: string;
  up: boolean;
  score: number;
  sparklinePath: string;
}

const MOCK_TOKENS: TrendingToken[] = [
  {
    symbol: 'D',
    name: 'DENT',
    pair: 'DENT/USDT',
    price: '$0.000672',
    change: '+12.45%',
    up: true,
    score: 9.2,
    sparklinePath: 'M0 25 L10 20 L20 22 L30 15 L40 18 L50 10 L60 12 L70 5 L80 8 L90 2 L100 5',
  },
  {
    symbol: 'A',
    name: 'AXELAR',
    pair: 'AXL/USDT',
    price: '$0.8423',
    change: '+5.21%',
    up: true,
    score: 8.5,
    sparklinePath: 'M0 20 L15 18 L30 12 L45 15 L60 5 L75 8 L100 2',
  },
  {
    symbol: 'V',
    name: 'VNTR',
    pair: 'VNTR/USDT',
    price: '$0.0054',
    change: '+57.19%',
    up: true,
    score: 8.6,
    sparklinePath: 'M0 28 L15 25 L25 20 L35 22 L50 15 L65 8 L80 12 L100 3',
  },
  {
    symbol: 'G',
    name: 'G TOKEN',
    pair: 'G/USDT',
    price: '$0.0098',
    change: '+23.45%',
    up: true,
    score: 7.8,
    sparklinePath: 'M0 22 L20 18 L40 20 L60 12 L80 15 L100 8',
  },
  {
    symbol: 'P',
    name: 'PEPE',
    pair: 'PEPE/USDT',
    price: '$0.000012',
    change: '-3.21%',
    up: false,
    score: 6.4,
    sparklinePath: 'M0 5 L20 8 L40 12 L60 15 L80 20 L100 25',
  },
];

const TIME_FILTERS = ['1H', '4H', '24H'] as const;

interface TrendingTableProps {
  onTokenClick?: (token: TrendingToken) => void;
}

export default function TrendingTable({ onTokenClick }: TrendingTableProps) {
  const [activeFilter, setActiveFilter] = useState<(typeof TIME_FILTERS)[number]>('1H');

  return (
    <div className="glass flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 p-6">
        <div className="flex items-center gap-8">
          <h3 className="text-xs font-bold tracking-[0.2em] text-white uppercase">
            Trending Tokens
          </h3>
          <Tabs
            items={TIME_FILTERS}
            activeKey={activeFilter}
            onChange={setActiveFilter}
            variant="pill"
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-text-secondary px-6 py-4 text-[10px] font-bold tracking-widest uppercase">
                Asset
              </th>
              <th className="text-text-secondary px-6 py-4 text-right text-[10px] font-bold tracking-widest uppercase">
                Price
              </th>
              <th className="text-text-secondary px-6 py-4 text-right text-[10px] font-bold tracking-widest uppercase">
                24h Change
              </th>
              <th className="text-text-secondary px-6 py-4 text-center text-[10px] font-bold tracking-widest uppercase">
                Trend
              </th>
              <th className="text-text-secondary px-6 py-4 text-right text-[10px] font-bold tracking-widest uppercase">
                Score
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {MOCK_TOKENS.map((token) => (
              <tr
                key={token.pair}
                className="group cursor-pointer transition-colors hover:bg-white/5"
                onClick={() => onTokenClick?.(token)}
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <Avatar
                      initials={token.symbol}
                      size="md"
                      className="group-hover:bg-primary group-hover:text-bg-app group-hover:border-primary transition-all"
                    />
                    <div>
                      <p className="text-sm font-bold tracking-tight text-white uppercase">
                        {token.name}
                      </p>
                      <p className="text-text-secondary text-[10px]">{token.pair}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-right font-mono text-sm font-medium text-slate-300">
                  {token.price}
                </td>
                <td
                  className={`px-6 py-5 text-right text-sm font-bold ${
                    token.up ? 'text-primary' : 'text-accent-red'
                  }`}
                >
                  {token.change}
                </td>
                <td className="w-32 px-6 py-5">
                  <svg className="h-8 w-full" viewBox="0 0 100 30">
                    <path
                      className={token.up ? 'sparkline-up' : 'sparkline-down'}
                      d={token.sparklinePath}
                    />
                  </svg>
                </td>
                <td className="px-6 py-5 text-right">
                  <Badge
                    colorScheme="green"
                    variant="outline"
                    size="sm"
                    className="rounded-lg px-3 py-1"
                  >
                    {token.score}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-center border-t border-white/5 p-5">
        <Button variant="ghost" size="xs" className="text-primary tracking-widest uppercase">
          View Detailed Screener
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
