import { getCollection } from 'astro:content';

export async function GET({ site }) {
  const base = new URL('/auto-seo-blog/', site);
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const staticPaths = ['', 'articles/', 'about/', 'privacy/', 'contact/'];
  const urls = [
    ...staticPaths.map(path => new URL(path, base).href),
    ...posts.map(post => new URL(`blog/${post.slug}/`, base).href)
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
}
