'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-[#080A0F] py-16">
      <div className="mx-auto flex w-full max-w-360 flex-col items-center gap-8 px-6 text-center">
        <div className="text-lg font-black tracking-widest text-white">TRENDPULSE ARCHITECT</div>
        <div className="flex flex-wrap justify-center gap-8">
          <Link
            className="font-mono text-xs tracking-wider text-slate-500 uppercase transition-colors hover:text-white"
            href="#"
          >
            Documentation
          </Link>
          <Link
            className="font-mono text-xs tracking-wider text-slate-500 uppercase transition-colors hover:text-white"
            href="#"
          >
            Security Audit
          </Link>
          <Link
            className="font-mono text-xs tracking-wider text-slate-500 uppercase transition-colors hover:text-white"
            href="#"
          >
            Github
          </Link>
          <Link
            className="font-mono text-xs tracking-wider text-slate-500 uppercase transition-colors hover:text-white"
            href="#"
          >
            Status
          </Link>
        </div>
        <p className="max-w-2xl font-mono text-xs tracking-wider text-slate-500 uppercase">
          © 2026 TRENDPULSE ARCHITECT. INSTITUTIONAL GRADE. ABSOLUTE STILLNESS.
        </p>
      </div>
    </footer>
  );
}
