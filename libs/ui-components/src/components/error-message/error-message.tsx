import * as React from 'react';
import clsx from 'clsx';
import * as styles from './error-message.css';

export interface ErrorMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
}

export function ErrorMessage({ message, children, className, ...props }: ErrorMessageProps) {
  return (
    <div className={clsx(styles.errorMessage, className)} role="alert" {...props}>
      {children || message}
    </div>
  );
}
