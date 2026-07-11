import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme.css';

const fadeInUp = keyframes({
  '0%': { opacity: '0', transform: 'translateY(12px)' },
  '100%': { opacity: '1', transform: 'translateY(0)' },
});

const pulseHighlight = keyframes({
  '0%, 100%': { boxShadow: `0 0 0 0 ${vars.color.accentSoft}` },
  '50%': { boxShadow: `0 0 0 4px ${vars.color.accentSoft}` },
});

const glow = keyframes({
  '0%, 100%': { boxShadow: `0 0 6px ${vars.color.accentSoft}` },
  '50%': { boxShadow: `0 0 18px ${vars.color.accentSoft}` },
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing4,
  padding: vars.spacing.spacing4,
  maxWidth: '640px',
  margin: '0 auto',
  fontFamily: 'inherit',
  color: vars.color.text,
  '@media': {
    '(max-width: 640px)': {
      padding: vars.spacing.spacing3,
    },
  },
});

export const header = style({
  fontSize: '1.25rem',
  fontWeight: 700,
  color: vars.color.textStrong,
  textAlign: 'center',
});

export const schema = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing.spacing2,
  padding: vars.spacing.spacing3,
  background: vars.color.surfaceCard,
  borderRadius: vars.radii.radiiMd,
  border: `1px solid ${vars.color.border}`,
  flexWrap: 'wrap',
  animation: `${fadeInUp} 0.3s ease`,
});

export const moduleNode = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.spacing.spacing0,
  padding: `${vars.spacing.spacing1} ${vars.spacing.spacing2}`,
  borderRadius: vars.radii.radiiSm,
  background: vars.color.surfaceBgAlt,
  border: `1px solid ${vars.color.border}`,
  fontSize: '0.8rem',
  fontWeight: 600,
  color: vars.color.text,
  minWidth: '72px',
  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
});

export const moduleNodeActive = style({
  borderColor: vars.color.accentPrimary,
  boxShadow: `0 0 0 2px ${vars.color.accentSoft}`,
  animation: `${pulseHighlight} 0.6s ease 2`,
});

export const singletonNode = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.spacing.spacing0,
  padding: `${vars.spacing.spacing2} ${vars.spacing.spacing3}`,
  borderRadius: vars.radii.radiiMd,
  background: vars.color.accentPrimary,
  border: `2px solid ${vars.color.accentDeep}`,
  fontSize: '0.85rem',
  fontWeight: 700,
  color: '#fff',
  minWidth: '80px',
});

export const singletonGlow = style({
  animation: `${glow} 1s ease-in-out infinite`,
});

export const arrowSymbol = style({
  fontSize: '1.2rem',
  color: vars.color.textMuted,
  flexShrink: 0,
});

export const instanceBadge = style({
  marginTop: vars.spacing.spacing0,
  fontSize: '0.65rem',
  color: vars.color.textMuted,
  fontWeight: 500,
});

export const instanceBadgeMatch = style({
  color: vars.color.accentPrimary,
  fontWeight: 700,
});

export const buttonsRow = style({
  display: 'flex',
  gap: vars.spacing.spacing2,
  justifyContent: 'center',
  flexWrap: 'wrap',
});

export const btn = style({
  padding: `${vars.spacing.spacing2} ${vars.spacing.spacing3}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.radiiMd,
  background: vars.color.surfaceCard,
  color: vars.color.text,
  fontFamily: 'inherit',
  fontSize: '0.85rem',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'background 0.2s ease, border-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease',
  selectors: {
    '&:hover:not(:disabled)': {
      background: vars.color.surfaceBgAlt,
      borderColor: vars.color.borderHover,
    },
    '&:active:not(:disabled)': {
      transform: 'scale(0.97)',
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.accentPrimary}`,
      outlineOffset: '2px',
    },
  },
});

export const resultCard = style({
  background: vars.color.surfaceCard,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.radiiMd,
  padding: vars.spacing.spacing3,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing2,
  animation: `${fadeInUp} 0.3s ease`,
});

export const resultRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.spacing2,
  padding: `${vars.spacing.spacing1} ${vars.spacing.spacing2}`,
  borderRadius: vars.radii.radiiSm,
  background: vars.color.surfaceBgAlt,
  fontSize: '0.85rem',
  fontWeight: 600,
  color: vars.color.text,
  borderLeft: `3px solid ${vars.color.accentPrimary}`,
});

export const resultInstanceId = style({
  fontFamily: 'monospace',
  color: vars.color.accentPrimary,
  fontWeight: 700,
});

export const sameInstance = style({
  fontSize: '0.75rem',
  color: vars.color.success,
  fontWeight: 600,
});
