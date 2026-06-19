import * as React from 'react';
import clsx from 'clsx';
import * as styles from './loading-message.css';

export interface LoadingMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Loading message to display. @default 'Loading...' */
  message?: string;
}

/**
 * Display loading states with consistent styling and accessibility.
 * Includes `role="status"` for screen readers.
 *
 * @example
 * ```tsx
 * <LoadingMessage />
 *
 * // Or with custom message
 * <LoadingMessage message="Loading data..." />
 * ```
 */
export function LoadingMessage({
  message = 'Loading...',
  children,
  className,
  ...props
}: LoadingMessageProps) {
  return (
    <div className={clsx(styles.loadingMessage, className)} role="status" {...props}>
      {children || message}
    </div>
  );
}
