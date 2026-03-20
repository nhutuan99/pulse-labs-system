'use client';

// ============================================
// LoginModal — Sign in popup
// ============================================
// Refactored to use base components:
// Modal, Button, Input
// ============================================

import { useState } from 'react';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineCube } from 'react-icons/hi';
import { Modal, Button, Input } from '@/components/base';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with auth API
    console.log('Login:', { email, password });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" title="Đăng nhập">
      <div className="space-y-4 px-6 pb-6">
        {/* Wallet Connect */}
        <Button
          variant="secondary"
          fullWidth
          leftIcon={<HiOutlineCube size={20} className="text-accent-yellow" />}
          id="login-wallet-btn"
        >
          Kết nối ví MetaMask
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="bg-border-glass h-px flex-1" />
          <span className="text-text-muted text-xs">hoặc</span>
          <div className="bg-border-glass h-px flex-1" />
        </div>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            leftIcon={<HiOutlineMail size={16} />}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="login-email-input"
          />
          <Input
            leftIcon={<HiOutlineLockClosed size={16} />}
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="login-password-input"
          />
          <Button type="submit" fullWidth id="login-submit-btn">
            Đăng nhập
          </Button>
        </form>

        {/* Footer */}
        <p className="text-text-muted text-center text-xs">
          Chưa có tài khoản?{' '}
          <button className="text-primary hover:underline" id="login-register-link">
            Đăng ký
          </button>
        </p>
      </div>
    </Modal>
  );
}
