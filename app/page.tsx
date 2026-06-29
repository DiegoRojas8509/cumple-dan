import { siteConfig } from "./config";
import VideoPlayer from "@/components/VideoPlayer";
import Spiral from "@/components/Spiral";
import Titulo from "@/components/Titulo";
import Butterflies from "@/components/Butterflies";
import TrackButton from "@/components/TrackButton";
import ImgSafe from "@/components/ImgSafe";

export default function Home() {
  return (
    <>
      {siteConfig.mariposas && <Butterflies />}

      <main className="relative">
        {/* ── Sección 1: logo (espiral) + título ────────────────── */}
        <section className="flex min-h-screen flex-col items-center justify-center px-6">
          <div className="animate-fade-up opacity-0">
            <Titulo src={siteConfig.tituloImg} texto={siteConfig.nombre} />
          </div>

          <div className="mt-8 animate-fade-up opacity-0 [animation-delay:0.2s]">
            <Spiral src={siteConfig.spiralSrc} />
          </div>
        </section>

        {/* ── Sección 2: texto 2 + video ────────────────────────── */}
        <section
          id="video"
          className="flex min-h-screen flex-col items-center justify-center px-4 py-20 sm:px-8"
        >
          {/* Texto 2: justo arriba del video */}
          <ImgSafe
            src={siteConfig.texto2Img}
            alt="texto 2"
            className="mb-8 w-72 max-w-[80vw] sm:w-96"
          />

          {/* En teléfono respeta los márgenes; en computadora crece bastante */}
          <div className="w-full max-w-3xl sm:max-w-4xl lg:max-w-6xl xl:max-w-[110rem] 2xl:max-w-[125rem]">
            <VideoPlayer
              src={siteConfig.videoSrc}
              poster={siteConfig.videoPoster ?? undefined}
            />
            {siteConfig.mensaje && (
              <p className="mt-6 text-center text-lg text-morado/80">
                {siteConfig.mensaje}
              </p>
            )}
          </div>
        </section>

        {/* ── Sección 3: rastreo del paquete ────────────────────── */}
        <section className="flex min-h-[60vh] flex-col items-center justify-center px-6">
          <TrackButton
            url={siteConfig.rastrearUrl}
            codigo={siteConfig.codigoRastreo}
            texto={siteConfig.rastrearTexto}
          />
        </section>

        {/* ── Dedicatoria (texto 3): abajo a la derecha ─────────── */}
        <div className="flex justify-end px-6 pb-16 pt-10 sm:px-12">
          <ImgSafe
            src={siteConfig.dedicatoriaImg}
            alt="dedicatoria"
            className="w-64 max-w-[80vw] sm:w-80"
          />
        </div>
      </main>
    </>
  );
}
