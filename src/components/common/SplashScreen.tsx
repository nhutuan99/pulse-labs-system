'use client';

// ============================================
// SplashScreen — Premium intro animation
// ============================================
// Fullscreen dark overlay with "Pulse Labs" logo
// that scales up from center with glow, then
// fades away to reveal the dashboard.
// ============================================

import { useState, useEffect } from 'react';

// Pre-generate deterministic particle data to avoid hydration mismatch
const PARTICLE_DATA = Array.from({ length: 20 }, (_, i) => ({
  w: ((i * 7 + 3) % 4) + 1,
  left: ((i * 37 + 11) % 100),
  top: ((i * 53 + 7) % 100),
  opacity: (((i * 13 + 5) % 30) + 10) / 100,
  duration: ((i * 11 + 3) % 3) + 2,
  delay: ((i * 17 + 1) % 20) / 10,
}));

export default function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<'intro' | 'glow' | 'exit' | 'done'>('intro');

  // First effect: mark as mounted (client-only)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Second effect: run animation after mount
  useEffect(() => {
    if (!mounted) return;

    // Skip splash if already shown this session
    if (sessionStorage.getItem('splash_shown')) {
      setPhase('done');
      return;
    }

    const t1 = setTimeout(() => setPhase('glow'), 400);
    const t2 = setTimeout(() => setPhase('exit'), 2200);
    const t3 = setTimeout(() => {
      setPhase('done');
      sessionStorage.setItem('splash_shown', '1');
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [mounted]);

  // Render nothing on server and before mount — avoids hydration mismatch
  if (!mounted || phase === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-700 splash-bg ${
        phase === 'exit' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {PARTICLE_DATA.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-splash-green/20 animate-float-particle"
            style={{
              '--particle-duration': `${p.duration}s`,
              '--particle-delay': `${p.delay}s`,
              width: `${p.w}px`,
              height: `${p.w}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              opacity: p.opacity,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Center logo group */}
      <div
        className={`relative flex flex-col items-center transition-all ${
          phase === 'intro'
            ? 'scale-50 opacity-0 duration-600'
            : phase === 'glow'
              ? 'scale-100 opacity-100 duration-800'
              : 'scale-110 opacity-0 duration-800'
        }`}
      >
        {/* Glow backdrop */}
        <div
          className={`absolute -inset-32 rounded-full splash-glow-backdrop transition-opacity duration-1000 ${
            phase === 'glow' ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Logo icon */}
        <div className="relative mb-4">
          <div
            className={`flex h-20 w-20 items-center justify-center rounded-2xl splash-logo-gradient transition-shadow duration-1000 ${
              phase === 'glow' ? 'splash-logo-glow' : 'shadow-none'
            }`}
          >
            <span className="text-4xl font-black text-white">P</span>
          </div>
        </div>

        {/* Text */}
        <h1
          className={`text-4xl font-black tracking-wider text-text-primary md:text-5xl transition-all duration-1000 ${
            phase === 'glow' ? 'splash-text-glow' : ''
          }`}
        >
          Pulse Labs
        </h1>

        {/* Tagline */}
        <p
          className={`mt-3 text-sm tracking-widest text-text-secondary transition-all duration-700 ${
            phase === 'glow' ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`}
        >
         TRADING INTELLIGENCE PLATFORM
        </p>

        {/* Loading bar */}
        <div className="mt-8 h-0.5 w-48 overflow-hidden rounded-full bg-bg-elevated">
          <div
            className={`h-full rounded-full splash-bar-gradient transition-all duration-[1800ms] ease-in-out ${
              phase === 'glow' ? 'w-full' : 'w-0'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
