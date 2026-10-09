import { Link } from "@tanstack/react-router";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUp, ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { site } from "@/config/site";
import { services } from "@/data/services";
import { openCookieManager } from "./CookieConsent";
import { PhoneLink } from "./PhoneLink";
import { DiamondRule } from "./motifs";

const GOLD = "rgb(201 161 59";

const company = [
  { to: "/a-propos", label: "À propos" },
  { to: "/secteurs", label: "Secteurs" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
  { to: "/devis", label: "Demander un devis" },
] as const;

function FooterHeading({ children }: { children: string }) {
  return (
    <h2 className="mb-6 flex items-center gap-3 font-display text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-gold">
      <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden="true" />
      {children}
    </h2>
  );
}

/** Lien de colonne : un trait doré apparaît au survol */
function FooterLink({ children }: { children: ReactNode }) {
  return (
    <span className="group/fl inline-flex items-center gap-0 transition-[gap] duration-300 hover:gap-2.5">
      <span
        className="h-px w-0 bg-gold transition-[width] duration-300 group-hover/fl:w-3"
        aria-hidden="true"
      />
      <span className="transition-colors duration-300 group-hover/fl:text-ivory">{children}</span>
    </span>
  );
}

/** Tuile de contact (bandeau du haut) */
function ContactTile({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <span className="group/tile relative flex h-full items-center gap-5 rounded-[22px] border border-ivory/10 bg-ivory/[0.03] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:bg-ivory/[0.05]">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ivory/15 text-gold transition-colors duration-500 group-hover/tile:border-gold">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block font-display text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-gold">
          {label}
        </span>
        <span className="mt-1.5 block break-words text-[1.02rem] font-semibold text-ivory">
          {children}
        </span>
      </span>
      <ArrowUpRight
        className="absolute right-5 top-5 h-4 w-4 text-ivory/30 transition-all duration-300 group-hover/tile:-translate-y-0.5 group-hover/tile:translate-x-0.5 group-hover/tile:text-gold"
        aria-hidden="true"
      />
    </span>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const reduce = useReducedMotion();

  const backToTop = () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });

  return (
    <footer className="relative overflow-hidden bg-ink text-ivory/70">
      {/* Halo doré + fine ligne de séparation */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(45% 55% at 12% 0%, ${GOLD} / 0.12), transparent 70%), radial-gradient(40% 45% at 100% 100%, ${GOLD} / 0.08), transparent 70%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${GOLD} / 0.7), transparent)`,
        }}
        aria-hidden="true"
      />

      <div className="container-x relative pt-16 md:pt-20">
        {/* Bandeau contact */}
        <ul className="grid gap-4 md:grid-cols-3">
          <li>
            <PhoneLink className="block h-full rounded-[22px]">
              <ContactTile icon={<Phone className="h-5 w-5" aria-hidden="true" />} label="Appelez-nous">
                {site.phone}
              </ContactTile>
            </PhoneLink>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="block h-full rounded-[22px]">
              <ContactTile icon={<Mail className="h-5 w-5" aria-hidden="true" />} label="Écrivez-nous">
                {site.email}
              </ContactTile>
            </a>
          </li>
          <li>
            <Link to="/contact" className="block h-full rounded-[22px]">
              <ContactTile icon={<MapPin className="h-5 w-5" aria-hidden="true" />} label="Notre siège">
                {site.address.zip} {site.address.city}
              </ContactTile>
            </Link>
          </li>
        </ul>

        {/* Colonnes */}
        <div className="mt-16 grid gap-14 md:grid-cols-2 lg:mt-20 lg:grid-cols-[1.4fr_1fr_0.9fr_1.2fr] lg:gap-10">
          <div className="max-w-sm">
            <Link to="/" aria-label="MHLEYMANE — accueil" className="inline-block">
              <picture>
                <source srcSet="/logo.webp" type="image/webp" />
                <img
                  src="/logo.png"
                  alt="MHLEYMANE, société de nettoyage"
                  width={593}
                  height={453}
                  loading="lazy"
                  className="h-auto w-40 transition-transform duration-500 hover:scale-[1.03]"
                />
              </picture>
            </Link>
            <p className="tagline mt-6 text-2xl leading-snug text-ivory/90">« {site.baseline} »</p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed">
              Nettoyage de bureaux, commerces, restaurants et sites industriels, avec un niveau
              d'exigence constant.
            </p>
            <Link to="/devis" className="btn btn-light group/cta mt-8 min-h-11 gap-2 text-[0.72rem]">
              Demander un devis
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>

          <nav aria-label="Services">
            <FooterHeading>Services</FooterHeading>
            <ul className="space-y-3.5 text-[0.9375rem]">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to="/services/$slug" params={{ slug: s.slug }}>
                    <FooterLink>{s.shortTitle}</FooterLink>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Entreprise">
            <FooterHeading>Entreprise</FooterHeading>
            <ul className="space-y-3.5 text-[0.9375rem]">
              {company.map((c) => (
                <li key={c.to}>
                  <Link to={c.to}>
                    <FooterLink>{c.label}</FooterLink>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-10">
            <div>
              <FooterHeading>Horaires</FooterHeading>
              <ul className="space-y-2.5 text-[0.9375rem]">
                {site.hours.map((h) => (
                  <li key={h.days} className="flex gap-3">
                    <Clock className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    <span>
                      <span className="text-ivory/90">{h.days}</span>
                      <span className="block text-ivory/60">{h.time}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <FooterHeading>Zone d'intervention</FooterHeading>
              <ul className="flex flex-wrap gap-2">
                {site.zone.areas.map((a) => (
                  <li
                    key={a}
                    className="rounded-full border border-ivory/15 px-3.5 py-1.5 text-[0.8125rem] text-ivory/80"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Adresse complète */}
        <address className="mt-14 flex items-start gap-3 text-[0.875rem] not-italic text-ivory/55">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
          {site.legalName} — {site.address.street}, {site.address.zip} {site.address.city}
        </address>

        <DiamondRule className="mb-8 mt-8" width="lg" />

        {/* Barre légale */}
        <div className="flex flex-col items-center gap-5 pb-8 text-center text-[0.8125rem] text-ivory/55 md:flex-row md:justify-between md:text-left">
          <p>
            © {year} {site.legalName}. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <li>
              <Link to="/mentions-legales" className="link-gold hover:text-ivory">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link to="/politique-de-confidentialite" className="link-gold hover:text-ivory">
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <button type="button" onClick={openCookieManager} className="link-gold hover:text-ivory">
                Gestion des cookies
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={backToTop}
                aria-label="Revenir en haut de la page"
                className="group/top grid h-10 w-10 place-items-center rounded-full border border-ivory/20 text-ivory/80 transition-colors hover:border-gold hover:text-gold"
              >
                <ArrowUp
                  className="h-4 w-4 transition-transform duration-300 group-hover/top:-translate-y-0.5"
                  aria-hidden="true"
                />
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Grand nom en filigrane */}
      <p
        aria-hidden="true"
        className="pointer-events-none relative -mb-[0.18em] select-none overflow-hidden whitespace-nowrap text-center font-display font-semibold uppercase leading-none tracking-[0.06em] text-transparent"
        style={{
          fontSize: "clamp(2.75rem, 11.5vw, 9.5rem)",
          WebkitTextStroke: `1px ${GOLD} / 0.22)`,
        }}
      >
        MHLEYMANE
      </p>
    </footer>
  );
}