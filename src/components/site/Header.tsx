import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, Clock, MapPin, Menu, Phone, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { services } from "@/data/services";
import { PhoneLink } from "./PhoneLink";
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

const GOLD = "rgb(201 161 59";

/** Étincelle à 4 branches (motif du logo) */
function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 0c.6 5.6 2.9 9.4 12 12-9.1 2.6-11.4 6.4-12 12-.6-5.6-2.9-9.4-12-12 9.1-2.6 11.4-6.4 12-12Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Logo compact : monogramme + nom */
export function BrandLogo({
  tone = "dark",
  compact = false,
  className,
}: {
  tone?: "dark" | "light";
  compact?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("group/logo flex items-center gap-3", className)}>
      <span
        className={cn(
          "shine relative block shrink-0 rounded-sm transition-[width,height] duration-500",
          compact ? "h-9 w-11" : "h-11 w-14",
        )}
      >
        <picture>
          <source srcSet="/logo-mark.webp" type="image/webp" />
          <img
            src="/logo-mark.png"
            alt=""
            width={212}
            height={168}
            className="h-full w-full object-contain transition-transform duration-500 group-hover/logo:scale-105"
            fetchPriority="high"
          />
        </picture>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-gold-gradient font-display font-semibold tracking-[0.12em] transition-[font-size] duration-500",
            compact ? "text-[1.02rem]" : "text-[1.15rem]",
          )}
        >
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
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaId = useId();

  // Pages dont le hero est clair : texte sombre quand le header est transparent
  const lightHero = pathname === "/" || pathname.startsWith("/blog/") || isNotFound;
  const pill = scrolled; // barre flottante en forme de pilule
  const solid = scrolled || megaOpen;
  const onDark = !solid && !lightHero;

  // Scroll : état "scrolled" + barre de progression dorée (sans re-render par frame)
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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
    closeTimer.current = setTimeout(() => setMegaOpen(false), 180);
  }, []);

  const linkBase = cn(
    "group/nav relative inline-flex flex-col items-center whitespace-nowrap py-1 font-display text-[0.76rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300",
    onDark ? "text-ivory/80 hover:text-ivory" : "text-ink/75 hover:text-ink",
  );
  const activeColor = onDark ? "text-gold" : "text-gold-ink";

  /** Libellé + losange doré (actif = plein, survol = discret) */
  const navLabel = (label: string, isActive: boolean) => (
    <>
      <span className={cn(isActive && activeColor)}>{label}</span>
      <span
        aria-hidden="true"
        className={cn(
          "absolute -bottom-2 h-[5px] w-[5px] rotate-45 transition-all duration-300",
          isActive
            ? "scale-100 opacity-100"
            : "scale-50 opacity-0 group-hover/nav:scale-100 group-hover/nav:opacity-60",
        )}
        style={{ background: `${GOLD})` }}
      />
    </>
  );

  return (
    <>
      <header
        ref={megaRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[padding] duration-500",
          pill ? "pt-3" : "pt-0",
        )}
      >
        <div
          className={cn(
            "mx-auto transition-[max-width,padding] duration-500",
            pill ? "max-w-[1300px] px-3 sm:px-5" : "max-w-full px-0",
          )}
        >
          <div
            className={cn(
              "relative transition-[background-color,box-shadow,border-color,border-radius] duration-500",
              pill
                ? "glass rounded-full border shadow-[0_22px_50px_-28px_rgb(17_17_16_/_0.55)]"
                : solid
                  ? "glass border-b"
                  : "border-b border-transparent bg-transparent",
            )}
            style={solid ? { borderColor: `${GOLD} / 0.35)` } : undefined}
          >
            <div
              className={cn(
                "flex items-center justify-between gap-6 transition-[height,padding] duration-500",
                pill ? "h-[64px] pl-4 pr-2.5 sm:pl-6" : "container-x h-[var(--header-h)]",
              )}
            >
              <Link to="/" className="shrink-0 rounded-sm" aria-label="MHLEYMANE — accueil">
                <BrandLogo tone={onDark ? "light" : "dark"} compact={pill} />
              </Link>

              <nav aria-label="Navigation principale" className="hidden lg:block">
                <ul className="flex items-center gap-5 xl:gap-8">
                  {navLinks.map((n) =>
                    "mega" in n ? (
                      <li
                        key={n.to}
                        onMouseEnter={openMega}
                        onMouseLeave={scheduleClose}
                        className="relative"
                      >
                        <div className="flex items-center gap-0.5">
                          <Link to="/services" className={linkBase}>
                            {({ isActive }) => navLabel(n.label, isActive)}
                          </Link>
                          <button
                            type="button"
                            aria-expanded={megaOpen}
                            aria-controls={megaId}
                            aria-label="Afficher la liste des services"
                            onClick={() => setMegaOpen((o) => !o)}
                            className={cn(
                              "grid h-7 w-7 place-items-center rounded-full transition-colors",
                              onDark ? "text-ivory/80 hover:text-gold" : "text-ink/60 hover:text-gold-ink",
                            )}
                          >
                            <ChevronDown
                              className={cn(
                                "h-3.5 w-3.5 transition-transform duration-300",
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
                          className={linkBase}
                        >
                          {({ isActive }) => navLabel(n.label, isActive)}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </nav>

              <div className="hidden items-center gap-3 lg:flex">
                <PhoneLink
                  className={cn(
                    "group/tel inline-flex items-center gap-2.5 whitespace-nowrap rounded-full py-1.5 pl-1.5 pr-1.5 text-sm font-semibold tracking-wide transition-colors xl:pr-4",
                    onDark ? "text-ivory/85 hover:text-gold-light" : "text-ink/80 hover:text-gold-ink",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-9 w-9 place-items-center rounded-full border transition-colors duration-300",
                      onDark
                        ? "border-ivory/25 group-hover/tel:border-gold"
                        : "border-ink/15 group-hover/tel:border-gold",
                    )}
                  >
                    <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
                  </span>
                  <span className="sr-only xl:not-sr-only">{site.phone}</span>
                </PhoneLink>
                <Link
                  to="/devis"
                  className={cn(
                    "btn group/cta min-h-11 gap-2 whitespace-nowrap px-5 py-2.5 text-[0.72rem]",
                    onDark ? "btn-light" : "btn-primary",
                  )}
                >
                  Demander un devis
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>

              <button
                type="button"
                className={cn(
                  "group/burger grid h-11 w-11 place-items-center rounded-full border transition-colors lg:hidden",
                  onDark
                    ? "border-ivory/30 text-ivory hover:border-gold"
                    : "border-ink/20 text-ink hover:border-gold",
                )}
                aria-label="Ouvrir le menu"
                aria-expanded={mobileOpen}
                aria-controls="menu-mobile"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>

            {/* Progression de lecture (visible une fois la barre flottante) */}
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute bottom-0 h-px overflow-hidden transition-opacity duration-500",
                pill ? "inset-x-10 opacity-100" : "inset-x-0 opacity-0",
              )}
            >
              <span
                ref={progressRef}
                className="block h-full w-full origin-left"
                style={{
                  transform: "scaleX(0)",
                  background: `linear-gradient(90deg, transparent, ${GOLD}) 20%, #F3DE8A 60%, ${GOLD}))`,
                }}
              />
            </span>
          </div>
        </div>

        {/* Méga-menu services */}
        <AnimatePresence>
          {megaOpen && (
            <m.div
              id={megaId}
              initial={{ opacity: 0, y: reduce ? 0 : -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -6 }}
              transition={{ duration: 0.35, ease: EASE_LUXE }}
              onMouseEnter={openMega}
              onMouseLeave={scheduleClose}
              className="absolute inset-x-0 top-full hidden pt-3 lg:block"
            >
              <div className="mx-auto max-w-[1300px] px-5">
                <div className="grid grid-cols-[1fr_320px] overflow-hidden rounded-[26px] border border-line bg-ivory shadow-lift">
                  <div className="p-7">
                    <div className="mb-4 flex items-center justify-between px-3">
                      <p className="eyebrow">Nos services</p>
                      <Link
                        to="/services"
                        className="link-gold inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-ink"
                      >
                        Vue d'ensemble <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                    <m.ul
                      className="grid grid-cols-2 gap-1.5"
                      initial="hidden"
                      animate="show"
                      variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
                      }}
                    >
                      {services.map((s, i) => {
                        const Icon = s.icon;
                        return (
                          <m.li
                            key={s.slug}
                            variants={{
                              hidden: { opacity: 0, y: reduce ? 0 : 8 },
                              show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_LUXE } },
                            }}
                          >
                            <Link
                              to="/services/$slug"
                              params={{ slug: s.slug }}
                              className="group relative flex gap-4 rounded-2xl border border-transparent p-4 transition-all duration-300 hover:border-line hover:bg-white hover:shadow-[0_14px_30px_-22px_rgb(17_17_16_/_0.45)] focus-visible:bg-white"
                            >
                              <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line bg-white transition-colors duration-300 group-hover:border-gold">
                                <Icon
                                  className="h-5 w-5 text-gold-ink transition-transform duration-300 group-hover:scale-110"
                                  strokeWidth={1.5}
                                  aria-hidden="true"
                                />
                                <span className="absolute -right-1 -top-1 font-display text-[0.6rem] font-semibold text-gold-ink opacity-70">
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                              </span>
                              <span className="min-w-0 pr-6">
                                <span className="block font-semibold text-ink">{s.title}</span>
                                <span className="mt-1 block text-sm leading-snug text-muted-foreground">
                                  {s.menuLine}
                                </span>
                              </span>
                              <ArrowUpRight
                                className="absolute right-4 top-4 h-4 w-4 -translate-x-1 translate-y-1 text-gold-ink opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                                aria-hidden="true"
                              />
                            </Link>
                          </m.li>
                        );
                      })}
                    </m.ul>
                  </div>

                  <div className="relative flex flex-col justify-between overflow-hidden bg-ink p-8 text-ivory">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: `radial-gradient(70% 55% at 85% 0%, ${GOLD} / 0.22), transparent 70%)`,
                      }}
                    />
                    <Sparkle className="absolute right-7 top-7 h-5 w-5 text-gold" />
                    <div className="relative">
                      <p className="eyebrow eyebrow-light">Sur mesure</p>
                      <p className="tagline mt-4 text-[1.65rem] leading-snug text-ivory/90">
                        Un plan d'entretien pensé pour vos locaux, vos horaires et vos exigences.
                      </p>
                    </div>
                    <div className="relative mt-8 space-y-5">
                      <DiamondRule align="start" />
                      <PhoneLink className="group/tel flex items-center gap-3 text-sm font-semibold text-ivory/90 hover:text-gold-light">
                        <span className="grid h-9 w-9 place-items-center rounded-full border border-ivory/20 transition-colors group-hover/tel:border-gold">
                          <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
                        </span>
                        {site.phone}
                      </PhoneLink>
                      <Link to="/devis" className="btn btn-light min-h-11 w-full gap-2 text-[0.72rem]">
                        Demander un devis
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
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

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_LUXE } },
  };

  return (
    <AnimatePresence>
      {open && (
        <m.div
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
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0"
            style={{
              background: `radial-gradient(60% 40% at 100% 0%, ${GOLD} / 0.16), transparent 70%), radial-gradient(50% 35% at 0% 100%, ${GOLD} / 0.1), transparent 70%)`,
            }}
          />
          <div className="container-x relative flex h-[var(--header-h)] shrink-0 items-center justify-between">
            <Link to="/" onClick={onClose} aria-label="MHLEYMANE — accueil">
              <BrandLogo tone="light" />
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Fermer le menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-ivory/30 transition-colors hover:border-gold"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Navigation mobile" className="container-x relative flex-1 pt-6">
            <m.ul
              className="flex flex-col"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
              }}
            >
              {navLinks.map((n, i) => (
                <m.li key={n.to} variants={item} className="border-b border-ivory/10">
                  <Link
                    to={n.to}
                    onClick={onClose}
                    activeOptions={{ exact: n.to === "/" }}
                    className="group flex items-center gap-4 py-4"
                  >
                    {({ isActive }) => (
                      <>
                        <span className="w-6 font-display text-xs font-semibold text-gold opacity-80">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "flex-1 font-display text-[1.65rem] uppercase tracking-[0.08em] transition-colors sm:text-4xl",
                            isActive ? "text-gold" : "text-ivory group-hover:text-gold-light",
                          )}
                        >
                          {n.label}
                        </span>
                        <ArrowUpRight
                          className={cn(
                            "h-5 w-5 transition-all duration-300",
                            isActive
                              ? "text-gold"
                              : "text-ivory/40 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold",
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Link>
                </m.li>
              ))}
            </m.ul>

            <m.div variants={item} initial="hidden" animate="show" className="mt-8">
              <p className="eyebrow eyebrow-light mb-4">Nos services</p>
              <ul className="flex flex-wrap gap-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      onClick={onClose}
                      className="inline-flex rounded-full border border-ivory/15 px-3.5 py-2 text-[0.8rem] text-ivory/80 transition-colors hover:border-gold hover:text-ivory"
                    >
                      {s.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </m.div>
          </nav>

          <div className="container-x relative shrink-0 pb-10 pt-10">
            <DiamondRule align="start" className="mb-6" />
            <div className="mb-6 space-y-2.5 text-sm text-ivory/70">
              <p className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                {site.address.street}, {site.address.zip} {site.address.city}
              </p>
              {site.hours[0] && (
                <p className="flex gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  {site.hours[0].days} : {site.hours[0].time}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/devis" onClick={onClose} className="btn btn-light flex-1 gap-2">
                Demander un devis
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <PhoneLink className="btn btn-ghost-light flex-1">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {site.phone}
              </PhoneLink>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}