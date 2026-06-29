// ─────────────────────────────────────────────────────────────
//  Configuración de la página. Edita aquí los textos y enlaces.
// ─────────────────────────────────────────────────────────────

export const siteConfig = {
  // Nombre de la cumpleañera (se usa como respaldo si no hay imagen de título).
  nombre: "feliz cumple mi niña :)",

  // Imagen de título (PNG sin fondo) en /public. Reemplaza al texto de arriba.
  // Déjalo en null para volver a usar el texto.
  tituloImg: "/texto.png" as string | null,

  // Imagen que va justo ARRIBA del video (texto 2).
  texto2Img: "/texto2.png" as string | null,

  // Imagen de dedicatoria, abajo a la derecha de la página (texto 3).
  dedicatoriaImg: "/texto3.png" as string | null,

  // Mensaje opcional bajo el video (déjalo "" para ocultarlo).
  mensaje: "",

  // ── Espiral del inicio ──────────────────────────────────────
  // PNG sin fondo dentro de /public. Reemplaza spiral.png por el tuyo.
  spiralSrc: "/spiral.png",

  // ── Video ───────────────────────────────────────────────────
  // Puede ser una ruta local (/video.mp4) o una URL completa.
  // El video de ~1GB NO cabe en Cloudflare Pages (límite 25MB/archivo):
  // súbelo a Cloudflare R2 y pega aquí su URL pública, ej:
  //   "https://pub-xxxxxxxx.r2.dev/video.mp4"
  // (el /video.mp4 local es solo un ejemplo pequeño para previsualizar).
  videoSrc:
    "https://pub-65914f97dafc4b269a7f848d95103537.r2.dev/video25dan-web.mp4",
  videoPoster: null as string | null,

  // ── Rastreo del paquete (UPS) ───────────────────────────────
  rastrearUrl: "https://www.ups.com/track",
  codigoRastreo: "1Z12B4R40303280909",
  rastrearTexto: "rastrea tu regalo nena <3",

  // ── Mariposas (decoración opcional) ─────────────────────────
  // Cámbialo a true cuando quieras activarlas.
  mariposas: true,
  // Diseño de la mariposa:
  //   "solida"     → alas redondeadas rellenas (clásica)
  //   "linea"      → solo contorno, ultra minimalista
  //   "monarca"    → rellena con puntitos tipo monarca
  //   "geometrica" → alas triangulares / geométricas
  mariposaEstilo: "monarca",
} as const;

// Paleta blanco y negro (coincide con tailwind.config.ts)
export const colores = {
  morado: "#111111",
  borde: "#000000",
  fondo: "#ffffff",
} as const;
