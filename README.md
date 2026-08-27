# Kevser & Tahir — Dijital Nişan Davetiyesi

Tek sayfalık, mobil öncelikli, klasik ve romantik bir nişan davetiyesi sitesi.
Davetiye kapağı animasyonu, canlı geri sayım, gecenin akışı, harita, RSVP
formu, arka plan müziği ve basılı davetiyeye eklenecek QR kod üreteci içerir.
Fotoğraf kullanmaz — tüm görseller kodla çizilir.

**Teknolojiler:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 ·
Framer Motion · Formspree · Netlify

---

## 1. Hızlı Başlangıç

```bash
# 1) Bağımlılıkları kur
npm install

# 2) Ortam değişkenleri dosyasını oluştur
cp .env.example .env.local

# 3) Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcıda aç: <http://localhost:3000>
QR sayfası: <http://localhost:3000/qr>

Diğer komutlar:

| Komut | Ne yapar |
| --- | --- |
| `npm run dev` | Geliştirme sunucusu (canlı yenileme) |
| `npm run build` | Üretim derlemesi |
| `npm run start` | Derlenmiş sürümü çalıştırır |
| `npm run lint` | Kod denetimi |
| `npm run typecheck` | Tip denetimi |

---

## 2. İçeriği Nereden Değiştiririm?

**Neredeyse her şey tek bir dosyada:** [`src/lib/site.config.ts`](src/lib/site.config.ts)

Kod bilmene gerek yok — tırnak içindeki metinleri değiştirmen yeterli.

| Ne değiştirmek istiyorsun | Dosyadaki bölüm |
| --- | --- |
| İsimler, sayfa başlığı | `couple` |
| Tarih, saat, geri sayım hedefi | `event` |
| Salon adı, adres, telefon | `venue` |
| Açılıştaki ayet / söz | `verse` |
| Davet metni, aile isimleri | `invitation` |
| Gecenin akışı (program) | `program` |
| Kapak metni | `cover` |
| Müzik dosyası ve ses seviyesi | `music` |
| Alt yazı | `footer` |

### Tarihi değiştirmek

`event.startsAt` alanı geri sayımı ve takvim kaydını besler. Biçim:

```ts
startsAt: "2026-09-13T19:00:00+03:00",
//         yıl-ay-gün saat:dk:sn  Türkiye saati
```

Ekranda yazıyla görünen tarih ayrı tutulur (`dateLabel`, `dayLabel`,
`timeLabel`) — ikisini birlikte güncellemeyi unutma.

### Bölümü tamamen gizlemek

- **Program:** `program.items` dizisini boşalt → `items: []`
- **Müzik:** `music.src` değerini `null` yap

---

## 3. Müzik

Ekstra bir şey yapmasan da site **çalışan bir müzikle** gelir: `public/music/`
klasöründe dosya yoksa tarayıcı kendi başına yumuşak bir melodi üretir
(Web Audio API) — indirme yok, telif sorunu yok. Kendi parçanı eklemek
istersen `public/music/background.mp3` olarak koy, o zaman site otomatik
olarak gerçek dosyaya geçer. Ayrıntılar ve telifsiz kaynak önerileri:
[`public/music/README.md`](public/music/README.md)

Müzik, davetiye kapağına dokunulduğu anda başlar (tarayıcı politikaları
gereği sesin bir kullanıcı hareketiyle başlaması gerekir). Sağ alttaki
düğmeden istediğin an kapatıp açabilirsin.

---

## 4. RSVP Formu (Formspree)

Form, sunucu gerektirmeden doğrudan Formspree'ye gönderilir; cevaplar
e‑postana düşer.

1. <https://formspree.io> adresinde ücretsiz hesap aç.
2. **New Form** → forma bir isim ver (örn. "Nişan RSVP").
3. Sana verdiği adresi kopyala (`https://formspree.io/f/xxxxxxxx`).
4. `.env.local` dosyasına yapıştır:

   ```bash
   NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
   ```

5. Netlify'a yüklerken **aynı değişkeni Netlify panelinde de tanımla**
   (Site settings → Environment variables). Aksi halde canlı sitede form
   çalışmaz.

> İlk gönderimden sonra Formspree bir doğrulama e‑postası yollar; onaylamadan
> cevaplar gelmez. Yayına almadan önce formu bir kez kendin doldur.

Forma gelen alanlar: Ad Soyad · Katılım · Kişi Sayısı · Not.
Formda görünmeyen bir bot tuzağı (`_gotcha`) da var — spam'i azaltır.

Ücretsiz plan aylık 50 gönderim verir; daha fazlası gerekirse Formspree'de
plan yükseltmen gerekir.

---

## 5. QR Kod

`/qr` adresinde ayrı bir sayfa var (arama motorlarına kapalı, davetliler
görmez).

1. Siteyi Netlify'a yükle, gerçek adresini al.
2. `/qr` sayfasını aç, adres kutusuna gerçek adresi yapıştır.
3. **SVG İndir** (matbaa için en iyisi — her boyutta net) veya
   **PNG İndir** (2048 px) düğmesine bas.
4. Adresi kalıcı yapmak için `.env.local` ve Netlify'daki
   `NEXT_PUBLIC_SITE_URL` değişkenini de güncelle.

QR kod yüksek hata düzeltme seviyesiyle (H) üretilir; baskıdaki küçük
lekelerde bile okunur. Davetiye kartında **en az 2×2 cm** basmanı öneririm.

---

## 6. Netlify'a Deploy

### Yol A — GitHub üzerinden (önerilen)

1. Bu repoyu GitHub'a gönder.
2. <https://app.netlify.com> → **Add new site** → **Import an existing project**.
3. Repoyu seç. Netlify Next.js'i tanır ve ayarları kendi doldurur
   (`netlify.toml` zaten repoda).
4. **Environment variables** bölümüne ekle:
   - `NEXT_PUBLIC_FORMSPREE_ENDPOINT`
   - `NEXT_PUBLIC_SITE_URL`
5. **Deploy site**. Bundan sonra her `git push` otomatik yayına alır.

### Yol B — Netlify CLI

```bash
npm i -g netlify-cli
netlify login
netlify init      # siteyi oluştur / bağla
netlify deploy --build --prod
```

### Alan adı

Netlify sana `xxx.netlify.app` adresi verir; **Domain settings**'ten
değiştirebilir ya da kendi alan adını bağlayabilirsin. Adresi değiştirirsen
QR kodu yeniden üretmeyi unutma.

---

## 7. Proje Yapısı

```
src/
  app/
    layout.tsx          Fontlar, sayfa başlığı, paylaşım bilgileri
    page.tsx            Bölümleri sırayla dizen ana sayfa
    globals.css         Renkler, tipografi, ortak stiller (tasarım jetonları)
    qr/page.tsx         QR kod sayfası
  components/
    Cover.tsx           Açılıştaki iki kanatlı davetiye kapağı
    Hero.tsx            İsimler, ayet, tarih
    Countdown.tsx       Canlı geri sayım
    InviteText.tsx      Aileleri tanıtan davet metni
    Program.tsx         Gecenin akışı
    MapSection.tsx      Harita, yol tarifi, takvime ekle
    RSVPForm.tsx        Katılım formu (Formspree)
    MusicPlayer.tsx     Müzik aç/kapa düğmesi
    Footer.tsx          Kapanış
    QRSection.tsx       QR üretici
    ui/                 Ortak parçalar: süslemeler, animasyon sarmalayıcıları
  lib/
    site.config.ts      >>> TÜM İÇERİK BURADA <<<
    useCountdown.ts     Geri sayım mantığı
    ics.ts              Takvim (.ics) dosyası üretimi
public/
  music/                Arka plan müziği
```

---

## 8. Tasarım Notları

**Renkler** — `src/app/globals.css` içindeki `@theme` bloğunda tanımlı. Bir
rengi değiştirmen tüm siteye yansır.

| Jeton | Değer | Kullanım |
| --- | --- | --- |
| `--color-ivory` | `#FBF8F2` | Ana zemin |
| `--color-parchment` | `#F5EEE1` | Ara bölüm zemini |
| `--color-surface` | `#FFFDF8` | Kartlar |
| `--color-gold` | `#BE9B57` | Ana vurgu (altın) |
| `--color-gold-deep` | `#A07A3C` | Altın geçişin koyu ucu |
| `--color-blush` | `#D8B9B2` | Gül kurusu ikincil vurgu |
| `--color-sage` | `#9BA88C` | Yaprak süslemeleri |
| `--color-ink` | `#3B312A` | Metin |
| `--color-muted` | `#8A7A69` | İkincil metin |

**Yazı tipleri** — Başlıklar ve gövde metni *Cormorant Garamond* (klasik,
zarif bir serif), küçük büyük-harf etiketler *Jost*. İkisi de Google Fonts'tan
gelir ve derleme sırasında siteye gömülür (dışarıya istek atmaz).

**Erişilebilirlik** — Klavye ile gezinme, ekran okuyucu etiketleri ve
"hareketi azalt" tercihi destekleniyor: işletim sisteminde bu ayar açıksa tüm
animasyonlar kapanır.

---

## 9. Sık Karşılaşılan Durumlar

**Geri sayım "––" gösteriyor** — Normal; sayaç yalnızca tarayıcıda çalışır,
sayfa yüklenir yüklenmez gerçek değerler gelir.

**Harita boş / gri görünüyor** — İnternet bağlantısını kontrol et. Adres
`site.config.ts` içindeki `venue.mapsQuery` alanından üretilir; salonu Google
Haritalar'da aratıp tam olarak orada göründüğü şekilde yaz.

**Form gönderilmiyor** — `NEXT_PUBLIC_FORMSPREE_ENDPOINT` tanımlı mı? Netlify'a
da eklendi mi? Ortam değişkenini değiştirdikten sonra siteyi yeniden deploy
etmen gerekir.

**Müzik çalmıyor** — Dosya eklemesen de site üretilen bir melodi çalar; hiç
ses gelmiyorsa telefon sessiz moddadır (bu iOS'ta tarayıcı seslerini de
kapatır). Kendi `background.mp3` dosyanı eklediysen ve o çalmıyorsa dosya
yolunu ve formatını kontrol et — site otomatik olarak üretilen melodiye
geri döner, sessiz kalmaz.

**Yaptığım değişiklik canlıda görünmüyor** — Netlify'da yeni deploy tamamlandı
mı? Tamamlandıysa tarayıcı önbelleğini temizleyip tekrar dene.
