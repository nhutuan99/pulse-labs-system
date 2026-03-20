'use client';

// ============================================
// SplashScreen — Premium intro animation
// ============================================
// Fullscreen dark overlay with "Pulse Labs" logo
// that scales up from center with glow, then
// fades away to reveal the dashboard.
//
// CRITICAL: The overlay MUST render during SSR
// and initial hydration so it covers the page
// instantly on F5 — no flash of content beneath.
// ============================================

import { useState, useEffect } from 'react';

// Pre-generate deterministic particle data to avoid hydration mismatch
const PARTICLE_DATA = Array.from({ length: 20 }, (_, i) => ({
  w: ((i * 7 + 3) % 4) + 1,
  left: (i * 37 + 11) % 100,
  top: (i * 53 + 7) % 100,
  opacity: (((i * 13 + 5) % 30) + 10) / 100,
  duration: ((i * 11 + 3) % 3) + 2,
  delay: ((i * 17 + 1) % 20) / 10,
}));

export default function SplashScreen() {
  // Start with 'loading' universally (SSR-safe). The useEffect below
  // will resolve this to the correct phase after hydration.
  const [phase, setPhase] = useState<'loading' | 'intro' | 'glow' | 'exit' | 'done'>('loading');

  // Single orchestrating effect: runs once after hydration and drives
  // the entire animation sequence via nested timeouts.
  // This avoids chained [phase]-dependent effects which can be broken
  // by React Compiler optimisations or hydration edge-cases.
  useEffect(() => {
    // Already shown this session → skip instantly
    if (sessionStorage.getItem('splash_shown')) {
      queueMicrotask(() => setPhase('done'));
      return;
    }

    // Kick off the animation chain
    queueMicrotask(() => setPhase('intro'));

    const t1 = setTimeout(() => {
      setPhase('glow');

      const t2 = setTimeout(() => {
        setPhase('exit');

        const t3 = setTimeout(() => {
          setPhase('done');
          sessionStorage.setItem('splash_shown', '1');
        }, 800);

        // store for cleanup
        timers.push(t3);
      }, 1800);

      timers.push(t2);
    }, 400);

    const timers: ReturnType<typeof setTimeout>[] = [t1];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  // Only hide after animation finishes (or was skipped via sessionStorage)
  if (phase === 'done') return null;

  return (
    <div
      className={`splash-bg fixed inset-0 z-9999 flex items-center justify-center transition-opacity duration-700 ${
        phase === 'exit' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {PARTICLE_DATA.map((p, i) => (
          <div
            key={i}
            className="bg-splash-green/20 animate-float-particle absolute rounded-full"
            style={
              {
                '--particle-duration': `${p.duration}s`,
                '--particle-delay': `${p.delay}s`,
                width: `${p.w}px`,
                height: `${p.w}px`,
                left: `${p.left}%`,
                top: `${p.top}%`,
                opacity: p.opacity,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Center logo group */}
      <div
        className={`relative flex flex-col items-center transition-all ${
          phase === 'loading' || phase === 'intro'
            ? 'scale-50 opacity-0 duration-600'
            : phase === 'glow'
              ? 'scale-100 opacity-100 duration-800'
              : 'scale-110 opacity-0 duration-800'
        }`}
      >
        {/* Glow backdrop */}
        <div
          className={`splash-glow-backdrop absolute -inset-32 rounded-full transition-opacity duration-1000 ${
            phase === 'glow' ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Logo icon */}
        <div className="relative mb-4">
          <div
            className={`splash-logo-gradient flex h-20 w-20 items-center justify-center rounded-2xl transition-shadow duration-1000 ${
              phase === 'glow' ? 'splash-logo-glow' : 'shadow-none'
            }`}
          >
            <span className="text-4xl font-black text-white">P</span>
          </div>
        </div>

        {/* Text */}
        <h1
          className={`text-text-primary text-4xl font-black tracking-wider transition-all duration-1000 md:text-5xl ${
            phase === 'glow' ? 'splash-text-glow' : ''
          }`}
        >
          Pulse Labs
        </h1>

        {/* Tagline */}
        <p
          className={`text-text-secondary mt-3 text-sm tracking-widest transition-all duration-700 ${
            phase === 'glow' ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`}
        >
          TRADING INTELLIGENCE PLATFORM
        </p>

        {/* Loading bar */}
        <div className="bg-bg-elevated mt-8 h-0.5 w-48 overflow-hidden rounded-full">
          <div
            className={`splash-bar-gradient h-full rounded-full transition-all duration-[1800ms] ease-in-out ${
              phase === 'glow' ? 'w-full' : 'w-0'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
