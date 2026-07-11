import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme.css';

const moveForward = keyframes({
  '0%': { transform: 'translateX(0)' },
  '50%': { transform: 'translateX(80px)' },
  '100%': { transform: 'translateX(0)' },
});

const fadeInUp = keyframes({
  '0%': { opacity: '0', transform: 'translateY(12px)' },
  '100%': { opacity: '1', transform: 'translateY(0)' },
});

const pulse = keyframes({
  '0%, 100%': { opacity: '1' },
  '50%': { opacity: '0.5' },
});

const slideIn = keyframes({
  '0%': { opacity: '0', transform: 'translateX(-20px)' },
  '100%': { opacity: '1', transform: 'translateX(0)' },
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
  fontSize: '0.9rem',
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

export const btnSelected = style({
  borderColor: vars.color.accentPrimary,
  color: vars.color.accentPrimary,
  boxShadow: `0 0 0 1px ${vars.color.accentSoft}`,
});

export const btnDisabled = style({
  opacity: '0.5',
  cursor: 'not-allowed',
});

export const startBtn = style({
  padding: `${vars.spacing.spacing2} ${vars.spacing.spacing4}`,
  border: `1px solid ${vars.color.accentPrimary}`,
  borderRadius: vars.radii.radiiMd,
  background: vars.color.accentPrimary,
  color: '#fff',
  fontFamily: 'inherit',
  fontSize: '0.95rem',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'opacity 0.2s ease, transform 0.1s ease',
  selectors: {
    '&:hover:not(:disabled)': {
      opacity: '0.9',
    },
    '&:active:not(:disabled)': {
      transform: 'scale(0.97)',
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.accentDeep}`,
      outlineOffset: '2px',
    },
  },
});

export const startBtnDisabled = style({
  opacity: '0.5',
  cursor: 'not-allowed',
});

export const stageCard = style({
  background: vars.color.surfaceCard,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.radiiMd,
  padding: vars.spacing.spacing3,
  minHeight: '80px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing.spacing1,
  animation: `${fadeInUp} 0.3s ease`,
});

export const vehicleEmoji = style({
  fontSize: '2.5rem',
  animation: `${moveForward} 1.5s ease-in-out`,
});

export const stageLabel = style({
  fontSize: '0.85rem',
  color: vars.color.textMuted,
  fontWeight: 500,
});

export const stageMessage = style({
  fontSize: '1rem',
  fontWeight: 600,
  color: vars.color.textStrong,
  textAlign: 'center',
});

export const idleMessage = style({
  fontSize: '0.9rem',
  color: vars.color.textMuted,
  fontStyle: 'italic',
});

export const methodBadge = style({
  display: 'inline-block',
  padding: `${vars.spacing.spacing0} ${vars.spacing.spacing2}`,
  borderRadius: vars.radii.radiiSm,
  background: vars.color.accentSoft,
  color: vars.color.textStrong,
  fontSize: '0.75rem',
  fontFamily: 'monospace',
  fontWeight: 700,
  animation: `${pulse} 1s ease-in-out infinite`,
  marginTop: vars.spacing.spacing1,
});
