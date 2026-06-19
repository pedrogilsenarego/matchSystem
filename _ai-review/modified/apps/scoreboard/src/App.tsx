import { Heading } from 'ui-components';
import { Dashboard } from './Dashboard';
import { MATCHES } from './data/matchRegistry';
import styles from './App.module.css';

/**
 * Standalone entry when running the remote app in dev.
 * In production the host loads Dashboard via Module Federation.
 */
export default function App() {
  return (
    <div className={styles.standalone}>
      <Heading level={1}>Scoreboard (remote)</Heading>
      <p className={styles.subtitle}>
        Starter remote loaded
      </p>
      <Dashboard matchId={MATCHES[0].matchId} />
    </div>
  );
}
