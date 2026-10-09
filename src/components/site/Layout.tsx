import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { site } from "@/config/site";
import { services } from "@/data/services";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/services", label: "Services" },
  { to: "/a-propos", label: "À propos" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? "glass border-b border-border py-2 shadow-soft" : "py-4"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6">
        <Link to="/" className="shrink-0" onClick={() => setOpen(false)}>
          <img src={logo.url} alt="MHLEYMANE – Société de nettoyage" className={`w-auto transition-all ${scrolled ? "h-12" : "h-16"}`} />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} className="font-display text-xs uppercase tracking-[0.2em] text-foreground/80 transition hover:text-gold-deep" activeProps={{ className: "text-gold-deep" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <Link to="/devis" className="btn-gold hidden rounded-md px-5 py-2.5 text-xs font-semibold uppercase tracking-widest lg:inline-block">Demander un devis</Link>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 px-6 pb-6 pt-4 lg:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="border-b border-border py-3 font-display text-sm uppercase tracking-widest">{n.label}</Link>
          ))}
          <Link to="/devis" onClick={() => setOpen(false)} className="btn-gold mt-4 rounded-md py-3 text-center text-sm font-semibold uppercase tracking-widest">Demander un devis</Link>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div>
          <img src={logo.url} alt="MHLEYMANE" className="h-24 w-auto" />
          <p className="tagline mt-4 text-lg">La propreté professionnelle, avec exigence.</p>
        </div>
        <div>
          <h3 className="mb-4 text-sm text-gold">Navigation</h3>
          <ul className="space-y-2 text-sm">
            {nav.map((n) => <li key={n.to}><Link to={n.to} className="hover:text-gold-light">{n.label}</Link></li>)}
            <li><Link to="/devis" className="hover:text-gold-light">Demander un devis</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm text-gold">Services</h3>
          <ul className="space-y-2 text-sm">
            {services.map((s) => <li key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }} className="hover:text-gold-light">{s.title}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm text-gold">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-gold" />{site.address.street}, {site.address.zip} {site.address.city}</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-gold" /><a href={site.phoneHref}>{site.phone}</a></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 text-gold" /><a href={`mailto:${site.email}`}>{site.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} MHLEYMANE SAS – Tous droits réservés</p>
          <div className="flex gap-6">
            <Link to="/mentions-legales" className="hover:text-gold-light">Mentions légales</Link>
            <Link to="/politique-de-confidentialite" className="hover:text-gold-light">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function FloatingCall() {
  return (
    <a href={site.phoneHref} aria-label="Appeler MHLEYMANE" className="btn-gold fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full shadow-gold lg:hidden">
      <Phone className="h-6 w-6" />
    </a>
  );
}
