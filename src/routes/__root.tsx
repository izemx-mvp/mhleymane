import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header, Footer, FloatingCall } from "@/components/site/Layout";
import { Divider } from "@/components/site/ui";
import { site } from "@/config/site";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-sand px-4 pt-24">
      <div className="max-w-md text-center">
        <p className="text-gold-gradient font-display text-8xl">404</p>
        <Divider className="my-6" />
        <h1 className="text-xl">Page introuvable</h1>
        <p className="tagline mt-3 text-lg text-muted-foreground">La page que vous cherchez n'existe pas ou a été déplacée.</p>
        <Link to="/" className="btn-gold mt-8 inline-block rounded-md px-6 py-3 text-xs font-semibold uppercase tracking-widest">Retour à l'accueil</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl">Cette page n'a pas pu se charger</h1>
        <p className="mt-2 text-sm text-muted-foreground">Une erreur est survenue. Vous pouvez réessayer ou revenir à l'accueil.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-gold rounded-md px-4 py-2 text-sm">Réessayer</button>
          <a href="/" className="rounded-md border px-4 py-2 text-sm">Accueil</a>
        </div>
      </div>
    </div>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "MHLEYMANE",
  description: "Société de nettoyage professionnel pour bureaux, commerces, restaurants et sites industriels.",
  foundingDate: "2021-04",
  founder: { "@type": "Person", name: "Mariam Sow" },
  address: { "@type": "PostalAddress", streetAddress: site.address.street, postalCode: site.address.zip, addressLocality: site.address.city, addressRegion: site.address.region, addressCountry: "FR" },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MHLEYMANE – Société de nettoyage" },
      { name: "description", content: "MHLEYMANE, société de nettoyage professionnel à Villepreux (Yvelines)." },
      { property: "og:site_name", content: "MHLEYMANE" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@1,400;1,500&family=Manrope:wght@300;400;500;600;700&display=swap" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingCall />
    </QueryClientProvider>
  );
}
