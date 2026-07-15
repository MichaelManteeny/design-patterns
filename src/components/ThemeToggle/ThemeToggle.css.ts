import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

export const toggle = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  padding: 0,
  gap: 0,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.radiiMd,
  background: vars.color.surfaceCard,
  color: vars.color.text,
  fontFamily: 'inherit',
  fontSize: '14px',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'background 0.2s ease, border-color 0.2s ease, transform 0.1s ease',
  selectors: {
    '&:hover': {
      background: vars.color.surfaceBgAlt,
      borderColor: vars.color.borderHover,
    },
    '&:active': {
      transform: 'scale(0.97)',
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.accentPrimary}`,
      outlineOffset: '2px',
    },
  },
});

export const toggleLight = style({});

export const toggleDark = style({});

export const icon = style({
  width: '18px',
  height: '18px',
  display: 'inline-block',
  flexShrink: 0,
});

export const label = style({
  display: 'none',
});

globalStyle(`${toggle} svg`, {
  width: '18px',
  height: '18px',
  display: 'block',
});
