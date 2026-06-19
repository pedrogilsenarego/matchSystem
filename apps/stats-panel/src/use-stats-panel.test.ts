import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useStatsPanel } from './use-stats-panel';
import type { MatchStats } from './types';

const stats: MatchStats = {
  possessionHome: 58,
  possessionAway: 42,
  shotsOnTargetHome: 8,
  shotsOnTargetAway: 4,
  foulsHome: 7,
  foulsAway: 11,
  cornersHome: 6,
  cornersAway: 3,
};

describe('useStatsPanel', () => {
  it('maps each stat to a labelled home/away row', () => {
    const { result } = renderHook(() => useStatsPanel(stats));
    expect(result.current).toEqual([
      { label: 'Shots on target', home: 8, away: 4 },
      { label: 'Fouls', home: 7, away: 11 },
      { label: 'Corners', home: 6, away: 3 },
    ]);
  });

  it('omits possession (rendered separately as a bar)', () => {
    const { result } = renderHook(() => useStatsPanel(stats));
    expect(result.current.some((row) => row.label === 'Possession')).toBe(false);
  });

  it('returns a stable reference for the same stats object', () => {
    const { result, rerender } = renderHook(({ s }) => useStatsPanel(s), {
      initialProps: { s: stats },
    });
    const first = result.current;
    rerender({ s: stats });
    expect(result.current).toBe(first);
  });
});
