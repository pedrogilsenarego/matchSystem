import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLiveMatch } from './use-live-match';
import type { LiveFeedConnection, LiveFeedMessage } from '../liveFeed/types';
import type { MatchState } from '../types';

const snapshot: MatchState = {
  matchId: 'match-1',
  homeTeam: 'Star Team',
  awayTeam: 'B Team',
  scoreHome: 0,
  scoreAway: 0,
  minute: 0,
  status: 'live',
  events: [],
  stats: {
    possessionHome: 50,
    possessionAway: 50,
    shotsOnTargetHome: 0,
    shotsOnTargetAway: 0,
    foulsHome: 0,
    foulsAway: 0,
    cornersHome: 0,
    cornersAway: 0,
  },
};

/** A controllable fake feed so we can drive the hook deterministically. */
function createFakeFeed() {
  let listener: ((m: LiveFeedMessage) => void) | null = null;
  const feed: LiveFeedConnection & { emit: (m: LiveFeedMessage) => void } = {
    subscribe(l) {
      listener = l;
      return () => {
        listener = null;
      };
    },
    connect: vi.fn(),
    disconnect: vi.fn(),
    isPaused: () => false,
    setPaused: vi.fn(),
    emit(m) {
      listener?.(m);
    },
  };
  return feed;
}

describe('useLiveMatch', () => {
  it('starts with null state and connects to the feed', () => {
    const feed = createFakeFeed();
    const { result } = renderHook(() => useLiveMatch('match-1', () => feed));

    expect(result.current.state).toBeNull();
    expect(feed.connect).toHaveBeenCalledOnce();
  });

  it('reduces feed messages into match state', () => {
    const feed = createFakeFeed();
    const { result } = renderHook(() => useLiveMatch('match-1', () => feed));

    act(() => feed.emit({ type: 'match_state', payload: snapshot }));
    expect(result.current.state?.homeTeam).toBe('Star Team');

    act(() => feed.emit({ type: 'tick', payload: { minute: 23 } }));
    expect(result.current.state?.minute).toBe(23);

    act(() =>
      feed.emit({
        type: 'event',
        payload: { id: 'ev-1', minute: 23, type: 'goal', playerName: 'P', team: 'home' },
      }),
    );
    expect(result.current.state?.events).toHaveLength(1);
  });

  it('disconnects the feed on unmount', () => {
    const feed = createFakeFeed();
    const { unmount } = renderHook(() => useLiveMatch('match-1', () => feed));

    unmount();
    expect(feed.disconnect).toHaveBeenCalledOnce();
  });

  it('forwards pause to the feed', () => {
    const feed = createFakeFeed();
    const { result } = renderHook(() => useLiveMatch('match-1', () => feed));

    act(() => result.current.setPaused(true));
    expect(feed.setPaused).toHaveBeenCalledWith(true);
    expect(result.current.isPaused).toBe(true);
  });
});
