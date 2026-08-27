import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { siteConfig, siteUrl } from "@/lib/site.config";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

const description = `${siteConfig.couple.bride} & ${siteConfig.couple.groom} — ${siteConfig.event.dateLabel}, ${siteConfig.venue.name}. Nişan törenimize sizleri bekleriz.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteConfig.couple.title,
  description,
  openGraph: {
    title: siteConfig.couple.title,
    description,
    type: "website",
    locale: "tr_TR",
    siteName: siteConfig.couple.title,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.couple.title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fbf8f2",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="paper antialiased">{children}</body>
    </html>
  );
}
