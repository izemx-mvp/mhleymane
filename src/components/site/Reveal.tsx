import { m, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const EASE_LUXE = [0.22, 1, 0.36, 1] as const;

const VIEWPORT = { once: true, amount: 0.2 } as const;

/** Variantes « fade up 24 px, 0,6 s » — simple fondu si mouvement réduit */
export function useRevealVariants(delay = 0): Variants {
  const reduce = useReducedMotion();
  return {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.3 : 0.6, ease: EASE_LUXE, delay },
    },
  };
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section" | "article" | "header";
};

/** Apparition au défilement (déclenchée une fois, à 20 % de visibilité) */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const variants = useRevealVariants(delay);
  const Comp = m[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={variants}
    >
      {children}
    </Comp>
  );
}

/** Groupe avec décalage de 0,08 s entre les enfants <RevealItem> */
export function RevealGroup({
  children,
  className,
  as = "div",
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol" | "dl";
  stagger?: number;
}) {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const variants = useRevealVariants();
  const Comp = m[as];
  return (
    <Comp className={className} variants={variants}>
      {children}
    </Comp>
  );
}
