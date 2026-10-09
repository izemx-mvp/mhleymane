import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, CalendarClock } from "lucide-react";
import { getService, services } from "@/data/services";
import { seo } from "@/lib/seo";
import { PageHero, Reveal, CtaBand, Droplet } from "@/components/site/ui";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const s = getService(params.slug);
    if (!s) throw notFound();
    return { slug: s.slug };
  },
  head: ({ loaderData, params }) => {
    const s = loaderData && getService(loaderData.slug);
    if (!s) return { meta: [{ title: "Service introuvable – MHLEYMANE" }, { name: "robots", content: "noindex" }] };
    return seo(`${s.title} – MHLEYMANE`, `${s.short} Société de nettoyage à Villepreux (78).`, `/services/${params.slug}`);
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useLoaderData();
  const s = getService(slug)!;
  return (
    <>
      <PageHero eyebrow="Service" title={s.title} tagline={s.short} />
      <section className="py-24">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div>
            <Reveal><p className="text-lg leading-relaxed">{s.intro}</p></Reveal>
            <Reveal><h2 className="mb-6 mt-14 text-xl">Ce qui est inclus</h2></Reveal>
            <ul className="grid gap-4 sm:grid-cols-2">
              {s.included.map((it, i) => (
                <Reveal key={it} delay={i * 0.05}>
                  <li className="flex gap-3 rounded-lg border bg-card p-4 text-sm"><Check className="h-5 w-5 shrink-0 text-gold-deep" />{it}</li>
                </Reveal>
              ))}
            </ul>
            <Reveal><h2 className="mb-6 mt-14 text-xl">Fréquences possibles</h2></Reveal>
            <div className="flex flex-wrap gap-3">
              {s.frequencies.map((f) => <span key={f} className="flex items-center gap-2 rounded-full border border-gold/50 px-4 py-2 text-sm"><CalendarClock className="h-4 w-4 text-gold-deep" />{f}</span>)}
            </div>
          </div>
          <aside className="h-fit rounded-lg bg-ink p-8 text-ink-foreground lg:sticky lg:top-28">
            <Droplet className="h-10 w-8 text-gold" />
            <h3 className="mt-5 text-lg text-gold-light">Un besoin précis ?</h3>
            <p className="mt-3 text-sm text-ink-foreground/75">Recevez une proposition adaptée à vos locaux et à votre rythme.</p>
            <Link to="/devis" search={{ service: s.slug }} className="btn-gold mt-6 block rounded-md py-3 text-center text-xs font-semibold uppercase tracking-widest">Demander un devis</Link>
            <div className="mt-8 border-t border-ink-foreground/10 pt-6">
              <p className="eyebrow mb-3 text-gold">Autres services</p>
              <ul className="space-y-2 text-sm">
                {services.filter((x) => x.slug !== s.slug).map((x) => <li key={x.slug}><Link to="/services/$slug" params={{ slug: x.slug }} className="hover:text-gold-light">{x.title}</Link></li>)}
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
