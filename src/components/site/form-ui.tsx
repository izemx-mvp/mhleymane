import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { AlertCircle, Check } from "lucide-react";
import { cloneElement, isValidElement, useId, type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { HONEYPOT } from "@/lib/forms";
import { PhoneLink } from "./blocks";
import { DiamondRule, Droplet, Sparkle } from "./motifs";
import { EASE_LUXE } from "./Reveal";

type ControlProps = {
  id?: string | undefined;
  "aria-invalid"?: boolean | undefined;
  "aria-describedby"?: string | undefined;
  "aria-required"?: boolean | undefined;
};

/** Champ de formulaire accessible : libellé, aide, erreur annoncée */
export function FormField({
  label,
  required,
  hint,
  error,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string | undefined;
  children: ReactElement<ControlProps>;
  className?: string;
}) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(" ") || undefined;
  const control = isValidElement(children)
    ? cloneElement(children, {
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
        "aria-required": required || undefined,
      })
    : children;
  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={id} className="mb-2 text-[0.8125rem] font-semibold text-ink">
        {label}
        {required && (
          <span className="text-gold-ink" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {control}
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          className="mt-1.5 flex items-center gap-1.5 text-[0.8125rem] font-medium text-destructive"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

/** Puce de sélection (cases à cocher / boutons radio stylisés) */
export function ChoiceChip({
  type,
  name,
  value,
  checked,
  onChange,
  children,
}: {
  type: "checkbox" | "radio";
  name: string;
  value: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
}) {
  return (
    <label
      className={cn(
        "relative inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
        "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold",
        checked
          ? "border-ink bg-ink text-ivory"
          : "border-line bg-white text-ink hover:border-gold",
      )}
    >
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span
        className={cn(
          "grid h-4 w-4 place-items-center rounded-full border transition",
          checked ? "border-gold bg-gold text-ink" : "border-stone",
        )}
        aria-hidden="true"
      >
        {checked && <Check className="h-3 w-3" strokeWidth={3} />}
      </span>
      {children}
    </label>
  );
}

/** Champ piège anti-robots, invisible et ignoré par les lecteurs d'écran */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Ne pas remplir ce champ
        <input
          type="text"
          name={HONEYPOT}
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}

export function ConsentText() {
  return (
    <>
      J'accepte que les informations saisies soient utilisées par {site.name} pour traiter ma
      demande et me recontacter. Pour en savoir plus, consultez notre{" "}
      <Link
        to="/politique-de-confidentialite"
        className="link-gold font-semibold text-gold-ink"
        target="_blank"
      >
        politique de confidentialité
      </Link>
      .
    </>
  );
}

/** État de réussite animé : la goutte se transforme en étincelle */
export function SuccessState({
  title,
  text,
  viaMailto,
  action,
}: {
  title: string;
  text: string;
  viaMailto?: boolean;
  action?: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center px-4 py-10 text-center md:py-14"
    >
      <div className="relative h-20 w-20">
        <motion.div
          className="absolute inset-0 grid place-items-center text-gold"
          initial={{ opacity: 1, y: reduce ? 0 : -30, scale: 1 }}
          animate={{ opacity: 0, y: 0, scale: 0.4 }}
          transition={{ duration: 0.7, ease: EASE_LUXE }}
        >
          <Droplet filled className="h-12 w-9" />
        </motion.div>
        <motion.div
          className="absolute inset-0 grid place-items-center text-gold"
          initial={{ opacity: 0, scale: 0.2, rotate: reduce ? 0 : -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: reduce ? 0 : 0.55, ease: EASE_LUXE }}
        >
          <Sparkle className="h-16 w-16" />
        </motion.div>
      </div>
      <h2 className="mt-8 text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)]">{title}</h2>
      <DiamondRule className="my-6" />
      <p className="tagline max-w-lg text-xl text-muted-foreground">{text}</p>
      {viaMailto && (
        <p className="mt-6 max-w-lg rounded-2xl border border-line bg-sand px-5 py-4 text-sm text-ink/80">
          Votre messagerie s'est ouverte avec un e-mail pré-rempli : pensez à l'envoyer pour
          finaliser votre demande. Si rien ne s'est ouvert, écrivez-nous à{" "}
          <a href={`mailto:${site.email}`} className="link-gold font-semibold text-gold-ink">
            {site.email}
          </a>
          .
        </p>
      )}
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}

export function SubmitError() {
  return (
    <div
      role="alert"
      className="flex gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-ink"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
      <p>
        L'envoi n'a pas abouti. Vous pouvez réessayer dans un instant ou nous joindre directement
        par téléphone au <PhoneLink className="font-semibold" /> ou par e-mail à{" "}
        <a href={`mailto:${site.email}`} className="link-gold font-semibold text-gold-ink">
          {site.email}
        </a>
        .
      </p>
    </div>
  );
}
