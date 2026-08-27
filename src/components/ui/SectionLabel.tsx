import { Reveal } from "./Reveal";

/** Bölüm başlıklarında kullanılan ince, altın, harf aralıklı etiket. */
export function SectionLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="h-px w-8 bg-gold/45 sm:w-12" />
      <span className="label-caps whitespace-nowrap">{children}</span>
      <span className="h-px w-8 bg-gold/45 sm:w-12" />
    </Reveal>
  );
}
