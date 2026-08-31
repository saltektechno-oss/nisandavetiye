"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useImperativeHandle, useRef, useState } from "react";
import { siteConfig } from "@/lib/site.config";
import { AmbientMusic } from "@/lib/ambientMusic";

/**
 * Zarif müzik aç/kapa düğmesi.
 * Gerçek bir dosya (siteConfig.music.src) varsa onu çalar; yoksa tarayıcıda
 * üretilen bir melodiye düşer — böylece dosya eklenmeden de müzik çalışır.
 * Tarayıcı politikaları gereği ses yalnızca kullanıcı hareketiyle başlar.
 */
export type MusicHandle = { start: () => void };

const FADE_MS = 900;
/** Üretilen melodinin notaları gerçek bir kayıttan daha sessiz duyulur;
 *  siteConfig'teki (kayıtlı dosyalar için düşünülen) düşük seviyeden
 *  bağımsız olarak, kendi başına duyulur bir hedefte çalar. */
const AMBIENT_VOLUME = 0.8;

/** Parçayı seçilen giriş saniyesine sarar. Meta veri henüz gelmediyse
 *  (currentTime yazılamaz) yükleme biter bitmez tekrar dener. */
function seekToStart(audio: HTMLAudioElement) {
  const at = siteConfig.music.startAt ?? 0;
  if (at <= 0) return;
  try {
    audio.currentTime = at;
  } catch {
    audio.addEventListener("loadedmetadata", () => (audio.currentTime = at), { once: true });
  }
}

export function MusicPlayer({
  visible,
  controls,
}: {
  visible: boolean;
  /** Kapağa dokunulduğunda `start()` çağrılır — çağrı doğrudan tıklama
   *  işleyicisinin içinden geldiği için tarayıcı sesi engellemez. */
  controls?: React.RefObject<MusicHandle | null>;
}) {
  const src = siteConfig.music.src;
  const targetVolume = siteConfig.music.volume;
  /** Parçanın giriş noktası (saniye) — hem ilk çalışta hem de döngüde
   *  buradan başlar, böylece uzun intro her turda tekrar dinlenmez. */
  const startAt = siteConfig.music.startAt ?? 0;
  const reduce = useReducedMotion();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const ambientRef = useRef<AmbientMusic | null>(null);
  const usingAmbient = useRef(false);
  const [playing, setPlaying] = useState(false);

  function fadeAudioTo(to: number, onDone?: () => void) {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRef.current) window.clearInterval(fadeRef.current);

    const steps = 24;
    const from = audio.volume;
    const stepSize = (to - from) / steps;
    let i = 0;

    fadeRef.current = window.setInterval(() => {
      i += 1;
      audio.volume = Math.min(1, Math.max(0, from + stepSize * i));
      if (i >= steps) {
        if (fadeRef.current) window.clearInterval(fadeRef.current);
        fadeRef.current = null;
        onDone?.();
      }
    }, FADE_MS / steps);
  }

  const start = useCallback(async () => {
    if (src && audioRef.current) {
      const audio = audioRef.current;
      audio.volume = 0;
      try {
        if (startAt > 0 && audio.currentTime < startAt) seekToStart(audio);
        await audio.play();
        usingAmbient.current = false;
        setPlaying(true);
        fadeAudioTo(targetVolume);
        return;
      } catch {
        // Dosya yok/oynatılamadı — üretilen melodiye düş
      }
    }

    if (!ambientRef.current) ambientRef.current = new AmbientMusic(AMBIENT_VOLUME);
    const ok = await ambientRef.current.start();
    if (ok) {
      usingAmbient.current = true;
      setPlaying(true);
    }
  }, [src, targetVolume, startAt]);

  function stop() {
    if (usingAmbient.current) {
      ambientRef.current?.stop();
    } else {
      fadeAudioTo(0, () => audioRef.current?.pause());
    }
    setPlaying(false);
  }

  function toggle() {
    if (playing) stop();
    else void start();
  }

  useImperativeHandle(controls, () => ({ start: () => void start() }), [start]);

  return (
    <>
      {src && (
        <audio
          ref={audioRef}
          src={startAt > 0 ? `${src}#t=${startAt}` : src}
          loop={startAt === 0}
          preload="none"
          /* Giriş noktası varsa döngüyü kendimiz kuruyoruz: parça bitince
             baştan değil, seçilen saniyeden devam eder. */
          onEnded={
            startAt > 0
              ? (e) => {
                  const audio = e.currentTarget;
                  seekToStart(audio);
                  void audio.play().catch(() => {});
                }
              : undefined
          }
        />
      )}

      <AnimatePresence>
        {visible && (
          <motion.button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Müziği durdur" : "Müziği başlat"}
            aria-pressed={playing}
            title={siteConfig.music.title}
            className="fixed right-4 bottom-4 z-40 flex items-center justify-center rounded-full border border-gold/60 bg-surface/95 backdrop-blur-sm sm:right-7 sm:bottom-7"
            style={{
              boxShadow: "0 10px 26px -10px rgba(59,49,42,0.45)",
              width: 52,
              height: 52,
              /* çentikli telefonlarda alt çubuğun üstünde kalsın */
              marginBottom: "env(safe-area-inset-bottom, 0px)",
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ delay: 0.9, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.93 }}
          >
            {/* çalarken düğmenin çevresinde yayılan halka */}
            {playing && !reduce && (
              <motion.span
                className="absolute inset-0 rounded-full border border-gold/45"
                animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              />
            )}

            {/* ekolayzır çubukları */}
            <span className="flex items-end gap-[3px]" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <motion.span
                  key={i}
                  className="w-[2px] rounded-full"
                  style={{
                    background: playing ? "var(--color-gold)" : "var(--color-muted)",
                    opacity: playing ? 1 : 0.55,
                  }}
                  animate={
                    playing && !reduce
                      ? { height: [5, 15, 8, 17, 6] }
                      : { height: [4, 11, 7, 13][i] }
                  }
                  transition={
                    playing && !reduce
                      ? { duration: 1.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.14 }
                      : { duration: 0.35 }
                  }
                />
              ))}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
