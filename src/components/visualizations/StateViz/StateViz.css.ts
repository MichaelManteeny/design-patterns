import { keyframes, style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme.css';

const fadeIn = keyframes({
  '0%': { opacity: '0', transform: 'translateY(10px)' },
  '100%': { opacity: '1', transform: 'translateY(0)' },
});

const stateFade = keyframes({
  '0%': { opacity: '0', transform: 'scale(0.96)' },
  '100%': { opacity: '1', transform: 'scale(1)' },
});

const arrowMove = keyframes({
  '0%': { opacity: '0', transform: 'translateX(-12px)' },
  '55%': { opacity: '1', transform: 'translateX(3px)' },
  '100%': { opacity: '1', transform: 'translateX(0)' },
});

const activePulse = keyframes({
  '0%': { boxShadow: `0 0 0 0 ${vars.color.accentSoft}` },
  '60%': { boxShadow: `0 0 0 8px ${vars.color.accentSoft}` },
  '100%': { boxShadow: `0 0 0 0 ${vars.color.accentSoft}` },
});

const historyAppear = keyframes({
  '0%': { opacity: '0', transform: 'translateX(-10px)' },
  '100%': { opacity: '1', transform: 'translateX(0)' },
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing4,
  padding: vars.spacing.spacing4,
  maxWidth: '780px',
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

export const currentPanel = style({
  animation: `${fadeIn} 0.3s ease`,
});

export const currentStateCard = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.spacing3,
  padding: vars.spacing.spacing4,
  background: vars.color.surfaceCard,
  border: `2px solid ${vars.color.accentPrimary}`,
  borderRadius: vars.radii.radiiLg,
  boxShadow: vars.shadow.shadowMd,
  animation: `${stateFade} 0.28s ease`,
});

export const currentIcon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '56px',
  height: '56px',
  borderRadius: '18px',
  background: vars.color.accentPrimary,
  color: '#fff',
  fontSize: '1.8rem',
  flexShrink: 0,
});

export const currentLabel = style({
  fontSize: '1.35rem',
  fontWeight: 800,
  color: vars.color.textStrong,
  marginBottom: vars.spacing.spacing0,
});

export const currentDescription = style({
  fontSize: '0.9rem',
  color: vars.color.textMuted,
  lineHeight: 1.5,
});

export const machineCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing3,
  padding: vars.spacing.spacing4,
  background: vars.color.surfaceCard,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.radiiLg,
  animation: `${fadeIn} 0.3s ease`,
});

export const machineTitle = style({
  fontSize: '0.85rem',
  fontWeight: 800,
  color: vars.color.textStrong,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const stateTrack = style({
  display: 'flex',
  alignItems: 'stretch',
  gap: vars.spacing.spacing1,
  overflowX: 'auto',
  paddingBottom: vars.spacing.spacing0,
});

export const flowStepWrap = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.spacing1,
  flex: '1 0 auto',
});

export const flowStep = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing.spacing1,
  minWidth: '128px',
  padding: `${vars.spacing.spacing2} ${vars.spacing.spacing3}`,
  borderRadius: vars.radii.radiiMd,
  background: vars.color.surfaceBgAlt,
  border: `1px solid ${vars.color.border}`,
  color: vars.color.text,
  fontSize: '0.85rem',
  fontWeight: 700,
  transition: 'border-color 0.2s ease, background 0.2s ease, color 0.2s ease',
});

export const flowStepActive = style({
  background: vars.color.surfaceBg,
  borderColor: vars.color.accentPrimary,
  color: vars.color.textStrong,
  animation: `${activePulse} 0.4s ease`,
});

export const flowStepDone = style({
  borderColor: vars.color.success,
  color: vars.color.success,
});

export const flowIcon = style({
  fontSize: '1.05rem',
});

export const connector = style({
  display: 'inline-flex',
  alignItems: 'center',
  color: vars.color.textMuted,
  fontWeight: 800,
  animation: `${arrowMove} 0.35s ease`,
});

export const transitionRibbon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing.spacing2,
  padding: vars.spacing.spacing2,
  borderRadius: vars.radii.radiiMd,
  background: vars.color.surfaceBgAlt,
  border: `1px solid ${vars.color.accentPrimary}`,
  color: vars.color.textStrong,
  fontSize: '0.9rem',
  fontWeight: 700,
  animation: `${fadeIn} 0.3s ease`,
});

export const transitionIdle = style({
  padding: vars.spacing.spacing2,
  borderRadius: vars.radii.radiiMd,
  background: vars.color.surfaceBgAlt,
  border: `1px dashed ${vars.color.border}`,
  color: vars.color.textMuted,
  fontSize: '0.85rem',
  textAlign: 'center',
});

export const transitionArrow = style({
  color: vars.color.accentPrimary,
  fontSize: '1.2rem',
  animation: `${arrowMove} 0.35s ease`,
});

export const transitionTime = style({
  color: vars.color.textMuted,
  fontFamily: 'monospace',
  fontSize: '0.8rem',
});

export const cancelState = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing.spacing1,
  padding: vars.spacing.spacing2,
  borderRadius: vars.radii.radiiMd,
  background: vars.color.surfaceBgAlt,
  border: `1px dashed ${vars.color.border}`,
  color: vars.color.textMuted,
  fontSize: '0.85rem',
  fontWeight: 700,
  transition: 'border-color 0.2s ease, color 0.2s ease, background 0.2s ease',
});

export const cancelStateActive = style({
  background: vars.color.surfaceBg,
  borderColor: vars.color.danger,
  color: vars.color.danger,
  animation: `${activePulse} 0.4s ease`,
});

export const cancelNote = style({
  fontSize: '0.75rem',
  fontWeight: 600,
  color: vars.color.textMuted,
});

export const actionsPanel = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing2,
  padding: vars.spacing.spacing3,
  background: vars.color.surfaceCard,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.radiiMd,
});

export const sectionTitle = style({
  fontSize: '0.8rem',
  fontWeight: 800,
  color: vars.color.textStrong,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const actionsRow = style({
  display: 'flex',
  gap: vars.spacing.spacing2,
  flexWrap: 'wrap',
});

export const actionButton = style({
  padding: `${vars.spacing.spacing2} ${vars.spacing.spacing3}`,
  borderRadius: vars.radii.radiiSm,
  border: '1px solid transparent',
  color: '#fff',
  fontFamily: 'inherit',
  fontSize: '0.85rem',
  fontWeight: 800,
  cursor: 'pointer',
  transition: 'opacity 0.2s ease, transform 0.1s ease, filter 0.2s ease',
  selectors: {
    '&:hover': { filter: 'brightness(1.05)' },
    '&:active': { transform: 'scale(0.97)' },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.accentDeep}`,
      outlineOffset: '2px',
    },
  },
});

export const actionPrimary = style({
  background: vars.color.accentPrimary,
  borderColor: vars.color.accentDeep,
});

export const actionSuccess = style({
  background: vars.color.success,
  borderColor: vars.color.success,
});

export const actionDanger = style({
  background: vars.color.danger,
  borderColor: vars.color.danger,
});

export const noActions = style({
  padding: vars.spacing.spacing2,
  borderRadius: vars.radii.radiiSm,
  background: vars.color.surfaceBgAlt,
  color: vars.color.textMuted,
  fontSize: '0.85rem',
});

export const historyPanel = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing2,
  padding: vars.spacing.spacing3,
  background: vars.color.surfaceCard,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.radiiMd,
});

export const historyList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing1,
  margin: 0,
  paddingLeft: vars.spacing.spacing4,
});

export const historyItem = style({
  padding: vars.spacing.spacing1,
  color: vars.color.text,
  fontSize: '0.85rem',
  animation: `${historyAppear} 0.25s ease`,
});

export const historyMeta = style({
  marginLeft: vars.spacing.spacing1,
  color: vars.color.textMuted,
  fontFamily: 'monospace',
  fontSize: '0.8rem',
});

export const emptyHistory = style({
  padding: vars.spacing.spacing2,
  color: vars.color.textMuted,
  fontSize: '0.85rem',
});
