import { getCollection } from 'astro:content';

const esc = (value='') => String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');

export async function GET({ site }) {
  const base = new URL('/auto-seo-blog/', site);
  const posts = (await getCollection('blog', ({data}) => !data.draft))
    .sort((a,b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0,30);

  const items = posts.map(post => {
    const url = new URL(`blog/${post.slug}/`, base).href;
    return `<item>
<title>${esc(post.data.title)}</title>
<link>${esc(url)}</link>
<guid>${esc(url)}</guid>
<description>${esc(post.data.description)}</description>
<pubDate>${post.data.pubDate.toUTCString()}</pubDate>
</item>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>LovingU Journal</title>
<link>${esc(base.href)}</link>
<description>생활과 기술을 더 명확하게 이해하기 위한 실용적인 인사이트</description>
<language>ko-KR</language>
${items}
</channel>
</rss>`;

  return new Response(xml, {headers:{'Content-Type':'application/rss+xml; charset=utf-8'}});
}
