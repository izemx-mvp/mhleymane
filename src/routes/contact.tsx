import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { site, fullAddress } from "@/config/site";
import { seo, breadcrumbLd } from "@/lib/seo";
import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";
import { LeafletMap } from "@/components/site/LeafletMap";
import { PhoneLink } from "@/components/site/blocks";
import { DiamondRule } from "@/components/site/motifs";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/Section";
import { SmartImage } from "@/components/site/SmartImage";

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Contact", path: "/contact" },
];

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "Contact – Société de nettoyage à Villepreux (78) | MHLEYMANE",
      description: `Contactez MHLEYMANE, société de nettoyage au ${fullAddress}. Une question, un projet ? Écrivez-nous ou appelez-nous.`,
      path: "/contact",
      jsonLd: [breadcrumbLd(crumbs)],
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Contact"
        title="Parlons de vos locaux"
        lead="Une question, une demande particulière ? Écrivez-nous : nous vous répondons rapidement."
      />

      <section className="bg-ivory py-14 md:py-24" aria-label="Formulaire et coordonnées">
        <div className="container-x grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          <Reveal className="card-luxe p-6 sm:p-10 md:p-12">
            <h2 className="text-[clamp(1.5rem,1.2rem+1vw,2rem)]">Écrivez-nous</h2>
            <p className="mt-3 text-muted-foreground">
              Pour une demande chiffrée, préférez notre{" "}
              <Link to="/devis" className="link-gold font-semibold text-gold-ink">
                formulaire de devis
              </Link>
              .
            </p>
            <DiamondRule align="start" className="mb-10 mt-6" />
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6">
            <SmartImage
              src="/images/devis-visuel.webp"
              alt="Bureau élégant et parfaitement entretenu, baigné de lumière"
              width={1200}
              height={1500}
              sizes="(min-width: 1024px) 480px, 100vw"
              className="img-zoom hidden aspect-[16/10] rounded-[22px] border border-line lg:block"
            >
              <div className="img-overlay pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 to-transparent" />
            </SmartImage>
            <div className="rounded-[22px] bg-ink p-8 text-ivory md:p-10">
              <p className="eyebrow eyebrow-light">Coordonnées</p>
              <DiamondRule align="start" width="sm" className="mt-4" />
              <address className="mt-8 space-y-6 not-italic">
                <ContactLine icon={<MapPin className="h-4 w-4" />} label="Adresse">
                  {site.legalName}
                  <br />
                  {site.address.street}
                  <br />
                  {site.address.zip} {site.address.city}
                </ContactLine>
                <ContactLine icon={<Phone className="h-4 w-4" />} label="Téléphone">
                  <PhoneLink className="link-gold" />
                </ContactLine>
                <ContactLine icon={<Mail className="h-4 w-4" />} label="E-mail">
                  <a href={`mailto:${site.email}`} className="link-gold break-all">
                    {site.email}
                  </a>
                </ContactLine>
                <ContactLine icon={<Clock className="h-4 w-4" />} label="Horaires">
                  {site.hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days} : {h.time}
                    </span>
                  ))}
                </ContactLine>
              </address>
              <Link to="/devis" className="btn btn-light mt-10 w-full">
                Demander un devis
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory pb-16 md:pb-24" aria-labelledby="plan-title">
        <div className="container-x">
          <Reveal className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-end">
            <div>
              <p className="eyebrow">Nous trouver</p>
              <h2 id="plan-title" className="mt-4 text-[clamp(1.5rem,1.2rem+1vw,2.25rem)]">
                Notre siège à {site.address.city}
              </h2>
              <p className="mt-4 text-muted-foreground">{fullAddress}</p>
              <a
                href={`https://www.openstreetmap.org/?mlat=${site.geo.lat}&mlon=${site.geo.lng}#map=16/${site.geo.lat}/${site.geo.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-gold mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-ink"
              >
                Ouvrir dans OpenStreetMap <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <LeafletMap className="h-[340px] md:h-[440px]" />
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-sand" aria-labelledby="zone-title">
        <div className="container-x">
          <SectionTitle
            id="zone-title"
            eyebrow="Zone d'intervention"
            title="Où intervenons-nous ?"
            lead={`${site.zone.summary}. Votre site n'apparaît pas dans la liste ? Contactez-nous : nous étudions chaque demande.`}
          />
          <RevealGroup as="ul" className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
            {site.zone.areas.map((a) => (
              <RevealItem
                as="li"
                key={a}
                className="inline-flex items-center gap-3 rounded-full border border-line bg-ivory px-5 py-3 text-[0.95rem] font-medium text-ink"
              >
                <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden="true" />
                {a}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}

function ContactLine({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span
        className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/40 text-gold"
        aria-hidden="true"
      >
        {icon}
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ivory/50">{label}</p>
        <p className="mt-1 text-ivory/90">{children}</p>
      </div>
    </div>
  );
}
