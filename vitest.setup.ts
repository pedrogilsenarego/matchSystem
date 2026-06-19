import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// jsdom can't parse vanilla-extract's injected CSS and writes a noisy
// "Could not parse CSS stylesheet" warning straight to stderr. It's harmless
// (we don't assert on styles), so filter just that line out.
const originalStderrWrite = process.stderr.write.bind(process.stderr);
process.stderr.write = ((chunk: string | Uint8Array, ...args: unknown[]) => {
  if (typeof chunk === 'string' && chunk.includes('Could not parse CSS stylesheet')) {
    return true;
  }
  return (originalStderrWrite as (...a: unknown[]) => boolean)(chunk, ...args);
}) as typeof process.stderr.write;

// Unmount React trees between tests to avoid cross-test DOM leakage.
afterEach(() => {
  cleanup();
});
