import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import { createVanillaExtractPlugin } from '../../config/vite-shared';

export default defineConfig({
  plugins: [react(), createVanillaExtractPlugin('test')],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    server: {
      deps: {
        inline: [/ui-components/, /design-system/],
      },
    },
  },
});
