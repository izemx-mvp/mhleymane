import { createFileRoute, Link } from "@tanstack/react-router";
import { site, fullAddress, directorName } from "@/config/site";
import { seo, breadcrumbLd } from "@/lib/seo";
import { LegalPage, LegalSection, LegalTable } from "@/components/site/LegalPage";

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Politique de confidentialité", path: "/politique-de-confidentialite" },
];

export const Route = createFileRoute("/politique-de-confidentialite")({
  head: () =>
    seo({
      title: "Politique de confidentialité | MHLEYMANE",
      description:
        "Comment MHLEYMANE collecte, utilise et protège les données personnelles transmises via les formulaires du site, et comment exercer vos droits.",
      path: "/politique-de-confidentialite",
      jsonLd: [breadcrumbLd(crumbs)],
    }),
  component: Privacy,
});

// Modèle conforme RGPD à faire valider (durées de conservation, sous-traitants).
function Privacy() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      lead="La protection de vos données personnelles est une priorité. Cette page explique quelles données nous collectons, pourquoi, et quels sont vos droits."
      crumbs={crumbs}
      updated="9 octobre 2026"
    >
      <LegalSection title="Responsable du traitement">
        <p>
          {site.legalName}, {fullAddress}, représentée par {site.director.civility} {directorName},{" "}
          {site.director.title.toLowerCase()}. Contact :{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </LegalSection>

      <LegalSection title="Données collectées">
        <p>Nous collectons uniquement les données que vous nous transmettez via :</p>
        <ul>
          <li>
            le <strong>formulaire de demande de devis</strong> : services souhaités, type de locaux,
            surface, fréquence, adresse du site, date souhaitée, commentaires, société, nom, prénom,
            fonction, e-mail, téléphone ;
          </li>
          <li>
            le <strong>formulaire de contact</strong> : nom, e-mail, téléphone (facultatif), sujet,
            message.
          </li>
        </ul>
        <p>
          Aucune donnée sensible n'est demandée. Merci de ne pas en transmettre dans les champs
          libres.
        </p>
      </LegalSection>

      <LegalSection title="Finalités et base légale">
        <ul>
          <li>
            Répondre à votre demande de devis ou de contact et vous recontacter (base légale : votre
            consentement et les mesures précontractuelles prises à votre demande).
          </li>
          <li>
            Établir une proposition commerciale et assurer le suivi de la relation (base légale :
            intérêt légitime / exécution d'un contrat).
          </li>
        </ul>
        <p>
          Vos données ne sont jamais vendues ni utilisées à des fins de prospection par des tiers.
        </p>
      </LegalSection>

      <LegalSection title="Destinataires">
        <p>
          Vos données sont destinées exclusivement aux personnes habilitées de {site.legalName}.
          Elles peuvent transiter par un prestataire technique d'envoi de formulaires ou de
          messagerie, agissant en qualité de sous-traitant.
        </p>
        <LegalTable
          rows={[
            {
              label: "Service d'envoi des formulaires",
              value: site.formEndpoint ? "Prestataire à préciser" : "À CONFIRMER",
            },
            { label: "Hébergeur du site", value: site.legal.host.name },
          ]}
        />
      </LegalSection>

      <LegalSection title="Durée de conservation">
        <LegalTable
          rows={[
            {
              label: "Demandes sans suite",
              value: "3 ans à compter du dernier contact — À CONFIRMER",
            },
            {
              label: "Clients",
              value:
                "Durée de la relation contractuelle, puis durées légales d'archivage — À CONFIRMER",
            },
          ]}
        />
      </LegalSection>

      <LegalSection title="Vos droits">
        <p>
          Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d'un droit
          d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité de
          vos données, ainsi que du droit de retirer votre consentement à tout moment.
        </p>
        <p>
          Pour exercer ces droits, écrivez-nous à <a href={`mailto:${site.email}`}>{site.email}</a>{" "}
          ou par courrier à {site.legalName}, {fullAddress}. Une réponse vous sera apportée dans un
          délai d'un mois.
        </p>
        <p>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une
          réclamation auprès de la CNIL (
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
            www.cnil.fr
          </a>
          ).
        </p>
      </LegalSection>

      <LegalSection title="Sécurité">
        <p>
          Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour
          protéger vos données contre tout accès non autorisé, perte ou altération.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          Voir notre <Link to="/cookies">politique de gestion des cookies</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
