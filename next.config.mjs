import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Evita que Next infiera mal la raíz del workspace (hay otro lockfile arriba).
  turbopack: {
    root: __dirname,
  },

  // Exportación estática: genera HTML/CSS/JS puro en la carpeta `out/`
  // listo para subir a S3 + CloudFront.
  output: "export",

  // CloudFront/S3 sirve mejor con rutas tipo carpeta (/ruta/index.html)
  trailingSlash: true,

  images: {
    // next/image necesita esto en export estático (sin servidor que optimice).
    unoptimized: true,
  },
};

export default nextConfig;
