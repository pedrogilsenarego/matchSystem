/**
 * WebSocket server for live match feed.
 * Clients send { type: 'subscribe', matchId }. Server runs one simulation per match
 * and broadcasts LiveFeedMessage JSON to all subscribers of that match.
 */
import { WebSocketServer } from 'ws';
import {
  PORT,
  TICK_MS,
  EVENT_CHANCE,
  STATS_UPDATE_CHANCE,
  HEARTBEAT_INTERVAL_MS,
  MAX_PAYLOAD_BYTES,
  MATCHES,
  BREAK_START_MINUTE,
  BREAK_DURATION_TICKS,
} from './config.js';
import { createInitialState, runTick as runTickLogic } from './simulation.js';

/** @type {Map<string, { clients: Set<import('ws').WebSocket>, state: object, intervalId: ReturnType<typeof setInterval>, eventId: number }>} */
const matchRooms = new Map();

/** Look up match metadata (homeTeam, awayTeam) by matchId from config */
function getMatchMeta(matchId) {
  return MATCHES.find((m) => m.matchId === matchId);
}

/** Send a JSON message to every connected client in the given match room */
function broadcast(matchId, message) {
  const room = matchRooms.get(matchId);
  if (!room) return;
  const payload = JSON.stringify(message);
  for (const ws of room.clients) {
    if (ws.readyState === 1) ws.send(payload);
  }
}

/** Advance the match simulation by one tick */
function runTick(matchId) {
  const room = matchRooms.get(matchId);
  if (!room) return;

  const { state, eventId, breakRemaining, messages, finished } = runTickLogic(
    room.state,
    room.eventId,
    matchId,
    {
      eventChance: EVENT_CHANCE,
      statsUpdateChance: STATS_UPDATE_CHANCE,
      breakRemaining: room.breakRemaining,
      breakStartMinute: BREAK_START_MINUTE,
      breakDuration: BREAK_DURATION_TICKS,
    }
  );

  room.state = state;
  room.eventId = eventId;
  room.breakRemaining = breakRemaining;
  if (finished) clearInterval(room.intervalId);
  for (const msg of messages) {
    broadcast(matchId, msg);
  }
}

/** Start the simulation for a match if not already running: create it */
function startMatchSimulation(matchId, homeTeam, awayTeam) {
  if (matchRooms.has(matchId)) return;
  const state = createInitialState(matchId, homeTeam, awayTeam);
  const clients = new Set();
  const intervalId = setInterval(() => runTick(matchId), TICK_MS);
  matchRooms.set(matchId, { clients, state, intervalId, eventId: 0 });
}

/** Add a client to a match room (starting simulation if needed), then send current match state */
function subscribeClient(ws, matchId) {
  const meta = getMatchMeta(matchId);
  if (!meta) {
    ws.send(JSON.stringify({ type: 'error', payload: { message: `Unknown match: ${matchId}` } }));
    return;
  }
  startMatchSimulation(matchId, meta.homeTeam, meta.awayTeam);
  const room = matchRooms.get(matchId);
  room.clients.add(ws);
    ws.send(JSON.stringify({ type: 'match_state', payload: room.state }));
}

/** Remove a client from a match room; if no clients remain, stop the tick interval and delete the room */
function unsubscribeClient(ws, matchId) {
  const room = matchRooms.get(matchId);
  if (!room) return;
  room.clients.delete(ws);
  if (room.clients.size === 0) {
    clearInterval(room.intervalId);
    matchRooms.delete(matchId);
  }
}

/** Pong handler */
function heartbeat() {
  this.isAlive = true;
}

/** Create the WebSocket server */
const wss = new WebSocketServer({
  port: PORT,
  maxPayload: MAX_PAYLOAD_BYTES,
  perMessageDeflate: false,
});

const heartbeatInterval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) return void ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, HEARTBEAT_INTERVAL_MS);

wss.on('close', () => {
  clearInterval(heartbeatInterval);
});

wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('pong', heartbeat);

  let subscribedMatchId = null;

  ws.on('error', () => {
    if (subscribedMatchId) unsubscribeClient(ws, subscribedMatchId);
  });

  ws.on('message', (raw) => {
    try {
      const msg = JSON.parse(raw.toString());
      if (msg.type === 'subscribe' && msg.matchId) {
        if (subscribedMatchId) unsubscribeClient(ws, subscribedMatchId);
        subscribedMatchId = msg.matchId;
        subscribeClient(ws, msg.matchId);
      }
    } catch {
      // ignore invalid JSON
    }
  });

  ws.on('close', () => {
    if (subscribedMatchId) unsubscribeClient(ws, subscribedMatchId);
  });
});

wss.on('listening', () => {
  console.log(`Live feed WebSocket server listening on ws://localhost:${PORT}`);
});

/** Stop all match tick intervals, close the WebSocket server, and exit the process. Used on SIGINT/SIGTERM for clean shutdown. */
function shutdown() {
  for (const [, room] of matchRooms) {
    clearInterval(room.intervalId);
  }
  matchRooms.clear();
  wss.close(() => process.exit(0));
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
