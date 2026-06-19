import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { createVanillaExtractPlugin } from './config/vite-shared';

export default defineConfig({
  // Reuse the same React + vanilla-extract transforms the apps use, so tests can
  // import `ui-components` (vanilla-extract) and the app's CSS modules as-is.
  plugins: [react(), createVanillaExtractPlugin('test')],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    css: true,
    include: [
      'apps/**/src/**/*.{test,spec}.{ts,tsx}',
      'apps/ws-server/**/*.{test,spec}.js',
      'libs/**/src/**/*.{test,spec}.{ts,tsx}',
    ],
  },
});
