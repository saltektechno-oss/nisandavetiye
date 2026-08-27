"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  /** Sıralı görünme için gecikme (saniye) */
  delay?: number;
  /** Nereden süzülerek gelsin */
  from?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  as?: "div" | "section" | "li" | "p" | "span";
};

const offsets = {
  up: { y: 26, x: 0 },
  down: { y: -26, x: 0 },
  left: { y: 0, x: -26 },
  right: { y: 0, x: 26 },
  none: { y: 0, x: 0 },
};

/**
 * Ekrana girdiğinde içeriği yumuşakça belirten sarmalayıcı.
 * Hareket hassasiyeti açık kullanıcılarda animasyon devre dışı kalır.
 */
export function Reveal({
  children,
  delay = 0,
  from = "up",
  className = "",
  as = "div",
}: Props) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  const off = offsets[from];

  return (
    <Comp
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: off.y, x: off.x, filter: "blur(4px)" }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -60px 0px" }}
      transition={{ duration: reduce ? 0.2 : 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}

/** Süslemelerin çizgisinin "çizilerek" belirmesi için */
export function DrawIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, scaleX: 0.55 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: reduce ? 0.2 : 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
