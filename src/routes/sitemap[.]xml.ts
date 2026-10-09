import { createFileRoute } from "@tanstack/react-router";
import { absoluteUrl } from "@/config/site";
import { services } from "@/data/services";
import { posts } from "@/data/posts";

const SITE_UPDATED = "2026-10-09";

type Entry = { path: string; lastmod: string; priority: string; changefreq: string };

function buildSitemap() {
  const latestPost = posts[0]?.updatedAt ?? posts[0]?.publishedAt ?? SITE_UPDATED;
  const entries: Entry[] = [
    { path: "/", lastmod: SITE_UPDATED, priority: "1.0", changefreq: "monthly" },
    { path: "/services", lastmod: SITE_UPDATED, priority: "0.9", changefreq: "monthly" },
    ...services.map((s) => ({
      path: `/services/${s.slug}`,
      lastmod: SITE_UPDATED,
      priority: "0.8",
      changefreq: "monthly",
    })),
    { path: "/secteurs", lastmod: SITE_UPDATED, priority: "0.7", changefreq: "monthly" },
    { path: "/a-propos", lastmod: SITE_UPDATED, priority: "0.6", changefreq: "yearly" },
    { path: "/devis", lastmod: SITE_UPDATED, priority: "0.8", changefreq: "yearly" },
    { path: "/contact", lastmod: SITE_UPDATED, priority: "0.6", changefreq: "yearly" },
    { path: "/blog", lastmod: latestPost, priority: "0.7", changefreq: "weekly" },
    ...posts.map((p) => ({
      path: `/blog/${p.slug}`,
      lastmod: p.updatedAt ?? p.publishedAt,
      priority: "0.6",
      changefreq: "yearly",
    })),
    { path: "/mentions-legales", lastmod: SITE_UPDATED, priority: "0.2", changefreq: "yearly" },
    {
      path: "/politique-de-confidentialite",
      lastmod: SITE_UPDATED,
      priority: "0.2",
      changefreq: "yearly",
    },
    { path: "/cookies", lastmod: SITE_UPDATED, priority: "0.2", changefreq: "yearly" },
  ];
  const urls = entries
    .map(
      (e) =>
        `  <url>\n    <loc>${absoluteUrl(e.path)}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});
