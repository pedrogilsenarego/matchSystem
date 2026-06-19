import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useMatchOverview } from './use-match-overview';

describe('useMatchOverview', () => {
  it('shows the minute only while live', () => {
    const { result } = renderHook(() => useMatchOverview('live'));
    expect(result.current.statusLabel).toBe('Live');
    expect(result.current.showMinute).toBe(true);
    expect(result.current.showBreak).toBe(false);
  });

  it('shows the break indicator during a break', () => {
    const { result } = renderHook(() => useMatchOverview('break'));
    expect(result.current.statusLabel).toBe('Break');
    expect(result.current.showMinute).toBe(false);
    expect(result.current.showBreak).toBe(true);
  });

  it('hides indicators when finished', () => {
    const { result } = renderHook(() => useMatchOverview('finished'));
    expect(result.current.statusLabel).toBe('Finished');
    expect(result.current.showMinute).toBe(false);
    expect(result.current.showBreak).toBe(false);
  });
});
