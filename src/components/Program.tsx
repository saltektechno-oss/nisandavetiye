"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site.config";
import { SectionLabel } from "./ui/SectionLabel";

/** Gecenin akışı — dikey, altın çizgili zaman çizelgesi. */
export function Program() {
  const items = siteConfig.program.items;
  if (items.length === 0) return null;

  return (
    <section className="relative bg-parchment px-7 py-20 sm:py-24" id="program">
      <SectionLabel>Akış</SectionLabel>

      <ol className="relative mx-auto mt-12 max-w-[26rem] pl-10 sm:pl-14">
        {/* dikey altın çizgi — yukarıdan aşağı çizilir */}
        <motion.span
          className="absolute top-1.5 bottom-1.5 left-[7px] w-px origin-top bg-linear-to-b from-gold/70 via-gold/45 to-transparent sm:left-[11px]"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />

        {items.map((item, i) => (
          <motion.li
            key={item.time + item.title}
            className="relative pb-9 last:pb-0"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.75, delay: i * 0.11, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* çizgi üzerindeki elmas nokta */}
            <span className="absolute top-2 -left-10 flex h-4 w-4 items-center justify-center sm:-left-14">
              <span className="h-2 w-2 rotate-45 border border-gold bg-surface" />
            </span>

            <p className="font-label text-[0.68rem] tracking-[0.24em] text-gold-deep uppercase">
              {item.time}
            </p>
            <p className="mt-1 font-display text-[1.45rem] leading-snug text-ink">
              {item.title}
            </p>
            {item.note && (
              <p className="mt-0.5 text-[0.98rem] text-muted italic">{item.note}</p>
            )}
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
