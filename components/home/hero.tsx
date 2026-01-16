export default function Hero() {
  return (
    <section className="relative h-screen w-full">
      <div className="absolute inset-0 bg-[url('/hero/hero-1.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-3 text-sky-400">
            Profesyonel üretim ve montaj hizmetleri
          </p>

          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
            Sandviç Panel
          </h1>

          <div className="flex gap-4">
            <button className="rounded-xl bg-sky-500 px-6 py-3 font-semibold">
              Keşfet →
            </button>
            <button className="rounded-xl border border-white/30 px-6 py-3">
              İletişime Geç
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
