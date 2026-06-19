import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import * as styles from './button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'muted';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button visual style variant. @default 'primary' */
  variant?: ButtonVariant;
  /** Button size. @default 'md' */
  size?: ButtonSize;
  /** Toggle active/pressed state */
  active?: boolean;
  /** Render as a different element via Radix Slot */
  asChild?: boolean;
}

/**
 * A flexible button component with multiple variants, sizes, and states.
 *
 * @example
 * ```tsx
 * <Button variant="primary">Click me</Button>
 * <Button variant="secondary" size="sm">Small</Button>
 * <Button variant="danger" disabled>Disabled</Button>
 * <Button variant="success" active>Active</Button>
 * ```
 */
export function Button({
  variant = 'primary',
  size = 'md',
  active = false,
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
        className
      )}
      {...props}
    />
  );
}
