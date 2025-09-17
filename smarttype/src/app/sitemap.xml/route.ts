export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const urls = ['/', '/exam', '/practice', '/tutorials/typing-tips'];
  const items = urls
    .map(
      (u) => `  <url>
    <loc>${base}${u}</loc>
    <changefreq>daily</changefreq>
    <priority>${u === '/' ? '1.0' : '0.8'}</priority>
  </url>`
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}

