'use client';

// ============================================
// Portfolio Page — (Stitch Screen 15/18)
// ============================================
// Balance hero, performance chart, asset allocation,
// holdings table, recent activity.
// ============================================

export default function PortfolioPage() {
  return (
    <div className="p-6 xl:p-8 max-w-[1600px] mx-auto w-full space-y-6">
      {/* Balance Hero */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold text-text-secondary uppercase tracking-widest mb-1">
            Tổng tài sản
          </p>
          <h1 className="text-5xl font-extrabold text-white tracking-tight">
            $124,582.40
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-lg border border-primary/20">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
              </svg>
              +12.5%
            </span>
            <span className="text-sm font-medium text-primary">+$1,250.00 Today</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white/5 border border-white/10 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-white/10 transition-all">
            Nạp tiền
          </button>
          <button className="bg-white/5 border border-white/10 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-white/10 transition-all">
            Rút tiền
          </button>
        </div>
      </div>

      {/* Performance Chart + Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart (col-span-2) */}
        <div className="lg:col-span-2 glass p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-white">Hiệu suất danh mục</h2>
              <p className="text-[10px] text-text-secondary">
                Tăng trưởng tài sản theo thời gian
              </p>
            </div>
            <div className="flex p-1 bg-white/5 rounded-lg border border-white/5">
              {['1W', '1M', '3M', 'All'].map((p) => (
                <button
                  key={p}
                  className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${
                    p === '1W'
                      ? 'bg-white/10 text-white shadow-sm'
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <svg className="w-full h-52" viewBox="0 0 700 200">
            <defs>
              <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Grid */}
            <line x1="0" y1="50" x2="700" y2="50" stroke="rgba(255,255,255,0.03)" />
            <line x1="0" y1="100" x2="700" y2="100" stroke="rgba(255,255,255,0.03)" />
            <line x1="0" y1="150" x2="700" y2="150" stroke="rgba(255,255,255,0.03)" />
            {/* Area */}
            <path
              d="M0 180 C70 165, 120 150, 180 140 S280 100, 350 90 S450 70, 500 80 S600 40, 700 30 L700 200 L0 200 Z"
              fill="url(#perfGrad)"
            />
            {/* Line */}
            <path
              d="M0 180 C70 165, 120 150, 180 140 S280 100, 350 90 S450 70, 500 80 S600 40, 700 30"
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* X-axis labels */}
            <text x="0" y="198" fill="rgba(148,163,184,0.6)" fontSize="10" fontFamily="monospace">
              15 MAY
            </text>
            <text x="170" y="198" fill="rgba(148,163,184,0.6)" fontSize="10" fontFamily="monospace">
              22 MAY
            </text>
            <text x="340" y="198" fill="rgba(148,163,184,0.6)" fontSize="10" fontFamily="monospace">
              29 MAY
            </text>
            <text x="510" y="198" fill="rgba(148,163,184,0.6)" fontSize="10" fontFamily="monospace">
              05 JUN
            </text>
            <text x="660" y="198" fill="rgba(148,163,184,0.6)" fontSize="10" fontFamily="monospace">
              TODAY
            </text>
          </svg>
        </div>

        {/* Asset Allocation */}
        <div className="glass p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white">Phân bổ tài sản</h2>
            <button className="text-[9px] font-bold text-text-secondary uppercase tracking-widest hover:text-white">
              Customize
            </button>
          </div>

          {/* Donut */}
          <div className="relative w-40 h-40 mx-auto mb-4">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              {(() => {
                const items = [
                  { pct: 40, color: '#F97316', colorClass: 'bg-accent-orange' },
                  { pct: 30, color: '#3B82F6', colorClass: 'bg-accent-blue' },
                  { pct: 20, color: '#10B981', colorClass: 'bg-primary' },
                  { pct: 10, color: '#94A3B8', colorClass: 'bg-text-secondary' },
                ];
                let offset = 0;
                return items.map((d, i) => {
                  const dashArray = (d.pct / 100) * 251.2;
                  const dashOffset = -offset;
                  offset += dashArray;
                  return (
                    <circle
                      key={i}
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
              <span className="text-2xl font-bold text-white">4</span>
              <span className="text-[8px] text-text-secondary uppercase tracking-wider">
                Main Assets
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { name: 'Bitcoin', pct: '40%', color: '#F97316', colorClass: 'bg-accent-orange' },
              { name: 'Ethereum', pct: '30%', color: '#3B82F6', colorClass: 'bg-accent-blue' },
              { name: 'Solana', pct: '20%', color: '#10B981', colorClass: 'bg-primary' },
              { name: 'Altcoins', pct: '10%', color: '#94A3B8', colorClass: 'bg-text-secondary' },
            ].map((a) => (
              <div key={a.name} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg border border-white/5 text-center justify-center flex-col">
                <div className={`w-2 h-2 rounded-full ${a.colorClass}`} />
                <span className="text-xs font-medium text-text-secondary">{a.name}</span>
                <span className="text-sm font-bold text-white">{a.pct}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Holdings + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Holdings Table (col-span-2) */}
        <div className="lg:col-span-2 glass p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white">Danh sách tài sản</h2>
            <div className="flex items-center bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 gap-2">
              <svg className="w-4 h-4 text-text-secondary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
              <input
                className="bg-transparent border-none focus:ring-0 text-sm w-32 p-0 placeholder:text-text-muted outline-none"
                placeholder="Search assets..."
                type="text"
              />
            </div>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-4 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                  Tài sản
                </th>
                <th className="px-4 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                  Số lượng
                </th>
                <th className="px-4 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                  Giá trị (USD)
                </th>
                <th className="px-4 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-widest text-right">
                  P&L 24H
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { icon: 'B', name: 'Bitcoin', ticker: 'BTC', amount: '1.24 BTC', value: '$78,240.12', pnl: '+2.45%', up: true, colorClass: 'bg-accent-orange' },
                { icon: 'E', name: 'Ethereum', ticker: 'ETH', amount: '8.50 ETH', value: '$28,450.00', pnl: '+1.12%', up: true, colorClass: 'bg-accent-blue' },
                { icon: 'S', name: 'Solana', ticker: 'SOL', amount: '120.00 SOL', value: '$14,580.00', pnl: '-0.85%', up: false, colorClass: 'bg-primary' },
              ].map((asset) => (
                <tr key={asset.ticker} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${asset.colorClass}`}
                      >
                        {asset.icon}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{asset.name}</p>
                        <p className="text-[10px] text-text-secondary">{asset.ticker}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-white font-mono">
                    {asset.amount}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-white font-mono">
                    {asset.value}
                  </td>
                  <td
                    className={`px-4 py-4 text-sm font-bold text-right ${
                      asset.up ? 'text-primary' : 'text-accent-red'
                    }`}
                  >
                    {asset.pnl}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Activity */}
        <div className="glass p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white">Hoạt động gần đây</h2>
            <button className="text-[9px] font-bold text-primary uppercase tracking-widest">
              Tất cả
            </button>
          </div>
          <div className="space-y-4">
            {[
              {
                icon: '↗',
                action: 'Mua SOL',
                detail: 'Vừa xong • $1,200.00',
                color: 'bg-primary/10 text-primary',
                badge: 'XONG',
                badgeColor: 'bg-primary text-bg-app',
              },
              {
                icon: '⇌',
                action: 'Swap BTC sang ETH',
                detail: '2 giờ trước • 0.05 BTC',
                color: 'bg-accent-blue-dim text-accent-blue',
                badge: 'XỬ LÝ',
                badgeColor: 'bg-accent-blue/20 text-accent-blue',
              },
              {
                icon: '↙',
                action: 'Bán PEPE',
                detail: 'Hôm qua • $540.00',
                color: 'bg-accent-red-dim text-accent-red',
                badge: 'XONG',
                badgeColor: 'bg-primary text-bg-app',
              },
            ].map((tx, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 ${tx.color}`}
                >
                  {tx.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white">{tx.action}</p>
                  <p className="text-[10px] text-text-secondary">{tx.detail}</p>
                </div>
                <span
                  className={`text-[8px] font-bold px-2 py-0.5 rounded uppercase ${tx.badgeColor}`}
                >
                  {tx.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
