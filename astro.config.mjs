// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import rehypeImageDims from './src/rehype-image-dims.mjs';
import rehypeCodeHeaders from './src/rehype-code-headers.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.meghsohor.dev',
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [rehypeImageDims, rehypeCodeHeaders],
    shikiConfig: {
      themes: {
        light: 'catppuccin-latte',
        dark: 'dracula',
      },
    },
  },
  vite: {
    plugins: [tailwindcss()]
  }
});