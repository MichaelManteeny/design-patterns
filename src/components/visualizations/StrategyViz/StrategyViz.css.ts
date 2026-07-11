import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme.css';

const fadeInUp = keyframes({
  '0%': { opacity: '0', transform: 'translateY(12px)' },
  '100%': { opacity: '1', transform: 'translateY(0)' },
});

const pricePop = keyframes({
  '0%': { opacity: '0', transform: 'scale(0.8)' },
  '60%': { opacity: '1', transform: 'scale(1.08)' },
  '100%': { opacity: '1', transform: 'scale(1)' },
});

const formulaSlide = keyframes({
  '0%': { opacity: '0', transform: 'translateY(-8px)' },
  '100%': { opacity: '1', transform: 'translateY(0)' },
});

const pulse = keyframes({
  '0%, 100%': { opacity: '1' },
  '50%': { opacity: '0.5' },
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

export const chain = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing.spacing2,
  flexWrap: 'wrap',
  padding: vars.spacing.spacing3,
  background: vars.color.surfaceCard,
  borderRadius: vars.radii.radiiMd,
  border: `1px solid ${vars.color.border}`,
});

export const chainNode = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.spacing.spacing0,
  padding: `${vars.spacing.spacing2} ${vars.spacing.spacing3}`,
  borderRadius: vars.radii.radiiSm,
  background: vars.color.surfaceBgAlt,
  border: `1px solid ${vars.color.border}`,
  fontSize: '0.8rem',
  fontWeight: 600,
  color: vars.color.text,
  minWidth: '72px',
  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
});

export const chainNodeActive = style({
  borderColor: vars.color.accentPrimary,
  boxShadow: `0 0 0 2px ${vars.color.accentSoft}`,
});

export const chainArrow = style({
  fontSize: '1.2rem',
  color: vars.color.textMuted,
  flexShrink: 0,
});

export const inputsRow = style({
  display: 'flex',
  gap: vars.spacing.spacing2,
  flexWrap: 'wrap',
  alignItems: 'flex-end',
});

export const fieldGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing0,
  flex: '1 1 120px',
});

export const fieldLabel = style({
  fontSize: '0.75rem',
  fontWeight: 600,
  color: vars.color.textMuted,
});

export const input = style({
  padding: `${vars.spacing.spacing2} ${vars.spacing.spacing3}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.radiiMd,
  background: vars.color.surfaceBgAlt,
  color: vars.color.text,
  fontFamily: 'inherit',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  selectors: {
    '&:focus': { borderColor: vars.color.accentPrimary },
  },
});

export const checkboxRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.spacing1,
  padding: `${vars.spacing.spacing2} 0`,
});

export const checkbox = style({
  accentColor: vars.color.accentPrimary,
  width: '16px',
  height: '16px',
  cursor: 'pointer',
});

export const checkboxLabel = style({
  fontSize: '0.85rem',
  color: vars.color.text,
  fontWeight: 500,
  cursor: 'pointer',
});

export const strategyRow = style({
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
    '&:active:not(:disabled)': { transform: 'scale(0.97)' },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.accentPrimary}`,
      outlineOffset: '2px',
    },
  },
});

export const btnSelected = style({
  borderColor: vars.color.accentPrimary,
  color: vars.color.accentPrimary,
  boxShadow: `0 0 0 1px ${vars.color.accentSoft}`,
});

export const contextCard = style({
  background: vars.color.surfaceCard,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.radiiMd,
  padding: vars.spacing.spacing3,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing2,
  animation: `${fadeInUp} 0.3s ease`,
});

export const contextTitle = style({
  fontSize: '0.8rem',
  fontWeight: 700,
  color: vars.color.textMuted,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const contextStrategy = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.spacing2,
  padding: `${vars.spacing.spacing1} ${vars.spacing.spacing2}`,
  borderRadius: vars.radii.radiiSm,
  background: vars.color.surfaceBgAlt,
  border: `1px solid ${vars.color.border}`,
  fontSize: '0.85rem',
  fontWeight: 600,
  color: vars.color.textStrong,
  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
});

export const contextStrategyActive = style({
  borderColor: vars.color.accentPrimary,
  boxShadow: `0 0 0 2px ${vars.color.accentSoft}`,
});

export const resultCard = style({
  background: vars.color.surfaceCard,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.radiiMd,
  padding: vars.spacing.spacing3,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.spacing.spacing1,
  animation: `${fadeInUp} 0.3s ease`,
});

export const formulaText = style({
  fontSize: '0.85rem',
  color: vars.color.textMuted,
  fontFamily: 'monospace',
  fontWeight: 600,
  animation: `${formulaSlide} 0.35s ease`,
});

export const priceText = style({
  fontSize: '1.5rem',
  fontWeight: 800,
  color: vars.color.accentPrimary,
  animation: `${pricePop} 0.4s ease`,
});

export const idleMessage = style({
  fontSize: '0.9rem',
  color: vars.color.textMuted,
  fontStyle: 'italic',
  textAlign: 'center',
});
