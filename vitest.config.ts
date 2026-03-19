import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    // Browser-like environment for React component testing
    environment: 'jsdom',

    // Global test setup — jest-dom matchers
    setupFiles: ['./vitest.setup.ts'],

    // Include patterns
    include: ['src/**/*.{test,spec}.{ts,tsx}'],

    // Coverage
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/**/index.ts', // barrel files
      ],
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
