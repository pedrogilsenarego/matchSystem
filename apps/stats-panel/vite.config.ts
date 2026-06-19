import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import { defineConfig } from 'vite';
import { createVanillaExtractPlugin } from '../../config/vite-shared';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    createVanillaExtractPlugin(mode),
    federation({
      name: 'statsPanel',
      filename: 'remoteEntry.js',
      exposes: {
        './StatsPanel': './src/StatsPanel.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
}));
