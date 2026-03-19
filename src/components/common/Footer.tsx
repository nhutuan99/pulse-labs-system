'use client';

// ============================================
// Footer — Vietnam Trending (Stitch Prototype)
// ============================================
// Matches exact prototype footer from Screen 3/16/17.
// ============================================

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="h-14 border-t border-white/5 nav-blur flex items-center px-6 justify-between text-[11px] text-text-secondary font-medium">
      <div className="flex items-center gap-6">
        <span className="uppercase tracking-widest font-bold">
          © 2026 VIETNAM TRENDING
        </span>
        <div className="flex items-center gap-2 text-primary/80">
          <span className="w-4 h-4 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </span>
          <span className="uppercase">Data Node: SG-01 Active</span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-8 uppercase tracking-widest">
        <Link href="/privacy" className="hover:text-text-primary transition-colors">
          Privacy
        </Link>
        <Link href="/legal" className="hover:text-text-primary transition-colors">
          Legal
        </Link>
        <Link href="/api" className="hover:text-text-primary transition-colors">
          API Status
        </Link>
        <Link
          href="/pro"
          className="text-primary font-bold bg-primary/10 px-3 py-1 rounded-full"
        >
          Go Premium
        </Link>
      </div>
    </footer>
  );
}
