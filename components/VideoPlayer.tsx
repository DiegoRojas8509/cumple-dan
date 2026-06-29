"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
};

function fmt(t: number) {
  if (!isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function VideoPlayer({ src, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fs, setFs] = useState(false);
  const [show, setShow] = useState(true);

  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const toggleFs = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (!document.fullscreenElement) el.requestFullscreen?.();
    else document.exitFullscreen?.();
  }, []);

  const seek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    v.currentTime = Math.min(Math.max(ratio, 0), 1) * v.duration;
  }, []);

  const wake = useCallback(() => {
    setShow(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) setShow(false);
    }, 2200);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onTime = () => setCurrent(v.currentTime);
    const onDur = () => setDuration(v.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => {
      setPlaying(false);
      setShow(true);
    };

    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onDur);
    v.addEventListener("durationchange", onDur);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);

    const onFs = () => setFs(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);

    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onDur);
      v.removeEventListener("durationchange", onDur);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      document.removeEventListener("fullscreenchange", onFs);
    };
  }, []);

  const pct = duration ? (current / duration) * 100 : 0;

  return (
    <div
      ref={wrapRef}
      onMouseMove={wake}
      onMouseLeave={() => playing && setShow(false)}
      className="group relative aspect-video w-full overflow-hidden rounded-xl bg-black"
    >
      <video
        ref={videoRef}
        className="h-full w-full"
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        onClick={togglePlay}
      />

      {/* Play central minimalista (solo en pausa) */}
      {!playing && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label="Reproducir"
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-transform duration-200 hover:scale-105">
            <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-black">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}

      {/* Controles minimalistas */}
      <div
        className={`absolute inset-x-0 bottom-0 px-5 pb-4 pt-12 transition-opacity duration-300 ${
          show ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0))",
        }}
      >
        {/* Progreso (línea fina) */}
        <div
          onClick={seek}
          className="relative mb-3 h-[3px] cursor-pointer rounded-full bg-white/30"
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-white"
            style={{ width: `${pct}%` }}
          />
          <div
            className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 transition-opacity group-hover:opacity-100"
            style={{ left: `${pct}%` }}
          />
        </div>

        {/* Fila inferior */}
        <div className="flex items-center gap-5 text-white">
          <button onClick={togglePlay} aria-label={playing ? "Pausar" : "Reproducir"} className="opacity-90 transition-opacity hover:opacity-100">
            {playing ? (
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-white">
                <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-white">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button onClick={toggleMute} aria-label={muted ? "Activar sonido" : "Silenciar"} className="opacity-90 transition-opacity hover:opacity-100">
            {muted ? (
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-white">
                <path d="M3 9v6h4l5 5V4L7 9H3z" />
                <path d="M16 8l5 5m0-5l-5 5" stroke="white" strokeWidth="2" fill="none" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-white">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 15 8.64v6.72A4.5 4.5 0 0 0 16.5 12zM15 4.5v2.06a7 7 0 0 1 0 10.88v2.06a9 9 0 0 0 0-15z" />
              </svg>
            )}
          </button>

          <span className="text-[13px] tabular-nums text-white/80">
            {fmt(current)} / {fmt(duration)}
          </span>

          <div className="flex-1" />

          <button onClick={toggleFs} aria-label="Pantalla completa" className="opacity-90 transition-opacity hover:opacity-100">
            {fs ? (
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-white">
                <path d="M14 14h3v2h-5v-5h2v3zm-7 0v3h2v-5H4v2h3zm0-7H4v2h5V4H7v3zm7 0V4h-2v5h5V7h-3z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-white">
                <path d="M7 7h3V5H5v5h2V7zm12 0v3h-2V7h-3V5h5v2zM7 17v-3H5v5h5v-2H7zm10 0h-3v2h5v-5h-2v3z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
