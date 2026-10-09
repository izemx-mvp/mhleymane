import { site } from "@/config/site";

export type LeadSource = "formulaire_devis" | "formulaire_contact";

export type SubmitResult = { ok: true; via: "endpoint" | "mailto" | "ignored" } | { ok: false };

/** Délai minimal (ms) entre l'affichage du formulaire et l'envoi : en dessous, il s'agit d'un robot. */
export const MIN_FILL_TIME = 3000;

/** Nom du champ piège (invisible pour les humains) */
export const HONEYPOT = "site_web";

type Field = { label: string; value: string | string[] | boolean | undefined };

const toText = (v: Field["value"]) =>
  Array.isArray(v) ? v.join(", ") : typeof v === "boolean" ? (v ? "Oui" : "Non") : (v ?? "");

/**
 * Envoie une demande :
 * - vers `site.formEndpoint` (POST JSON compatible Formspree) s'il est défini ;
 * - sinon, ouvre la messagerie de l'internaute avec un e-mail pré-rempli vers `site.email`.
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

  // Repli : e-mail pré-rempli
  const body = [
    `${subject}`,
    "",
    ...Object.values(fields)
      .filter((f) => toText(f.value) !== "")
      .map((f) => `${f.label} : ${toText(f.value)}`),
    "",
    `Source : ${source}`,
  ].join("\n");
  const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = href;
  return { ok: true, via: "mailto" };
}
