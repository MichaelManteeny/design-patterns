import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme.css';

const fadeInUp = keyframes({
  '0%': { opacity: '0', transform: 'translateY(12px)' },
  '100%': { opacity: '1', transform: 'translateY(0)' },
});

const layerDrop = keyframes({
  '0%': { opacity: '0', transform: 'translateY(-10px) scale(0.95)' },
  '60%': { opacity: '1', transform: 'translateY(2px) scale(1.02)' },
  '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
});

const totalBump = keyframes({
  '0%': { transform: 'scale(1)' },
  '50%': { transform: 'scale(1.08)' },
  '100%': { transform: 'scale(1)' },
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing4,
  padding: vars.spacing.spacing4,
  maxWidth: '720px',
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

export const coffeeArea = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing3,
  padding: vars.spacing.spacing4,
  background: vars.color.surfaceCard,
  borderRadius: vars.radii.radiiLg,
  border: `1px solid ${vars.color.border}`,
  animation: `${fadeInUp} 0.3s ease`,
});

export const coffeeHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: vars.spacing.spacing2,
  borderBottom: `1px solid ${vars.color.border}`,
});

export const coffeeIcon = style({
  fontSize: '1.8rem',
});

export const coffeeTotal = style({
  fontSize: '1.5rem',
  fontWeight: 800,
  color: vars.color.accentPrimary,
  fontFamily: 'monospace',
  animation: `${totalBump} 0.3s ease`,
});

export const stack = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  alignItems: 'center',
});

export const layer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.spacing.spacing2,
  width: '100%',
  maxWidth: '420px',
  padding: `${vars.spacing.spacing2} ${vars.spacing.spacing3}`,
  borderRadius: vars.radii.radiiMd,
  fontSize: '0.9rem',
  fontWeight: 700,
  color: '#fff',
  animation: `${layerDrop} 0.3s ease`,
  boxSizing: 'border-box',
});

export const baseLayer = style({
  background: vars.color.accentDeep,
});

export const decoratorLayer = style({
  background: 'transparent',
});

export const layer0 = style({
  background: vars.color.accentSecondary,
});

export const layer1 = style({
  background: vars.color.accentSoft,
  color: vars.color.textStrong,
});

export const layer2 = style({
  background: vars.color.accentPrimary,
});

export const layer3 = style({
  background: vars.color.accentDeep,
});

export const layerPrice = style({
  fontFamily: 'monospace',
  fontWeight: 700,
  opacity: 0.95,
});

export const chainDesc = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing0,
  padding: vars.spacing.spacing2,
  background: vars.color.surfaceBgAlt,
  borderRadius: vars.radii.radiiSm,
  border: `1px solid ${vars.color.border}`,
});

export const chainLabel = style({
  fontSize: '0.7rem',
  fontWeight: 700,
  color: vars.color.textMuted,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const chainCode = style({
  fontFamily: 'monospace',
  fontSize: '0.8rem',
  color: vars.color.text,
  wordBreak: 'break-word',
});

export const addonsArea = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing2,
  padding: vars.spacing.spacing3,
  background: vars.color.surfaceCard,
  borderRadius: vars.radii.radiiMd,
  border: `1px solid ${vars.color.border}`,
});

export const addonsTitle = style({
  fontSize: '0.85rem',
  fontWeight: 700,
  color: vars.color.textStrong,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const addonsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: vars.spacing.spacing2,
  '@media': {
    '(max-width: 480px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const addonCard = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.spacing2,
  padding: vars.spacing.spacing2,
  borderRadius: vars.radii.radiiSm,
  background: vars.color.surfaceBgAlt,
  border: `2px solid ${vars.color.border}`,
  cursor: 'pointer',
  transition: 'border-color 0.2s ease, background 0.2s ease, transform 0.1s ease',
  fontFamily: 'inherit',
  fontSize: '0.85rem',
  fontWeight: 600,
  color: vars.color.text,
  selectors: {
    '&:hover': {
      borderColor: vars.color.borderHover,
      background: vars.color.surfaceBg,
    },
    '&:active': { transform: 'scale(0.98)' },
  },
});

export const addonCardChecked = style({
  borderColor: vars.color.accentPrimary,
  background: vars.color.surfaceBg,
  boxShadow: `0 0 0 1px ${vars.color.accentPrimary}`,
});

export const addonCheckbox = style({
  width: '18px',
  height: '18px',
  accentColor: vars.color.accentPrimary,
  cursor: 'pointer',
  flexShrink: 0,
});

export const addonIcon = style({
  fontSize: '1.2rem',
  flexShrink: 0,
});

export const addonLabel = style({
  flex: 1,
  color: vars.color.textStrong,
});

export const addonPrice = style({
  fontFamily: 'monospace',
  fontSize: '0.8rem',
  color: vars.color.accentPrimary,
  fontWeight: 700,
});