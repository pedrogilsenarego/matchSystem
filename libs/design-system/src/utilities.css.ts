import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from './theme.css';

// Flex utilities
const flex = style({
  display: 'flex',
});

export const flexRow = style([
  flex,
  {
    flexDirection: 'row',
  },
]);

export const flexCol = style([
  flex,
  {
    flexDirection: 'column',
  },
]);

export const flexCenter = style([
  flex,
  {
    alignItems: 'center',
    justifyContent: 'center',
  },
]);

// Gap utilities
export const gap = styleVariants({
  xs: { gap: vars.spacing.xs },
  sm: { gap: vars.spacing.sm },
  md: { gap: vars.spacing.md },
  lg: { gap: vars.spacing.lg },
  xl: { gap: vars.spacing.xl },
});

// Text utilities
export const textVariant = styleVariants({
  primary: { color: vars.color.text.primary },
  secondary: { color: vars.color.text.secondary },
  muted: { color: vars.color.text.muted },
  success: { color: vars.color.semantic.success },
  danger: { color: vars.color.semantic.danger },
  warning: { color: vars.color.semantic.warning },
  info: { color: vars.color.semantic.info },
});
