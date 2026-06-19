/**
 * WebSocket-style abstraction for live match updates.
 * Allows swapping real WebSockets for simulated timers in the exercise.
 */

export type LiveFeedMessage =
  | { type: 'match_state'; payload: import('../types').MatchState }
  | { type: 'tick'; payload: { minute: number } }
  | { type: 'event'; payload: import('../types').MatchEvent }
  | { type: 'stats'; payload: import('../types').MatchStats };

export interface LiveFeedConnection {
  subscribe(listener: (message: LiveFeedMessage) => void): () => void;
  connect(): void;
  disconnect(): void;
  isPaused(): boolean;
  setPaused(paused: boolean): void;
}
