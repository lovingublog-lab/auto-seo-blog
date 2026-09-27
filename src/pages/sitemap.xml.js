import { getCollection } from 'astro:content';

const esc = (value) => value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

export async function GET({ site }) {
  const base = new URL('/auto-seo-blog/', site);
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const staticPaths = ['', 'articles/', 'about/', 'privacy/', 'contact/'];
  const staticUrls = staticPaths.map(path => ({ loc:new URL(path, base).href }));
  const postUrls = posts.map(post => ({
    loc:new URL(`blog/${post.slug}/`, base).href,
    lastmod:(post.data.updatedDate || post.data.pubDate).toISOString()
  }));
  const urls = [...staticUrls, ...postUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({loc,lastmod}) => `  <url><loc>${esc(loc)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
}
