import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  site: 'https://MichaelManteeny.github.io',
  base: '/design-patterns',
  output: 'static',
  integrations: [react()],
  vite: {
    plugins: [vanillaExtractPlugin()],
  },
});