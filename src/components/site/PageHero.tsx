import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DiamondRule, Droplet } from "./motifs";
import { SmartImage } from "./SmartImage";
import type { Crumb } from "@/lib/seo";

/** Lien interne vers un chemin calculé (ex. "/services/nettoyage-bureaux") */
export function PathLink({
  to,
  children,
  className,
  ...rest
}: {
  to: string;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
  onClick?: () => void;
}) {
  // Chemin avec paramètres de recherche : lien classique
  if (to.includes("?")) {
    return (
      <a href={to} className={className} {...rest}>
        {children}
      </a>
    );
  }
  // Les chemins sont validés par nos données ; le routeur les résout à l'exécution.
  return (
    <Link to={to as "/"} className={className} {...rest}>
      {children}
    </Link>
  );
}

export function Breadcrumbs({ items, tone = "dark" }: { items: Crumb[]; tone?: "dark" | "light" }) {
  return (
    <nav aria-label="Fil d'Ariane">
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1.5 text-[0.8125rem]",
          tone === "dark" ? "text-ivory/65" : "text-muted-foreground",
        )}
      >
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1.5">
              {last ? (
                <span
                  aria-current="page"
                  className={tone === "dark" ? "text-gold" : "text-gold-ink"}
                >
                  {c.name}
                </span>
              ) : (
                <>
                  <PathLink
                    to={c.path}
                    className={cn(
                      "link-gold",
                      tone === "dark" ? "hover:text-ivory" : "hover:text-ink",
                    )}
                  >
                    {c.name}
                  </PathLink>
                  <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Hero compact des pages intérieures (fond ink) */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  image,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs: Crumb[];
  image?: { src: string; alt: string } | undefined;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink pb-16 pt-[calc(var(--header-h)+3.5rem)] text-ivory md:pb-24 md:pt-[calc(var(--header-h)+5rem)]">
      {image && (
        <SmartImage
          src={image.src}
          alt=""
          width={1600}
          height={900}
          priority
          fallback="none"
          className="absolute inset-0 -z-10"
          imgClassName="opacity-35 animate-slow-zoom"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        </SmartImage>
      )}
      {/* Gouttes et reflets en arrière-plan */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 80% at 85% 10%, rgb(201 161 59 / 0.14), transparent 60%), radial-gradient(50% 60% at 0% 100%, rgb(201 161 59 / 0.08), transparent 70%)",
          }}
        />
        <Droplet
          className="absolute -right-10 top-10 h-[22rem] w-64 text-gold/15 md:right-[6%]"
          strokeWidth={0.6}
        />
      </div>
      <div className="container-x">
        <div className="animate-fade-up">
          <Breadcrumbs items={crumbs} />
        </div>
        <div className="mt-10 max-w-3xl animate-fade-up [animation-delay:80ms]">
          {eyebrow && <p className="eyebrow eyebrow-light mb-5">{eyebrow}</p>}
          <h1 className="text-ivory">{title}</h1>
          <DiamondRule align="start" width="lg" className="mt-7" />
          {lead && (
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ivory/75 md:text-xl">
              {lead}
            </p>
          )}
          {children && <div className="mt-9">{children}</div>}
        </div>
      </div>
    </section>
  );
}
