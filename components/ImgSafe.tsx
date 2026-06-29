"use client";

import { useState } from "react";

// Imagen que simplemente desaparece si el archivo aún no existe en /public.
export default function ImgSafe({
  src,
  alt = "",
  className = "",
}: {
  src: string | null;
  alt?: string;
  className?: string;
}) {
  const [error, setError] = useState(false);
  if (!src || error) return null;

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={`select-none ${className}`}
    />
  );
}
