import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import * as styles from './heading.css';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Heading level (1-6). @default 2 */
  level?: HeadingLevel;
  /** Render as a different element via Radix Slot */
  asChild?: boolean;
}

/**
 * Semantic heading component with automatic sizing and hierarchy.
 *
 * @example
 * ```tsx
 * <Heading level={1}>Main Title</Heading>
 * <Heading level={2}>Section</Heading>
 * <Heading level={3}>Subsection</Heading>
 * ```
 */
export function Heading({ level = 2, asChild = false, className, ...props }: HeadingProps) {
  const Comp = asChild ? Slot : (`h${level}` as const);

  return (
    <Comp className={clsx(styles.heading, styles.headingLevel[level], className)} {...props} />
  );
}
