import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { createVanillaExtractPlugin } from '../../config/vite-shared';

export default defineConfig(({ mode }) => ({
  plugins: [react(), createVanillaExtractPlugin(mode)],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UIComponents',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'design-system',
        '@vanilla-extract/css',
        '@radix-ui/react-slot',
        'clsx',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'ui-components.css';
          return assetInfo.name || 'asset';
        },
      },
    },
  },
}));
