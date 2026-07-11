import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme.css';

const fadeInUp = keyframes({
  '0%': { opacity: '0', transform: 'translateY(12px)' },
  '100%': { opacity: '1', transform: 'translateY(0)' },
});

const slideInLeft = keyframes({
  '0%': { opacity: '0', transform: 'translateX(-20px)' },
  '100%': { opacity: '1', transform: 'translateX(0)' },
});

const badgePop = keyframes({
  '0%': { opacity: '0', transform: 'scale(0.6) translateX(-8px)' },
  '60%': { opacity: '1', transform: 'scale(1.1) translateX(2px)' },
  '100%': { opacity: '1', transform: 'scale(1) translateX(0)' },
});

const pulse = keyframes({
  '0%, 100%': { opacity: '1' },
  '50%': { opacity: '0.6' },
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

export const inputRow = style({
  display: 'flex',
  gap: vars.spacing.spacing2,
  alignItems: 'center',
  '@media': {
    '(max-width: 480px)': {
      flexDirection: 'column',
    },
  },
});

export const input = style({
  flex: 1,
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
    '&:focus': {
      borderColor: vars.color.accentPrimary,
    },
  },
});

export const publishBtn = style({
  padding: `${vars.spacing.spacing2} ${vars.spacing.spacing4}`,
  border: `1px solid ${vars.color.accentPrimary}`,
  borderRadius: vars.radii.radiiMd,
  background: vars.color.accentPrimary,
  color: '#fff',
  fontFamily: 'inherit',
  fontSize: '0.9rem',
  fontWeight: 700,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
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

export const clearBtn = style({
  padding: `${vars.spacing.spacing1} ${vars.spacing.spacing3}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.radiiMd,
  background: vars.color.surfaceCard,
  color: vars.color.textMuted,
  fontFamily: 'inherit',
  fontSize: '0.8rem',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'background 0.2s ease, border-color 0.2s ease',
  selectors: {
    '&:hover': {
      background: vars.color.surfaceBgAlt,
      borderColor: vars.color.borderHover,
    },
  },
});

export const mainRow = style({
  display: 'flex',
  gap: vars.spacing.spacing3,
  alignItems: 'flex-start',
  '@media': {
    '(max-width: 480px)': {
      flexDirection: 'column',
    },
  },
});

export const sidebar = style({
  minWidth: '200px',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing2,
  padding: vars.spacing.spacing3,
  background: vars.color.surfaceCard,
  borderRadius: vars.radii.radiiMd,
  border: `1px solid ${vars.color.border}`,
  '@media': {
    '(max-width: 480px)': {
      minWidth: '100%',
    },
  },
});

export const sidebarTitle = style({
  fontSize: '0.8rem',
  fontWeight: 700,
  color: vars.color.textMuted,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const subscriberRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.spacing1,
  padding: `${vars.spacing.spacing1} ${vars.spacing.spacing2}`,
  borderRadius: vars.radii.radiiSm,
  transition: 'background 0.2s ease',
  selectors: {
    '&:hover': { background: vars.color.surfaceBgAlt },
  },
});

export const checkbox = style({
  accentColor: vars.color.accentPrimary,
  width: '16px',
  height: '16px',
  cursor: 'pointer',
});

export const subscriberLabel = style({
  fontSize: '0.85rem',
  color: vars.color.text,
  fontWeight: 500,
  flex: 1,
});

export const badge = style({
  display: 'inline-block',
  padding: `${vars.spacing.spacing0} ${vars.spacing.spacing1}`,
  borderRadius: vars.radii.radiiSm,
  background: vars.color.accentSoft,
  color: vars.color.textStrong,
  fontSize: '0.7rem',
  fontWeight: 700,
  whiteSpace: 'nowrap',
  animation: `${badgePop} 0.35s ease forwards`,
});

export const content = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing2,
});

export const feedTitle = style({
  fontSize: '0.8rem',
  fontWeight: 700,
  color: vars.color.textMuted,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const feedList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing1,
  maxHeight: '200px',
  overflowY: 'auto',
  padding: vars.spacing.spacing2,
  background: vars.color.surfaceCard,
  borderRadius: vars.radii.radiiMd,
  border: `1px solid ${vars.color.border}`,
});

export const feedItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `${vars.spacing.spacing1} ${vars.spacing.spacing2}`,
  borderRadius: vars.radii.radiiSm,
  background: vars.color.surfaceBgAlt,
  animation: `${slideInLeft} 0.3s ease`,
  fontSize: '0.85rem',
  color: vars.color.text,
});

export const feedTime = style({
  fontSize: '0.7rem',
  color: vars.color.textMuted,
  fontWeight: 500,
  flexShrink: 0,
  marginLeft: vars.spacing.spacing2,
});

export const emptyFeed = style({
  fontSize: '0.85rem',
  color: vars.color.textMuted,
  fontStyle: 'italic',
  textAlign: 'center',
  padding: vars.spacing.spacing3,
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
  padding: `${vars.spacing.spacing1} ${vars.spacing.spacing2}`,
  borderRadius: vars.radii.radiiSm,
  background: vars.color.surfaceBgAlt,
  border: `1px solid ${vars.color.border}`,
  fontSize: '0.8rem',
  fontWeight: 600,
  color: vars.color.text,
  minWidth: '64px',
  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
});

export const chainNodeActive = style({
  borderColor: vars.color.accentPrimary,
  boxShadow: `0 0 0 2px ${vars.color.accentSoft}`,
});

export const chainArrow = style({
  fontSize: '1.1rem',
  color: vars.color.textMuted,
  flexShrink: 0,
});
