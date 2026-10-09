import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/site/ui";

export const Route = createFileRoute("/politique-de-confidentialite")({
  head: () => seo("Politique de confidentialité – MHLEYMANE", "Comment MHLEYMANE collecte et protège vos données personnelles, conformément au RGPD.", "/politique-de-confidentialite"),
  component: () => (
    <>
      <PageHero eyebrow="RGPD" title="Politique de confidentialité" />
      <section className="py-20">
        <div className="mx-auto max-w-3xl space-y-8 px-6 leading-relaxed">
          <div><h2 className="mb-3 text-lg">Responsable du traitement</h2><p>MHLEYMANE {site.legalForm}, {site.address.street}, {site.address.zip} {site.address.city}.</p></div>
          <div><h2 className="mb-3 text-lg">Données collectées</h2><p>Via nos formulaires de contact et de devis : nom, entreprise, e-mail, téléphone, ville et informations relatives à votre demande.</p></div>
          <div><h2 className="mb-3 text-lg">Finalité</h2><p>Ces données servent uniquement à répondre à votre demande et à établir une proposition commerciale. Elles ne sont jamais cédées à des tiers.</p></div>
          <div><h2 className="mb-3 text-lg">Durée de conservation</h2><p>Vos données sont conservées le temps nécessaire au traitement de votre demande et de la relation commerciale qui peut en découler.</p></div>
          <div><h2 className="mb-3 text-lg">Vos droits</h2><p>Vous disposez d'un droit d'accès, de rectification, d'effacement et d'opposition. Pour l'exercer, écrivez-nous à {site.email}. Vous pouvez également saisir la CNIL.</p></div>
        </div>
      </section>
    </>
  ),
});
