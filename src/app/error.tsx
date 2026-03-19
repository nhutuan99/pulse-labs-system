'use client';

// ============================================
// Error Boundary — App Router
// ============================================
// Catches runtime errors and provides recovery UI.
// Next.js automatically wraps page/layout in an ErrorBoundary.
// ============================================

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="rounded-lg border border-error/20 bg-error-light p-8">
        <h2 className="mb-2 text-xl font-semibold text-error">
          Đã xảy ra lỗi
        </h2>
        <p className="mb-4 text-sm text-text-secondary">
          {error.message || 'Một lỗi không mong muốn đã xảy ra.'}
        </p>
        <button
          onClick={reset}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-text-inverse transition-colors hover:bg-primary-hover"
        >
          Thử lại
        </button>
      </div>
    </main>
  );
}
