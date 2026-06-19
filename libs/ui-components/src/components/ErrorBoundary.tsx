import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ErrorMessage } from './ErrorMessage';

export interface ErrorBoundaryProps {
  children: ReactNode;
  /** Custom error UI (uses ErrorMessage if not provided) */
  fallback?: ReactNode;
  /** Error callback for logging or tracking */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Catch JavaScript errors in child component trees and display a fallback UI.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ErrorBoundary onError={(error) => logToService(error)}>
 *   <MyApp />
 * </ErrorBoundary>
 *
 * // With custom fallback
 * <ErrorBoundary fallback={<div>Custom error UI</div>}>
 *   <RemoteComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorMessage>
          <strong>Something went wrong.</strong>
          <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>{this.state.error.message}</p>
        </ErrorMessage>
      );
    }

    return this.props.children;
  }
}
