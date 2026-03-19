'use client';

// ============================================
// TrendingTable — Center Column (Stitch Screen 3)
// ============================================
// glass card with time filter tabs, asset table
// with sparklines and score badges.
// ============================================

import { useState } from 'react';

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

const TIME_FILTERS = ['1H', '4H', '24H'];

interface TrendingTableProps {
  onTokenClick?: (token: TrendingToken) => void;
}

export default function TrendingTable({ onTokenClick }: TrendingTableProps) {
  const [activeFilter, setActiveFilter] = useState('1H');

  return (
    <div className="glass h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
            Trending Tokens
          </h3>
          <div className="flex p-1 bg-white/5 rounded-xl border border-white/5">
            {TIME_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 text-[10px] font-bold rounded-lg transition-all ${
                  activeFilter === f
                    ? 'bg-white/10 shadow-sm text-white'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5">
              <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                Asset
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest text-right">
                Price
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest text-right">
                24h Change
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest text-center">
                Trend
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest text-right">
                Score
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {MOCK_TOKENS.map((token) => (
              <tr
                key={token.pair}
                className="hover:bg-white/5 transition-colors cursor-pointer group"
                onClick={() => onTokenClick?.(token)}
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary group-hover:bg-primary group-hover:text-bg-app transition-all">
                      {token.symbol}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white uppercase tracking-tight">
                        {token.name}
                      </p>
                      <p className="text-[10px] text-text-secondary">{token.pair}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm font-medium text-right font-mono text-slate-300">
                  {token.price}
                </td>
                <td
                  className={`px-6 py-5 text-sm font-bold text-right ${
                    token.up ? 'text-primary' : 'text-accent-red'
                  }`}
                >
                  {token.change}
                </td>
                <td className="px-6 py-5 w-32">
                  <svg className="h-8 w-full" viewBox="0 0 100 30">
                    <path
                      className={token.up ? 'sparkline-up' : 'sparkline-down'}
                      d={token.sparklinePath}
                    />
                  </svg>
                </td>
                <td className="px-6 py-5 text-right">
                  <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-lg border border-primary/20">
                    {token.score}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t border-white/5 p-5 flex justify-center">
        <button className="text-primary text-[10px] font-bold uppercase tracking-widest hover:underline flex items-center gap-2">
          View Detailed Screener
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
