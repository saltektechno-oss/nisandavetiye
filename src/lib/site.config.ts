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

  /* --- AİLELER (davetiyedeki iki sütun) ----------------------------------- */
  families: {
    bride: { parents: "Naime & Vedat", surname: "Saltek" },
    groom: { parents: "Nagihan & Erdem", surname: "Çebi" },
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
    src: "/music/the-vals.mp3" as string | null,
    title: "The Vals",
    /** 0 ile 1 arası. 0.35 = kısık, arka plan hissi */
    volume: 0.35,
    /** Parçanın kaçıncı saniyesinden başlasın (giriş yeri).
        The Vals'ta ilk saniyeler sessiz/ritim girişidir; ana yaylı-vals
        teması bu noktada girer — kapak açılır açılmaz melodi duyulur.
        Döngüde de baştan değil, bu noktadan devam eder.
        Parçayı değiştirirsen bu değeri de güncelle; 0 = en baştan.       */
    startAt: 12,
  },

  /* --- KATILIM FORMU (Google Formlar) -------------------------------------
     Cevaplar doğrudan kendi Google Formuna, oradan da Google E-Tablolar'a
     düşer. Kurulum 2 dakika — adım adım anlatım: KATILIM-FORMU.md

     Kısaca:
       1. forms.google.com'da 4 soruluk bir form aç:
          Ad Soyad (kısa yanıt) · Katılım (çoktan seçmeli) ·
          Kişi Sayısı (kısa yanıt) · Not (paragraf)
       2. Formu "Bağlantıyı al" ile aç. Adres şuna benzer:
          https://docs.google.com/forms/d/e/1FAIpQLSxxxxxxxx/viewform
          Aradaki "1FAIpQLSxxxxxxxx" kısmı `formId`.
       3. Aynı sayfada sağ tık → "Sayfa kaynağını görüntüle" → "entry."
          diye ara. Her soru için "entry.123456789" bulacaksın; sırasıyla
          aşağıya yaz.
       4. "Katılım" sorusundaki iki seçeneğin metnini `attendingLabels`a
          birebir yaz (harfi harfine aynı olmalı, yoksa Google reddeder).

     Boş bırakırsan form gönderim yapmaz, kullanıcıya açıklayıcı bir uyarı
     gösterir. İstersen aynı değerleri .env.local üzerinden de verebilirsin. */
  googleForm: {
    formId: "",
    entries: {
      name: "",      // örn: "entry.123456789"
      attending: "", // örn: "entry.987654321"
      guests: "",    // örn: "entry.456789123"
      note: "",      // örn: "entry.321654987"
    },
    /** Formdaki çoktan seçmeli seçeneklerin BİREBİR metni */
    attendingLabels: {
      yes: "Katılacağım",
      no: "Katılamayacağım",
    },
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

/** Google Form kimliği — .env.local varsa oradan, yoksa yukarıdan okunur */
export const googleFormId =
  process.env.NEXT_PUBLIC_GOOGLE_FORM_ID?.trim() || siteConfig.googleForm.formId.trim();

/** Cevapların POST edileceği adres (formun kendi "formResponse" ucu) */
export const googleFormEndpoint = googleFormId
  ? `https://docs.google.com/forms/d/e/${googleFormId}/formResponse`
  : "";

/** Formspree adresi — .env.local dosyasından okunur (Google Form yoksa yedek) */
export const formspreeEndpoint =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT?.trim() || "";

/** QR kodun işaret edeceği canlı adres */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") ||
  "https://kevser-tahir.netlify.app";
