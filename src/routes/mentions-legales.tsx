import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/site/ui";

export const Route = createFileRoute("/mentions-legales")({
  head: () => seo("Mentions légales – MHLEYMANE", "Mentions légales du site de MHLEYMANE SAS, société de nettoyage à Villepreux.", "/mentions-legales"),
  component: () => (
    <>
      <PageHero eyebrow="Informations" title="Mentions légales" />
      <section className="py-20">
        <div className="mx-auto max-w-3xl space-y-8 px-6 leading-relaxed">
          <div><h2 className="mb-3 text-lg">Éditeur du site</h2><p>MHLEYMANE, {site.legalForm}<br />{site.address.street}, {site.address.zip} {site.address.city}<br />SIRET : {site.siret}<br />Téléphone : {site.phone}<br />E-mail : {site.email}</p></div>
          <div><h2 className="mb-3 text-lg">Directrice de la publication</h2><p>{site.director}</p></div>
          <div><h2 className="mb-3 text-lg">Hébergement</h2><p>[Hébergeur à compléter]</p></div>
          <div><h2 className="mb-3 text-lg">Propriété intellectuelle</h2><p>L'ensemble des contenus de ce site (textes, logo, visuels) est la propriété de MHLEYMANE. Toute reproduction sans autorisation préalable est interdite.</p></div>
        </div>
      </section>
    </>
  ),
});
