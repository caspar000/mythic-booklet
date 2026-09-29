import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { relativeImages } from './src/lib/relative-images.mjs';

export default defineConfig({
  site: 'https://caspar000.github.io',
  base: '/mythic-booklet',
  markdown: { processor: satteri({ mdastPlugins: [relativeImages] }) },
});
