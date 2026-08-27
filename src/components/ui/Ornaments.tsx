/* ===========================================================================
   Dekoratif SVG süslemeler.
   Hepsi `currentColor` kullanır — rengi sarmalayan elemandan devralır.
   =========================================================================== */

type Props = { className?: string };

/* --- Simetrik botanik taç — hero'nun tepesinde ---------------------------- */
export function FloralCrest({ className = "" }: Props) {
  const leaf = (i: number, side: 1 | -1) => {
    const t = i / 6;
    const x = 60 + side * (10 + t * 46);
    const y = 30 - Math.sin(t * Math.PI * 0.85) * 17;
    const rot = side * (30 + t * 34);
    const len = 9.5 - t * 4.2;
    return (
      <ellipse
        key={`${side}-${i}`}
        cx={x}
        cy={y}
        rx={len}
        ry={len * 0.36}
        transform={`rotate(${rot} ${x} ${y})`}
        fill="currentColor"
        opacity={0.5 - t * 0.22}
      />
    );
  };

  return (
    <svg
      viewBox="0 0 120 44"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* iki yana açılan ince saplar */}
      <path
        d="M60 34 C48 34 34 30 22 18"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M60 34 C72 34 86 30 98 18"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.75"
      />
      {[0, 1, 2, 3, 4, 5].map((i) => leaf(i, -1))}
      {[0, 1, 2, 3, 4, 5].map((i) => leaf(i, 1))}
      {/* merkez elmas */}
      <path
        d="M60 28.5 L63.4 34 L60 39.5 L56.6 34 Z"
        stroke="currentColor"
        strokeWidth="0.85"
        fill="none"
      />
      <circle cx="60" cy="34" r="1.05" fill="currentColor" />
    </svg>
  );
}

/* --- İnce ayırıcı: çizgi — elmas — çizgi --------------------------------- */
export function Divider({
  className = "",
  width = 168,
  tone = "gold",
}: Props & { width?: number; tone?: "gold" | "blush" }) {
  const diamond = tone === "blush" ? "var(--color-blush)" : "currentColor";
  return (
    <svg
      viewBox="0 0 168 14"
      width={width}
      height={(width * 14) / 168}
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2 7 H62" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.85" />
      <path d="M106 7 H166" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.85" />
      {/* uçlardaki minik yapraklar */}
      <ellipse cx="70" cy="7" rx="5.5" ry="2" fill="currentColor" opacity="0.42" />
      <ellipse cx="98" cy="7" rx="5.5" ry="2" fill="currentColor" opacity="0.42" />
      <path
        d="M84 1.4 L88.6 7 L84 12.6 L79.4 7 Z"
        stroke="currentColor"
        strokeWidth="0.9"
        fill={diamond}
        fillOpacity={tone === "blush" ? 0.85 : 0.12}
      />
    </svg>
  );
}

/* --- Köşe çerçevesi ------------------------------------------------------- */
export function CornerFrame({
  className = "",
  flipX = false,
  flipY = false,
}: Props & { flipX?: boolean; flipY?: boolean }) {
  return (
    <svg
      viewBox="0 0 56 56"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={{
        transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})`,
      }}
    >
      <path d="M1 38 V6 A5 5 0 0 1 6 1 H38" stroke="currentColor" strokeWidth="0.9" />
      <path d="M8 30 V12 A4 4 0 0 1 12 8 H30" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
      <path d="M12 12 L17 17" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
      <circle cx="19" cy="19" r="1.4" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

/* --- Zarif yüzük ikonu (kapakta fotoğraf yoksa) --------------------------- */
export function RingIcon({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true" focusable="false">
      <circle cx="32" cy="40" r="17" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="32" cy="40" r="13.5" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
      <path d="M26.5 21 L32 12 L37.5 21 L32 27 Z" stroke="currentColor" strokeWidth="1.3" fill="none" />
      <path d="M26.5 21 H37.5" stroke="currentColor" strokeWidth="0.7" opacity="0.65" />
      <path d="M32 12 V27" stroke="currentColor" strokeWidth="0.5" opacity="0.45" />
    </svg>
  );
}

/* --- Tek dal — bölüm kenarlarında filigran olarak kullanılır -------------- */
export function Sprig({ className = "" }: Props) {
  const leaves = Array.from({ length: 9 }, (_, i) => {
    const t = i / 8;
    const x = 20 + Math.sin(t * 2.1) * 13;
    const y = 6 + t * 128;
    const side = i % 2 === 0 ? 1 : -1;
    const len = 15 - t * 5;
    return (
      <ellipse
        key={i}
        cx={x + side * 9}
        cy={y}
        rx={len}
        ry={len * 0.34}
        transform={`rotate(${side * -28} ${x + side * 9} ${y})`}
        fill="currentColor"
        opacity={0.4}
      />
    );
  });

  return (
    <svg viewBox="0 0 44 144" className={className} fill="none" aria-hidden="true" focusable="false">
      <path
        d="M22 2 C33 34 12 68 22 100 C28 118 22 132 20 142"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.6"
      />
      {leaves}
    </svg>
  );
}

/* --- Mühür (kapaktaki mum mührü) ----------------------------------------- */
export function SealRing({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true" focusable="false">
      <circle cx="60" cy="60" r="57" stroke="currentColor" strokeWidth="0.7" opacity="0.45" />
      <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1 5" />
      {Array.from({ length: 24 }, (_, i) => {
        const a = (i / 24) * Math.PI * 2;
        return (
          <circle
            key={i}
            cx={60 + Math.cos(a) * 46}
            cy={60 + Math.sin(a) * 46}
            r={0.9}
            fill="currentColor"
            opacity="0.55"
          />
        );
      })}
    </svg>
  );
}
