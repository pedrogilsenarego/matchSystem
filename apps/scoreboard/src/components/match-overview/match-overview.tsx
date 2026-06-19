import { memo } from 'react';
import { Badge, Card } from 'ui-components';
import type { MatchState } from '../../types';
import { useMatchOverview } from './use-match-overview';
import styles from './match-overview.module.css';

interface MatchOverviewProps {
  state: MatchState;
}

function MatchOverviewComponent({ state }: MatchOverviewProps) {
  const { homeTeam, awayTeam, scoreHome, scoreAway, minute, status } = state;
  const { statusLabel, showMinute, showBreak } = useMatchOverview(status);

  return (
    <Card asChild>
      <section aria-label="Match overview" className={styles.root}>
        <div className={styles.statusRow}>
          <Badge variant={status}>{statusLabel}</Badge>
          {showMinute && (
            <span className={styles.minute} aria-label={`Match minute ${minute}`}>
              {minute}&apos;
            </span>
          )}
          {showBreak && (
            <span className={styles.minute} aria-label="Half-time break">
              HT
            </span>
          )}
        </div>

        <div className={styles.scoreRow}>
          <span className={styles.team}>{homeTeam}</span>
          <span className={styles.score} aria-label={`Score ${scoreHome} to ${scoreAway}`}>
            {scoreHome}
            <span className={styles.scoreSeparator}>–</span>
            {scoreAway}
          </span>
          <span className={styles.team}>{awayTeam}</span>
        </div>
      </section>
    </Card>
  );
}

export const MatchOverview = memo(MatchOverviewComponent);
