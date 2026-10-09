import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Field({ label, error, children, full }: { label: string; error?: string; children: ReactNode; full?: boolean }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

export function Consent({ checked, onChange, error }: { checked: boolean; onChange: (v: boolean) => void; error?: string }) {
  return (
    <div className="sm:col-span-2">
      <label className="flex gap-3 text-sm text-muted-foreground">
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-1 h-4 w-4 accent-[var(--gold-deep)]" />
        <span>J'accepte que mes données soient utilisées pour traiter ma demande, conformément à la <Link to="/politique-de-confidentialite" className="text-gold-deep underline">politique de confidentialité</Link>.</span>
      </label>
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </div>
  );
}

export function Success({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg border border-gold/50 bg-card p-12 text-center">
      <CheckCircle2 className="mx-auto h-12 w-12 text-gold-deep" strokeWidth={1.3} />
      <h2 className="mt-6 text-xl">{title}</h2>
      <p className="tagline mt-3 text-lg text-muted-foreground">{text}</p>
    </div>
  );
}

export const errorsFrom = (issues: { path: (string | number)[]; message: string }[]) =>
  Object.fromEntries(issues.map((i) => [String(i.path[0]), i.message]));
