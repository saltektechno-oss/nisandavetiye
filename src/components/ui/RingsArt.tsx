"use client";

import { useId } from "react";

/**
 * İç içe geçmiş iki altın alyans — tamamen vektörel, sayfanın içine gömülü.
 * Ayrı dosya olarak istenmediği için hiç ağ isteği yapılmaz: sayfa
 * göründüğü anda yüzükler de oradadır.
 *
 * Halkalar gerçekten iç içe geçer: arka halka bir kesişmede ön halkanın
 * önünden, diğerinde arkasından geçer. Kesim sınırı ön bandın kenarına
 * denk getirildiği için ek yeri görünmez.
 */

/** Elips halka: dış elips + iç elips; evenodd ile arada bant oluşur. */
function band(cx: number, cy: number, rx: number, ry: number, w: number) {
  const ell = (RX: number, RY: number) =>
    `M ${cx - RX},${cy} a ${RX},${RY} 0 1,0 ${2 * RX},0 a ${RX},${RY} 0 1,0 ${-2 * RX},0 Z`;
  return `${ell(rx, ry)} ${ell(rx - w, ry - w)}`;
}

const BACK = { cx: 172, cy: 150, rx: 100, ry: 112, w: 25, rot: -16 };
const FRONT = { cx: 250, cy: 190, rx: 104, ry: 116, w: 27, rot: 14 };

const backPath = band(BACK.cx, BACK.cy, BACK.rx, BACK.ry, BACK.w);
const frontPath = band(FRONT.cx, FRONT.cy, FRONT.rx, FRONT.ry, FRONT.w);

export function RingsArt({ className = "" }: { className?: string }) {
  // Aynı sayfada birden çok kez kullanılabildiği için id'ler benzersiz olmalı
  const uid = useId().replace(/:/g, "");
  const id = (name: string) => `${name}-${uid}`;

  const backRing = (
    <g transform={`rotate(${BACK.rot} ${BACK.cx} ${BACK.cy})`}>
      <path d={backPath} fillRule="evenodd" fill={`url(#${id("g1")})`} />
      <path
        d={backPath}
        fillRule="evenodd"
        fill="none"
        stroke="#FFF9E4"
        strokeWidth="1.1"
        opacity="0.45"
      />
    </g>
  );

  return (
    <svg
      viewBox="0 0 420 340"
      className={className}
      role="img"
      aria-label="İki altın nişan yüzüğü"
    >
      <defs>
        {/* Altın metal: parlak tepeler ve koyu gölge bantları dönüşümlü */}
        <linearGradient id={id("g1")} x1="0.05" y1="0" x2="0.95" y2="1">
          <stop offset="0%" stopColor="#8A6417" />
          <stop offset="12%" stopColor="#D9B44A" />
          <stop offset="26%" stopColor="#FBF0C0" />
          <stop offset="40%" stopColor="#E2B84E" />
          <stop offset="56%" stopColor="#9C7420" />
          <stop offset="72%" stopColor="#F0D68C" />
          <stop offset="88%" stopColor="#C79A33" />
          <stop offset="100%" stopColor="#7E5A14" />
        </linearGradient>
        <linearGradient id={id("g2")} x1="0.9" y1="0" x2="0.1" y2="1">
          <stop offset="0%" stopColor="#7E5A14" />
          <stop offset="14%" stopColor="#E0BB57" />
          <stop offset="30%" stopColor="#FFF7D6" />
          <stop offset="44%" stopColor="#E8C264" />
          <stop offset="60%" stopColor="#A87D22" />
          <stop offset="76%" stopColor="#F4DE9E" />
          <stop offset="90%" stopColor="#C99C35" />
          <stop offset="100%" stopColor="#6F4E10" />
        </linearGradient>
        <radialGradient id={id("sh")} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3B312A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3B312A" stopOpacity="0" />
        </radialGradient>
        <filter id={id("soft")} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="7" />
        </filter>

        {/* Arka halkanın, ön halkanın arkasından geçen kısmı gizlenir */}
        <mask id={id("behind")}>
          <rect width="420" height="340" fill="#fff" />
          <g transform={`rotate(${FRONT.rot} ${FRONT.cx} ${FRONT.cy})`}>
            <path d={frontPath} fillRule="evenodd" fill="#000" />
          </g>
        </mask>

        {/* Önden geçen parça: önce ön bandın şekli, sonra üst bölge */}
        <clipPath id={id("frontBand")}>
          <g transform={`rotate(${FRONT.rot} ${FRONT.cx} ${FRONT.cy})`}>
            <path d={frontPath} clipRule="evenodd" />
          </g>
        </clipPath>
        <clipPath id={id("topZone")}>
          <rect x="0" y="0" width="420" height="168" />
        </clipPath>
      </defs>

      {/* zemin gölgesi */}
      <ellipse
        cx="212"
        cy="300"
        rx="120"
        ry="17"
        fill={`url(#${id("sh")})`}
        filter={`url(#${id("soft")})`}
      />

      {/* arka halka */}
      <g mask={`url(#${id("behind")})`}>{backRing}</g>

      {/* ön halka */}
      <g transform={`rotate(${FRONT.rot} ${FRONT.cx} ${FRONT.cy})`}>
        <path d={frontPath} fillRule="evenodd" fill={`url(#${id("g2")})`} />
        <path
          d={frontPath}
          fillRule="evenodd"
          fill="none"
          stroke="#FFFBEC"
          strokeWidth="1.2"
          opacity="0.5"
        />
      </g>

      {/* arka halkanın ön halkanın üstünden geçtiği parça */}
      <g clipPath={`url(#${id("frontBand")})`}>
        <g clipPath={`url(#${id("topZone")})`}>{backRing}</g>
      </g>
    </svg>
  );
}
