import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './button';
import * as styles from './button.css';

describe('Button', () => {
  it('renders its children inside a button element', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('defaults to the primary variant and medium size', () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(styles.buttonVariant.primary);
    expect(button).toHaveClass(styles.buttonSize.md);
  });

  it('applies the requested variant and size', () => {
    render(
      <Button variant="secondary" size="lg">
        Accent
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass(styles.buttonVariant.secondary);
    expect(button).toHaveClass(styles.buttonSize.lg);
  });

  it('adds the active class only when active', () => {
    const { rerender } = render(<Button>Idle</Button>);
    expect(screen.getByRole('button')).not.toHaveClass(styles.buttonActive);
    rerender(<Button active>Pressed</Button>);
    expect(screen.getByRole('button')).toHaveClass(styles.buttonActive);
  });

  it('adds the pulse class only when pulse is set', () => {
    const { rerender } = render(<Button>Static</Button>);
    expect(screen.getByRole('button')).not.toHaveClass(styles.buttonPulse);
    rerender(
      <Button variant="danger" pulse>
        Live
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass(styles.buttonPulse);
    expect(button).toHaveClass(styles.buttonVariant.danger);
  });

  it('defaults the type attribute to button', () => {
    render(<Button>Submit guard</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('fires onClick when pressed', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Press</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClick when disabled', () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Press
      </Button>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders as the child element when asChild is set', () => {
    render(
      <Button asChild>
        <a href="/next">Go</a>
      </Button>
    );
    const link = screen.getByRole('link', { name: 'Go' });
    expect(link).toHaveClass(styles.button);
    expect(link).not.toHaveAttribute('type');
  });
});
