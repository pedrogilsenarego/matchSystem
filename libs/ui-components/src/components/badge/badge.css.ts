import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from 'design-system';

export const badge = style({
  display: 'inline-flex',
  alignItems: 'center',
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.bold,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  padding: `${vars.spacing.xs} ${vars.spacing.sm}`,
  borderRadius: vars.borderRadius.sm,
});

export const badgeVariant = styleVariants({
  live: {
    background: vars.color.semantic.danger,
    color: vars.color.text.inverse,
  },
  break: {
    background: vars.color.semantic.warning,
    color: vars.color.text.inverse,
  },
  finished: {
    background: vars.color.semantic.gray,
    color: vars.color.text.inverse,
  },
  upcoming: {
    background: vars.color.background.light,
    color: vars.color.text.secondary,
  },
  success: {
    background: vars.color.semantic.success,
    color: vars.color.text.inverse,
  },
  info: {
    background: vars.color.semantic.info,
    color: vars.color.text.inverse,
  },
});
