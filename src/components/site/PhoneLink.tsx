import type { ReactNode } from "react";
import { site, phoneHref } from "@/config/site";

/** Lien d'appel ; texte simple tant que le numéro n'est pas renseigné dans site.ts */
export function PhoneLink({ className, children }: { className?: string; children?: ReactNode }) {
  const content = children ?? site.phone;
  if (!phoneHref) return <span className={className}>{content}</span>;
  return (
    <a href={phoneHref} className={className}>
      {content}
    </a>
  );
}
