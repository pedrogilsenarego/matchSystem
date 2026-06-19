import * as React from 'react';
import clsx from 'clsx';
import * as styles from './error-message.css';

export interface ErrorMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Error message to display */
  message?: string;
}

/**
 * Display error messages with consistent styling and accessibility.
 * Includes `role="alert"` for screen readers.
 *
 * @example
 * ```tsx
 * <ErrorMessage message="An error occurred" />
 *
 * // Or with children
 * <ErrorMessage>
 *   <strong>Error:</strong> Something went wrong
 * </ErrorMessage>
 * ```
 */
export function ErrorMessage({ message, children, className, ...props }: ErrorMessageProps) {
  return (
    <div className={clsx(styles.errorMessage, className)} role="alert" {...props}>
      {children || message}
    </div>
  );
}
