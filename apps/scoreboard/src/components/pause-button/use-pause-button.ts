import { useCallback } from 'react';
import type { ButtonVariant } from 'ui-components';

const LABEL = { running: 'Pause', paused: 'Resume' } as const;
const VARIANT = { running: 'muted', paused: 'success' } as const;

export interface UsePauseButtonResult {
  label: string;
  variant: ButtonVariant;
  active: boolean;
  ariaPressed: boolean;
  toggle: () => void;
}

export function usePauseButton(
  paused: boolean,
  onToggle: (paused: boolean) => void,
): UsePauseButtonResult {
  const toggle = useCallback(() => onToggle(!paused), [paused, onToggle]);

  return {
    label: paused ? LABEL.paused : LABEL.running,
    variant: paused ? VARIANT.paused : VARIANT.running,
    active: paused,
    ariaPressed: paused,
    toggle,
  };
}
