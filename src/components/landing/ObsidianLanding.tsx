const statsRibbon = [
  { pair: 'BTC/USDT', price: '64,120.45', change: '+2.4%', up: true },
  { pair: 'ETH/USDT', price: '3,450.12', change: '+1.8%', up: true },
  { pair: 'SOL/USDT', price: '142.88', change: '-0.5%', up: false },
  { pair: 'Trend Index', price: 'Bullish', change: '84%', up: true },
];

const featureCards = [
  {
    title: 'Phase Detector',
    desc: 'Contextual action suggestions based on real-time market phases.',
  },
  {
    title: 'Trend Screener',
    desc: 'Deep analysis of on-chain metrics across all major networks.',
  },
  {
    title: 'Live Signals',
    desc: 'Identify smart-money accumulation zones as they happen.',
  },
];

const wallets = [
  { name: 'Wallets Monitored', value: '2.4M+' },
  { name: 'Total Volume Scanned', value: '$14.2B' },
];

const portfolioRows = [
  { asset: 'BTC', balance: '1.248', price: '$68,430', value: '$85,402' },
  { asset: 'ETH', balance: '18.42', price: '$3,451', value: '$63,557' },
  { asset: 'SOL', balance: '520.6', price: '$142.8', value: '$74,341' },
  { asset: 'LINK', balance: '1,245', price: '$16.02', value: '$19,945' },
];

export default function ObsidianLanding() {
  return (
    <div className="bg-[#080A0F] text-[#E2E2E9]">
      <section className="relative min-h-[86vh] overflow-hidden px-6 pt-28 pb-20 md:px-12 lg:px-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 h-175 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0ECB81]/10 blur-[130px]" />
        </div>

        <div className="relative mx-auto grid w-full max-w-360 items-center gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-7">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#0ECB81]/20 bg-[#0ECB81]/10 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0ECB81]" />
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#0ECB81] uppercase">
                Section 0: Hero CTA
              </p>
            </div>
            <h1 className="text-5xl leading-[0.95] font-black tracking-tight md:text-7xl lg:text-8xl">
              Market intelligence.
              <span className="block text-[#0ECB81]">Institutional speed.</span>
            </h1>
            <p className="max-w-2xl text-lg text-[#BBCABD] md:text-xl">
              The ultimate terminal for crypto trends, on-chain sentiment, live execution signals,
              and automated action plans.
            </p>
            <div className="flex max-w-xl flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Institutional email address..."
                className="h-14 flex-1 border-b-2 border-[#3C4A40]/50 bg-[#0C0E13] px-5 font-mono text-sm outline-none placeholder:text-slate-600 focus:border-[#0ECB81]"
              />
              <button className="h-14 bg-[#0ECB81] px-7 text-sm font-bold tracking-widest text-[#002111] uppercase transition hover:brightness-110">
                Sign Up
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-[#141820]/70 p-4 backdrop-blur lg:col-span-5">
            <p className="mb-3 font-mono text-[10px] tracking-[0.2em] text-[#0ECB81] uppercase">
              Core Terminal Preview
            </p>
            <div className="grid h-70 grid-cols-12 gap-1 rounded-md bg-[#0C0E13] p-3">
              {Array.from({ length: 48 }).map((_, idx) => (
                <div
                  key={idx}
                  className={`rounded-sm ${idx % 5 === 0 ? 'bg-[#0ECB81]/70' : idx % 7 === 0 ? 'bg-red-400/60' : 'bg-[#0ECB81]/20'}`}
                  style={{ height: `${20 + (idx % 9) * 8}%`, alignSelf: 'end' }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-white/10 bg-[#11141B] py-3">
        <div className="mx-auto flex w-full max-w-360 flex-wrap items-center gap-8 px-6 md:px-12 lg:px-24">
          {statsRibbon.map((item) => (
            <div key={item.pair} className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
                {item.pair}
              </span>
              <span className="font-mono text-xs text-[#E2E2E9]">{item.price}</span>
              <span className={`text-[11px] ${item.up ? 'text-[#0ECB81]' : 'text-[#FF8E89]'}`}>
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      <section className="mx-auto grid w-full max-w-360 gap-8 px-6 py-24 md:px-12 lg:grid-cols-12 lg:px-24">
        <div className="space-y-7 lg:col-span-5">
          <p className="font-mono text-[10px] tracking-[0.2em] text-[#0ECB81] uppercase">
            Section 1: Core Terminal
          </p>
          <h2 className="text-4xl leading-tight font-black md:text-6xl">
            Know the phase.
            <span className="block text-[#0ECB81]">Execute the trade.</span>
          </h2>
          <p className="text-[#BBCABD]">
            Detect market cycles instantly. Spot trending tokens. Snipe accumulation zones before
            breakout.
          </p>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {featureCards.map((card) => (
              <article
                key={card.title}
                className="rounded-lg border-l-2 border-transparent bg-[#171B22] p-4 transition hover:border-[#0ECB81] hover:bg-[#1E232B]"
              >
                <h3 className="mb-1 text-sm font-bold">{card.title}</h3>
                <p className="text-xs text-[#BBCABD]">{card.desc}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-white/5 bg-[#151923]/80 p-6 lg:col-span-7">
          <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-[#0ECB81] uppercase">
            Section 1 Terminal Canvas
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg bg-[#0C0E13] p-4">
              <p className="text-xs text-slate-400">BTC/USDT</p>
              <p className="font-mono text-2xl text-[#0ECB81]">$68,432.12</p>
              <p className="mt-1 text-xs text-[#0ECB81]">+4.25%</p>
            </div>
            <div className="rounded-lg bg-[#0C0E13] p-4">
              <p className="text-xs text-slate-400">Signal</p>
              <p className="font-mono text-sm text-[#0ECB81]">BULLISH: ACCUMULATION ZONE</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-360 gap-6 px-6 pb-24 md:px-12 lg:grid-cols-12 lg:px-24">
        <div className="space-y-6 lg:col-span-5">
          <p className="font-mono text-[10px] tracking-[0.2em] text-[#0ECB81] uppercase">
            Section 2: On-chain Analyst
          </p>
          <h2 className="text-4xl leading-tight font-black md:text-6xl">
            Look beneath the surface.
          </h2>
          <p className="text-[#BBCABD]">
            Track whale accumulation, exchange netflow, and contract risk with institutional-grade
            on-chain visibility.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {wallets.map((item) => (
              <div
                key={item.name}
                className="rounded-lg border-l-2 border-[#0ECB81] bg-[#171B22] p-5"
              >
                <p className="font-mono text-2xl font-bold text-[#0ECB81]">{item.value}</p>
                <p className="mt-1 font-mono text-[10px] tracking-widest text-slate-500 uppercase">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-white/5 bg-[#171B22] p-6 lg:col-span-7">
          <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-[#0ECB81] uppercase">
            Whale Movement Monitor
          </p>
          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between rounded bg-[#0F1219] p-3">
              <span>0x7a...4e1f</span>
              <span>5,420 ETH to Coinbase</span>
              <span className="text-slate-500">1m ago</span>
            </div>
            <div className="flex items-center justify-between rounded border-l-2 border-[#0ECB81] bg-[#0ECB81]/10 p-3">
              <span>Binance</span>
              <span className="text-[#0ECB81]">12,500,000 USDT to 0x3d...2a9b</span>
              <span className="text-slate-400">4m ago</span>
            </div>
            <div className="flex items-center justify-between rounded bg-[#0F1219] p-3">
              <span>Kraken</span>
              <span>1.2k BTC to Hardware Wallet</span>
              <span className="text-slate-500">12m ago</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-360 gap-8 px-6 pb-24 md:px-12 lg:grid-cols-12 lg:px-24">
        <div className="space-y-6 lg:col-span-5">
          <p className="font-mono text-[10px] tracking-[0.2em] text-[#0ECB81] uppercase">
            Section 3: Portfolio Tracker
          </p>
          <h2 className="text-4xl leading-tight font-black md:text-6xl">
            Your entire net worth. Unified.
          </h2>
          <p className="text-[#BBCABD]">
            Connect wallets, track PnL, monitor asset exposure, and rebalance multi-chain positions
            from one screen.
          </p>
          <button className="h-12 rounded-md bg-[#0ECB81] px-6 text-sm font-bold tracking-wide text-[#002111]">
            COMING SOON - NOTIFY ME
          </button>
        </div>
        <div className="rounded-xl border border-white/5 bg-[#171B22] p-6 lg:col-span-7">
          <div className="mb-5 flex items-center justify-between">
            <p className="font-mono text-[10px] tracking-[0.2em] text-slate-500 uppercase">
              Portfolio V2
            </p>
            <p className="font-mono text-[11px] text-[#0ECB81]">0x71C...8E34</p>
          </div>
          <p className="font-mono text-3xl font-bold text-[#0ECB81]">+$42,840.12</p>
          <p className="mb-5 font-mono text-xs text-[#0ECB81]">+12.4% today</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-140 font-mono text-xs">
              <thead>
                <tr className="border-b border-white/10 text-slate-500">
                  <th className="py-2 text-left font-normal">Asset</th>
                  <th className="py-2 text-right font-normal">Balance</th>
                  <th className="py-2 text-right font-normal">Price</th>
                  <th className="py-2 text-right font-normal">Value</th>
                </tr>
              </thead>
              <tbody>
                {portfolioRows.map((row) => (
                  <tr key={row.asset} className="border-b border-white/5">
                    <td className="py-3">{row.asset}</td>
                    <td className="py-3 text-right">{row.balance}</td>
                    <td className="py-3 text-right">{row.price}</td>
                    <td className="py-3 text-right">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-360 gap-8 px-6 pb-24 md:px-12 lg:grid-cols-12 lg:px-24">
        <div className="space-y-6 lg:col-span-5">
          <p className="font-mono text-[10px] tracking-[0.2em] text-[#0ECB81] uppercase">
            Section 4: Smart Tasks
          </p>
          <h2 className="text-4xl leading-tight font-black md:text-6xl">
            Do not just track.
            <span className="block text-[#0ECB81]">Act.</span>
          </h2>
          <p className="text-[#BBCABD]">
            Automated actions for take-profit, rebalance, and stop-loss based on your exact
            portfolio profile.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:col-span-7">
          <article className="rounded-lg border-l-2 border-[#0ECB81] bg-[#171B22] p-5">
            <p className="font-mono text-[10px] tracking-widest text-[#0ECB81] uppercase">
              Automated Trigger
            </p>
            <h3 className="mt-1 text-xl font-bold">Take Profit</h3>
            <p className="mt-3 text-sm text-[#BBCABD]">ETH/USDT reaches +24.5% yield.</p>
          </article>
          <article className="rounded-lg border-l-2 border-[#90D5B7] bg-[#171B22] p-5">
            <p className="font-mono text-[10px] tracking-widest text-[#90D5B7] uppercase">
              Smart Rebalance
            </p>
            <h3 className="mt-1 text-xl font-bold">Rebalance</h3>
            <p className="mt-3 text-sm text-[#BBCABD]">Sell BTC -5.2%, Buy SOL +5.2%.</p>
          </article>
          <article className="rounded-lg border-l-2 border-[#FF8E89] bg-[#171B22] p-5 md:col-span-2">
            <p className="font-mono text-[10px] tracking-widest text-[#FF8E89] uppercase">
              Risk Mitigation
            </p>
            <h3 className="mt-1 text-xl font-bold">Automated Stop Loss</h3>
            <p className="mt-3 text-sm text-[#BBCABD]">
              Trigger protection when volatility exceeds 15% in one hour.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-360 gap-8 px-6 pb-24 md:px-12 lg:grid-cols-12 lg:px-24">
        <div className="space-y-6 lg:col-span-5">
          <p className="font-mono text-[10px] tracking-[0.2em] text-[#0ECB81] uppercase">
            Section 5: Wallet Tracker Bot
          </p>
          <h2 className="text-4xl leading-tight font-black md:text-6xl">
            Follow the smart money. Automatically.
          </h2>
          <p className="text-[#BBCABD]">
            Deploy stealth bots in seconds and receive sub-100ms alerts the moment tracked wallets
            execute transactions.
          </p>
        </div>
        <div className="rounded-xl border border-[#0ECB81]/25 bg-black p-5 font-mono text-[13px] leading-relaxed lg:col-span-7">
          <p className="mb-2 text-[#0ECB81]">[SYSTEM] Initializing wallet monitoring module...</p>
          <p className="mb-2 text-[#0ECB81]">[SYSTEM] Connecting to Mainnet RPC...</p>
          <p className="mb-5 text-[#27C93F]">[SUCCESS] Scanning 1,248 whale wallets.</p>
          <div className="mb-4 rounded border-l-2 border-[#0ECB81] bg-[#0ECB81]/10 p-3">
            <p className="mb-1 font-bold text-[#0ECB81]">WHALE ALERT</p>
            <p className="text-[#E2E2E9]">0x7a25...f61d swapped 250 ETH to USDT (Uniswap V3)</p>
          </div>
          <p className="text-slate-400">Waiting for next transaction signal...</p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-360 gap-8 px-6 pb-28 md:px-12 lg:grid-cols-12 lg:px-24">
        <div className="space-y-6 lg:col-span-5">
          <p className="font-mono text-[10px] tracking-[0.2em] text-[#0ECB81] uppercase">
            Section 6: Meme Dashboard
          </p>
          <h2 className="text-4xl leading-tight font-black md:text-6xl">
            Survive the trenches.
            <span className="block text-[#0ECB81]">Filter the noise.</span>
          </h2>
          <p className="text-[#BBCABD]">
            Liquidity tracking, contract safety checks, and social heat scoring for high-volatility
            memecoin markets.
          </p>
        </div>
        <div className="rounded-xl border border-white/5 bg-[#171B22] p-6 lg:col-span-7">
          <div className="mb-4 border-l-2 border-[#0ECB81] bg-[#0F1219] p-4">
            <p className="text-xl font-bold">$PEPE-TERMINATOR</p>
            <p className="font-mono text-[11px] text-slate-500">0x71C...438F (SOLANA)</p>
            <p className="mt-2 font-mono text-[#0ECB81]">$0.000412 (+1,240.2%)</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded bg-[#0F1219] p-4">
              <p className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
                Social Sentiment
              </p>
              <p className="mt-2 font-mono text-4xl font-bold">88</p>
              <div className="mt-3 h-1.5 w-full bg-white/10">
                <div className="h-full w-[88%] bg-[#0ECB81]" />
              </div>
            </div>
            <div className="rounded bg-[#0F1219] p-4">
              <p className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
                HoneyPot Check
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                <li className="flex justify-between">
                  <span>Sell Tax</span>
                  <span className="text-[#0ECB81]">2.0%</span>
                </li>
                <li className="flex justify-between">
                  <span>Owner Renounced</span>
                  <span className="text-[#0ECB81]">Yes</span>
                </li>
                <li className="flex justify-between">
                  <span>Liquidity Locked</span>
                  <span className="text-[#0ECB81]">98.2%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
