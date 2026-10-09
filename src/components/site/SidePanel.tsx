import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { site, fullAddress } from "@/config/site";
import { PhoneLink } from "./PhoneLink";
import { DiamondRule, DropletBullet } from "./motifs";
import { SmartImage } from "./SmartImage";

// CONTENU EXEMPLE À REMPLACER — points de réassurance à valider
const reassurance = [
  "Devis gratuit et sans engagement",
  "Visite de vos locaux sur rendez-vous",
  `Réponse sous ${site.responseDelay}`,
  "Une interlocutrice dédiée",
];

export function SidePanel({ title = "Vos interlocuteurs" }: { title?: string }) {
  return (
    <aside
      className="space-y-6 lg:sticky lg:top-28 lg:self-start"
      aria-label="Coordonnées et engagements"
    >
      <SmartImage
        src="/images/devis-visuel.webp"
        alt="Salle de réunion élégante aux fauteuils clairs, parfaitement entretenue"
        width={1200}
        height={1500}
        sizes="420px"
        placeholderTone="ink"
        className="img-zoom hidden aspect-[4/3] rounded-[22px] border border-line lg:block"
      >
        <div className="img-overlay pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
        <p className="tagline absolute bottom-5 left-6 right-6 text-xl text-ivory">
          « {site.baseline} »
        </p>
      </SmartImage>
      <div className="rounded-[22px] bg-ink p-8 text-ivory">
        <p className="eyebrow eyebrow-light">{title}</p>
        <DiamondRule align="start" width="sm" className="mt-4" />
        <ul className="mt-6 space-y-5 text-[0.95rem]">
          <InfoLine icon={<Phone className="h-4 w-4" />} label="Téléphone">
            <PhoneLink className="link-gold" />
          </InfoLine>
          <InfoLine icon={<Mail className="h-4 w-4" />} label="E-mail">
            <a href={`mailto:${site.email}`} className="link-gold break-all">
              {site.email}
            </a>
          </InfoLine>
          <InfoLine icon={<MapPin className="h-4 w-4" />} label="Adresse">
            {fullAddress}
          </InfoLine>
          <InfoLine icon={<Clock className="h-4 w-4" />} label="Horaires">
            {site.hours.map((h) => (
              <span key={h.days} className="block">
                {h.days} : {h.time}
              </span>
            ))}
          </InfoLine>
        </ul>
      </div>
      <div className="rounded-[22px] border border-line bg-sand p-8">
        <p className="eyebrow">Nos engagements</p>
        <ul className="mt-5 space-y-3">
          {reassurance.map((r) => (
            <li key={r} className="flex gap-3 text-[0.95rem] text-ink/85">
              <DropletBullet />
              {r}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function InfoLine({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span
        className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/40 text-gold"
        aria-hidden="true"
      >
        {icon}
      </span>
      <span>
        <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-ivory/50">
          {label}
        </span>
        <span className="mt-1 block text-ivory/90">{children}</span>
      </span>
    </li>
  );
}
