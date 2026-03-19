'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HiOutlineMenuAlt2,
  HiOutlineBell,
  HiOutlineX,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineSearch,
} from 'react-icons/hi';
import LoginModal from '@/components/modals/LoginModal';
import { useTheme } from '@/providers/AppProvider';

const navItems = [
  { label: 'Markets', href: '/' },
  { label: 'Derivatives', href: '/derivatives' },
  { label: 'Order Flow', href: '/order-flow' },
  { label: 'Analysis', href: '/analysis' },
];

export default function TopNavbar() {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();
  const [showLogin, setShowLogin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // TODO: Replace with real auth state
  const isLoggedIn = false;

  return (
    <>
      <header className="nav-blur sticky top-0 z-50 border-b border-white/5 h-16 flex items-center px-6 justify-between">
        <div className="flex items-center gap-10">
          {/* Mobile menu button */}
          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary transition-colors hover:text-text-primary xl:hidden"
            aria-label="Menu"
            id="nav-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <HiOutlineX size={18} /> : <HiOutlineMenuAlt2 size={18} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="bg-primary/20 p-1.5 rounded-lg border border-primary/20">
              <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
              </svg>
            </div>
            <h1 className="font-extrabold text-lg tracking-tight uppercase">
              VIETNAM <span className="text-primary">TRENDING</span>
            </h1>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-8" id="nav-tabs">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                  }`}
                  id={`nav-tab-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="h-4 w-px bg-white/10" />
            <Link
              href="/vip"
              className="text-sm font-bold text-primary flex items-center gap-1.5"
              id="nav-tab-vip"
            >
              ★ VIP SIGNALS
            </Link>
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5 gap-2 focus-within:border-primary/50 transition-all">
            <HiOutlineSearch size={16} className="text-text-secondary" />
            <input
              className="bg-transparent border-none focus:ring-0 text-sm w-44 p-0 placeholder:text-text-muted outline-none"
              placeholder="Search assets..."
              type="text"
              id="nav-search-input"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-text-secondary hover:text-primary transition-colors"
              aria-label="Toggle theme"
              id="nav-theme-btn"
            >
              {isDark ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
            </button>

            {/* Notification (only when logged in) */}
            {isLoggedIn && (
              <button
                className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Notifications"
                id="nav-notifications-btn"
              >
                <HiOutlineBell size={20} />
              </button>
            )}

            {/* Auth buttons */}
            {isLoggedIn ? (
              <button
                className="hidden items-center gap-2 border border-white/10 bg-white/5 rounded-lg px-3 py-1.5 text-xs font-medium text-text-primary transition-colors hover:border-white/20 sm:flex"
                id="nav-wallet-btn"
              >
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                0x71...4F2
              </button>
            ) : (
              <>
                <button
                  onClick={() => setShowLogin(true)}
                  className="text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors"
                  id="nav-login-btn"
                >
                  Login
                </button>
                <button
                  className="bg-primary text-bg-app text-sm font-bold px-5 py-2 rounded-xl shadow-lg hover:brightness-110 transition-all"
                  id="nav-gopro-btn"
                >
                  Join Pro
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <nav className="nav-blur border-b border-white/5 px-6 pb-3 pt-2 xl:hidden">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-text-primary bg-white/5' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/vip"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm font-bold text-primary"
          >
            ★ VIP SIGNALS
          </Link>
        </nav>
      )}

      {/* Login Modal */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
