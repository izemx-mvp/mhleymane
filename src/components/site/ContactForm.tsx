import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { site } from "@/config/site";
import { submitLead } from "@/lib/forms";
import { ConsentText, FormField, Honeypot, SubmitError, SuccessState } from "./form-ui";

const schema = z.object({
  nom: z.string().trim().min(2, "Indiquez votre nom.").max(120),
  email: z.string().trim().email("Adresse e-mail invalide."),
  telephone: z
    .string()
    .trim()
    .refine(
      (v) => v === "" || /^(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/.test(v),
      "Numéro de téléphone invalide (ex. : 06 12 34 56 78).",
    ),
  sujet: z.string().trim().min(3, "Indiquez l'objet de votre message.").max(150),
  message: z
    .string()
    .trim()
    .min(10, "Votre message doit comporter au moins 10 caractères.")
    .max(3000),
  consentement: z
    .boolean()
    .refine((v) => v, "Votre accord est nécessaire pour traiter la demande."),
});

type Values = z.infer<typeof schema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "success">("idle");
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef(Date.now());
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      nom: "",
      email: "",
      telephone: "",
      sujet: "",
      message: "",
      consentement: false,
    },
  });

  const onSubmit = async (v: Values) => {
    setStatus("sending");
    const result = await submitLead({
      source: "formulaire_contact",
      subject: `Contact — ${v.sujet}`,
      honeypot,
      startedAt: startedAt.current,
      fields: {
        nom: { label: "Nom", value: v.nom },
        email: { label: "E-mail", value: v.email },
        telephone: { label: "Téléphone", value: v.telephone },
        sujet: { label: "Sujet", value: v.sujet },
        message: { label: "Message", value: v.message },
        consentement: { label: "Consentement RGPD", value: v.consentement },
      },
    });
    if (result.ok) {
      setStatus("success");
    } else setStatus("error");
  };

  if (status === "success") {
    return (
      <SuccessState
        title="Message envoyé"
        text={`Merci, nous revenons vers vous sous ${site.responseDelay}.`}
        action={
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              reset();
              startedAt.current = Date.now();
              setStatus("idle");
            }}
          >
            Écrire un autre message
          </button>
        }
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="relative grid gap-6 md:grid-cols-2"
    >
      <Honeypot value={honeypot} onChange={setHoneypot} />
      <FormField label="Nom et prénom" required error={errors.nom?.message}>
        <input className="field" autoComplete="name" {...register("nom")} />
      </FormField>
      <FormField label="Téléphone" error={errors.telephone?.message}>
        <input className="field" type="tel" autoComplete="tel" {...register("telephone")} />
      </FormField>
      <FormField label="E-mail" required error={errors.email?.message} className="md:col-span-2">
        <input className="field" type="email" autoComplete="email" {...register("email")} />
      </FormField>
      <FormField label="Sujet" required error={errors.sujet?.message} className="md:col-span-2">
        <input className="field" {...register("sujet")} />
      </FormField>
      <FormField label="Message" required error={errors.message?.message} className="md:col-span-2">
        <textarea className="field min-h-40 resize-y" {...register("message")} />
      </FormField>
      <div className="md:col-span-2">
        <label className="flex cursor-pointer gap-3 text-sm leading-relaxed text-ink/80">
          <input
            type="checkbox"
            className="mt-1 h-5 w-5 shrink-0 accent-[var(--ink)]"
            aria-invalid={errors.consentement ? true : undefined}
            aria-describedby={errors.consentement ? "err-contact-consent" : undefined}
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
            id="err-contact-consent"
            className="mt-2 text-[0.8125rem] font-medium text-destructive"
          >
            {errors.consentement.message}
          </p>
        )}
      </div>
      {status === "error" && (
        <div className="md:col-span-2">
          <SubmitError />
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        {Object.keys(errors).length > 0 ? "Certains champs doivent être corrigés." : ""}
      </p>
      <div className="flex flex-col gap-4 md:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          <span className="text-gold-ink">*</span> Champs obligatoires
        </p>
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Envoi en cours…
            </>
          ) : (
            <>
              Envoyer le message
              <Send className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
