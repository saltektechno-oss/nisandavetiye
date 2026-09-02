/* ===========================================================================
   TÜM İÇERİK BURADA
   ---------------------------------------------------------------------------
   Siteyi güncellemek için tek dosya değiştirmen yeterli: isimler, tarih,
   adres, davet metni, program, müzik dosyası...
   Kod dosyalarına dokunmana gerek yok.
   =========================================================================== */

/** Davetiyede adı geçen bir ebeveyn. `late: true` → adının önüne "(merhum)". */
export type Parent = { name: string; late?: boolean };

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
    startsAt: "2026-09-13T18:00:00+03:00",
    /** Takvim kaydının bitişi (yaklaşık) */
    endsAt: "2026-09-13T22:30:00+03:00",
    /** Ekranda yazıyla görünen tarih ve saat */
    dateLabel: "13 Eylül 2026",
    dayLabel: "Pazar",
    timeLabel: "18.00",
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

  /* --- BESMELE ----------------------------------------------------------
     Davetiyenin en üstündeki hat. `show: false` yaparsan hiç görünmez.    */
  bismillah: {
    show: true,
    /** U+FDFD — tek karakterde besmele hattı (Amiri fontuyla çizilir) */
    glyph: "﷽",
    label: "Bismillâhirrahmânirrahîm",
  },

  /* --- AİLELER (davetiyedeki iki sütun) -----------------------------------
     Her ebeveyn ayrı bir kayıt. `late: true` verilen isim, adının hemen
     önünde küçük puntolu "(merhum)" ile yazılır; ikisi tek parça gibi
     davranır, araya satır sonu girmez.                                    */
  families: {
    bride: {
      parents: [{ name: "Naime" }, { name: "Vedat", late: true }] as Parent[],
      surname: "Saltek",
    },
    groom: {
      parents: [{ name: "Nagihan" }, { name: "Erdem" }] as Parent[],
      surname: "Çebi",
    },
  },

  /* --- AÇILIŞ SÖZÜ (Hero) ----------------------------------------------- */
  verse: {
    text: "Ve Allah, onların kalplerinin arasını sevgi ile birleştirdi.",
    source: "Enfâl Sûresi, 63. Ayet",
  },

  /* --- DAVET METNİ ------------------------------------------------------- */
  invitation: {
    /** Davetiyenin ana cümlesi — isimlerin ve ailelerin altında durur */
    tagline:
      "Nişan törenimizde sizleri de aramızda görmekten mutluluk duyarız.",
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
      { time: "18.00", title: "Karşılama", note: "İkram ve tatlılar" },
      { time: "19.00", title: "Nişan Merasimi", note: "Yüzük takma töreni" },
      { time: "20.00", title: "Müzik & Dans", note: "" },
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
    src: "/music/to-vals-tou-gamou.mp3" as string | null,
    title: "To Vals Tou Gamou",
    /** 0 ile 1 arası. 0.35 = kısık, arka plan hissi */
    volume: 0.35,
    /** Parçanın kaçıncı saniyesinden başlasın (giriş yeri).
        "To Vals Tou Gamou" ilk notadan itibaren ana vals temasıyla açılır —
        yumuşak giriş zaten davetiyenin açılışına birebir oturuyor, bu yüzden
        0 (en baş) seçildi. Başka bir yerden başlatmak istersen saniyeyi yaz;
        parça döngüye girdiğinde de baştan değil buradan devam eder.
        Dosya bu saniyeden kısaysa site kendiliğinden en başa döner.        */
    startAt: 0,
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

/** QR kodun işaret edeceği canlı adres */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") ||
  "https://kevser-tahir.netlify.app";
