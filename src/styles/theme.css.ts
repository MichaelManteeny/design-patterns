import {
  createThemeContract,
  createTheme as createRecipeTheme,
} from '@vanilla-extract/css';

/**
 * Design tokens for the design-patterns learning site.
 *
 * Color philosophy:
 *   - Warm orange identity (#ff6b35) is carried forward for recognizability,
 *     with a soft cream/peach light theme and an inky charcoal dark theme.
 *   - Supporting teal (#14b8a6) and violet (#8b5cf6) provide cool counterparts
 *     for category accents (creational/structural/behavioral) so the cards
 *     have visual variety without breaking palette cohesion.
 *
 * Typography philosophy:
 *   - Display font: "Inter Tight" — a slightly tighter, more characterful
 *     variant of Inter, great for large headlines.
 *   - Body font: "Inter" — neutral, highly readable, full Cyrillic support.
 *   - Mono: "JetBrains Mono" for code blocks (loaded by the content layer).
 */

export const vars = createThemeContract({
  color: {
    accentPrimary: null,
    accentSecondary: null,
    accentSoft: null,
    accentDeep: null,
    accentTeal: null,
    accentViolet: null,
    surfaceBg: null,
    surfaceBgAlt: null,
    surfaceCard: null,
    surfaceCardHover: null,
    surfaceElevated: null,
    border: null,
    borderHover: null,
    borderStrong: null,
    textStrong: null,
    text: null,
    textMuted: null,
    success: null,
    danger: null,
    warning: null,
    scrim: null,
  },
  font: {
    sans: null,
    display: null,
    mono: null,
  },
  spacing: {
    spacing0: null,
    spacing1: null,
    spacing2: null,
    spacing3: null,
    spacing4: null,
    spacing5: null,
    spacing6: null,
    spacing7: null,
    spacing8: null,
  },
  radii: {
    radiiXs: null,
    radiiSm: null,
    radiiMd: null,
    radiiLg: null,
    radiiXl: null,
    radiiFull: null,
  },
  shadow: {
    shadowXs: null,
    shadowSm: null,
    shadowMd: null,
    shadowLg: null,
    shadowXl: null,
    shadowGlow: null,
    ringPrimary: null,
  },
  motion: {
    durFast: null,
    dur: null,
    durSlow: null,
    ease: null,
    easeOut: null,
  },
  layout: {
    sidebarWidth: null,
    headerHeight: null,
    maxWidth: null,
  },
});

export const darkThemeTokens = {
  color: {
    accentPrimary: '#ff7849',
    accentSecondary: '#ff9d6c',
    accentSoft: '#f4a261',
    accentDeep: '#e76f51',
    accentTeal: '#2dd4bf',
    accentViolet: '#a78bfa',
    surfaceBg: '#0b0d10',
    surfaceBgAlt: '#11141a',
    surfaceCard: '#161a21',
    surfaceCardHover: '#1d222c',
    surfaceElevated: '#1f242e',
    border: '#262b36',
    borderHover: '#3a4150',
    borderStrong: '#4a5263',
    textStrong: '#fafafa',
    text: '#d6d9e0',
    textMuted: '#8b94a3',
    success: '#34d399',
    danger: '#f87171',
    warning: '#fbbf24',
    scrim: 'rgba(0, 0, 0, 0.65)',
  },
  font: {
    sans: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    display:
      '"Inter Tight", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
  spacing: {
    spacing0: '4px',
    spacing1: '8px',
    spacing2: '12px',
    spacing3: '16px',
    spacing4: '24px',
    spacing5: '32px',
    spacing6: '48px',
    spacing7: '64px',
    spacing8: '96px',
  },
  radii: {
    radiiXs: '4px',
    radiiSm: '8px',
    radiiMd: '14px',
    radiiLg: '20px',
    radiiXl: '28px',
    radiiFull: '999px',
  },
  shadow: {
    shadowXs: '0 1px 2px rgba(0, 0, 0, 0.4)',
    shadowSm: '0 2px 4px rgba(0, 0, 0, 0.35)',
    shadowMd: '0 8px 16px rgba(0, 0, 0, 0.45)',
    shadowLg: '0 20px 40px rgba(0, 0, 0, 0.55)',
    shadowXl: '0 30px 60px rgba(0, 0, 0, 0.6)',
    shadowGlow:
      '0 0 0 1px rgba(255, 120, 73, 0.35), 0 8px 32px rgba(255, 120, 73, 0.2)',
    ringPrimary: '0 0 0 3px rgba(255, 120, 73, 0.45)',
  },
  motion: {
    durFast: '120ms',
    dur: '200ms',
    durSlow: '360ms',
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
  layout: {
    sidebarWidth: '268px',
    headerHeight: '64px',
    maxWidth: '1240px',
  },
};

export const lightThemeTokens = {
  color: {
    accentPrimary: '#ea580c',
    accentSecondary: '#f97316',
    accentSoft: '#fb923c',
    accentDeep: '#c2410c',
    accentTeal: '#0d9488',
    accentViolet: '#7c3aed',
    surfaceBg: '#fafaf7',
    surfaceBgAlt: '#ffffff',
    surfaceCard: '#ffffff',
    surfaceCardHover: '#f7f5f2',
    surfaceElevated: '#ffffff',
    border: '#e7e3dc',
    borderHover: '#d4cfc6',
    borderStrong: '#a8a299',
    textStrong: '#0a0a0a',
    text: '#1f1d1a',
    textMuted: '#6b6862',
    success: '#059669',
    danger: '#dc2626',
    warning: '#d97706',
    scrim: 'rgba(20, 18, 14, 0.45)',
  },
  font: {
    sans: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    display:
      '"Inter Tight", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
  spacing: {
    spacing0: '4px',
    spacing1: '8px',
    spacing2: '12px',
    spacing3: '16px',
    spacing4: '24px',
    spacing5: '32px',
    spacing6: '48px',
    spacing7: '64px',
    spacing8: '96px',
  },
  radii: {
    radiiXs: '4px',
    radiiSm: '8px',
    radiiMd: '14px',
    radiiLg: '20px',
    radiiXl: '28px',
    radiiFull: '999px',
  },
  shadow: {
    shadowXs: '0 1px 2px rgba(20, 18, 14, 0.04)',
    shadowSm: '0 2px 6px rgba(20, 18, 14, 0.06)',
    shadowMd: '0 6px 18px rgba(20, 18, 14, 0.08)',
    shadowLg: '0 16px 36px rgba(20, 18, 14, 0.12)',
    shadowXl: '0 24px 56px rgba(20, 18, 14, 0.18)',
    shadowGlow:
      '0 0 0 1px rgba(234, 88, 12, 0.25), 0 8px 32px rgba(234, 88, 12, 0.18)',
    ringPrimary: '0 0 0 3px rgba(234, 88, 12, 0.35)',
  },
  motion: {
    durFast: '120ms',
    dur: '200ms',
    durSlow: '360ms',
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
  layout: {
    sidebarWidth: '268px',
    headerHeight: '64px',
    maxWidth: '1240px',
  },
};

export const darkThemeClass = createRecipeTheme(vars, darkThemeTokens);
export const lightThemeClass = createRecipeTheme(vars, lightThemeTokens);
