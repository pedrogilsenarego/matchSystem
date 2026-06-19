import { memo } from 'react';
import { ElevatedCard, Heading } from 'ui-components';
import type { EventType, MatchEvent } from '../../types';
import { useEventsFeed } from './use-events-feed';
import styles from './events-feed.module.css';

interface EventsFeedProps {
  events: MatchEvent[];
  homeTeam?: string;
  awayTeam?: string;
}

const EVENT_META: Record<EventType, { icon: string; label: string }> = {
  goal: { icon: '⚽', label: 'Goal' },
  yellow_card: { icon: '🟨', label: 'Yellow card' },
  red_card: { icon: '🟥', label: 'Red card' },
  substitution: { icon: '🔁', label: 'Substitution' },
};

function EventsFeedComponent({ events, homeTeam = 'Home', awayTeam = 'Away' }: EventsFeedProps) {
  const ordered = useEventsFeed(events);

  return (
    <ElevatedCard asChild>
      <section aria-label="Live events feed" className={styles.root}>
        <Heading level={2}>Events</Heading>

        {ordered.length === 0 ? (
          <p className={styles.empty}>No events yet.</p>
        ) : (
          <ul className={styles.list}>
            {ordered.map((event) => {
              const meta = EVENT_META[event.type];
              const teamName = event.team === 'home' ? homeTeam : awayTeam;
              const itemClassName =
                event.type === 'goal' ? `${styles.item} ${styles.goal}` : styles.item;
              return (
                <li key={event.id} className={itemClassName}>
                  <span className={styles.minute}>{event.minute}&apos;</span>
                  <span className={styles.icon} aria-hidden="true">
                    {meta.icon}
                  </span>
                  <span className={styles.details}>
                    <span className={styles.type}>{meta.label}</span>
                    <span className={styles.player}>
                      {event.playerName}
                      {event.type === 'substitution' && event.secondary && (
                        <> → {event.secondary}</>
                      )}
                    </span>
                  </span>
                  <span className={styles.team}>{teamName}</span>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </ElevatedCard>
  );
}

export const EventsFeed = memo(EventsFeedComponent);
