import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EventsFeed } from './events-feed';
import styles from './events-feed.module.css';
import type { MatchEvent } from '../../types';

const goal: MatchEvent = {
  id: 'e1',
  minute: 23,
  type: 'goal',
  playerName: 'Scorer',
  team: 'home',
};

const yellowCard: MatchEvent = {
  id: 'e2',
  minute: 41,
  type: 'yellow_card',
  playerName: 'Defender',
  team: 'away',
};

describe('EventsFeed', () => {
  it('renders an empty message when there are no events', () => {
    render(<EventsFeed events={[]} />);
    expect(screen.getByText('No events yet.')).toBeInTheDocument();
  });

  it('highlights goal rows with the goal modifier and leaves other rows plain', () => {
    render(<EventsFeed events={[goal, yellowCard]} homeTeam="Home" awayTeam="Away" />);

    const goalRow = screen.getByText('Goal').closest('li');
    const cardRow = screen.getByText('Yellow card').closest('li');

    expect(goalRow).toHaveClass(styles.goal);
    expect(cardRow).not.toHaveClass(styles.goal);
  });
});
