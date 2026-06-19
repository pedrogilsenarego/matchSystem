import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MatchOverview } from './match-overview';
import type { MatchState } from '../../types';

const liveState: MatchState = {
  matchId: 'match-1',
  homeTeam: 'Star Team',
  awayTeam: 'B Team',
  scoreHome: 2,
  scoreAway: 1,
  minute: 67,
  status: 'live',
  events: [],
  stats: {
    possessionHome: 55,
    possessionAway: 45,
    shotsOnTargetHome: 8,
    shotsOnTargetAway: 4,
    foulsHome: 7,
    foulsAway: 11,
    cornersHome: 6,
    cornersAway: 3,
  },
};

describe('MatchOverview', () => {
  it('renders both team names, the score and the live minute', () => {
    render(<MatchOverview state={liveState} />);

    expect(screen.getByText('Star Team')).toBeInTheDocument();
    expect(screen.getByText('B Team')).toBeInTheDocument();
    expect(screen.getByLabelText('Score 2 to 1')).toBeInTheDocument();
    expect(screen.getByText('Live')).toBeInTheDocument();
    expect(screen.getByLabelText('Match minute 67')).toBeInTheDocument();
  });

  it('shows "Finished" and hides the minute for a finished match', () => {
    render(<MatchOverview state={{ ...liveState, status: 'finished' }} />);

    expect(screen.getByText('Finished')).toBeInTheDocument();
    expect(screen.queryByLabelText('Match minute 67')).not.toBeInTheDocument();
  });
});
