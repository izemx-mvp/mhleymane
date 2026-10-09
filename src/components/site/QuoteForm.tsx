import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm, type FieldPath } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { services } from "@/data/services";
import { submitLead } from "@/lib/forms";
import { ChoiceChip, ConsentText, FormField, Honeypot, SubmitError, SuccessState } from "./form-ui";
import { EASE_LUXE } from "./Reveal";

export const premisesTypes = [
  "Bureaux",
  "Commerce / magasin",
  "Restaurant",
  "Site industriel / entrepôt",
  "Parties communes / copropriété",
  "Autre",
] as const;

export const frequencies = [
  "Quotidienne",
  "Plusieurs fois par semaine",
  "Hebdomadaire",
  "Mensuelle",
  "Ponctuelle",
  "À définir ensemble",
] as const;

const schema = z.object({
  services: z.array(z.string()).min(1, "Sélectionnez au moins un service."),
  typeLocaux: z.string().min(1, "Précisez le type de locaux."),
  surface: z
    .string()
    .trim()
    .max(12)
    .refine(
      (v) => v === "" || /^\d+([.,]\d+)?$/.test(v),
      "Indiquez une surface en chiffres (ex. : 250).",
    ),
  frequence: z.string().min(1, "Choisissez une fréquence."),
  adresse: z.string().trim().max(200),
  codePostal: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "Le code postal doit comporter 5 chiffres."),
  ville: z.string().trim().min(2, "Indiquez la ville.").max(100),
  dateSouhaitee: z.string().trim().max(20),
  message: z.string().trim().max(2000, "2 000 caractères maximum."),
  societe: z.string().trim().min(2, "Indiquez le nom de votre société.").max(150),
  nom: z.string().trim().min(2, "Indiquez votre nom.").max(100),
  prenom: z.string().trim().min(2, "Indiquez votre prénom.").max(100),
  fonction: z.string().trim().max(100),
  email: z.string().trim().email("Adresse e-mail invalide."),
  telephone: z
    .string()
    .trim()
    .regex(
      /^(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/,
      "Numéro de téléphone invalide (ex. : 06 12 34 56 78).",
    ),
  consentement: z
    .boolean()
    .refine((v) => v, "Votre accord est nécessaire pour traiter la demande."),
});

type Values = z.infer<typeof schema>;

const steps: { title: string; fields: FieldPath<Values>[] }[] = [
  { title: "Votre besoin", fields: ["services", "typeLocaux", "surface", "frequence"] },
  { title: "Le site", fields: ["adresse", "codePostal", "ville", "dateSouhaitee", "message"] },
  {
    title: "Vos coordonnées",
    fields: ["societe", "nom", "prenom", "fonction", "email", "telephone", "consentement"],
  },
];

export function QuoteForm({ initialService }: { initialService?: string | undefined }) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "success">("idle");
  const [viaMailto, setViaMailto] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef(Date.now());
  const topRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      services:
        initialService && services.some((s) => s.slug === initialService) ? [initialService] : [],
      typeLocaux: "",
      surface: "",
      frequence: "",
      adresse: "",
      codePostal: "",
      ville: "",
      dateSouhaitee: "",
      message: "",
      societe: "",
      nom: "",
      prenom: "",
      fonction: "",
      email: "",
      telephone: "",
      consentement: false,
    },
  });

  // Focus sur le titre de l'étape pour les lecteurs d'écran
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
    topRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, [step, reduce]);

  const next = async () => {
    const valid = await trigger(steps[step]!.fields, { shouldFocus: true });
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const onSubmit = async (v: Values) => {
    setStatus("sending");
    const serviceTitles = v.services.map(
      (slug) => services.find((s) => s.slug === slug)?.title ?? slug,
    );
    const result = await submitLead({
      source: "formulaire_devis",
      subject: `Demande de devis — ${v.societe}`,
      honeypot,
      startedAt: startedAt.current,
      fields: {
        services: { label: "Services", value: serviceTitles },
        type_locaux: { label: "Type de locaux", value: v.typeLocaux },
        surface: { label: "Surface approximative (m²)", value: v.surface },
        frequence: { label: "Fréquence souhaitée", value: v.frequence },
        adresse: { label: "Adresse", value: v.adresse },
        code_postal: { label: "Code postal", value: v.codePostal },
        ville: { label: "Ville", value: v.ville },
        date_souhaitee: { label: "Date de démarrage souhaitée", value: v.dateSouhaitee },
        message: { label: "Commentaires", value: v.message },
        societe: { label: "Société", value: v.societe },
        nom: { label: "Nom", value: v.nom },
        prenom: { label: "Prénom", value: v.prenom },
        fonction: { label: "Fonction", value: v.fonction },
        email: { label: "E-mail", value: v.email },
        telephone: { label: "Téléphone", value: v.telephone },
        consentement: { label: "Consentement RGPD", value: v.consentement },
      },
    });
    if (result.ok) {
      setViaMailto(result.via === "mailto");
      setStatus("success");
      topRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    } else {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div ref={topRef} className="scroll-mt-28">
        <SuccessState
          title="Merci pour votre demande"
          text={`Nous revenons vers vous sous ${site.responseDelay} pour échanger sur votre projet.`}
          viaMailto={viaMailto}
          action={
            <Link to="/" className="btn btn-secondary">
              Retour à l'accueil
            </Link>
          }
        />
      </div>
    );
  }

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div ref={topRef} className="scroll-mt-28">
      {/* Progression */}
      <div className="mb-10">
        <ol className="mb-4 grid grid-cols-3 gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em]">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className={cn("flex items-center gap-2", i <= step ? "text-ink" : "text-stone")}
              aria-current={i === step ? "step" : undefined}
            >
              <span
                className={cn(
                  "grid h-7 w-7 shrink-0 place-items-center rounded-full border font-display text-xs transition-colors",
                  i < step
                    ? "border-gold bg-gold text-ink"
                    : i === step
                      ? "border-ink bg-ink text-ivory"
                      : "border-line bg-white",
                )}
              >
                {i + 1}
              </span>
              <span className="hidden sm:inline">{s.title}</span>
            </li>
          ))}
        </ol>
        <div
          className="h-[3px] overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-valuenow={step + 1}
          aria-valuetext={`Étape ${step + 1} sur ${steps.length} : ${steps[step]!.title}`}
        >
          <motion.div
            className="h-full origin-left rounded-full"
            style={{ background: "var(--gradient-gold)" }}
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: EASE_LUXE }}
          />
        </div>
      </div>

      <form
        onSubmit={(e) => {
          if (step < steps.length - 1) {
            e.preventDefault();
            void next();
            return;
          }
          void handleSubmit(onSubmit)(e);
        }}
        noValidate
        className="relative"
      >
        <Honeypot value={honeypot} onChange={setHoneypot} />
        <h2 ref={headingRef} tabIndex={-1} className="mb-8 text-2xl outline-none md:text-[1.75rem]">
          <span className="sr-only">
            Étape {step + 1} sur {steps.length} :{" "}
          </span>
          {steps[step]!.title}
        </h2>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: reduce ? 0 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduce ? 0 : -24 }}
            transition={{ duration: 0.35, ease: EASE_LUXE }}
            className="grid gap-6"
          >
            {step === 0 && (
              <>
                <fieldset aria-describedby={errors.services ? "err-services" : undefined}>
                  <legend className="mb-3 text-[0.8125rem] font-semibold text-ink">
                    Type de service{" "}
                    <span className="text-gold-ink" aria-hidden="true">
                      *
                    </span>
                    <span className="ml-2 font-normal text-muted-foreground">
                      (plusieurs choix possibles)
                    </span>
                  </legend>
                  <Controller
                    control={control}
                    name="services"
                    render={({ field }) => (
                      <div className="flex flex-wrap gap-2.5">
                        {services.map((s) => (
                          <ChoiceChip
                            key={s.slug}
                            type="checkbox"
                            name="services"
                            value={s.slug}
                            checked={field.value.includes(s.slug)}
                            onChange={(checked) =>
                              field.onChange(
                                checked
                                  ? [...field.value, s.slug]
                                  : field.value.filter((v) => v !== s.slug),
                              )
                            }
                          >
                            {s.shortTitle}
                          </ChoiceChip>
                        ))}
                      </div>
                    )}
                  />
                  {errors.services && (
                    <p
                      id="err-services"
                      className="mt-2 text-[0.8125rem] font-medium text-destructive"
                    >
                      {errors.services.message}
                    </p>
                  )}
                </fieldset>
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField label="Type de locaux" required error={errors.typeLocaux?.message}>
                    <select className="field" {...register("typeLocaux")}>
                      <option value="">Sélectionner…</option>
                      {premisesTypes.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </FormField>
                  <FormField
                    label="Surface approximative (m²)"
                    hint="Une estimation suffit."
                    error={errors.surface?.message}
                  >
                    <input
                      className="field"
                      inputMode="decimal"
                      placeholder="ex. : 250"
                      {...register("surface")}
                    />
                  </FormField>
                </div>
                <fieldset aria-describedby={errors.frequence ? "err-frequence" : undefined}>
                  <legend className="mb-3 text-[0.8125rem] font-semibold text-ink">
                    Fréquence souhaitée{" "}
                    <span className="text-gold-ink" aria-hidden="true">
                      *
                    </span>
                  </legend>
                  <Controller
                    control={control}
                    name="frequence"
                    render={({ field }) => (
                      <div className="flex flex-wrap gap-2.5" role="radiogroup">
                        {frequencies.map((f) => (
                          <ChoiceChip
                            key={f}
                            type="radio"
                            name="frequence"
                            value={f}
                            checked={field.value === f}
                            onChange={() => field.onChange(f)}
                          >
                            {f}
                          </ChoiceChip>
                        ))}
                      </div>
                    )}
                  />
                  {errors.frequence && (
                    <p
                      id="err-frequence"
                      className="mt-2 text-[0.8125rem] font-medium text-destructive"
                    >
                      {errors.frequence.message}
                    </p>
                  )}
                </fieldset>
              </>
            )}

            {step === 1 && (
              <>
                <FormField label="Adresse du site" error={errors.adresse?.message}>
                  <input className="field" autoComplete="street-address" {...register("adresse")} />
                </FormField>
                <div className="grid gap-6 md:grid-cols-[180px_1fr]">
                  <FormField label="Code postal" required error={errors.codePostal?.message}>
                    <input
                      className="field"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      maxLength={5}
                      {...register("codePostal")}
                    />
                  </FormField>
                  <FormField label="Ville" required error={errors.ville?.message}>
                    <input className="field" autoComplete="address-level2" {...register("ville")} />
                  </FormField>
                </div>
                <FormField
                  label="Date de démarrage souhaitée"
                  error={errors.dateSouhaitee?.message}
                >
                  <input className="field md:max-w-xs" type="date" {...register("dateSouhaitee")} />
                </FormField>
                <FormField
                  label="Commentaires"
                  hint="Contraintes d'accès, horaires, zones prioritaires, attentes particulières…"
                  error={errors.message?.message}
                >
                  <textarea className="field min-h-36 resize-y" {...register("message")} />
                </FormField>
              </>
            )}

            {step === 2 && (
              <>
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    label="Société"
                    required
                    error={errors.societe?.message}
                    className="md:col-span-2"
                  >
                    <input className="field" autoComplete="organization" {...register("societe")} />
                  </FormField>
                  <FormField label="Nom" required error={errors.nom?.message}>
                    <input className="field" autoComplete="family-name" {...register("nom")} />
                  </FormField>
                  <FormField label="Prénom" required error={errors.prenom?.message}>
                    <input className="field" autoComplete="given-name" {...register("prenom")} />
                  </FormField>
                  <FormField label="Fonction" error={errors.fonction?.message}>
                    <input
                      className="field"
                      autoComplete="organization-title"
                      {...register("fonction")}
                    />
                  </FormField>
                  <FormField label="Téléphone" required error={errors.telephone?.message}>
                    <input
                      className="field"
                      type="tel"
                      autoComplete="tel"
                      {...register("telephone")}
                    />
                  </FormField>
                  <FormField
                    label="E-mail professionnel"
                    required
                    error={errors.email?.message}
                    className="md:col-span-2"
                  >
                    <input
                      className="field"
                      type="email"
                      autoComplete="email"
                      {...register("email")}
                    />
                  </FormField>
                </div>
                <div>
                  <label className="flex cursor-pointer gap-3 text-sm leading-relaxed text-ink/80">
                    <input
                      type="checkbox"
                      className="mt-1 h-5 w-5 shrink-0 accent-[var(--ink)]"
                      aria-invalid={errors.consentement ? true : undefined}
                      aria-describedby={errors.consentement ? "err-consent" : undefined}
                      {...register("consentement")}
                    />
                    <span>
                      <ConsentText />{" "}
                      <span className="text-gold-ink" aria-hidden="true">
                        *
                      </span>
                    </span>
                  </label>
                  {errors.consentement && (
                    <p
                      id="err-consent"
                      className="mt-2 text-[0.8125rem] font-medium text-destructive"
                    >
                      {errors.consentement.message}
                    </p>
                  )}
                </div>
                {status === "error" && <SubmitError />}
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <p className="sr-only" aria-live="polite">
          {Object.keys(errors).length > 0 ? "Certains champs doivent être corrigés." : ""}
        </p>

        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="btn btn-secondary"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Étape précédente
            </button>
          ) : (
            <p className="text-xs text-muted-foreground">
              <span className="text-gold-ink">*</span> Champs obligatoires
            </p>
          )}
          {step < steps.length - 1 ? (
            <button type="submit" className="btn btn-primary">
              Continuer
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Envoi en cours…
                </>
              ) : (
                <>
                  Envoyer ma demande
                  <Send className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
