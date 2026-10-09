import { createFileRoute } from "@tanstack/react-router";
import { Settings2 } from "lucide-react";
import { seo, breadcrumbLd } from "@/lib/seo";
import { LegalPage, LegalSection, LegalTable } from "@/components/site/LegalPage";
import { openCookieManager } from "@/components/site/CookieConsent";

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Gestion des cookies", path: "/cookies" },
];

export const Route = createFileRoute("/cookies")({
  head: () =>
    seo({
      title: "Gestion des cookies | MHLEYMANE",
      description:
        "Les cookies utilisés sur le site de MHLEYMANE et comment gérer vos préférences.",
      path: "/cookies",
      jsonLd: [breadcrumbLd(crumbs)],
    }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <LegalPage
      title="Gestion des cookies"
      lead="Nous limitons les traceurs au strict nécessaire. Vous gardez la main sur vos choix à tout moment."
      crumbs={crumbs}
      updated="9 octobre 2026"
    >
      <LegalSection title="Vos préférences">
        <p>Vous pouvez modifier ou retirer votre consentement à tout moment.</p>
        <button type="button" onClick={openCookieManager} className="btn btn-primary mt-2">
          <Settings2 className="h-4 w-4" aria-hidden="true" />
          Gérer mes préférences
        </button>
      </LegalSection>

      <LegalSection title="Qu'est-ce qu'un cookie ?">
        <p>
          Un cookie (ou traceur) est un petit fichier ou une information enregistrée par votre
          navigateur lors de la visite d'un site. Il permet par exemple de mémoriser vos
          préférences.
        </p>
      </LegalSection>

      <LegalSection title="Traceurs utilisés sur ce site">
        <LegalTable
          rows={[
            {
              label: "Consentement (nécessaire)",
              value:
                "Mémorise vos choix en matière de cookies (stockage local du navigateur, 13 mois maximum).",
            },
            {
              label: "Session (nécessaire)",
              value:
                "Évite de rejouer l'animation d'ouverture pendant votre visite (stockage de session, supprimé à la fermeture de l'onglet).",
            },
            {
              label: "Mesure d'audience",
              value:
                "Aucun outil actif à ce jour. Le cas échéant, il ne serait activé qu'avec votre accord.",
            },
          ]}
        />
      </LegalSection>

      <LegalSection title="Services tiers">
        <ul>
          <li>
            <strong>Polices de caractères</strong> : chargées depuis Google Fonts, ce qui implique
            une connexion aux serveurs de Google (transmission de votre adresse IP).
          </li>
          <li>
            <strong>Carte</strong> de la page Contact : tuiles fournies par OpenStreetMap, ce qui
            implique une connexion à leurs serveurs.
          </li>
          <li>
            <strong>Boutons de partage</strong> : simples liens, aucun traceur n'est déposé tant que
            vous ne cliquez pas.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Paramétrer votre navigateur">
        <p>
          Vous pouvez également configurer votre navigateur pour bloquer ou supprimer les cookies.
          Les instructions sont disponibles dans l'aide de votre navigateur.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
