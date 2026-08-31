"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { siteConfig } from "@/lib/site.config";
import { CornerFrame, Divider, FloralCrest, Sprig } from "./ui/Ornaments";
import { RevealText } from "./ui/RevealText";
import { FloatingRings } from "./ui/FloatingRings";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Kapak açıldıktan sonra sırayla beliren davetiye kartı.
 * Sıra, basılı davetiyenin birebir aynısıdır:
 *   besmele → ayet → yüzükler → ayırıcı → süsleme → isimler →
 *   ayırıcı → aileler → davet cümlesi → tarih → mekân
 */
export function Hero({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  /* Kaydırdıkça katmanlar farklı hızda kayar — derinlik hissi verir */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  /* Metin ekranda dururken asla solmamalı: solma ancak bölüm gerçekten
     yukarı çıkarken (ilerlemenin %70'inden sonra) başlar. */
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);
  const ornamentY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const sprigY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  /* Kaydırma başlar başlamaz ipucu çekilsin; metnin üstüne binmesin */
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  /** Sıralı giriş: her eleman bir öncekinden 0.07sn sonra belirir */
  const item = (i: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 22, filter: "blur(5px)" },
    animate: ready
      ? reduce
        ? { opacity: 1 }
        : { opacity: 1, y: 0, filter: "blur(0px)" }
      : undefined,
    transition: { duration: reduce ? 0.3 : 0.6, delay: reduce ? 0 : 0.15 + i * 0.07, ease: EASE },
  });

  const { bride, groom } = siteConfig.families;
  const nameDelay = 0.62;

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-10 pb-24 text-center sm:px-7 sm:pt-14 sm:pb-28"
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
        {/* 1 — Besmele hattı */}
        {siteConfig.bismillah.show && (
          <motion.p
            {...item(0)}
            aria-label={siteConfig.bismillah.label}
            /* U+FDFD tek karakter ama çok geniş çizilir (~10em): punto küçük
               tutulur, satır yüksekliği hattın uzayan harflerine yer açar. */
            className="mb-6 max-w-full text-[clamp(1.25rem,5.6vw,2rem)] leading-[1.7] whitespace-nowrap text-gold-deep sm:mb-10"
            style={{ fontFamily: "var(--font-arabic)", direction: "rtl" }}
          >
            {siteConfig.bismillah.glyph}
          </motion.p>
        )}

        {/* 2 — Ayet ve kaynağı */}
        <motion.p
          {...item(1)}
          className="max-w-[20rem] font-display text-[1.02rem] leading-[1.75] text-balance text-ink-soft italic sm:max-w-[22rem] sm:text-[1.18rem] sm:leading-[1.85]"
        >
          &ldquo;{siteConfig.verse.text}&rdquo;
        </motion.p>
        <motion.p {...item(2)} className="label-caps mt-4">
          {siteConfig.verse.source}
        </motion.p>

        {/* 3 — Havada süzülen nişan yüzükleri */}
        <FloatingRings
          play={ready}
          delay={0.32}
          className="mt-6 w-[46%] max-w-[11rem] sm:mt-9 sm:w-[62%] sm:max-w-[17rem]"
        />

        {/* 4 — İnce ayırıcı */}
        <motion.span {...item(3)} className="mt-7 block text-gold sm:mt-9">
          <Divider className="mx-auto w-40 sm:w-48" width={192} />
        </motion.span>

        {/* 5 — İsimlerin üstündeki süsleme */}
        <motion.span {...item(4)} className="mt-6 block h-8 w-24 text-gold sm:mt-8 sm:h-11 sm:w-32">
          <FloralCrest className="h-full w-full" />
        </motion.span>

        {/* 6 — İsimler harf harf açılır */}
        <h1 className="mt-4 font-display text-[clamp(2.6rem,14vw,5.25rem)] leading-[1.02] font-light tracking-[0.01em] text-ink italic">
          <RevealText text={siteConfig.couple.bride} play={ready} delay={nameDelay} />
          <span className="mx-2.5 text-gold sm:mx-4">
            <RevealText
              text="&"
              play={ready}
              delay={nameDelay + siteConfig.couple.bride.length * 0.045}
            />
          </span>
          <RevealText
            text={siteConfig.couple.groom}
            play={ready}
            delay={nameDelay + 0.08 + siteConfig.couple.bride.length * 0.045}
          />
        </h1>

        {/* 7 — İkinci ayırıcı */}
        <motion.span {...item(6)} className="mt-6 block text-gold sm:mt-7">
          <Divider className="mx-auto w-36 sm:w-44" width={176} />
        </motion.span>

        {/* 8 — İki aile yan yana, aralarında altın nokta */}
        <motion.div
          {...item(7)}
          className="relative mt-6 flex w-full max-w-[27rem] items-start justify-center gap-5 sm:mt-8 sm:gap-10"
        >
          {[bride, groom].map((family, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <span className="font-label text-[0.68rem] leading-[1.85] tracking-[0.16em] text-ink uppercase sm:text-[0.82rem] sm:tracking-[0.24em]">
                {family.parents}
              </span>
              <span className="font-label text-[0.68rem] leading-[1.85] tracking-[0.16em] text-ink uppercase sm:text-[0.82rem] sm:tracking-[0.24em]">
                {family.surname}
              </span>
            </div>
          ))}
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/70"
          />
        </motion.div>

        {/* 9 — Davet cümlesi */}
        <motion.p
          {...item(8)}
          className="mt-7 max-w-[20rem] font-display text-[1.02rem] leading-[1.75] text-balance text-ink-soft italic sm:mt-9 sm:max-w-[21rem] sm:text-[1.18rem] sm:leading-[1.85]"
        >
          {siteConfig.invitation.tagline}
        </motion.p>

        {/* 10 — Tarih satırı: tarih | gün | saat */}
        <motion.div {...item(9)} className="mt-6 flex items-center gap-3 sm:mt-8 sm:gap-5">
          <span className="font-display text-[1.35rem] leading-none font-medium text-ink sm:text-[1.85rem]">
            {siteConfig.event.dateLabel}
          </span>
          <span className="h-6 w-px bg-gold/45" />
          <span className="font-label text-[0.68rem] tracking-[0.28em] text-muted uppercase sm:text-[0.75rem]">
            {siteConfig.event.dayLabel}
          </span>
          <span className="h-6 w-px bg-gold/45" />
          <span className="font-label text-[0.68rem] tracking-[0.28em] text-muted uppercase sm:text-[0.75rem]">
            {siteConfig.event.timeLabel}
          </span>
        </motion.div>

        {/* 11 — Mekân */}
        <motion.p
          {...item(10)}
          className="mt-6 font-display text-[1.3rem] leading-tight font-medium text-ink sm:mt-7 sm:text-[1.6rem]"
        >
          {siteConfig.venue.name}
        </motion.p>
        <motion.address {...item(11)} className="mt-2 not-italic">
          {siteConfig.venue.addressLines.map((line) => (
            <span key={line} className="block text-[0.98rem] leading-[1.75] text-ink-soft sm:text-[1.02rem]">
              {line}
            </span>
          ))}
        </motion.address>
      </motion.div>

      {/* aşağı kaydırma ipucu */}
      <motion.div
        className="pointer-events-none absolute bottom-6 left-1/2 sm:bottom-9 flex -translate-x-1/2 flex-col items-center gap-2"
        style={reduce ? undefined : { opacity: cueOpacity }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ delay: reduce ? 0 : 1.2, duration: 0.7 }}
        >
          <span className="label-caps text-[0.6rem] text-muted">Kaydır</span>
          <motion.span
            className="block h-9 w-px bg-linear-to-b from-gold to-transparent"
            animate={reduce ? undefined : { scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
            style={{ transformOrigin: "top" }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
