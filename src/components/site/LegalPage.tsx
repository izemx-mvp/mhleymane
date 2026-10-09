import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { isPlaceholder } from "@/config/site";
import type { Crumb } from "@/lib/seo";
import { PageHero } from "./PageHero";

export function LegalPage({
  title,
  lead,
  crumbs,
  updated,
  children,
}: {
  title: string;
  lead?: string;
  crumbs: Crumb[];
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero crumbs={crumbs} eyebrow="Informations légales" title={title} lead={lead} />
      <section className="bg-ivory py-16 md:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm text-muted-foreground">Dernière mise à jour : {updated}</p>
            <div className="mt-10 space-y-12">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line pt-10">
      <h2 className="text-[1.25rem] md:text-[1.4rem]">{title}</h2>
      <div className="mt-5 space-y-4 leading-relaxed text-ink/80 [&_a]:font-semibold [&_a]:text-gold-ink [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
        {children}
      </div>
    </section>
  );
}

/** Tableau « libellé / valeur » ; les valeurs à compléter sont affichées en gris */
export function LegalTable({ rows }: { rows: { label: string; value: ReactNode }[] }) {
  return (
    <dl className="divide-y divide-line overflow-hidden rounded-[18px] border border-line bg-white">
      {rows.map((r) => (
        <div key={r.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[220px_1fr] sm:gap-6">
          <dt className="text-sm font-semibold text-ink">{r.label}</dt>
          <dd
            className={cn(
              "text-sm",
              typeof r.value === "string" && isPlaceholder(r.value)
                ? "text-stone-ink"
                : "text-ink/80",
            )}
          >
            {r.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
