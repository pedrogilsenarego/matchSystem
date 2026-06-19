import { useMemo } from 'react';
import type { MatchStats } from './types';

export interface StatRow {
  label: string;
  home: number;
  away: number;
}

export function useStatsPanel(stats: MatchStats): StatRow[] {
  return useMemo(
    () => [
      { label: 'Shots on target', home: stats.shotsOnTargetHome, away: stats.shotsOnTargetAway },
      { label: 'Fouls', home: stats.foulsHome, away: stats.foulsAway },
      { label: 'Corners', home: stats.cornersHome, away: stats.cornersAway },
    ],
    [stats],
  );
}
