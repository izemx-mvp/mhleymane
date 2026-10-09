import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Droplet } from "./motifs";

/** Bloc de remplacement élégant : fond sable, goutte dorée, « PHOTO À FOURNIR » */
export function PlaceholderMedia({
  className,
  label = "Photo à fournir",
  file,
  showLabel = true,
  tone = "sand",
}: {
  className?: string;
  label?: string;
  file?: string | undefined;
  showLabel?: boolean;
  tone?: "sand" | "ink";
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden",
        tone === "sand" ? "bg-sand" : "bg-charcoal",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            tone === "sand"
              ? "radial-gradient(120% 80% at 80% 0%, rgb(255 255 255 / 0.9), transparent 60%), radial-gradient(90% 70% at 0% 100%, rgb(201 161 59 / 0.12), transparent 70%)"
              : "radial-gradient(120% 80% at 80% 0%, rgb(201 161 59 / 0.16), transparent 60%)",
        }}
      />
      <Droplet className="relative h-9 w-7 text-gold" strokeWidth={1.2} />
      {showLabel && (
        <>
          <span
            className={cn(
              "relative font-display text-[0.68rem] font-semibold uppercase tracking-[0.3em]",
              tone === "sand" ? "text-gold-ink" : "text-gold",
            )}
          >
            {label}
          </span>
          {file && (
            <span
              className={cn(
                "relative text-[0.68rem]",
                tone === "sand" ? "text-stone" : "text-ivory/50",
              )}
            >
              {file}
            </span>
          )}
        </>
      )}
    </div>
  );
}

type SmartImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Image principale au-dessus de la ligne de flottaison (hero) : chargement immédiat */
  priority?: boolean | undefined;
  sizes?: string | undefined;
  /** Classes du conteneur (doit définir la taille / le ratio) */
  className?: string | undefined;
  imgClassName?: string | undefined;
  /** "placeholder" (défaut), "none" (rien), ou un élément personnalisé */
  fallback?: "placeholder" | "none" | ReactNode;
  placeholderTone?: "sand" | "ink";
  /** Calques au-dessus de l'image (dégradés, cadres…) */
  children?: ReactNode;
};

/**
 * Image robuste : affiche un remplacement soigné si le fichier est absent,
 * pour que le site ne paraisse jamais cassé pendant la production des visuels.
 */
export function SmartImage({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes,
  className,
  imgClassName,
  fallback = "placeholder",
  placeholderTone = "sand",
  children,
}: SmartImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  // L'image peut avoir fini de charger (ou échoué) avant l'hydratation.
  useEffect(() => {
    const img = ref.current;
    if (img?.complete) setStatus(img.naturalWidth > 0 ? "loaded" : "error");
  }, [src]);

  const file = src.split("/").pop();

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      data-img-state={status}
      data-img-tone={placeholderTone}
    >
      {status !== "loaded" &&
        (fallback === "placeholder" ? (
          <PlaceholderMedia file={file} showLabel={status === "error"} tone={placeholderTone} />
        ) : fallback === "none" ? null : (
          status === "error" && fallback
        ))}
      {status !== "error" && (
        <img
          ref={ref}
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={cn(
            "absolute inset-0 h-full w-full object-cover text-transparent",
            !priority && "transition-opacity duration-700",
            !priority && status !== "loaded" && "opacity-0",
            imgClassName,
          )}
        />
      )}
      {children}
    </div>
  );
}
