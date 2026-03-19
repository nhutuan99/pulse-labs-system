// ============================================
// Loading — Root Suspense Boundary
// ============================================
// Shown during streaming/lazy loading of page content.
// ============================================

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <span className="text-sm text-text-muted">Đang tải...</span>
      </div>
    </main>
  );
}
