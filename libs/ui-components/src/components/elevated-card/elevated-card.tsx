import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import * as styles from './elevated-card.css';

export interface ElevatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export function ElevatedCard({ asChild = false, className, ...props }: ElevatedCardProps) {
  const Comp = asChild ? Slot : 'div';
  return <Comp className={clsx(styles.elevatedCard, className)} {...props} />;
}
