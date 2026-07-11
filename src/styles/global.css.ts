import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css';

globalStyle('body', {
  margin: 0,
  fontFamily: 'Inter,system-ui,-apple-system,sans-serif',
  background: vars.color.surfaceBg,
  color: vars.color.text,
  transition: 'background 0.3s ease, color 0.3s ease',
});
