import { createFileRoute } from "@tanstack/react-router";
import { Gem, Eye, Handshake, Leaf } from "lucide-react";
import { seo } from "@/lib/seo";
import { site } from "@/config/site";
import { PageHero, Reveal, SectionTitle, CtaBand, Divider } from "@/components/site/ui";

export const Route = createFileRoute("/a-propos")({
  head: () => seo("À propos – MHLEYMANE, société de nettoyage à Villepreux", "Fondée en avril 2021 à Villepreux et dirigée par Mme Mariam Sow, MHLEYMANE accompagne les professionnels dans l'entretien de leurs locaux.", "/a-propos"),
  component: About,
});

const values = [
  { icon: Gem, t: "Exigence", d: "Le souci du détail dans chaque geste." },
  { icon: Eye, t: "Transparence", d: "Des engagements clairs et un dialogue ouvert." },
  { icon: Handshake, t: "Fiabilité", d: "Être présents, ponctuels et constants." },
  { icon: Leaf, t: "Respect", d: "De vos locaux, de vos équipes et de l'environnement." },
];

function About() {
  return (
    <>
      <PageHero eyebrow="Notre histoire" title="À propos de MHLEYMANE" tagline="Une entreprise yvelinoise, fondée sur l'exigence et la confiance." />
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-lg leading-relaxed">
          <Reveal>
            <p>MHLEYMANE est une société de nettoyage constituée en {site.legalForm}, créée en {site.founded} et implantée au {site.address.street}, à {site.address.city} ({site.address.region}).</p>
            <p className="mt-6">Dirigée par {site.director}, l'entreprise accompagne les professionnels dans l'entretien de leurs bureaux, locaux commerciaux, magasins, restaurants et sites industriels.</p>
          </Reveal>
        </div>
      </section>
      <section className="bg-sand py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionTitle eyebrow="Nos valeurs" title="Ce qui nous guide" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.08}>
                <div className="card-lift h-full rounded-lg border bg-card p-8 text-center">
                  <v.icon className="mx-auto h-8 w-8 text-gold-deep" strokeWidth={1.3} />
                  <h3 className="mt-5 text-base">{v.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24">
        <Reveal className="mx-auto max-w-3xl px-6 text-center">
          <p className="eyebrow mb-4">Le mot de la dirigeante</p>
          <blockquote className="tagline text-2xl leading-relaxed sm:text-3xl">
            « Chez MHLEYMANE, nous considérons que la propreté d'un lieu de travail est une marque de respect envers ceux qui l'occupent. Notre ambition est simple : offrir à chaque client un service soigné, fiable et à l'écoute, comme nous le ferions pour nos propres locaux. »
          </blockquote>
          <Divider className="my-8" />
          <p className="font-display text-sm uppercase tracking-widest">{site.director}</p>
          <p className="text-sm text-muted-foreground">Présidente</p>
        </Reveal>
      </section>
      <CtaBand />
    </>
  );
}
