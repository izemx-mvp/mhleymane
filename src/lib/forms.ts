import { site } from "@/config/site";

export type LeadSource = "formulaire_devis" | "formulaire_contact";

export type SubmitResult = { ok: true; via: "endpoint" | "local" | "ignored" } | { ok: false };

/** Délai minimal (ms) entre l'affichage du formulaire et l'envoi : en dessous, il s'agit d'un robot. */
export const MIN_FILL_TIME = 3000;

/** Nom du champ piège (invisible pour les humains) */
export const HONEYPOT = "site_web";

type Field = { label: string; value: string | string[] | boolean | undefined };

/**
 * Envoie une demande :
 * - vers `site.formEndpoint` (POST JSON compatible Formspree) s'il est défini ;
 * - sinon (endpoint non configuré), la demande n'est envoyée nulle part : le formulaire
 *   affiche simplement le message de réussite. Renseigner `formEndpoint` avant la mise en ligne.
 */
export async function submitLead({
  source,
  subject,
  fields,
  honeypot,
  startedAt,
}: {
  source: LeadSource;
  subject: string;
  fields: Record<string, Field>;
  honeypot: string;
  startedAt: number;
}): Promise<SubmitResult> {
  // Anti-spam : champ piège rempli ou envoi trop rapide → on simule un succès sans rien envoyer.
  if (honeypot.trim() !== "" || Date.now() - startedAt < MIN_FILL_TIME) {
    return { ok: true, via: "ignored" };
  }

  if (site.formEndpoint) {
    try {
      const payload: Record<string, unknown> = { source, _subject: subject };
      for (const [key, f] of Object.entries(fields)) payload[key] = f.value ?? "";
      const email = fields["email"]?.value;
      if (typeof email === "string") payload["_replyto"] = email;
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      return res.ok ? { ok: true, via: "endpoint" } : { ok: false };
    } catch {
      return { ok: false };
    }
  }

  // Endpoint non configuré : on reste sur la page et on affiche la confirmation.
  if (import.meta.env.DEV) {
    console.warn(
      "[formulaires] site.formEndpoint est vide : la demande n'a été envoyée nulle part.",
    );
  }
  return { ok: true, via: "local" };
}
