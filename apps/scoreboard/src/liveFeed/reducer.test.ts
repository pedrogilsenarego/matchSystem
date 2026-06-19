import { describe, it, expect } from 'vitest';
import { matchReducer } from './reducer';
import type { MatchState } from '../types';

const baseState: MatchState = {
  matchId: 'match-1',
  homeTeam: 'Star Team',
  awayTeam: 'B Team',
  scoreHome: 1,
  scoreAway: 0,
  minute: 10,
  status: 'live',
  events: [{ id: 'ev-1', minute: 5, type: 'goal', playerName: 'A. Player', team: 'home' }],
  stats: {
    possessionHome: 55,
    possessionAway: 45,
    shotsOnTargetHome: 3,
    shotsOnTargetAway: 1,
    foulsHome: 2,
    foulsAway: 4,
    cornersHome: 1,
    cornersAway: 0,
  },
};

describe('matchReducer', () => {
  it('replaces state on match_state', () => {
    const next = matchReducer(null, { type: 'match_state', payload: baseState });
    expect(next).toEqual(baseState);
  });

  it('updates the minute on tick', () => {
    const next = matchReducer(baseState, { type: 'tick', payload: { minute: 11 } });
    expect(next?.minute).toBe(11);
    // other fields untouched
    expect(next?.scoreHome).toBe(1);
  });

  it('appends a new event', () => {
    const event = { id: 'ev-2', minute: 12, type: 'yellow_card', playerName: 'B. Player', team: 'away' } as const;
    const next = matchReducer(baseState, { type: 'event', payload: event });
    expect(next?.events).toHaveLength(2);
    expect(next?.events[1]).toEqual(event);
  });

  it('ignores duplicate event ids (reconnect replay safety)', () => {
    const duplicate = baseState.events[0];
    const next = matchReducer(baseState, { type: 'event', payload: duplicate });
    expect(next?.events).toHaveLength(1);
    expect(next).toBe(baseState); // unchanged reference
  });

  it('merges stats updates', () => {
    const stats = { ...baseState.stats, possessionHome: 60, possessionAway: 40 };
    const next = matchReducer(baseState, { type: 'stats', payload: stats });
    expect(next?.stats.possessionHome).toBe(60);
  });

  it('does nothing for tick/event/stats before a match_state snapshot', () => {
    expect(matchReducer(null, { type: 'tick', payload: { minute: 1 } })).toBeNull();
    expect(
      matchReducer(null, {
        type: 'event',
        payload: { id: 'x', minute: 1, type: 'goal', playerName: 'P', team: 'home' },
      }),
    ).toBeNull();
  });

  it('does not mutate the previous state', () => {
    const before = structuredClone(baseState);
    matchReducer(baseState, {
      type: 'event',
      payload: { id: 'ev-9', minute: 20, type: 'red_card', playerName: 'C. Player', team: 'home' },
    });
    expect(baseState).toEqual(before);
  });
});
