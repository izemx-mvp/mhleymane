import { site } from "@/config/site";
import type { FAQItem } from "./services";

// CONTENU EXEMPLE À REMPLACER — réponses à valider par MHLEYMANE
export const homeFaq: FAQItem[] = [
  {
    question: "Dans quelle zone intervenez-vous ?",
    answer: `MHLEYMANE est basée à ${site.address.city}, dans les ${site.address.department}. Zone d'intervention : ${site.zone.summary}. Contactez-nous pour vérifier que votre adresse est desservie.`,
  },
  {
    question: "Sous quel délai recevrai-je un devis ?",
    answer: `Nous revenons vers vous sous ${site.responseDelay} après réception de votre demande. Une visite de vos locaux peut être proposée pour établir une proposition précise.`,
  },
  {
    question: "À quels horaires intervenez-vous ?",
    answer:
      "Les interventions sont planifiées selon vos contraintes : tôt le matin, en soirée ou à d'autres créneaux convenus ensemble, afin de ne pas perturber votre activité. Les plages précises sont à confirmer lors de la visite.",
  },
  {
    question: "Fournissez-vous les produits et le matériel ?",
    answer:
      "Les produits et le matériel nécessaires à la prestation sont précisés dans le devis. Ils sont choisis selon la nature des surfaces à entretenir. Les consommables (papier, savon…) peuvent être fournis ou non, selon votre préférence.",
  },
  {
    question: "Proposez-vous des contrats ponctuels et réguliers ?",
    answer:
      "Oui. Vous pouvez opter pour un contrat d'entretien régulier (quotidien, hebdomadaire, mensuel) ou pour une intervention ponctuelle : remise en état après travaux, état des lieux, événement.",
  },
  {
    question: "Êtes-vous assurés ?",
    answer: `${site.legal.insurance}. Une attestation pourra vous être transmise sur demande.`,
  },
];
