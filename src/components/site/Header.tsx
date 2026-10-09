import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { services } from "@/data/services";
import { PhoneLink } from "./blocks";
import { DiamondRule } from "./motifs";
import { EASE_LUXE } from "./Reveal";

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/services", label: "Services", mega: true },
  { to: "/secteurs", label: "Secteurs" },
  { to: "/a-propos", label: "À propos" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

/** Logo compact : monogramme + nom */
export function BrandLogo({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span className="shine relative block h-11 w-14 shrink-0 rounded-sm">
        <picture>
          <source srcSet="/logo-mark.webp" type="image/webp" />
          <img
            src="/logo-mark.png"
            alt=""
            width={212}
            height={168}
            className="h-full w-full object-contain"
            fetchPriority="high"
          />
        </picture>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-gold-gradient font-display text-[1.15rem] font-semibold tracking-[0.12em]">
          MHLEYMANE
        </span>
        <span
          className={cn(
            "mt-1.5 font-display text-[0.55rem] font-semibold tracking-[0.32em]",
            tone === "dark" ? "text-gold-ink" : "text-gold",
          )}
        >
          SOCIÉTÉ DE NETTOYAGE
        </span>
      </span>
    </span>
  );
}

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isNotFound = useRouterState({
    select: (s) => s.matches.some((m) => m.status === "notFound"),
  });
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaId = useId();

  // Pages dont le hero est clair : texte sombre quand le header est transparent
  const lightHero = pathname === "/" || pathname.startsWith("/blog/") || isNotFound;
  const solid = scrolled || megaOpen;
  const onDark = !solid && !lightHero;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fermer les menus à chaque changement de page
  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMegaOpen(false);
    const onClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [megaOpen]);

  const openMega = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }, []);
  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 160);
  }, []);

  const linkClass = cn(
    "link-gold whitespace-nowrap py-1 font-display text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-colors",
    onDark ? "text-ivory/85 hover:text-ivory" : "text-ink/80 hover:text-ink",
  );

  return (
    <>
      <header
        ref={megaRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,height] duration-500",
          solid ? "glass shadow-[0_1px_0_0_rgb(201_161_59_/_0.45)]" : "bg-transparent",
        )}
      >
        <div
          className={cn(
            "container-x flex items-center justify-between gap-6 transition-[height] duration-500",
            scrolled ? "h-[68px]" : "h-[var(--header-h)]",
          )}
        >
          <Link to="/" aria-label="MHLEYMANE — accueil" className="shrink-0 rounded-sm">
            <BrandLogo tone={onDark ? "light" : "dark"} />
          </Link>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-5 xl:gap-7">
              {navLinks.map((n) =>
                "mega" in n ? (
                  <li
                    key={n.to}
                    onMouseEnter={openMega}
                    onMouseLeave={scheduleClose}
                    className="relative"
                  >
                    <div className="flex items-center gap-1">
                      <Link
                        to="/services"
                        className={linkClass}
                        activeProps={{ className: onDark ? "!text-gold" : "!text-gold-ink" }}
                      >
                        {n.label}
                      </Link>
                      <button
                        type="button"
                        aria-expanded={megaOpen}
                        aria-controls={megaId}
                        aria-label="Afficher la liste des services"
                        onClick={() => setMegaOpen((o) => !o)}
                        className={cn(
                          "grid h-7 w-7 place-items-center rounded-full",
                          onDark ? "text-ivory/85" : "text-ink/70",
                        )}
                      >
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-300",
                            megaOpen && "rotate-180",
                          )}
                        />
                      </button>
                    </div>
                  </li>
                ) : (
                  <li key={n.to}>
                    <Link
                      to={n.to}
                      activeOptions={{ exact: n.to === "/" }}
                      className={linkClass}
                      activeProps={{ className: onDark ? "!text-gold" : "!text-gold-ink" }}
                    >
                      {n.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <PhoneLink
              className={cn(
                "hidden items-center gap-2 whitespace-nowrap text-sm font-semibold tracking-wide 2xl:inline-flex",
                onDark ? "text-ivory/85 hover:text-gold-light" : "text-ink/80 hover:text-gold-ink",
              )}
            >
              <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
              {site.phone}
            </PhoneLink>
            <Link
              to="/devis"
              className={cn(
                "btn min-h-11 whitespace-nowrap px-5 py-2.5 text-[0.72rem]",
                onDark ? "btn-light" : "btn-primary",
              )}
            >
              Demander un devis
            </Link>
          </div>

          <button
            type="button"
            className={cn(
              "grid h-11 w-11 place-items-center rounded-full border lg:hidden",
              onDark ? "border-ivory/30 text-ivory" : "border-ink/20 text-ink",
            )}
            aria-label="Ouvrir le menu"
            aria-expanded={mobileOpen}
            aria-controls="menu-mobile"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Méga-menu services */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              id={megaId}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE_LUXE }}
              onMouseEnter={openMega}
              onMouseLeave={scheduleClose}
              className="absolute inset-x-0 top-full hidden lg:block"
            >
              <div className="container-x">
                <div className="grid grid-cols-[1fr_280px] overflow-hidden rounded-b-[22px] border border-t-0 border-line bg-ivory shadow-lift">
                  <ul className="grid grid-cols-2 gap-1 p-5">
                    {services.map((s) => {
                      const Icon = s.icon;
                      return (
                        <li key={s.slug}>
                          <Link
                            to="/services/$slug"
                            params={{ slug: s.slug }}
                            className="group flex gap-4 rounded-2xl p-4 transition-colors hover:bg-sand focus-visible:bg-sand"
                          >
                            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-white transition group-hover:border-gold">
                              <Icon
                                className="h-5 w-5 text-gold-ink transition group-hover:scale-110"
                                strokeWidth={1.5}
                                aria-hidden="true"
                              />
                            </span>
                            <span>
                              <span className="block font-semibold text-ink">{s.title}</span>
                              <span className="mt-1 block text-sm text-muted-foreground">
                                {s.menuLine}
                              </span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="flex flex-col justify-between bg-ink p-8 text-ivory">
                    <div>
                      <p className="eyebrow eyebrow-light">Sur mesure</p>
                      <p className="tagline mt-4 text-2xl leading-snug text-ivory/90">
                        Un plan d'entretien pensé pour vos locaux.
                      </p>
                    </div>
                    <div className="mt-8 flex flex-col gap-4">
                      <Link
                        to="/services"
                        className="link-gold inline-flex items-center gap-2 self-start text-sm font-semibold text-gold"
                      >
                        Tous nos services <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <Link to="/devis" className="btn btn-light min-h-11 text-[0.72rem]">
                        Demander un devis
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="glass-ink fixed inset-0 z-[60] flex flex-col overflow-y-auto text-ivory lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container-x flex h-[var(--header-h)] shrink-0 items-center justify-between">
            <Link to="/" onClick={onClose} aria-label="MHLEYMANE — accueil">
              <BrandLogo tone="light" />
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Fermer le menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-ivory/30"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav aria-label="Navigation mobile" className="container-x flex-1 pt-8">
            <motion.ul
              className="flex flex-col"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
              }}
            >
              {navLinks.map((n) => (
                <motion.li
                  key={n.to}
                  variants={{
                    hidden: { opacity: 0, y: reduce ? 0 : 18 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_LUXE } },
                  }}
                  className="border-b border-ivory/10"
                >
                  <Link
                    to={n.to}
                    onClick={onClose}
                    activeOptions={{ exact: n.to === "/" }}
                    activeProps={{ className: "!text-gold" }}
                    className="block py-4 font-display text-[1.75rem] uppercase tracking-[0.08em] text-ivory sm:text-4xl"
                  >
                    {n.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </nav>
          <div className="container-x shrink-0 pb-10 pt-8">
            <DiamondRule align="start" className="mb-6" />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/devis" onClick={onClose} className="btn btn-light flex-1">
                Demander un devis
              </Link>
              <PhoneLink className="btn btn-ghost-light flex-1">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {site.phone}
              </PhoneLink>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
