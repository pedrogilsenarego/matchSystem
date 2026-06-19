import { style } from '@vanilla-extract/css';
import { vars } from 'design-system';

export const card = style({
  background: vars.color.background.surface,
  borderRadius: vars.borderRadius.lg,
  padding: `${vars.spacing.xl} ${vars.spacing['2xl']}`,
  boxShadow: vars.shadow.sm,
});
