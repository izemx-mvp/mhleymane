/**
 * Configuration centrale du site MHLEYMANE.
 *
 * Faits établis (ne pas modifier sans source) : raison sociale, forme SAS,
 * création en avril 2021, siège à Villepreux, présidence Mme Mariam Sow,
 * activité de nettoyage courant des bâtiments et de nettoyage industriel.
 *
 * Toutes les autres valeurs sont des ESPACES RÉSERVÉS à compléter par le client.
 * Une valeur réservée est signalée par `isPlaceholder()` et affichée discrètement.
 */

/** Marqueur des valeurs à compléter. */
export const PLACEHOLDER = "À CONFIRMER";
export const isPlaceholder = (value: string | number | null | undefined): boolean =>
  value === null ||
  value === undefined ||
  value === "" ||
  (typeof value === "string" &&
    (value.includes("XX") || value.toUpperCase().includes(PLACEHOLDER) || value.includes("[")));

export type Stat = {
  /** Valeur numérique : animée (count-up). Valeur texte ou réservée : affichée telle quelle. */
  value: number | string;
  suffix?: string;
  label: string;
};

export const site = {
  name: "MHLEYMANE",
  legalName: "MHLEYMANE SAS",
  tagline: "Société de nettoyage",
  baseline: "La propreté, avec exigence.",
  legalForm: "SAS",
  /** Faits réels */
  foundedYear: 2021,
  foundedLabel: "avril 2021",
  foundingDate: "2021-04",
  director: { civility: "Mme", firstName: "Mariam", lastName: "Sow", title: "Présidente" },

  /** URL de production, sans barre finale — à remplacer par le nom de domaine définitif. */
  url: "https://www.mhleymane.fr", // À CONFIRMER

  address: {
    street: "2 Rue du Docteur Alexandre",
    zip: "78450",
    city: "Villepreux",
    department: "Yvelines",
    region: "Île-de-France",
    country: "FR",
  },
  /** Coordonnées géocodées (OpenStreetMap / Nominatim) — à vérifier. */
  geo: { lat: 48.8346326, lng: 2.012092 },

  /** Téléphone — format affiché et format international pour les liens tel: */
  phone: "01 XX XX XX XX", // À CONFIRMER
  phoneE164: "", // ex. "+33130000000" — À CONFIRMER (vide = lien d'appel désactivé)
  email: "contact@mhleymane.fr", // À CONFIRMER

  /** Horaires d'ouverture du secrétariat (affichage) */
  hours: [
    { days: "Lundi – vendredi", time: "horaires à confirmer" },
    { days: "Samedi", time: "horaires à confirmer" },
  ],
  /** Plages d'intervention possibles — à confirmer avec la direction */
  interventionSlots: "Tôt le matin, en soirée ou le week-end, selon vos contraintes (à confirmer)",

  /** Zone d'intervention */
  zone: {
    summary: "Yvelines (78) et Île-de-France", // À CONFIRMER
    areas: [
      // À CONFIRMER — compléter avec les départements / villes réellement desservis
      "Villepreux et communes voisines",
      "Yvelines (78)",
      "Autres départements d'Île-de-France : à confirmer",
    ],
  },

  /** Délai de réponse annoncé après une demande de devis */
  responseDelay: "24/48 h ouvrées", // À CONFIRMER

  /** Mentions légales */
  legal: {
    siret: "XXX XXX XXX XXXXX", // À CONFIRMER
    rcs: "RCS Versailles XXX XXX XXX", // À CONFIRMER
    capital: "XX XXX €", // À CONFIRMER
    vat: "FR XX XXX XXX XXX", // À CONFIRMER
    naf: "81.21Z — Nettoyage courant des bâtiments", // À CONFIRMER
    insurance: "Assurance responsabilité civile professionnelle — à confirmer", // À CONFIRMER
    host: {
      name: "Hébergeur à confirmer", // À CONFIRMER
      address: "Adresse de l'hébergeur à confirmer", // À CONFIRMER
      contact: "Contact de l'hébergeur à confirmer", // À CONFIRMER
    },
  },

  /**
   * Formulaires : endpoint compatible Formspree (POST JSON).
   * Exemple : "https://formspree.io/f/abcdwxyz".
   * Vide = repli sur un e-mail pré-rempli (mailto:) vers `email`.
   */
  formEndpoint: "",

  social: {
    linkedin: "", // À CONFIRMER
    facebook: "", // À CONFIRMER
    instagram: "", // À CONFIRMER
  },

  whatsapp: {
    enabled: false,
    number: "", // format international sans « + », ex. "33600000000"
  },

  /** Afficher la section témoignages (les témoignages actuels sont des exemples). */
  showTestimonials: false,

  /** Chiffres clés — seules les valeurs vérifiées sont animées. */
  stats: [
    { value: 2021, label: "Année de création" },
    { value: "À CONFIRMER", label: "Sites entretenus" },
    { value: "À CONFIRMER", label: "Collaborateurs" },
    { value: "À CONFIRMER", label: "Communes desservies" },
  ] satisfies Stat[],

  /** Image Open Graph par défaut (1200×630) */
  ogImage: "/images/og-image.webp",
  logo: "/logo.png",
} as const;

export const fullAddress = `${site.address.street}, ${site.address.zip} ${site.address.city}`;
export const directorName = `${site.director.firstName} ${site.director.lastName}`;
export const phoneHref = site.phoneE164 ? `tel:${site.phoneE164}` : undefined;
export const absoluteUrl = (path = "/") => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
