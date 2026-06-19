import type { MatchState } from '../types';
import type { LiveFeedMessage } from './types';

/**
 * Reduces a stream of live-feed messages into a single MatchState.
 * Pure and transport-agnostic: the same reducer serves the mock feed and the
 * real WebSocket feed. `null` represents "no match state received yet".
 */
export function matchReducer(
  state: MatchState | null,
  message: LiveFeedMessage,
): MatchState | null {
  switch (message.type) {
    case 'match_state':
      // Full snapshot — replace everything.
      return message.payload;

    case 'tick':
      if (!state) return state;
      return { ...state, minute: message.payload.minute };

    case 'event': {
      if (!state) return state;
      // Guard against duplicate event ids (e.g. reconnect replays).
      if (state.events.some((e) => e.id === message.payload.id)) return state;
      return { ...state, events: [...state.events, message.payload] };
    }

    case 'stats':
      if (!state) return state;
      return { ...state, stats: message.payload };

    default:
      return state;
  }
}
