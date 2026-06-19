import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ElevatedCard } from './elevated-card';
import * as styles from './elevated-card.css';

describe('ElevatedCard', () => {
  it('renders its children inside a div by default', () => {
    render(<ElevatedCard>Body</ElevatedCard>);
    const el = screen.getByText('Body');
    expect(el.tagName).toBe('DIV');
    expect(el).toHaveClass(styles.elevatedCard);
  });

  it('merges a custom className', () => {
    render(<ElevatedCard className="extra">Body</ElevatedCard>);
    const el = screen.getByText('Body');
    expect(el).toHaveClass(styles.elevatedCard);
    expect(el).toHaveClass('extra');
  });

  it('renders as the child element when asChild is set', () => {
    render(
      <ElevatedCard asChild>
        <section aria-label="Panel">Body</section>
      </ElevatedCard>,
    );
    const section = screen.getByRole('region', { name: 'Panel' });
    expect(section).toHaveClass(styles.elevatedCard);
  });
});
