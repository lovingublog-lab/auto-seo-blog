import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://lovingublog-lab.github.io',
  base: '/auto-seo-blog',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
