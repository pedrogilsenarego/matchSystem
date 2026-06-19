import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css';

// Global CSS resets - only applied when this module is imported
// Import this in your app's entry point: import 'design-system/global';

globalStyle('*', {
  boxSizing: 'border-box',
});

globalStyle('body', {
  margin: 0,
  minHeight: '100vh',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  lineHeight: vars.lineHeight.normal,
  fontWeight: vars.fontWeight.normal,
  color: vars.color.text.primary,
  backgroundColor: vars.color.background.primary,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});
