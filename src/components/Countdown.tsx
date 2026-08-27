"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/site.config";
import { useCountdown } from "@/lib/useCountdown";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

const UNITS = [
  { key: "days", label: "Gün" },
  { key: "hours", label: "Saat" },
  { key: "minutes", label: "Dakika" },
  { key: "seconds", label: "Saniye" },
] as const;

/** Tek bir rakam — değeri değişince yumuşakça yukarı kayarak yenilenir. */
function Digit({ char, reduce }: { char: string; reduce: boolean | null }) {
  if (reduce) {
    return <span className="tabular">{char}</span>;
  }
  return (
    <span className="relative inline-block h-[1.15em] w-[0.62em] overflow-hidden align-baseline">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={char}
          className="tabular absolute inset-0 flex items-center justify-center"
          initial={{ y: "-90%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "90%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {char}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Countdown() {
  const left = useCountdown(siteConfig.event.startsAt);
  const reduce = useReducedMotion();

  return (
    <section className="relative px-6 py-20 sm:py-24" id="geri-sayim">
      <SectionLabel>
        {left?.finished ? "Bugün O Gün" : "Törenimize Kalan Süre"}
      </SectionLabel>

      <Reveal delay={0.1} className="mx-auto mt-10 w-full max-w-[34rem]">
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
          {UNITS.map(({ key, label }, i) => {
            const raw = left ? left[key] : null;
            const text =
              raw === null ? "––" : String(raw).padStart(2, "0");

            return (
              <motion.div
                key={key}
                className="card relative flex flex-col items-center overflow-hidden px-1 py-5 sm:py-6"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* kartın üst kenarındaki ince altın vurgu */}
                <span className="hairline absolute inset-x-5 top-0 h-px" />

                <span
                  className="flex font-display text-[1.85rem] leading-none font-normal text-ink sm:text-[2.6rem]"
                  aria-hidden="true"
                >
                  {text.split("").map((c, idx) => (
                    <Digit key={idx} char={c} reduce={reduce} />
                  ))}
                </span>

                {/* ekran okuyucular için düz metin */}
                <span className="sr-only">
                  {raw ?? 0} {label}
                </span>

                <span className="mt-3 font-label text-[0.6rem] tracking-[0.22em] text-muted uppercase sm:text-[0.65rem]">
                  {label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </Reveal>

      {left?.finished && (
        <Reveal delay={0.2} className="mt-8 text-center">
          <p className="font-display text-xl text-ink italic">
            Bu güzel günü bizimle paylaştığınız için teşekkür ederiz.
          </p>
        </Reveal>
      )}
    </section>
  );
}
