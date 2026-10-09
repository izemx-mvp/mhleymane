import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  CalendarRange,
  Sparkles,
} from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { frequencyInfo, getService, services, type FrequencyKey } from "@/data/services";
import { getSector } from "@/data/sectors";
import { seo, breadcrumbLd, faqLd, serviceLd } from "@/lib/seo";
import { PageHero } from "@/components/site/PageHero";
import { ServiceCard } from "@/components/site/cards";
import { CTABanner, Checklist, FAQAccordion, MethodTimeline } from "@/components/site/blocks";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/Section";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const s = getService(params.slug);
    if (!s) throw notFound();
    return { slug: s.slug };
  },
  head: ({ loaderData }) => {
    const s = loaderData ? getService(loaderData.slug) : undefined;
    if (!s)
      return {
        meta: [
          { title: "Service introuvable | MHLEYMANE" },
          { name: "robots", content: "noindex" },
        ],
      };
    const crumbs = [
      { name: "Accueil", path: "/" },
      { name: "Services", path: "/services" },
      { name: s.title, path: `/services/${s.slug}` },
    ];
    return seo({
      title: `${s.title} à Villepreux et dans les Yvelines | MHLEYMANE`,
      description: `${s.short} Devis gratuit et personnalisé par MHLEYMANE, société de nettoyage à Villepreux (78).`,
      path: `/services/${s.slug}`,
      image: s.image.src,
      imageAlt: s.image.alt,
      jsonLd: [serviceLd(s), breadcrumbLd(crumbs), ...(s.faq.length ? [faqLd(s.faq)] : [])],
    });
  },
  component: ServiceDetail,
});

const freqIcons: Record<FrequencyKey, typeof Sparkles> = {
  quotidien: CalendarCheck,
  hebdomadaire: CalendarDays,
  mensuel: CalendarRange,
  ponctuel: Sparkles,
};

function ServiceDetail() {
  const { slug } = Route.useLoaderData();
  const s = getService(slug)!;
  const crumbs = [
    { name: "Accueil", path: "/" },
    { name: "Services", path: "/services" },
    { name: s.shortTitle, path: `/services/${s.slug}` },
  ];
  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      <PageHero crumbs={crumbs} eyebrow="Service" title={s.title} lead={s.intro} image={s.image}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/devis" search={{ service: s.slug }} className="btn btn-light">
            Demander un devis pour ce service
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link to="/services" className="btn btn-ghost-light">
            Tous nos services
          </Link>
        </div>
        {s.toConfirm && (
          <p className="mt-6 text-sm text-ivory/60">
            Périmètre de ce service à confirmer avec MHLEYMANE.
          </p>
        )}
      </PageHero>

      {/* Ce qui est inclus */}
      <section className="section-y bg-ivory" aria-labelledby="inclus-title">
        <div className="container-x grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <SectionTitle
              id="inclus-title"
              eyebrow="La prestation"
              title="Ce qui est inclus"
              align="start"
              className="mb-8 md:mb-8"
            />
            {/* CONTENU EXEMPLE À REMPLACER */}
            <Reveal className="space-y-5 text-lg leading-relaxed text-ink/75">
              {s.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
          </div>
          <Reveal className="card-luxe self-start p-8 md:p-10">
            <Checklist items={s.included} />
            <p className="mt-8 border-t border-line pt-6 text-sm text-muted-foreground">
              Liste indicative : le cahier des charges est établi avec vous après la visite de vos
              locaux.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pour qui */}
      <section className="bg-sand py-16 md:py-20" aria-labelledby="pourqui-title">
        <div className="container-x flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
          <Reveal>
            <p className="eyebrow">Pour qui</p>
            <h2 id="pourqui-title" className="mt-3 text-[clamp(1.375rem,1.1rem+1vw,2rem)]">
              Les secteurs concernés
            </h2>
          </Reveal>
          <RevealGroup as="ul" className="flex flex-wrap justify-center gap-3 md:justify-end">
            {s.audience.map((slug) => {
              const sector = getSector(slug);
              if (!sector) return null;
              const Icon = sector.icon;
              return (
                <RevealItem as="li" key={slug}>
                  <Link
                    to="/secteurs"
                    hash={slug}
                    className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink transition duration-300 hover:-translate-y-0.5 hover:border-gold"
                  >
                    <Icon className="h-4 w-4 text-gold-ink" strokeWidth={1.6} aria-hidden="true" />
                    {sector.title}
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Fréquences */}
      <section className="section-y bg-ivory" aria-labelledby="freq-title">
        <div className="container-x">
          <SectionTitle
            id="freq-title"
            eyebrow="Rythme"
            title="Fréquences possibles"
            lead="Le rythme d'intervention est défini avec vous selon la fréquentation et l'usage de vos locaux."
          />
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(Object.keys(frequencyInfo) as FrequencyKey[]).map((key) => {
              const f = frequencyInfo[key];
              const Icon = freqIcons[key];
              const available = s.frequencies.includes(key);
              return (
                <RevealItem key={key}>
                  <div
                    className={cn("card-luxe h-full p-7", available ? "card-hover" : "opacity-55")}
                  >
                    <Icon className="h-7 w-7 text-gold-ink" strokeWidth={1.4} aria-hidden="true" />
                    <h3 className="mt-5 text-lg">{f.label}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                    <p
                      className={cn(
                        "mt-5 text-xs font-semibold uppercase tracking-[0.14em]",
                        available ? "text-gold-ink" : "text-stone-ink",
                      )}
                    >
                      {available ? "Disponible" : "Non proposé pour ce service"}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Méthode */}
      <section className="section-y bg-sand" aria-labelledby="methode-title">
        <div className="container-x">
          <SectionTitle
            id="methode-title"
            eyebrow="Notre méthode"
            title="Comment nous travaillons"
          />
          <MethodTimeline compact />
        </div>
      </section>

      {/* FAQ */}
      {s.faq.length > 0 && (
        <section className="section-y bg-ivory" aria-labelledby="faq-service-title">
          <div className="container-x max-w-4xl">
            <SectionTitle
              id="faq-service-title"
              eyebrow="Questions fréquentes"
              title="Vos questions sur ce service"
            />
            <Reveal>
              <FAQAccordion items={s.faq} />
            </Reveal>
          </div>
        </section>
      )}

      <OtherServices others={others} />

      <CTABanner title="Un projet pour vos locaux ?" service={s.slug} />
    </>
  );
}

function OtherServices({ others }: { others: ReturnType<typeof getService>[] }) {
  const track = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };
  return (
    <section className="section-y overflow-hidden bg-sand" aria-labelledby="autres-title">
      <div className="container-x">
        <div className="mb-12 flex items-end justify-between gap-6">
          <SectionTitle
            id="autres-title"
            eyebrow="À découvrir"
            title="Nos autres services"
            align="start"
            className="mb-0 md:mb-0"
          />
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Services précédents"
              className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 bg-white transition hover:border-gold"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Services suivants"
              className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 bg-white transition hover:border-gold"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
        <ul
          ref={track}
          className="-mx-1 flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pb-6 pt-8 [scrollbar-width:none]"
        >
          {others.map(
            (o) =>
              o && (
                <li key={o.slug} className="w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[31.5%]">
                  <ServiceCard service={o} />
                </li>
              ),
          )}
        </ul>
      </div>
    </section>
  );
}
