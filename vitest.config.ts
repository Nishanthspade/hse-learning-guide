import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/__tests__/setup.ts', '**/*.d.ts'],
    },
    // Use single thread and disable native rollup for Android/Termux compatibility
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
    // Disable native rollup
    browser: {
      enabled: false,
    },
    // Use esbuild for transforms instead of rollup
    transformMode: {
      web: ['/src/.*'],
    },
    // Force using esbuild for all transforms
    esbuild: {
      target: 'es2020',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});