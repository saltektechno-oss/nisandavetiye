"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Metni harf harf açar. Her harf bir öncekinden az sonra, hafif aşağıdan
 * ve bulanıktan gelir — isim yazılıyormuş hissi verir.
 *
 * Boşluklar kırılmaz boşlukla korunur; kelime araları bozulmaz.
 */
export function RevealText({
  text,
  play,
  className = "",
  delay = 0,
  stagger = 0.045,
  /** Harflerin arasına konacak özel içerik (ör. altın "&") */
  accentIndex,
  accentClassName = "",
}: {
  text: string;
  play: boolean;
  className?: string;
  delay?: number;
  stagger?: number;
  accentIndex?: number;
  accentClassName?: string;
}) {
  const reduce = useReducedMotion();
  const chars = Array.from(text);

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className} aria-label={text}>
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className={`inline-block ${i === accentIndex ? accentClassName : ""}`}
          initial={{ opacity: 0, y: "0.35em", filter: "blur(6px)" }}
          animate={play ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
          transition={{
            duration: 0.7,
            delay: delay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </span>
  );
}
