# MHLEYMANE — site vitrine

Site de MHLEYMANE SAS, société de nettoyage à Villepreux (78). TanStack Start (React, SSR) + Tailwind v4 + Framer Motion.

## À compléter avant la mise en ligne

- **`src/config/site.ts`** : téléphone, e-mail, horaires, zone d'intervention, SIRET / RCS / capital / TVA, hébergeur, réseaux sociaux, URL du site, `formEndpoint` (Formspree) et chiffres clés. Les valeurs à confirmer sont marquées `À CONFIRMER` ou `XX`.
- Les textes d'exemple sont signalés par le commentaire `// CONTENU EXEMPLE À REMPLACER`.

## Visuels

Déposer les originaux (PNG/JPG) dans `assets-src/images/` avec le nom attendu (ex. `hero-accueil.png`), puis :

```sh
npm run images
```

Le script génère les WebP optimisés, leurs variantes mobiles et les JPEG de partage dans `public/images/`.

## Contenus

Services, secteurs, FAQ, témoignages et articles : `src/data/*.ts`. Le plan du site (`/sitemap.xml`) et `robots.txt` sont générés automatiquement.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/deae3bfc-f5eb-40ee-9b72-14d09b342add).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
