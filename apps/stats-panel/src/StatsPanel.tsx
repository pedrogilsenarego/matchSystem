import { memo } from 'react';
import { Card, Heading } from 'ui-components';
import type { MatchStats } from './types';
import { useStatsPanel } from './use-stats-panel';
import styles from './StatsPanel.module.css';

export interface StatsPanelProps {
  stats: MatchStats;
}

function StatsPanelComponent({ stats }: StatsPanelProps) {
  const rows = useStatsPanel(stats);

  return (
    <Card asChild>
      <section aria-label="Match statistics" className={styles.root}>
        <Heading level={2}>Statistics</Heading>

        <div className={styles.possession}>
          <div className={styles.possessionLabels}>
            <span className={styles.possessionValue}>{stats.possessionHome}%</span>
            <span className={styles.label}>Possession</span>
            <span className={styles.possessionValue}>{stats.possessionAway}%</span>
          </div>
          <div
            className={styles.bar}
            role="meter"
            aria-label="Possession"
            aria-valuenow={stats.possessionHome}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className={styles.barHome} style={{ width: `${stats.possessionHome}%` }} />
          </div>
        </div>

        <dl className={styles.statList}>
          {rows.map((row) => (
            <div key={row.label} className={styles.statRow}>
              <dd className={styles.statValue}>{row.home}</dd>
              <dt className={styles.label}>{row.label}</dt>
              <dd className={styles.statValue}>{row.away}</dd>
            </div>
          ))}
        </dl>
      </section>
    </Card>
  );
}

export const StatsPanel = memo(StatsPanelComponent);
export default StatsPanel;
