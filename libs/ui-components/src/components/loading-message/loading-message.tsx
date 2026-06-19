import * as React from 'react';
import clsx from 'clsx';
import * as styles from './loading-message.css';

export interface LoadingMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
}

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
