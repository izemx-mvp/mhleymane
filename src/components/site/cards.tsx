import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Service } from "@/data/services";
import type { Sector } from "@/data/sectors";
import { categoryLabel, formatDate, readingTime, type CoverVariant, type Post } from "@/data/posts";
import { Sparkle } from "./motifs";
import { SmartImage } from "./SmartImage";

/* ------------------------------------------------------------------ */
/* ServiceCard                                                         */
/* ------------------------------------------------------------------ */

export function ServiceCard({
  service,
  headingLevel = "h3",
}: {
  service: Service;
  headingLevel?: "h2" | "h3";
}) {
  const Icon = service.icon;
  const H = headingLevel;
  return (
    <article className="card-luxe card-hover group img-zoom flex h-full flex-col overflow-hidden">
      <Sparkle className="absolute right-5 top-5 z-10 h-4 w-4 scale-50 text-gold-light opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100" />
      <SmartImage
        src={service.image.src}
        alt={service.image.alt}
        width={1600}
        height={900}
        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
        className="aspect-[16/10] rounded-t-[17px]"
      >
        <div className="img-overlay pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
      </SmartImage>
      <div className="relative flex flex-1 flex-col px-6 pb-7 pt-10 md:px-7">
        <span className="absolute -top-7 left-6 grid h-14 w-14 place-items-center rounded-full border border-line bg-ivory shadow-soft transition duration-500 group-hover:border-gold md:left-7">
          <Icon
            className="h-6 w-6 text-gold-ink transition duration-500 group-hover:rotate-[-6deg] group-hover:scale-110"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </span>
        <H className="text-xl leading-snug">
          <Link
            to="/services/$slug"
            params={{ slug: service.slug }}
            className="after:absolute after:inset-0 after:rounded-[18px] focus-visible:outline-none"
          >
            {service.title}
          </Link>
        </H>
        <p className="mt-3 line-clamp-2 text-[0.95rem] leading-relaxed text-muted-foreground">
          {service.short}
        </p>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-gold-ink">
          En savoir plus
          <ArrowRight
            className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* SectorCard                                                          */
/* ------------------------------------------------------------------ */

export function SectorCard({ sector }: { sector: Sector }) {
  const Icon = sector.icon;
  return (
    <article className="group img-zoom relative h-full min-h-[22rem] overflow-hidden rounded-[18px] border border-line bg-ink text-ivory transition duration-500 hover:-translate-y-1 hover:border-gold focus-within:border-gold">
      <SmartImage
        src={sector.image.src}
        alt={sector.image.alt}
        width={1600}
        height={900}
        sizes="(min-width: 1024px) 260px, (min-width: 640px) 50vw, 85vw"
        className="absolute inset-0"
        fallback="none"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />
      </SmartImage>
      <div className="relative flex h-full flex-col justify-end p-6">
        <Icon className="h-7 w-7 text-gold" strokeWidth={1.4} aria-hidden="true" />
        <h3 className="mt-4 text-lg uppercase tracking-[0.06em] text-ivory">
          <Link
            to="/secteurs"
            hash={sector.slug}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {sector.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ivory/75">{sector.short}</p>
        <span
          className="mt-5 h-px w-10 bg-gold transition-all duration-500 group-hover:w-20"
          aria-hidden="true"
        />
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* ArticleCover (SVG abstrait, utilisé si la photo est absente)        */
/* ------------------------------------------------------------------ */

export function ArticleCover({
  variant,
  label,
  className,
}: {
  variant: CoverVariant;
  label?: string;
  className?: string;
}) {
  const dark = variant === "goutte" || variant === "ondes" || variant === "eclat";
  const id = `cv-${variant}`;
  return (
    <div
      className={cn("absolute inset-0", dark ? "bg-ink" : "bg-sand", className)}
      aria-hidden="true"
    >
      <svg viewBox="0 0 600 315" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <defs>
          <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8C6A1E" />
            <stop offset="0.4" stopColor="#C9A13B" />
            <stop offset="0.55" stopColor="#F3DE8A" />
            <stop offset="0.75" stopColor="#C9A13B" />
            <stop offset="1" stopColor="#8C6A1E" />
          </linearGradient>
          <radialGradient id={`${id}-r`} cx="0.8" cy="0.1" r="0.9">
            <stop
              offset="0"
              stopColor={dark ? "#C9A13B" : "#ffffff"}
              stopOpacity={dark ? 0.22 : 0.9}
            />
            <stop offset="1" stopColor={dark ? "#111110" : "#F2ECDF"} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="600" height="315" fill={`url(#${id}-r)`} />
        {variant === "reflet" &&
          [0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1={120 + i * 70}
              y1="-20"
              x2={20 + i * 70}
              y2="340"
              stroke={`url(#${id}-g)`}
              strokeWidth={i === 2 ? 2 : 0.8}
              opacity={i === 2 ? 1 : 0.5}
            />
          ))}
        {variant === "grille" &&
          Array.from({ length: 6 }).map((_, i) => (
            <rect
              key={i}
              x={150 + (i % 3) * 110}
              y={70 + Math.floor(i / 3) * 95}
              width="90"
              height="75"
              rx="4"
              fill="none"
              stroke={`url(#${id}-g)`}
              strokeWidth={i === 4 ? 1.8 : 0.8}
              opacity={i === 4 ? 1 : 0.55}
            />
          ))}
        {variant === "arches" &&
          [0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M${180 + i * 90} 260 V140 a45 45 0 0 1 90 0 V260`}
              fill="none"
              stroke={`url(#${id}-g)`}
              strokeWidth={i === 1 ? 1.8 : 0.9}
              opacity={i === 1 ? 1 : 0.6}
            />
          ))}
        {variant === "goutte" && (
          <>
            <path
              d="M300 40C300 40 230 140 230 190a70 70 0 0 0 140 0C370 140 300 40 300 40Z"
              fill="none"
              stroke={`url(#${id}-g)`}
              strokeWidth="2"
            />
            <path
              d="M300 80C300 80 255 150 255 188a45 45 0 0 0 90 0C345 150 300 80 300 80Z"
              fill="none"
              stroke={`url(#${id}-g)`}
              strokeWidth="0.8"
              opacity="0.5"
            />
          </>
        )}
        {variant === "ondes" &&
          [0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M-20 ${150 + i * 22} C 150 ${90 + i * 18}, 380 ${230 - i * 10}, 620 ${130 + i * 20}`}
              fill="none"
              stroke={`url(#${id}-g)`}
              strokeWidth={i === 2 ? 1.8 : 0.8}
              opacity={i === 2 ? 1 : 0.5}
            />
          ))}
        {variant === "eclat" &&
          [70, 110, 150].map((r, i) => (
            <circle
              key={r}
              cx="300"
              cy="158"
              r={r}
              fill="none"
              stroke={`url(#${id}-g)`}
              strokeWidth={i === 0 ? 1.8 : 0.8}
              opacity={i === 0 ? 1 : 0.45}
            />
          ))}
        <path
          d="M520 46C521.2 58.6 527.4 64.8 540 66C527.4 67.2 521.2 73.4 520 86C518.8 73.4 512.6 67.2 500 66C512.6 64.8 518.8 58.6 520 46Z"
          fill={`url(#${id}-g)`}
        />
      </svg>
      {label && (
        <span
          className={cn(
            "absolute bottom-4 left-5 font-display text-[0.65rem] font-semibold uppercase tracking-[0.28em]",
            dark ? "text-gold" : "text-gold-ink",
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}

/** Couverture d'article : photo si disponible, sinon composition SVG */
export function PostCoverImage({
  post,
  className,
  priority,
  sizes,
}: {
  post: Post;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const cover = <ArticleCover variant={post.coverVariant} label={categoryLabel(post.category)} />;
  if (!post.coverImage)
    return <div className={cn("relative overflow-hidden", className)}>{cover}</div>;
  return (
    <SmartImage
      src={post.coverImage}
      alt={post.coverAlt}
      width={1200}
      height={630}
      priority={priority ?? false}
      sizes={sizes}
      className={className}
      fallback={cover}
    />
  );
}

/* ------------------------------------------------------------------ */
/* ArticleCard                                                         */
/* ------------------------------------------------------------------ */

export function CategoryChip({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em]",
        tone === "light" ? "border-gold/40 bg-ivory text-gold-ink" : "border-gold/40 text-gold",
      )}
    >
      {children}
    </span>
  );
}

export function ArticleMeta({ post, className }: { post: Post; className?: string }) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem] text-muted-foreground",
        className,
      )}
    >
      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-gold" />
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
        {readingTime(post)} min de lecture
      </span>
    </p>
  );
}

export function ArticleCard({
  post,
  headingLevel = "h3",
}: {
  post: Post;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  return (
    <article className="card-luxe card-hover group img-zoom flex h-full flex-col overflow-hidden">
      <Sparkle className="absolute right-5 top-5 z-10 h-4 w-4 scale-50 text-gold-light opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100" />
      <PostCoverImage
        post={post}
        className="aspect-[1200/630] rounded-t-[17px]"
        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
      />
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div>
          <CategoryChip>{categoryLabel(post.category)}</CategoryChip>
        </div>
        <H className="mt-4 text-lg leading-snug">
          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="after:absolute after:inset-0 after:rounded-[18px] focus-visible:outline-none"
          >
            {post.title}
          </Link>
        </H>
        <p className="mt-3 line-clamp-2 text-[0.95rem] leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <ArticleMeta post={post} className="mt-auto pt-5" />
      </div>
    </article>
  );
}
