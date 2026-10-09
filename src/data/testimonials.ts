export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company?: string;
  /** true tant que le témoignage n'est pas réel et validé */
  example: boolean;
};

// CONTENU EXEMPLE À REMPLACER — ne jamais publier de faux avis.
// La section est masquée tant que `site.showTestimonials` vaut false.
export const testimonials: Testimonial[] = [
  {
    quote: "Texte du témoignage à remplacer par un avis client réel et validé.",
    author: "Prénom N.",
    role: "Fonction",
    company: "Entreprise",
    example: true,
  },
  {
    quote: "Texte du témoignage à remplacer par un avis client réel et validé.",
    author: "Prénom N.",
    role: "Fonction",
    company: "Entreprise",
    example: true,
  },
  {
    quote: "Texte du témoignage à remplacer par un avis client réel et validé.",
    author: "Prénom N.",
    role: "Fonction",
    company: "Entreprise",
    example: true,
  },
];
