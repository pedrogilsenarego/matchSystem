import { defineConfig } from 'vite';
import { resolve } from 'path';
import { createVanillaExtractPlugin } from '../../config/vite-shared';

export default defineConfig(({ mode }) => ({
  plugins: [createVanillaExtractPlugin(mode)],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        global: resolve(__dirname, 'src/global.css.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['@vanilla-extract/css', '@vanilla-extract/dynamic'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'design-system.css';
          return assetInfo.name || 'asset';
        },
      },
    },
  },
}));
