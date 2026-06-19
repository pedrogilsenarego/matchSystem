import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useEventsFeed } from './use-events-feed';
import type { MatchEvent } from '../../types';

function event(id: string, minute: number): MatchEvent {
  return { id, minute, type: 'goal', playerName: 'Player', team: 'home' };
}

describe('useEventsFeed', () => {
  it('orders events newest minute first', () => {
    const { result } = renderHook(() =>
      useEventsFeed([event('a', 10), event('b', 50), event('c', 30)]),
    );
    expect(result.current.map((e) => e.id)).toEqual(['b', 'c', 'a']);
  });

  it('does not mutate the source array', () => {
    const source = [event('a', 10), event('b', 50)];
    renderHook(() => useEventsFeed(source));
    expect(source.map((e) => e.id)).toEqual(['a', 'b']);
  });

  it('returns an empty list unchanged', () => {
    const { result } = renderHook(() => useEventsFeed([]));
    expect(result.current).toEqual([]);
  });
});
