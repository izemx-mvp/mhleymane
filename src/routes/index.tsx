import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Clock, Leaf, Handshake, Building2, Store, UtensilsCrossed, Factory, Building, HeartPulse, Plus } from "lucide-react";
import { useState } from "react";
import { services } from "@/data/services";
import { posts, formatDate } from "@/data/posts";
import { seo } from "@/lib/seo";
import { Divider, Reveal, SectionTitle, Sparkle, Droplet, GoldWaves, CtaBand, PostCover } from "@/components/site/ui";

export const Route = createFileRoute("/")({
  head: () => seo("MHLEYMANE – Société de nettoyage professionnel à Villepreux (78)", "Nettoyage de bureaux, commerces, restaurants et sites industriels dans les Yvelines. Demandez votre devis à MHLEYMANE.", "/"),
  component: Home,
});

const reasons = [
  { icon: ShieldCheck, title: "Exigence", text: "Un niveau de finition constant, contrôlé à chaque intervention." },
  { icon: Clock, title: "Flexibilité", text: "Des horaires adaptés à votre activité, sans perturber vos équipes." },
  { icon: Handshake, title: "Proximité", text: "Un interlocuteur dédié, à l'écoute et réactif." },
  { icon: Leaf, title: "Respect", text: "Des méthodes soucieuses de vos locaux et de vos occupants." },
];
const sectors = [
  { icon: Building2, label: "Bureaux & sièges" },
  { icon: Store, label: "Commerces" },
  { icon: UtensilsCrossed, label: "Restauration" },
  { icon: Factory, label: "Industrie & logistique" },
  { icon: Building, label: "Copropriétés & syndics" },
  { icon: HeartPulse, label: "Établissements recevant du public" },
];
const steps = [
  { t: "Échange", d: "Vous nous présentez vos locaux et vos attentes." },
  { t: "Visite & devis", d: "Nous évaluons le besoin et vous adressons une proposition claire." },
  { t: "Mise en place", d: "Un planning et un cahier des charges définis ensemble." },
  { t: "Suivi", d: "Un contrôle régulier de la qualité et un dialogue permanent." },
];
const faqs = [
  { q: "Dans quelle zone intervenez-vous ?", a: "Nous sommes basés à Villepreux, dans les Yvelines. Contactez-nous pour vérifier que votre adresse fait partie de notre zone d'intervention." },
  { q: "Intervenez-vous en dehors des heures de bureau ?", a: "Oui, nous adaptons nos horaires à votre activité : tôt le matin, en soirée ou pendant vos heures d'ouverture selon vos préférences." },
  { q: "Proposez-vous des interventions ponctuelles ?", a: "Oui, en plus des contrats d'entretien réguliers, nous réalisons des remises en état après travaux, déménagement ou avant un état des lieux." },
  { q: "Comment est établi le devis ?", a: "Le devis dépend du type de locaux, de la surface, de la fréquence et de vos attentes. Une visite préalable peut être proposée pour plus de précision." },
  { q: "Fournissez-vous le matériel et les produits ?", a: "Oui, nos équipes interviennent avec leur propre matériel et des produits adaptés à chaque type de surface." },
  { q: "Combien de temps pour recevoir une proposition ?", a: "Nous revenons vers vous dans les meilleurs délais après réception de votre demande pour échanger sur votre projet." },
];

function Home() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-sand pt-28">
        <GoldWaves className="absolute inset-0 h-full w-full" />
        <motion.div className="pointer-events-none absolute right-[8%] top-[22%] text-gold" animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity }}>
          <Droplet className="h-24 w-16 opacity-50" />
        </motion.div>
        <Sparkle className="absolute left-[10%] top-[30%] h-5 w-5 animate-pulse text-gold" />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="eyebrow mb-6">Société de nettoyage · Yvelines</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="text-4xl leading-[1.15] sm:text-6xl">
            La propreté professionnelle, <span className="text-gold-gradient">avec exigence</span>
          </motion.h1>
          <Divider className="my-8" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }} className="tagline mx-auto max-w-2xl text-xl text-muted-foreground sm:text-2xl">
            Bureaux, commerces, restaurants et sites industriels : nous prenons soin de vos locaux pour que vous puissiez vous consacrer à l'essentiel.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/devis" className="btn-gold rounded-md px-8 py-4 text-sm font-semibold uppercase tracking-widest">Demander un devis</Link>
            <Link to="/services" className="rounded-md border border-foreground/30 px-8 py-4 text-sm font-semibold uppercase tracking-widest transition hover:border-gold hover:text-gold-deep">Nos services</Link>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle eyebrow="Nos prestations" title="Des services sur mesure" tagline="Un savoir-faire adapté à chaque environnement professionnel." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.07}>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="card-lift group relative block h-full rounded-lg border bg-card p-8">
                  <Sparkle className="absolute right-6 top-6 h-4 w-4 text-gold opacity-0 transition group-hover:opacity-100" />
                  <s.icon className="h-9 w-9 text-gold-deep" strokeWidth={1.3} />
                  <h3 className="mt-6 text-lg">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold-deep">Découvrir <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="relative overflow-hidden bg-ink py-24 text-ink-foreground">
        <GoldWaves className="absolute inset-0 h-full w-full opacity-30" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionTitle light eyebrow="Notre engagement" title="Pourquoi nous choisir" tagline="Une exigence de chaque instant, au service de votre image." />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.1} className="text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold/50"><r.icon className="h-7 w-7 text-gold" strokeWidth={1.3} /></div>
                <h3 className="mt-6 text-base text-gold-light">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-foreground/70">{r.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionTitle eyebrow="Secteurs" title="Ils nous confient leurs locaux" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {sectors.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <div className="card-lift flex items-center gap-4 rounded-lg border bg-card p-5">
                  <s.icon className="h-6 w-6 shrink-0 text-gold-deep" strokeWidth={1.4} />
                  <span className="text-sm font-medium">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* METHOD */}
      <section className="bg-sand py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionTitle eyebrow="Notre méthode" title="Quatre étapes, une exigence" />
          <div className="grid gap-8 md:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.1} className="relative text-center">
                <p className="text-gold-gradient font-display text-5xl">0{i + 1}</p>
                <h3 className="mt-4 text-base">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle eyebrow="Le journal" title="Conseils & actualités" />
          <div className="grid gap-6 md:grid-cols-3">
            {posts.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="card-lift block overflow-hidden rounded-lg border bg-card">
                  <PostCover variant={p.cover} className="aspect-[16/10]" />
                  <div className="p-6">
                    <p className="eyebrow">{p.category} · {formatDate(p.date)}</p>
                    <h3 className="mt-3 text-base leading-snug">{p.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{p.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionTitle eyebrow="FAQ" title="Questions fréquentes" />
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.04}>
                <div className="rounded-lg border bg-card">
                  <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium">
                    {f.q}
                    <Plus className={`h-5 w-5 shrink-0 text-gold-deep transition ${open === i ? "rotate-45" : ""}`} />
                  </button>
                  {open === i && <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
