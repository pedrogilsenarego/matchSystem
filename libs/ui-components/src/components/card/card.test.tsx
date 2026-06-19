import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from './card';
import * as styles from './card.css';

describe('Card', () => {
  it('renders its children inside a div by default', () => {
    render(<Card>Body</Card>);
    const el = screen.getByText('Body');
    expect(el.tagName).toBe('DIV');
    expect(el).toHaveClass(styles.card);
  });

  it('merges a custom className', () => {
    render(<Card className="extra">Body</Card>);
    const el = screen.getByText('Body');
    expect(el).toHaveClass(styles.card);
    expect(el).toHaveClass('extra');
  });

  it('forwards arbitrary props to the underlying element', () => {
    render(<Card data-testid="panel">Body</Card>);
    expect(screen.getByTestId('panel')).toHaveTextContent('Body');
  });

  it('renders as the child element when asChild is set', () => {
    render(
      <Card asChild>
        <section aria-label="Panel">Body</section>
      </Card>
    );
    const section = screen.getByRole('region', { name: 'Panel' });
    expect(section).toHaveClass(styles.card);
  });
});
