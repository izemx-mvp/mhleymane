import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarRange, Sparkles } from "lucide-react";
import { services } from "@/data/services";
import { seo, breadcrumbLd } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { PageHero } from "@/components/site/PageHero";
import { CTABanner } from "@/components/site/blocks";
import { DiamondRule, DropletBullet, Sparkle } from "@/components/site/motifs";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { GoldWord, SectionTitle } from "@/components/site/Section";
import { SmartImage } from "@/components/site/SmartImage";

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Services", path: "/services" },
];

export const Route = createFileRoute("/services/")({
  head: () =>
    seo({
      title: "Nos services de nettoyage professionnel | MHLEYMANE",
      description:
        "Nettoyage de bureaux, commerces, restaurants, sites industriels, parties communes et remise en état : découvrez les services de MHLEYMANE à Villepreux (78).",
      path: "/services",
      jsonLd: [breadcrumbLd(crumbs)],
    }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Services"
        title="Nos services de nettoyage"
        lead="Six expertises complémentaires, une même exigence : des locaux impeccables, entretenus selon vos contraintes et vos horaires."
      />

      <section className="section-y bg-ivory" aria-label="Liste des services">
        <div className="container-x flex flex-col gap-20 md:gap-28">
          {services.map((s, i) => {
            const Icon = s.icon;
            const reversed = i % 2 === 1;
            return (
              <article key={s.slug} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                <Reveal className={cn("relative", reversed && "lg:order-2")}>
                  <div
                    className={cn(
                      "absolute -bottom-4 top-4 rounded-[24px] border border-gold/40",
                      reversed ? "-left-4 right-4" : "-right-4 left-4",
                    )}
                    aria-hidden="true"
                  />
                  <SmartImage
                    src={s.image.src}
                    alt={s.image.alt}
                    width={1600}
                    height={900}
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className="img-zoom aspect-[16/10] rounded-[22px] shadow-lift"
                  >
                    <div className="img-overlay pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
                  </SmartImage>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="flex items-center gap-4">
                    <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/50 bg-white">
                      <Icon
                        className="h-6 w-6 text-gold-ink"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="font-display text-sm tracking-[0.2em] text-gold-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="mt-6 text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)]">{s.title}</h2>
                  {s.toConfirm && (
                    <p className="mt-3 inline-block rounded-full border border-line px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Périmètre à confirmer
                    </p>
                  )}
                  <DiamondRule align="start" className="mt-6" />
                  <p className="mt-6 text-lg leading-relaxed text-ink/75">{s.intro}</p>
                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {s.included.slice(0, 4).map((item) => (
                      <li key={item} className="flex gap-3 text-[0.95rem] text-ink/80">
                        <DropletBullet />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <Link
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className="btn btn-primary"
                    >
                      Découvrir le service
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <Link to="/devis" search={{ service: s.slug }} className="btn btn-secondary">
                      Demander un devis
                    </Link>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-y bg-sand" aria-labelledby="formules-title">
        <div className="container-x">
          <SectionTitle
            id="formules-title"
            eyebrow="Formules"
            title={
              <>
                Ponctuel <GoldWord>ou</GoldWord> régulier
              </>
            }
            lead="Deux façons de travailler ensemble, souvent complémentaires."
          />
          <RevealGroup className="grid gap-6 md:grid-cols-2">
            <RevealItem>
              <FormulaCard
                icon={Sparkles}
                title="Intervention ponctuelle"
                text="Une prestation unique pour un besoin précis : fin de chantier, état des lieux, déménagement, réouverture ou événement."
                items={[
                  "Périmètre défini à l'avance",
                  "Aucun engagement dans la durée",
                  "Idéale pour une remise à niveau",
                ]}
              />
            </RevealItem>
            <RevealItem>
              <FormulaCard
                icon={CalendarRange}
                title="Contrat d'entretien régulier"
                text="Des passages planifiés selon un cahier des charges défini ensemble, pour un niveau de propreté constant."
                items={[
                  "Fréquence quotidienne, hebdomadaire ou mensuelle",
                  "Une interlocutrice dédiée",
                  "Prestation ajustable dans le temps",
                ]}
                featured
              />
            </RevealItem>
          </RevealGroup>
          <Reveal className="mt-12 text-center">
            <Link
              to="/blog/$slug"
              params={{ slug: "nettoyage-ponctuel-ou-contrat-regulier" }}
              className="link-gold inline-flex items-center gap-2 text-sm font-semibold text-gold-ink"
            >
              Lire notre guide : ponctuel ou contrat régulier ?{" "}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

function FormulaCard({
  icon: Icon,
  title,
  text,
  items,
  featured,
}: {
  icon: typeof Sparkles;
  title: string;
  text: string;
  items: string[];
  featured?: boolean;
}) {
  return (
    <div
      className={cn("card-luxe card-hover group h-full p-8 md:p-12", featured && "text-ivory")}
      style={featured ? { background: "var(--ink)" } : undefined}
    >
      <Sparkle className="absolute right-8 top-8 h-4 w-4 text-gold opacity-0 transition duration-500 group-hover:opacity-100" />
      <Icon className="h-9 w-9 text-gold" strokeWidth={1.3} aria-hidden="true" />
      <h3 className={cn("mt-7 text-2xl", featured ? "text-ivory" : "text-ink")}>{title}</h3>
      <p
        className={cn("mt-4 leading-relaxed", featured ? "text-ivory/75" : "text-muted-foreground")}
      >
        {text}
      </p>
      <ul className="mt-7 space-y-3">
        {items.map((i) => (
          <li key={i} className={cn("flex gap-3", featured ? "text-ivory/85" : "text-ink/80")}>
            <DropletBullet />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
