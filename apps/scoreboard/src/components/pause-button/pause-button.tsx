import { Button } from 'ui-components';
import { usePauseButton } from './use-pause-button';

export interface PauseButtonProps {
  paused: boolean;
  disabled?: boolean;
  onToggle: (paused: boolean) => void;
}

export function PauseButton({ paused, disabled = false, onToggle }: PauseButtonProps) {
  const { label, variant, active, ariaPressed, toggle } = usePauseButton(paused, onToggle);

  return (
    <Button
      variant={variant}
      size="sm"
      active={active}
      disabled={disabled}
      aria-pressed={ariaPressed}
      onClick={toggle}
    >
      {label}
    </Button>
  );
}
