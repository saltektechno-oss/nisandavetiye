# Arka plan müziği

Müzik dosyanı bu klasöre koy ve adını `background.mp3` yap:

```
public/music/background.mp3
```

Farklı bir isim kullanmak istersen `src/lib/site.config.ts` içindeki
`music.src` değerini güncelle. Müziği tamamen kapatmak için `src: null` yaz —
o zaman düğme hiç görünmez.

## Öneriler

- **Format:** MP3 (en geniş tarayıcı desteği). 128–192 kbps yeterli.
- **Süre:** 2–4 dakika; şarkı döngüye alınır (`loop`), sonu başına yumuşak
  bağlanan bir parça daha iyi durur.
- **Boyut:** 3 MB altında tut — mobil bağlantıda hızlı açılsın.
- **Ses seviyesi:** Site zaten yumuşak açıyor ve %35 seviyede çalıyor
  (`music.volume`). Parçanın kendisi çok yüksek kaydedilmişse önce
  normalize et.

## Telif

Ticari şarkılar telif hakkına tabidir. Ücretsiz/lisanslı kaynaklar:

- [Pixabay Music](https://pixabay.com/music/) — ücretsiz, atıf gerekmez
- [Free Music Archive](https://freemusicarchive.org/) — lisansa dikkat et
- [Uppbeat](https://uppbeat.io/) — ücretsiz plan atıf ister

Klasik/romantik bir his için arama önerisi: *"romantic piano"*, *"soft strings"*,
*"acoustic wedding"*.
