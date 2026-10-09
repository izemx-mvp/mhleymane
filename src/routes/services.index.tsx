import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { seo } from "@/lib/seo";
import { PageHero, Reveal, CtaBand } from "@/components/site/ui";

export const Route = createFileRoute("/services/")({
  head: () => seo("Nos services de nettoyage – MHLEYMANE", "Bureaux, commerces, restaurants, industrie, parties communes et remise en état : découvrez les prestations de MHLEYMANE.", "/services"),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Nos prestations" title="Services de nettoyage" tagline="Six expertises pour accompagner tous les environnements professionnels." />
      <section className="py-24">
        <div className="mx-auto max-w-5xl space-y-6 px-6">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <Link to="/services/$slug" params={{ slug: s.slug }} className="card-lift group grid items-center gap-6 rounded-lg border bg-card p-8 sm:grid-cols-[auto_minmax(0,1fr)_auto]">
                <div className="grid h-16 w-16 place-items-center rounded-full border border-gold/50"><s.icon className="h-7 w-7 text-gold-deep" strokeWidth={1.3} /></div>
                <div className="min-w-0">
                  <h2 className="text-lg">{s.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gold-deep transition group-hover:translate-x-1" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
