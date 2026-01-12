import Link from "next/link"

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background */}
        <img
          src="https://images.unsplash.com/photo-1581091870627-3c8c6c4f88b1?q=80&w=1920"
          alt="Lazer Kesim"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container">
            <p className="text-sky-400 text-sm md:text-base mb-4">
              Yüksek hassasiyet ve teknoloji ile metal işleme
            </p>

            <h1 className="text-white text-4xl md:text-6xl font-bold max-w-3xl">
              Lazer Kesim
            </h1>

            <div className="mt-10 flex gap-4">
              <Link
                href="/projeler"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-500 text-white font-medium hover:bg-sky-600 transition"
              >
                Keşfet →
              </Link>

              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/40 text-white hover:bg-white/10 transition"
              >
                İletişime Geç
              </Link>
            </div>
          </div>
        </div>

        {/* Slider Arrows (UI only) */}
        <button className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60">
          ‹
        </button>

        <button className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60">
          ›
        </button>
      </section>
    </main>
  )
}
