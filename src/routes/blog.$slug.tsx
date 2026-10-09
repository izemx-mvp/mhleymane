import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CalendarClock, Clock, PenLine } from "lucide-react";
import { useMemo, useRef } from "react";
import { site, absoluteUrl } from "@/config/site";
import { categoryLabel, formatDate, getPost, getRelatedPosts, readingTime } from "@/data/posts";
import { getService } from "@/data/services";
import { seo, breadcrumbLd, blogPostingLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/PageHero";
import { ArticleCard, CategoryChip, PostCoverImage, ServiceCard } from "@/components/site/cards";
import { CTABanner } from "@/components/site/blocks";
import {
  ArticleBody,
  ReadingProgress,
  ShareButtons,
  TableOfContents,
  extractHeadings,
} from "@/components/site/article";
import { DiamondRule, Droplet } from "@/components/site/motifs";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/Section";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const p = getPost(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getPost(loaderData.slug) : undefined;
    if (!p)
      return {
        meta: [
          { title: "Article introuvable | MHLEYMANE" },
          { name: "robots", content: "noindex" },
        ],
      };
    const section = categoryLabel(p.category);
    return seo({
      title: `${p.seo.title} | MHLEYMANE`,
      description: p.seo.description,
      path: `/blog/${p.slug}`,
      type: "article",
      image: p.coverImage,
      imageAlt: p.coverAlt,
      article: { publishedTime: p.publishedAt, modifiedTime: p.updatedAt, section, tags: p.tags },
      jsonLd: [
        blogPostingLd(p, section),
        breadcrumbLd([
          { name: "Accueil", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: section, path: `/blog?categorie=${p.category}` },
          { name: p.title, path: `/blog/${p.slug}` },
        ]),
      ],
    });
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useLoaderData();
  const p = getPost(slug)!;
  const articleRef = useRef<HTMLDivElement>(null);
  const headings = useMemo(() => extractHeadings(p.content), [p]);
  const related = getRelatedPosts(p);
  const relatedServices = p.relatedServices.map(getService).filter((s) => s !== undefined);
  const section = categoryLabel(p.category);

  return (
    <>
      <ReadingProgress target={articleRef} />

      {/* Hero */}
      <header className="relative isolate overflow-hidden bg-ivory pb-12 pt-[calc(var(--header-h)+2.5rem)] md:pt-[calc(var(--header-h)+4rem)]">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(50% 60% at 85% 0%, rgb(201 161 59 / 0.1), transparent 70%)",
          }}
          aria-hidden="true"
        />
        <Droplet
          className="pointer-events-none absolute -right-16 top-24 -z-10 h-80 w-56 text-gold/10"
          strokeWidth={0.5}
        />
        <div className="container-x">
          <div className="mx-auto max-w-4xl animate-fade-up">
            <Breadcrumbs
              tone="light"
              items={[
                { name: "Accueil", path: "/" },
                { name: "Blog", path: "/blog" },
                { name: section, path: `/blog?categorie=${p.category}` },
              ]}
            />
            <div className="mt-8">
              <CategoryChip>{section}</CategoryChip>
            </div>
            <h1 className="mt-6 text-[clamp(1.875rem,1.2rem+2.6vw,3.25rem)] normal-case tracking-[0.02em] text-ink">
              {p.title}
            </h1>
            <p className="tagline mt-6 text-xl leading-snug text-ink/70 md:text-2xl">{p.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <PenLine className="h-4 w-4 text-gold-ink" aria-hidden="true" />
                {p.author}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-gold-ink" aria-hidden="true" />
                Publié le <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time>
              </span>
              {p.updatedAt && (
                <span>
                  Mis à jour le <time dateTime={p.updatedAt}>{formatDate(p.updatedAt)}</time>
                </span>
              )}
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-gold-ink" aria-hidden="true" />
                {readingTime(p)} min de lecture
              </span>
            </div>
          </div>
          <div className="mx-auto mt-12 max-w-6xl animate-fade-in [animation-delay:150ms]">
            <PostCoverImage
              post={p}
              priority
              className="aspect-[1200/630] rounded-[24px] shadow-lift"
              sizes="(min-width: 1280px) 1152px, 100vw"
            />
          </div>
        </div>
      </header>

      {/* Corps */}
      <div className="bg-ivory pb-20 md:pb-28">
        <div className="container-x">
          <div className="mx-auto grid max-w-6xl gap-14 pt-8 lg:grid-cols-[minmax(0,720px)_1fr] lg:gap-16 xl:gap-24">
            <div ref={articleRef}>
              {/* CONTENU EXEMPLE À REMPLACER */}
              <ArticleBody blocks={p.content} />
              <DiamondRule className="my-14" />
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <ShareButtons url={absoluteUrl(`/blog/${p.slug}`)} title={p.title} />
                <ul className="flex flex-wrap gap-2" aria-label="Mots-clés">
                  {p.tags.map((t) => (
                    <li key={t} className="rounded-full bg-sand px-3 py-1 text-xs text-ink/70">
                      #{t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-10">
                <TableOfContents headings={headings} />
                <div className="relative overflow-hidden rounded-[20px] bg-ink p-7 text-ivory">
                  <p className="eyebrow eyebrow-light">Un projet ?</p>
                  <p className="tagline mt-4 text-2xl leading-snug">
                    Recevez une proposition adaptée à vos locaux.
                  </p>
                  <Link to="/devis" className="btn btn-light mt-6 w-full min-h-11 text-[0.72rem]">
                    Demander un devis
                  </Link>
                  <p className="mt-4 text-center text-xs text-ivory/60">
                    Réponse sous {site.responseDelay}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {relatedServices.length > 0 && (
        <section className="section-y bg-sand" aria-labelledby="services-lies-title">
          <div className="container-x">
            <SectionTitle
              id="services-lies-title"
              eyebrow="Pour aller plus loin"
              title="Services liés"
            />
            <RevealGroup className="mx-auto grid max-w-5xl gap-x-6 gap-y-12 pt-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((s) => (
                <RevealItem key={s.slug}>
                  <ServiceCard service={s} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="section-y bg-ivory" aria-labelledby="similaires-title">
          <div className="container-x">
            <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <SectionTitle
                id="similaires-title"
                eyebrow="À lire aussi"
                title="Articles similaires"
                align="start"
                className="mb-0 md:mb-0"
              />
              <Reveal>
                <Link
                  to="/blog"
                  className="link-gold inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold-ink"
                >
                  Tous les articles <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Reveal>
            </div>
            <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <RevealItem key={r.slug}>
                  <ArticleCard post={r} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
}
