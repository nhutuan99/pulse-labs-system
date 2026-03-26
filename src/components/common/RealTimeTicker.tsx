'use client';

const tickerData = [
  { pair: 'BTC/USDT', price: '64,120.45', change: '+2.4%', up: true },
  { pair: 'ETH/USDT', price: '3,450.12', change: '+1.8%', up: true },
  { pair: 'SOL/USDT', price: '142.88', change: '-0.5%', up: false },
  { pair: 'Trend Index', price: 'Bullish', change: '84%', up: true },
  { pair: 'BTC/USDT', price: '64,120.45', change: '+2.4%', up: true },
  { pair: 'ETH/USDT', price: '3,450.12', change: '+1.8%', up: true },
];

export default function RealTimeTicker() {
  return (
    <div className="sticky top-20 z-40 w-full overflow-hidden border-y border-white/5 bg-[#191B21] py-3">
      <div className="animate-marquee flex w-max whitespace-nowrap">
        <div className="flex items-center gap-12 px-6">
          {tickerData.map((item, idx) => (
            <div key={`${item.pair}-${idx}`} className="flex items-center gap-4">
              <span className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
                {item.pair}
              </span>
              <span className="font-mono text-[11px] text-[#E2E2E9]">{item.price}</span>
              <span className={`text-[10px] ${item.up ? 'text-[#0ECB81]' : 'text-[#FFB4AB]'}`}>
                {item.change}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-12 px-6" aria-hidden>
          {tickerData.map((item, idx) => (
            <div key={`${item.pair}-${idx}-clone`} className="flex items-center gap-4">
              <span className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
                {item.pair}
              </span>
              <span className="font-mono text-[11px] text-[#E2E2E9]">{item.price}</span>
              <span className={`text-[10px] ${item.up ? 'text-[#0ECB81]' : 'text-[#FFB4AB]'}`}>
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
