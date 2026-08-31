/* ===========================================================================
   Katılım cevabının gönderilmesi.
   Öncelik Google Formlar'dadır (cevaplar doğrudan Google E-Tablolar'a düşer);
   yapılandırılmamışsa Formspree'ye düşer. İkisi de yoksa açıklayıcı bir uyarı
   döner — kullanıcı asla sessiz bir hatayla karşılaşmaz.
   =========================================================================== */

import { formspreeEndpoint, googleFormEndpoint, siteConfig } from "./site.config";

export type RsvpAnswer = {
  name: string;
  attending: boolean;
  /** Katılmıyorsa 0 */
  guests: number;
  note: string;
};

export type RsvpTarget = "google" | "formspree" | "none";

/** Hangi hedefin kullanılacağını söyler — form açılırken uyarı göstermek için. */
export function rsvpTarget(): RsvpTarget {
  const { entries } = siteConfig.googleForm;
  if (googleFormEndpoint && entries.name && entries.attending) return "google";
  if (formspreeEndpoint) return "formspree";
  return "none";
}

function attendingLabel(attending: boolean): string {
  const { yes, no } = siteConfig.googleForm.attendingLabels;
  return attending ? yes : no;
}

/**
 * Google Formlar'a gönderir.
 *
 * Google, tarayıcıdan gelen isteğe CORS başlığı koymaz; bu yüzden istek
 * `no-cors` ile atılır. Cevap "opaque" gelir — içeriği okuyamayız ama form
 * kaydı oluşur. Ağ tamamen kopuksa fetch yine de hata fırlatır, onu
 * yakalayabiliyoruz.
 */
async function sendToGoogle(answer: RsvpAnswer): Promise<void> {
  const { entries } = siteConfig.googleForm;
  const body = new URLSearchParams();

  body.append(entries.name, answer.name);
  body.append(entries.attending, attendingLabel(answer.attending));
  if (entries.guests) body.append(entries.guests, String(answer.guests));
  if (entries.note) body.append(entries.note, answer.note);

  await fetch(googleFormEndpoint, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
}

/** Formspree yedeği — burada gerçek bir cevap okuyabiliyoruz. */
async function sendToFormspree(answer: RsvpAnswer): Promise<void> {
  const res = await fetch(formspreeEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      "Ad Soyad": answer.name,
      "Katılım": attendingLabel(answer.attending),
      "Kişi Sayısı": answer.guests,
      "Not": answer.note || "—",
      _subject: `Nişan RSVP — ${answer.name} (${attendingLabel(answer.attending)})`,
    }),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as
      | { errors?: { message?: string }[] }
      | null;
    throw new Error(data?.errors?.[0]?.message ?? `Sunucu hatası (${res.status})`);
  }
}

/** Cevabı yapılandırılmış hedefe gönderir. Hata durumunda fırlatır. */
export async function submitRsvp(answer: RsvpAnswer): Promise<void> {
  switch (rsvpTarget()) {
    case "google":
      return sendToGoogle(answer);
    case "formspree":
      return sendToFormspree(answer);
    default:
      /* Geliştirirken sebebi açıkça söyle; yayındaki davetlilere teknik
         mesaj gösterme — onlara nazik bir alternatif sun. */
      throw new Error(
        process.env.NODE_ENV === "development"
          ? "Form henüz bağlanmadı: Google Form bilgileri src/lib/site.config.ts içine girilmeli (bkz. KATILIM-FORMU.md)."
          : "Katılım bildirimi şu an alınamıyor. Lütfen bizimle doğrudan iletişime geçin.",
      );
  }
}
