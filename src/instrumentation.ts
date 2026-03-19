// ============================================
// Instrumentation — NextJS Server Lifecycle
// ============================================
// NextJS instrumentation API (stable since Next 15)
// Used for: OpenTelemetry, Sentry server-side init
// ============================================

export async function register() {
  // Sentry server-side initialization
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Import sentry server config when available
    // await import('./sentry.server.config');
    console.info('[Instrumentation] Server runtime initialized');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Import sentry edge config when available
    // await import('./sentry.edge.config');
    console.info('[Instrumentation] Edge runtime initialized');
  }
}
