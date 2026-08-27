"use client";

import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import { siteConfig, siteUrl } from "@/lib/site.config";
import { Divider, FloralCrest } from "./ui/Ornaments";

/** İndirilecek PNG'nin kenar uzunluğu (px). Baskı için fazlasıyla yeterli. */
const PNG_SIZE = 2048;

export function QRSection() {
  const [url, setUrl] = useState(siteUrl);
  const [copied, setCopied] = useState(false);
  const hiddenCanvasRef = useRef<HTMLDivElement>(null);
  const hiddenSvgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(id);
  }, [copied]);

  const fileBase = `${siteConfig.couple.bride}-${siteConfig.couple.groom}-davetiye-qr`;

  function triggerDownload(href: string, filename: string) {
    const a = document.createElement("a");
    a.href = href;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function downloadPng() {
    const canvas = hiddenCanvasRef.current?.querySelector("canvas");
    if (!canvas) return;
    triggerDownload(canvas.toDataURL("image/png"), `${fileBase}-${PNG_SIZE}px.png`);
  }

  function downloadSvg() {
    const svg = hiddenSvgRef.current?.querySelector("svg");
    if (!svg) return;
    const source = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([`<?xml version="1.0" standalone="no"?>\n${source}`], {
      type: "image/svg+xml;charset=utf-8",
    });
    const objectUrl = URL.createObjectURL(blob);
    triggerDownload(objectUrl, `${fileBase}.svg`);
    URL.revokeObjectURL(objectUrl);
  }

  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className="min-h-svh px-6 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[34rem]">
        <header className="text-center">
          <span className="mx-auto mb-6 block h-9 w-28 text-gold">
            <FloralCrest className="h-full w-full" />
          </span>
          <p className="label-caps">Davetiye Kartı İçin</p>
          <h1 className="mt-3 font-display text-[clamp(2rem,8vw,2.8rem)] leading-tight font-light text-ink italic">
            QR Kod
          </h1>
          <p className="mx-auto mt-4 max-w-[24rem] text-[1rem] leading-relaxed text-muted">
            Aşağıdaki kodu basılı davetiyene ekle. Okutan herkes doğrudan davetiye
            sitesine gider.
          </p>
        </header>

        {/* --- QR kartı --- */}
        <div className="card mt-10 px-6 py-10 text-center sm:px-10">
          <div className="mx-auto inline-flex flex-col items-center rounded-2xl border border-gold/30 bg-surface p-5">
            <QRCodeCanvas
              value={url}
              size={232}
              level="H"
              marginSize={2}
              bgColor="#FFFDF8"
              fgColor="#3B312A"
            />
            <p className="mt-4 font-display text-[1.15rem] text-ink italic">
              {siteConfig.couple.bride} &amp; {siteConfig.couple.groom}
            </p>
            <p className="mt-0.5 font-label text-[0.6rem] tracking-[0.26em] text-muted uppercase">
              {siteConfig.event.dateLabel}
            </p>
          </div>

          <div className="mx-auto mt-8 text-gold">
            <Divider className="mx-auto w-40" width={160} />
          </div>

          {/* --- Adres --- */}
          <label htmlFor="qr-url" className="label-caps mt-8 mb-2.5 block text-muted">
            Sitenin Canlı Adresi
          </label>
          <input
            id="qr-url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            spellCheck={false}
            className="field text-center"
            placeholder="https://..."
          />
          <p className="mt-3 text-[0.9rem] leading-relaxed text-muted italic">
            Netlify&apos;a yükledikten sonra gerçek adresi buraya yapıştır — QR kod
            anında güncellenir. Kalıcı olması için{" "}
            <code className="rounded bg-parchment px-1.5 py-0.5 font-label text-[0.78rem] not-italic">
              NEXT_PUBLIC_SITE_URL
            </code>{" "}
            değişkenini de güncelle.
          </p>

          {/* --- İndirme --- */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button type="button" onClick={downloadPng} className="btn-gold px-7 py-3.5">
              PNG İndir ({PNG_SIZE}px)
            </button>
            <button type="button" onClick={downloadSvg} className="btn-outline px-7 py-3.5">
              SVG İndir (Vektör)
            </button>
          </div>

          <button
            type="button"
            onClick={copyUrl}
            className="mt-6 font-label text-[0.66rem] tracking-[0.2em] text-muted uppercase underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold-deep"
          >
            {copied ? "Adres kopyalandı" : "Adresi kopyala"}
          </button>

          <p className="mt-8 text-[0.9rem] leading-relaxed text-muted italic">
            Matbaa için <strong className="not-italic">SVG</strong> tercih et — her
            boyutta net çıkar. Kod, yüksek hata düzeltme seviyesiyle (H) üretildi;
            küçük lekelerde bile okunur.
          </p>
        </div>
      </div>

      {/* --- Ekranda görünmeyen, yüksek çözünürlüklü kopyalar --- */}
      <div className="pointer-events-none fixed -left-[9999px] top-0" aria-hidden="true">
        <div ref={hiddenCanvasRef}>
          <QRCodeCanvas
            value={url}
            size={PNG_SIZE}
            level="H"
            marginSize={2}
            bgColor="#FFFFFF"
            fgColor="#000000"
          />
        </div>
        <div ref={hiddenSvgRef}>
          <QRCodeSVG
            value={url}
            size={1024}
            level="H"
            marginSize={2}
            bgColor="#FFFFFF"
            fgColor="#000000"
          />
        </div>
      </div>
    </main>
  );
}
