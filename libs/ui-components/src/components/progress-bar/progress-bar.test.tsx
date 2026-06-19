import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProgressBar } from './progress-bar';

const remainingOf = (meter: HTMLElement) => meter.firstElementChild as HTMLElement;

describe('ProgressBar', () => {
  it('exposes meter semantics with the value and bounds', () => {
    render(<ProgressBar value={60} label="Possession" />);
    const meter = screen.getByRole('meter', { name: 'Possession' });
    expect(meter).toHaveAttribute('aria-valuenow', '60');
    expect(meter).toHaveAttribute('aria-valuemin', '0');
    expect(meter).toHaveAttribute('aria-valuemax', '100');
  });

  it('sizes the remaining overlay to the unfilled portion', () => {
    render(<ProgressBar value={60} label="x" />);
    expect(remainingOf(screen.getByRole('meter'))).toHaveStyle({ width: '40%' });
  });

  it('clamps values outside the range', () => {
    const { rerender } = render(<ProgressBar value={150} label="x" />);
    expect(remainingOf(screen.getByRole('meter'))).toHaveStyle({ width: '0%' });
    rerender(<ProgressBar value={-20} label="x" />);
    expect(remainingOf(screen.getByRole('meter'))).toHaveStyle({ width: '100%' });
  });

  it('supports a custom min/max range', () => {
    render(<ProgressBar value={5} min={0} max={10} label="x" />);
    expect(remainingOf(screen.getByRole('meter'))).toHaveStyle({ width: '50%' });
  });

  it('can render with the progressbar role', () => {
    render(<ProgressBar value={30} role="progressbar" label="Loading" />);
    expect(screen.getByRole('progressbar', { name: 'Loading' })).toBeInTheDocument();
  });
});
