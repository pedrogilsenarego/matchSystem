import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { createVanillaExtractPlugin } from './config/vite-shared';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  // Reuse the same React + vanilla-extract transforms the apps use, so tests can
  // import `ui-components` (vanilla-extract) and the app's CSS modules as-is.
  plugins: [react(), createVanillaExtractPlugin('test')],
  test: {
    projects: [{
      extends: true,
      test: {
        name: 'unit',
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./vitest.setup.ts'],
        css: true,
        include: ['apps/**/src/**/*.{test,spec}.{ts,tsx}', 'apps/ws-server/**/*.{test,spec}.js', 'libs/**/src/**/*.{test,spec}.{ts,tsx}']
      }
    }, {
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, 'libs/ui-components/.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});