import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import { defineConfig } from 'vite';
import { createVanillaExtractPlugin } from '../../config/vite-shared';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    createVanillaExtractPlugin(mode),
    federation({
      name: 'scoreboard',
      filename: 'remoteEntry.js',
      remotes: {
        statsPanel: 'http://localhost:5176/assets/remoteEntry.js',
      },
      exposes: {
        './Dashboard': './src/dashboard/dashboard.tsx',
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
