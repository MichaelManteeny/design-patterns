import {
  createThemeContract,
  createTheme as createRecipeTheme,
} from '@vanilla-extract/css';

export const vars = createThemeContract({
  color: {
    accentPrimary: null,
    accentSecondary: null,
    accentSoft: null,
    accentDeep: null,
    surfaceBg: null,
    surfaceBgAlt: null,
    surfaceCard: null,
    border: null,
    borderHover: null,
    textStrong: null,
    text: null,
    textMuted: null,
    success: null,
    danger: null,
    warning: null,
  },
  spacing: {
    spacing0: null,
    spacing1: null,
    spacing2: null,
    spacing3: null,
    spacing4: null,
    spacing5: null,
    spacing6: null,
  },
  radii: {
    radiiSm: null,
    radiiMd: null,
    radiiLg: null,
  },
  shadow: {
    shadowSm: null,
    shadowMd: null,
    shadowLg: null,
  },
});

export const darkThemeTokens = {
  color: {
    accentPrimary: '#ff6b35',
    accentSecondary: '#ff8c42',
    accentSoft: '#f4a261',
    accentDeep: '#e76f51',
    surfaceBg: '#0f0f12',
    surfaceBgAlt: '#17171c',
    surfaceCard: '#1f1f25',
    border: '#2a2a32',
    borderHover: '#3a3a45',
    textStrong: '#fafafa',
    text: '#e5e5ea',
    textMuted: '#9ca3af',
    success: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
  },
  spacing: {
    spacing0: '4px',
    spacing1: '8px',
    spacing2: '12px',
    spacing3: '16px',
    spacing4: '24px',
    spacing5: '32px',
    spacing6: '48px',
  },
  radii: {
    radiiSm: '6px',
    radiiMd: '12px',
    radiiLg: '20px',
  },
  shadow: {
    shadowSm: '0 1px 2px rgba(0,0,0,0.3)',
    shadowMd: '0 4px 8px rgba(0,0,0,0.4)',
    shadowLg: '0 12px 24px rgba(0,0,0,0.5)',
  },
};

export const lightThemeTokens = {
  color: {
    accentPrimary: '#ff6b35',
    accentSecondary: '#ff8c42',
    accentSoft: '#f4a261',
    accentDeep: '#e76f51',
    surfaceBg: '#ffffff',
    surfaceBgAlt: '#fafafa',
    surfaceCard: '#f5f5f7',
    border: '#e5e5ea',
    borderHover: '#d4d4d8',
    textStrong: '#0a0a0a',
    text: '#1f1f25',
    textMuted: '#6b7280',
    success: '#059669',
    danger: '#dc2626',
    warning: '#d97706',
  },
  spacing: {
    spacing0: '4px',
    spacing1: '8px',
    spacing2: '12px',
    spacing3: '16px',
    spacing4: '24px',
    spacing5: '32px',
    spacing6: '48px',
  },
  radii: {
    radiiSm: '6px',
    radiiMd: '12px',
    radiiLg: '20px',
  },
  shadow: {
    shadowSm: '0 1px 2px rgba(0,0,0,0.05)',
    shadowMd: '0 4px 8px rgba(0,0,0,0.08)',
    shadowLg: '0 12px 24px rgba(0,0,0,0.12)',
  },
};

export const darkThemeClass = createRecipeTheme(vars, darkThemeTokens);
export const lightThemeClass = createRecipeTheme(vars, lightThemeTokens);
