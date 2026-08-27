"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** Hedef tarih geçtiyse true */
  finished: boolean;
};

function diffFrom(target: number, now: number): TimeLeft {
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
    finished: diff === 0,
  };
}

/**
 * Saniyede bir tikleyen saat.
 * `useSyncExternalStore` ile kurulduğu için sunucuda hiç çalışmaz —
 * sunucu ve tarayıcı çıktısı ayrışmaz (hydration uyuşmazlığı olmaz).
 */
function useNow(): number | null {
  const snapshot = useRef<number | null>(null);

  const subscribe = useCallback((onChange: () => void) => {
    snapshot.current = Date.now();
    onChange();

    const id = window.setInterval(() => {
      snapshot.current = Date.now();
      onChange();
    }, 1000);

    return () => {
      window.clearInterval(id);
      snapshot.current = null;
    };
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => snapshot.current,
    () => null,
  );
}

/**
 * Verilen ISO tarihe kalan süre.
 * İlk render'da (ve sunucuda) `null` döner — bileşen bunu
 * "henüz yüklenmedi" olarak ele almalı.
 */
export function useCountdown(isoDate: string): TimeLeft | null {
  const now = useNow();
  if (now === null) return null;

  const target = new Date(isoDate).getTime();
  if (Number.isNaN(target)) return null;

  return diffFrom(target, now);
}
