import { Link } from "@tanstack/react-router";
import { AnimatePresence, m } from "framer-motion";
import { Cookie } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EASE_LUXE } from "./Reveal";

/**
 * Gestion du consentement (RGPD / recommandations CNIL).
 * Aucun traceur non essentiel n'est chargé avant consentement.
 * Le site n'utilise actuellement aucun outil de mesure d'audience :
 * pour en ajouter un, le charger uniquement si `consent.analytics === true`.
 */

export type Consent = { analytics: boolean; date: string };

const STORAGE_KEY = "mhl-consent-v1";
const OPEN_EVENT = "mhl:open-cookie-manager";
const CHANGE_EVENT = "mhl:consent-change";

export function readConsent(): Consent | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

function saveConsent(analytics: boolean) {
  const consent: Consent = { analytics, date: new Date().toISOString() };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    /* stockage indisponible : le choix vaut pour la session en cours */
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: consent }));
}

export function openCookieManager() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) setVisible(true);
    else setAnalytics(existing.analytics);
    const onOpen = () => {
      setAnalytics(readConsent()?.analytics ?? false);
      setCustomize(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  // Décale les boutons flottants pour ne jamais chevaucher le bandeau
  useEffect(() => {
    const root = document.documentElement;
    if (!visible || !ref.current) {
      root.style.setProperty("--cookie-offset", "0px");
      return;
    }
    const el = ref.current;
    const update = () => root.style.setProperty("--cookie-offset", `${el.offsetHeight + 16}px`);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [visible, customize]);

  const decide = (value: boolean) => {
    saveConsent(value);
    setAnalytics(value);
    setVisible(false);
    setCustomize(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          ref={ref}
          role="region"
          aria-label="Gestion des cookies"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.45, ease: EASE_LUXE }}
          className="fixed inset-x-3 bottom-3 z-[55] mx-auto max-w-4xl rounded-[20px] border border-line bg-ivory p-5 shadow-lift md:inset-x-6 md:bottom-6 md:p-6"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
            <div className="flex flex-1 gap-4">
              <Cookie
                className="mt-0.5 hidden h-5 w-5 shrink-0 text-gold-ink sm:block"
                aria-hidden="true"
              />
              <p className="text-sm leading-relaxed text-ink/80">
                Nous utilisons uniquement les cookies nécessaires au fonctionnement du site. Avec
                votre accord, des outils de mesure d'audience pourraient être activés. Votre choix
                est modifiable à tout moment.{" "}
                <Link to="/cookies" className="link-gold font-semibold text-gold-ink">
                  En savoir plus
                </Link>
              </p>
            </div>
            {!customize && (
              <div className="flex shrink-0 flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => decide(false)}
                  className="btn btn-secondary min-h-10 px-4 py-2 text-[0.7rem]"
                >
                  Refuser
                </button>
                <button
                  type="button"
                  onClick={() => setCustomize(true)}
                  className="btn btn-secondary min-h-10 px-4 py-2 text-[0.7rem]"
                >
                  Personnaliser
                </button>
                <button
                  type="button"
                  onClick={() => decide(true)}
                  className="btn btn-primary min-h-10 px-4 py-2 text-[0.7rem]"
                >
                  Accepter
                </button>
              </div>
            )}
          </div>
          {customize && (
            <div className="mt-5 border-t border-line pt-5">
              <ul className="space-y-4 text-sm">
                <li className="flex items-start justify-between gap-6">
                  <span>
                    <span className="block font-semibold text-ink">Cookies nécessaires</span>
                    <span className="text-muted-foreground">
                      Mémorisation de vos choix. Toujours actifs.
                    </span>
                  </span>
                  <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-gold-ink">
                    Actifs
                  </span>
                </li>
                <li className="flex items-start justify-between gap-6">
                  <label htmlFor="consent-analytics">
                    <span className="block font-semibold text-ink">Mesure d'audience</span>
                    <span className="text-muted-foreground">
                      Statistiques de visite anonymes (aucun outil actif à ce jour).
                    </span>
                  </label>
                  <button
                    id="consent-analytics"
                    type="button"
                    role="switch"
                    aria-checked={analytics}
                    onClick={() => setAnalytics((a) => !a)}
                    className={`relative h-7 w-12 shrink-0 rounded-full border transition-colors ${analytics ? "border-gold bg-ink" : "border-line bg-sand"}`}
                  >
                    <span
                      className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full transition-all ${analytics ? "left-6 bg-gold" : "left-1 bg-stone"}`}
                    />
                  </button>
                </li>
              </ul>
              <div className="mt-5 flex flex-wrap justify-end gap-2">
                <button
                  type="button"
                  onClick={() => decide(false)}
                  className="btn btn-secondary min-h-10 px-4 py-2 text-[0.7rem]"
                >
                  Tout refuser
                </button>
                <button
                  type="button"
                  onClick={() => decide(analytics)}
                  className="btn btn-primary min-h-10 px-4 py-2 text-[0.7rem]"
                >
                  Enregistrer mes choix
                </button>
              </div>
            </div>
          )}
        </m.div>
      )}
    </AnimatePresence>
  );
}
