"use client";

import { useMemo } from "react";

/** Sabit tohumlu rastgele üretici — sunucu ve tarayıcı aynı sonucu verir. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Burst = {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  tx: string;
  ty: string;
};

/**
 * Sayfanın tamamını kaplayan ışıltı katmanı: yukarı süzülen altın zerreler
 * ve yavaşça parlayıp sönen yıldızlar. Sabit konumlu olduğu için aşağı
 * inildikçe animasyon kesintisiz devam eder.
 *
 * `opened` true olduğunda bir kez merkezden dağılan parıltı yağmuru atar.
 */
export function Ambient({ opened }: { opened: boolean }) {
  const motes = useMemo(() => {
    const rand = seeded(7);
    return Array.from({ length: 22 }, () => ({
      left: `${(rand() * 100).toFixed(2)}%`,
      size: +(2 + rand() * 2.5).toFixed(2),
      duration: +(16 + rand() * 18).toFixed(2),
      delay: +(-rand() * 26).toFixed(2),
      driftX: `${((rand() - 0.5) * 90).toFixed(1)}px`,
      opacity: +(0.25 + rand() * 0.4).toFixed(2),
    }));
  }, []);

  const sparks = useMemo(() => {
    const rand = seeded(21);
    return Array.from({ length: 18 }, () => ({
      left: `${(rand() * 100).toFixed(2)}%`,
      top: `${(rand() * 100).toFixed(2)}%`,
      size: +(6 + rand() * 12).toFixed(1),
      duration: +(3.4 + rand() * 4.2).toFixed(2),
      delay: +(-rand() * 7).toFixed(2),
      peak: +(0.3 + rand() * 0.45).toFixed(2),
    }));
  }, []);

  /* Kapak açılınca tek seferlik parıltı yağmuru.
     Kapak kapalıyken (ve sunucuda) liste boş olduğu için render farkı olmaz.
     Animasyon `forwards` ile bittiği yerde şeffaf kalır; temizlemeye gerek yok. */
  const bursts = useMemo<Burst[]>(() => {
    if (!opened) return [];
    const rand = seeded(101);
    return Array.from({ length: 34 }, (_, i) => {
      const angle = rand() * Math.PI * 2;
      const dist = 90 + rand() * 320;
      return {
        id: i,
        left: `${(44 + rand() * 12).toFixed(1)}%`,
        top: `${(40 + rand() * 16).toFixed(1)}%`,
        size: +(8 + rand() * 16).toFixed(1),
        delay: +(rand() * 0.5).toFixed(2),
        tx: `${(Math.cos(angle) * dist).toFixed(0)}px`,
        ty: `${(Math.sin(angle) * dist - 40).toFixed(0)}px`,
      };
    });
  }, [opened]);

  return (
    <div className="ambient" aria-hidden="true">
      {motes.map((m, i) => (
        <span
          key={`m${i}`}
          className="mote"
          style={{
            left: m.left,
            width: m.size,
            height: m.size,
            animationDuration: `${m.duration}s`,
            animationDelay: `${m.delay}s`,
            opacity: m.opacity,
            ["--drift-x" as string]: m.driftX,
          }}
        />
      ))}

      {sparks.map((s, i) => (
        <span
          key={`s${i}`}
          className="spark"
          style={{
            left: s.left,
            top: s.top,
            ["--size" as string]: `${s.size}px`,
            ["--dur" as string]: `${s.duration}s`,
            ["--delay" as string]: `${s.delay}s`,
            ["--peak" as string]: s.peak,
          }}
        />
      ))}

      {bursts.map((b) => (
        <span
          key={`b${b.id}`}
          className="spark spark--burst"
          style={{
            left: b.left,
            top: b.top,
            ["--size" as string]: `${b.size}px`,
            ["--delay" as string]: `${b.delay}s`,
            ["--tx" as string]: b.tx,
            ["--ty" as string]: b.ty,
          }}
        />
      ))}
    </div>
  );
}
