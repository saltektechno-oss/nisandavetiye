"use client";

import { mapsDirectionsUrl, mapsEmbedUrl, siteConfig } from "@/lib/site.config";
import { downloadIcs } from "@/lib/ics";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

/** Mekân kartı: harita, adres ve yönlendirme butonları. */
export function MapSection() {
  const { venue } = siteConfig;

  return (
    <section className="relative bg-parchment px-6 pb-20 sm:pb-24" id="mekan">
      <SectionLabel>Mekân</SectionLabel>

      <Reveal delay={0.1} className="mx-auto mt-10 w-full max-w-[34rem]">
        <div className="card overflow-hidden">
          {/* Google Haritalar önizlemesi */}
          <div className="relative h-52 w-full bg-linen sm:h-64">
            <iframe
              src={mapsEmbedUrl}
              title={`${venue.name} konumu`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
              style={{ filter: "saturate(0.72) contrast(0.96) sepia(0.12)" }}
            />
            {/* haritanın üstünde ince altın çerçeve */}
            <span className="pointer-events-none absolute inset-0 border-b border-gold/25" />
          </div>

          <div className="px-5 py-6 text-center sm:px-8 sm:py-8">
            <p className="font-display text-[1.5rem] leading-tight text-ink sm:text-[1.8rem]">
              {venue.name}
            </p>

            {/* Adres ve tarih davetiye kartında zaten yazılı — burada
                tekrarlanmaz, doğrudan aksiyona geçilir. */}

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full px-7 py-3.5 sm:w-auto"
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                  <path
                    d="M8 1.5c-2.5 0-4.5 2-4.5 4.5 0 3.2 4.5 8.5 4.5 8.5s4.5-5.3 4.5-8.5c0-2.5-2-4.5-4.5-4.5Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <circle cx="8" cy="6" r="1.6" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                Yol Tarifi Al
              </a>

              <button
                type="button"
                onClick={downloadIcs}
                className="btn-outline w-full px-7 py-3.5 sm:w-auto"
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                  <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M2 6.5h12M5.5 1.8v2.4M10.5 1.8v2.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                Takvime Ekle
              </button>
            </div>

            {venue.phone && (
              <a
                href={`tel:${venue.phone.replace(/\s/g, "")}`}
                className="mt-5 inline-block font-label text-[0.68rem] tracking-[0.2em] text-muted uppercase underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold-deep"
              >
                {venue.phone}
              </a>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
