import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { usePauseButton } from './use-pause-button';

describe('usePauseButton', () => {
  it('derives the running state', () => {
    const { result } = renderHook(() => usePauseButton(false, () => {}));
    expect(result.current.label).toBe('Pause');
    expect(result.current.variant).toBe('muted');
    expect(result.current.active).toBe(false);
    expect(result.current.ariaPressed).toBe(false);
  });

  it('derives the paused state', () => {
    const { result } = renderHook(() => usePauseButton(true, () => {}));
    expect(result.current.label).toBe('Resume');
    expect(result.current.variant).toBe('success');
    expect(result.current.active).toBe(true);
    expect(result.current.ariaPressed).toBe(true);
  });

  it('toggle requests the opposite state', () => {
    const onToggle = vi.fn();
    const { result } = renderHook(() => usePauseButton(false, onToggle));
    result.current.toggle();
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('toggle from paused requests running', () => {
    const onToggle = vi.fn();
    const { result } = renderHook(() => usePauseButton(true, onToggle));
    result.current.toggle();
    expect(onToggle).toHaveBeenCalledWith(false);
  });
});
