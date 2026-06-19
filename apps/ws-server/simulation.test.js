import { describe, it, expect } from 'vitest';
import { runTick, createInitialState, MatchStatus, MessageType } from './simulation.js';

const NO_RANDOM = { eventChance: 0, statsUpdateChance: 0 };
const BREAK_OPTIONS = { ...NO_RANDOM, breakStartMinute: 45, breakDuration: 5 };

function stateAtMinute(minute, status = MatchStatus.LIVE) {
  return { ...createInitialState('match-1', 'Star Team', 'B Team'), minute, status };
}

describe('runTick half-time break', () => {
  it('enters the break when the clock reaches the break minute', () => {
    const result = runTick(stateAtMinute(44), 0, 'match-1', BREAK_OPTIONS);

    expect(result.state.minute).toBe(45);
    expect(result.state.status).toBe(MatchStatus.BREAK);
    expect(result.breakRemaining).toBe(5);
    expect(result.finished).toBe(false);
    expect(result.messages).toContainEqual({ type: MessageType.MATCH_STATE, payload: result.state });
  });

  it('freezes the clock and emits nothing while the break runs', () => {
    const result = runTick(stateAtMinute(45, MatchStatus.BREAK), 0, 'match-1', {
      ...BREAK_OPTIONS,
      breakRemaining: 5,
    });

    expect(result.state.minute).toBe(45);
    expect(result.state.status).toBe(MatchStatus.BREAK);
    expect(result.breakRemaining).toBe(4);
    expect(result.messages).toEqual([]);
  });

  it('resumes live play on the final break tick', () => {
    const result = runTick(stateAtMinute(45, MatchStatus.BREAK), 0, 'match-1', {
      ...BREAK_OPTIONS,
      breakRemaining: 1,
    });

    expect(result.state.status).toBe(MatchStatus.LIVE);
    expect(result.state.minute).toBe(45);
    expect(result.breakRemaining).toBe(0);
    expect(result.messages).toEqual([
      { type: MessageType.MATCH_STATE, payload: result.state },
    ]);
  });

  it('does not generate events while on break', () => {
    const result = runTick(stateAtMinute(45, MatchStatus.BREAK), 3, 'match-1', {
      eventChance: 1,
      statsUpdateChance: 1,
      breakRemaining: 3,
    });

    expect(result.eventId).toBe(3);
    expect(result.messages).toEqual([]);
  });

  it('advances the clock normally outside the break window', () => {
    const result = runTick(stateAtMinute(20), 0, 'match-1', BREAK_OPTIONS);

    expect(result.state.minute).toBe(21);
    expect(result.state.status).toBe(MatchStatus.LIVE);
    expect(result.messages).toContainEqual({ type: MessageType.TICK, payload: { minute: 21 } });
  });
});
