import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { posts, categories, formatDate } from "@/data/posts";
import { seo } from "@/lib/seo";
import { PageHero, Reveal, PostCover } from "@/components/site/ui";

export const Route = createFileRoute("/blog/")({
  head: () => seo("Blog – Conseils nettoyage et entretien | MHLEYMANE", "Conseils d'entretien pour bureaux, restaurants et commerces, et tout savoir pour bien choisir votre prestation de nettoyage.", "/blog"),
  component: Blog,
});

function Blog() {
  const [cat, setCat] = useState<string>("Tous");
  const list = cat === "Tous" ? posts : posts.filter((p) => p.category === cat);
  return (
    <>
      <PageHero eyebrow="Le journal" title="Blog" tagline="Conseils et bonnes pratiques pour des locaux impeccables." />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {categories.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-widest transition ${cat === c ? "btn-gold border-transparent" : "hover:border-gold"}`}>{c}</button>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="card-lift block h-full overflow-hidden rounded-lg border bg-card">
                  <PostCover variant={p.cover} className="aspect-[16/10]" />
                  <div className="p-6">
                    <p className="eyebrow">{p.category} · {p.readTime}</p>
                    <h2 className="mt-3 text-base leading-snug">{p.title}</h2>
                    <p className="mt-3 text-sm text-muted-foreground">{p.excerpt}</p>
                    <p className="mt-4 text-xs text-muted-foreground">{formatDate(p.date)}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
