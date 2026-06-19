import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import * as styles from './elevated-card.css';

export type ElevatedCardVariant = 'default' | 'glass';

export interface ElevatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  variant?: ElevatedCardVariant;
}

export function ElevatedCard({
  asChild = false,
  variant = 'default',
  className,
  ...props
}: ElevatedCardProps) {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      className={clsx(styles.elevatedCard, styles.variant[variant], className)}
      {...props}
    />
  );
}
