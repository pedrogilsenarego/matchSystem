import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from 'design-system';

export const elevatedCard = style({
  background: vars.color.background.surface,
  borderRadius: vars.borderRadius.lg,
  padding: `${vars.spacing.xl} ${vars.spacing['2xl']}`,
  boxShadow: vars.shadow.xl,
});

export const variant = styleVariants({
  default: {},
  // Glassmorphism, ported from imocerto_fe (detailDialog "glass"):
  // a primary-tinted translucent surface with a light blur, a hairline white
  // border, white text with a soft shadow for legibility over a busy backdrop.
  glass: {
    background: `color-mix(in srgb, ${vars.color.primary[500]} 20%, transparent)`,
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    color: '#ffffff',
    textShadow: '0 1px 4px rgb(0 0 0 / 0.25)',
    // Re-map the theme text/border tokens within the glass surface so existing
    // content (which references these vars) inherits the glass palette.
    vars: {
      [vars.color.text.primary]: '#ffffff',
      [vars.color.text.secondary]: 'rgba(255, 255, 255, 0.85)',
      [vars.color.text.muted]: 'rgba(255, 255, 255, 0.65)',
      [vars.color.border.medium]: 'rgba(255, 255, 255, 0.2)',
    },
  },
});
