import type { MatchMeta } from '../types';

/**
 * Registry of available matches. In a real app this would come from an API.
 */
export const MATCHES: MatchMeta[] = [
  { matchId: 'match-1', homeTeam: 'Star Team', awayTeam: 'B Team', status: 'live' },
  { matchId: 'match-2', homeTeam: 'FC Champions', awayTeam: 'G1 Team', status: 'live' },
];

export function getMatchMeta(matchId: string): MatchMeta | undefined {
  return MATCHES.find((m) => m.matchId === matchId);
}
