export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Conseils" | "Restauration" | "Contrats" | "Devis";
  date: string;
  readTime: string;
  cover: 0 | 1 | 2 | 3;
  content: { heading?: string; text: string }[];
};

export const posts: Post[] = [
  {
    slug: "conseils-bureaux-propres-au-quotidien",
    title: "Cinq habitudes pour des bureaux propres au quotidien",
    excerpt: "Entre deux passages professionnels, quelques gestes simples suffisent à garder un espace de travail agréable.",
    category: "Conseils",
    date: "2026-09-15",
    readTime: "4 min",
    cover: 0,
    content: [
      { text: "Un nettoyage professionnel régulier pose les bases d'un environnement sain. Mais la propreté d'un bureau se joue aussi au quotidien, à travers quelques habitudes partagées par toute l'équipe." },
      { heading: "Libérer les surfaces", text: "Un poste de travail dégagé en fin de journée permet un dépoussiérage complet et rapide. Rangez documents et objets personnels avant de partir." },
      { heading: "Soigner les espaces partagés", text: "Cuisine, machine à café, salle de réunion : chacun laisse l'espace comme il aimerait le trouver. Un rappel affiché aide souvent." },
      { heading: "Trier ses déchets", text: "Des corbeilles clairement identifiées facilitent le tri et le travail des équipes d'entretien." },
      { heading: "Aérer régulièrement", text: "Quelques minutes d'aération par jour améliorent la qualité de l'air intérieur." },
      { heading: "Signaler les besoins", text: "Une tache, un sanitaire à vérifier : un canal simple pour signaler les besoins permet à votre prestataire d'intervenir au bon endroit." },
    ],
  },
  {
    slug: "hygiene-restaurant-les-essentiels",
    title: "Hygiène en restaurant : les essentiels de l'entretien",
    excerpt: "Salle, cuisine, sanitaires : comment organiser l'entretien d'un établissement de restauration.",
    category: "Restauration",
    date: "2026-08-28",
    readTime: "5 min",
    cover: 1,
    content: [
      { text: "En restauration, la propreté n'est pas seulement une question d'image : elle touche directement à la sécurité alimentaire et au confort de vos clients." },
      { heading: "Distinguer les zones", text: "La cuisine, la salle et les sanitaires n'appellent pas les mêmes produits ni les mêmes fréquences. Un plan de nettoyage par zone évite les oublis." },
      { heading: "Le dégraissage, un poste clé", text: "Les surfaces de cuisine accumulent rapidement les graisses. Un dégraissage régulier facilite l'entretien quotidien et prolonge la durée de vie des équipements." },
      { heading: "Après chaque service", text: "Un nettoyage de fin de service permet de repartir chaque jour sur une base saine." },
      { heading: "Se faire accompagner", text: "Un prestataire spécialisé complète le travail de vos équipes en prenant en charge les nettoyages approfondis." },
    ],
  },
  {
    slug: "nettoyage-ponctuel-ou-contrat",
    title: "Nettoyage ponctuel ou contrat d'entretien : que choisir ?",
    excerpt: "Intervention unique ou prestation régulière : les critères pour faire le bon choix selon vos besoins.",
    category: "Contrats",
    date: "2026-07-10",
    readTime: "4 min",
    cover: 2,
    content: [
      { text: "Selon votre activité et vos locaux, deux formules s'offrent à vous : l'intervention ponctuelle ou le contrat d'entretien régulier." },
      { heading: "L'intervention ponctuelle", text: "Idéale après des travaux, avant un état des lieux, un événement ou une réouverture. Elle répond à un besoin précis, à un moment donné." },
      { heading: "Le contrat d'entretien", text: "Il garantit un niveau de propreté constant, avec des passages planifiés et un cahier des charges défini ensemble." },
      { heading: "Comment choisir", text: "Interrogez-vous sur la fréquentation de vos locaux, la nature de votre activité et le niveau d'exigence attendu. Une visite préalable permet souvent d'y voir clair." },
    ],
  },
  {
    slug: "comment-demander-un-devis-nettoyage",
    title: "Comment bien préparer votre demande de devis",
    excerpt: "Les informations à réunir pour obtenir une proposition de nettoyage adaptée et précise.",
    category: "Devis",
    date: "2026-06-02",
    readTime: "3 min",
    cover: 3,
    content: [
      { text: "Une demande de devis bien préparée permet de recevoir une proposition juste, adaptée à vos locaux et à vos attentes." },
      { heading: "Le type de locaux", text: "Bureaux, commerce, restaurant, site industriel ou parties communes : chaque environnement a ses spécificités." },
      { heading: "La surface", text: "Une estimation de la surface, même approximative, aide à dimensionner l'intervention." },
      { heading: "La fréquence souhaitée", text: "Quotidienne, hebdomadaire ou ponctuelle : précisez le rythme qui vous convient et vos créneaux préférés." },
      { heading: "Vos attentes particulières", text: "Vitres, sols spécifiques, contraintes d'accès : plus votre demande est détaillée, plus la proposition sera précise." },
    ],
  },
];

export const categories = ["Tous", "Conseils", "Restauration", "Contrats", "Devis"] as const;
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
