'use client';

import { useState } from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'Ecosystem', href: '/' },
  { label: 'Archive', href: '/portfolio' },
  { label: 'Nodes', href: '/signals' },
  { label: 'Terminal', href: '/' },
];

export default function TopNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#080A0F]/60 shadow-2xl shadow-[#0ECB81]/5 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-360 items-center justify-between px-4 md:px-8">
          <Link href="/" className="text-xl font-bold tracking-tighter text-[#0ECB81]">
            TrendPulse
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {navItems.map((item, idx) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-medium tracking-tight transition-colors duration-300 ${
                  idx === 0 ? 'text-[#0ECB81]' : 'text-slate-400 hover:text-[#0ECB81]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="rounded border border-white/10 px-3 py-1.5 text-xs tracking-wider text-slate-300 uppercase md:hidden"
              aria-label="Toggle mobile navigation"
            >
              Menu
            </button>
            <Link
              href="/dashboard"
              className="rounded bg-[#0ECB81] px-5 py-2.5 text-sm font-semibold text-[#002111] transition-transform active:scale-95"
            >
              Launch App
            </Link>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <nav className="fixed top-20 z-40 w-full border-b border-white/5 bg-[#080A0F]/95 px-4 py-3 backdrop-blur md:hidden">
          <div className="mx-auto flex w-full max-w-360 flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-[#0ECB81]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </>
  );
}
