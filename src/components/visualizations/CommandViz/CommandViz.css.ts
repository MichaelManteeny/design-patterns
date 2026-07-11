import { keyframes, style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme.css';

const fadeIn = keyframes({
  '0%': { opacity: '0', transform: 'translateY(10px)' },
  '100%': { opacity: '1', transform: 'translateY(0)' },
});

const commandAppear = keyframes({
  '0%': { opacity: '0', transform: 'translateY(-8px) scale(0.98)' },
  '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
});

const undoFade = keyframes({
  '0%': { opacity: '0.6', transform: 'scale(0.99)' },
  '50%': { opacity: '1', transform: 'scale(1.005)' },
  '100%': { opacity: '1', transform: 'scale(1)' },
});

const redoGlow = keyframes({
  '0%': { boxShadow: `0 0 0 0 ${vars.color.accentSoft}` },
  '60%': { boxShadow: `0 0 0 8px ${vars.color.accentSoft}` },
  '100%': { boxShadow: `0 0 0 0 ${vars.color.accentSoft}` },
});

const undoneFade = keyframes({
  '0%': { opacity: '0.4' },
  '100%': { opacity: '0.55' },
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing4,
  padding: vars.spacing.spacing4,
  maxWidth: '880px',
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

export const editorGrid = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 320px) minmax(0, 1fr)',
  gap: vars.spacing.spacing4,
  '@media': {
    '(max-width: 720px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const controlsPanel = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing2,
  padding: vars.spacing.spacing3,
  background: vars.color.surfaceCard,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.radiiMd,
  animation: `${fadeIn} 0.3s ease`,
});

export const panelTitle = style({
  fontSize: '0.8rem',
  fontWeight: 800,
  color: vars.color.textStrong,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const inputLabel = style({
  fontSize: '0.75rem',
  fontWeight: 700,
  color: vars.color.textMuted,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const textInput = style({
  fontFamily: 'inherit',
  fontSize: '0.9rem',
  padding: `${vars.spacing.spacing1} ${vars.spacing.spacing2}`,
  borderRadius: vars.radii.radiiSm,
  background: vars.color.surfaceBgAlt,
  border: `1px solid ${vars.color.border}`,
  color: vars.color.text,
  transition: 'border-color 0.2s ease, background 0.2s ease',
  selectors: {
    '&:focus': {
      outline: 'none',
      borderColor: vars.color.accentPrimary,
      background: vars.color.surfaceBg,
    },
  },
});

export const buttonGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: vars.spacing.spacing1,
});

export const button = style({
  padding: `${vars.spacing.spacing2} ${vars.spacing.spacing3}`,
  borderRadius: vars.radii.radiiSm,
  border: '1px solid transparent',
  fontFamily: 'inherit',
  fontSize: '0.85rem',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'opacity 0.2s ease, transform 0.1s ease, background 0.2s ease, border-color 0.2s ease',
  selectors: {
    '&:active:not(:disabled)': { transform: 'scale(0.97)' },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.accentDeep}`,
      outlineOffset: '2px',
    },
    '&:disabled': { opacity: '0.4', cursor: 'not-allowed' },
  },
});

export const buttonPrimary = style({
  background: vars.color.accentPrimary,
  color: '#fff',
  borderColor: vars.color.accentDeep,
  selectors: {
    '&:hover:not(:disabled)': { opacity: '0.92' },
  },
});

export const buttonSecondary = style({
  background: vars.color.surfaceBgAlt,
  color: vars.color.text,
  borderColor: vars.color.border,
  selectors: {
    '&:hover:not(:disabled)': {
      background: vars.color.surfaceBg,
      borderColor: vars.color.borderHover,
    },
  },
});

export const buttonDanger = style({
  background: vars.color.surfaceBgAlt,
  color: vars.color.danger,
  borderColor: vars.color.border,
  selectors: {
    '&:hover:not(:disabled)': {
      background: vars.color.danger,
      color: '#fff',
      borderColor: vars.color.danger,
    },
  },
});

export const buttonUndo = style({
  background: vars.color.surfaceBgAlt,
  color: vars.color.warning,
  borderColor: vars.color.warning,
  selectors: {
    '&:hover:not(:disabled)': { background: vars.color.warning, color: '#fff' },
  },
});

export const buttonRedo = style({
  background: vars.color.surfaceBgAlt,
  color: vars.color.success,
  borderColor: vars.color.success,
  selectors: {
    '&:hover:not(:disabled)': { background: vars.color.success, color: '#fff' },
  },
});

export const undoRow = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: vars.spacing.spacing1,
  marginTop: vars.spacing.spacing1,
});

export const selectionBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing0,
  padding: vars.spacing.spacing2,
  borderRadius: vars.radii.radiiSm,
  background: vars.color.surfaceBgAlt,
  border: `1px dashed ${vars.color.border}`,
  fontSize: '0.8rem',
  color: vars.color.textMuted,
  marginTop: vars.spacing.spacing1,
});

export const selectionLabel = style({
  fontWeight: 700,
  color: vars.color.textStrong,
});

export const documentPanel = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing2,
  padding: vars.spacing.spacing3,
  background: vars.color.surfaceCard,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.radiiMd,
  animation: `${fadeIn} 0.3s ease`,
});

export const documentShell = style({
  position: 'relative',
  borderRadius: vars.radii.radiiSm,
  border: `1px solid ${vars.color.border}`,
  background: vars.color.surfaceBg,
  transition: 'box-shadow 0.25s ease',
});

export const documentUndoing = style({
  animation: `${undoFade} 0.32s ease`,
});

export const documentRedoing = style({
  animation: `${redoGlow} 0.28s ease`,
});

export const documentArea = style({
  display: 'block',
  width: '100%',
  minHeight: '180px',
  resize: 'vertical',
  padding: vars.spacing.spacing3,
  border: 'none',
  borderRadius: vars.radii.radiiSm,
  background: 'transparent',
  color: vars.color.text,
  fontFamily: 'inherit',
  fontSize: '0.9rem',
  lineHeight: 1.6,
  boxSizing: 'border-box',
  selectors: {
    '&:focus': { outline: `2px solid ${vars.color.accentPrimary}`, outlineOffset: '-2px' },
  },
});

export const documentStats = style({
  display: 'flex',
  gap: vars.spacing.spacing3,
  flexWrap: 'wrap',
  fontSize: '0.8rem',
  color: vars.color.textMuted,
  fontFamily: 'monospace',
});

export const historyGrid = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
  gap: vars.spacing.spacing4,
  '@media': {
    '(max-width: 720px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const stackPanel = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing2,
  padding: vars.spacing.spacing3,
  background: vars.color.surfaceCard,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.radiiMd,
});

export const commandStack = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing1,
});

export const stackTopItem = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing0,
  padding: vars.spacing.spacing2,
  borderRadius: vars.radii.radiiSm,
  background: vars.color.surfaceBg,
  border: `2px solid ${vars.color.accentPrimary}`,
  boxShadow: `0 0 0 2px ${vars.color.accentSoft}`,
  animation: `${commandAppear} 0.3s ease`,
});

export const stackItem = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing0,
  padding: vars.spacing.spacing2,
  borderRadius: vars.radii.radiiSm,
  background: vars.color.surfaceBgAlt,
  border: `1px solid ${vars.color.border}`,
});

export const commandTitle = style({
  fontSize: '0.85rem',
  fontWeight: 800,
  color: vars.color.textStrong,
});

export const commandDetail = style({
  fontSize: '0.8rem',
  color: vars.color.textMuted,
});

export const journalPanel = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing2,
  padding: vars.spacing.spacing3,
  background: vars.color.surfaceCard,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.radiiMd,
});

export const journalList = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing1,
});

export const journalItem = style({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  gap: vars.spacing.spacing2,
  alignItems: 'center',
  padding: vars.spacing.spacing2,
  borderRadius: vars.radii.radiiSm,
  background: vars.color.surfaceBgAlt,
  border: `1px solid ${vars.color.border}`,
  animation: `${commandAppear} 0.25s ease`,
});

export const journalItemUndone = style({
  opacity: 0.55,
  textDecoration: 'line-through',
  animation: `${undoneFade} 0.25s ease forwards`,
});

export const journalType = style({
  fontSize: '0.7rem',
  fontWeight: 800,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: vars.color.accentPrimary,
  background: vars.color.surfaceBg,
  border: `1px solid ${vars.color.accentPrimary}`,
  padding: `${vars.spacing.spacing0} ${vars.spacing.spacing1}`,
  borderRadius: vars.radii.radiiSm,
});

export const journalText = style({
  fontSize: '0.85rem',
  color: vars.color.text,
});

export const journalTime = style({
  fontSize: '0.75rem',
  color: vars.color.textMuted,
  fontFamily: 'monospace',
});

export const emptyState = style({
  padding: vars.spacing.spacing2,
  borderRadius: vars.radii.radiiSm,
  background: vars.color.surfaceBgAlt,
  border: `1px dashed ${vars.color.border}`,
  color: vars.color.textMuted,
  fontSize: '0.85rem',
});