import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/config/site";
import { serviceSlugs } from "@/data/services";
import { seo, breadcrumbLd } from "@/lib/seo";
import { PageHero } from "@/components/site/PageHero";
import { QuoteForm } from "@/components/site/QuoteForm";
import { Reveal } from "@/components/site/Reveal";
import { SidePanel } from "@/components/site/SidePanel";

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Demander un devis", path: "/devis" },
];

export const Route = createFileRoute("/devis")({
  validateSearch: (s: Record<string, unknown>): { service?: string | undefined } => {
    const v = s["service"];
    return typeof v === "string" && serviceSlugs.includes(v) ? { service: v } : {};
  },
  head: () =>
    seo({
      title: "Demander un devis de nettoyage gratuit | MHLEYMANE",
      description:
        "Décrivez vos locaux en 3 étapes et recevez une proposition de nettoyage sur mesure pour vos bureaux, commerce, restaurant ou site industriel. Devis gratuit.",
      path: "/devis",
      image: "/images/devis-visuel.webp",
      jsonLd: [breadcrumbLd(crumbs)],
    }),
  component: DevisPage,
});

function DevisPage() {
  const { service } = Route.useSearch();
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Devis gratuit"
        title="Demander un devis"
        lead="Trois étapes pour nous décrire votre besoin. Nous revenons vers vous avec une proposition sur mesure."
      />
      <section className="bg-ivory py-14 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16 xl:grid-cols-[1fr_420px]">
          <Reveal className="card-luxe p-6 sm:p-10 md:p-12">
            <QuoteForm initialService={service} />
          </Reveal>
          <SidePanel />
        </div>
      </section>
    </>
  );
}
