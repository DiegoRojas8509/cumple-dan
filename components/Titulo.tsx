"use client";

import { useState } from "react";

// Muestra la imagen de título; si no existe, cae al texto de respaldo.
export default function Titulo({
  src,
  texto,
}: {
  src: string | null;
  texto: string;
}) {
  const [error, setError] = useState(false);

  if (src && !error) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={texto || "Título"}
        onError={() => setError(true)}
        className="w-80 max-w-[85vw] select-none sm:w-[32rem]"
      />
    );
  }

  if (!texto) return null;

  return (
    <h1 className="text-3xl font-black text-morado sm:text-5xl">{texto}</h1>
  );
}
