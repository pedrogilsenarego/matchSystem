import { Heading } from 'ui-components';
import { StatsPanel } from './StatsPanel';
import styles from './App.module.css';

/**
 * Standalone entry when running the remote app in dev.
 * In production the scoreboard loads StatsPanel via Module Federation.
 */
export default function App() {
  return (
    <div className={styles.standalone}>
      <Heading level={1}>Stats Panel (remote)</Heading>
      <StatsPanel
        stats={{
          possessionHome: 55,
          possessionAway: 45,
          shotsOnTargetHome: 4,
          shotsOnTargetAway: 2,
          foulsHome: 3,
          foulsAway: 5,
          cornersHome: 2,
          cornersAway: 1,
        }}
      />
    </div>
  );
}
