import {
  Building2,
  Store,
  UtensilsCrossed,
  Factory,
  Building,
  type LucideIcon,
} from "lucide-react";

export type SectorSlug = "bureaux" | "commerces" | "restaurants" | "industrie" | "coproprietes";

export type Sector = {
  slug: SectorSlug;
  title: string;
  icon: LucideIcon;
  /** Une phrase (cartes de l'accueil) */
  short: string;
  challenges: string[];
  answers: string[];
  relatedServices: string[];
  image: { src: string; alt: string };
  toConfirm?: boolean;
};

// CONTENU EXEMPLE À REMPLACER — enjeux et réponses à valider par MHLEYMANE
export const sectors: Sector[] = [
  {
    slug: "bureaux",
    title: "Bureaux & sièges",
    icon: Building2,
    short: "Des espaces de travail sains, pour vos équipes et vos visiteurs.",
    challenges: [
      "Intervenir sans perturber l'activité des équipes",
      "Maintenir des sanitaires et espaces de pause irréprochables",
      "Soigner l'accueil, première image de l'entreprise",
    ],
    answers: [
      "Passages planifiés tôt le matin, en soirée ou selon vos créneaux",
      "Plan de nettoyage zone par zone, avec points de contrôle",
      "Une interlocutrice dédiée pour ajuster la prestation",
    ],
    relatedServices: ["nettoyage-bureaux", "entretien-batiments", "remise-en-etat"],
    image: {
      src: "/images/service-bureaux.webp",
      alt: "Bureaux haut de gamme entretenus, parois vitrées impeccables",
    },
  },
  {
    slug: "commerces",
    title: "Commerces & magasins",
    icon: Store,
    short: "Une vitrine impeccable et une surface de vente accueillante.",
    challenges: [
      "Une propreté visible par chaque client, à chaque instant",
      "Des horaires d'ouverture à respecter impérativement",
      "Vitrines, miroirs et sols très exposés aux traces",
    ],
    answers: [
      "Interventions avant l'ouverture ou après la fermeture",
      "Attention particulière aux surfaces vitrées et brillantes",
      "Possibilité d'interventions ponctuelles avant un événement",
    ],
    relatedServices: ["nettoyage-commerces", "remise-en-etat"],
    image: {
      src: "/images/service-commerces.webp",
      alt: "Boutique élégante au sol de marbre parfaitement entretenu",
    },
  },
  {
    slug: "restaurants",
    title: "Restaurants",
    icon: UtensilsCrossed,
    short: "Salle, cuisine et sanitaires à la hauteur de votre table.",
    challenges: [
      "Des exigences d'hygiène élevées en cuisine comme en salle",
      "Des horaires décalés, entre deux services ou après la fermeture",
      "Graisses et salissures spécifiques aux zones de production",
    ],
    answers: [
      "Interventions après le service ou aux heures creuses",
      "Produits et méthodes adaptés aux surfaces de cuisine",
      "Plan de nettoyage distinguant chaque zone",
    ],
    relatedServices: ["nettoyage-restaurants", "remise-en-etat"],
    image: {
      src: "/images/service-restaurants.webp",
      alt: "Salle de restaurant raffinée, tables dressées et sols brillants",
    },
  },
  {
    slug: "industrie",
    title: "Sites industriels",
    icon: Factory,
    short: "Ateliers, entrepôts et quais entretenus selon vos contraintes.",
    challenges: [
      "Grandes surfaces et sols soumis à un usage intensif",
      "Règles de sécurité et circulations à respecter",
      "Interventions à caler sur le planning de production",
    ],
    answers: [
      "Étude préalable des accès, consignes et horaires du site",
      "Méthodes adaptées aux sols et volumes industriels",
      "Planning coordonné avec vos responsables de site",
    ],
    relatedServices: ["nettoyage-industriel", "nettoyage-bureaux"],
    image: {
      src: "/images/service-industriel.webp",
      alt: "Entrepôt lumineux aux sols nets, nettoyé à l'autolaveuse",
    },
  },
  {
    slug: "coproprietes",
    title: "Copropriétés & syndics",
    icon: Building,
    short: "Des parties communes accueillantes pour chaque résident.",
    challenges: [
      "Halls et escaliers très fréquentés",
      "Un suivi régulier attendu par le syndic et les résidents",
      "Des besoins ponctuels à traiter rapidement",
    ],
    answers: [
      "Planning fixe et cahier des charges partagé avec le gestionnaire",
      "Une interlocutrice unique, joignable pour les demandes ponctuelles",
      "Entretien des halls, escaliers, ascenseurs et locaux annexes",
    ],
    relatedServices: ["entretien-batiments", "remise-en-etat"],
    image: {
      src: "/images/service-batiments.webp",
      alt: "Hall d'immeuble élégant et son escalier, parfaitement entretenus",
    },
    toConfirm: true,
  },
];

export const getSector = (slug: string) => sectors.find((s) => s.slug === slug);
