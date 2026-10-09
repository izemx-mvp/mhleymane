import { m, useScroll, useSpring } from "framer-motion";
import { Check, Facebook, Link2, Linkedin, Mail } from "lucide-react";
import { useEffect, useState, type RefObject } from "react";
import { cn } from "@/lib/utils";
import { slugify, type Block } from "@/data/posts";
import { DropletBullet, Sparkle } from "./motifs";

/* ------------------------------------------------------------------ */
/* ReadingProgress — fine ligne dorée sous le header                    */
/* ------------------------------------------------------------------ */

export function ReadingProgress({ target }: { target: RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end end"] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <m.div
      aria-hidden="true"
      className="fixed inset-x-0 top-[68px] z-[49] h-[2px] origin-left"
      style={{ scaleX, background: "var(--gradient-gold)" }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Contenu de l'article                                                 */
/* ------------------------------------------------------------------ */

export type Heading = { id: string; text: string; level: 2 | 3 };

export const extractHeadings = (blocks: Block[]): Heading[] =>
  blocks
    .filter((b): b is Extract<Block, { type: "h2" | "h3" }> => b.type === "h2" || b.type === "h3")
    .map((b) => ({ id: slugify(b.text), text: b.text, level: b.type === "h2" ? 2 : 3 }));

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="article-prose">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "paragraph":
            return <p key={i}>{b.text}</p>;
          case "h2":
            return (
              <h2 key={i} id={slugify(b.text)} className="scroll-mt-28">
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} id={slugify(b.text)} className="scroll-mt-28">
                {b.text}
              </h3>
            );
          case "list": {
            const items = b.items.map((item, j) => (
              <li key={j} className="flex gap-3.5">
                {b.ordered ? (
                  <span className="mt-[0.1em] min-w-6 font-display text-base text-gold-ink">
                    {String(j + 1).padStart(2, "0")}
                  </span>
                ) : (
                  <DropletBullet className="mt-[0.55em]" />
                )}
                <span>{item}</span>
              </li>
            ));
            return b.ordered ? (
              <ol key={i} className="space-y-3">
                {items}
              </ol>
            ) : (
              <ul key={i} className="space-y-3">
                {items}
              </ul>
            );
          }
          case "quote":
            return (
              <figure key={i} className="relative !my-12 border-y border-line py-8 text-center">
                <Sparkle className="mx-auto mb-4 h-4 w-4 text-gold" />
                <blockquote className="tagline text-[1.75rem] leading-snug text-ink md:text-[2rem]">
                  « {b.text} »
                </blockquote>
                {b.cite && (
                  <figcaption className="mt-4 text-sm text-muted-foreground">— {b.cite}</figcaption>
                )}
              </figure>
            );
          case "callout":
            return (
              <aside
                key={i}
                className="rounded-r-2xl border-l-2 border-gold bg-sand px-6 py-5 text-[1.0625rem]"
              >
                {b.title && (
                  <p className="mb-1 font-display text-sm font-semibold uppercase tracking-[0.16em] text-gold-ink">
                    {b.title}
                  </p>
                )}
                <p className="!mt-0">{b.text}</p>
              </aside>
            );
          case "image":
            return (
              <figure key={i}>
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-sand">
                  {b.src ? (
                    <img
                      src={b.src}
                      alt={b.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center font-display text-xs uppercase tracking-[0.3em] text-gold-ink">
                      Photo à fournir
                    </div>
                  )}
                </div>
                {b.caption && (
                  <figcaption className="mt-3 text-sm text-muted-foreground">
                    {b.caption}
                  </figcaption>
                )}
              </figure>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sommaire automatique avec titre actif                                */
/* ------------------------------------------------------------------ */

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;
  return (
    <nav aria-label="Sommaire de l'article">
      <p className="eyebrow mb-4">Sommaire</p>
      <ol className="space-y-1 border-l border-line">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              aria-current={active === h.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l py-1.5 text-sm leading-snug transition-colors duration-300",
                h.level === 3 ? "pl-7" : "pl-4",
                active === h.id
                  ? "border-gold font-semibold text-ink"
                  : "border-transparent text-muted-foreground hover:text-ink",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Partage                                                              */
/* ------------------------------------------------------------------ */

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const btn =
    "grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink transition duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold-ink";
  const [copied, setCopied] = useState<"idle" | "ok" | "error">("idle");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied("ok");
    } catch {
      setCopied("error");
    }
    setTimeout(() => setCopied("idle"), 2500);
  };
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="mr-1 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-ink/70">
        Partager
      </span>
      <a
        className={btn}
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Partager sur LinkedIn (nouvelle fenêtre)"
      >
        <Linkedin className="h-4 w-4" aria-hidden="true" />
      </a>
      <a
        className={btn}
        href={`https://www.facebook.com/sharer/sharer.php?u=${u}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Partager sur Facebook (nouvelle fenêtre)"
      >
        <Facebook className="h-4 w-4" aria-hidden="true" />
      </a>
      <a className={btn} href={`mailto:?subject=${t}&body=${u}`} aria-label="Partager par e-mail">
        <Mail className="h-4 w-4" aria-hidden="true" />
      </a>
      <button type="button" className={btn} onClick={copy} aria-label="Copier le lien de l'article">
        {copied === "ok" ? (
          <Check className="h-4 w-4 text-gold-ink" aria-hidden="true" />
        ) : (
          <Link2 className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
      <span role="status" aria-live="polite" className="text-[0.8125rem] text-muted-foreground">
        {copied === "ok" ? "Lien copié" : copied === "error" ? "Copie impossible" : ""}
      </span>
    </div>
  );
}
