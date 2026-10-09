import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { site } from "@/config/site";
import { organizationLd } from "@/lib/seo";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { CookieConsent } from "@/components/site/CookieConsent";
import { DiamondRule, Droplet } from "@/components/site/motifs";
import { EASE_LUXE } from "@/components/site/Reveal";
import { Toaster } from "@/components/ui/sonner";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&family=Cormorant+Garamond:ital,wght@1,400;1,500&family=Manrope:wght@400;500;600&display=swap";

/** Loader : une seule fois par session (le script s'exécute avant le rendu) */
const LOADER_SCRIPT = `try{var k="mhl-loaded";if(sessionStorage.getItem(k)||matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("no-loader")}else{sessionStorage.setItem(k,"1")}}catch(e){document.documentElement.classList.add("no-loader")}`;

function NotFoundComponent() {
  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-ivory px-5 pb-20 pt-[calc(var(--header-h)+3rem)]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(50% 50% at 50% 30%, rgb(201 161 59 / 0.1), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-xl text-center">
        <div className="mx-auto h-24 w-16 animate-float-slow text-gold">
          <Droplet className="h-full w-full" strokeWidth={1} />
        </div>
        <p className="eyebrow mt-8">Erreur 404</p>
        <h1 className="mt-5 text-[clamp(1.75rem,1.2rem+2.4vw,3rem)]">Cette page est introuvable</h1>
        <DiamondRule className="my-7" />
        <p className="tagline text-xl text-muted-foreground">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className="btn btn-primary">
            Retour à l'accueil
          </Link>
          <Link to="/services" className="btn btn-secondary">
            Nos services
          </Link>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Besoin d'aide ?{" "}
          <Link to="/contact" className="link-gold font-semibold text-gold-ink">
            Contactez-nous
          </Link>
        </p>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl">Cette page n'a pas pu se charger</h1>
        <p className="mt-4 text-muted-foreground">
          Une erreur est survenue. Vous pouvez réessayer ou revenir à l'accueil.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn btn-primary"
          >
            Réessayer
          </button>
          <a href="/" className="btn btn-secondary">
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#111110" },
      { name: "format-detection", content: "telephone=no" },
      { title: `${site.name} – Société de nettoyage à Villepreux (78)` },
      {
        name: "description",
        content:
          "MHLEYMANE, société de nettoyage professionnel à Villepreux (Yvelines) : bureaux, commerces, restaurants et sites industriels.",
      },
      { property: "og:site_name", content: site.name },
      { property: "og:locale", content: "fr_FR" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: FONTS },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "preload", as: "image", href: "/logo-mark.webp", type: "image/webp" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(organizationLd()) }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LOADER_SCRIPT }} />
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        <div className="site-loader" aria-hidden="true">
          <Droplet filled className="site-loader__drop" />
          <div className="site-loader__rule">
            <span />
            <span />
            <span />
          </div>
        </div>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/** Fondu + léger glissement entre les pages, avec une fine ligne dorée en haut */
function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reduce = useReducedMotion();
  const first = useRef(true);
  useEffect(() => {
    first.current = false;
  }, []);
  const animateEntry = !first.current && !reduce;

  return (
    <>
      {animateEntry && (
        <motion.div
          key={`bar-${pathname}`}
          aria-hidden="true"
          className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left"
          style={{ background: "var(--gradient-gold-line)" }}
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: [1, 1, 0] }}
          transition={{
            duration: 0.7,
            ease: EASE_LUXE,
            opacity: { times: [0, 0.7, 1], duration: 0.8 },
          }}
        />
      )}
      <motion.div
        key={pathname}
        initial={animateEntry ? { opacity: 0, y: 12 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: EASE_LUXE }}
      >
        {children}
      </motion.div>
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#contenu"
        className="sr-only z-[80] rounded-full bg-ink px-5 py-3 text-sm font-semibold text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Aller au contenu
      </a>
      <Header />
      <main id="contenu" tabIndex={-1} className="outline-none">
        <RouteTransition>
          <Outlet />
        </RouteTransition>
      </main>
      <Footer />
      <FloatingActions />
      <CookieConsent />
      <Toaster position="bottom-center" />
    </QueryClientProvider>
  );
}
