import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from './badge';
import * as styles from './badge.css';

describe('Badge', () => {
  it('renders its children inside a span by default', () => {
    render(<Badge>Live</Badge>);
    const el = screen.getByText('Live');
    expect(el.tagName).toBe('SPAN');
    expect(el).toHaveClass(styles.badge);
  });

  it('defaults to the info variant', () => {
    render(<Badge>Info</Badge>);
    expect(screen.getByText('Info')).toHaveClass(styles.badgeVariant.info);
  });

  it('applies the requested variant', () => {
    render(<Badge variant="live">Live</Badge>);
    const el = screen.getByText('Live');
    expect(el).toHaveClass(styles.badgeVariant.live);
    expect(el).not.toHaveClass(styles.badgeVariant.info);
  });

  it('merges a custom className', () => {
    render(<Badge className="extra">Tag</Badge>);
    const el = screen.getByText('Tag');
    expect(el).toHaveClass(styles.badge);
    expect(el).toHaveClass('extra');
  });

  it('renders as the child element when asChild is set', () => {
    render(
      <Badge asChild variant="success">
        <a href="/status">Status</a>
      </Badge>
    );
    const link = screen.getByRole('link', { name: 'Status' });
    expect(link).toHaveClass(styles.badge);
    expect(link).toHaveClass(styles.badgeVariant.success);
  });
});
