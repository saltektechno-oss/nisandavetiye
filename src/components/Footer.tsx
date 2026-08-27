"use client";

import { siteConfig } from "@/lib/site.config";
import { FloralCrest } from "./ui/Ornaments";
import { Reveal } from "./ui/Reveal";

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden px-7 pt-20 pb-24 text-center sm:pt-24"
      style={{
        background:
          "linear-gradient(180deg, var(--color-parchment) 0%, var(--color-linen) 100%)",
      }}
    >
      <Reveal className="mx-auto mb-8 block h-10 w-32 text-gold">
        <FloralCrest className="h-full w-full" />
      </Reveal>

      <Reveal delay={0.1} as="p" className="font-display text-[clamp(2rem,9vw,2.9rem)] leading-tight font-light text-ink italic">
        {siteConfig.couple.bride}
        <span className="mx-1.5 text-gold">&amp;</span>
        {siteConfig.couple.groom}
      </Reveal>

      <Reveal
        delay={0.18}
        as="p"
        className="mt-4 font-label text-[0.68rem] tracking-[0.3em] text-muted uppercase"
      >
        {siteConfig.event.dateLabel} &middot; {siteConfig.venue.name}
      </Reveal>

      <Reveal delay={0.26} className="mx-auto mt-9 h-px w-24 bg-gold/40" />

      <Reveal
        delay={0.32}
        as="p"
        className="mt-7 text-[0.95rem] text-gold-deep/85 italic"
      >
        {siteConfig.footer.closing}
      </Reveal>
    </footer>
  );
}
