import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { createVanillaExtractPlugin } from '../../config/vite-shared';
import FullReload from 'vite-plugin-full-reload';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const currentAppName = path.basename(__dirname);
const appsDir = path.join(__dirname, '..');

/** Watch sibling apps' dist dirs so remote rebuilds trigger a full reload. */
const REMOTE_DIST_GLOBS = fs
  .readdirSync(appsDir, { withFileTypes: true })
  .filter((app) => app.isDirectory() && app.name !== currentAppName)
  .map((app) => `../${app.name}/dist/**`);

console.log('Watching sibling apps for dist changes:', REMOTE_DIST_GLOBS);

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    createVanillaExtractPlugin(mode),
    FullReload(REMOTE_DIST_GLOBS, {
      root: __dirname,
      delay: 300,
    }),
    federation({
      name: 'host',
      remotes: {
        scoreboard: 'http://localhost:5174/assets/remoteEntry.js',
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
