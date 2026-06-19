import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import * as styles from './card.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Render as a different element via Radix Slot */
  asChild?: boolean;
}

/**
 * A simple card container with consistent styling.
 *
 * @example
 * ```tsx
 * <Card>
 *   <h2>Card Title</h2>
 *   <p>Card content goes here</p>
 * </Card>
 * ```
 */
export function Card({ asChild = false, className, ...props }: CardProps) {
  const Comp = asChild ? Slot : 'div';
  return <Comp className={clsx(styles.card, className)} {...props} />;
}
