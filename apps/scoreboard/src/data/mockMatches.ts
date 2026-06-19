import type { MatchState } from '../types';

/**
 * Mock match states keyed by matchId. Used to build and demo the UI before the
 * live WebSocket feed is wired in. Mirrors the shape the feed will produce.
 */
export const MOCK_MATCHES: Record<string, MatchState> = {
  'match-1': {
    matchId: 'match-1',
    homeTeam: 'Star Team',
    awayTeam: 'B Team',
    scoreHome: 2,
    scoreAway: 1,
    minute: 67,
    status: 'live',
    events: [
      { id: 'ev-1', minute: 12, type: 'goal', playerName: 'K. De Bruyne', team: 'home' },
      { id: 'ev-2', minute: 23, type: 'yellow_card', playerName: 'T. Castagne', team: 'away' },
      { id: 'ev-3', minute: 34, type: 'goal', playerName: 'D. Origi', team: 'away' },
      {
        id: 'ev-4',
        minute: 41,
        type: 'substitution',
        playerName: 'E. Hazard',
        team: 'home',
        secondary: 'L. Trossard',
      },
      { id: 'ev-5', minute: 58, type: 'goal', playerName: 'R. Lukaku', team: 'home' },
      { id: 'ev-6', minute: 64, type: 'red_card', playerName: 'H. Vanaken', team: 'away' },
    ],
    stats: {
      possessionHome: 58,
      possessionAway: 42,
      shotsOnTargetHome: 8,
      shotsOnTargetAway: 4,
      foulsHome: 7,
      foulsAway: 11,
      cornersHome: 6,
      cornersAway: 3,
    },
  },
  'match-2': {
    matchId: 'match-2',
    homeTeam: 'FC Champions',
    awayTeam: 'G1 Team',
    scoreHome: 0,
    scoreAway: 0,
    minute: 90,
    status: 'finished',
    events: [
      { id: 'ev-7', minute: 19, type: 'yellow_card', playerName: 'L. Dendoncker', team: 'away' },
      { id: 'ev-8', minute: 72, type: 'yellow_card', playerName: 'Y. Tielemans', team: 'home' },
    ],
    stats: {
      possessionHome: 49,
      possessionAway: 51,
      shotsOnTargetHome: 3,
      shotsOnTargetAway: 5,
      foulsHome: 14,
      foulsAway: 10,
      cornersHome: 4,
      cornersAway: 7,
    },
  },
};

/** Look up a mock match state by id, falling back to the first match. */
export function getMockMatch(matchId: string): MatchState {
  return MOCK_MATCHES[matchId] ?? MOCK_MATCHES['match-1'];
}
