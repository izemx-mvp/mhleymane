import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold sm:w-24" />
      <span className="h-2 w-2 rotate-45 bg-gold" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold sm:w-24" />
    </div>
  );
}

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0Z" fill="currentColor" />
    </svg>
  );
}

export function Droplet({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 32" className={className} aria-hidden>
      <path d="M12 1 C12 1 2 14 2 21 a10 10 0 0 0 20 0 C22 14 12 1 12 1Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({ eyebrow, title, tagline, light }: { eyebrow?: string; title: string; tagline?: string; light?: boolean }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className={`text-2xl sm:text-4xl ${light ? "text-ink-foreground" : "text-foreground"}`}>{title}</h2>
      <Divider className="my-5" />
      {tagline && <p className={`tagline text-xl ${light ? "text-ink-foreground/75" : "text-muted-foreground"}`}>{tagline}</p>}
    </Reveal>
  );
}

export function PageHero({ eyebrow, title, tagline }: { eyebrow: string; title: string; tagline?: string }) {
  return (
    <section className="relative overflow-hidden bg-sand pb-20 pt-36 sm:pt-44">
      <GoldWaves className="absolute inset-0 h-full w-full opacity-60" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p className="eyebrow mb-5">{eyebrow}</p>
        <h1 className="text-3xl leading-tight sm:text-5xl">{title}</h1>
        <Divider className="my-6" />
        {tagline && <p className="tagline mx-auto max-w-2xl text-xl text-muted-foreground sm:text-2xl">{tagline}</p>}
      </div>
    </section>
  );
}

export function GoldWaves({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <defs>
        <linearGradient id="gw" x1="0" x2="1">
          <stop offset="0" stopColor="var(--gold-deep)" stopOpacity="0" />
          <stop offset="0.5" stopColor="var(--gold)" stopOpacity="0.55" />
          <stop offset="1" stopColor="var(--gold-deep)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M-50 ${360 + i * 40} C 300 ${200 + i * 30}, 700 ${520 - i * 20}, 1250 ${300 + i * 35}`} fill="none" stroke="url(#gw)" strokeWidth={1 + (i % 2)} />
      ))}
    </svg>
  );
}

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-ink-foreground">
      <GoldWaves className="absolute inset-0 h-full w-full opacity-40" />
      <Reveal className="relative mx-auto max-w-3xl px-6 text-center">
        <Sparkle className="mx-auto mb-6 h-6 w-6 text-gold" />
        <h2 className="text-2xl sm:text-4xl">Un projet d'entretien pour vos locaux ?</h2>
        <p className="tagline mt-5 text-xl text-ink-foreground/75">Décrivez-nous vos besoins, nous vous adressons une proposition sur mesure.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/devis" className="btn-gold rounded-md px-8 py-3.5 text-sm font-semibold uppercase tracking-widest">Demander un devis</Link>
          <Link to="/contact" className="rounded-md border border-gold/60 px-8 py-3.5 text-sm font-semibold uppercase tracking-widest text-gold-light transition hover:bg-gold/10">Nous contacter</Link>
        </div>
      </Reveal>
    </section>
  );
}

export function PostCover({ variant, className = "" }: { variant: number; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-ink ${className}`}>
      <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id={`pc${variant}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--gold-deep)" />
            <stop offset="0.5" stopColor="var(--gold-light)" />
            <stop offset="1" stopColor="var(--gold-deep)" />
          </linearGradient>
        </defs>
        {variant === 0 && [0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={60 + i * 50} y={70 + (i % 2) * 20} width="30" height={110 - (i % 2) * 20} fill="none" stroke={`url(#pc${variant})`} />)}
        {variant === 1 && [40, 70, 100].map((r) => <circle key={r} cx="200" cy="125" r={r} fill="none" stroke={`url(#pc${variant})`} />)}
        {variant === 2 && [0, 1, 2, 3].map((i) => <path key={i} d={`M0 ${80 + i * 30} Q200 ${10 + i * 40} 400 ${100 + i * 25}`} fill="none" stroke={`url(#pc${variant})`} />)}
        {variant === 3 && <path d="M200 40 C200 40 140 120 140 160 a60 60 0 0 0 120 0 C260 120 200 40 200 40Z" fill="none" stroke={`url(#pc${variant})`} strokeWidth="2" />}
        <path d="M330 40 C331 52 336 57 348 58 C336 59 331 64 330 76 C329 64 324 59 312 58 C324 57 329 52 330 40Z" fill={`url(#pc${variant})`} />
      </svg>
    </div>
  );
}
