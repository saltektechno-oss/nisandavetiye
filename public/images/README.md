# Görseller

## Yüzük fotoğrafı

Arka planı silinmiş (şeffaf) PNG'yi bu klasöre **`ring.png`** adıyla koy:

```
public/images/ring.png
```

Hepsi bu — kod değiştirmene gerek yok. Yol `src/lib/site.config.ts` içinde
zaten bağlı (`rings.photo`). Fotoğraf hem davetiye kapağında hem de ayetin
altında görünür; havada süzülme animasyonu ve gölge aynen çalışır.

Dosya yoksa veya bozuksa site sessizce koda gömülü vektör çizime düşer —
hiçbir zaman kırık görsel görünmez.

**Öneriler**
- Şeffaf arka plan (PNG-24). JPG olmaz, arka planı beyaz kalır.
- En az 800 px genişlik; kare değil, yatay (yüzükler yan yana) daha iyi durur.
- 300 KB altında tutmaya çalış.
