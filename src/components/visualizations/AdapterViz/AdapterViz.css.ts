import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme.css';

const fadeInUp = keyframes({
  '0%': { opacity: '0', transform: 'translateY(12px)' },
  '100%': { opacity: '1', transform: 'translateY(0)' },
});

const slideRight = keyframes({
  '0%': { transform: 'translateX(-12px)', opacity: '0' },
  '100%': { transform: 'translateX(0)', opacity: '1' },
});

const slideLeft = keyframes({
  '0%': { transform: 'translateX(12px)', opacity: '0' },
  '100%': { transform: 'translateX(0)', opacity: '1' },
});

const adapterSpin = keyframes({
  '0%': { transform: 'rotate(0deg) scale(1)' },
  '50%': { transform: 'rotate(180deg) scale(1.08)' },
  '100%': { transform: 'rotate(360deg) scale(1)' },
});

const clientPulse = keyframes({
  '0%, 100%': { boxShadow: `0 0 0 0 ${vars.color.accentSoft}` },
  '50%': { boxShadow: `0 0 0 6px ${vars.color.accentSoft}` },
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

export const schema = style({
  display: 'grid',
  gridTemplateColumns: '1fr auto 1fr',
  gap: vars.spacing.spacing3,
  alignItems: 'stretch',
  padding: vars.spacing.spacing3,
  background: vars.color.surfaceCard,
  borderRadius: vars.radii.radiiMd,
  border: `1px solid ${vars.color.border}`,
  '@media': {
    '(max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const clientBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing2,
  padding: vars.spacing.spacing3,
  borderRadius: vars.radii.radiiMd,
  border: `2px solid ${vars.color.border}`,
  background: vars.color.surfaceBgAlt,
  minHeight: '160px',
  transition: 'border-color 0.3s ease, transform 0.3s ease',
});

export const legacyClient = style({
  borderColor: vars.color.warning,
});

export const modernClient = style({
  borderColor: vars.color.success,
});

export const clientActive = style({
  animation: `${clientPulse} 0.4s ease 2`,
});

export const clientReceived = style({
  borderColor: vars.color.accentPrimary,
});

export const clientLabel = style({
  fontSize: '0.95rem',
  fontWeight: 700,
  color: vars.color.textStrong,
});

export const clientSub = style({
  fontSize: '0.75rem',
  color: vars.color.textMuted,
  fontWeight: 500,
});

export const payloadPre = style({
  margin: 0,
  padding: vars.spacing.spacing2,
  fontSize: '0.7rem',
  fontFamily: 'monospace',
  color: vars.color.text,
  background: vars.color.surfaceBg,
  borderRadius: vars.radii.radiiSm,
  border: `1px solid ${vars.color.border}`,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  flex: 1,
  animation: `${fadeInUp} 0.3s ease`,
});

export const arrowArea = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing.spacing2,
  minWidth: '120px',
  '@media': {
    '(max-width: 640px)': {
      flexDirection: 'row',
      minWidth: 'auto',
    },
  },
});

export const arrowLine = style({
  fontSize: '1.3rem',
  color: vars.color.accentPrimary,
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '24px',
});

export const arrowHead = style({
  animation: `${slideRight} 0.3s ease`,
});

export const adapterBox = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.spacing.spacing0,
  padding: `${vars.spacing.spacing2} ${vars.spacing.spacing3}`,
  borderRadius: vars.radii.radiiMd,
  background: vars.color.accentPrimary,
  border: `2px solid ${vars.color.accentDeep}`,
  color: '#fff',
  fontWeight: 700,
  minWidth: '100px',
  transition: 'transform 0.3s ease',
});

export const adapterActive = style({
  animation: `${adapterSpin} 0.7s ease`,
});

export const adapterTitle = style({
  fontSize: '0.9rem',
});

export const adapterSub = style({
  fontSize: '0.7rem',
  fontWeight: 500,
  opacity: 0.85,
});

export const statusBar = style({
  textAlign: 'center',
  fontSize: '0.9rem',
  fontWeight: 600,
  color: vars.color.text,
  padding: vars.spacing.spacing2,
  background: vars.color.surfaceCard,
  borderRadius: vars.radii.radiiMd,
  border: `1px solid ${vars.color.border}`,
  minHeight: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: `${fadeInUp} 0.3s ease`,
});

export const statusDone = style({
  color: vars.color.success,
});

export const buttonsRow = style({
  display: 'flex',
  gap: vars.spacing.spacing2,
  justifyContent: 'center',
  flexWrap: 'wrap',
});

export const btnPrimary = style({
  padding: `${vars.spacing.spacing2} ${vars.spacing.spacing4}`,
  border: `1px solid ${vars.color.accentPrimary}`,
  borderRadius: vars.radii.radiiMd,
  background: vars.color.accentPrimary,
  color: '#fff',
  fontFamily: 'inherit',
  fontSize: '0.9rem',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'opacity 0.2s ease, transform 0.1s ease',
  selectors: {
    '&:hover:not(:disabled)': { opacity: '0.9' },
    '&:active:not(:disabled)': { transform: 'scale(0.97)' },
    '&:disabled': { opacity: '0.5', cursor: 'not-allowed' },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.accentDeep}`,
      outlineOffset: '2px',
    },
  },
});

export const btnSecondary = style({
  padding: `${vars.spacing.spacing2} ${vars.spacing.spacing4}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.radiiMd,
  background: vars.color.surfaceCard,
  color: vars.color.text,
  fontFamily: 'inherit',
  fontSize: '0.9rem',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'background 0.2s ease, border-color 0.2s ease',
  selectors: {
    '&:hover:not(:disabled)': {
      background: vars.color.surfaceBgAlt,
      borderColor: vars.color.borderHover,
    },
    '&:disabled': { opacity: '0.5', cursor: 'not-allowed' },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.accentPrimary}`,
      outlineOffset: '2px',
    },
  },
});

export const history = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing2,
  padding: vars.spacing.spacing3,
  background: vars.color.surfaceCard,
  borderRadius: vars.radii.radiiMd,
  border: `1px solid ${vars.color.border}`,
  animation: `${fadeInUp} 0.3s ease`,
});

export const historyTitle = style({
  fontSize: '0.85rem',
  fontWeight: 700,
  color: vars.color.accentPrimary,
});

export const historyGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: vars.spacing.spacing2,
  '@media': {
    '(max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const historyLabel = style({
  fontSize: '0.7rem',
  fontWeight: 600,
  color: vars.color.textMuted,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: vars.spacing.spacing0,
});

export const historyPre = style({
  margin: 0,
  padding: vars.spacing.spacing2,
  fontSize: '0.7rem',
  fontFamily: 'monospace',
  color: vars.color.text,
  background: vars.color.surfaceBgAlt,
  borderRadius: vars.radii.radiiSm,
  border: `1px solid ${vars.color.border}`,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  animation: `${slideLeft} 0.3s ease`,
});