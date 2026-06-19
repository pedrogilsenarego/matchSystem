import { useMemo } from 'react';
import type { MatchEvent } from '../../types';

export function useEventsFeed(events: MatchEvent[]): MatchEvent[] {
  return useMemo(() => [...events].sort((a, b) => b.minute - a.minute), [events]);
}
