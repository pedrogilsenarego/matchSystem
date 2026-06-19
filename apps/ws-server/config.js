/**
 * Server and simulation configuration.
 */

export const PORT = Number(process.env.PORT) || 8080;
export const TICK_MS = 1000;
export const EVENT_CHANCE = 0.25;
export const STATS_UPDATE_CHANCE = 0.4;
export const BREAK_START_MINUTE = 45;
export const BREAK_DURATION_TICKS = 5;
export const HEARTBEAT_INTERVAL_MS = 30_000;
export const MAX_PAYLOAD_BYTES = 64 * 1024; // 64KB for JSON messages

export const MATCHES = [
  { matchId: 'match-1', homeTeam: 'Star Team', awayTeam: 'B Team' },
  { matchId: 'match-2', homeTeam: 'FC Champions', awayTeam: 'G1 Team' },
];

export const PLAYERS_HOME = [
  'K. De Bruyne', 'R. Lukaku', 'E. Hazard', 'Y. Tielemans', 'T. Courtois',
  'J. Vertonghen', 'T. Alderweireld', 'A. Witsel', 'D. Mertens', 'L. Trossard',
];
export const PLAYERS_AWAY = [
  'J. Batshuayi', 'C. Benteke', 'D. Origi', 'L. Dendoncker', 'T. Castagne',
  'T. Meunier', 'Z. Vanheusden', 'H. Vanaken', 'J. Doku', 'L. Openda',
];
