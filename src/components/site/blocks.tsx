import { Link } from "@tanstack/react-router";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { Phone, Plus, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { site, phoneHref, isPlaceholder, type Stat } from "@/config/site";
import type { FAQItem } from "@/data/services";
import { DiamondRule, DropletBullet, Sparkle } from "./motifs";
import { EASE_LUXE, Reveal, RevealGroup, RevealItem } from "./Reveal";
import { SmartImage } from "./SmartImage";

/* ------------------------------------------------------------------ */
/* StatItem — compteur animé (valeurs vérifiées uniquement)            */
/* ------------------------------------------------------------------ */

export function StatItem({ stat, tone = "light" }: { stat: Stat; tone?: "light" | "dark" }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const numeric = typeof stat.value === "number";
  const target = numeric ? (stat.value as number) : 0;
  // Une année ne « compte » pas : on l'affiche telle quelle pour ne jamais montrer de fausse date.
  const isYear = numeric && target >= 1900 && target <= 2100;
  const start = 0;
  const [display, setDisplay] = useState<number>(target);

  useEffect(() => {
    if (!numeric || isYear || reduce || !inView) return;
    setDisplay(start);
    const controls = animate(start, target, {
      duration: 1.6,
      ease: EASE_LUXE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, numeric, isYear, reduce, start, target]);

  const placeholder = !numeric && isPlaceholder(String(stat.value));

  return (
    <div className="flex flex-col items-center px-4 text-center">
      <span
        ref={ref}
        className={cn(
          "font-display leading-none",
          placeholder
            ? cn("text-base tracking-[0.2em]", tone === "dark" ? "text-ivory/50" : "text-stone")
            : "text-gold-gradient text-5xl md:text-6xl",
        )}
      >
        {numeric ? display : stat.value}
        {stat.suffix}
      </span>
      <DiamondRule width="sm" className="my-5" />
      <span
        className={cn(
          "text-[0.8125rem] font-semibold uppercase tracking-[0.18em]",
          tone === "dark" ? "text-ivory/80" : "text-ink/80",
        )}
      >
        {stat.label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Méthode — frise en 4 étapes                                          */
/* ------------------------------------------------------------------ */

export const methodSteps = [
  {
    title: "Prise de contact & visite",
    text: "Vous nous présentez vos locaux et vos attentes. Une visite permet d'évaluer précisément le besoin.",
  },
  {
    title: "Devis personnalisé",
    text: "Une proposition claire, détaillant les tâches, les fréquences et les créneaux d'intervention.",
  },
  {
    title: "Mise en place du plan de nettoyage",
    text: "Un plan d'entretien zone par zone, des accès et horaires définis ensemble avant le démarrage.",
  },
  {
    title: "Suivi & contrôle qualité",
    text: "Des points réguliers avec votre interlocutrice pour vérifier le résultat et ajuster la prestation.",
  },
];

export function StepItem({
  index,
  title,
  text,
  compact,
}: {
  index: number;
  title: string;
  text: string;
  compact?: boolean;
}) {
  return (
    <div className="relative flex flex-col items-start md:items-center md:text-center">
      <span
        className={cn(
          "relative z-10 grid place-items-center rounded-full border border-gold/60 bg-ivory font-display text-gold-ink",
          compact ? "h-12 w-12 text-base" : "h-16 w-16 text-xl",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className={cn("mt-6", compact ? "text-base" : "text-lg")}>{title}</h3>
      <p
        className={cn(
          "mt-3 max-w-xs leading-relaxed text-muted-foreground",
          compact ? "text-sm" : "text-[0.95rem]",
        )}
      >
        {text}
      </p>
    </div>
  );
}

export function MethodTimeline({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative">
      {/* Ligne dorée qui se dessine au défilement */}
      <motion.div
        aria-hidden="true"
        className={cn(
          "absolute left-[12.5%] right-[12.5%] hidden h-px origin-left md:block",
          compact ? "top-6" : "top-8",
        )}
        style={{ background: "var(--gradient-gold-line)" }}
        initial={{ scaleX: reduce ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.4, ease: EASE_LUXE }}
      />
      <RevealGroup as="ol" className="grid gap-10 md:grid-cols-4 md:gap-6" stagger={0.12}>
        {methodSteps.map((s, i) => (
          <RevealItem as="li" key={s.title}>
            <StepItem index={i} title={s.title} text={s.text} compact={compact} />
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FAQAccordion                                                        */
/* ------------------------------------------------------------------ */

export function FAQAccordion({ items, className }: { items: FAQItem[]; className?: string }) {
  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      className={cn("divide-y divide-line border-y border-line", className)}
    >
      {items.map((f, i) => (
        <AccordionPrimitive.Item key={f.question} value={`q-${i}`} className="group">
          <AccordionPrimitive.Header asChild>
            <h3 className="font-sans text-base normal-case tracking-normal">
              <AccordionPrimitive.Trigger className="flex w-full items-center justify-between gap-6 py-6 text-left text-[1.0625rem] font-semibold text-ink transition-colors hover:text-gold-ink">
                {f.question}
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line transition duration-500 group-data-[state=open]:rotate-45 group-data-[state=open]:border-gold">
                  <Plus className="h-4 w-4 text-gold-ink" aria-hidden="true" />
                </span>
              </AccordionPrimitive.Trigger>
            </h3>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <p className="max-w-3xl pb-7 pr-12 leading-relaxed text-muted-foreground">{f.answer}</p>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}

/* ------------------------------------------------------------------ */
/* Checklist à puces gouttes                                            */
/* ------------------------------------------------------------------ */

export function Checklist({
  items,
  columns = 2,
  tone = "light",
}: {
  items: string[];
  columns?: 1 | 2;
  tone?: "light" | "dark";
}) {
  return (
    <RevealGroup
      as="ul"
      className={cn("grid gap-x-10 gap-y-4", columns === 2 && "md:grid-cols-2")}
      stagger={0.05}
    >
      {items.map((item) => (
        <RevealItem
          as="li"
          key={item}
          className={cn(
            "flex gap-3.5 leading-relaxed",
            tone === "dark" ? "text-ivory/85" : "text-ink/85",
          )}
        >
          <DropletBullet />
          <span>{item}</span>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/* ------------------------------------------------------------------ */
/* CTABanner                                                           */
/* ------------------------------------------------------------------ */

export function PhoneLink({ className, children }: { className?: string; children?: ReactNode }) {
  const content = children ?? site.phone;
  if (!phoneHref) return <span className={className}>{content}</span>;
  return (
    <a href={phoneHref} className={className}>
      {content}
    </a>
  );
}

export function CTABanner({
  title = "Parlons de vos locaux",
  lead = "Décrivez-nous votre besoin : nous vous adressons une proposition sur mesure, sans engagement.",
  service,
}: {
  title?: string;
  lead?: string;
  /** Pré-remplit le service dans le formulaire de devis */
  service?: string;
}) {
  return (
    <section className="bg-ivory px-4 py-16 md:py-24" aria-labelledby="cta-title">
      <Reveal className="mx-auto max-w-[1240px]">
        <div
          className="relative isolate overflow-hidden rounded-[28px] p-px"
          style={{ background: "var(--gradient-gold)" }}
        >
          <div className="relative isolate overflow-hidden rounded-[27px] bg-ink px-6 py-16 text-center text-ivory sm:px-12 md:py-24">
            <SmartImage
              src="/images/cta-fond.webp"
              alt=""
              width={1920}
              height={800}
              fallback="none"
              sizes="(min-width: 1280px) 1240px, 100vw"
              className="absolute inset-0 -z-10"
              imgClassName="opacity-45"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/70 to-ink/90" />
            </SmartImage>
            <div
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(60% 90% at 50% 0%, rgb(201 161 59 / 0.18), transparent 70%)",
              }}
              aria-hidden="true"
            />
            <Sparkle className="mx-auto h-5 w-5 text-gold animate-glint [animation-duration:5s]" />
            <p className="eyebrow eyebrow-light mt-6">Demande de devis gratuite</p>
            <h2 id="cta-title" className="mx-auto mt-5 max-w-3xl text-ivory">
              {title}
            </h2>
            <DiamondRule className="mt-7" />
            <p className="tagline mx-auto mt-7 max-w-2xl text-xl text-ivory/80 md:text-2xl">
              {lead}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/devis" search={service ? { service } : {}} className="btn btn-light">
                Demander un devis
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <PhoneLink className="btn btn-ghost-light">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {site.phone}
              </PhoneLink>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
