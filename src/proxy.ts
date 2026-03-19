import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ============================================
// NextJS Proxy — Route Protection (Next.js 16)
// ============================================
// Public dashboard: all routes accessible without auth.
// Auth checks will be added when backend APIs are ready.
// ============================================

export default function proxy(request: NextRequest) {
  // All page routes are public — dashboard is viewable without login
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
