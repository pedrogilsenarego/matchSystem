import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import type { MatchState } from '../types';
import type { LiveFeedConnection } from '../liveFeed/types';
import { matchReducer } from '../liveFeed/reducer';
import { createWebSocketFeed } from '../liveFeed/websocketFeed';

/** Factory that builds a feed connection for a match. Swap the mock feed in for tests. */
export type FeedFactory = (matchId: string) => LiveFeedConnection;

const WS_URL = import.meta.env.VITE_WS_URL ?? 'ws://localhost:8080';

/** Default feed: the real ws-server WebSocket. Tests can inject createMockFeed instead. */
const defaultFeedFactory: FeedFactory = (matchId) => createWebSocketFeed(matchId, WS_URL);

export interface UseLiveMatchResult {
  state: MatchState | null;
  isPaused: boolean;
  setPaused: (paused: boolean) => void;
}

/**
 * Subscribes to a live feed for the given match and reduces its messages into a
 * single MatchState. Re-subscribes cleanly when matchId changes.
 *
 * The feed source is injectable (defaults to the mock feed) so the same hook
 * works with the real WebSocket feed and is easy to test.
 */
export function useLiveMatch(
  matchId: string,
  createFeed: FeedFactory = defaultFeedFactory,
): UseLiveMatchResult {
  const [state, dispatch] = useReducer(matchReducer, null);
  const [isPaused, setIsPaused] = useState(false);
  const feedRef = useRef<LiveFeedConnection | null>(null);

  useEffect(() => {
    const feed = createFeed(matchId);
    feedRef.current = feed;

    const unsubscribe = feed.subscribe(dispatch);
    feed.connect();

    return () => {
      unsubscribe();
      feed.disconnect();
      feedRef.current = null;
    };
  }, [matchId, createFeed]);

  const setPaused = useCallback((paused: boolean) => {
    feedRef.current?.setPaused(paused);
    setIsPaused(paused);
  }, []);

  return { state, isPaused, setPaused };
}
