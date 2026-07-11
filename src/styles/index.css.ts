import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '../styles/theme.css';

export const siteHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.spacing.spacing3,
  padding: `${vars.spacing.spacing3} ${vars.spacing.spacing5}`,
  borderBottom: `1px solid ${vars.color.border}`,
  background: vars.color.surfaceBgAlt,
  position: 'sticky',
  top: 0,
  zIndex: 10,
  backdropFilter: 'blur(8px)',
});

export const brand = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.spacing2,
  color: vars.color.textStrong,
  textDecoration: 'none',
  fontWeight: 700,
  fontSize: '16px',
});

export const brandMark = style({
  width: '32px',
  height: '32px',
  borderRadius: vars.radii.radiiSm,
  background: `linear-gradient(135deg, ${vars.color.accentPrimary}, ${vars.color.accentSecondary})`,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  fontWeight: 800,
  fontSize: '14px',
  boxShadow: vars.shadow.shadowSm,
});

export const main = style({
  maxWidth: '960px',
  margin: '0 auto',
  padding: `${vars.spacing.spacing6} ${vars.spacing.spacing5}`,
});

export const hero = style({
  textAlign: 'center',
  marginBottom: vars.spacing.spacing6,
});

export const title = style({
  margin: 0,
  fontSize: 'clamp(32px, 6vw, 56px)',
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  color: vars.color.textStrong,
});

export const titleAccent = style({
  background: `linear-gradient(135deg, ${vars.color.accentPrimary}, ${vars.color.accentSecondary})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
});

export const subtitle = style({
  margin: `${vars.spacing.spacing3} auto 0`,
  fontSize: 'clamp(16px, 2.4vw, 20px)',
  color: vars.color.textMuted,
  maxWidth: '640px',
  lineHeight: 1.5,
});

export const cards = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: vars.spacing.spacing3,
  marginTop: vars.spacing.spacing6,
});

export const card = style({
  padding: vars.spacing.spacing4,
  background: vars.color.surfaceCard,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.radiiLg,
  transition: 'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
  selectors: {
    '&:hover': {
      borderColor: vars.color.accentPrimary,
      transform: 'translateY(-2px)',
      boxShadow: vars.shadow.shadowMd,
    },
  },
});

export const cardIcon = style({
  width: '40px',
  height: '40px',
  borderRadius: vars.radii.radiiMd,
  background: vars.color.surfaceBgAlt,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.color.accentPrimary,
  fontWeight: 700,
  marginBottom: vars.spacing.spacing2,
});

export const cardTitle = style({
  margin: 0,
  fontSize: '18px',
  fontWeight: 700,
  color: vars.color.textStrong,
});

export const cardBody = style({
  margin: `${vars.spacing.spacing1} 0 0`,
  color: vars.color.textMuted,
  fontSize: '14px',
  lineHeight: 1.5,
});

globalStyle(`${siteHeader} a:focus-visible`, {
  outline: `2px solid ${vars.color.accentPrimary}`,
  outlineOffset: '2px',
  borderRadius: vars.radii.radiiSm,
});
