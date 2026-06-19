import { createVar, fallbackVar, keyframes, style, styleVariants } from '@vanilla-extract/css';
import { vars } from 'design-system';

const pulseRing = createVar();

export const button = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: vars.fontWeight.medium,
  borderRadius: vars.borderRadius.md,
  border: '1px solid transparent',
  cursor: 'pointer',
  transition: 'background 0.2s, border-color 0.2s, color 0.2s, opacity 0.2s',
  fontFamily: 'inherit',
  lineHeight: vars.lineHeight.normal,
  textDecoration: 'none',
  whiteSpace: 'nowrap',

  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },

  ':focus-visible': {
    outline: `2px solid ${vars.color.primary[500]}`,
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
    vars: { [pulseRing]: vars.color.primary[500] },
    background: vars.color.primary[500],
    borderColor: vars.color.primary[500],
    color: vars.color.text.inverse,
    ':hover:not(:disabled)': {
      background: vars.color.primary[600],
      borderColor: vars.color.primary[600],
    },
  },
  secondary: {
    vars: { [pulseRing]: vars.color.secondary[500] },
    background: vars.color.secondary[500],
    borderColor: vars.color.secondary[500],
    color: vars.color.text.inverse,
    ':hover:not(:disabled)': {
      background: vars.color.secondary[600],
      borderColor: vars.color.secondary[600],
    },
  },
  danger: {
    vars: { [pulseRing]: vars.color.semantic.danger },
    background: vars.color.semantic.danger,
    borderColor: vars.color.semantic.danger,
    color: vars.color.text.inverse,
    ':hover:not(:disabled)': {
      background: `color-mix(in srgb, ${vars.color.semantic.danger} calc(100% - ${vars.stateLayer.hover}), black ${vars.stateLayer.hover})`,
      borderColor: `color-mix(in srgb, ${vars.color.semantic.danger} calc(100% - ${vars.stateLayer.hover}), black ${vars.stateLayer.hover})`,
    },
  },
  success: {
    vars: { [pulseRing]: vars.color.semantic.success },
    background: vars.color.semantic.success,
    borderColor: vars.color.semantic.success,
    color: vars.color.text.inverse,
    ':hover:not(:disabled)': {
      background: `color-mix(in srgb, ${vars.color.semantic.success} calc(100% - ${vars.stateLayer.hover}), black ${vars.stateLayer.hover})`,
      borderColor: `color-mix(in srgb, ${vars.color.semantic.success} calc(100% - ${vars.stateLayer.hover}), black ${vars.stateLayer.hover})`,
    },
  },
  muted: {
    vars: { [pulseRing]: vars.color.base[400] },
    background: 'transparent',
    borderColor: vars.color.base[300],
    color: vars.color.base[700],
    ':hover:not(:disabled)': {
      background: vars.color.base[100],
      borderColor: vars.color.base[400],
    },
  },
});

export const buttonActive = style({
  selectors: {
    [`${buttonVariant.primary}&`]: {
      background: vars.color.primary[700],
      borderColor: vars.color.primary[700],
    },
    [`${buttonVariant.secondary}&`]: {
      background: vars.color.secondary[700],
      borderColor: vars.color.secondary[700],
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
      background: vars.color.base[200],
      borderColor: vars.color.base[400],
      color: vars.color.base[900],
    },
  },
});

const pulse = keyframes({
  '0%': {
    boxShadow: `0 0 0 0 color-mix(in srgb, ${fallbackVar(pulseRing, vars.color.semantic.danger)} 55%, transparent)`,
  },
  '70%': {
    boxShadow: '0 0 0 8px transparent',
  },
  '100%': {
    boxShadow: '0 0 0 0 transparent',
  },
});

export const buttonPulse = style({
  animation: `${pulse} 1.5s ease-out infinite`,

  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
  },
});
