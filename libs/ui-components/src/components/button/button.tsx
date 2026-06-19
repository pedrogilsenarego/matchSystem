import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import * as styles from './button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'muted';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  active?: boolean;
  pulse?: boolean;
  asChild?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  active = false,
  pulse = false,
  asChild = false,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      type={asChild ? undefined : type}
      className={clsx(
        styles.button,
        styles.buttonSize[size],
        styles.buttonVariant[variant],
        active && styles.buttonActive,
        pulse && styles.buttonPulse,
        className
      )}
      {...props}
    />
  );
}
