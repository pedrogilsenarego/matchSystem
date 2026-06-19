import { lazy, Suspense, useState } from 'react';
import { MATCH_OPTIONS } from './data/matches';
import { Button, LoadingMessage, Heading } from 'ui-components';
import * as styles from './App.module.css';

const Dashboard = lazy(() => import('scoreboard/Dashboard'));

export default function App() {
  const [selectedMatchId, setSelectedMatchId] = useState(MATCH_OPTIONS[0].matchId);

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <Heading level={1} className={styles.headerTitle}>
          Live Scoreboard
        </Heading>
        <div className={styles.controls}>
          <div className={styles.matchTabs} role="tablist" aria-label="Select match">
            {MATCH_OPTIONS.map((match) => {
              const isActive = match.matchId === selectedMatchId;
              return (
                <Button
                  key={match.matchId}
                  variant="muted"
                  size="sm"
                  active={isActive}
                  className={styles.mutedOnDark}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedMatchId(match.matchId)}
                >
                  {match.homeTeam} vs {match.awayTeam}
                </Button>
              );
            })}
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <Suspense fallback={<LoadingMessage>Loading dashboard…</LoadingMessage>}>
          {/* key remounts the dashboard per match so live state is isolated, never stale */}
          <Dashboard key={selectedMatchId} matchId={selectedMatchId} />
        </Suspense>
      </main>
    </div>
  );
}
