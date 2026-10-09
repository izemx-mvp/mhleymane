import {
  Building2,
  Store,
  UtensilsCrossed,
  Factory,
  Building,
  HardHat,
  PanelsTopLeft,
  type LucideIcon,
} from "lucide-react";
import type { SectorSlug } from "./sectors";

/**
 * Services MHLEYMANE.
 * Structure prête à être déplacée vers une base de données / un CMS.
 */

export type FrequencyKey = "quotidien" | "hebdomadaire" | "mensuel" | "ponctuel";

export type FAQItem = { question: string; answer: string };

export type Service = {
  slug: string;
  title: string;
  /** Libellé court (menus, puces) */
  shortTitle: string;
  icon: LucideIcon;
  /** Description en deux lignes (cartes) */
  short: string;
  /** Une ligne (méga-menu) */
  menuLine: string;
  /** Introduction du hero de la page détail */
  intro: string;
  /** Description longue (paragraphes) */
  description: string[];
  included: string[];
  audience: SectorSlug[];
  frequencies: FrequencyKey[];
  faq: FAQItem[];
  image: { src: string; alt: string };
  /** Service dont le périmètre reste à confirmer par la direction */
  toConfirm?: boolean;
  enabled: boolean;
};

// CONTENU EXEMPLE À REMPLACER — descriptions et listes à valider par MHLEYMANE
const allServices: Service[] = [
  {
    slug: "nettoyage-bureaux",
    title: "Nettoyage de bureaux",
    shortTitle: "Bureaux",
    icon: Building2,
    short:
      "Postes de travail, salles de réunion, sanitaires et espaces de pause entretenus avec méthode et discrétion.",
    menuLine: "Espaces de travail, salles de réunion, sanitaires",
    intro:
      "Des bureaux soignés pour vos équipes comme pour vos visiteurs, avec des passages planifiés selon vos horaires d'activité.",
    description: [
      "Un espace de travail propre contribue au confort de vos collaborateurs et à l'image que vous donnez à vos visiteurs. Nous construisons avec vous un plan d'entretien qui couvre chaque zone : accueil, open spaces, bureaux individuels, salles de réunion, espaces de pause et sanitaires.",
      "Les interventions sont organisées selon vos contraintes : avant l'arrivée des équipes, en soirée ou pendant les heures d'activité, avec la discrétion qu'exige un environnement professionnel.",
    ],
    included: [
      "Dépoussiérage des postes de travail et du mobilier",
      "Aspiration et lavage des sols selon leur nature",
      "Nettoyage et désinfection des sanitaires",
      "Entretien des espaces de pause et kitchenettes",
      "Vidage des corbeilles et gestion du tri",
      "Nettoyage des points de contact (poignées, interrupteurs)",
      "Entretien des vitres intérieures accessibles",
      "Réapprovisionnement des consommables sanitaires (à définir)",
    ],
    audience: ["bureaux", "coproprietes"],
    frequencies: ["quotidien", "hebdomadaire", "mensuel", "ponctuel"],
    faq: [
      {
        question: "Pouvez-vous intervenir en dehors de nos heures de bureau ?",
        answer:
          "Oui, les passages sont planifiés selon vos contraintes : tôt le matin, en soirée ou à d'autres créneaux à convenir ensemble lors de la visite.",
      },
      {
        question: "Comment définissez-vous la fréquence de passage ?",
        answer:
          "Elle dépend de la surface, du nombre de personnes présentes et de l'usage des locaux. Nous vous proposons une fréquence adaptée après la visite, que vous pouvez ajuster ensuite.",
      },
      {
        question: "Faut-il être présent lors des interventions ?",
        answer:
          "Non, sauf si vous le souhaitez. Les modalités d'accès (badge, clés, alarme) sont définies ensemble avant le démarrage de la prestation.",
      },
    ],
    image: {
      src: "/images/service-bureaux.webp",
      alt: "Agent d'entretien nettoyant une paroi vitrée dans des bureaux haut de gamme",
    },
    enabled: true,
  },
  {
    slug: "nettoyage-commerces",
    title: "Nettoyage de locaux commerciaux & magasins",
    shortTitle: "Commerces & magasins",
    icon: Store,
    short:
      "Vitrines, surfaces de vente, cabines et réserves : un espace impeccable pour accueillir vos clients.",
    menuLine: "Vitrines, surfaces de vente, réserves",
    intro:
      "Dans un commerce, la propreté fait partie de l'expérience client. Nos passages s'adaptent à vos heures d'ouverture.",
    description: [
      "Vos clients jugent votre enseigne dès la vitrine. Sols, présentoirs, cabines d'essayage, caisses et sanitaires : nous entretenons chaque zone de votre surface de vente pour qu'elle reste accueillante du matin au soir.",
      "Les interventions ont lieu avant l'ouverture, après la fermeture ou selon un planning convenu, sans gêner votre activité ni vos équipes de vente.",
    ],
    included: [
      "Nettoyage des vitrines et devantures",
      "Entretien des sols de la surface de vente",
      "Dépoussiérage des rayonnages et présentoirs",
      "Nettoyage des cabines d'essayage et miroirs",
      "Entretien des zones de caisse et points de contact",
      "Nettoyage des réserves et zones de stockage",
      "Nettoyage et désinfection des sanitaires",
    ],
    audience: ["commerces", "coproprietes"],
    frequencies: ["quotidien", "hebdomadaire", "mensuel", "ponctuel"],
    faq: [
      {
        question: "Intervenez-vous avant l'ouverture du magasin ?",
        answer:
          "C'est l'un des créneaux les plus demandés. Les horaires précis sont définis avec vous en fonction de votre activité et des possibilités d'accès.",
      },
      {
        question: "Nettoyez-vous les vitrines extérieures ?",
        answer:
          "Les vitrines accessibles depuis le sol peuvent être intégrées à la prestation. Les surfaces en hauteur nécessitent une étude spécifique lors de la visite.",
      },
      {
        question: "Pouvez-vous intervenir pour une réouverture ou un événement ?",
        answer:
          "Oui, une intervention ponctuelle peut être organisée avant une réouverture, un changement de collection ou un événement en magasin.",
      },
    ],
    image: {
      src: "/images/service-commerces.webp",
      alt: "Agent d'entretien lavant le sol en marbre d'une boutique élégante",
    },
    enabled: true,
  },
  {
    slug: "nettoyage-restaurants",
    title: "Nettoyage de restaurants",
    shortTitle: "Restaurants",
    icon: UtensilsCrossed,
    short:
      "Salles, cuisines et sanitaires entretenus avec la rigueur qu'impose l'hygiène en restauration.",
    menuLine: "Salles, cuisines, sanitaires, hygiène",
    intro:
      "En restauration, l'hygiène ne se négocie pas. Nous intervenons en salle comme en cuisine, après le service ou aux heures creuses.",
    description: [
      "Un restaurant impose des exigences d'hygiène élevées et des horaires décalés. Nous intervenons en complément de vos équipes, après le service ou en dehors des heures d'ouverture, pour prendre en charge l'entretien de la salle, des sanitaires et des zones de cuisine définies ensemble.",
      "Produits et méthodes sont choisis selon les surfaces : inox, carrelages, sols antidérapants, mobilier de salle. Le plan de nettoyage distingue clairement chaque zone pour éviter les oublis.",
    ],
    included: [
      "Nettoyage et désinfection de la salle et du mobilier",
      "Dégraissage des surfaces et sols de cuisine",
      "Entretien des sols antidérapants",
      "Nettoyage des sanitaires clients et personnel",
      "Entretien des zones de plonge",
      "Nettoyage des vitres et de l'entrée",
      "Nettoyage approfondi périodique (à définir)",
    ],
    audience: ["restaurants"],
    frequencies: ["quotidien", "hebdomadaire", "mensuel", "ponctuel"],
    faq: [
      {
        question: "Pouvez-vous intervenir après le service du soir ?",
        answer:
          "Oui, les interventions peuvent être planifiées après la fermeture ou aux heures creuses. Les créneaux sont fixés ensemble selon vos services.",
      },
      {
        question: "Intervenez-vous dans les cuisines ?",
        answer:
          "Oui, sur le périmètre défini avec vous (sols, surfaces, plonge…). Le nettoyage spécifique de certains équipements, comme les hottes et conduits d'extraction, fait l'objet d'une étude au cas par cas.",
      },
      {
        question: "Le nettoyage remplace-t-il notre plan de maîtrise sanitaire ?",
        answer:
          "Non. Notre prestation s'intègre à votre organisation et complète le travail de vos équipes, mais votre plan de maîtrise sanitaire reste sous votre responsabilité.",
      },
    ],
    image: {
      src: "/images/service-restaurants.webp",
      alt: "Agent d'entretien en salle d'un restaurant raffiné, tables dressées",
    },
    enabled: true,
  },
  {
    slug: "nettoyage-industriel",
    title: "Nettoyage industriel",
    shortTitle: "Industriel",
    icon: Factory,
    short:
      "Entrepôts, ateliers, quais et vestiaires : un entretien organisé autour de vos contraintes de production.",
    menuLine: "Entrepôts, ateliers, quais, vestiaires",
    intro:
      "Les sites industriels demandent une organisation précise. Nous construisons un plan d'intervention compatible avec votre activité et vos règles de sécurité.",
    description: [
      "Ateliers, entrepôts, quais de chargement, vestiaires et bureaux attenants : chaque zone d'un site industriel a ses contraintes. Nous étudions avec vous les accès, les horaires de production et les consignes de sécurité avant de proposer un plan d'intervention.",
      "Les équipes interviennent dans le respect de votre protocole de sécurité et des circulations du site, avec des méthodes adaptées aux grandes surfaces et aux sols industriels.",
    ],
    included: [
      "Nettoyage des sols industriels et allées de circulation",
      "Entretien des ateliers et zones de production définies",
      "Nettoyage des entrepôts et quais de chargement",
      "Entretien des vestiaires, sanitaires et réfectoires",
      "Nettoyage des bureaux attenants",
      "Évacuation des déchets courants",
    ],
    audience: ["industrie"],
    frequencies: ["quotidien", "hebdomadaire", "mensuel", "ponctuel"],
    faq: [
      {
        question: "Pouvez-vous intervenir pendant les arrêts de production ?",
        answer:
          "Oui, c'est souvent le moment le plus adapté pour les nettoyages approfondis. Le planning est construit avec vos responsables de site.",
      },
      {
        question: "Respectez-vous notre protocole de sécurité ?",
        answer:
          "Oui. Les consignes de votre site (EPI, circulations, zones interdites, plan de prévention le cas échéant) sont étudiées avant le démarrage et appliquées par les intervenants.",
      },
      {
        question: "Le matériel est-il adapté aux grandes surfaces ?",
        answer:
          "Les moyens mis en œuvre sont définis lors de la visite selon la surface, la nature des sols et le type de salissures. Ils sont précisés dans le devis.",
      },
    ],
    image: {
      src: "/images/service-industriel.webp",
      alt: "Autolaveuse nettoyant le sol d'un vaste entrepôt lumineux",
    },
    enabled: true,
  },
  {
    slug: "entretien-batiments",
    title: "Nettoyage courant des bâtiments & parties communes",
    shortTitle: "Bâtiments & parties communes",
    icon: Building,
    short:
      "Halls, escaliers, ascenseurs et circulations : des parties communes accueillantes au quotidien.",
    menuLine: "Halls, escaliers, ascenseurs, circulations",
    intro:
      "Pour les gestionnaires, syndics et copropriétés : un entretien régulier des espaces partagés, suivi avec rigueur.",
    description: [
      "Les parties communes sont la première image d'un immeuble. Halls d'entrée, escaliers, paliers, ascenseurs, locaux poubelles et abords : nous assurons leur entretien selon un planning défini avec le gestionnaire.",
      "Un interlocuteur unique suit la prestation et reste joignable pour toute demande ponctuelle ou ajustement du cahier des charges.",
    ],
    included: [
      "Nettoyage des halls d'entrée et boîtes aux lettres",
      "Entretien des escaliers, paliers et couloirs",
      "Nettoyage des ascenseurs",
      "Nettoyage des vitres et portes des parties communes",
      "Sortie et rentrée des conteneurs (à définir)",
      "Entretien des locaux poubelles",
      "Nettoyage des parkings et caves (périodique)",
    ],
    audience: ["coproprietes", "bureaux"],
    frequencies: ["quotidien", "hebdomadaire", "mensuel", "ponctuel"],
    faq: [
      {
        question: "Travaillez-vous avec les syndics de copropriété ?",
        answer:
          "Oui, la prestation peut être contractualisée avec le syndic ou le gestionnaire de l'immeuble, selon un cahier des charges précis.",
      },
      {
        question: "Comment signaler un besoin ponctuel ?",
        answer:
          "Votre interlocuteur reste joignable par téléphone ou par e-mail pour toute demande ponctuelle : dégât, événement, état des lieux.",
      },
      {
        question: "La sortie des poubelles peut-elle être incluse ?",
        answer:
          "Oui, cette tâche peut être intégrée au contrat selon les jours de collecte de votre commune.",
      },
    ],
    image: {
      src: "/images/service-batiments.webp",
      alt: "Agent nettoyant l'escalier d'un hall d'immeuble élégant",
    },
    enabled: true,
  },
  {
    slug: "remise-en-etat",
    title: "Remise en état & nettoyage fin de chantier",
    shortTitle: "Remise en état",
    icon: HardHat,
    short:
      "Après travaux, avant un état des lieux ou une ouverture : des locaux rendus prêts à l'usage.",
    menuLine: "Fin de chantier, état des lieux, réouverture",
    intro:
      "Fin de chantier, déménagement, réouverture : une intervention ponctuelle et complète pour livrer des locaux impeccables.",
    description: [
      "Après des travaux, les poussières fines et les résidus se déposent partout. Nous intervenons pour une remise en état complète : dépoussiérage en hauteur, sols, menuiseries, vitres, sanitaires et finitions, afin que vos locaux soient prêts à être utilisés ou livrés.",
      "Le périmètre exact de cette prestation est défini sur devis, après visite des locaux.",
    ],
    included: [
      "Évacuation des résidus et poussières de chantier",
      "Lavage des sols adapté à leur nature",
      "Nettoyage complet des menuiseries, portes et plinthes",
      "Nettoyage des vitres et encadrements",
      "Nettoyage des sanitaires et points d'eau",
      "Dépoussiérage en hauteur accessible",
      "Finitions avant livraison ou état des lieux",
    ],
    audience: ["bureaux", "commerces", "restaurants", "coproprietes"],
    frequencies: ["ponctuel"],
    faq: [
      {
        question: "Quand faut-il prévoir la remise en état après des travaux ?",
        answer:
          "Idéalement une fois les corps de métier partis et les réseaux opérationnels (eau, électricité), quelques jours avant la livraison ou l'état des lieux.",
      },
      {
        question: "Le devis est-il établi après visite ?",
        answer:
          "Oui, une visite permet d'évaluer l'état des locaux, la surface et les finitions attendues avant de vous adresser une proposition.",
      },
      {
        question: "Évacuez-vous les gravats ?",
        answer:
          "L'évacuation des gros gravats relève en général des entreprises de travaux. Les modalités sont précisées au cas par cas lors du devis.",
      },
    ],
    image: {
      src: "/images/service-remise-en-etat.webp",
      alt: "Pièce rénovée baignée de lumière, parquet et menuiseries impeccables",
    },
    toConfirm: true,
    enabled: true,
  },
  {
    slug: "nettoyage-vitres",
    title: "Nettoyage de vitres",
    shortTitle: "Vitres",
    icon: PanelsTopLeft,
    short: "Vitrages intérieurs et extérieurs accessibles, encadrements et miroirs.",
    menuLine: "Vitrages, encadrements, miroirs",
    intro: "Des vitrages nets pour laisser entrer toute la lumière.",
    description: ["Service désactivé par défaut — à confirmer par MHLEYMANE."],
    included: ["Vitrages intérieurs", "Vitrages extérieurs accessibles", "Encadrements et rebords"],
    audience: ["bureaux", "commerces"],
    frequencies: ["mensuel", "ponctuel"],
    faq: [],
    image: { src: "/images/service-vitres.webp", alt: "Façade vitrée parfaitement transparente" },
    toConfirm: true,
    enabled: false,
  },
];

export const services = allServices.filter((s) => s.enabled);
export const serviceSlugs = services.map((s) => s.slug);
export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const frequencyInfo: Record<FrequencyKey, { label: string; text: string }> = {
  quotidien: {
    label: "Quotidien",
    text: "Un passage chaque jour ouvré pour les locaux à forte fréquentation.",
  },
  hebdomadaire: {
    label: "Hebdomadaire",
    text: "Un ou plusieurs passages par semaine, à jours fixes.",
  },
  mensuel: {
    label: "Mensuel",
    text: "Un entretien approfondi périodique, en complément ou seul.",
  },
  ponctuel: {
    label: "Ponctuel",
    text: "Une intervention unique : travaux, événement, état des lieux.",
  },
};
