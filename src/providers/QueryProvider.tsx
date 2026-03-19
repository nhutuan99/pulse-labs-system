'use client';

// ============================================
// QueryProvider — Server State + URL State
// ============================================
// Wraps QueryClientProvider (React Query) + NuqsAdapter (URL state)
// Must be client component in NextJS App Router
// ============================================

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { useState, type ReactNode } from 'react';

interface QueryProviderProps {
  children: ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  // Create QueryClient per-instance to prevent shared state in SSR
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            retry: (failureCount, error: any) => {
              // Don't retry on 401 — let auth system handle it
              if (error?.response?.status === 401) return false;
              return failureCount < 3;
            },
            retryDelay: (attemptIndex) =>
              Math.min(1000 * 2 ** attemptIndex, 30000),
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </NuqsAdapter>
  );
}
