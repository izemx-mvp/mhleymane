import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { services } from "@/data/services";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/site/ui";
import { Field, Consent, Success, errorsFrom, type Errs } from "@/components/site/forms";

export const Route = createFileRoute("/devis")({
  validateSearch: (s: Record<string, unknown>): { service?: string } => (typeof s["service"] === "string" ? { service: s["service"] } : {}),
  head: () => seo("Demander un devis de nettoyage – MHLEYMANE", "Obtenez une proposition de nettoyage sur mesure pour vos bureaux, commerce, restaurant ou site industriel dans les Yvelines.", "/devis"),
  component: Devis,
});

const schema = z.object({
  service: z.string().min(1, "Veuillez choisir un service"),
  premises: z.string().min(1, "Veuillez préciser le type de locaux"),
  surface: z.string().trim().max(30).optional(),
  frequency: z.string().min(1, "Veuillez choisir une fréquence"),
  city: z.string().trim().min(1, "Veuillez indiquer la ville").max(100),
  name: z.string().trim().min(1, "Veuillez indiquer votre nom").max(100),
  company: z.string().trim().max(120).optional(),
  email: z.string().trim().email("Adresse e-mail invalide").max(255),
  phone: z.string().trim().regex(/^[0-9+().\s-]{8,20}$/, "Numéro de téléphone invalide"),
  message: z.string().trim().max(2000).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Votre consentement est requis" }) }),
});

function Devis() {
  const { service } = Route.useSearch();
  const [form, setForm] = useState({ service: service && services.some((s) => s.slug === service) ? service : "", premises: "", surface: "", frequency: "", city: "", name: "", company: "", email: "", phone: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errs>({});
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm({ ...form, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse({ ...form, consent });
    if (!r.success) return setErrors(errorsFrom(r.error.issues));
    setErrors({});
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <PageHero eyebrow="Devis" title="Demander un devis" tagline="Quelques informations suffisent pour préparer une proposition adaptée." />
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          {sent ? (
            <Success title="Merci pour votre demande" text="Votre demande de devis a bien été prise en compte. Nous revenons vers vous rapidement." />
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-5 rounded-lg border bg-card p-8 shadow-soft sm:grid-cols-2">
              <Field label="Service souhaité *" error={errors.service}>
                <select className="field" value={form.service} onChange={set("service")}>
                  <option value="">Sélectionner…</option>
                  {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
                </select>
              </Field>
              <Field label="Type de locaux *" error={errors.premises}>
                <select className="field" value={form.premises} onChange={set("premises")}>
                  <option value="">Sélectionner…</option>
                  {["Bureaux", "Commerce / magasin", "Restaurant", "Site industriel / entrepôt", "Parties communes", "Autre"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Surface approximative (m²)" error={errors.surface}><input className="field" value={form.surface} onChange={set("surface")} inputMode="numeric" /></Field>
              <Field label="Fréquence *" error={errors.frequency}>
                <select className="field" value={form.frequency} onChange={set("frequency")}>
                  <option value="">Sélectionner…</option>
                  {["Quotidienne", "Plusieurs fois par semaine", "Hebdomadaire", "Mensuelle", "Ponctuelle", "À définir"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Ville *" error={errors.city}><input className="field" value={form.city} onChange={set("city")} /></Field>
              <Field label="Nom et prénom *" error={errors.name}><input className="field" value={form.name} onChange={set("name")} autoComplete="name" /></Field>
              <Field label="Entreprise" error={errors.company}><input className="field" value={form.company} onChange={set("company")} autoComplete="organization" /></Field>
              <Field label="E-mail *" error={errors.email}><input className="field" type="email" value={form.email} onChange={set("email")} autoComplete="email" /></Field>
              <Field label="Téléphone *" error={errors.phone}><input className="field" type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" /></Field>
              <Field label="Message" error={errors.message} full><textarea className="field min-h-32" value={form.message} onChange={set("message")} /></Field>
              <Consent checked={consent} onChange={setConsent} error={errors.consent} />
              <button type="submit" className="btn-gold rounded-md py-4 text-sm font-semibold uppercase tracking-widest sm:col-span-2">Envoyer ma demande</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
