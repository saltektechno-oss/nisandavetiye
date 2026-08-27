/* ===========================================================================
   TÜM İÇERİK BURADA
   ---------------------------------------------------------------------------
   Siteyi güncellemek için tek dosya değiştirmen yeterli: isimler, tarih,
   adres, davet metni, program, müzik dosyası...
   Kod dosyalarına dokunmana gerek yok.
   =========================================================================== */

export const siteConfig = {
  /* --- ÇİFT ------------------------------------------------------------- */
  couple: {
    bride: "Kevser",
    groom: "Tahir",
    /** Tarayıcı sekmesinde ve paylaşımlarda görünen başlık */
    title: "Kevser & Tahir — Nişan Davetiyesi",
    /** Kapaktaki mühürde yer alan baş harfler */
    monogram: "K & T",
  },

  /* --- TARİH ------------------------------------------------------------
     ISO 8601 formatı. "+03:00" Türkiye saati demek — değiştirme.
     Örnek: 13 Eylül 2026, saat 19:00 → "2026-09-13T19:00:00+03:00"        */
  event: {
    /** Geri sayımın hedefi ve takvim kaydının başlangıcı */
    startsAt: "2026-09-13T19:00:00+03:00",
    /** Takvim kaydının bitişi (yaklaşık) */
    endsAt: "2026-09-13T23:30:00+03:00",
    /** Ekranda yazıyla görünen tarih ve saat */
    dateLabel: "13 Eylül 2026",
    dayLabel: "Pazar",
    timeLabel: "19.00",
  },

  /* --- MEKÂN ------------------------------------------------------------ */
  venue: {
    name: "Rihve Davet Salonu",
    addressLines: [
      "İlyas, Şehit Metin Atabey Sokak No: 1/A",
      "44900 Yeşilyurt / Malatya",
    ],
    /** Haritada aranacak metin — embed ve yol tarifi bundan üretilir */
    mapsQuery:
      "Rihve Davet Salonu, İlyas, Şehit Metin Atabey Sokak No:1/A, 44900 Yeşilyurt/Malatya",
    /** İsteğe bağlı: salonun telefonu. Boş bırakırsan buton görünmez. */
    phone: "",
  },

  /* --- AÇILIŞ SÖZÜ (Hero) ----------------------------------------------- */
  verse: {
    text: "Ve Allah, onların kalplerinin arasını sevgi ile birleştirdi.",
    source: "Enfâl Sûresi, 63. Ayet",
  },

  /* --- DAVET METNİ ------------------------------------------------------- */
  invitation: {
    /** Hero bölümündeki kısa cümle */
    tagline:
      "Hayatımızın en özel günlerinden birinde sevdiklerimizle birlikte olmaktan onur duyarız.",
    /** Davet metni bölümü — satırlar alt alta gelir.
        `emphasis: true` verilen satır koyu/vurgulu yazılır. */
    lines: [
      { text: "Naime Saltek ve merhum Vedat Saltek'in kızları" },
      { text: "Kevser", emphasis: true },
      { text: "ile" },
      { text: "Nagihan & Erdem Çebi'nin oğulları" },
      { text: "Tahir'in", emphasis: true },
      { text: "nişan törenlerine sizleri bekleriz." },
    ],
  },

  /* --- PROGRAM / AKIŞ ---------------------------------------------------
     Gerekmiyorsa diziyi boşalt (`items: []`) — bölüm otomatik gizlenir.   */
  program: {
    items: [
      { time: "19.00", title: "Karşılama", note: "İkram ve tatlılar" },
      { time: "20.00", title: "Nişan Merasimi", note: "Yüzük takma töreni" },
      { time: "21.00", title: "Müzik & Dans", note: "" },
    ],
  },

  /* --- YÜZÜK GÖRSELİ -----------------------------------------------------
     Hem kapakta hem de ayetin altında kullanılan yüzükler.

     Yol zaten bağlı: arka planı silinmiş (şeffaf) PNG'yi
        public/images/ring.png
     olarak koyman yeterli — kod değiştirmene gerek yok.

     Dosya yoksa veya yüklenemezse site sessizce koda gömülü vektör çizime
     düşer, hiçbir zaman kırık görsel göstermez. Süzülme animasyonu ve
     gölge her iki durumda da aynı çalışır.

     Çizimi tercih edersen: photo: null                                    */
  rings: {
    photo: "/images/ring.png" as string | null,
  },

  /* --- KAPAK (davetiye açılış ekranı) ------------------------------------ */
  cover: {
    hint: "Davetiyeyi açmak için dokunun",
  },

  /* --- MÜZİK -------------------------------------------------------------
     Dosyayı /public/music/ içine koy ve adını buraya yaz.
     `src: null` yaparsan müzik butonu hiç görünmez.                       */
  music: {
    src: "/music/background.mp3" as string | null,
    title: "Nişan müziği",
    /** 0 ile 1 arası. 0.35 = kısık, arka plan hissi */
    volume: 0.35,
  },

  /* --- FOOTER ------------------------------------------------------------ */
  footer: {
    closing: "Sevgiyle hazırlandı",
  },
};

export type SiteConfig = typeof siteConfig;

/* --- TÜRETİLMİŞ DEĞERLER (elle değiştirmene gerek yok) ------------------- */

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  siteConfig.venue.mapsQuery,
)}`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  siteConfig.venue.mapsQuery,
)}&output=embed&hl=tr&z=16`;

/** Formspree adresi — .env.local dosyasından okunur */
export const formspreeEndpoint =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT?.trim() || "";

/** QR kodun işaret edeceği canlı adres */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") ||
  "https://kevser-tahir.netlify.app";
