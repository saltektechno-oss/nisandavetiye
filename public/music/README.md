# Arka plan müziği

Site şu dosyayı bekliyor:

```
public/music/to-vals-tou-gamou.mp3
```

Parça (**To Vals Tou Gamou** — Evanthia Reboutsika, *Bir Tutam Baharat*)
bu isimle buraya konduğu anda çalmaya başlar. **Dosya adı birebir bu olmalı.**

Dosya yoksa site sessizce tarayıcıda üretilen yumuşak melodiye düşer — hiçbir
zaman sessiz kalmaz, hata da vermez. "Müzik değişmedi" diyorsan neredeyse her
zaman sebep budur: dosya henüz bu klasörde değildir ya da adı farklıdır.
Geliştirme modunda tarayıcı konsoluna `[müzik] … çalınamadı` uyarısı düşer.

Farklı bir isim/parça kullanacaksan `src/lib/site.config.ts` içindeki
`music.src` değerini güncelle. Müziği tamamen kapatmak için `src: null` yaz —
o zaman düğme hiç görünmez.

## Giriş noktası (`music.startAt`)

`site.config.ts` → `music.startAt` parçanın kaçıncı saniyesinden başlayacağını
söyler. Şu an **0** (en baş) seçili: To Vals Tou Gamou zaten ilk notadan
itibaren ana vals temasıyla, yumuşak bir girişle açılıyor — kapağa dokunulduğu
an melodi duyuluyor, beklenecek bir intro yok. Parça döngüye girdiğinde de bu
noktadan devam eder.

- Elindeki kayıtta uzun bir intro varsa (kimi sürümlerde var), temanın
  girdiği saniyeyi yaz — örneğin `startAt: 8`.
- Parçayı değiştirirsen bu değeri de gözden geçir.
- Dosya verilen saniyeden kısaysa site kendiliğinden en baştan çalar.

## Öneriler

- **Format:** MP3 (en geniş tarayıcı desteği). 128–192 kbps yeterli.
- **Süre:** 2–4 dakika; şarkı döngüye alınır.
- **Boyut:** 3 MB altında tut — mobil bağlantıda hızlı açılsın.
- **Ses seviyesi:** Site yumuşak açıyor ve %35 seviyede çalıyor
  (`music.volume`). Parça çok yüksek kaydedilmişse önce normalize et.

## Telif

Ticari şarkılar telif hakkına tabidir; davetiye herkese açık bir adreste
yayınlanıyorsa lisanslı ya da ücretsiz bir kayıt kullan:

- [Pixabay Music](https://pixabay.com/music/) — ücretsiz, atıf gerekmez
- [Free Music Archive](https://freemusicarchive.org/) — lisansa dikkat et
- [Uppbeat](https://uppbeat.io/) — ücretsiz plan atıf ister
