import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="w-full">
      {/* HERO */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        {/* Background Image */}
        <Image
          src="/hero-steel.jpg"
          alt="Çelik Konstrüksiyon"
          fill
          priority
          className="object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center">
          <div className="container mx-auto px-6">
            <span className="inline-block mb-6 text-sm md:text-base text-sky-400 font-medium">
              Endüstriyel tesis ve depo çözümleriniz için
            </span>

            <h1 className="text-white font-bold leading-tight text-4xl md:text-6xl lg:text-7xl max-w-4xl">
              Çelik <br /> Konstrüksiyon
            </h1>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/projeler"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-8 py-4 text-white font-semibold hover:bg-sky-600 transition"
              >
                Keşfet →
              </Link>

              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-8 py-4 text-white font-semibold hover:bg-white/10 transition"
              >
                İletişime Geç
              </Link>
            </div>
          </div>
        </div>

        {/* Slider Indicators (Mock) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span className="h-2 w-8 rounded-full bg-sky-400" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
        </div>
      </section>
    </main>
  )
}
