import { lazy, Suspense } from 'react';
import { LoadingMessage } from 'ui-components';
import { MatchOverview } from './components/MatchOverview';
import { EventsFeed } from './components/EventsFeed';
import { useLiveMatch } from './hooks/useLiveMatch';
import styles from './Dashboard.module.css';

const StatsPanel = lazy(() => import('statsPanel/StatsPanel'));

export interface DashboardProps {
  matchId: string;
}

/**
 * Scoreboard dashboard: overview, events feed, and stats.
 * Consumed by the host via Module Federation.
 *
 * Data comes from useLiveMatch, which currently uses a mock feed. Swapping in the
 * real WebSocket feed requires no changes here.
 */
export function Dashboard({ matchId }: DashboardProps) {
  const { state } = useLiveMatch(matchId);

  if (!state) {
    return <LoadingMessage>Connecting to live feed…</LoadingMessage>;
  }

  return (
    <div className={styles.root}>
      <MatchOverview state={state} />
      <div className={styles.grid}>
        <EventsFeed
          events={state.events}
          homeTeam={state.homeTeam}
          awayTeam={state.awayTeam}
        />
        <Suspense fallback={<LoadingMessage>Loading stats…</LoadingMessage>}>
          <StatsPanel stats={state.stats} />
        </Suspense>
      </div>
    </div>
  );
}

export default Dashboard;
