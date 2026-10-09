import { createFileRoute, Link } from "@tanstack/react-router";
import { site, fullAddress, directorName } from "@/config/site";
import { seo, breadcrumbLd } from "@/lib/seo";
import { LegalPage, LegalSection, LegalTable } from "@/components/site/LegalPage";
import { PhoneLink } from "@/components/site/blocks";

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Mentions légales", path: "/mentions-legales" },
];

export const Route = createFileRoute("/mentions-legales")({
  head: () =>
    seo({
      title: "Mentions légales | MHLEYMANE",
      description:
        "Mentions légales du site de MHLEYMANE SAS, société de nettoyage à Villepreux (78).",
      path: "/mentions-legales",
      jsonLd: [breadcrumbLd(crumbs)],
    }),
  component: MentionsLegales,
});

function MentionsLegales() {
  return (
    <LegalPage title="Mentions légales" crumbs={crumbs} updated="9 octobre 2026">
      <LegalSection title="Éditeur du site">
        <LegalTable
          rows={[
            { label: "Raison sociale", value: site.legalName },
            { label: "Forme juridique", value: "Société par actions simplifiée (SAS)" },
            { label: "Capital social", value: site.legal.capital },
            { label: "Siège social", value: fullAddress },
            { label: "RCS", value: site.legal.rcs },
            { label: "SIRET", value: site.legal.siret },
            { label: "TVA intracommunautaire", value: site.legal.vat },
            { label: "Code NAF / APE", value: site.legal.naf },
            { label: "Téléphone", value: <PhoneLink /> },
            { label: "E-mail", value: <a href={`mailto:${site.email}`}>{site.email}</a> },
          ]}
        />
      </LegalSection>

      <LegalSection title="Directrice de la publication">
        <p>
          {site.director.civility} {directorName}, en qualité de {site.director.title.toLowerCase()}{" "}
          de {site.legalName}.
        </p>
      </LegalSection>

      <LegalSection title="Hébergement">
        <LegalTable
          rows={[
            { label: "Hébergeur", value: site.legal.host.name },
            { label: "Adresse", value: site.legal.host.address },
            { label: "Contact", value: site.legal.host.contact },
          ]}
        />
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          L'ensemble des éléments de ce site (textes, logo, visuels, mise en page) est la propriété
          de {site.legalName}, sauf mention contraire. Toute reproduction, représentation ou
          adaptation, totale ou partielle, sans autorisation écrite préalable est interdite.
        </p>
      </LegalSection>

      <LegalSection title="Données personnelles">
        <p>
          Les informations recueillies via les formulaires du site sont traitées conformément au
          Règlement général sur la protection des données (RGPD). Pour en savoir plus, consultez
          notre <Link to="/politique-de-confidentialite">politique de confidentialité</Link>.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          Pour connaître les cookies utilisés et gérer vos préférences, consultez notre{" "}
          <Link to="/cookies">politique de gestion des cookies</Link>.
        </p>
      </LegalSection>

      <LegalSection title="Responsabilité">
        <p>
          {site.legalName} s'efforce de fournir des informations exactes et à jour. Elle ne saurait
          toutefois être tenue responsable des erreurs, omissions ou d'une indisponibilité du site.
          Les liens vers des sites tiers n'engagent pas sa responsabilité.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
