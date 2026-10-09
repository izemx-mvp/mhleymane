import { cn } from "@/lib/utils";

/** Filet doré avec losange central (repris du logo, sous « MHLEYMANE ») */
export function DiamondRule({
  className,
  align = "center",
  width = "md",
}: {
  className?: string;
  align?: "center" | "start";
  width?: "sm" | "md" | "lg";
}) {
  const w = { sm: "w-8 sm:w-10", md: "w-12 sm:w-16", lg: "w-16 sm:w-28" }[width];
  return (
    <div
      className={cn(
        "flex items-center gap-2.5",
        align === "center" ? "justify-center" : "justify-start",
        className,
      )}
      aria-hidden="true"
    >
      {align === "center" && (
        <span className={cn("h-px bg-gradient-to-r from-transparent to-gold", w)} />
      )}
      <span className="h-[7px] w-[7px] rotate-45 bg-gold" />
      <span
        className={cn(
          "h-px bg-gradient-to-l from-transparent to-gold",
          w,
          align === "start" && "bg-gradient-to-r from-gold to-transparent",
        )}
      />
    </div>
  );
}

/** Goutte d'eau du monogramme */
export function Droplet({
  className,
  filled = false,
  strokeWidth = 1.5,
}: {
  className?: string;
  filled?: boolean;
  strokeWidth?: number;
}) {
  return (
    <svg viewBox="0 0 24 34" className={className} aria-hidden="true" focusable="false">
      <path
        d="M12 1.5C12 1.5 2 15 2 22.5a10 10 0 0 0 20 0C22 15 12 1.5 12 1.5Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {!filled && (
        <path
          d="M7.5 22.5a4.5 4.5 0 0 0 3.2 4.3"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth * 0.8}
          strokeLinecap="round"
          opacity="0.7"
        />
      )}
    </svg>
  );
}

/** Étincelle à quatre branches (coin supérieur droit du logo) */
export function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        d="M12 0C12.7 7.6 16.4 11.3 24 12C16.4 12.7 12.7 16.4 12 24C11.3 16.4 7.6 12.7 0 12C7.6 11.3 11.3 7.6 12 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Puce en goutte dorée pour les listes */
export function DropletBullet({ className }: { className?: string }) {
  return <Droplet filled className={cn("mt-[0.4em] h-3 w-2.5 shrink-0 text-gold", className)} />;
}

/** Grande goutte dorée en dégradé (composition du hero) */
export function GoldDropletArt({ className, id = "gd" }: { className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 240 340" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8C6A1E" />
          <stop offset="0.35" stopColor="#C9A13B" />
          <stop offset="0.55" stopColor="#F3DE8A" />
          <stop offset="0.75" stopColor="#C9A13B" />
          <stop offset="1" stopColor="#8C6A1E" />
        </linearGradient>
        <linearGradient id={`${id}-s`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}-c`}>
          <path d="M120 8C120 8 18 146 18 222a102 102 0 0 0 204 0C222 146 120 8 120 8Z" />
        </clipPath>
      </defs>
      <path
        d="M120 8C120 8 18 146 18 222a102 102 0 0 0 204 0C222 146 120 8 120 8Z"
        fill="none"
        stroke={`url(#${id}-g)`}
        strokeWidth="2"
      />
      <path
        d="M120 46C120 46 44 156 44 220a76 76 0 0 0 152 0C196 156 120 46 120 46Z"
        fill="none"
        stroke={`url(#${id}-g)`}
        strokeWidth="1"
        opacity="0.55"
      />
      <path
        d="M62 226a58 58 0 0 0 40 52"
        fill="none"
        stroke={`url(#${id}-g)`}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <g clipPath={`url(#${id}-c)`}>
        <g className="hero-sweep">
          <rect
            x="-160"
            y="0"
            width="90"
            height="340"
            fill={`url(#${id}-s)`}
            transform="skewX(-18)"
          />
        </g>
      </g>
    </svg>
  );
}
