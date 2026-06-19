import * as React from 'react';
import clsx from 'clsx';
import * as styles from './progress-bar.css';

export type ProgressBarRole = 'meter' | 'progressbar';

export interface ProgressBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'role'> {
  value: number;
  min?: number;
  max?: number;
  label?: string;
  role?: ProgressBarRole;
}

export function ProgressBar({
  value,
  min = 0,
  max = 100,
  label,
  role = 'meter',
  className,
  ...props
}: ProgressBarProps) {
  const range = max - min;
  const ratio = range <= 0 ? 0 : (value - min) / range;
  const filled = Math.min(1, Math.max(0, ratio));
  const remainingPercent = (1 - filled) * 100;

  return (
    <div
      role={role}
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      className={clsx(styles.track, className)}
      {...props}
    >
      <div className={styles.remaining} style={{ width: `${remainingPercent}%` }} />
    </div>
  );
}
