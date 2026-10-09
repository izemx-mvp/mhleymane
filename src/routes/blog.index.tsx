import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { categories, categoryLabel, posts, type CategorySlug } from "@/data/posts";
import { seo, breadcrumbLd } from "@/lib/seo";
import { PageHero } from "@/components/site/PageHero";
import { ArticleCard, ArticleMeta, CategoryChip, PostCoverImage } from "@/components/site/cards";
import { CTABanner } from "@/components/site/blocks";
import { Droplet } from "@/components/site/motifs";
import { EASE_LUXE, Reveal } from "@/components/site/Reveal";

const PER_PAGE = 9;

type BlogSearch = {
  categorie?: CategorySlug | undefined;
  q?: string | undefined;
  page?: number | undefined;
};

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Blog", path: "/blog" },
];

export const Route = createFileRoute("/blog/")({
  validateSearch: (s: Record<string, unknown>): BlogSearch => {
    const out: BlogSearch = {};
    const cat = s["categorie"];
    if (typeof cat === "string" && categories.some((c) => c.slug === cat))
      out.categorie = cat as CategorySlug;
    if (typeof s["q"] === "string" && s["q"].trim()) out.q = s["q"].slice(0, 80);
    const page = Number(s["page"]);
    if (Number.isInteger(page) && page > 1) out.page = page;
    return out;
  },
  head: () =>
    seo({
      title: "Blog – Conseils & actualités sur le nettoyage professionnel | MHLEYMANE",
      description:
        "Conseils d'entretien, hygiène, bureaux, commerces, restaurants, industrie : les articles de MHLEYMANE pour mieux organiser le nettoyage de vos locaux.",
      path: "/blog",
      jsonLd: [breadcrumbLd(crumbs)],
    }),
  component: BlogPage,
});

const normalize = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function BlogPage() {
  const { categorie, q = "", page = 1 } = Route.useSearch();
  const navigate = useNavigate({ from: "/blog/" });
  const reduce = useReducedMotion();
  const [query, setQuery] = useState(q);

  // Recherche avec anti-rebond, reflétée dans l'URL
  useEffect(() => {
    const t = setTimeout(() => {
      if (query.trim() === q) return;
      void navigate({
        search: (prev) => ({ ...prev, q: query.trim() || undefined, page: undefined }),
        replace: true,
        resetScroll: false,
      });
    }, 300);
    return () => clearTimeout(t);
  }, [query, q, navigate]);

  const filtered = useMemo(() => {
    const nq = normalize(q.trim());
    return posts.filter((p) => {
      if (categorie && p.category !== categorie) return false;
      if (!nq) return true;
      return [p.title, p.excerpt, ...p.tags].some((field) => normalize(field).includes(nq));
    });
  }, [categorie, q]);

  const isFiltered = !!categorie || !!q;
  const featured = !isFiltered && page === 1 ? posts[0] : undefined;
  const list = featured ? filtered.filter((p) => p.slug !== featured.slug) : filtered;
  const pageCount = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const current = Math.min(page, pageCount);
  const visible = list.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const setCategory = (slug?: CategorySlug) =>
    navigate({
      search: (prev) => ({ ...prev, categorie: slug, page: undefined }),
      resetScroll: false,
    });

  const chipsList: { slug?: CategorySlug; label: string }[] = [
    { label: "Tous les articles" },
    ...categories,
  ];

  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Le journal"
        title="Conseils & actualités"
        lead="Des repères concrets pour organiser l'entretien de vos locaux, par secteur et par usage."
      />

      {featured && (
        <section className="bg-ivory pt-16 md:pt-24" aria-label="Article à la une">
          <div className="container-x">
            <Reveal>
              <article className="card-luxe card-hover group img-zoom grid overflow-hidden lg:grid-cols-[1.15fr_1fr]">
                <PostCoverImage
                  post={featured}
                  priority
                  className="aspect-[1200/630] lg:aspect-auto lg:min-h-[26rem]"
                  sizes="(min-width: 1024px) 660px, 100vw"
                />
                <div className="flex flex-col justify-center p-8 md:p-12">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-gold-ink">
                      À la une
                    </span>
                    <CategoryChip>{categoryLabel(featured.category)}</CategoryChip>
                  </div>
                  <h2 className="mt-6 text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] normal-case tracking-[0.02em]">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: featured.slug }}
                      className="after:absolute after:inset-0 focus-visible:outline-none"
                    >
                      {featured.title}
                    </Link>
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                    {featured.excerpt}
                  </p>
                  <ArticleMeta post={featured} className="mt-6" />
                  <span className="mt-8 inline-flex items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-gold-ink">
                    Lire l'article
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </article>
            </Reveal>
          </div>
        </section>
      )}

      <section className="section-y bg-ivory" aria-labelledby="articles-title">
        <div className="container-x">
          <h2 id="articles-title" className="sr-only">
            Tous les articles
          </h2>

          {/* Barre d'outils : catégories + recherche */}
          <div className="flex flex-col gap-6 border-b border-line pb-6 lg:flex-row lg:items-end lg:justify-between">
            <LayoutGroup id="blog-cats">
              <ul
                className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] lg:flex-wrap"
                aria-label="Filtrer par catégorie"
              >
                {chipsList.map((c) => {
                  const active = categorie === c.slug;
                  return (
                    <li key={c.label} className="shrink-0">
                      <button
                        type="button"
                        aria-pressed={active}
                        onClick={() => setCategory(c.slug)}
                        className={cn(
                          "relative px-3 py-2.5 text-[0.8125rem] font-semibold transition-colors",
                          active ? "text-ink" : "text-muted-foreground hover:text-ink",
                        )}
                      >
                        {c.label}
                        {active && (
                          <motion.span
                            layoutId="cat-underline"
                            className="absolute inset-x-3 -bottom-px h-[2px] rounded-full"
                            style={{ background: "var(--gradient-gold)" }}
                            transition={{ duration: reduce ? 0 : 0.45, ease: EASE_LUXE }}
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </LayoutGroup>
            <div className="relative w-full lg:max-w-xs">
              <label htmlFor="blog-search" className="sr-only">
                Rechercher un article
              </label>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone"
                aria-hidden="true"
              />
              <input
                id="blog-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un article…"
                className="field rounded-full pl-11 pr-11"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Effacer la recherche"
                  className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-stone hover:text-ink"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
            {filtered.length} article{filtered.length > 1 ? "s" : ""}
            {categorie ? ` dans « ${categoryLabel(categorie)} »` : ""}
            {q ? ` pour « ${q} »` : ""}
          </p>

          {visible.length > 0 ? (
            <motion.ul layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((p, i) => (
                  <motion.li
                    key={p.slug}
                    layout={!reduce}
                    initial={{ opacity: 0, y: reduce ? 0 : 24 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, delay: i * 0.06, ease: EASE_LUXE },
                    }}
                    exit={{ opacity: 0, scale: reduce ? 1 : 0.97, transition: { duration: 0.2 } }}
                  >
                    <ArticleCard post={p} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          ) : (
            <div className="mt-16 flex flex-col items-center text-center">
              <div className="relative grid h-28 w-28 place-items-center rounded-full bg-sand">
                <Droplet className="h-14 w-10 text-gold" strokeWidth={1} />
              </div>
              <h3 className="mt-8 text-xl">Aucun article ne correspond</h3>
              <p className="mt-3 max-w-md text-muted-foreground">
                Essayez un autre mot-clé ou une autre catégorie.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  void navigate({ search: {}, resetScroll: false });
                }}
                className="btn btn-secondary mt-8"
              >
                Voir tous les articles
              </button>
            </div>
          )}

          {pageCount > 1 && (
            <nav aria-label="Pagination" className="mt-16 flex items-center justify-center gap-2">
              <Link
                to="/blog"
                search={(prev) => ({ ...prev, page: current > 2 ? current - 1 : undefined })}
                aria-disabled={current === 1}
                className={cn(
                  "grid h-11 w-11 place-items-center rounded-full border border-line",
                  current === 1 && "pointer-events-none opacity-40",
                )}
                aria-label="Page précédente"
              >
                <ChevronLeft className="h-4 w-4" />
              </Link>
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  to="/blog"
                  search={(prev) => ({ ...prev, page: n > 1 ? n : undefined })}
                  aria-current={n === current ? "page" : undefined}
                  className={cn(
                    "grid h-11 w-11 place-items-center rounded-full border text-sm font-semibold",
                    n === current
                      ? "border-ink bg-ink text-ivory"
                      : "border-line hover:border-gold",
                  )}
                >
                  {n}
                </Link>
              ))}
              <Link
                to="/blog"
                search={(prev) => ({ ...prev, page: current < pageCount ? current + 1 : current })}
                aria-disabled={current === pageCount}
                className={cn(
                  "grid h-11 w-11 place-items-center rounded-full border border-line",
                  current === pageCount && "pointer-events-none opacity-40",
                )}
                aria-label="Page suivante"
              >
                <ChevronRight className="h-4 w-4" />
              </Link>
            </nav>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
