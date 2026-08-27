import type { Metadata } from "next";
import { QRSection } from "@/components/QRSection";

export const metadata: Metadata = {
  title: "QR Kod — Davetiye",
  description: "Basılı davetiyeye eklemek için QR kod.",
  // Bu sayfa davetliler için değil, arama motorlarına kapalı.
  robots: { index: false, follow: false },
};

export default function QRPage() {
  return <QRSection />;
}
