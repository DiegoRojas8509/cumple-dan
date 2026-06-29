# 🎉 Web de Cumpleaños

Página web estática hecha con **Next.js** (App Router) lista para subir gratis a **Cloudflare Pages** (con el video en **Cloudflare R2**).

Contiene: un video, un mensaje de inicio y un botón para rastrear un pedido.

## Personalizar

Edita [`app/config.ts`](app/config.ts):

| Campo | Qué es |
|-------|--------|
| `nombre` | Nombre de la cumpleañera (título grande) |
| `mensaje` | Texto de bienvenida |
| `videoSrc` | Ruta del video dentro de `/public` |
| `videoPoster` | Imagen de portada opcional |
| `rastrearUrl` | Enlace del botón de rastreo |
| `rastrearTexto` | Texto del botón |

### Cambiar el video

Coloca tu archivo en `public/` (p. ej. `public/video.mp4`) y ajusta `videoSrc`.
Actualmente hay un video de muestra copiado ahí.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build estático

```bash
npm run build    # genera la carpeta out/ con HTML/CSS/JS puro
```

Todo el sitio (incluido el video) queda en `out/`.

## Desplegar a Cloudflare Pages (gratis)

El sitio es 100% estático (`out/`), perfecto para Cloudflare Pages.

**Opción A — Subir la carpeta (más simple):**

1. `npm run build` → genera `out/`.
2. En el dashboard de Cloudflare: **Workers & Pages → Create → Pages →
   Upload assets**, y arrastra el contenido de `out/`.

**Opción B — Conectar el repo (deploy automático):**

- Framework preset: **Next.js (Static HTML Export)**
- Build command: `npm run build`
- Output directory: `out`

> Cloudflare Pages tiene un límite de **25 MB por archivo**, por eso el video
> de 1 GB va aparte (ver abajo). El resto del sitio pesa unos pocos KB.

### Video grande (~1 GB) → Cloudflare R2

R2 es el almacenamiento de objetos de Cloudflare: **10 GB gratis y sin costo
de salida (egress)**. Ideal para servir el video.

1. Crea un bucket R2 (dashboard → **R2 → Create bucket**), p. ej. `cumple-video`.
2. Sube el `video.mp4` (arrastrándolo en el dashboard, o con el CLI):

   ```bash
   npx wrangler r2 object put cumple-video/video.mp4 \
     --file video.mp4 --content-type video/mp4
   ```

3. Habilita el acceso público del bucket: **Settings → Public access →
   Allow** (te da un dominio `https://pub-xxxxxxxx.r2.dev`). Opcionalmente
   conéctalo a un dominio propio.
4. En [`app/config.ts`](app/config.ts) apunta `videoSrc` a esa URL:

   ```ts
   videoSrc: "https://pub-xxxxxxxx.r2.dev/video.mp4",
   ```

- R2 soporta **HTTP Range requests**, así el `<video>` hace streaming y salta a
  cualquier minuto sin descargar todo. No se necesita config extra.
- Para que arranque rápido, el MP4 debe tener **faststart** (moov atom al inicio):
  `ffmpeg -i in.mp4 -c copy -movflags +faststart video.mp4`.

### Espiral del inicio

Coloca el PNG sin fondo en `public/spiral.png` (o ajusta `spiralSrc` en config).
Mientras no exista, la página muestra un placeholder circular.
