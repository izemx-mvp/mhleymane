import { createFileRoute } from "@tanstack/react-router";
import {
  Building2,
  CalendarDays,
  FileText,
  Gem,
  Handshake,
  Landmark,
  Leaf,
  MapPin,
  ShieldCheck,
  EyeOff,
  UserRound,
} from "lucide-react";
import { site, fullAddress, directorName, isPlaceholder } from "@/config/site";
import { seo, breadcrumbLd } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { PageHero } from "@/components/site/PageHero";
import { CTABanner } from "@/components/site/blocks";
import { DiamondRule, Sparkle } from "@/components/site/motifs";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { GoldWord, SectionEyebrow, SectionTitle } from "@/components/site/Section";
import { SmartImage } from "@/components/site/SmartImage";

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "À propos", path: "/a-propos" },
];

export const Route = createFileRoute("/a-propos")({
  head: () =>
    seo({
      title: "À propos – Société de nettoyage fondée à Villepreux en 2021 | MHLEYMANE",
      description: `MHLEYMANE SAS, société de nettoyage créée en ${site.foundedLabel} à Villepreux (Yvelines) et présidée par ${site.director.civility} ${directorName}. Nos valeurs et nos engagements.`,
      path: "/a-propos",
      image: "/images/a-propos-equipe.webp",
      jsonLd: [breadcrumbLd(crumbs)],
    }),
  component: About,
});

const values = [
  {
    icon: Gem,
    title: "Exigence",
    text: "Le souci du détail à chaque passage, jusque dans les zones que l'on ne regarde pas.",
  },
  {
    icon: Handshake,
    title: "Fiabilité",
    text: "Être présents au bon moment, tenir le planning convenu, prévenir en cas d'imprévu.",
  },
  {
    icon: EyeOff,
    title: "Discrétion",
    text: "Intervenir sans perturber votre activité, dans le respect de la confidentialité des lieux.",
  },
  {
    icon: Leaf,
    title: "Respect des lieux",
    text: "Des méthodes et des produits choisis pour préserver vos surfaces, vos équipements et vos occupants.",
  },
];

// CONTENU EXEMPLE À REMPLACER — engagements à préciser (aucune certification ni label n'est mentionné tant qu'il n'est pas confirmé)
const commitments = [
  {
    icon: Gem,
    title: "Qualité",
    text: "Un cahier des charges détaillé, des points de contrôle réguliers et une interlocutrice pour ajuster la prestation.",
    note: "Modalités de contrôle qualité : à préciser.",
  },
  {
    icon: ShieldCheck,
    title: "Sécurité",
    text: "Respect des consignes de chaque site, équipements de protection adaptés et attention portée aux circulations.",
    note: "Formations et attestations : à préciser.",
  },
  {
    icon: Leaf,
    title: "Produits",
    text: "Des produits adaptés à chaque surface, utilisés au bon dosage pour un résultat durable.",
    note: "Gamme de produits utilisée : à préciser.",
  },
];

function About() {
  const identity = [
    { icon: Building2, label: "Raison sociale", value: site.legalName },
    { icon: Landmark, label: "Forme juridique", value: "Société par actions simplifiée (SAS)" },
    { icon: MapPin, label: "Siège social", value: fullAddress },
    { icon: CalendarDays, label: "Création", value: site.foundedLabel.replace(/^a/, "A") },
    { icon: UserRound, label: "Présidente", value: `${site.director.civility} ${directorName}` },
    { icon: FileText, label: "SIRET", value: site.legal.siret },
  ];

  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="À propos"
        title="Une société de nettoyage fondée sur l'exigence"
        lead={`Créée en ${site.foundedLabel} à ${site.address.city}, MHLEYMANE accompagne les professionnels dans l'entretien de leurs locaux.`}
      />

      {/* Histoire */}
      <section className="section-y bg-ivory" aria-labelledby="histoire-title">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <div
              className="absolute -bottom-4 -left-4 right-4 top-4 rounded-[24px] border border-gold/40"
              aria-hidden="true"
            />
            <SmartImage
              src="/images/a-propos-equipe.webp"
              alt="Locaux professionnels lumineux et soigneusement entretenus"
              width={1600}
              height={1067}
              sizes="(min-width: 1024px) 600px, 100vw"
              className="img-zoom aspect-[3/2] rounded-[22px] shadow-lift"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <SectionEyebrow align="start">Notre histoire</SectionEyebrow>
            <h2 id="histoire-title" className="mt-6">
              Née à <GoldWord>Villepreux</GoldWord>
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/75">
              <p>
                <strong className="font-semibold text-ink">{site.legalName}</strong> est une société
                par actions simplifiée créée en {site.foundedLabel}. Son siège est situé au{" "}
                {site.address.street}, à {site.address.city}, dans les {site.address.department}.
                Elle est présidée par {site.director.civility} {directorName}.
              </p>
              <p>
                Son activité : le nettoyage courant des bâtiments et le nettoyage industriel, pour
                les bureaux, les locaux commerciaux, les magasins, les restaurants et les sites
                industriels.
              </p>
              {/* CONTENU EXEMPLE À REMPLACER */}
              <p>
                Notre conviction : un lieu bien entretenu est un lieu où l'on travaille mieux et où
                l'on accueille avec fierté. C'est cette idée qui guide chaque intervention, de la
                première visite au suivi quotidien.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Valeurs */}
      <section className="section-y bg-sand" aria-labelledby="valeurs-title">
        <div className="container-x">
          <SectionTitle id="valeurs-title" eyebrow="Nos valeurs" title="Ce qui nous guide" />
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <RevealItem key={v.title}>
                <div className="card-luxe card-hover group h-full p-8">
                  <Sparkle className="absolute right-6 top-6 h-4 w-4 text-gold opacity-40 transition duration-500 group-hover:rotate-45 group-hover:opacity-100" />
                  <v.icon className="h-8 w-8 text-gold-ink" strokeWidth={1.3} aria-hidden="true" />
                  <h3 className="mt-6 text-xl uppercase tracking-[0.06em]">{v.title}</h3>
                  <span
                    className="mt-4 block h-px w-8 bg-gold transition-all duration-500 group-hover:w-14"
                    aria-hidden="true"
                  />
                  <p className="mt-4 leading-relaxed text-muted-foreground">{v.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Mot de la présidente */}
      <section
        className="section-y relative isolate overflow-hidden bg-ink text-ivory"
        aria-labelledby="mot-title"
      >
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(50% 70% at 50% 0%, rgb(201 161 59 / 0.14), transparent 70%)",
          }}
          aria-hidden="true"
        />
        <Reveal className="container-x max-w-4xl text-center">
          <SectionEyebrow tone="dark">Le mot de la présidente</SectionEyebrow>
          <h2 id="mot-title" className="sr-only">
            Le mot de la présidente
          </h2>
          <figure className="mt-10">
            {/* CONTENU EXEMPLE À REMPLACER */}
            <blockquote className="tagline text-[clamp(1.6rem,1.2rem+1.6vw,2.6rem)] leading-snug text-ivory/90">
              « J'ai fondé MHLEYMANE avec une conviction simple : la propreté est une marque de
              respect, envers les lieux comme envers ceux qui les font vivre. Chaque jour, nous
              mettons notre exigence au service de la vôtre. »
            </blockquote>
            <DiamondRule className="my-8" />
            <figcaption>
              <span className="block font-display text-lg tracking-[0.12em] text-gold">
                {directorName}
              </span>
              <span className="mt-1 block text-sm uppercase tracking-[0.2em] text-ivory/60">
                {site.director.title}
              </span>
            </figcaption>
          </figure>
          <p className="mt-8 text-xs text-ivory/40">
            Texte d'exemple, à remplacer par les mots de la présidente.
          </p>
        </Reveal>
      </section>

      {/* Engagements */}
      <section className="section-y bg-ivory" aria-labelledby="engagements-title">
        <div className="container-x grid items-start gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          <div>
            <SectionTitle
              id="engagements-title"
              eyebrow="Nos engagements"
              title="Qualité, sécurité, produits"
              lead="Trois engagements concrets, précisés avec vous dans chaque cahier des charges."
              align="start"
            />
            <RevealGroup as="ul" className="space-y-5">
              {commitments.map((c) => (
                <RevealItem as="li" key={c.title} className="card-luxe card-hover flex gap-6 p-7">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/50">
                    <c.icon
                      className="h-5 w-5 text-gold-ink"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <h3 className="text-lg">{c.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{c.text}</p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-stone">
                      {c.note}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <Reveal className="relative lg:sticky lg:top-28">
            <SmartImage
              src="/images/a-propos-materiel.webp"
              alt="Matériel et produits d'entretien professionnels soigneusement rangés"
              width={1200}
              height={1500}
              sizes="(min-width: 1024px) 480px, 100vw"
              className="img-zoom aspect-[4/5] rounded-[22px] border border-line shadow-lift"
            >
              <div className="img-overlay pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent" />
            </SmartImage>
          </Reveal>
        </div>
      </section>

      {/* Carte d'identité */}
      <section className="pb-8 pt-4 md:pb-12" aria-labelledby="identite-title">
        <div className="container-x">
          <Reveal className="relative overflow-hidden rounded-[24px] bg-sand p-8 md:p-14">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="eyebrow">Identité</p>
                <h2 id="identite-title" className="mt-4 text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)]">
                  Carte d'identité
                </h2>
              </div>
              <DiamondRule align="start" width="lg" />
            </div>
            <dl className="mt-10 grid gap-px overflow-hidden rounded-[18px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {identity.map((it) => (
                <div key={it.label} className="flex gap-4 bg-ivory p-6">
                  <it.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-ink"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      {it.label}
                    </dt>
                    <dd
                      className={cn(
                        "mt-1.5 font-semibold",
                        isPlaceholder(it.value) ? "text-stone" : "text-ink",
                      )}
                    >
                      {it.value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
