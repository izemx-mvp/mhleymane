import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DiamondRule } from "./motifs";
import { Reveal } from "./Reveal";

/** Petit libellé en capitales + filet losange */
export function SectionEyebrow({
  children,
  tone = "light",
  align = "center",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  align?: "center" | "start";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      <p className={cn("eyebrow", tone === "dark" && "eyebrow-light")}>{children}</p>
      <DiamondRule align={align} width="sm" />
    </div>
  );
}

/** Titre de section : eyebrow + H2 + chapeau optionnel */
export function SectionTitle({
  eyebrow,
  title,
  lead,
  tone = "light",
  align = "center",
  className,
  as: Heading = "h2",
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "light" | "dark";
  align?: "center" | "start";
  className?: string;
  as?: "h1" | "h2";
  id?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-12 flex max-w-3xl flex-col gap-6 md:mb-16",
        align === "center" ? "mx-auto items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow && (
        <SectionEyebrow tone={tone} align={align}>
          {eyebrow}
        </SectionEyebrow>
      )}
      <Heading id={id} className={tone === "dark" ? "text-ivory" : "text-ink"}>
        {title}
      </Heading>
      {lead && (
        <p
          className={cn(
            "max-w-2xl text-lg leading-relaxed",
            tone === "dark" ? "text-ivory/75" : "text-muted-foreground",
          )}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}

/** Mot en dégradé or dans un titre */
export function GoldWord({ children }: { children: ReactNode }) {
  return <span className="text-gold-gradient">{children}</span>;
}
