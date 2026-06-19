import { style } from '@vanilla-extract/css';
import { vars } from 'design-system';

export const root = style({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  background: `linear-gradient(135deg, ${vars.color.primary[800]} 0%, ${vars.color.base[300]} 50%, ${vars.color.secondary[800]} 100%)`,
  backgroundAttachment: 'fixed',
});

export const header = style({
  background: vars.color.text.primary,
  color: vars.color.text.inverse,
  padding: `${vars.spacing.lg} ${vars.spacing['2xl']}`,
  position: 'sticky',
  top: 0,
  zIndex: 10,
  boxShadow: vars.shadow.md,
});

export const headerTitle = style({
  color: vars.color.text.inverse,
});

export const controls = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: vars.spacing.lg,
});

export const matchTabs = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.spacing.sm,
});

export const mutedOnDark = style({
  color: vars.color.background.light,
  borderColor: vars.color.text.secondary,
});

export const pauseButton = style({
  marginLeft: 'auto',
});

export const main = style({
  flex: 1,
  padding: vars.spacing['2xl'],
});
