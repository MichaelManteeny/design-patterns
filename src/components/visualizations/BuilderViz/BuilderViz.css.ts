import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme.css';

const fadeInUp = keyframes({
  '0%': { opacity: '0', transform: 'translateY(12px)' },
  '100%': { opacity: '1', transform: 'translateY(0)' },
});

const blockSlide = keyframes({
  '0%': { opacity: '0', transform: 'translateX(-20px)' },
  '100%': { opacity: '1', transform: 'translateX(0)' },
});

const buildingPop = keyframes({
  '0%': { opacity: '0', transform: 'scale(0.9)' },
  '100%': { opacity: '1', transform: 'scale(1)' },
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

export const inputGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing2,
  padding: vars.spacing.spacing3,
  background: vars.color.surfaceCard,
  borderRadius: vars.radii.radiiMd,
  border: `1px solid ${vars.color.border}`,
});

export const inputRow = style({
  display: 'flex',
  gap: vars.spacing.spacing2,
  alignItems: 'center',
  flexWrap: 'wrap',
});

export const fieldLabel = style({
  fontSize: '0.75rem',
  fontWeight: 600,
  color: vars.color.textMuted,
  minWidth: '60px',
});

export const input = style({
  flex: 1,
  padding: `${vars.spacing.spacing1} ${vars.spacing.spacing2}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.radiiSm,
  background: vars.color.surfaceBgAlt,
  color: vars.color.text,
  fontFamily: 'inherit',
  fontSize: '0.85rem',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  selectors: {
    '&:focus': { borderColor: vars.color.accentPrimary },
  },
});

export const select = style({
  padding: `${vars.spacing.spacing1} ${vars.spacing.spacing2}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.radiiSm,
  background: vars.color.surfaceBgAlt,
  color: vars.color.text,
  fontFamily: 'inherit',
  fontSize: '0.85rem',
  outline: 'none',
  cursor: 'pointer',
  selectors: {
    '&:focus': { borderColor: vars.color.accentPrimary },
  },
});

export const textarea = style({
  width: '100%',
  minHeight: '60px',
  padding: `${vars.spacing.spacing1} ${vars.spacing.spacing2}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.radiiSm,
  background: vars.color.surfaceBgAlt,
  color: vars.color.text,
  fontFamily: 'inherit',
  fontSize: '0.85rem',
  outline: 'none',
  resize: 'vertical',
  boxSizing: 'border-box',
  selectors: {
    '&:focus': { borderColor: vars.color.accentPrimary },
  },
});

export const headerRow = style({
  display: 'flex',
  gap: vars.spacing.spacing1,
  alignItems: 'center',
  flexWrap: 'wrap',
});

export const smallInput = style({
  flex: 1,
  minWidth: '80px',
  padding: `${vars.spacing.spacing0} ${vars.spacing.spacing1}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.radiiSm,
  background: vars.color.surfaceBgAlt,
  color: vars.color.text,
  fontFamily: 'inherit',
  fontSize: '0.8rem',
  outline: 'none',
  selectors: {
    '&:focus': { borderColor: vars.color.accentPrimary },
  },
});

export const addHeaderBtn = style({
  padding: `${vars.spacing.spacing0} ${vars.spacing.spacing2}`,
  border: `1px solid ${vars.color.accentPrimary}`,
  borderRadius: vars.radii.radiiSm,
  background: vars.color.accentPrimary,
  color: '#fff',
  fontFamily: 'inherit',
  fontSize: '0.75rem',
  fontWeight: 700,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  transition: 'opacity 0.2s ease',
  selectors: {
    '&:hover': { opacity: '0.9' },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.accentDeep}`,
      outlineOffset: '2px',
    },
  },
});

export const headerList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing0,
});

export const headerTag = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.spacing.spacing0,
  padding: `${vars.spacing.spacing0} ${vars.spacing.spacing1}`,
  borderRadius: vars.radii.radiiSm,
  background: vars.color.surfaceBgAlt,
  border: `1px solid ${vars.color.border}`,
  fontSize: '0.75rem',
  fontFamily: 'monospace',
  fontWeight: 600,
  color: vars.color.text,
  animation: `${blockSlide} 0.3s ease`,
});

export const removeHeader = style({
  cursor: 'pointer',
  color: vars.color.danger,
  fontSize: '0.85rem',
  lineHeight: 1,
  marginLeft: vars.spacing.spacing0,
  selectors: {
    '&:hover': { opacity: '0.7' },
  },
});

export const buttonsRow = style({
  display: 'flex',
  gap: vars.spacing.spacing2,
  justifyContent: 'center',
  flexWrap: 'wrap',
});

export const btn = style({
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

export const resetBtn = style({
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
    '&:hover': {
      background: vars.color.surfaceBgAlt,
      borderColor: vars.color.borderHover,
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.accentPrimary}`,
      outlineOffset: '2px',
    },
  },
});

export const building = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2px',
  padding: vars.spacing.spacing3,
  background: vars.color.surfaceCard,
  borderRadius: vars.radii.radiiMd,
  border: `1px solid ${vars.color.border}`,
  minHeight: '120px',
  animation: `${buildingPop} 0.3s ease`,
});

export const buildLabel = style({
  fontSize: '0.75rem',
  fontWeight: 700,
  color: vars.color.textMuted,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: vars.spacing.spacing1,
});

export const buildingBlock = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing.spacing1,
  padding: `${vars.spacing.spacing1} ${vars.spacing.spacing3}`,
  borderRadius: vars.radii.radiiSm,
  fontSize: '0.75rem',
  fontWeight: 700,
  color: '#fff',
  minWidth: '160px',
  textAlign: 'center',
  animation: `${blockSlide} 0.35s ease`,
});

export const blockRoof = style({
  background: vars.color.accentPrimary,
  borderTopLeftRadius: vars.radii.radiiMd,
  borderTopRightRadius: vars.radii.radiiMd,
  borderBottomLeftRadius: vars.radii.radiiSm,
  borderBottomRightRadius: vars.radii.radiiSm,
});

export const blockWalls = style({
  background: vars.color.accentSecondary,
  borderRadius: vars.radii.radiiSm,
});

export const blockFoundation = style({
  background: vars.color.accentDeep,
  borderBottomLeftRadius: vars.radii.radiiMd,
  borderBottomRightRadius: vars.radii.radiiMd,
  borderTopLeftRadius: vars.radii.radiiSm,
  borderTopRightRadius: vars.radii.radiiSm,
});

export const emptyBuilding = style({
  fontSize: '0.85rem',
  color: vars.color.textMuted,
  fontStyle: 'italic',
  padding: vars.spacing.spacing4,
});

export const jsonCard = style({
  background: vars.color.surfaceBgAlt,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.radiiMd,
  padding: vars.spacing.spacing3,
  overflow: 'auto',
  maxHeight: '200px',
  animation: `${fadeInUp} 0.3s ease`,
});

export const jsonPre = style({
  margin: 0,
  fontSize: '0.75rem',
  fontFamily: 'monospace',
  color: vars.color.text,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-all',
});
