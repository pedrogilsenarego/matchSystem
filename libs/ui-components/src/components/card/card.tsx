import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import * as styles from './card.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export function Card({ asChild = false, className, ...props }: CardProps) {
  const Comp = asChild ? Slot : 'div';
  return <Comp className={clsx(styles.card, className)} {...props} />;
}
