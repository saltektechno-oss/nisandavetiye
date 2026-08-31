# Arka plan müziği

Site şu dosyayı bekliyor:

```
public/music/the-vals.mp3
```

Parça ("The Vals") bu isimle buraya konduğu anda çalmaya başlar. Dosya yoksa
site sessizce tarayıcıda üretilen yumuşak melodiye düşer — hiçbir zaman
sessiz kalmaz, hata da vermez.

Farklı bir isim/parça kullanacaksan `src/lib/site.config.ts` içindeki
`music.src` değerini güncelle. Müziği tamamen kapatmak için `src: null` yaz —
o zaman düğme hiç görünmez.

## Giriş noktası (`music.startAt`)

`site.config.ts` → `music.startAt` parçanın kaçıncı saniyesinden başlayacağını
söyler. Şu an **12. saniye** seçili: The Vals'ta ilk saniyeler sessiz/ritim
girişidir, ana vals teması bu noktada girer — kapak açılır açılmaz melodi
duyulsun diye. Parça döngüye girdiğinde de baştan değil, yine bu saniyeden
devam eder.

- Başka bir yerden başlatmak için sayıyı değiştir (saniye cinsinden).
- `startAt: 0` yazarsan parça en baştan çalar.
- Parçayı değiştirirsen bu değeri de gözden geçir — 12. saniye yeni parçada
  anlamlı olmayabilir.

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
