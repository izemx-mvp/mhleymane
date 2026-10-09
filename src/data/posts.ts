/**
 * Articles du blog MHLEYMANE.
 * Structure pensée pour être remplacée plus tard par un CMS ou une base de données :
 * chaque article est un objet sérialisable, le contenu est une liste de blocs typés.
 */

export type CategorySlug =
  | "conseils-entretien"
  | "hygiene-normes"
  | "entreprise-bureaux"
  | "commerces-restaurants"
  | "industrie"
  | "actualites";

export const categories: { slug: CategorySlug; label: string }[] = [
  { slug: "conseils-entretien", label: "Conseils d'entretien" },
  { slug: "hygiene-normes", label: "Hygiène & normes" },
  { slug: "entreprise-bureaux", label: "Entreprise & bureaux" },
  { slug: "commerces-restaurants", label: "Commerces & restaurants" },
  { slug: "industrie", label: "Industrie" },
  { slug: "actualites", label: "Actualités MHLEYMANE" },
];

export const categoryLabel = (slug: CategorySlug) =>
  categories.find((c) => c.slug === slug)?.label ?? slug;

export type Block =
  | { type: "paragraph"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; title?: string; text: string }
  | { type: "image"; alt: string; caption?: string; src?: string };

/** Variante de couverture abstraite (SVG) utilisée si la photo est absente */
export type CoverVariant = "reflet" | "goutte" | "arches" | "grille" | "ondes" | "eclat";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: CategorySlug;
  tags: string[];
  coverVariant: CoverVariant;
  /** Photo de couverture (1200×630), utilisée aussi comme image Open Graph */
  coverImage?: string;
  coverAlt: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  content: Block[];
  relatedServices: string[];
  seo: { title: string; description: string };
};

const AUTHOR = "L'équipe MHLEYMANE";

// CONTENU EXEMPLE À REMPLACER — articles rédigés à titre d'exemple, à relire et valider.
const rawPosts: Post[] = [
  {
    slug: "bureaux-quelle-frequence-de-nettoyage",
    title: "Bureaux propres : quelle fréquence de nettoyage choisir ?",
    excerpt:
      "Quotidien, plusieurs fois par semaine ou hebdomadaire : les critères concrets pour définir un rythme d'entretien adapté à vos bureaux.",
    category: "entreprise-bureaux",
    tags: ["bureaux", "fréquence", "contrat d'entretien", "organisation"],
    coverVariant: "grille",
    coverImage: "/images/blog-frequence-bureaux.webp",
    coverAlt: "Main gantée nettoyant un bureau dans un espace de travail haut de gamme",
    author: AUTHOR,
    publishedAt: "2026-09-29",
    relatedServices: ["nettoyage-bureaux", "entretien-batiments"],
    seo: {
      title: "Fréquence de nettoyage des bureaux : comment la choisir ?",
      description:
        "Quotidien, hebdomadaire ou sur mesure : les critères pour définir la bonne fréquence de nettoyage de vos bureaux. Conseils de MHLEYMANE.",
    },
    content: [
      {
        type: "paragraph",
        text: "C'est souvent la première question posée lors d'une demande de devis : « À quelle fréquence faut-il nettoyer nos bureaux ? » Il n'existe pas de réponse universelle. Le bon rythme dépend de vos locaux, de leur fréquentation et du niveau de présentation que vous attendez. Voici les critères qui permettent d'y voir clair, et la manière dont un plan d'entretien peut combiner plusieurs fréquences.",
      },
      { type: "h2", text: "Les critères qui déterminent la fréquence" },
      { type: "h3", text: "Le nombre de personnes présentes" },
      {
        type: "paragraph",
        text: "Plus il y a d'allées et venues, plus les sols, les sanitaires et les espaces de pause se salissent vite. Un plateau occupé chaque jour par une équipe nombreuse n'a pas les mêmes besoins qu'un bureau partagé par quelques personnes en télétravail partiel. Le taux d'occupation réel, et non la capacité théorique des locaux, est le premier indicateur à considérer.",
      },
      { type: "h3", text: "L'accueil de visiteurs" },
      {
        type: "paragraph",
        text: "Si vous recevez des clients, des candidats ou des partenaires, l'accueil et les salles de réunion deviennent une vitrine. Ces zones justifient souvent un passage plus fréquent que les bureaux individuels, même lorsque la fréquentation globale reste modérée.",
      },
      { type: "h3", text: "La nature des espaces" },
      {
        type: "paragraph",
        text: "Sanitaires, kitchenettes et points de contact (poignées, interrupteurs, boutons d'ascenseur) demandent une attention régulière. Les zones de circulation et les sols textiles réagissent différemment à l'usage. Un plan de nettoyage efficace distingue ces zones plutôt que d'appliquer le même rythme partout.",
      },
      { type: "h2", text: "Les rythmes les plus courants" },
      {
        type: "list",
        items: [
          "Quotidien : adapté aux locaux très fréquentés ou recevant du public, où sanitaires et espaces partagés doivent rester impeccables chaque jour.",
          "Plusieurs fois par semaine : un compromis fréquent pour les équipes de taille moyenne, avec des passages à jours fixes.",
          "Hebdomadaire : convient aux petites structures ou aux bureaux peu occupés, souvent complété par un entretien courant assuré par l'équipe.",
          "Mensuel ou périodique : pour les tâches approfondies (vitres intérieures, dépoussiérage en hauteur, entretien spécifique des sols).",
        ],
      },
      {
        type: "callout",
        title: "Bon à savoir",
        text: "La fréquence n'est pas figée. Un bon contrat d'entretien prévoit un point régulier pour ajuster le rythme à l'évolution de vos effectifs ou de vos usages.",
      },
      { type: "h2", text: "Combiner plusieurs fréquences dans un même plan" },
      {
        type: "paragraph",
        text: "Dans la pratique, la meilleure solution consiste rarement à choisir un seul rythme. On combine plutôt des tâches quotidiennes sur les zones sensibles (sanitaires, espaces de pause, corbeilles) et des tâches hebdomadaires ou mensuelles sur le reste (dépoussiérage complet, lavage approfondi des sols, vitres). Cette approche concentre l'effort là où il est le plus visible et le plus utile.",
      },
      {
        type: "quote",
        text: "Un plan d'entretien réussi, c'est celui que vos équipes ne remarquent pas : tout est simplement propre, chaque matin.",
      },
      { type: "h2", text: "Le moment de l'intervention compte aussi" },
      {
        type: "paragraph",
        text: "Au-delà de la fréquence, le créneau d'intervention a un impact direct sur le confort de vos équipes. Un passage tôt le matin permet de trouver des bureaux prêts dès l'arrivée. Une intervention en soirée évite toute gêne pendant la journée. Certaines tâches légères peuvent aussi se faire en présence des équipes, avec discrétion. Le choix se fait selon vos horaires et vos contraintes d'accès.",
      },
      { type: "h2", text: "Comment décider ?" },
      {
        type: "paragraph",
        text: "Le plus simple est de partir d'une visite de vos locaux. Elle permet d'observer la configuration des espaces, les types de sols, le nombre de sanitaires et la façon dont les lieux sont réellement utilisés. Sur cette base, une proposition chiffrée peut détailler les tâches et leur fréquence, zone par zone.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Estimez le nombre moyen de personnes présentes chaque jour.",
          "Listez les zones qui reçoivent des visiteurs.",
          "Identifiez les zones sensibles : sanitaires, cuisine, points de contact.",
          "Précisez les créneaux où une intervention est possible.",
          "Prévoyez un point d'ajustement après les premières semaines.",
        ],
      },
      {
        type: "paragraph",
        text: "Gardez enfin à l'esprit que les besoins évoluent au fil de l'année : périodes de congés, pics d'activité, saison hivernale où les sols se salissent plus vite. Un bon plan d'entretien anticipe ces variations plutôt que de les subir.",
      },
      {
        type: "paragraph",
        text: "Avec ces éléments, vous disposez d'une base solide pour échanger avec votre prestataire et obtenir une proposition adaptée, sans payer pour des passages inutiles ni laisser certaines zones de côté.",
      },
    ],
  },
  {
    slug: "restaurant-zones-a-ne-jamais-negliger",
    title: "Restaurant : les zones à ne jamais négliger dans votre plan de nettoyage",
    excerpt:
      "Salle, cuisine, plonge, sanitaires, réserves : tour d'horizon des zones sensibles d'un restaurant et des bonnes pratiques pour les entretenir.",
    category: "commerces-restaurants",
    tags: ["restaurant", "hygiène", "cuisine", "plan de nettoyage"],
    coverVariant: "goutte",
    coverImage: "/images/blog-restaurant-zones.webp",
    coverAlt: "Main gantée nettoyant un plan en inox dans une cuisine professionnelle",
    author: AUTHOR,
    publishedAt: "2026-09-15",
    relatedServices: ["nettoyage-restaurants"],
    seo: {
      title: "Nettoyage de restaurant : les zones à ne jamais négliger",
      description:
        "Salle, cuisine, plonge, sanitaires, réserves : les zones sensibles d'un restaurant et comment organiser leur entretien. Conseils MHLEYMANE.",
    },
    content: [
      {
        type: "paragraph",
        text: "Dans un restaurant, la propreté se joue sur deux tableaux : l'image que perçoivent vos clients en salle et l'hygiène, moins visible mais essentielle, des zones de préparation. Un plan de nettoyage bien construit couvre chaque zone avec la méthode et la fréquence qui lui conviennent. Voici celles qui méritent une attention particulière.",
      },
      { type: "h2", text: "La cuisine : le cœur du dispositif" },
      {
        type: "paragraph",
        text: "Plans de travail, sols, parois, équipements : la cuisine concentre graisses, projections et résidus alimentaires. L'entretien quotidien est en grande partie assuré par vos équipes au fil du service, mais un nettoyage approfondi régulier reste indispensable pour éviter l'accumulation de dépôts dans les zones difficiles d'accès.",
      },
      { type: "h3", text: "Les points souvent oubliés" },
      {
        type: "list",
        items: [
          "Le dessous et l'arrière des équipements de cuisson et des plans de travail.",
          "Les joints de carrelage et les siphons de sol.",
          "Les poignées de portes de chambres froides et de placards.",
          "Les parois et plinthes proches des zones de cuisson.",
        ],
      },
      {
        type: "callout",
        title: "À retenir",
        text: "Le nettoyage de certains équipements spécifiques, comme les hottes et conduits d'extraction, relève souvent de prestataires spécialisés. Vérifiez ce point avec votre prestataire lors du devis.",
      },
      { type: "h2", text: "La plonge et les zones humides" },
      {
        type: "paragraph",
        text: "La plonge est une zone de passage intense, exposée à l'eau, aux graisses et aux déchets. Les sols y sont souvent glissants et les recoins humides favorisent les dépôts. Un entretien régulier des sols, des éviers, des étagères de rangement et des évacuations contribue directement à la sécurité de vos équipes.",
      },
      { type: "h2", text: "La salle : ce que voient vos clients" },
      {
        type: "paragraph",
        text: "Tables, chaises, banquettes, sols, luminaires, vitres : la salle est votre vitrine. Les clients remarquent immédiatement une table collante, un sol terne ou des traces sur une vitre. Au-delà du nettoyage après chaque service, prévoyez des tâches périodiques : dépoussiérage des luminaires et décorations, nettoyage des pieds de tables et de chaises, entretien approfondi des sols selon leur nature.",
      },
      {
        type: "quote",
        text: "Un client ne voit pas votre cuisine, mais il voit vos sanitaires. Ils en disent long sur le reste de l'établissement.",
      },
      { type: "h2", text: "Les sanitaires, un indicateur pour vos clients" },
      {
        type: "paragraph",
        text: "Les sanitaires sont souvent le seul espace « en coulisses » auquel vos clients ont accès. Leur état influence directement la perception de l'hygiène globale du restaurant. Un nettoyage complet quotidien, complété par des vérifications pendant le service aux heures de forte affluence, permet de maintenir un niveau constant.",
      },
      { type: "h2", text: "Réserves, chambres froides et vestiaires" },
      {
        type: "paragraph",
        text: "Moins visibles, ces zones sont pourtant essentielles. Les réserves doivent rester rangées et propres pour faciliter la rotation des stocks. Les vestiaires du personnel méritent la même attention que les sanitaires clients : ils participent au confort et à l'hygiène de vos équipes.",
      },
      { type: "h2", text: "Organiser le plan de nettoyage" },
      {
        type: "paragraph",
        text: "Un plan de nettoyage efficace répond à trois questions pour chaque zone : quoi nettoyer, à quelle fréquence, et qui s'en charge. Il précise aussi les produits et méthodes adaptés à chaque surface. Il s'inscrit dans votre organisation globale de l'hygiène, notamment votre plan de maîtrise sanitaire, qui reste sous la responsabilité de l'exploitant.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Listez toutes les zones de l'établissement, y compris les espaces techniques.",
          "Pour chacune, définissez les tâches quotidiennes, hebdomadaires et périodiques.",
          "Répartissez clairement les tâches entre vos équipes et votre prestataire.",
          "Prévoyez des créneaux compatibles avec vos services.",
          "Mettez en place un suivi simple pour vérifier que tout est fait.",
        ],
      },
      { type: "h2", text: "Le suivi : la clé de la régularité" },
      {
        type: "paragraph",
        text: "Un plan de nettoyage n'a de valeur que s'il est appliqué jour après jour. Une fiche de suivi par zone, cochée à chaque passage, permet de vérifier rapidement que rien n'a été oublié, surtout lors des périodes de forte activité ou de changement d'équipe. Elle facilite aussi le dialogue avec votre prestataire : en cas de remarque, chacun sait précisément ce qui a été fait et quand.",
      },
      {
        type: "paragraph",
        text: "Prévoyez également un point régulier, par exemple chaque mois, pour revoir le plan : nouvelle carte, nouveaux équipements, terrasse ouverte en été, changement d'horaires. Le plan doit évoluer avec votre établissement, et non l'inverse.",
      },
      {
        type: "paragraph",
        text: "Faire appel à un prestataire extérieur permet de décharger vos équipes des nettoyages les plus lourds, en dehors des heures de service, pour qu'elles puissent se concentrer sur leur métier : la cuisine et l'accueil.",
      },
    ],
  },
  {
    slug: "nettoyage-ponctuel-ou-contrat-regulier",
    title: "Nettoyage ponctuel ou contrat régulier : comment choisir ?",
    excerpt:
      "Intervention unique ou entretien planifié : les situations où chaque formule s'impose, et pourquoi les deux se combinent souvent.",
    category: "conseils-entretien",
    tags: ["contrat d'entretien", "intervention ponctuelle", "devis", "organisation"],
    coverVariant: "arches",
    coverImage: "/images/blog-ponctuel-ou-contrat.webp",
    coverAlt:
      "Agent passant l'aspirateur dans un couloir lumineux, chariot d'entretien à proximité",
    author: AUTHOR,
    publishedAt: "2026-08-27",
    relatedServices: ["nettoyage-bureaux", "remise-en-etat", "entretien-batiments"],
    seo: {
      title: "Nettoyage ponctuel ou contrat régulier : que choisir ?",
      description:
        "Intervention ponctuelle ou contrat d'entretien régulier : avantages, situations types et conseils pour choisir la bonne formule de nettoyage.",
    },
    content: [
      {
        type: "paragraph",
        text: "Lorsque vous faites appel à une société de nettoyage, deux grandes formules s'offrent à vous : l'intervention ponctuelle, qui répond à un besoin précis à un moment donné, et le contrat d'entretien régulier, qui assure un niveau de propreté constant dans la durée. Chacune a sa logique. Voici comment les distinguer et choisir celle qui correspond à votre situation.",
      },
      { type: "h2", text: "L'intervention ponctuelle : répondre à un besoin précis" },
      {
        type: "paragraph",
        text: "L'intervention ponctuelle est une prestation unique, définie pour un objectif clair. Elle convient lorsque le besoin est exceptionnel ou lié à un événement.",
      },
      {
        type: "list",
        items: [
          "Fin de chantier ou après des travaux de rénovation.",
          "Avant un état des lieux d'entrée ou de sortie.",
          "Avant une ouverture, une réouverture ou un déménagement.",
          "Avant ou après un événement : inauguration, portes ouvertes, salon.",
          "Remise à niveau de locaux restés inoccupés.",
        ],
      },
      {
        type: "paragraph",
        text: "Son avantage : la souplesse. Vous ne vous engagez que sur une prestation, dont le périmètre est défini à l'avance. En revanche, elle ne garantit pas la continuité : une fois l'intervention terminée, l'entretien courant revient à votre charge.",
      },
      { type: "h2", text: "Le contrat régulier : la constance avant tout" },
      {
        type: "paragraph",
        text: "Le contrat d'entretien prévoit des passages planifiés selon une fréquence définie ensemble : quotidienne, plusieurs fois par semaine, hebdomadaire ou mensuelle. Il s'appuie sur un cahier des charges qui détaille les tâches zone par zone.",
      },
      { type: "h3", text: "Ce qu'il apporte" },
      {
        type: "list",
        items: [
          "Un niveau de propreté stable, sans avoir à y penser.",
          "Une organisation claire : jours, horaires, tâches, interlocuteur.",
          "La possibilité d'ajuster le contrat au fil du temps.",
          "Une meilleure connaissance de vos locaux par les intervenants.",
        ],
      },
      {
        type: "callout",
        title: "Conseil",
        text: "Lisez attentivement le cahier des charges : il doit préciser chaque tâche, sa fréquence et les zones concernées. C'est lui qui fait foi en cas de question.",
      },
      { type: "h2", text: "Les questions à se poser" },
      {
        type: "list",
        ordered: true,
        items: [
          "Le besoin est-il récurrent ou lié à un événement ponctuel ?",
          "Vos équipes peuvent-elles assurer une partie de l'entretien courant ?",
          "Vos locaux reçoivent-ils du public ou des clients régulièrement ?",
          "Avez-vous besoin d'un niveau de présentation constant ?",
          "Prévoyez-vous des changements prochains : travaux, déménagement, nouvelle équipe ?",
        ],
      },
      { type: "h2", text: "Les deux formules se combinent souvent" },
      {
        type: "paragraph",
        text: "Dans de nombreux cas, la solution la plus pertinente associe les deux. Un contrat régulier assure l'entretien courant, tandis que des interventions ponctuelles prennent en charge les tâches exceptionnelles : remise en état après des travaux, nettoyage approfondi annuel, préparation d'un événement. Cette combinaison évite de surdimensionner le contrat tout en gardant la possibilité de traiter les besoins particuliers.",
      },
      {
        type: "quote",
        text: "Commencer par une intervention ponctuelle est aussi une bonne façon de découvrir un prestataire avant de s'engager dans la durée.",
      },
      { type: "h2", text: "Et le budget ?" },
      {
        type: "paragraph",
        text: "Chaque devis dépend de la surface, de la nature des locaux, des tâches demandées et de la fréquence. Une intervention ponctuelle est chiffrée selon l'ampleur du travail, tandis qu'un contrat régulier est généralement établi sur une base mensuelle. Dans les deux cas, une visite préalable permet d'obtenir une proposition précise et de comparer sereinement.",
      },
      { type: "h2", text: "Deux exemples concrets" },
      {
        type: "paragraph",
        text: "Une agence qui emménage dans de nouveaux bureaux après rénovation aura besoin d'une remise en état complète avant l'arrivée des équipes : poussières de chantier, vitres, sols, sanitaires. Une fois installée, un contrat régulier prendra le relais pour l'entretien courant, avec des passages adaptés au nombre de collaborateurs présents.",
      },
      {
        type: "paragraph",
        text: "À l'inverse, un commerce déjà entretenu au quotidien par un contrat peut ponctuellement demander un nettoyage approfondi avant les soldes ou un événement en boutique. L'intervention ponctuelle vient alors compléter le contrat, sans le modifier.",
      },
      {
        type: "paragraph",
        text: "Dans les deux cas, le point commun est la clarté : un périmètre précis, des tâches listées et un interlocuteur identifié. C'est ce qui garantit un résultat à la hauteur de vos attentes, quelle que soit la formule retenue.",
      },
      {
        type: "paragraph",
        text: "Si vous hésitez, décrivez simplement votre situation lors de votre demande de devis. C'est le rôle de votre interlocuteur de vous orienter vers la formule la plus adaptée, sans vous imposer une prestation dont vous n'avez pas besoin.",
      },
    ],
  },
  {
    slug: "nettoyage-industriel-preparer-intervention",
    title: "Nettoyage industriel : préparer l'intervention sur votre site",
    excerpt:
      "Accès, sécurité, planning de production, zones à traiter : les points à préparer pour une intervention de nettoyage industriel réussie.",
    category: "industrie",
    tags: ["industrie", "sécurité", "entrepôt", "organisation"],
    coverVariant: "ondes",
    coverImage: "/images/blog-industriel-preparer.webp",
    coverAlt: "Responsable consultant un plan dans un entrepôt, autolaveuse en arrière-plan",
    author: AUTHOR,
    publishedAt: "2026-07-08",
    relatedServices: ["nettoyage-industriel"],
    seo: {
      title: "Nettoyage industriel : bien préparer l'intervention",
      description:
        "Accès, consignes de sécurité, planning, zones à traiter : comment préparer une intervention de nettoyage sur un site industriel.",
    },
    content: [
      {
        type: "paragraph",
        text: "Un site industriel ne se nettoie pas comme un bureau. Surfaces importantes, circulations d'engins, contraintes de production, règles de sécurité : une intervention réussie repose avant tout sur sa préparation. Voici les points à aborder avec votre prestataire avant le démarrage.",
      },
      { type: "h2", text: "Définir précisément le périmètre" },
      {
        type: "paragraph",
        text: "Commencez par lister les zones concernées : ateliers, zones de production, entrepôts, quais de chargement, vestiaires, sanitaires, réfectoires, bureaux attenants. Pour chacune, précisez le type de salissures rencontrées et le résultat attendu. Cette description évite les malentendus et permet d'estimer correctement les moyens nécessaires.",
      },
      {
        type: "list",
        items: [
          "Les zones incluses et, tout aussi important, les zones exclues.",
          "La nature des sols : béton, résine, carrelage, revêtements spécifiques.",
          "Les équipements à ne pas toucher ou à traiter avec précaution.",
          "Le niveau de finition attendu pour chaque zone.",
        ],
      },
      { type: "h2", text: "Partager les consignes de sécurité" },
      {
        type: "paragraph",
        text: "La sécurité des intervenants et de vos équipes est la priorité. Votre prestataire doit connaître les règles du site avant toute intervention : équipements de protection individuelle requis, plan de circulation, zones à accès restreint, procédures d'urgence. Selon la nature de l'activité et des travaux, un plan de prévention peut être nécessaire : il formalise l'analyse des risques liés à l'intervention d'une entreprise extérieure.",
      },
      {
        type: "callout",
        title: "Point de vigilance",
        text: "Prévoyez une visite commune du site avant le démarrage. C'est le meilleur moment pour identifier les risques, valider les accès et répondre aux questions des intervenants.",
      },
      { type: "h2", text: "Caler l'intervention sur la production" },
      {
        type: "paragraph",
        text: "Le moment de l'intervention conditionne son efficacité. Nettoyer une zone en pleine activité est souvent impossible ou peu efficace. Les créneaux les plus adaptés sont généralement les arrêts de production, les week-ends, les périodes de maintenance ou les changements d'équipe. Partagez votre planning prévisionnel pour que les passages soient organisés au bon moment.",
      },
      { type: "h3", text: "Les bonnes questions à se poser" },
      {
        type: "list",
        ordered: true,
        items: [
          "Quand les zones à traiter sont-elles libres d'activité ?",
          "Faut-il intervenir zone par zone pour maintenir la production ?",
          "Qui, sur site, sera le référent des intervenants ?",
          "Comment les intervenants accèdent-ils au site (badges, horaires, gardiennage) ?",
        ],
      },
      { type: "h2", text: "Préparer les lieux" },
      {
        type: "paragraph",
        text: "Quelques préparatifs simples facilitent grandement l'intervention : dégager les allées, regrouper les stocks mobiles, signaler les équipements sensibles, indiquer les points d'eau et d'électricité disponibles. Ces informations réduisent le temps d'intervention et améliorent le résultat.",
      },
      {
        type: "quote",
        text: "Une heure de préparation partagée évite souvent des heures de contraintes le jour de l'intervention.",
      },
      { type: "h2", text: "Prévoir le suivi" },
      {
        type: "paragraph",
        text: "Après l'intervention, un contrôle conjoint permet de vérifier le résultat et d'ajuster si nécessaire. Pour un contrat régulier, des points périodiques assurent que la prestation reste adaptée à l'évolution du site : nouvelles zones, changement d'organisation, pics d'activité saisonniers.",
      },
      { type: "h2", text: "Les documents utiles à rassembler" },
      {
        type: "paragraph",
        text: "Pour gagner du temps, réunissez en amont les documents qui aideront votre prestataire à préparer l'intervention. Ils permettent d'établir un devis juste et d'organiser le travail des équipes dans de bonnes conditions.",
      },
      {
        type: "list",
        items: [
          "Un plan du site indiquant les zones à traiter et les accès.",
          "Les consignes de sécurité et le règlement intérieur applicables aux entreprises extérieures.",
          "Le planning prévisionnel de production ou d'arrêt des lignes.",
          "Les coordonnées du référent sur site et, le cas échéant, du service sécurité.",
          "Les fiches d'information des revêtements ou équipements nécessitant un traitement particulier.",
        ],
      },
      {
        type: "paragraph",
        text: "Ces éléments évitent les allers-retours et permettent de démarrer sereinement, avec une organisation validée par toutes les parties.",
      },
      { type: "h3", text: "Et pour un contrat régulier ?" },
      {
        type: "paragraph",
        text: "Lorsque le nettoyage devient récurrent, la préparation se fait une fois pour toutes, puis s'actualise. Les intervenants connaissent le site, ses règles et ses interlocuteurs ; il suffit alors de signaler les changements : nouvelle ligne de production, zone en travaux, modification des horaires. Un registre partagé ou un simple échange régulier avec le référent suffit souvent à maintenir une organisation fluide.",
      },
      {
        type: "paragraph",
        text: "Bien préparée, une intervention de nettoyage industriel se déroule sans perturber votre activité et contribue durablement à des conditions de travail plus sûres et plus agréables pour vos équipes.",
      },
    ],
  },
  {
    slug: "rediger-demande-devis-nettoyage",
    title: "Comment bien rédiger votre demande de devis de nettoyage",
    excerpt:
      "Type de locaux, surface, fréquence, contraintes : les informations qui permettent de recevoir une proposition claire et juste.",
    category: "conseils-entretien",
    tags: ["devis", "cahier des charges", "conseils", "organisation"],
    coverVariant: "reflet",
    coverImage: "/images/blog-demande-devis.webp",
    coverAlt: "Carnet, stylo doré et tasse de café posés sur un bureau en marbre clair",
    author: AUTHOR,
    publishedAt: "2026-06-10",
    relatedServices: ["nettoyage-bureaux", "nettoyage-commerces", "nettoyage-industriel"],
    seo: {
      title: "Demande de devis nettoyage : les informations à fournir",
      description:
        "Type de locaux, surface, fréquence, accès, attentes : comment rédiger une demande de devis de nettoyage claire pour une proposition précise.",
    },
    content: [
      {
        type: "paragraph",
        text: "Une demande de devis précise, c'est une proposition plus juste, plus rapide et plus facile à comparer. À l'inverse, une demande trop vague oblige à multiplier les échanges et peut conduire à des propositions difficiles à évaluer. Voici les informations à réunir avant de contacter une société de nettoyage.",
      },
      { type: "h2", text: "Décrire vos locaux" },
      { type: "h3", text: "Le type d'espace" },
      {
        type: "paragraph",
        text: "Bureaux, commerce, restaurant, site industriel, parties communes d'immeuble : chaque environnement a ses contraintes et ses méthodes. Précisez aussi la répartition des espaces : nombre de bureaux, salles de réunion, sanitaires, cuisine ou espace de pause, zones de stockage.",
      },
      { type: "h3", text: "La surface" },
      {
        type: "paragraph",
        text: "Une estimation, même approximative, aide à dimensionner l'intervention. Si vous ne connaissez pas la surface exacte, indiquez un ordre de grandeur ou le nombre de pièces : une visite permettra de préciser.",
      },
      { type: "h3", text: "La nature des sols et surfaces" },
      {
        type: "paragraph",
        text: "Moquette, parquet, carrelage, béton ciré, marbre, grandes surfaces vitrées : ces informations orientent le choix des méthodes et des produits.",
      },
      { type: "h2", text: "Préciser vos attentes" },
      {
        type: "list",
        items: [
          "La fréquence souhaitée : quotidienne, hebdomadaire, mensuelle ou ponctuelle.",
          "Les créneaux possibles : tôt le matin, en soirée, pendant les heures d'activité.",
          "Les tâches prioritaires : sanitaires, sols, vitres, cuisine, accueil.",
          "Les tâches particulières : vitres en hauteur, entretien spécifique des sols, remise en état.",
          "La date de démarrage souhaitée.",
        ],
      },
      {
        type: "callout",
        title: "Astuce",
        text: "Si vous avez déjà un prestataire, joignez la liste des tâches actuelles en indiquant ce qui vous convient et ce que vous souhaitez améliorer. C'est souvent la base la plus parlante.",
      },
      { type: "h2", text: "Signaler les contraintes" },
      {
        type: "paragraph",
        text: "Les contraintes pratiques ont un impact direct sur l'organisation de la prestation. Mentionnez-les dès la demande : modalités d'accès (badge, clés, alarme, gardiennage), présence d'équipes pendant l'intervention, zones sensibles ou confidentielles, règles de sécurité spécifiques, stationnement.",
      },
      {
        type: "quote",
        text: "Plus la demande est précise, plus la proposition est juste : c'est le meilleur moyen de comparer des offres sur une base équivalente.",
      },
      { type: "h2", text: "Accepter la visite préalable" },
      {
        type: "paragraph",
        text: "Pour un contrat régulier ou une remise en état, une visite des locaux est presque toujours utile. Elle permet au prestataire de constater la configuration réelle, l'état des surfaces et les contraintes d'accès. C'est aussi l'occasion pour vous de rencontrer votre futur interlocuteur et de poser vos questions.",
      },
      { type: "h2", text: "Comparer les devis reçus" },
      {
        type: "paragraph",
        text: "Pour comparer des propositions, ne vous arrêtez pas au montant. Vérifiez que chaque devis couvre bien les mêmes tâches, avec les mêmes fréquences. Regardez la clarté du cahier des charges, les modalités de suivi de la qualité, la fourniture des produits et consommables, et les conditions d'ajustement du contrat.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Le périmètre est-il identique d'un devis à l'autre ?",
          "Les fréquences sont-elles clairement indiquées zone par zone ?",
          "Les produits et consommables sont-ils inclus ?",
          "Qui est votre interlocuteur au quotidien ?",
          "Comment la qualité est-elle contrôlée ?",
        ],
      },
      { type: "h2", text: "Les erreurs fréquentes à éviter" },
      {
        type: "list",
        items: [
          "Envoyer une demande sans surface ni type de locaux : la proposition restera approximative.",
          "Oublier de préciser les créneaux possibles, alors qu'ils conditionnent toute l'organisation.",
          "Ne pas mentionner les zones particulières (salle serveur, archives, zones sensibles).",
          "Comparer des devis portant sur des périmètres différents.",
          "Négliger la question du suivi : qui contacter en cas de remarque ?",
        ],
      },
      {
        type: "paragraph",
        text: "Prendre quelques minutes pour vérifier ces points avant d'envoyer votre demande vous fera gagner du temps ensuite, et vous permettra d'obtenir une proposition réellement adaptée à vos besoins.",
      },
      {
        type: "paragraph",
        text: "Enfin, n'hésitez pas à indiquer votre budget si vous en avez un. Ce n'est pas une obligation, mais cela permet au prestataire de vous proposer des options réalistes : ajuster une fréquence, prioriser certaines zones ou étaler certaines tâches dans le temps. Une proposition construite ensemble est toujours plus juste qu'une offre standard.",
      },
      {
        type: "paragraph",
        text: "Avec ces éléments en main, votre demande de devis devient un véritable outil de décision. Notre formulaire en ligne reprend d'ailleurs ces différentes étapes pour vous guider.",
      },
    ],
  },
  {
    slug: "magasin-vitrine-impeccable",
    title: "Magasins : une vitrine impeccable pour accueillir vos clients",
    excerpt:
      "Vitrines, entrée, sols, cabines, caisses : comment faire de la propreté un véritable atout de l'expérience en magasin.",
    category: "commerces-restaurants",
    tags: ["commerce", "vitrine", "expérience client", "magasin"],
    coverVariant: "eclat",
    coverImage: "/images/blog-vitrine-magasin.webp",
    coverAlt: "Agent nettoyant à la raclette la vitrine d'une boutique élégante",
    author: AUTHOR,
    publishedAt: "2026-05-20",
    relatedServices: ["nettoyage-commerces"],
    seo: {
      title: "Propreté en magasin : soigner sa vitrine et sa surface de vente",
      description:
        "Vitrines, entrée, sols, cabines, caisses : conseils pour faire de la propreté un atout de l'expérience client en magasin.",
    },
    content: [
      {
        type: "paragraph",
        text: "Avant même de franchir la porte, vos clients se font une idée de votre boutique. Une vitrine nette, une entrée soignée et une surface de vente impeccable donnent envie d'entrer et de prendre son temps. La propreté fait partie de l'expérience client au même titre que l'agencement, la lumière ou l'accueil. Voici les zones à soigner en priorité.",
      },
      { type: "h2", text: "La vitrine, premier contact avec vos clients" },
      {
        type: "paragraph",
        text: "La vitrine est exposée en permanence : traces de doigts, pollution, pluie, poussière. Une vitrine terne ou marquée affaiblit immédiatement la mise en valeur de vos produits. Un entretien régulier, à l'extérieur comme à l'intérieur, préserve la transparence et la luminosité de votre devanture.",
      },
      {
        type: "list",
        items: [
          "Nettoyez la face intérieure, souvent oubliée, autant que l'extérieur.",
          "Entretenez les encadrements, rebords et seuils de porte.",
          "Dépoussiérez régulièrement les supports et éléments de présentation de la vitrine.",
          "Prévoyez un passage supplémentaire après les épisodes de pluie ou de pollen.",
        ],
      },
      { type: "h2", text: "L'entrée et les sols" },
      {
        type: "paragraph",
        text: "L'entrée concentre les salissures apportées de l'extérieur. Un tapis d'accueil propre et entretenu limite leur diffusion dans le magasin. Les sols de la surface de vente doivent ensuite être entretenus selon leur nature : un sol brillant met en valeur l'agencement, tandis qu'un sol terne ou marqué donne une impression de négligence.",
      },
      {
        type: "callout",
        title: "Bon réflexe",
        text: "Planifiez le nettoyage des sols avant l'ouverture : vos clients découvrent un magasin impeccable, et vos équipes commencent la journée dans de bonnes conditions.",
      },
      { type: "h2", text: "Présentoirs, rayonnages et miroirs" },
      {
        type: "paragraph",
        text: "La poussière sur un présentoir ou des traces sur un miroir se remarquent vite, surtout sous un éclairage de magasin. Un dépoussiérage régulier des rayonnages, des éléments de décoration et des luminaires, ainsi qu'un entretien soigné des miroirs, contribue à la qualité de votre présentation.",
      },
      { type: "h3", text: "Les cabines d'essayage" },
      {
        type: "paragraph",
        text: "Espace intime par excellence, la cabine d'essayage doit être irréprochable : miroir sans traces, sol propre, patères et banquettes dépoussiérées, rideaux ou portes entretenus. C'est souvent là que se joue la décision d'achat.",
      },
      {
        type: "quote",
        text: "Dans un commerce, la propreté ne se remarque pas quand elle est parfaite. Elle se remarque toujours quand elle fait défaut.",
      },
      { type: "h2", text: "Caisses et points de contact" },
      {
        type: "paragraph",
        text: "Comptoir, terminal de paiement, poignées de portes, paniers, rampes : ces surfaces sont touchées par de nombreuses personnes chaque jour. Leur entretien régulier participe à l'hygiène du magasin et rassure vos clients comme vos équipes.",
      },
      { type: "h2", text: "Les espaces en coulisses" },
      {
        type: "paragraph",
        text: "Réserves, sanitaires du personnel, espace de pause : invisibles pour les clients, ces zones comptent pour vos équipes et pour l'organisation du magasin. Une réserve propre et rangée facilite la gestion des stocks et la mise en rayon.",
      },
      { type: "h2", text: "Organiser l'entretien sans gêner la vente" },
      {
        type: "list",
        ordered: true,
        items: [
          "Concentrez les tâches lourdes avant l'ouverture ou après la fermeture.",
          "Prévoyez une fréquence plus élevée pour la vitrine et l'entrée.",
          "Anticipez les temps forts : soldes, fêtes, nouvelles collections.",
          "Planifiez un nettoyage approfondi avant chaque événement en magasin.",
        ],
      },
      { type: "h2", text: "Les surfaces brillantes, un cas particulier" },
      {
        type: "paragraph",
        text: "Inox, verre, laiton, sols vernis ou carrelages polis : les matériaux brillants subliment un magasin, mais ils révèlent la moindre trace. Ils demandent des produits adaptés et une méthode précise pour éviter les auréoles et les rayures. Un mauvais produit peut ternir durablement une surface ou en altérer la finition.",
      },
      {
        type: "paragraph",
        text: "Pour ces matériaux, il est utile de lister avec votre prestataire les surfaces sensibles et les recommandations de leurs fabricants. L'entretien gagne alors en efficacité et vos aménagements conservent leur éclat plus longtemps.",
      },
      {
        type: "paragraph",
        text: "Pensez aussi aux abords immédiats de la boutique : seuil, trottoir devant la vitrine, enseigne, store. Ces éléments, souvent négligés, font pourtant partie de la première impression. Un passage régulier sur ces zones complète utilement l'entretien intérieur.",
      },
      {
        type: "paragraph",
        text: "Confier l'entretien de votre magasin à un prestataire permet à vos équipes de se consacrer pleinement à l'accueil et au conseil, tout en garantissant une présentation constante, jour après jour.",
      },
    ],
  },
];

const WORDS_PER_MINUTE = 220;

const blockText = (b: Block): string => {
  switch (b.type) {
    case "list":
      return b.items.join(" ");
    case "image":
      return b.caption ?? "";
    case "callout":
      return `${b.title ?? ""} ${b.text}`;
    default:
      return b.text;
  }
};

export const wordCount = (post: Post) =>
  post.content.map(blockText).join(" ").split(/\s+/).filter(Boolean).length;

/** Temps de lecture calculé (minutes) */
export const readingTime = (post: Post) =>
  Math.max(1, Math.round(wordCount(post) / WORDS_PER_MINUTE));

/** Articles triés du plus récent au plus ancien */
export const posts: Post[] = [...rawPosts].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

const MONTHS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

/** Date lisible en français, identique côté serveur et navigateur */
export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d === 1 ? "1er" : d} ${MONTHS[(m ?? 1) - 1]} ${y}`;
};

/** Identifiant d'ancre pour un intertitre */
export const slugify = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const getRelatedPosts = (post: Post, limit = 3) => {
  const score = (p: Post) =>
    (p.category === post.category ? 3 : 0) + p.tags.filter((t) => post.tags.includes(t)).length;
  return posts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, s: score(p) }))
    .sort((a, b) => b.s - a.s || b.p.publishedAt.localeCompare(a.p.publishedAt))
    .slice(0, limit)
    .map(({ p }) => p);
};
