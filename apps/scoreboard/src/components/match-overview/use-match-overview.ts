import { useMemo } from 'react';
import type { MatchStatus } from '../../types';

const STATUS_LABEL: Record<MatchStatus, string> = {
  upcoming: 'Upcoming',
  live: 'Live',
  break: 'Break',
  finished: 'Finished',
};

export interface UseMatchOverviewResult {
  statusLabel: string;
  showMinute: boolean;
  showBreak: boolean;
  isLive: boolean;
}

export function useMatchOverview(status: MatchStatus): UseMatchOverviewResult {
  return useMemo(
    () => ({
      statusLabel: STATUS_LABEL[status],
      showMinute: status === 'live',
      showBreak: status === 'break',
      isLive: status === 'live',
    }),
    [status]
  );
}
