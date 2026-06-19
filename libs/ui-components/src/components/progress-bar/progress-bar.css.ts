import { style } from '@vanilla-extract/css';
import { vars } from 'design-system';

export const track = style({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
  height: '8px',
  borderRadius: vars.borderRadius.sm,
  backgroundImage: `linear-gradient(to right, ${vars.color.semantic.info} 0%, ${vars.color.secondary[500]} 70%, ${vars.color.semantic.danger} 100%)`,
  overflow: 'hidden',
});

export const remaining = style({
  height: '100%',
  background: vars.color.semantic.gray,
  transition: 'width 0.4s ease',
});
