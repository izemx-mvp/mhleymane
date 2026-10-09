import { site, absoluteUrl, fullAddress, directorName } from "@/config/site";
import type { FAQItem, Service } from "@/data/services";
import type { Post } from "@/data/posts";

type JsonLd = Record<string, unknown>;

export type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string | undefined;
  imageAlt?: string | undefined;
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: JsonLd[];
  article?: {
    publishedTime: string;
    modifiedTime?: string | undefined;
    section: string;
    tags: string[];
  };
};

/** Balises <head> d'une page : title, description, canonical, Open Graph, Twitter, JSON-LD */
export function seo({
  title,
  description,
  path,
  image = site.ogImage,
  imageAlt,
  type = "website",
  noindex,
  jsonLd = [],
  article,
}: SeoInput) {
  const url = absoluteUrl(path);
  // Les visuels WebP ont une déclinaison JPEG 1200×630 pour les réseaux sociaux
  const img = absoluteUrl(image.replace(/^(\/images\/[\w-]+)\.webp$/, "$1-og.jpg"));
  const meta: Record<string, string>[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:image", content: img },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: imageAlt ?? title },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: img },
  ];
  if (noindex) meta.push({ name: "robots", content: "noindex, follow" });
  if (article) {
    meta.push({ property: "article:published_time", content: article.publishedTime });
    if (article.modifiedTime)
      meta.push({ property: "article:modified_time", content: article.modifiedTime });
    meta.push({ property: "article:section", content: article.section });
    article.tags.forEach((t) => meta.push({ property: "article:tag", content: t }));
  }
  return {
    meta,
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLd.map((data) => ({
      type: "application/ld+json",
      children: JSON.stringify(data),
    })),
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD                                                            */
/* ------------------------------------------------------------------ */

const ORG_ID = `${site.url}/#organisation`;

export const organizationLd = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "CleaningService"],
  "@id": ORG_ID,
  name: site.name,
  legalName: site.legalName,
  description:
    "Société de nettoyage professionnel pour bureaux, locaux commerciaux, magasins, restaurants et sites industriels.",
  url: site.url,
  logo: absoluteUrl(site.logo),
  image: absoluteUrl(site.ogImage),
  foundingDate: site.foundingDate,
  founder: { "@type": "Person", name: directorName },
  email: site.email,
  ...(site.phoneE164 ? { telephone: site.phoneE164 } : {}),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.zip,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  areaServed: site.zone.areas.map((name) => ({ "@type": "Place", name })),
  sameAs: Object.values(site.social).filter(Boolean),
});

export type Crumb = { name: string; path: string };

export const breadcrumbLd = (crumbs: Crumb[]): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: absoluteUrl(c.path),
  })),
});

export const faqLd = (items: FAQItem[]): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});

export const serviceLd = (s: Service): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.title,
  description: s.short,
  serviceType: s.title,
  url: absoluteUrl(`/services/${s.slug}`),
  image: absoluteUrl(s.image.src),
  provider: { "@id": ORG_ID, "@type": "LocalBusiness", name: site.name, address: fullAddress },
  areaServed: site.zone.areas.map((name) => ({ "@type": "Place", name })),
});

export const blogPostingLd = (p: Post, section: string): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: p.title,
  description: p.seo.description,
  image: absoluteUrl(p.coverImage ?? site.ogImage),
  datePublished: p.publishedAt,
  dateModified: p.updatedAt ?? p.publishedAt,
  author: { "@type": "Organization", name: p.author },
  articleSection: section,
  keywords: p.tags.join(", "),
  inLanguage: "fr-FR",
  mainEntityOfPage: absoluteUrl(`/blog/${p.slug}`),
  publisher: {
    "@type": "Organization",
    name: site.name,
    logo: { "@type": "ImageObject", url: absoluteUrl(site.logo) },
  },
});
