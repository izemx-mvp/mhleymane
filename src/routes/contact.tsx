import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/site/ui";
import { Field, Consent, Success, errorsFrom, type Errs } from "@/components/site/forms";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact – MHLEYMANE, nettoyage à Villepreux (78)", "Contactez MHLEYMANE, société de nettoyage au 2 Rue du Docteur Alexandre à Villepreux, pour toute question ou demande.", "/contact"),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Veuillez indiquer votre nom").max(100),
  email: z.string().trim().email("Adresse e-mail invalide").max(255),
  phone: z.string().trim().max(20).optional(),
  subject: z.string().trim().min(1, "Veuillez indiquer un objet").max(150),
  message: z.string().trim().min(1, "Veuillez écrire un message").max(2000),
  consent: z.literal(true, { errorMap: () => ({ message: "Votre consentement est requis" }) }),
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errs>({});
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm({ ...form, [k]: e.target.value });
  const { lat, lng } = site.geo;
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse({ ...form, consent });
    if (!r.success) return setErrors(errorsFrom(r.error.issues));
    setErrors({});
    setSent(true);
  };
  const info = [
    { icon: MapPin, label: "Adresse", value: `${site.address.street}, ${site.address.zip} ${site.address.city}` },
    { icon: Phone, label: "Téléphone", value: site.phone, href: site.phoneHref },
    { icon: Mail, label: "E-mail", value: site.email, href: `mailto:${site.email}` },
    { icon: Clock, label: "Horaires", value: site.hours },
  ];
  return (
    <>
      <PageHero eyebrow="Contact" title="Nous contacter" tagline="Une question, un projet ? Nous sommes à votre écoute." />
      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div className="space-y-4">
            {info.map((i) => (
              <div key={i.label} className="flex gap-4 rounded-lg border bg-card p-5">
                <i.icon className="h-5 w-5 shrink-0 text-gold-deep" />
                <div className="min-w-0">
                  <p className="eyebrow">{i.label}</p>
                  {i.href ? <a href={i.href} className="mt-1 block break-words">{i.value}</a> : <p className="mt-1">{i.value}</p>}
                </div>
              </div>
            ))}
            <iframe
              title="Carte de Villepreux"
              className="h-72 w-full rounded-lg border"
              loading="lazy"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.02}%2C${lat - 0.01}%2C${lng + 0.02}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lng}`}
            />
          </div>
          {sent ? (
            <Success title="Message envoyé" text="Merci, votre message a bien été pris en compte. Nous vous répondrons rapidement." />
          ) : (
            <form onSubmit={submit} noValidate className="grid h-fit gap-5 rounded-lg border bg-card p-8 shadow-soft sm:grid-cols-2">
              <Field label="Nom *" error={errors.name}><input className="field" value={form.name} onChange={set("name")} /></Field>
              <Field label="E-mail *" error={errors.email}><input className="field" type="email" value={form.email} onChange={set("email")} /></Field>
              <Field label="Téléphone" error={errors.phone}><input className="field" type="tel" value={form.phone} onChange={set("phone")} /></Field>
              <Field label="Objet *" error={errors.subject}><input className="field" value={form.subject} onChange={set("subject")} /></Field>
              <Field label="Message *" error={errors.message} full><textarea className="field min-h-40" value={form.message} onChange={set("message")} /></Field>
              <Consent checked={consent} onChange={setConsent} error={errors.consent} />
              <button type="submit" className="btn-gold rounded-md py-4 text-sm font-semibold uppercase tracking-widest sm:col-span-2">Envoyer</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
