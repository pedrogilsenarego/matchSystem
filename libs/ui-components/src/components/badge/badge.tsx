import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import * as styles from './badge.css';

export type BadgeVariant = 'live' | 'break' | 'finished' | 'upcoming' | 'success' | 'info';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  asChild?: boolean;
}

export function Badge({ variant = 'info', asChild = false, className, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp className={clsx(styles.badge, styles.badgeVariant[variant], className)} {...props} />
  );
}
