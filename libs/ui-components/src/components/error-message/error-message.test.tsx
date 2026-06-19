import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ErrorMessage } from './error-message';
import * as styles from './error-message.css';

describe('ErrorMessage', () => {
  it('renders the message prop inside an alert', () => {
    render(<ErrorMessage message="Something failed" />);
    const el = screen.getByRole('alert');
    expect(el).toHaveTextContent('Something failed');
    expect(el).toHaveClass(styles.errorMessage);
  });

  it('renders children when provided', () => {
    render(<ErrorMessage>Custom body</ErrorMessage>);
    expect(screen.getByRole('alert')).toHaveTextContent('Custom body');
  });

  it('prefers children over the message prop', () => {
    render(<ErrorMessage message="ignored">Custom body</ErrorMessage>);
    const el = screen.getByRole('alert');
    expect(el).toHaveTextContent('Custom body');
    expect(el).not.toHaveTextContent('ignored');
  });

  it('merges a custom className', () => {
    render(<ErrorMessage className="extra" message="Oops" />);
    const el = screen.getByRole('alert');
    expect(el).toHaveClass(styles.errorMessage);
    expect(el).toHaveClass('extra');
  });
});
