/**
 * Optimise les visuels du site.
 *
 * Usage : déposer les originaux (PNG / JPG / WebP) dans `assets-src/images/`
 * avec le nom attendu (ex. `hero-accueil.png`), puis lancer `npm run images`.
 *
 * Pour chaque visuel, le script produit dans `public/images/` :
 *  - `<nom>.webp`     au format cible (recadrage centré, sans agrandissement) ;
 *  - `<nom>-sm.webp`  en 800 px de large, utilisé sur mobile (srcset) ;
 *  - `<nom>-og.jpg`   en 1200 × 630 (JPEG), pour les aperçus de partage (Open Graph).
 */
import { readdirSync, mkdirSync, existsSync } from "node:fs";
import { join, parse } from "node:path";
import sharp from "sharp";

const SRC = "assets-src/images";
const OUT = "public/images";

/** Formats cibles (largeur × hauteur) */
const TARGETS = {
  "hero-accueil": [1920, 1080],
  "service-bureaux": [1600, 900],
  "service-commerces": [1600, 900],
  "service-restaurants": [1600, 900],
  "service-industriel": [1600, 900],
  "service-batiments": [1600, 900],
  "service-remise-en-etat": [1600, 900],
  "pourquoi-nous-choisir": [1200, 1500],
  "a-propos-equipe": [1600, 1067],
  "a-propos-materiel": [1200, 1500],
  "devis-visuel": [1200, 1500],
  "cta-fond": [1920, 800],
  "blog-frequence-bureaux": [1200, 630],
  "blog-restaurant-zones": [1200, 630],
  "blog-ponctuel-ou-contrat": [1200, 630],
  "blog-industriel-preparer": [1200, 630],
  "blog-demande-devis": [1200, 630],
  "blog-vitrine-magasin": [1200, 630],
  "og-image": [1200, 630],
};

const SMALL_WIDTH = 800;

if (!existsSync(SRC)) {
  console.error(`Dossier introuvable : ${SRC}`);
  process.exit(1);
}
mkdirSync(OUT, { recursive: true });

const files = readdirSync(SRC).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
for (const file of files) {
  const { name } = parse(file);
  const target = TARGETS[name];
  if (!target) {
    console.warn(`Ignoré (nom inconnu) : ${file}`);
    continue;
  }
  const [tw, th] = target;
  const input = sharp(join(SRC, file));
  const meta = await input.metadata();
  // Pas d'agrandissement : on réduit le format cible à la taille de l'original si besoin
  const scale = Math.min(1, meta.width / tw, meta.height / th);
  const w = Math.round(tw * scale);
  const h = Math.round(th * scale);

  await sharp(join(SRC, file))
    .resize(w, h, { fit: "cover", position: "attention" })
    .webp({ quality: 78, effort: 6 })
    .toFile(join(OUT, `${name}.webp`));

  if (name !== "og-image") {
    const sw = Math.min(SMALL_WIDTH, w);
    await sharp(join(SRC, file))
      .resize(sw, Math.round((sw * h) / w), { fit: "cover", position: "attention" })
      .webp({ quality: 74, effort: 6 })
      .toFile(join(OUT, `${name}-sm.webp`));
  }
  // Aperçu de partage : JPEG, mieux pris en charge que le WebP par les réseaux sociaux
  await sharp(join(SRC, file))
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(join(OUT, `${name}-og.jpg`));

  console.log(`✓ ${name}.webp (${w}×${h})`);
}

const missing = Object.keys(TARGETS).filter((n) => !files.some((f) => parse(f).name === n));
if (missing.length) console.log(`\nVisuels manquants : ${missing.join(", ")}`);
