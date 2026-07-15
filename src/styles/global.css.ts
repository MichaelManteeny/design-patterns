import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css';

/* ------------------------------ Base resets ------------------------------ */

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});

globalStyle('html', {
  WebkitTextSizeAdjust: '100%',
  textSizeAdjust: '100%',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  scrollBehavior: 'smooth',
});

globalStyle('html, body', {
  margin: 0,
  padding: 0,
});

globalStyle('body', {
  margin: 0,
  fontFamily: vars.font.sans,
  fontSize: '16px',
  lineHeight: 1.6,
  background: vars.color.surfaceBg,
  color: vars.color.text,
  fontFeatureSettings: '"ss01", "cv11"',
  transition: `background-color ${vars.motion.dur} ${vars.motion.ease}, color ${vars.motion.dur} ${vars.motion.ease}`,
  minHeight: '100vh',
  textRendering: 'optimizeLegibility',
});

globalStyle('h1, h2, h3, h4, h5, h6', {
  fontFamily: vars.font.display,
  fontWeight: 700,
  letterSpacing: '-0.02em',
  margin: 0,
});

globalStyle('p', {
  margin: 0,
});

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});

globalStyle('button', {
  fontFamily: 'inherit',
});

globalStyle('img, svg, video', {
  display: 'block',
  maxWidth: '100%',
});

/* ------------------------------ Focus styles ----------------------------- */

globalStyle(':focus-visible', {
  outline: 'none',
});

globalStyle(
  'a:focus-visible, button:focus-visible, [tabindex]:focus-visible',
  {
    outline: '2px solid',
    outlineColor: vars.color.accentPrimary,
    outlineOffset: '2px',
    borderRadius: vars.radii.radiiXs,
  },
);

/* ------------------------------ Selection ----------------------------- */

globalStyle('::selection', {
  backgroundColor: vars.color.accentPrimary,
  color: '#ffffff',
});

/* ------------------------------ Scrollbar (subtle) ----------------------------- */

globalStyle('*::-webkit-scrollbar', {
  width: '10px',
  height: '10px',
});

globalStyle('*::-webkit-scrollbar-track', {
  background: 'transparent',
});

globalStyle('*::-webkit-scrollbar-thumb', {
  background: vars.color.border,
  borderRadius: vars.radii.radiiFull,
  border: '2px solid transparent',
  backgroundClip: 'padding-box',
});

globalStyle('*::-webkit-scrollbar-thumb:hover', {
  background: vars.color.borderStrong,
  backgroundClip: 'padding-box',
});

/* ------------------------------ Reveal-on-load ----------------------------- */

globalStyle('[data-reveal]', {
  opacity: 0,
  transform: 'translateY(8px)',
  transition: `opacity ${vars.motion.durSlow} ${vars.motion.easeOut}, transform ${vars.motion.durSlow} ${vars.motion.easeOut}`,
});

globalStyle('[data-reveal].is-visible', {
  opacity: 1,
  transform: 'translateY(0)',
});
