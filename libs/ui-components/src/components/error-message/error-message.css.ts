import { style } from '@vanilla-extract/css';
import { vars } from 'design-system';

export const errorMessage = style({
  padding: vars.spacing.lg,
  background: vars.color.error.background,
  color: vars.color.error.text,
  borderRadius: vars.borderRadius.md,
});
