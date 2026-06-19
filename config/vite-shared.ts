import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export function createVanillaExtractPlugin(mode: string) {
  return vanillaExtractPlugin({
    identifiers: mode === 'production' ? 'short' : 'debug',
  });
}
