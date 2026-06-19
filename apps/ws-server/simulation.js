/**
 * Match simulation: initial state, stats evolution, and tick logic.
 * Pure functions only
 */

import { PLAYERS_HOME, PLAYERS_AWAY } from './config.js';

export const EventType = Object.freeze({
  GOAL: 'goal',
  YELLOW_CARD: 'yellow_card',
  RED_CARD: 'red_card',
  SUBSTITUTION: 'substitution',
});

export const MatchStatus = Object.freeze({ LIVE: 'live', BREAK: 'break', FINISHED: 'finished' });
export const Team = Object.freeze({ HOME: 'home', AWAY: 'away' });
export const MessageType = Object.freeze({
  TICK: 'tick',
  MATCH_STATE: 'match_state',
  EVENT: 'event',
  STATS: 'stats',
});

export const EVENT_TYPES = Object.freeze(Object.values(EventType));
export const TEAMS = Object.freeze(Object.values(Team));

/** Returns a random integer in [min, max] (inclusive). Used for possession drift, event chances, etc. */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Picks a random element from an array. Used to choose event type, team, and player names. */
export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Creates the initial match state (0–0, minute 0, empty events, 50/50 possession). Needed to bootstrap a new simulated match. */
export function createInitialState(matchId, homeTeam, awayTeam) {
  return {
    matchId,
    homeTeam,
    awayTeam,
    scoreHome: 0,
    scoreAway: 0,
    minute: 0,
    status: MatchStatus.LIVE,
    events: [],
    stats: {
      possessionHome: 50,
      possessionAway: 50,
      shotsOnTargetHome: 0,
      shotsOnTargetAway: 0,
      foulsHome: 0,
      foulsAway: 0,
      cornersHome: 0,
      cornersAway: 0,
    },
  };
}

/** Evolves match stats by one tick: possession drifts slightly, shots/fouls/corners may increment. randomIntFn is injectable for tests. */
export function nextStats(stats, randomIntFn = randomInt) {
  const drift = randomIntFn(-2, 2);
  const pHome = Math.max(35, Math.min(65, stats.possessionHome + drift));
  return {
    ...stats,
    possessionHome: pHome,
    possessionAway: 100 - pHome,
    shotsOnTargetHome: stats.shotsOnTargetHome + (randomIntFn(0, 1) === 1 ? 1 : 0),
    shotsOnTargetAway: stats.shotsOnTargetAway + (randomIntFn(0, 1) === 1 ? 1 : 0),
    foulsHome: stats.foulsHome + (randomIntFn(0, 4) === 0 ? 1 : 0),
    foulsAway: stats.foulsAway + (randomIntFn(0, 4) === 0 ? 1 : 0),
    cornersHome: stats.cornersHome + (randomIntFn(0, 5) === 0 ? 1 : 0),
    cornersAway: stats.cornersAway + (randomIntFn(0, 5) === 0 ? 1 : 0),
  };
}

/**
 * Compute one simulation tick. Returns new state, new eventId, and messages to broadcast.
 * @param {object} state - Current match state
 * @param {number} eventId - Last used event id
 * @param {string} matchId - Match id (for event ids)
 * @param {{ eventChance: number, statsUpdateChance: number, breakRemaining?: number, breakStartMinute?: number, breakDuration?: number }} options
 * @returns {{ state: object, eventId: number, breakRemaining: number, messages: Array<{ type: string, payload: object }>, finished: boolean }}
 */
export function runTick(
  state,
  eventId,
  matchId,
  { eventChance, statsUpdateChance, breakRemaining = 0, breakStartMinute = 45, breakDuration = 5 }
) {
  if (state.status === MatchStatus.FINISHED) {
    return { state, eventId, breakRemaining: 0, messages: [], finished: true };
  }

  if (state.status === MatchStatus.BREAK) {
    const remaining = breakRemaining - 1;
    if (remaining > 0) {
      return { state, eventId, breakRemaining: remaining, messages: [], finished: false };
    }
    const resumed = { ...state, status: MatchStatus.LIVE };
    return {
      state: resumed,
      eventId,
      breakRemaining: 0,
      messages: [{ type: MessageType.MATCH_STATE, payload: resumed }],
      finished: false,
    };
  }

  let nextState = { ...state, minute: state.minute + 1 };
  const messages = [];

  if (nextState.minute >= 90) {
    nextState = { ...nextState, status: MatchStatus.FINISHED };
    messages.push({ type: MessageType.MATCH_STATE, payload: nextState });
    return { state: nextState, eventId, breakRemaining: 0, messages, finished: true };
  }

  messages.push({ type: MessageType.TICK, payload: { minute: nextState.minute } });

  if (nextState.minute === breakStartMinute) {
    nextState = { ...nextState, status: MatchStatus.BREAK };
    messages.push({ type: MessageType.MATCH_STATE, payload: nextState });
    return { state: nextState, eventId, breakRemaining: breakDuration, messages, finished: false };
  }

  if (Math.random() < eventChance) {
    const type = pick(EVENT_TYPES);
    const team = pick(TEAMS);
    const players = team === Team.HOME ? PLAYERS_HOME : PLAYERS_AWAY;
    const event = {
      id: `ev-${matchId}-${eventId + 1}`,
      minute: nextState.minute,
      type,
      playerName: pick(players),
      team,
    };
    if (type === EventType.SUBSTITUTION) {
      const otherPlayers = players.filter((p) => p !== event.playerName);
      if (otherPlayers.length > 0) event.secondary = pick(otherPlayers);
    }
    if (type === EventType.GOAL) {
      nextState = {
        ...nextState,
        scoreHome: team === Team.HOME ? nextState.scoreHome + 1 : nextState.scoreHome,
        scoreAway: team === Team.AWAY ? nextState.scoreAway + 1 : nextState.scoreAway,
      };
    }
    nextState = { ...nextState, events: [...nextState.events, event] };
    eventId += 1;
    messages.push({ type: MessageType.EVENT, payload: event });
  }

  if (Math.random() < statsUpdateChance) {
    nextState = { ...nextState, stats: nextStats(nextState.stats) };
    messages.push({ type: MessageType.STATS, payload: nextState.stats });
  }

  messages.push({ type: MessageType.MATCH_STATE, payload: nextState });
  return { state: nextState, eventId, breakRemaining, messages, finished: false };
}
