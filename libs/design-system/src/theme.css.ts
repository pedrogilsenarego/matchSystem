import { createGlobalTheme, createGlobalThemeContract } from '@vanilla-extract/css';
import { primary, secondary, base } from './colors';

// Define the CSS variable names contract (no hashing, explicit names)
const themeContract = createGlobalThemeContract({
  color: {
    text: {
      primary: 'color-text-primary',
      secondary: 'color-text-secondary',
      muted: 'color-text-muted',
      inverse: 'color-text-inverse',
    },
    background: {
      primary: 'color-background-primary',
      secondary: 'color-background-secondary',
      surface: 'color-background-surface',
      light: 'color-background-light',
      raised: 'color-background-raised',
    },
    semantic: {
      success: 'color-semantic-success',
      danger: 'color-semantic-danger',
      warning: 'color-semantic-warning',
      info: 'color-semantic-info',
      gray: 'color-semantic-gray',
    },
    primary: {
      50: 'color-primary-50',
      100: 'color-primary-100',
      200: 'color-primary-200',
      300: 'color-primary-300',
      400: 'color-primary-400',
      500: 'color-primary-500',
      600: 'color-primary-600',
      700: 'color-primary-700',
      800: 'color-primary-800',
      900: 'color-primary-900',
    },
    secondary: {
      50: 'color-secondary-50',
      100: 'color-secondary-100',
      200: 'color-secondary-200',
      300: 'color-secondary-300',
      400: 'color-secondary-400',
      500: 'color-secondary-500',
      600: 'color-secondary-600',
      700: 'color-secondary-700',
      800: 'color-secondary-800',
      900: 'color-secondary-900',
    },
    base: {
      50: 'color-base-50',
      100: 'color-base-100',
      200: 'color-base-200',
      300: 'color-base-300',
      400: 'color-base-400',
      500: 'color-base-500',
      600: 'color-base-600',
      700: 'color-base-700',
      800: 'color-base-800',
      900: 'color-base-900',
    },
    error: {
      background: 'color-error-background',
      text: 'color-error-text',
    },
    border: {
      light: 'color-border-light',
      medium: 'color-border-medium',
    },
  },
  spacing: {
    xs: 'spacing-xs',
    sm: 'spacing-sm',
    md: 'spacing-md',
    lg: 'spacing-lg',
    xl: 'spacing-xl',
    '2xl': 'spacing-2xl',
  },
  borderRadius: {
    sm: 'border-radius-sm',
    md: 'border-radius-md',
    lg: 'border-radius-lg',
  },
  shadow: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  },
  fontSize: {
    xs: 'font-size-xs',
    sm: 'font-size-sm',
    base: 'font-size-base',
    lg: 'font-size-lg',
    xl: 'font-size-xl',
    '2xl': 'font-size-2xl',
    '3xl': 'font-size-3xl',
  },
  fontWeight: {
    normal: 'font-weight-normal',
    medium: 'font-weight-medium',
    semibold: 'font-weight-semibold',
    bold: 'font-weight-bold',
    extrabold: 'font-weight-extrabold',
  },
  lineHeight: {
    tight: 'line-height-tight',
    normal: 'line-height-normal',
    relaxed: 'line-height-relaxed',
  },
  stateLayer: {
    hover: 'state-layer-hover',
    active: 'state-layer-active',
  },
});

// Apply the actual values to the contract
createGlobalTheme(':root', themeContract, {
  color: {
    text: {
      primary: '#1a1a1a',
      secondary: '#495057',
      muted: '#868e96',
      inverse: '#ffffff',
    },
    background: {
      primary: '#f5f5f5',
      secondary: '#e8e8e8',
      surface: '#ffffff',
      light: '#e9ecef',
      raised: '#f1f3f5',
    },
    semantic: {
      success: '#198754',
      danger: '#dc3545',
      warning: '#d4a00d',
      info: '#0d6efd',
      gray: '#6c757d',
    },
    primary,
    secondary,
    base,
    error: {
      background: '#f8d7da',
      text: '#721c24',
    },
    border: {
      light: '#f1f3f5',
      medium: '#e9ecef',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
  shadow: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.08)',
    md: '0 2px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 4px 12px rgba(0, 0, 0, 0.12)',
    xl: '0 12px 32px rgba(0, 0, 0, 0.18)',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  lineHeight: {
    tight: '1',
    normal: '1.5',
    relaxed: '1.75',
  },
  stateLayer: {
    hover: '8%',
    active: '12%',
  },
});

// Export the theme contract as vars for use in TypeScript
export const vars = themeContract;
