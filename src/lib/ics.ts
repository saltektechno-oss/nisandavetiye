import { siteConfig } from "./site.config";

/** ICS formatı: 20260913T160000Z */
function toIcsUtc(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/** ICS satırları 75 oktetle sınırlıdır; uzun satırları katlar. */
function fold(line: string): string {
  if (line.length <= 73) return line;
  const chunks: string[] = [];
  let rest = line;
  chunks.push(rest.slice(0, 73));
  rest = rest.slice(73);
  while (rest.length > 72) {
    chunks.push(" " + rest.slice(0, 72));
    rest = rest.slice(72);
  }
  if (rest) chunks.push(" " + rest);
  return chunks.join("\r\n");
}

function escapeText(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

/** Takvim uygulamalarına eklenebilir bir .ics dosyası metni üretir. */
export function buildIcs(): string {
  const { couple, event, venue } = siteConfig;
  const title = `${couple.bride} & ${couple.groom} Nişan Töreni`;
  const location = `${venue.name}, ${venue.addressLines.join(" ")}`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//nisan-davetiye//TR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${toIcsUtc(event.startsAt)}-nisan@davetiye`,
    `DTSTAMP:${toIcsUtc(new Date().toISOString())}`,
    `DTSTART:${toIcsUtc(event.startsAt)}`,
    `DTEND:${toIcsUtc(event.endsAt)}`,
    `SUMMARY:${escapeText(title)}`,
    `LOCATION:${escapeText(location)}`,
    `DESCRIPTION:${escapeText(`${title} — ${event.dateLabel}, ${event.timeLabel}`)}`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeText(title)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.map(fold).join("\r\n");
}

/** .ics dosyasını tarayıcıda indirir. */
export function downloadIcs(): void {
  const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${siteConfig.couple.bride}-${siteConfig.couple.groom}-nisan.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
