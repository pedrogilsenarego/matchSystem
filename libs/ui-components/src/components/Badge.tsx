import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import * as styles from './badge.css';

export type BadgeVariant = 'live' | 'break' | 'finished' | 'upcoming' | 'success' | 'info';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Badge visual variant with semantic colors. @default 'info' */
  variant?: BadgeVariant;
  /** Render as a different element via Radix Slot */
  asChild?: boolean;
}

/**
 * Display status badges with semantic color variants.
 *
 * @example
 * ```tsx
 * <Badge variant="live">Live</Badge>
 * <Badge variant="finished">Finished</Badge>
 * <Badge variant="upcoming">Upcoming</Badge>
 * <Badge variant="success">Success</Badge>
 * <Badge variant="info">Info</Badge>
 * ```
 */
export function Badge({ variant = 'info', asChild = false, className, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp className={clsx(styles.badge, styles.badgeVariant[variant], className)} {...props} />
  );
}
