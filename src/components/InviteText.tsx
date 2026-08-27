"use client";

import { siteConfig } from "@/lib/site.config";
import { Divider } from "./ui/Ornaments";
import { DrawIn, Reveal } from "./ui/Reveal";

/** Aileleri ve çifti tanıtan davet metni. */
export function InviteText() {
  return (
    <section
      className="relative overflow-hidden px-7 py-20 text-center sm:py-24"
      style={{
        background:
          "linear-gradient(180deg, var(--color-ivory) 0%, var(--color-parchment) 100%)",
      }}
      id="davet"
    >
      <DrawIn className="mx-auto text-gold">
        <Divider className="mx-auto w-44 sm:w-56" width={224} tone="blush" />
      </DrawIn>

      <div className="mx-auto mt-10 max-w-[30rem]">
        {siteConfig.invitation.lines.map((line, i) => {
          const emphasis = "emphasis" in line && line.emphasis;
          return (
            <Reveal
              key={i}
              delay={0.08 * i}
              as="p"
              className={
                emphasis
                  ? "my-1.5 font-display text-[clamp(1.75rem,7vw,2.35rem)] leading-tight font-normal text-ink"
                  : "text-[1.05rem] leading-[2.1] text-ink-soft italic sm:text-[1.14rem]"
              }
            >
              {line.text}
            </Reveal>
          );
        })}
      </div>

      <DrawIn delay={0.2} className="mx-auto mt-10 text-gold">
        <Divider className="mx-auto w-44 sm:w-56" width={224} tone="blush" />
      </DrawIn>
    </section>
  );
}
