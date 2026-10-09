import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { sectors } from "@/data/sectors";
import { getService } from "@/data/services";
import { seo, breadcrumbLd } from "@/lib/seo";
import { PageHero } from "@/components/site/PageHero";
import { CTABanner } from "@/components/site/blocks";
import { DiamondRule, DropletBullet, Sparkle } from "@/components/site/motifs";
import { Reveal } from "@/components/site/Reveal";
import { SmartImage } from "@/components/site/SmartImage";

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Secteurs", path: "/secteurs" },
];

export const Route = createFileRoute("/secteurs")({
  head: () =>
    seo({
      title: "Secteurs d'intervention : bureaux, commerces, restaurants, industrie | MHLEYMANE",
      description:
        "Bureaux, commerces, restaurants, sites industriels, copropriétés : les enjeux de chaque secteur et les réponses de MHLEYMANE, société de nettoyage à Villepreux (78).",
      path: "/secteurs",
      jsonLd: [breadcrumbLd(crumbs)],
    }),
  component: SectorsPage,
});

function SectorsPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Secteurs"
        title="Des réponses adaptées à chaque secteur"
        lead="Chaque environnement professionnel a ses contraintes : horaires, hygiène, sécurité, image. Voici comment nous y répondons."
      >
        <nav aria-label="Accès rapide aux secteurs">
          <ul className="flex flex-wrap gap-2">
            {sectors.map((s) => (
              <li key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  className="inline-flex min-h-10 items-center rounded-full border border-ivory/25 px-4 py-2 text-[0.8125rem] font-semibold text-ivory/85 transition hover:border-gold hover:text-gold-light"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {sectors.map((s, i) => {
        const Icon = s.icon;
        const reversed = i % 2 === 1;
        return (
          <section
            key={s.slug}
            id={s.slug}
            className={cn("section-y scroll-mt-16", i % 2 === 0 ? "bg-ivory" : "bg-sand")}
            aria-labelledby={`${s.slug}-title`}
          >
            <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <Reveal className={cn("relative", reversed && "lg:order-2")}>
                <SmartImage
                  src={s.image.src}
                  alt={s.image.alt}
                  width={1600}
                  height={900}
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="img-zoom aspect-[4/3] rounded-[22px] border border-line shadow-lift"
                >
                  <div className="img-overlay pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/5 to-transparent" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-3 text-ivory">
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/60 bg-ink/60 backdrop-blur-0">
                      <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="font-display text-xs tracking-[0.28em]">
                      {String(i + 1).padStart(2, "0")} / {String(sectors.length).padStart(2, "0")}
                    </span>
                  </div>
                </SmartImage>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="eyebrow">Secteur</p>
                <h2
                  id={`${s.slug}-title`}
                  className="mt-4 text-[clamp(1.625rem,1.2rem+1.6vw,2.5rem)]"
                >
                  {s.title}
                </h2>
                {s.toConfirm && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    Secteur à confirmer par MHLEYMANE.
                  </p>
                )}
                <DiamondRule align="start" className="mt-6" />

                {/* CONTENU EXEMPLE À REMPLACER */}
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-ink/60">
                      Vos enjeux
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {s.challenges.map((c) => (
                        <li
                          key={c}
                          className="flex gap-3 text-[0.95rem] leading-relaxed text-ink/80"
                        >
                          <span
                            className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rotate-45 border border-gold"
                            aria-hidden="true"
                          />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="flex items-center gap-2 font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-gold-ink">
                      <Sparkle className="h-3 w-3 text-gold" />
                      Notre réponse
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {s.answers.map((a) => (
                        <li
                          key={a}
                          className="flex gap-3 text-[0.95rem] leading-relaxed text-ink/80"
                        >
                          <DropletBullet />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-10 border-t border-line pt-6">
                  <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-ink/60">
                    Services liés
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                    {s.relatedServices.map((slug) => {
                      const svc = getService(slug);
                      if (!svc) return null;
                      return (
                        <li key={slug}>
                          <Link
                            to="/services/$slug"
                            params={{ slug }}
                            className="link-gold group inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-ink"
                          >
                            {svc.title}
                            <ArrowRight
                              className="h-3.5 w-3.5 text-gold-ink transition-transform group-hover:translate-x-1"
                              aria-hidden="true"
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}

      <CTABanner
        title="Votre secteur a ses exigences"
        lead="Parlons de vos contraintes : nous construisons une prestation qui leur répond, précisément."
      />
    </>
  );
}
