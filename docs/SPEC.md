Build a premium, multi-page showcase website (site vitrine) for MHLEYMANE, a French cleaning company (Société de Nettoyage), SAS founded in April 2021, headquartered at 2 Rue du Docteur Alexandre, 78450 Villepreux (Yvelines, Île-de-France), run by Mme Mariam Sow. MHLEYMANE delivers professional cleaning and hygiene services for offices, commercial premises, shops, restaurants and industrial sites (nettoyage courant des bâtiments + nettoyage industriel). The goal of the site: build trust with B2B decision-makers (office managers, shop owners, restaurant managers, facility/site managers, property managers), present the services clearly, and generate quote requests (demandes de devis). All site copy is in French (France), tone: professional, reassuring, precise, premium but approachable — "vous" form, no slang. Visual ambition: a 2026 top-tier site that feels like a high-end service brand, not a template and not a generic cleaning-company site with stock photos of people holding mops.

==================================================
1. DESIGN SYSTEM
==================================================

Palette (derived from the gold monogram logo):
- Gold primary: #C9A13B
- Gold light / highlight: #E9CF7A
- Gold deep / shadow: #8C6A1E
- Gold gradient (for the logo-like accents, key headings words, thin rules, CTA borders): linear-gradient(135deg, #8C6A1E 0%, #C9A13B 35%, #F3DE8A 55%, #C9A13B 75%, #8C6A1E 100%)
- Ink (near-black, main dark surfaces & text): #111110
- Charcoal (secondary dark): #1C1B19
- Ivory (main light background): #FAF7F0
- Sand (alt light sections, cards): #F2ECDF
- Stone (muted text / borders): #8A857A, borders #E3DCCB
- White: #FFFFFF
Use gold sparingly as an accent (rules, icons, key words, CTAs, hover states) — never large flat gold blocks. Alternate ivory sections with a few deep ink sections for rhythm. Ensure WCAG AA contrast: gold text only on ink backgrounds or at large sizes; body text on ivory is ink.

Typography:
- Headings: "Cinzel" (Google Fonts) — matches the classical capital letters of the logo. Use uppercase with letter-spacing 0.04–0.08em for H1/H2; sentence case allowed for H3.
- Accent / editorial lines (short taglines, quotes): "Cormorant Garamond" italic.
- Body & UI: "Manrope" (400/500/600).
- Fluid type scale with clamp(). H1 desktop ~64–72px, mobile ~36–40px.

Signature motifs (taken from the logo, reuse consistently):
- The thin gold horizontal rule with a small diamond/rhombus in the center (as under "MHLEYMANE" in the logo) — used as section dividers and under section eyebrows.
- The water droplet (from the monogram) — used as a bullet/icon motif, in the loader, in the floating call button, and as a subtle large outlined shape in hero backgrounds.
- The four-point sparkle/star (top-right of the logo) — small, used sparingly to "sign" clean results (e.g., next to "Impeccable", on hover of service cards, a slow glint on the hero).
- A soft "shine sweep" effect (a diagonal light reflection passing over gold elements) used on the logo in the header on load and on primary CTAs on hover.

Imagery:
- No stock photos of people. Use abstract, premium visuals instead: clean architectural interiors rendered as soft gradients, generated SVG/CSS compositions (light reflections on surfaces, droplets, glass, polished floors), and line icons.
- Where a photo slot is unavoidable (e.g., realisations), use elegant placeholder blocks with a gold droplet icon and the label "PHOTO À FOURNIR".
- Icons: Lucide, stroke 1.5, gold or ink.

Surfaces & effects:
- Cards: ivory/white with 1px #E3DCCB border, radius 18px, very soft shadow; on hover border becomes gold and a fine gold gradient line appears at the top.
- Glassmorphism ONLY on the sticky header (after scroll) and the mobile menu overlay. Nowhere else.
- Buttons: primary = ink background, ivory text, gold gradient 1px border, shine sweep on hover; secondary = transparent with ink border, gold on hover. Pill radius.
- Generous whitespace, 12-column grid, max content width 1240px.

Logo: use the provided MHLEYMANE logo (gold monogram MH + wordmark + "SOCIÉTÉ DE NETTOYAGE"). Place the file at /public/logo.png. Header uses a compact version (monogram + wordmark); on dark backgrounds the gold logo works as is; on ivory make sure it stays legible (it is gold on transparent).

==================================================
2. GLOBAL ANIMATION RULES
==================================================

- Use Framer Motion throughout.
- Respect prefers-reduced-motion: disable parallax, glint, count-up and page transitions, keep simple fades.
- Scroll reveal: elements fade up 24px, 0.6s, ease [0.22, 1, 0.36, 1], staggered 0.08s within groups, triggered once at 20% visibility.
- Hover states on every interactive element (cards lift 4px + gold border, links get an animated gold underline from left to right, icons rotate/scale slightly).
- Count-up animation for key figures (only figures defined in site.ts; if a value is a placeholder, display it statically).
- Page transitions: short fade + slight vertical slide (0.35s) between routes, with a thin gold progress line at the top.
- Initial loader (max 900ms, only on first visit of the session): a gold droplet that falls and turns into the diamond rule, then reveals the page.
- Hero: slow sparkle glint every ~6s on the monogram/headline accent; subtle parallax on the background droplet shapes.
- Keep everything 60fps: animate transform/opacity only.

==================================================
3. GLOBAL COMPONENTS
==================================================

Header (sticky):
- Transparent on top of the hero, becomes glass (ivory 75% + blur 14px + bottom gold hairline) after 40px scroll, height shrinks slightly.
- Left: logo. Center: nav — Accueil, Services (dropdown/mega menu listing each service with icon + one-line description), Secteurs, À propos, Blog, Contact. Right: phone link (placeholder from site.ts) + primary CTA "Demander un devis".
- Mobile: hamburger opening a full-screen ink overlay menu with large Cinzel links, staggered reveal, phone + devis CTA at the bottom.

Footer (ink background):
- Large gold logo, short brand line in Cormorant italic (e.g., « La propreté, avec exigence. »).
- Columns: Services (links), Entreprise (À propos, Secteurs, Blog, Contact, Demander un devis), Coordonnées (address 2 Rue du Docteur Alexandre, 78450 Villepreux; phone, email, hours from site.ts), Zone d'intervention (from site.ts).
- Bottom bar: © year MHLEYMANE SAS — Mentions légales — Politique de confidentialité — Gestion des cookies. Diamond rule separating it.

Floating actions (bottom-right):
- Primary floating button: round ink button with a gold droplet/phone icon and a gentle pulse ring every few seconds, linking to /devis (label "Devis" on hover/desktop tooltip). Hidden on /devis itself.
- A secondary smaller "Appeler" button (tel: link) on mobile only, stacked above it. WhatsApp button only if `site.whatsapp.enabled` is true in site.ts (default false).
- Fade in after 300px of scroll; never overlap the cookie banner.

Reusable components to create: SectionEyebrow (small uppercase label + diamond rule), SectionTitle, ServiceCard, SectorCard, StepItem, StatItem, FAQAccordion, CTABanner, QuoteForm, PlaceholderMedia, Breadcrumbs, ArticleCard, ArticleCover (SVG), TableOfContents, ReadingProgress.

Cookie banner (France / RGPD): discreet bottom bar, "Accepter / Refuser / Personnaliser", no analytics loaded before consent.

==================================================
4. PAGES AND SECTIONS
==================================================

---------- 4.1 ACCUEIL (/) ----------

1. Hero (full viewport, ivory with large soft outlined gold droplet shapes and a faint light-reflection gradient):
   - Eyebrow: "SOCIÉTÉ DE NETTOYAGE — YVELINES & ÎLE-DE-FRANCE" (zone to confirm via site.ts).
   - H1 (Cinzel): « La propreté professionnelle, avec exigence » — with "exigence" in gold gradient.
   - Sub: one sentence covering bureaux, locaux commerciaux, magasins, restaurants et sites industriels.
   - CTAs: "Demander un devis gratuit" (primary) + "Découvrir nos services" (secondary).
   - Right side (desktop): an abstract composition — a large gold monogram-inspired droplet with a slow shine sweep and the sparkle glint.
   - Bottom of hero: 3 small reassurance chips (e.g., "Devis gratuit", "Intervention planifiée selon vos horaires", "Interlocutrice dédiée") — reveal staggered.

2. Services overview: eyebrow "NOS SERVICES", title, grid of service cards (6 cards, see 4.2 list). Each card: icon, title, 2-line description, "En savoir plus →". Hover: lift + gold top line + sparkle appears top-right.

3. Why MHLEYMANE ("Pourquoi nous choisir") on ink background: 4 pillars in gold line icons — Exigence & contrôle qualité, Flexibilité des horaires (tôt le matin, soir, week-end — to confirm), Produits et méthodes adaptés à chaque surface, Interlocutrice unique / réactivité. Left column: a short editorial paragraph in Cormorant italic.

4. Sectors ("Ils nous confient leurs espaces"): horizontal cards for Bureaux, Commerces & magasins, Restaurants, Sites industriels, Copropriétés & syndics (to confirm). Each links to /secteurs#anchor.

5. Method ("Notre méthode"): 4 steps on a horizontal timeline with the diamond rule as the line — 1 Prise de contact & visite, 2 Devis personnalisé, 3 Mise en place du plan de nettoyage, 4 Suivi & contrôle qualité. The gold line draws itself on scroll.

6. Key figures: 3–4 StatItems from site.ts (e.g., année de création 2021 is a real fact; other figures are placeholders "À CONFIRMER" and must not be invented).

7. Testimonials: section built but fed from src/data/testimonials.ts with entries marked "CONTENU EXEMPLE À REMPLACER"; if `site.showTestimonials` is false, the section is hidden. Default: false.

8. Latest articles ("Conseils & actualités"): the 3 most recent posts from src/data/posts.ts as ArticleCards + "Voir tous les articles →" link to /blog.

9. FAQ (6 questions) — accordion: zones d'intervention, délais pour un devis, horaires d'intervention, fourniture des produits et du matériel, contrats ponctuels vs réguliers, assurance (answer uses placeholder).

10. Final CTA banner (ink, gold gradient border): « Parlons de vos locaux » + "Demander un devis" + phone.

---------- 4.2 SERVICES (/services) + detail pages (/services/:slug) ----------

Services list (src/data/services.ts), each with slug, title, icon, short description, long description, "ce qui est inclus" list, "pour qui" list, frequency options, FAQ (3 items):
1. Nettoyage de bureaux — /services/nettoyage-bureaux
2. Nettoyage de locaux commerciaux & magasins — /services/nettoyage-commerces
3. Nettoyage de restaurants — /services/nettoyage-restaurants (cuisines/salles, hygiène)
4. Nettoyage industriel — /services/nettoyage-industriel
5. Nettoyage courant des bâtiments & parties communes — /services/entretien-batiments
6. Remise en état & nettoyage fin de chantier — /services/remise-en-etat (mark "À CONFIRMER" in the data)
Optionally a 7th "Nettoyage de vitres" flagged `enabled: false` by default.

/services page sections:
1. Page hero (compact, ink background, breadcrumbs, title « Nos services de nettoyage », sub).
2. Services grid (same cards, larger, alternating layout with description).
3. "Ponctuel ou régulier" — two side-by-side cards explaining one-off vs contract cleaning.
4. CTA banner.

/services/:slug template:
1. Hero with service title, intro, CTA "Demander un devis pour ce service" (pre-fills the service in the quote form via query param).
2. "Ce qui est inclus" — checklist with gold droplet bullets, 2 columns.
3. "Pour qui" — sector chips.
4. "Fréquences possibles" — quotidien / hebdomadaire / mensuel / ponctuel cards.
5. Method reminder (4 steps compact).
6. Service FAQ.
7. Other services carousel.
8. CTA banner.

---------- 4.3 SECTEURS (/secteurs) ----------
1. Compact hero.
2. One block per sector (anchored: #bureaux, #commerces, #restaurants, #industrie, #coproprietes), alternating left/right: sector title, specific challenges (e.g., restaurants: hygiène, horaires décalés), how MHLEYMANE answers them, related services links. Abstract SVG visual per sector (no photos).
3. CTA banner.

---------- 4.4 À PROPOS (/a-propos) ----------
1. Compact hero « Une société de nettoyage fondée sur l'exigence ».
2. Story: MHLEYMANE SAS, created in April 2021, based in Villepreux (Yvelines), directed by Mme Mariam Sow. Keep to these facts; any extra story text is marked as example copy to replace.
3. Values: Exigence, Fiabilité, Discrétion, Respect des lieux — 4 cards with the sparkle motif.
4. Word from the director: quote block in Cormorant italic, attributed to Mariam Sow, Présidente — text marked "CONTENU EXEMPLE À REMPLACER".
5. Engagements (qualité, sécurité, produits — placeholders, no invented certifications or labels).
6. Legal identity card: SAS, siège, création 2021, SIRET (placeholder).
7. CTA banner.

---------- 4.5 DEMANDER UN DEVIS (/devis) ----------
Multi-step quote form (3 steps with gold progress bar):
- Step 1: Type de service (multi-select chips from services.ts), type de locaux (select), surface approximative (m²), fréquence souhaitée.
- Step 2: Adresse / code postal / ville of the site, date de démarrage souhaitée, commentaires.
- Step 3: Société, nom, prénom, fonction, email, téléphone, RGPD consent checkbox (mandatory, link to politique de confidentialité).
- Validation with zod + react-hook-form, French error messages.
- On submit: insert into the Lovable Cloud "prospects" table (source = "formulaire_devis") and show an animated success state (droplet → sparkle) with "Nous revenons vers vous sous 24/48h ouvrées" (delay from site.ts).
- Side panel (desktop): coordonnées, horaires, reassurance points.

---------- 4.6 CONTACT (/contact) ----------
1. Compact hero.
2. Two columns: simple contact form (nom, email, téléphone, sujet, message, RGPD consent → "prospects" table, source = "formulaire_contact") and coordinates card (address, phone, email, hours).
3. Embedded map (OpenStreetMap / Leaflet, no API key) centered on 2 Rue du Docteur Alexandre, 78450 Villepreux, custom gold droplet marker, grayscale tiles.
4. Zone d'intervention block (list of départements/villes from site.ts, placeholder).

---------- 4.7 BLOG (/blog) + articles (/blog/:slug) ----------

Data: src/data/posts.ts, typed Post { slug, title, excerpt, category, tags[], coverVariant (abstract SVG cover style), author, publishedAt, updatedAt?, readingTime (computed), content (structured blocks: paragraph, h2, h3, list, quote, callout, image placeholder), relatedServices (service slugs), seo { title, description } }. Structured so it can later be swapped for a CMS/database.

Categories: Conseils d'entretien, Hygiène & normes, Entreprise & bureaux, Commerces & restaurants, Industrie, Actualités MHLEYMANE.

Seed 6 sample articles in French, each 600–900 words, all marked `// CONTENU EXEMPLE À REMPLACER`, educational and genuinely useful, no invented statistics or regulations cited with fake numbers:
1. « Bureaux propres : quelle fréquence de nettoyage choisir ? » (Entreprise & bureaux)
2. « Restaurant : les zones à ne jamais négliger dans votre plan de nettoyage » (Commerces & restaurants)
3. « Nettoyage ponctuel ou contrat régulier : comment choisir ? » (Conseils d'entretien)
4. « Nettoyage industriel : préparer l'intervention sur votre site » (Industrie)
5. « Comment bien rédiger votre demande de devis de nettoyage » (Conseils d'entretien)
6. « Magasins : une vitrine impeccable pour accueillir vos clients » (Commerces & restaurants)
Author for all: "L'équipe MHLEYMANE".

Covers: no photos — generated abstract SVG covers in the brand style (ivory/ink backgrounds, gold droplet/reflection compositions, category label), one variant per category, with a "PHOTO À FOURNIR" option via an optional `coverImage` field.

/blog page sections:
1. Compact hero (ink), title « Conseils & actualités », sub.
2. Featured article: the latest post as a large horizontal card (cover left, category, title, excerpt, date, reading time).
3. Toolbar: category filter chips (animated gold underline on active) + search input (title/excerpt/tags, debounced). Filters reflected in the URL (?categorie=…&q=…).
4. Articles grid (3 cols desktop, 2 tablet, 1 mobile) of ArticleCards: cover, category chip, title, excerpt (2 lines), date + reading time; hover lift + cover zoom 1.04 + sparkle top-right. Staggered reveal; layout animation when filtering. Empty state with droplet illustration.
5. Pagination (9 per page) or "Charger plus".
6. CTA banner.

/blog/:slug article template:
1. Reading progress bar (thin gold line under the header).
2. Article hero: breadcrumbs (Accueil › Blog › Catégorie), category chip, H1, date, updated date if any, reading time, author, cover.
3. Two-column layout on desktop: content (max 720px, comfortable line-height, Manrope 18px, H2/H3 in Cinzel, gold droplet bullets, Cormorant italic pull quotes, callout boxes with gold left border) + sticky sidebar with auto-generated table of contents (active heading highlighted on scroll) and a compact "Demander un devis" card.
4. Share buttons (LinkedIn, Facebook, email, copy link with toast).
5. "Services liés" — ServiceCards from relatedServices.
6. "Articles similaires" — 3 posts from the same category/tags.
7. CTA banner.
8. Unknown slug → 404.

---------- 4.8 LEGAL ----------
- /mentions-legales: raison sociale MHLEYMANE SAS, siège 2 Rue du Docteur Alexandre 78450 Villepreux, capital social (placeholder), RCS & SIRET (placeholders), TVA intracom (placeholder), directrice de la publication Mariam Sow, hébergeur (placeholder), contact.
- /politique-de-confidentialite: RGPD-compliant template (data collected via forms, purpose, retention, rights, contact) with placeholders.
- /cookies: cookie policy + button to reopen the consent manager.
- 404 page: « Cette page est introuvable » with droplet animation and links back.

==================================================
5. CONTENT RULES
==================================================

- Never invent facts: no fake figures (clients, years of experience beyond 2021, number of employees, m² cleaned), no fake certifications/labels, no fake client logos, no fake reviews presented as real.
- Real facts available: name MHLEYMANE, SAS, created April 2021, siège 2 Rue du Docteur Alexandre 78450 Villepreux, director Mme Mariam Sow, activity = nettoyage courant des bâtiments & nettoyage industriel for bureaux, locaux commerciaux, magasins, restaurants, sites industriels.
- All other business data is centralized in src/config/site.ts as clearly named placeholders: phone, email, hours, zone d'intervention, response delay, SIRET, capital, TVA, hébergeur, social links, whatsapp { enabled, number }, showTestimonials, stats[]. Display placeholders discreetly and consistently (e.g., "01 XX XX XX XX").
- Sample/editorial copy that needs client validation is marked in code with the comment `// CONTENU EXEMPLE À REMPLACER`.
- Service, sector, FAQ, testimonial and blog content lives in typed files: src/data/services.ts, src/data/sectors.ts, src/data/faq.ts, src/data/testimonials.ts, src/data/posts.ts — structured so they can later be moved to a database/CMS.
- French typography: non-breaking spaces before « : ; ! ? », French quotation marks « », correct accents and capitalization.

==================================================
6. ROUTES
==================================================

/ — Accueil
/services — Services
/services/:slug — Service detail (6 slugs above)
/secteurs — Secteurs
/a-propos — À propos
/blog — Blog (accepts ?categorie=…&q=…&page=…)
/blog/:slug — Article
/devis — Demander un devis (accepts ?service=slug)
/contact — Contact
/mentions-legales
/politique-de-confidentialite
/cookies
* — 404

Scroll to top on route change; smooth scroll for anchors with header offset.

==================================================
7. FORMS & LEAD STORAGE
==================================================

- Both forms (/devis and /contact) save into a Lovable Cloud "prospects" table.
- "prospects" table columns: id, created_at, source ("formulaire_devis" | "formulaire_contact"), nom, prenom, societe, fonction, email, telephone, services (text[]), type_locaux, surface, frequence, adresse, code_postal, ville, date_souhaitee, sujet, message, consentement (bool). Enable RLS: public insert only, no public read.
- Basic anti-spam: hidden honeypot field + minimum time-to-submit check; disable the submit button while sending.
- Clear French error state if saving fails, with a fallback to the phone number and email from site.ts.
- No email notifications or admin dashboard in this MVP (leads are read directly in Lovable Cloud).

==================================================
8. TECH, PERFORMANCE, SEO, ACCESSIBILITY
==================================================

- React + Vite + TypeScript + Tailwind + shadcn/ui + Framer Motion + React Router; Lovable Cloud for the prospects table.
- Design tokens (colors, fonts, radii, shadows) defined in Tailwind config + CSS variables, no hard-coded colors in components.
- Performance: lazy-load routes, preload fonts with display=swap, optimized logo (WebP + PNG fallback), Lighthouse targets ≥ 90 on all categories.
- SEO (local, France): unique French title/meta description per page (e.g., « Société de nettoyage à Villepreux (78) – Bureaux, commerces, industrie | MHLEYMANE »), Open Graph tags, canonical URLs, sitemap.xml, robots.txt, semantic heading hierarchy (one H1 per page), JSON-LD: LocalBusiness/CleaningService (name, address, areaServed from site.ts, telephone placeholder), Service schema on detail pages, FAQPage on pages with FAQ, BreadcrumbList, BlogPosting on articles (headline, datePublished, dateModified, author, publisher MHLEYMANE with logo). Blog articles included in sitemap.xml with lastmod; per-article title/meta from post.seo; Open Graph image = article cover.
- Accessibility: WCAG 2.1 AA, keyboard navigation for menus/accordions/forms/blog filters, visible gold focus rings, aria labels, alt texts, form errors announced, sufficient contrast (check gold on ivory).
- Fully responsive from 360px to 1920px; mobile-first; no horizontal scroll.
- Favicon from the gold monogram on ink background.

==================================================
9. DO NOT
==================================================

- No stock photos of people, no cartoonish cleaning illustrations (bubbles, mascots, smiling sponges), no generic blue/green "cleaning" palettes.
- No glassmorphism outside the header and mobile menu.
- No AI chatbot or chat widget.
- No invented numbers, clients, reviews, certifications, prices or guarantees.
- No lorem ipsum — write real French copy, marked as example where it needs validation.
- No client login, no online payment, no booking calendar, no blog admin/CMS in this MVP (articles are edited in posts.ts).
- Don't overuse gold: it's an accent, not a background.
- No heavy animations that hurt performance or ignore reduced-motion.

Build the complete site end to end — all pages, components, data files, the blog with its 6 sample articles, the prospects table and SEO — ready to review.
