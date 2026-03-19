// ============================================
// Toast Helper — Notification System
// ============================================
// Lightweight event-based toast system
// Use with ToastProvider component
// ============================================

export interface ToastOptions {
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

type ToastListener = (toast: ToastOptions & { id: string }) => void;

const listeners: Set<ToastListener> = new Set();
let toastId = 0;

/**
 * Show a toast notification
 * Works via event pattern — ToastProvider subscribes to these events
 */
export const showToast = (options: ToastOptions): void => {
  const toast = {
    ...options,
    id: `toast-${++toastId}`,
    type: options.type || 'info',
    duration: options.duration || 3000,
    position: options.position || 'top-right',
  };

  listeners.forEach((listener) => listener(toast));
};

/**
 * Subscribe to toast events (used by ToastProvider)
 */
export const subscribeToast = (listener: ToastListener): (() => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
