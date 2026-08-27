"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { siteConfig } from "@/lib/site.config";
import { CornerFrame, Divider, FloralCrest, Sprig } from "./ui/Ornaments";
import { RevealText } from "./ui/RevealText";
import { FloatingRings } from "./ui/FloatingRings";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Kapak açıldıktan sonra sırayla beliren açılış bölümü. */
export function Hero({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  /* Kaydırdıkça katmanlar farklı hızda kayar — derinlik hissi verir */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const ornamentY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const sprigY = useTransform(scrollYProgress, [0, 1], ["0%", "62%"]);

  /** Sıralı giriş: her eleman bir öncekinden 0.12sn sonra belirir */
  const item = (i: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 22, filter: "blur(5px)" },
    animate: ready
      ? reduce
        ? { opacity: 1 }
        : { opacity: 1, y: 0, filter: "blur(0px)" }
      : undefined,
    transition: { duration: reduce ? 0.3 : 0.6, delay: reduce ? 0 : 0.15 + i * 0.07, ease: EASE },
  });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-7 pt-16 pb-32 text-center"
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 50% -10%, #f7efdf 0%, var(--color-ivory) 58%)",
      }}
    >
      {/* köşe süslemeleri — sayfa kaydıkça hafifçe yukarı kayar */}
      <motion.span
        className="pointer-events-none absolute inset-0"
        style={reduce ? undefined : { y: ornamentY }}
      >
      <span className="pointer-events-none absolute top-5 left-5 h-11 w-11 text-gold/55 sm:top-8 sm:left-8 sm:h-14 sm:w-14">
        <CornerFrame className="h-full w-full" />
      </span>
      <span className="pointer-events-none absolute top-5 right-5 h-11 w-11 text-gold/55 sm:top-8 sm:right-8 sm:h-14 sm:w-14">
        <CornerFrame className="h-full w-full" flipX />
      </span>
      <span className="pointer-events-none absolute bottom-5 left-5 h-11 w-11 text-gold/55 sm:bottom-8 sm:left-8 sm:h-14 sm:w-14">
        <CornerFrame className="h-full w-full" flipY />
      </span>
      <span className="pointer-events-none absolute right-5 bottom-5 h-11 w-11 text-gold/55 sm:right-8 sm:bottom-8 sm:h-14 sm:w-14">
        <CornerFrame className="h-full w-full" flipX flipY />
      </span>
      </motion.span>

      {/* geniş ekranlarda yanlardaki filigran dallar — en yavaş katman */}
      <motion.span
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={reduce ? undefined : { y: sprigY }}
      >
        <span className="absolute top-1/2 left-[7%] h-64 -translate-y-1/2 text-sage/45 xl:left-[10%]">
          <Sprig className="h-full w-auto" />
        </span>
        <span className="absolute top-1/2 right-[7%] h-64 -translate-y-1/2 -scale-x-100 text-sage/45 xl:right-[10%]">
          <Sprig className="h-full w-auto" />
        </span>
      </motion.span>

      <motion.div
        className="relative mx-auto flex w-full max-w-[36rem] flex-col items-center"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.span {...item(0)} className="mb-7 block h-9 w-28 text-gold sm:h-11 sm:w-32">
          <FloralCrest className="h-full w-full" />
        </motion.span>

        <motion.p
          {...item(1)}
          className="max-w-[22rem] font-display text-[1.06rem] leading-[1.85] text-ink-soft italic sm:text-[1.18rem]"
        >
          &ldquo;{siteConfig.verse.text}&rdquo;
        </motion.p>
        <motion.p {...item(2)} className="label-caps mt-4">
          {siteConfig.verse.source}
        </motion.p>

        {/* Havada süzülen nişan yüzükleri */}
        <FloatingRings
          play={ready}
          delay={0.32}
          className="mt-7 w-[54%] max-w-[13.5rem] sm:mt-9 sm:w-[62%] sm:max-w-[17rem]"
        />

        <motion.span {...item(3)} className="mt-10 block text-gold">
          <Divider className="mx-auto w-40 sm:w-48" width={192} />
        </motion.span>

        <motion.p {...item(4)} className="label-caps mt-8 text-muted">
          Nişan Davetiyesi
        </motion.p>

        {/* İsimler harf harf açılır — yazılıyormuş hissi verir */}
        <h1 className="mt-4 font-display text-[clamp(3rem,15vw,5.25rem)] leading-[1.02] font-light tracking-[0.01em] text-ink italic">
          <RevealText text={siteConfig.couple.bride} play={ready} delay={0.5} />
          <span className="mx-2.5 text-gold sm:mx-4">
            <RevealText text="&" play={ready} delay={0.5 + siteConfig.couple.bride.length * 0.045} />
          </span>
          <RevealText
            text={siteConfig.couple.groom}
            play={ready}
            delay={0.58 + siteConfig.couple.bride.length * 0.045}
          />
        </h1>

        {/* tarih satırı: gün · tarih · saat */}
        <motion.div
          {...item(6)}
          className="mt-7 flex items-center gap-3 font-label text-[0.68rem] tracking-[0.28em] text-ink-soft uppercase sm:gap-4 sm:text-[0.75rem]"
        >
          <span>{siteConfig.event.dayLabel}</span>
          <span className="h-1 w-1 rotate-45 bg-gold" />
          <span className="text-ink">{siteConfig.event.dateLabel}</span>
          <span className="h-1 w-1 rotate-45 bg-gold" />
          <span>{siteConfig.event.timeLabel}</span>
        </motion.div>

        <motion.p
          {...item(7)}
          className="mt-6 max-w-[19rem] text-[1.02rem] leading-[1.85] text-muted"
        >
          {siteConfig.invitation.tagline}
        </motion.p>
      </motion.div>

      {/* aşağı kaydırma ipucu */}
      <motion.div
        className="absolute bottom-9 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ delay: reduce ? 0 : 1, duration: 0.7 }}
      >
        <span className="label-caps text-[0.6rem] text-muted">Kaydır</span>
        <motion.span
          className="block h-9 w-px bg-linear-to-b from-gold to-transparent"
          animate={reduce ? undefined : { scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          style={{ transformOrigin: "top" }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
