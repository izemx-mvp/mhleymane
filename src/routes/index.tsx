import { createFileRoute, Link } from "@tanstack/react-router";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  Gem,
  Layers,
  Quote,
  UserRound,
  Clock4,
} from "lucide-react";
import { site } from "@/config/site";
import { services } from "@/data/services";
import { sectors } from "@/data/sectors";
import { homeFaq } from "@/data/faq";
import { posts } from "@/data/posts";
import { testimonials } from "@/data/testimonials";
import { seo, faqLd } from "@/lib/seo";
import { ArticleCard, ServiceCard, SectorCard } from "@/components/site/cards";
import { CTABanner, FAQAccordion, MethodTimeline, StatItem } from "@/components/site/blocks";
import { DiamondRule, Droplet, GoldDropletArt, Sparkle } from "@/components/site/motifs";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { GoldWord, SectionEyebrow, SectionTitle } from "@/components/site/Section";
import { SmartImage } from "@/components/site/SmartImage";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Société de nettoyage à Villepreux (78) – Bureaux, commerces, industrie | MHLEYMANE",
      description:
        "MHLEYMANE, société de nettoyage professionnel à Villepreux (Yvelines) : bureaux, locaux commerciaux, magasins, restaurants et sites industriels. Devis gratuit.",
      path: "/",
      jsonLd: [faqLd(homeFaq)],
    }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <WhyUs />
      <Sectors />
      <Method />
      <KeyFigures />
      {site.showTestimonials && <Testimonials />}
      <LatestPosts />
      <Faq />
      <CTABanner />
    </>
  );
}

/* ------------------------------------------------------------------ */

const chips = [
  { icon: BadgeCheck, label: "Devis gratuit" },
  { icon: CalendarClock, label: "Intervention planifiée selon vos horaires" },
  { icon: UserRound, label: "Interlocutrice dédiée" },
];

function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const yBack = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 120]);
  const yFront = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -60]);

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ivory pb-16 pt-[calc(var(--header-h)+2.5rem)] lg:pb-24">
      {/* Fond : reflets lumineux et grandes gouttes en contour */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 78% 30%, rgb(255 255 255 / 0.95), transparent 70%), radial-gradient(45% 50% at 10% 90%, rgb(201 161 59 / 0.1), transparent 70%), linear-gradient(115deg, transparent 40%, rgb(233 207 122 / 0.12) 52%, transparent 64%)",
          }}
        />
        <m.div style={{ y: yBack }} className="absolute -left-24 top-24 text-gold/15">
          <Droplet className="h-[30rem] w-[22rem]" strokeWidth={0.4} />
        </m.div>
        <m.div
          style={{ y: yFront }}
          className="absolute bottom-[-6rem] right-[38%] hidden text-gold/20 lg:block"
        >
          <Droplet className="h-60 w-44" strokeWidth={0.5} />
        </m.div>
      </div>

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
        <div className="min-w-0">
          <p className="eyebrow animate-fade-up">
            Société de nettoyage — Yvelines &amp; Île-de-France
          </p>
          <h1 className="mt-6 animate-fade-up text-[clamp(1.75rem,1rem+2.6vw,3.75rem)] text-ink [animation-delay:80ms]">
            La propreté professionnelle, avec{" "}
            <span className="relative inline-block">
              <GoldWord>exigence</GoldWord>
              <Sparkle className="animate-glint absolute -right-5 -top-3 h-5 w-5 text-gold md:-right-7 md:h-6 md:w-6" />
            </span>
          </h1>
          <DiamondRule
            align="start"
            width="lg"
            className="mt-8 animate-fade-up [animation-delay:160ms]"
          />
          <p className="mt-8 max-w-xl animate-fade-up text-lg leading-relaxed text-ink/75 [animation-delay:220ms] md:text-xl">
            Bureaux, locaux commerciaux, magasins, restaurants et sites industriels : nous
            entretenons vos espaces avec méthode et discrétion, pour que vous vous consacriez à
            l'essentiel.
          </p>
          <div className="mt-10 flex animate-fade-up flex-col gap-3 [animation-delay:300ms] sm:flex-row">
            <Link to="/devis" className="btn btn-primary">
              Demander un devis gratuit
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/services" className="btn btn-secondary">
              Découvrir nos services
            </Link>
          </div>
          <ul className="mt-12 flex flex-wrap gap-2.5">
            {chips.map((c, i) => (
              <li
                key={c.label}
                className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-2 text-[0.8125rem] font-medium text-ink/80"
                style={{ animationDelay: `${450 + i * 100}ms` }}
              >
                <c.icon className="h-4 w-4 text-gold-ink" strokeWidth={1.6} aria-hidden="true" />
                {c.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Composition : photo encadrée + goutte dorée */}
        <div className="relative mx-auto w-full max-w-[560px] animate-fade-in [animation-delay:200ms] lg:max-w-none">
          <div
            className="absolute -right-3 -top-3 bottom-3 left-3 rounded-[28px] border border-gold/50 md:-right-5 md:-top-5 md:bottom-5 md:left-5"
            aria-hidden="true"
          />
          <SmartImage
            src="/images/hero-accueil.webp"
            alt="Hall d'accueil lumineux au sol de marbre poli, entretenu par un agent MHLEYMANE"
            width={1920}
            height={1080}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/5] rounded-[24px] shadow-lift sm:aspect-[5/4] lg:aspect-[4/5]"
            imgClassName="animate-slow-zoom"
            placeholderTone="ink"
          >
            <div className="img-overlay pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/5 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 text-ivory">
              <p className="tagline max-w-[16rem] text-xl leading-snug md:text-2xl">
                « {site.baseline} »
              </p>
              <span className="hidden font-display text-[0.65rem] tracking-[0.3em] text-gold-light sm:block">
                DEPUIS {site.foundedYear}
              </span>
            </div>
          </SmartImage>
          <div className="absolute -bottom-10 -left-4 w-28 drop-shadow-[0_18px_30px_rgb(140_106_30_/_0.35)] md:-left-12 md:w-40">
            <div className="animate-float-slow">
              <GoldDropletArt id="hero-drop" className="h-auto w-full" />
            </div>
            <Sparkle className="animate-glint absolute -right-2 top-4 h-6 w-6 text-gold-light [animation-delay:2s]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function ServicesOverview() {
  return (
    <section className="section-y bg-ivory" aria-labelledby="services-title">
      <div className="container-x">
        <SectionTitle
          id="services-title"
          eyebrow="Nos services"
          title={
            <>
              Un savoir-faire pour <GoldWord>chaque espace</GoldWord>
            </>
          }
          lead="Du bureau au site industriel, une prestation construite autour de vos locaux, de vos horaires et de votre niveau d'exigence."
        />
        <RevealGroup className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <RevealItem key={s.slug}>
              <ServiceCard service={s} />
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-14 text-center">
          <Link
            to="/services"
            className="link-gold inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold-ink"
          >
            Voir tous nos services <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const pillars = [
  {
    icon: Gem,
    title: "Exigence & contrôle qualité",
    text: "Un plan de nettoyage précis et des points de contrôle réguliers pour un résultat constant.",
  },
  {
    icon: Clock4,
    title: "Flexibilité des horaires",
    text: "Tôt le matin, en soirée ou le week-end : des passages calés sur votre activité (à confirmer selon les sites).",
  },
  {
    icon: Layers,
    title: "Méthodes adaptées à chaque surface",
    text: "Produits et techniques choisis selon la nature des sols, des matériaux et des usages.",
  },
  {
    icon: UserRound,
    title: "Interlocutrice unique",
    text: "Une personne dédiée qui connaît vos locaux, joignable et réactive pour ajuster la prestation.",
  },
];

function WhyUs() {
  return (
    <section
      className="section-y relative isolate overflow-hidden bg-ink text-ivory"
      aria-labelledby="why-title"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(45% 60% at 100% 0%, rgb(201 161 59 / 0.12), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="container-x grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <Reveal>
          <SectionEyebrow tone="dark" align="start">
            Pourquoi nous choisir
          </SectionEyebrow>
          <h2 id="why-title" className="mt-6 text-ivory">
            L'exigence comme <GoldWord>signature</GoldWord>
          </h2>
          {/* CONTENU EXEMPLE À REMPLACER */}
          <p className="tagline mt-8 text-2xl leading-snug text-ivory/85 md:text-[1.75rem]">
            Nous croyons qu'un lieu bien tenu change la façon dont on y travaille, dont on y
            accueille, dont on y revient. Chaque intervention est pensée comme un service rendu à
            vos équipes et à vos visiteurs.
          </p>
          <SmartImage
            src="/images/pourquoi-nous-choisir.webp"
            alt="Main gantée lustrant une surface noire polie qui reflète la lumière"
            width={1200}
            height={1500}
            sizes="(min-width: 1024px) 40vw, 100vw"
            placeholderTone="ink"
            className="img-zoom mt-12 aspect-[4/5] max-w-md rounded-[22px] border border-gold/30"
          >
            <div className="img-overlay pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          </SmartImage>
        </Reveal>
        <RevealGroup
          as="ul"
          className="grid gap-px self-center overflow-hidden rounded-[22px] border border-ivory/10 bg-ivory/10 sm:grid-cols-2"
        >
          {pillars.map((p) => (
            <RevealItem
              as="li"
              key={p.title}
              className="group bg-ink p-8 transition-colors duration-500 hover:bg-charcoal md:p-10"
            >
              <p.icon
                className="h-9 w-9 text-gold transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                strokeWidth={1.2}
                aria-hidden="true"
              />
              <h3 className="mt-7 text-lg text-ivory">{p.title}</h3>
              <span
                className="mt-4 block h-px w-8 bg-gold transition-all duration-500 group-hover:w-16"
                aria-hidden="true"
              />
              <p className="mt-4 leading-relaxed text-ivory/70">{p.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Sectors() {
  return (
    <section className="section-y bg-sand" aria-labelledby="sectors-title">
      <div className="container-x">
        <SectionTitle
          id="sectors-title"
          eyebrow="Secteurs"
          title="Ils nous confient leurs espaces"
          lead="Chaque secteur a ses contraintes. Nous adaptons nos méthodes, nos horaires et notre organisation à la réalité de votre activité."
        />
      </div>
      <RevealGroup
        as="ul"
        className="container-x flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:thin] xl:grid xl:grid-cols-5 xl:overflow-visible"
      >
        {sectors.map((s) => (
          <RevealItem
            as="li"
            key={s.slug}
            className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-[31%] xl:w-auto"
          >
            <SectorCard sector={s} />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Method() {
  return (
    <section className="section-y bg-ivory" aria-labelledby="method-title">
      <div className="container-x">
        <SectionTitle
          id="method-title"
          eyebrow="Notre méthode"
          title="Quatre étapes, une exigence"
          lead="Une démarche claire, du premier échange au suivi de la qualité."
        />
        <MethodTimeline />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function KeyFigures() {
  return (
    <section
      className="relative isolate overflow-hidden bg-ink py-20 text-ivory md:py-24"
      aria-labelledby="figures-title"
    >
      <h2 id="figures-title" className="sr-only">
        Chiffres clés
      </h2>
      <RevealGroup className="container-x grid grid-cols-2 gap-y-14 lg:grid-cols-4 lg:divide-x lg:divide-ivory/10">
        {site.stats.map((s) => (
          <RevealItem key={s.label}>
            <StatItem stat={s} tone="dark" />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Testimonials() {
  return (
    <section className="section-y bg-sand" aria-labelledby="testimonials-title">
      <div className="container-x">
        <SectionTitle id="testimonials-title" eyebrow="Témoignages" title="Ils en parlent" />
        <RevealGroup className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <RevealItem key={i}>
              <figure className="card-luxe flex h-full flex-col p-8">
                <Quote className="h-7 w-7 text-gold" strokeWidth={1.2} aria-hidden="true" />
                <blockquote className="tagline mt-5 flex-1 text-xl leading-snug text-ink">
                  « {t.quote} »
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-5 text-sm">
                  <span className="block font-semibold text-ink">{t.author}</span>
                  <span className="text-muted-foreground">
                    {t.role}
                    {t.company ? `, ${t.company}` : ""}
                  </span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function LatestPosts() {
  return (
    <section className="section-y bg-ivory" aria-labelledby="posts-title">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle
            id="posts-title"
            eyebrow="Conseils & actualités"
            title="Le journal"
            align="start"
            className="mb-0 md:mb-0"
          />
          <Reveal>
            <Link
              to="/blog"
              className="link-gold inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold-ink"
            >
              Voir tous les articles <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        <RevealGroup className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <RevealItem key={p.slug}>
              <ArticleCard post={p} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Faq() {
  return (
    <section className="section-y bg-sand" aria-labelledby="faq-title">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionTitle
          id="faq-title"
          eyebrow="Questions fréquentes"
          title="Vos questions, nos réponses"
          lead="Vous ne trouvez pas votre réponse ? Notre équipe vous répond directement."
          align="start"
          className="lg:sticky lg:top-32 lg:self-start"
        />
        <Reveal>
          <FAQAccordion items={homeFaq} />
          <Link
            to="/contact"
            className="link-gold mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold-ink"
          >
            Poser une question <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
