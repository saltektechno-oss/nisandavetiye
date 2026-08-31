"use client";

import { useRef, useState } from "react";
import { Countdown } from "@/components/Countdown";
import { Cover } from "@/components/Cover";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { MapSection } from "@/components/MapSection";
import { MusicPlayer, type MusicHandle } from "@/components/MusicPlayer";
import { Program } from "@/components/Program";
import { RSVPForm } from "@/components/RSVPForm";
import { Ambient } from "@/components/ui/Ambient";

export default function Home() {
  /** Davetiye kapağı açıldı mı? Hero girişi ve müzik butonu buna bağlı. */
  const [opened, setOpened] = useState(false);
  const music = useRef<MusicHandle>(null);

  /** Kapağa dokunma: sayfayı aç ve aynı anda müziği başlat. */
  function handleOpen() {
    setOpened(true);
    music.current?.start();
  }

  return (
    <>
      <Cover opened={opened} onOpen={handleOpen} />
      <Ambient opened={opened} />

      <main>
        <Hero ready={opened} />
        <Countdown />
        <Program />
        <MapSection />
        <RSVPForm />
      </main>

      <Footer />
      <MusicPlayer visible={opened} controls={music} />
    </>
  );
}
