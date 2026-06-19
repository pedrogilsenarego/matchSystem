import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from 'design-system';

export const heading = style({
  margin: 0,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.text.primary,
  lineHeight: vars.lineHeight.tight,
});

export const headingLevel = styleVariants({
  1: {
    fontSize: vars.fontSize['3xl'],
    marginBottom: vars.spacing.xl,
  },
  2: {
    fontSize: vars.fontSize['2xl'],
    marginBottom: vars.spacing.lg,
  },
  3: {
    fontSize: vars.fontSize.xl,
    marginBottom: vars.spacing.lg,
  },
  4: {
    fontSize: vars.fontSize.lg,
    marginBottom: vars.spacing.md,
  },
  5: {
    fontSize: vars.fontSize.base,
    marginBottom: vars.spacing.md,
  },
  6: {
    fontSize: vars.fontSize.sm,
    marginBottom: vars.spacing.sm,
    fontWeight: vars.fontWeight.semibold,
  },
});
