# Katılım formunu Google Formlar'a bağlama

Sitedeki "Katılım Bildirimi" formu, cevapları **senin Google Formuna** yollar.
Google Form da cevapları otomatik olarak bir **Google E-Tablo**'ya yazar —
davetlileri tablodan takip edersin. Kurulum bir kereliktir, ~5 dakika sürer.

---

## 1) Formu oluştur

[forms.google.com](https://forms.google.com) → boş form. Tam olarak **4 soru**
ekle, sırası önemli değil ama tipleri önemli:

| # | Soru başlığı  | Tip             | Not                                  |
| - | ------------- | --------------- | ------------------------------------ |
| 1 | Ad Soyad      | Kısa yanıt      | —                                    |
| 2 | Katılım       | Çoktan seçmeli  | Seçenekler: `Katılacağım`, `Katılamayacağım` |
| 3 | Kişi Sayısı   | Kısa yanıt      | —                                    |
| 4 | Not           | Paragraf        | —                                    |

> Soruların hiçbirini **zorunlu** yapma. Site zaten kendi kontrolünü yapıyor;
> zorunlu alan Google tarafında gönderimi reddedebilir.

Cevapların tabloya düşmesi için: form üzerinde **Yanıtlar** sekmesi →
yeşil E-Tablolar simgesi → "Yeni e-tablo oluştur".

## 2) Form kimliğini (`formId`) al

Sağ üstten **Gönder** → bağlantı simgesi → adresi kopyala. Şuna benzer:

```
https://docs.google.com/forms/d/e/1FAIpQLSd7X...uzun...kod/viewform
```

`/d/e/` ile `/viewform` arasındaki kod senin **form kimliğin**.

## 3) Soru kimliklerini (`entry.…`) al

Aynı bağlantıyı tarayıcıda aç → sayfada **sağ tık → "Sayfa kaynağını
görüntüle"** → `Ctrl+F` ile `entry.` ara.

Her soru için `entry.123456789` biçiminde bir numara göreceksin. Sırasıyla
hangisinin hangi soruya ait olduğunu, numaranın hemen yanında geçen soru
başlığından anlarsın.

> Kolay yol: formu bir kere kendin doldur, göndermeden önce adres çubuğundaki
> "önceden doldurulmuş bağlantı" (Gönder → ⋮ → *Önceden doldurulmuş bağlantı
> al*) yöntemini kullan. Oluşan adreste her sorunun `entry.…` numarası
> girdiğin metinle birlikte yan yana görünür.

## 4) Değerleri siteye gir

`src/lib/site.config.ts` içindeki `googleForm` bloğunu doldur:

```ts
googleForm: {
  formId: "1FAIpQLSd7X...uzun...kod",
  entries: {
    name: "entry.123456789",
    attending: "entry.987654321",
    guests: "entry.456789123",
    note: "entry.321654987",
  },
  attendingLabels: {
    yes: "Katılacağım",
    no: "Katılamayacağım",
  },
},
```

`attendingLabels` değerleri formdaki seçenek metinleriyle **harfi harfine**
aynı olmalı — tek bir harf farkı olursa Google o cevabı kaydetmez.

İstersen kimliği koda yazmak yerine `.env.local` dosyasına da koyabilirsin:

```
NEXT_PUBLIC_GOOGLE_FORM_ID=1FAIpQLSd7X...uzun...kod
```

(Bu durumda `entries` yine `site.config.ts` içinde durur.)

## 5) Test et

Siteyi aç, formu doldur, gönder. Google E-Tablo'da yeni satır belirmeli.

---

## Sık sorulanlar

**Gönderdim ama site "başarılı" dedi, tabloya düşmedi.**
Google, tarayıcıdan gelen isteğe cevap dönmez (CORS); bu yüzden site
gönderimi "gitti" varsayar. Kayıt oluşmuyorsa neredeyse her zaman sebep
şudur: `entry.…` numaralarından biri yanlış ya da `attendingLabels` metni
formdaki seçenekle birebir aynı değil.

**Davetli, gönderdikten sonra Google sayfasına yönlendiriliyor mu?**
Hayır. Gönderim arka planda yapılır, davetli siteden ayrılmaz; ekranda
teşekkür kartı belirir.

**Google Form kullanmak istemiyorum.**
`googleForm.formId` boş kalırsa site, `.env.local` içindeki
`NEXT_PUBLIC_FORMSPREE_ENDPOINT` adresine düşer. O da yoksa form gönderim
yapmaz ve kullanıcıya uyarı gösterir.
