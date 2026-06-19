import type { MatchEvent, MatchState } from '../types';
import { getMockMatch } from '../data/mockMatches';
import type { LiveFeedConnection, LiveFeedMessage } from './types';

const PLAYERS = [
  'K. De Bruyne', 'R. Lukaku', 'E. Hazard', 'Y. Tielemans',
  'D. Origi', 'L. Dendoncker', 'J. Doku', 'L. Openda',
];
const EVENT_TYPES: MatchEvent['type'][] = ['goal', 'yellow_card', 'red_card', 'substitution'];

const TICK_MS = 1500;
const FULL_TIME = 90;

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[randomInt(0, arr.length - 1)];
}

/**
 * Simulated live feed implementing the same LiveFeedConnection contract as the
 * real WebSocket feed. Emits an initial snapshot, then ticks the minute forward
 * and occasionally produces events / stats updates until full time.
 *
 * Swappable for the real feed without any change to consumers (useLiveMatch).
 */
export function createMockFeed(matchId: string): LiveFeedConnection {
  const listeners = new Set<(message: LiveFeedMessage) => void>();
  let paused = false;
  let intervalId: ReturnType<typeof setInterval> | null = null;

  // Local working copy so the simulation can advance minute/score/stats.
  let state: MatchState = structuredClone(getMockMatch(matchId));
  let eventCounter = state.events.length;

  function emit(message: LiveFeedMessage) {
    for (const listener of listeners) listener(message);
  }

  function tick() {
    if (paused || state.status === 'finished') return;

    const minute = state.minute + 1;
    state = { ...state, minute };
    emit({ type: 'tick', payload: { minute } });

    if (minute >= FULL_TIME) {
      state = { ...state, status: 'finished' };
      emit({ type: 'match_state', payload: state });
      if (intervalId) clearInterval(intervalId);
      intervalId = null;
      return;
    }

    // ~30% chance of an event each tick.
    if (Math.random() < 0.3) {
      const type = pick(EVENT_TYPES);
      const team: MatchEvent['team'] = Math.random() < 0.5 ? 'home' : 'away';
      eventCounter += 1;
      const event: MatchEvent = {
        id: `mock-${matchId}-${eventCounter}`,
        minute,
        type,
        playerName: pick(PLAYERS),
        team,
      };
      if (type === 'goal') {
        state = {
          ...state,
          scoreHome: team === 'home' ? state.scoreHome + 1 : state.scoreHome,
          scoreAway: team === 'away' ? state.scoreAway + 1 : state.scoreAway,
        };
      }
      state = { ...state, events: [...state.events, event] };
      emit({ type: 'event', payload: event });
    }

    // ~50% chance of a stats nudge each tick.
    if (Math.random() < 0.5) {
      const drift = randomInt(-2, 2);
      const possessionHome = Math.max(35, Math.min(65, state.stats.possessionHome + drift));
      const stats = {
        ...state.stats,
        possessionHome,
        possessionAway: 100 - possessionHome,
        shotsOnTargetHome: state.stats.shotsOnTargetHome + (Math.random() < 0.2 ? 1 : 0),
        shotsOnTargetAway: state.stats.shotsOnTargetAway + (Math.random() < 0.2 ? 1 : 0),
        cornersHome: state.stats.cornersHome + (Math.random() < 0.15 ? 1 : 0),
        cornersAway: state.stats.cornersAway + (Math.random() < 0.15 ? 1 : 0),
      };
      state = { ...state, stats };
      emit({ type: 'stats', payload: stats });
    }
  }

  return {
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    connect() {
      // Send the initial snapshot immediately.
      emit({ type: 'match_state', payload: state });
      if (state.status !== 'finished' && intervalId === null) {
        intervalId = setInterval(tick, TICK_MS);
      }
    },
    disconnect() {
      if (intervalId) clearInterval(intervalId);
      intervalId = null;
      listeners.clear();
    },
    isPaused: () => paused,
    setPaused(p: boolean) {
      paused = p;
    },
  };
}
