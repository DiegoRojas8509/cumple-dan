"use client";

import { useState } from "react";

type Props = {
  url: string;
  codigo: string;
  texto: string;
};

export default function TrackButton({ url, codigo, texto }: Props) {
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(codigo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1800);
    } catch {
      /* sin portapapeles: no pasa nada */
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-morado px-9 py-4 text-lg font-bold text-white shadow-lg shadow-morado/30 transition-transform hover:scale-105 active:scale-95"
      >
        {texto}
        
      </a>

      {/* Código de rastreo (clic para copiar) */}
      <button
        type="button"
        onClick={copiar}
        className="group flex items-center gap-2 rounded-lg border border-morado/30 bg-white px-4 py-2 font-mono text-sm tracking-wider text-morado-dark transition-colors hover:border-morado"
        title="Copiar código"
      >
        <span>{codigo}</span>
        <span className="text-morado/60 group-hover:text-morado">
          {copiado ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z" />
            </svg>
          )}
        </span>
      </button>
      <span className="h-4 text-xs text-morado/60">
        {copiado ? "¡código copiado hermosa!" : "copia este codigo niña"}
      </span>
    </div>
  );
}
