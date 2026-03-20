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
import { Button, Input } from '@/components/base';

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
      <header className="nav-blur sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/5 px-6">
        <div className="flex items-center gap-10">
          {/* Mobile menu button */}
          <button
            className="text-text-secondary hover:text-text-primary flex h-8 w-8 items-center justify-center rounded-lg transition-colors xl:hidden"
            aria-label="Menu"
            id="nav-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <HiOutlineX size={18} /> : <HiOutlineMenuAlt2 size={18} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="bg-primary/20 border-primary/20 rounded-lg border p-1.5">
              <svg className="text-primary h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
              </svg>
            </div>
            <h1 className="text-lg font-extrabold tracking-tight uppercase">
              VIETNAM <span className="text-primary">TRENDING</span>
            </h1>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 xl:flex" id="nav-tabs">
            {navItems.map((item) => {
              const isActive =
                item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
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
              className="text-primary flex items-center gap-1.5 text-sm font-bold"
              id="nav-tab-vip"
            >
              ★ VIP SIGNALS
            </Link>
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="hidden md:block">
            <Input
              leftIcon={<HiOutlineSearch size={16} />}
              placeholder="Search assets..."
              type="text"
              id="nav-search-input"
              pill
              inputSize="sm"
              className="w-52"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="text-text-secondary hover:text-primary p-2 transition-colors"
              aria-label="Toggle theme"
              id="nav-theme-btn"
            >
              {isDark ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
            </button>

            {/* Notification (only when logged in) */}
            {isLoggedIn && (
              <button
                className="text-text-secondary hover:text-text-primary p-2 transition-colors"
                aria-label="Notifications"
                id="nav-notifications-btn"
              >
                <HiOutlineBell size={20} />
              </button>
            )}

            {/* Auth buttons */}
            {isLoggedIn ? (
              <Button
                variant="outline"
                size="sm"
                id="nav-wallet-btn"
                className="hidden sm:inline-flex"
              >
                <span className="bg-primary h-2 w-2 animate-pulse rounded-full" />
                0x71...4F2
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setShowLogin(true)}
                  id="nav-login-btn"
                  className="font-semibold"
                >
                  Login
                </Button>
                <Button size="md" id="nav-gopro-btn" className="shadow-lg">
                  Join Pro
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <nav className="nav-blur border-b border-white/5 px-6 pt-2 pb-3 xl:hidden">
          {navItems.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-text-primary bg-white/5'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/vip"
            onClick={() => setMobileMenuOpen(false)}
            className="text-primary block rounded-lg px-3 py-2 text-sm font-bold"
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
