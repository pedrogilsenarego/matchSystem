export type MatchStatus = 'upcoming' | 'live' | 'break' | 'finished';

export type EventType = 'goal' | 'yellow_card' | 'red_card' | 'substitution';

export interface MatchEvent {
  id: string;
  minute: number;
  type: EventType;
  playerName: string;
  team: 'home' | 'away';
  /** For substitutions: player coming on; for goals: optional assist */
  secondary?: string;
}

export interface MatchStats {
  possessionHome: number;
  possessionAway: number;
  shotsOnTargetHome: number;
  shotsOnTargetAway: number;
  foulsHome: number;
  foulsAway: number;
  cornersHome: number;
  cornersAway: number;
}

export interface MatchState {
  matchId: string;
  homeTeam: string;
  awayTeam: string;
  scoreHome: number;
  scoreAway: number;
  minute: number;
  status: MatchStatus;
  events: MatchEvent[];
  stats: MatchStats;
}

export interface MatchMeta {
  matchId: string;
  homeTeam: string;
  awayTeam: string;
  status: MatchStatus;
}
