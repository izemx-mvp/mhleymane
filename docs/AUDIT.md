# Audit du site MHLEYMANE — état initial vs `docs/SPEC.md`

Date de l'audit : 9 octobre 2026. Référence : `docs/SPEC.md` + différences listées dans `claude-code-prompt.md` (pas de backend, formulaires frontend, photos WebP dans `/public/images/`, 6 articles).

## 1. Stack constatée

| Élément | Constat | Décision |
| --- | --- | --- |
| Framework | **TanStack Start** (SSR, routage par fichiers `src/routes/`), pas React Router | Conservé (stack existante). Le SSR est un atout SEO. |
| Styles | Tailwind **v4** (config CSS `@theme` dans `src/styles.css`, pas de `tailwind.config`) | Les design tokens vivent dans `@theme` + variables CSS. |
| SEO head | `head()` natif des routes TanStack | Utilisé à la place de `react-helmet-async` (équivalent, rendu côté serveur). |
| Formulaires | zod présent, react-hook-form installé mais non utilisé, aucun envoi | Réécrits avec react-hook-form + zod + envoi Formspree / repli `mailto:`. |
| Carte | iframe OpenStreetMap | Remplacée par Leaflet (tuiles en niveaux de gris, marqueur goutte dorée). |
| Build | `npm run build` OK, `tsc --noEmit` OK | — |
| Lint | ~6 000 erreurs, quasi toutes `prettier/prettier` (fins de ligne CRLF sous Windows) | `endOfLine: "auto"` dans `.prettierrc`. |

## 2. Fichiers existants

- Routes : `/`, `/services`, `/services/$slug`, `/a-propos`, `/blog`, `/blog/$slug`, `/devis`, `/contact`, `/mentions-legales`, `/politique-de-confidentialite`, 404 (dans `__root.tsx`).
- Composants : `components/site/Layout.tsx` (Header, Footer, FloatingCall), `components/site/ui.tsx` (Divider, Sparkle, Droplet, Reveal, SectionTitle, PageHero, GoldWaves, CtaBand, PostCover), `components/site/forms.tsx`.
- Données : `config/site.ts` (très partiel), `data/services.ts`, `data/posts.ts` (4 articles courts).
- Logo : référencé via un asset hébergé par Lovable (`src/assets/logo.png.asset.json`) — **absent de `/public/logo.png`**. Retrouvé dans `~/Downloads/mhleymane-logo.png` et copié.
- Images : **`/public/images/` n'existe pas** — aucune des photos listées n'est encore présente.

## 3. Écarts — pages et routes

| Route | État | Manques |
| --- | --- | --- |
| `/secteurs` | **Absente** | Page entière (5 blocs ancrés, défis, réponses, services liés). |
| `/cookies` | **Absente** | Politique cookies + bouton de réouverture du gestionnaire. |
| `sitemap.xml` | **Absent** | À générer (pages, services, articles avec `lastmod`). |
| `/` | Basique | Hero sans visuel ni chips de réassurance ; pas de colonne éditoriale « Pourquoi » ; secteurs non liés ; méthode sans ligne animée ; **chiffres clés absents** ; **témoignages absents** ; FAQ non accessible (pas d'aria) ; CTA final générique. |
| `/services` | Basique | Hero ink + fil d'Ariane, grille alternée, bloc « Ponctuel ou régulier ». |
| `/services/:slug` | Basique | Slugs différents de la spec ; manquent « Pour qui », cartes de fréquences, rappel méthode, FAQ du service, carrousel autres services, JSON-LD Service. |
| `/a-propos` | Partiel | Valeurs différentes de la spec ; manquent mot de la présidente, engagements, carte d'identité légale, photos. |
| `/blog` | Basique | Article à la une, recherche, filtres dans l'URL, pagination, état vide. 4 catégories non conformes. |
| `/blog/:slug` | Basique | Barre de progression, sommaire auto, partage, services liés, articles similaires, JSON-LD BlogPosting complet, contenu structuré (h2/h3/listes/citations/encadrés). Articles trop courts (≈150 mots au lieu de 600–900). |
| `/devis` | Formulaire 1 étape, pas d'envoi | 3 étapes + barre de progression, multi-sélection des services, honeypot, délai minimum, envoi, état succès animé, panneau latéral. |
| `/contact` | Formulaire sans envoi, iframe | Envoi, Leaflet, zone d'intervention. |
| Légal | Squelettes | Champs manquants (capital, RCS, TVA, hébergeur…), politique RGPD complète. |
| 404 | Basique | Animation goutte, liens utiles. |

## 4. Écarts — design system & composants globaux

- Palette en `oklch` approximative ; **pas les valeurs hex de la spec** (#C9A13B, #111110, #FAF7F0, #F2ECDF…), pas de gradient or à 5 arrêts, pas de token « or lisible sur ivoire » (contraste AA).
- Rayons 6 px au lieu de 18 px (cartes) et pilules (boutons). Boutons « or plein » contraires à la spec (CTA primaire = fond ink + bordure dégradée or + reflet).
- Pas d'échelle typographique fluide (`clamp`).
- Header : pas de méga-menu services, pas de lien téléphone, pas de ton clair/sombre selon le hero, menu mobile non plein écran, pas de fermeture à `Échap`.
- Footer : pas de colonne « Zone d'intervention », pas d'horaires, pas de lien cookies, pas de règle losange.
- Manquants : bouton flottant Devis (pulse), bouton Appeler mobile, WhatsApp conditionnel, **bannière cookies RGPD**, transitions de page + ligne de progression, loader initial, `SmartImage`, `Breadcrumbs`, `StatItem` (count-up), `FAQAccordion` accessible, `ArticleCard`, `TableOfContents`, `ReadingProgress`, défilement vers le haut au changement de route.
- `prefers-reduced-motion` non géré.
- Typographie française : espaces insécables absents.

## 5. Écarts — données & contenu

- `site.ts` : manquent URL du site, `formEndpoint`, capital, RCS, TVA, hébergeur, réseaux sociaux, `whatsapp`, `showTestimonials`, `stats[]`, délai de réponse, horaires structurés, zone d'intervention en liste.
- Absents : `data/sectors.ts`, `data/faq.ts`, `data/testimonials.ts`.
- `services.ts` : manquent description longue, « pour qui », FAQ (3 par service), image, drapeau `toConfirm` (remise en état), 7ᵉ service « vitres » désactivé.
- `posts.ts` : modèle de données à refondre (tags, blocs typés, auteur, `relatedServices`, `seo`, temps de lecture calculé, image de couverture).
- Copies d'exemple non signalées par `// CONTENU EXEMPLE À REMPLACER`.
- Certaines affirmations non vérifiées (« équipes avec leur propre matériel », « contrôle régulier ») à reformuler ou marquer comme exemple.

## 6. Écarts — SEO & qualité

- Canonical et `og:url` relatifs (doivent être absolus), pas d'`og:image`.
- JSON-LD : `LocalBusiness` minimal sans `CleaningService`, téléphone, `areaServed`, `url` ; manquent `Service`, `FAQPage`, `BreadcrumbList`, `BlogPosting`.
- `robots.txt` sans lien vers le sitemap.
- Favicon non conforme (monogramme sur fond ink).
- Accessibilité : pas de lien d'évitement, focus peu visibles, accordéon sans `aria-expanded`, erreurs de formulaire non annoncées, menu mobile sans gestion du focus.

## 7. Plan

1. Fondations : tokens, `site.ts`, données typées.
2. Composants globaux.
3. Pages, une par une.
4. Finitions animations / responsive / typographie.
5. SEO, sitemap, accessibilité, vérification build + lint à chaque étape.
