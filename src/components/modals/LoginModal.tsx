'use client';

// ============================================
// LoginModal — Sign in popup
// ============================================
// Triggered from navbar "Sign In" button.
// Glass elevated modal with email/wallet connect options.
// ============================================

import { useState } from 'react';
import { HiOutlineX, HiOutlineMail, HiOutlineLockClosed, HiOutlineCube } from 'react-icons/hi';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with auth API
    console.log('Login:', { email, password });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-overlay animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 animate-scale-in">
        <div
          className="glass-elevated w-full max-w-sm p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-text-primary">Đăng nhập</h2>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-bg-elevated hover:text-text-primary"
              id="login-close-btn"
            >
              <HiOutlineX size={18} />
            </button>
          </div>

          {/* Wallet Connect */}
          <button
            className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl border border-border-glass bg-bg-elevated px-4 py-3 text-sm font-medium text-text-primary transition-all hover:border-border-glass-hover hover:shadow-card-hover"
            id="login-wallet-btn"
          >
            <HiOutlineCube size={20} className="text-accent-yellow" />
            Kết nối ví MetaMask
          </button>

          {/* Divider */}
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-border-glass" />
            <span className="text-xs text-text-muted">hoặc</span>
            <div className="h-px flex-1 bg-border-glass" />
          </div>

          {/* Email form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <div className="flex items-center gap-2 rounded-xl border border-border-glass bg-bg-elevated px-3 py-2.5 focus-within:border-primary focus-within:shadow-focus transition-all">
                <HiOutlineMail size={16} className="text-text-muted" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
                  id="login-email-input"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 rounded-xl border border-border-glass bg-bg-elevated px-3 py-2.5 focus-within:border-primary focus-within:shadow-focus transition-all">
                <HiOutlineLockClosed size={16} className="text-text-muted" />
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
                  id="login-password-input"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white transition-all hover:bg-primary-hover hover:shadow-card-hover"
              id="login-submit-btn"
            >
              Đăng nhập
            </button>
          </form>

          {/* Footer */}
          <p className="mt-4 text-center text-xs text-text-muted">
            Chưa có tài khoản?{' '}
            <button className="text-primary hover:underline" id="login-register-link">
              Đăng ký
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
