"use client";

// Mariposas decorativas que aletean y flotan suavemente.
// Se activan desde config.ts (mariposas: true) y el diseño se elige
// con mariposaEstilo: "solida" | "linea" | "monarca" | "geometrica".

import { siteConfig } from "@/app/config";

type Estilo = "solida" | "linea" | "monarca" | "geometrica";

// Cada mariposa cruza la pantalla de lado a lado, lento.
// dir: "ltr" izquierda→derecha, "rtl" derecha→izquierda.
// dur: segundos en cruzar (más alto = más lento).
const flyers = [
  { top: "14%", dur: 30, delay: -2, scale: 0.8, dir: "ltr", color: "#111111" },
  { top: "34%", dur: 40, delay: -14, scale: 1.0, dir: "rtl", color: "#000000" },
  { top: "56%", dur: 26, delay: -8, scale: 0.65, dir: "ltr", color: "#444444" },
  { top: "70%", dur: 36, delay: -22, scale: 0.95, dir: "rtl", color: "#000000" },
  { top: "24%", dur: 46, delay: -30, scale: 0.55, dir: "ltr", color: "#222222" },
] as const;

function Antenas() {
  return (
    <g stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round">
      <path d="M32 14 C 30 8, 27 6, 24 5" />
      <path d="M32 14 C 34 8, 37 6, 40 5" />
    </g>
  );
}

function Butterfly({ color, estilo }: { color: string; estilo: Estilo }) {
  return (
    <svg viewBox="0 0 64 48" className="h-9 w-9 drop-shadow" style={{ color }}>
      <g className="origin-center animate-flutter">
        {estilo === "geometrica" ? (
          // Alas triangulares / geométricas
          <g fill={color}>
            <path d="M32 24 L6 5 L16 27 Z" opacity="0.9" />
            <path d="M32 24 L58 5 L48 27 Z" opacity="0.9" />
            <path d="M32 24 L13 42 L25 30 Z" opacity="0.6" />
            <path d="M32 24 L51 42 L39 30 Z" opacity="0.6" />
          </g>
        ) : estilo === "linea" ? (
          // Solo contorno, ultra minimalista
          <g fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round">
            <path d="M32 24C26 8 14 4 8 12c-6 8 4 20 24 12z" />
            <path d="M32 24C38 8 50 4 56 12c6 8-4 20-24 12z" />
            <path d="M32 24C28 30 18 34 12 30c-4-3 2-10 20-6z" />
            <path d="M32 24C36 30 46 34 52 30c4-3-2-10-20-6z" />
          </g>
        ) : (
          // Alas redondeadas sólidas (solida y monarca comparten silueta)
          <g fill={color}>
            <path d="M32 24C26 8 14 4 8 12c-6 8 4 20 24 12z" opacity="0.9" />
            <path d="M32 24C38 8 50 4 56 12c6 8-4 20-24 12z" opacity="0.9" />
            <path d="M32 24C28 30 18 34 12 30c-4-3 2-10 20-6z" opacity="0.65" />
            <path d="M32 24C36 30 46 34 52 30c4-3-2-10-20-6z" opacity="0.65" />
            {estilo === "monarca" && (
              // Patrón de puntos tipo monarca
              <g fill="#ffffff">
                <circle cx="16" cy="13" r="1.4" />
                <circle cx="21" cy="17" r="1.4" />
                <circle cx="48" cy="13" r="1.4" />
                <circle cx="43" cy="17" r="1.4" />
              </g>
            )}
          </g>
        )}
        {estilo !== "geometrica" && <Antenas />}
      </g>
      <rect x="31" y="13" width="2" height="23" rx="1" fill={color} />
    </svg>
  );
}

export default function Butterflies() {
  const estilo = (siteConfig.mariposaEstilo ?? "solida") as Estilo;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {flyers.map((f, i) => (
        // Capa 1: vuelo horizontal de lado a lado
        <div
          key={i}
          className="absolute left-0 will-change-transform"
          style={{
            top: f.top,
            animation: `fly-across ${f.dur}s linear ${f.delay}s infinite ${
              f.dir === "rtl" ? "reverse" : "normal"
            }`,
          }}
        >
          {/* Capa 2: vaivén vertical suave */}
          <div className="animate-float">
            <div style={{ transform: `scale(${f.scale}) scaleX(${f.dir === "rtl" ? -1 : 1})` }}>
              <Butterfly color={f.color} estilo={estilo} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
