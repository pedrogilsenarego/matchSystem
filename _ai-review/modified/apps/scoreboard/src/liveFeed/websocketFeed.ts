import type { LiveFeedConnection, LiveFeedMessage } from './types';

const FEED_MESSAGE_TYPES = new Set(['match_state', 'tick', 'event', 'stats']);
const MAX_RECONNECT_DELAY_MS = 10_000;

/**
 * Real live feed backed by the ws-server. Opens a WebSocket, subscribes to the
 * given match, and forwards `match_state` / `tick` / `event` / `stats` messages
 * to listeners. Reconnects with exponential backoff on unexpected drops.
 *
 * Implements the same LiveFeedConnection contract as the mock feed, so consumers
 * (useLiveMatch) are unaffected by which one is used.
 */
export function createWebSocketFeed(matchId: string, wsUrl: string): LiveFeedConnection {
  const listeners = new Set<(message: LiveFeedMessage) => void>();
  let socket: WebSocket | null = null;
  let paused = false;
  let closedByClient = false;
  let reconnectAttempts = 0;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  function emit(message: LiveFeedMessage) {
    for (const listener of listeners) listener(message);
  }

  function open() {
    socket = new WebSocket(wsUrl);

    socket.addEventListener('open', () => {
      reconnectAttempts = 0;
      socket?.send(JSON.stringify({ type: 'subscribe', matchId }));
    });

    socket.addEventListener('message', (event) => {
      // While paused, ignore incoming data so the UI holds its current state.
      if (paused) return;
      try {
        const message = JSON.parse(event.data) as LiveFeedMessage;
        if (FEED_MESSAGE_TYPES.has(message.type)) {
          emit(message);
        }
      } catch {
        // Ignore malformed payloads.
      }
    });

    socket.addEventListener('close', () => {
      if (!closedByClient) scheduleReconnect();
    });

    socket.addEventListener('error', () => {
      socket?.close();
    });
  }

  function scheduleReconnect() {
    const delay = Math.min(1000 * 2 ** reconnectAttempts, MAX_RECONNECT_DELAY_MS);
    reconnectAttempts += 1;
    reconnectTimer = setTimeout(open, delay);
  }

  return {
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    connect() {
      closedByClient = false;
      open();
    },
    disconnect() {
      closedByClient = true;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      reconnectTimer = null;
      socket?.close();
      socket = null;
      listeners.clear();
    },
    isPaused: () => paused,
    setPaused(p: boolean) {
      paused = p;
    },
  };
}
