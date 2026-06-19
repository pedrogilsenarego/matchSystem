import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from 'design-system';

export const button = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: vars.fontWeight.medium,
  borderRadius: vars.borderRadius.md,
  border: '1px solid transparent',
  cursor: 'pointer',
  transition: 'background 0.2s, border-color 0.2s, opacity 0.2s',
  fontFamily: 'inherit',
  lineHeight: 1.5,
  textDecoration: 'none',
  whiteSpace: 'nowrap',

  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },

  ':focus-visible': {
    outline: `2px solid ${vars.color.semantic.info}`,
    outlineOffset: '2px',
  },
});

export const buttonSize = styleVariants({
  sm: {
    padding: `${vars.spacing.xs} ${vars.spacing.sm}`,
    fontSize: vars.fontSize.xs,
    fontWeight: vars.fontWeight.medium,
  },
  md: {
    padding: `${vars.spacing.sm} ${vars.spacing.md}`,
    fontSize: vars.fontSize.sm,
    fontWeight: vars.fontWeight.medium,
  },
  lg: {
    padding: `${vars.spacing.md} ${vars.spacing.lg}`,
    fontSize: vars.fontSize.base,
    fontWeight: vars.fontWeight.semibold,
  },
});

export const buttonVariant = styleVariants({
  primary: {
    background: vars.color.semantic.info,
    borderColor: vars.color.semantic.info,
    color: vars.color.text.inverse,
    ':hover:not(:disabled)': {
      background: `color-mix(in srgb, ${vars.color.semantic.info} calc(100% - ${vars.stateLayer.hover}), black ${vars.stateLayer.hover})`,
      borderColor: `color-mix(in srgb, ${vars.color.semantic.info} calc(100% - ${vars.stateLayer.hover}), black ${vars.stateLayer.hover})`,
    },
  },
  secondary: {
    background: 'transparent',
    borderColor: vars.color.border.medium,
    color: vars.color.text.primary,
    ':hover:not(:disabled)': {
      background: vars.color.background.light,
    },
  },
  danger: {
    background: vars.color.semantic.danger,
    borderColor: vars.color.semantic.danger,
    color: vars.color.text.inverse,
    ':hover:not(:disabled)': {
      background: `color-mix(in srgb, ${vars.color.semantic.danger} calc(100% - ${vars.stateLayer.hover}), black ${vars.stateLayer.hover})`,
      borderColor: `color-mix(in srgb, ${vars.color.semantic.danger} calc(100% - ${vars.stateLayer.hover}), black ${vars.stateLayer.hover})`,
    },
  },
  success: {
    background: vars.color.semantic.success,
    borderColor: vars.color.semantic.success,
    color: vars.color.text.inverse,
    ':hover:not(:disabled)': {
      background: `color-mix(in srgb, ${vars.color.semantic.success} calc(100% - ${vars.stateLayer.hover}), black ${vars.stateLayer.hover})`,
      borderColor: `color-mix(in srgb, ${vars.color.semantic.success} calc(100% - ${vars.stateLayer.hover}), black ${vars.stateLayer.hover})`,
    },
  },
  muted: {
    background: 'transparent',
    borderColor: vars.color.border.medium,
    color: vars.color.text.primary,
    ':hover:not(:disabled)': {
      background: vars.color.background.light,
    },
  },
});

export const buttonActive = style({
  selectors: {
    [`${buttonVariant.primary}&`]: {
      background: `color-mix(in srgb, ${vars.color.semantic.info} calc(100% - ${vars.stateLayer.active}), black ${vars.stateLayer.active})`,
      borderColor: `color-mix(in srgb, ${vars.color.semantic.info} calc(100% - ${vars.stateLayer.active}), black ${vars.stateLayer.active})`,
    },
    [`${buttonVariant.secondary}&`]: {
      background: vars.color.background.surface,
      borderColor: vars.color.border.medium,
    },
    [`${buttonVariant.danger}&`]: {
      background: `color-mix(in srgb, ${vars.color.semantic.danger} calc(100% - ${vars.stateLayer.active}), black ${vars.stateLayer.active})`,
      borderColor: `color-mix(in srgb, ${vars.color.semantic.danger} calc(100% - ${vars.stateLayer.active}), black ${vars.stateLayer.active})`,
    },
    [`${buttonVariant.success}&`]: {
      background: `color-mix(in srgb, ${vars.color.semantic.success} calc(100% - ${vars.stateLayer.active}), black ${vars.stateLayer.active})`,
      borderColor: `color-mix(in srgb, ${vars.color.semantic.success} calc(100% - ${vars.stateLayer.active}), black ${vars.stateLayer.active})`,
    },
    [`${buttonVariant.muted}&`]: {
      background: vars.color.semantic.info,
      borderColor: vars.color.semantic.info,
      color: vars.color.text.inverse,
    },
  },
});
