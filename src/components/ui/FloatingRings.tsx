"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RingsArt } from "./RingsArt";

/**
 * Havada süzülen iki altın nişan yüzüğü.
 * Çizim sayfanın içine gömülüdür (RingsArt) — ayrı bir dosya indirilmediği
 * için sayfa göründüğü anda yüzükler de oradadır, sonradan "yüklenmez".
 */
export function FloatingRings({
  play,
  delay = 0,
  className = "",
}: {
  /** Kapak açıldıktan sonra belirsin */
  play: boolean;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`relative ${className}`}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.9 }}
      animate={play ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ duration: reduce ? 0.3 : 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={reduce ? "" : "float-rings"}>
        <RingsArt className="h-auto w-full drop-shadow-[0_18px_26px_rgba(59,49,42,0.18)]" />
      </div>

      {/* Yerdeki gölge — yüzük yükseldikçe küçülür */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-[22%] -bottom-1 h-2.5 rounded-[50%] bg-ink/25 blur-[6px] ${
          reduce ? "" : "float-shadow"
        }`}
      />
    </motion.div>
  );
}
