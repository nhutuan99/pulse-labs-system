'use client';

// ============================================
// Modal — Standardized modal wrapper
// ============================================
// Single source of truth for all modal UI:
// backdrop, panel, close button, animation,
// body-scroll lock, and size variants.
//
// Usage:
//   <Modal isOpen={open} onClose={close} size="sm" title="Đăng nhập">
//     <form>...</form>
//   </Modal>
// ============================================

import { useEffect, type ReactNode } from 'react';
import { HiOutlineX } from 'react-icons/hi';

type ModalSize = 'sm' | 'md' | 'lg';

interface ModalProps {
  /** Controls visibility */
  isOpen: boolean;
  /** Called on backdrop click or close-button click */
  onClose: () => void;
  /** Max-width of the modal panel */
  size?: ModalSize;
  /** Optional title shown in header */
  title?: string;
  /** Custom header — if provided, `title` and close-button are replaced */
  header?: ReactNode;
  /** Main content */
  children: ReactNode;
  /** Footer content (e.g. CTA buttons) rendered below body */
  footer?: ReactNode;
  /** Additional className on the panel */
  className?: string;
  /** Whether the body can scroll (tall content). Default: true */
  scrollable?: boolean;
}

const SIZE_MAP: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
};

export default function Modal({
  isOpen,
  onClose,
  size = 'md',
  title,
  header,
  children,
  footer,
  className = '',
  scrollable = true,
}: ModalProps) {
  // Body scroll lock while open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="bg-overlay animate-fade-in fixed inset-0 z-[100]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Centered panel container */}
      <div className="animate-scale-in fixed inset-0 z-[101] flex items-center justify-center p-4">
        <div
          className={`glass-elevated w-full ${SIZE_MAP[size]} ${
            scrollable ? 'no-scrollbar max-h-[90vh] overflow-y-auto' : ''
          } ${className}`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          {header ??
            (title && (
              <div className="flex items-center justify-between p-6 pb-4">
                <h2 className="text-text-primary text-lg font-bold">{title}</h2>
                <button
                  onClick={onClose}
                  className="text-text-muted hover:bg-bg-elevated hover:text-text-primary flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <HiOutlineX size={18} />
                </button>
              </div>
            ))}

          {/* Body */}
          <div className={title || header ? '' : ''}>{children}</div>

          {/* Footer */}
          {footer && <div className="px-6 pb-6">{footer}</div>}
        </div>
      </div>
    </>
  );
}
