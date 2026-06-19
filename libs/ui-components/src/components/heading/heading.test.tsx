import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Heading } from './heading';
import * as styles from './heading.css';

describe('Heading', () => {
  it('renders an h2 by default', () => {
    render(<Heading>Title</Heading>);
    const el = screen.getByRole('heading', { name: 'Title' });
    expect(el.tagName).toBe('H2');
    expect(el).toHaveClass(styles.heading);
    expect(el).toHaveClass(styles.headingLevel[2]);
  });

  it('renders the heading element matching the requested level', () => {
    render(<Heading level={4}>Subtitle</Heading>);
    const el = screen.getByRole('heading', { name: 'Subtitle', level: 4 });
    expect(el.tagName).toBe('H4');
    expect(el).toHaveClass(styles.headingLevel[4]);
  });

  it('merges a custom className', () => {
    render(<Heading className="extra">Title</Heading>);
    const el = screen.getByRole('heading', { name: 'Title' });
    expect(el).toHaveClass(styles.heading);
    expect(el).toHaveClass('extra');
  });

  it('renders as the child element when asChild is set', () => {
    render(
      <Heading asChild level={1}>
        <a href="/home">Home</a>
      </Heading>
    );
    const link = screen.getByRole('link', { name: 'Home' });
    expect(link).toHaveClass(styles.heading);
    expect(link).toHaveClass(styles.headingLevel[1]);
  });
});
