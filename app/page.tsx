import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="w-full">
      {/* HERO */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        {/* Background Image */}
        <Image
          src="/hero/hero-1.jpg"
          alt="Çelik Konstrüksiyon"
          fill
          priority
          className="object-cover"
        />

        {/* Strong Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <span className="mb-4 inline-block text-sm md:text-base font-medium text-sky-400">
                Endüstriyel tesis ve depo çözümleriniz için
              </span>

              <h1 className="mb-8 text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                Çelik <br /> Konstrüksiyon
              </h1>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/projeler"
                  className="rounded-xl bg-sky-500 px-8 py-4 font-semibold text-white transition hover:bg-sky-600"
                >
                  Keşfet →
                </Link>

                <Link
                  href="/iletisim"
                  className="rounded-xl border border-white/40 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
                >
                  İletişime Geç
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slider Indicator (Mock) */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span className="h-2 w-8 rounded-full bg-sky-400" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
        </div>
      </section>
    </main>
  )
}
