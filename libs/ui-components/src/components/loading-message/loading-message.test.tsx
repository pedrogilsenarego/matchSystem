import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoadingMessage } from './loading-message';
import * as styles from './loading-message.css';

describe('LoadingMessage', () => {
  it('renders the default message inside a status region', () => {
    render(<LoadingMessage />);
    const el = screen.getByRole('status');
    expect(el).toHaveTextContent('Loading...');
    expect(el).toHaveClass(styles.loadingMessage);
  });

  it('renders a custom message', () => {
    render(<LoadingMessage message="Fetching match" />);
    expect(screen.getByRole('status')).toHaveTextContent('Fetching match');
  });

  it('prefers children over the message prop', () => {
    render(<LoadingMessage message="ignored">Custom body</LoadingMessage>);
    const el = screen.getByRole('status');
    expect(el).toHaveTextContent('Custom body');
    expect(el).not.toHaveTextContent('ignored');
  });

  it('merges a custom className', () => {
    render(<LoadingMessage className="extra" />);
    const el = screen.getByRole('status');
    expect(el).toHaveClass(styles.loadingMessage);
    expect(el).toHaveClass('extra');
  });
});
