import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import * as styles from './heading.css';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  asChild?: boolean;
}

export function Heading({ level = 2, asChild = false, className, ...props }: HeadingProps) {
  const Comp = asChild ? Slot : (`h${level}` as const);

  return (
    <Comp className={clsx(styles.heading, styles.headingLevel[level], className)} {...props} />
  );
}
