import { Building2, Store, UtensilsCrossed, Factory, Building, Sparkles, type LucideIcon } from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  icon: LucideIcon;
  included: string[];
  frequencies: string[];
};

export const services: Service[] = [
  {
    slug: "nettoyage-de-bureaux",
    title: "Nettoyage de bureaux",
    short: "Des espaces de travail sains et soignés, pour vos équipes comme pour vos visiteurs.",
    intro: "Un bureau propre est un bureau où l'on travaille mieux. Nous intervenons en dehors de vos heures d'activité ou en présence de vos équipes, avec discrétion et méthode.",
    icon: Building2,
    included: ["Dépoussiérage des postes de travail et du mobilier", "Aspiration et lavage des sols", "Nettoyage et désinfection des sanitaires", "Entretien des espaces de pause et cuisines", "Vidage des corbeilles et tri des déchets", "Nettoyage des vitres intérieures accessibles"],
    frequencies: ["Quotidienne", "Plusieurs fois par semaine", "Hebdomadaire", "Sur mesure"],
  },
  {
    slug: "commerces-et-magasins",
    title: "Commerces & magasins",
    short: "Une vitrine impeccable et un espace de vente accueillant pour vos clients.",
    intro: "Dans un commerce, la propreté fait partie de l'expérience client. Nous adaptons nos passages à vos horaires d'ouverture pour ne jamais gêner votre activité.",
    icon: Store,
    included: ["Nettoyage des vitrines et devantures", "Entretien des sols de la surface de vente", "Dépoussiérage des rayonnages et présentoirs", "Nettoyage des cabines et espaces d'essayage", "Entretien des réserves et zones de stockage", "Nettoyage des sanitaires"],
    frequencies: ["Avant ouverture", "Après fermeture", "Hebdomadaire", "Sur mesure"],
  },
  {
    slug: "restaurants",
    title: "Restaurants",
    short: "Salles, cuisines et sanitaires entretenus avec la rigueur qu'exige la restauration.",
    intro: "La restauration impose des exigences d'hygiène élevées. Nous intervenons en salle comme en cuisine, avec des produits adaptés et un protocole précis.",
    icon: UtensilsCrossed,
    included: ["Nettoyage et désinfection de la salle", "Dégraissage des surfaces de cuisine", "Entretien des sols antidérapants", "Nettoyage des sanitaires clients et personnel", "Entretien des zones de plonge", "Nettoyage des vitres et terrasses"],
    frequencies: ["Après service", "Quotidienne", "Nettoyage approfondi périodique", "Sur mesure"],
  },
  {
    slug: "nettoyage-industriel",
    title: "Nettoyage industriel",
    short: "Entrepôts, ateliers et sites de production : un entretien adapté aux grands volumes.",
    intro: "Les sites industriels demandent des moyens et une organisation spécifiques. Nous construisons avec vous un plan d'intervention respectueux de vos contraintes de production.",
    icon: Factory,
    included: ["Nettoyage des sols industriels", "Entretien des zones de production et ateliers", "Nettoyage des entrepôts et quais", "Entretien des vestiaires et sanitaires", "Nettoyage des bureaux attenants", "Évacuation des déchets courants"],
    frequencies: ["Quotidienne", "Hebdomadaire", "Mensuelle", "Selon planning de production"],
  },
  {
    slug: "entretien-de-batiments",
    title: "Entretien de bâtiments & parties communes",
    short: "Halls, escaliers, ascenseurs : des parties communes toujours accueillantes.",
    intro: "Pour les syndics, gestionnaires et copropriétés, nous assurons l'entretien régulier des espaces partagés afin que chaque résident et visiteur soit bien accueilli.",
    icon: Building,
    included: ["Nettoyage des halls d'entrée", "Entretien des escaliers et paliers", "Nettoyage des ascenseurs", "Nettoyage des vitres des parties communes", "Sortie et entretien des conteneurs", "Entretien des parkings et caves"],
    frequencies: ["Plusieurs fois par semaine", "Hebdomadaire", "Bimensuelle", "Sur mesure"],
  },
  {
    slug: "remise-en-etat",
    title: "Remise en état",
    short: "Après travaux, déménagement ou sinistre : vos locaux rendus prêts à l'usage.",
    intro: "Fin de chantier, état des lieux, réouverture : nous intervenons ponctuellement pour remettre vos locaux en état, du sol au plafond.",
    icon: Sparkles,
    included: ["Évacuation des résidus et poussières de chantier", "Décapage et lavage des sols", "Nettoyage complet des menuiseries et vitres", "Nettoyage des sanitaires et points d'eau", "Dépoussiérage en hauteur", "Finitions avant livraison"],
    frequencies: ["Intervention ponctuelle", "Avant état des lieux", "Fin de chantier", "Sur devis"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
