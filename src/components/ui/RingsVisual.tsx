"use client";

import Image from "next/image";
import { useState } from "react";
import { siteConfig } from "@/lib/site.config";
import { RingsArt } from "./RingsArt";

/**
 * Yüzük görseli — tek kaynak, iki yerde kullanılır (kapak ve hero).
 *
 * `siteConfig.rings.photo` bir dosya yolu ise o fotoğraf gösterilir.
 * Dosya henüz yoksa veya yüklenemezse sessizce koda gömülü vektör çizime
 * düşer; sayfa asla kırık görsel göstermez.
 *
 * Yani fotoğrafı eklemek için tek yapman gereken dosyayı
 * public/images/ring.png olarak koymak — kod değişikliği gerekmez.
 */
export function RingsVisual({
  className = "",
  sizes,
  priority = false,
}: {
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const photo = siteConfig.rings.photo;

  if (!photo || failed) {
    return <RingsArt className={className} />;
  }

  return (
    <Image
      src={photo}
      alt="İki altın nişan yüzüğü"
      width={1000}
      height={810}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
