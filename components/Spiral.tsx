"use client";

import { useState } from "react";

// Muestra la espiral PNG centrada. Si todavía no existe el archivo,
// enseña un placeholder para que se vea el layout mientras tanto.
export default function Spiral({ src }: { src: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex h-64 w-64 items-center justify-center rounded-full border-2 border-dashed border-morado/40 text-center text-morado/50">
        imagen de espiral
        <br />
        al centro
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Espiral"
      onError={() => setError(true)}
      className="w-56 max-w-[70vw] select-none sm:w-72"
    />
  );
}
