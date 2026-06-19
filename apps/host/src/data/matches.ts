/**
 * Match list for the selector. Must stay in sync with remote's matchRegistry.
 */
export interface MatchOption {
  matchId: string;
  homeTeam: string;
  awayTeam: string;
}

export const MATCH_OPTIONS: MatchOption[] = [
  { matchId: 'match-1', homeTeam: 'Star Team', awayTeam: 'B Team' },
  { matchId: 'match-2', homeTeam: 'FC Champions', awayTeam: 'G1 Team' },
];
