import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { site } from "@/config/site";
import { services } from "@/data/services";
import { openCookieManager } from "./CookieConsent";
import { PhoneLink } from "./PhoneLink";
import { DiamondRule } from "./motifs";

const company = [
  { to: "/a-propos", label: "À propos" },
  { to: "/secteurs", label: "Secteurs" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
  { to: "/devis", label: "Demander un devis" },
] as const;

function FooterHeading({ children }: { children: string }) {
  return (
    <h2 className="mb-6 font-display text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-gold">
      {children}
    </h2>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-ink text-ivory/75">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(50% 60% at 15% 0%, rgb(201 161 59 / 0.1), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="container-x relative pb-10 pt-20 md:pt-24">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr_1fr_1.2fr_1fr] lg:gap-10">
          <div>
            <Link to="/" aria-label="MHLEYMANE — accueil" className="inline-block">
              <picture>
                <source srcSet="/logo.webp" type="image/webp" />
                <img
                  src="/logo.png"
                  alt="MHLEYMANE, société de nettoyage"
                  width={593}
                  height={453}
                  loading="lazy"
                  className="h-auto w-44"
                />
              </picture>
            </Link>
            <p className="tagline mt-6 text-2xl text-ivory/85">« {site.baseline} »</p>
          </div>

          <nav aria-label="Services">
            <FooterHeading>Services</FooterHeading>
            <ul className="space-y-3 text-[0.9375rem]">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="link-gold hover:text-ivory"
                  >
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Entreprise">
            <FooterHeading>Entreprise</FooterHeading>
            <ul className="space-y-3 text-[0.9375rem]">
              {company.map((c) => (
                <li key={c.to}>
                  <Link to={c.to} className="link-gold hover:text-ivory">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <FooterHeading>Coordonnées</FooterHeading>
            <address className="space-y-4 text-[0.9375rem] not-italic">
              <p className="flex gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.zip} {site.address.city}
                </span>
              </p>
              <p className="flex gap-3">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <PhoneLink className="link-gold hover:text-ivory" />
              </p>
              <p className="flex gap-3">
                <Mail className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <a href={`mailto:${site.email}`} className="link-gold break-all hover:text-ivory">
                  {site.email}
                </a>
              </p>
              <div className="flex gap-3">
                <Clock className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <ul>
                  {site.hours.map((h) => (
                    <li key={h.days}>
                      {h.days} : {h.time}
                    </li>
                  ))}
                </ul>
              </div>
            </address>
          </div>

          <div>
            <FooterHeading>Zone d'intervention</FooterHeading>
            <ul className="space-y-3 text-[0.9375rem]">
              {site.zone.areas.map((a) => (
                <li key={a} className="flex gap-3">
                  <span
                    className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold"
                    aria-hidden="true"
                  />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <DiamondRule className="mb-8 mt-16" width="lg" />

        <div className="flex flex-col items-center gap-4 text-center text-[0.8125rem] text-ivory/60 md:flex-row md:justify-between md:text-left">
          <p>
            © {year} {site.legalName}. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
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
              <button
                type="button"
                onClick={openCookieManager}
                className="link-gold hover:text-ivory"
              >
                Gestion des cookies
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
