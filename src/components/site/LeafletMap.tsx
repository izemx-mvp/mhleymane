import { useEffect, useRef, useState } from "react";
import { site, fullAddress } from "@/config/site";
import { PlaceholderMedia } from "./SmartImage";

const MARKER_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 56" width="40" height="56">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#8C6A1E"/><stop offset=".4" stop-color="#C9A13B"/>
    <stop offset=".55" stop-color="#F3DE8A"/><stop offset=".75" stop-color="#C9A13B"/><stop offset="1" stop-color="#8C6A1E"/>
  </linearGradient></defs>
  <path d="M20 2C20 2 3 24 3 36a17 17 0 0 0 34 0C37 24 20 2 20 2Z" fill="#111110" stroke="url(#g)" stroke-width="2.5"/>
  <circle cx="20" cy="36" r="6" fill="url(#g)"/>
</svg>`;

/** Carte OpenStreetMap (Leaflet, sans clé d'API), chargée uniquement côté navigateur */
export function LeafletMap({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let map: import("leaflet").Map | undefined;
    let cancelled = false;
    (async () => {
      try {
        const [{ default: L }] = await Promise.all([
          import("leaflet"),
          import("leaflet/dist/leaflet.css"),
        ]);
        if (cancelled || !ref.current) return;
        const { lat, lng } = site.geo;
        map = L.map(ref.current, {
          scrollWheelZoom: false,
          zoomControl: true,
          attributionControl: true,
        }).setView([lat, lng], 14);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);
        const icon = L.divIcon({
          html: MARKER_SVG,
          className: "",
          iconSize: [40, 56],
          iconAnchor: [20, 54],
          popupAnchor: [0, -48],
        });
        L.marker([lat, lng], {
          icon,
          keyboard: true,
          title: site.name,
          alt: `${site.name} — ${fullAddress}`,
        })
          .addTo(map)
          .bindPopup(
            `<strong>${site.legalName}</strong><br/>${site.address.street}<br/>${site.address.zip} ${site.address.city}`,
          );
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
      map?.remove();
    };
  }, []);

  return (
    <div className={className}>
      <div
        ref={ref}
        className="map-luxe relative z-0 h-full w-full overflow-hidden rounded-[18px] border border-line bg-sand"
        role="region"
        aria-label={`Carte : ${site.legalName}, ${fullAddress}`}
      >
        {failed && <PlaceholderMedia label="Carte indisponible" />}
      </div>
    </div>
  );
}
