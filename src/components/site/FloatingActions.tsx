import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, m } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { site, phoneHref } from "@/config/site";
import { Droplet } from "./motifs";

export function FloatingActions() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onDevis = pathname === "/devis";
  const whatsapp = site.whatsapp.enabled && site.whatsapp.number;

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35 }}
          className="fixed right-4 z-40 flex flex-col items-end gap-3 transition-[bottom] duration-500 md:right-6"
          style={{ bottom: "calc(1.25rem + var(--cookie-offset, 0px))" }}
        >
          {whatsapp && (
            <a
              href={`https://wa.me/${site.whatsapp.number}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nous écrire sur WhatsApp (nouvelle fenêtre)"
              className="grid h-12 w-12 place-items-center rounded-full border border-gold/50 bg-ivory text-ink shadow-lift transition hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </a>
          )}
          {phoneHref && (
            <a
              href={phoneHref}
              aria-label={`Appeler MHLEYMANE au ${site.phone}`}
              className="grid h-12 w-12 place-items-center rounded-full border border-gold/50 bg-ivory text-ink shadow-lift transition hover:-translate-y-0.5 md:hidden"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
            </a>
          )}
          {!onDevis && (
            <Link
              to="/devis"
              aria-label="Demander un devis"
              className="group relative grid h-[3.75rem] w-[3.75rem] place-items-center rounded-full border border-transparent shadow-lift transition hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(var(--ink), var(--ink)) padding-box, var(--gradient-gold) border-box",
              }}
            >
              <span
                className="animate-pulse-ring absolute inset-0 rounded-full border border-gold"
                aria-hidden="true"
              />
              <Droplet className="h-6 w-5 text-gold" strokeWidth={1.6} />
              <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-ivory opacity-0 shadow-lift transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 md:block">
                Devis
              </span>
            </Link>
          )}
        </m.div>
      )}
    </AnimatePresence>
  );
}
