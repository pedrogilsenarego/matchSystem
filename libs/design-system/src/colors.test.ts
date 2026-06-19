import { describe, it, expect } from 'vitest';
import { primary, secondary, base, palette } from './colors';

const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
const HEX = /^#[0-9a-f]{6}$/;

describe('color palette', () => {
  it.each([
    ['primary', primary],
    ['secondary', secondary],
    ['base', base],
  ])('%s exposes the full 50-900 shade scale as valid hex', (_name, ramp) => {
    const record = ramp as Record<number, string>;
    for (const shade of SHADES) {
      expect(record[shade]).toMatch(HEX);
    }
    expect(Object.keys(record)).toHaveLength(SHADES.length);
  });

  it('groups all three ramps under palette', () => {
    expect(palette).toEqual({ primary, secondary, base });
  });

  it('darkens as the shade number increases', () => {
    const luminance = (hex: string) =>
      parseInt(hex.slice(1, 3), 16) + parseInt(hex.slice(3, 5), 16) + parseInt(hex.slice(5, 7), 16);
    expect(luminance(primary[50])).toBeGreaterThan(luminance(primary[900]));
    expect(luminance(base[50])).toBeGreaterThan(luminance(base[900]));
  });
});
