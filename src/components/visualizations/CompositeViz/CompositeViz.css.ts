import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme.css';

const fadeInUp = keyframes({
  '0%': { opacity: '0', transform: 'translateY(12px)' },
  '100%': { opacity: '1', transform: 'translateY(0)' },
});

const nodePop = keyframes({
  '0%': { opacity: '0', transform: 'translateY(-6px) scale(0.95)' },
  '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
});

const visitedPulse = keyframes({
  '0%': { boxShadow: `0 0 0 0 ${vars.color.accentSoft}` },
  '50%': { boxShadow: `0 0 0 8px ${vars.color.accentSoft}` },
  '100%': { boxShadow: `0 0 0 0 ${vars.color.accentSoft}` },
});

const summarySlide = keyframes({
  '0%': { opacity: '0', transform: 'translateX(-12px)' },
  '100%': { opacity: '1', transform: 'translateX(0)' },
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing4,
  padding: vars.spacing.spacing4,
  maxWidth: '760px',
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

export const toolbar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.spacing.spacing2,
  padding: vars.spacing.spacing3,
  background: vars.color.surfaceCard,
  borderRadius: vars.radii.radiiMd,
  border: `1px solid ${vars.color.border}`,
  flexWrap: 'wrap',
});

export const toolbarLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.spacing2,
  fontSize: '0.85rem',
  fontWeight: 600,
  color: vars.color.text,
});

export const toolbarLabel = style({
  color: vars.color.textMuted,
  fontWeight: 600,
});

export const toolbarSelected = style({
  fontWeight: 700,
  color: vars.color.accentPrimary,
});

export const toolbarRight = style({
  display: 'flex',
  gap: vars.spacing.spacing1,
  flexWrap: 'wrap',
});

export const btn = style({
  padding: `${vars.spacing.spacing1} ${vars.spacing.spacing2}`,
  borderRadius: vars.radii.radiiSm,
  fontFamily: 'inherit',
  fontSize: '0.8rem',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'opacity 0.2s ease, transform 0.1s ease, background 0.2s ease, border-color 0.2s ease',
  border: '1px solid',
  whiteSpace: 'nowrap',
  selectors: {
    '&:active:not(:disabled)': { transform: 'scale(0.97)' },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.accentDeep}`,
      outlineOffset: '2px',
    },
  },
});

export const btnPrimary = style({
  background: vars.color.surfaceBgAlt,
  color: vars.color.text,
  borderColor: vars.color.border,
  selectors: {
    '&:hover:not(:disabled)': {
      background: vars.color.surfaceBg,
      borderColor: vars.color.borderHover,
    },
    '&:disabled': { opacity: '0.4', cursor: 'not-allowed' },
  },
});

export const btnAccent = style({
  background: vars.color.accentPrimary,
  color: '#fff',
  borderColor: vars.color.accentDeep,
  selectors: {
    '&:hover:not(:disabled)': { opacity: '0.9' },
    '&:disabled': { opacity: '0.5', cursor: 'not-allowed' },
  },
});

export const btnDanger = style({
  background: vars.color.surfaceBgAlt,
  color: vars.color.danger,
  borderColor: vars.color.border,
  selectors: {
    '&:hover:not(:disabled)': {
      background: vars.color.danger,
      color: '#fff',
      borderColor: vars.color.danger,
    },
    '&:disabled': { opacity: '0.4', cursor: 'not-allowed' },
  },
});

export const btnSecondary = style({
  background: vars.color.surfaceBgAlt,
  color: vars.color.text,
  borderColor: vars.color.border,
  selectors: {
    '&:hover': {
      background: vars.color.surfaceBg,
      borderColor: vars.color.borderHover,
    },
  },
});

export const treeCard = style({
  padding: vars.spacing.spacing3,
  background: vars.color.surfaceCard,
  borderRadius: vars.radii.radiiMd,
  border: `1px solid ${vars.color.border}`,
  overflowX: 'auto',
});

export const nodeWrap = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing1,
});

export const children = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing1,
  paddingLeft: vars.spacing.spacing2,
  borderLeft: `2px dashed ${vars.color.border}`,
  marginLeft: vars.spacing.spacing2,
});

export const node = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.spacing.spacing2,
  padding: `${vars.spacing.spacing1} ${vars.spacing.spacing2}`,
  borderRadius: vars.radii.radiiSm,
  background: vars.color.surfaceBgAlt,
  border: `1px solid ${vars.color.border}`,
  fontFamily: 'inherit',
  fontSize: '0.85rem',
  fontWeight: 600,
  color: vars.color.text,
  cursor: 'pointer',
  textAlign: 'left',
  transition: 'border-color 0.2s ease, background 0.2s ease, transform 0.1s ease',
  animation: `${nodePop} 0.3s ease`,
  width: 'fit-content',
  selectors: {
    '&:hover': {
      borderColor: vars.color.borderHover,
      background: vars.color.surfaceBg,
    },
    '&:active': { transform: 'scale(0.98)' },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.accentPrimary}`,
      outlineOffset: '2px',
    },
  },
});

export const nodeDept = style({
  borderLeft: `3px solid ${vars.color.accentPrimary}`,
});

export const nodeEmp = style({
  borderLeft: `3px solid ${vars.color.success}`,
});

export const nodeSelected = style({
  borderColor: vars.color.accentPrimary,
  boxShadow: `0 0 0 2px ${vars.color.accentSoft}`,
  background: vars.color.surfaceBg,
});

export const nodeVisited = style({
  animation: `${visitedPulse} 0.4s ease, ${nodePop} 0.3s ease`,
  borderColor: vars.color.accentPrimary,
});

export const nodeIcon = style({
  fontSize: '1rem',
  flexShrink: 0,
});

export const nodeName = style({
  color: vars.color.textStrong,
});

export const nodeSalary = style({
  fontFamily: 'monospace',
  fontSize: '0.75rem',
  color: vars.color.success,
  fontWeight: 700,
});

export const nodeBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '20px',
  height: '20px',
  padding: `0 ${vars.spacing.spacing0}`,
  borderRadius: '10px',
  background: vars.color.accentPrimary,
  color: '#fff',
  fontSize: '0.7rem',
  fontWeight: 700,
});

export const summary = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing1,
  padding: vars.spacing.spacing3,
  background: vars.color.surfaceCard,
  borderRadius: vars.radii.radiiMd,
  border: `2px solid ${vars.color.accentPrimary}`,
  animation: `${fadeInUp} 0.3s ease`,
});

export const summaryRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: vars.spacing.spacing2,
  padding: `${vars.spacing.spacing0} ${vars.spacing.spacing2}`,
  fontSize: '0.85rem',
  color: vars.color.text,
  animation: `${summarySlide} 0.3s ease`,
});

export const summaryTotal = style({
  fontFamily: 'monospace',
  fontSize: '1rem',
  color: vars.color.accentPrimary,
});