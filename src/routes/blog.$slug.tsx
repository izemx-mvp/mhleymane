import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getPost, formatDate } from "@/data/posts";
import { seo } from "@/lib/seo";
import { PostCover, Divider, CtaBand } from "@/components/site/ui";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const p = getPost(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ loaderData, params }) => {
    const p = loaderData && getPost(loaderData.slug);
    if (!p) return { meta: [{ title: "Article introuvable – MHLEYMANE" }, { name: "robots", content: "noindex" }] };
    return {
      ...seo(`${p.title} | Blog MHLEYMANE`, p.excerpt, `/blog/${params.slug}`, "article"),
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: p.title, datePublished: p.date, author: { "@type": "Organization", name: "MHLEYMANE" } }) }],
    };
  },
  component: Article,
});

function Article() {
  const { slug } = Route.useLoaderData();
  const p = getPost(slug)!;
  return (
    <>
      <article className="pb-24 pt-32">
        <div className="mx-auto max-w-3xl px-6">
          <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold-deep"><ArrowLeft className="h-4 w-4" /> Retour au blog</Link>
          <p className="eyebrow mt-8">{p.category} · {formatDate(p.date)} · {p.readTime}</p>
          <h1 className="mt-4 text-3xl leading-tight sm:text-4xl">{p.title}</h1>
          <p className="tagline mt-5 text-xl text-muted-foreground">{p.excerpt}</p>
          <PostCover variant={p.cover} className="mt-10 aspect-[16/8] rounded-lg" />
          <div className="mt-12 space-y-6 text-lg leading-relaxed">
            {p.content.map((b, i) => (
              <div key={i}>
                {b.heading && <h2 className="mb-3 mt-10 text-xl">{b.heading}</h2>}
                <p>{b.text}</p>
              </div>
            ))}
          </div>
          <Divider className="mt-16" />
        </div>
      </article>
      <CtaBand />
    </>
  );
}
