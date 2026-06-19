import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PauseButton } from './pause-button';

describe('PauseButton', () => {
  it('shows Pause while running', () => {
    render(<PauseButton paused={false} onToggle={() => {}} />);
    expect(screen.getByRole('button')).toHaveTextContent('Pause');
  });

  it('shows Resume while paused', () => {
    render(<PauseButton paused onToggle={() => {}} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Resume');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('requests the opposite state on click', () => {
    const onToggle = vi.fn();
    render(<PauseButton paused={false} onToggle={onToggle} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('does not fire when disabled', () => {
    const onToggle = vi.fn();
    render(<PauseButton paused={false} disabled onToggle={onToggle} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onToggle).not.toHaveBeenCalled();
  });
});
