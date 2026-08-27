"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { siteConfig } from "@/lib/site.config";
import { SealRing } from "./ui/Ornaments";
import { RingsArt } from "./ui/RingsArt";

const EASE = [0.65, 0, 0.35, 1] as const;

/**
 * Açılış kapağı: iki kanatlı davetiye kapağı.
 * Yüzük mührüne dokununca kanatlar iki yana açılır ve site görünür.
 */
export function Cover({
  opened,
  onOpen,
}: {
  opened: boolean;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();

  /* Kapak kapalıyken arka planın kaymasını engelle */
  useEffect(() => {
    document.body.dataset.locked = opened ? "false" : "true";
    return () => {
      document.body.dataset.locked = "false";
    };
  }, [opened]);

  const doorTransition = { duration: reduce ? 0.3 : 0.85, ease: EASE };

  return (
    <AnimatePresence>
      {!opened && (
        <motion.div
          key="cover"
          className="fixed inset-0 z-50"
          exit={{ pointerEvents: "none" }}
          aria-label="Davetiye kapağı"
        >
          {/* --- Sol kanat --- */}
          <motion.div
            className="cover-panel absolute inset-y-0 left-0 w-1/2"
            style={{
              boxShadow: "inset -22px 0 34px -26px rgba(59,49,42,0.5)",
            }}
            initial={{ x: 0 }}
            exit={{ x: "-102%" }}
            transition={doorTransition}
          >
            {/* orta dikiş — ince altın çizgi */}
            <span className="absolute inset-y-0 right-0 w-px bg-linear-to-b from-gold/45 via-gold/8 to-gold/45" />
          </motion.div>

          {/* --- Sağ kanat --- */}
          <motion.div
            className="cover-panel absolute inset-y-0 right-0 w-1/2"
            style={{
              boxShadow: "inset 22px 0 34px -26px rgba(59,49,42,0.5)",
            }}
            initial={{ x: 0 }}
            exit={{ x: "102%" }}
            transition={doorTransition}
          >
            <span className="absolute inset-y-0 left-0 w-px bg-linear-to-b from-gold/45 via-gold/8 to-gold/45" />
          </motion.div>

          {/* --- Kapak içeriği --- */}
          <motion.button
            type="button"
            onClick={onOpen}
            className="absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center px-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
            transition={{ duration: reduce ? 0.25 : 0.75, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Davetiyeyi aç"
          >
            {/* köşe ince çerçeve */}
            <span className="pointer-events-none absolute inset-5 border border-gold/25 sm:inset-8" />
            <span className="pointer-events-none absolute inset-[26px] border border-gold/15 sm:inset-[38px]" />

            <motion.p
              className="label-caps mb-9"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              Nişan Davetiyesi
            </motion.p>

            {/* Yüzük mührü */}
            <motion.span
              className="relative flex h-[168px] w-[168px] items-center justify-center"
              initial={{ opacity: 0, scale: 0.86 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* dönen noktalı halka */}
              <motion.span
                className="absolute inset-0 text-gold"
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
              >
                <SealRing className="h-full w-full" />
              </motion.span>

              {/* Yüzükler: çerçevesiz, havada süzülür */}
              <span className={`relative block w-[132px] ${reduce ? "" : "float-rings"}`}>
                {siteConfig.rings.photo ? (
                  <Image
                    src={siteConfig.rings.photo}
                    alt="İki altın nişan yüzüğü"
                    width={1000}
                    height={810}
                    sizes="132px"
                    priority
                    className="h-auto w-full drop-shadow-[0_14px_22px_rgba(59,49,42,0.28)]"
                  />
                ) : (
                  <RingsArt className="h-auto w-full drop-shadow-[0_14px_22px_rgba(59,49,42,0.28)]" />
                )}
              </span>
            </motion.span>

            {/* mühürden inen ince altın çizgi */}
            <motion.span
              className="mt-5 block w-px bg-linear-to-b from-gold to-transparent"
              initial={{ height: 0 }}
              animate={{ height: 34 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.h1
              className="shimmer-text mt-5 font-display text-[clamp(2.4rem,11vw,3.6rem)] leading-[1.05] font-light italic"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {siteConfig.couple.bride} &amp; {siteConfig.couple.groom}
            </motion.h1>

            <motion.p
              className="mt-1 font-label text-[0.72rem] tracking-[0.34em] text-muted uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.46, duration: 0.6 }}
            >
              {siteConfig.event.dateLabel}
            </motion.p>

            <motion.span
              className="mt-11 flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.6 }}
            >
              <span className="label-caps animate-breathe text-gold">
                {siteConfig.cover.hint}
              </span>
              <motion.svg
                viewBox="0 0 24 12"
                className="h-2.5 w-6 text-gold/70"
                fill="none"
                aria-hidden="true"
                animate={reduce ? undefined : { y: [0, 4, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M2 2 L12 10 L22 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </motion.svg>
            </motion.span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
