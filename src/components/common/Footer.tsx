'use client';

// ============================================
// Footer — Vietnam Trending (Stitch Prototype)
// ============================================
// Refactored to use base components: Button
// ============================================

import Link from 'next/link';
import { Button } from '@/components/base';

export default function Footer() {
  return (
    <footer className="nav-blur text-text-secondary flex h-14 items-center justify-between border-t border-white/5 px-6 text-[11px] font-medium">
      <div className="flex items-center gap-6">
        <span className="font-bold tracking-widest uppercase">© 2026 VIETNAM TRENDING</span>
        <div className="text-primary/80 flex items-center gap-2">
          <span className="flex h-4 w-4 items-center justify-center">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </span>
          <span className="uppercase">Data Node: SG-01 Active</span>
        </div>
      </div>

      <div className="hidden items-center gap-8 tracking-widest uppercase md:flex">
        <Link href="/privacy" className="hover:text-text-primary transition-colors">
          Privacy
        </Link>
        <Link href="/legal" className="hover:text-text-primary transition-colors">
          Legal
        </Link>
        <Link href="/api" className="hover:text-text-primary transition-colors">
          API Status
        </Link>
        <Link href="/pro">
          <Button
            variant="ghost"
            size="xs"
            className="text-primary bg-primary/10 rounded-full px-3 py-1 font-bold"
          >
            Go Premium
          </Button>
        </Link>
      </div>
    </footer>
  );
}
