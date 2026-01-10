export default function Hero() {
  return (
    <section
      id="anasayfa"
      className="relative h-screen flex items-center"
      style={{
        backgroundImage: "url(/hero.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
        <p className="text-blue-400 mb-4">
          Yüksek hassasiyet ve teknoloji ile metal işleme
        </p>

        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Lazer Kesim
        </h1>

        <div className="flex gap-4">
          <a
            href="#hizmetler"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-md"
          >
            Keşfet
          </a>
          <a
            href="#iletisim"
            className="border border-white/40 hover:bg-white/10 px-6 py-3 rounded-md"
          >
            İletişime Geç
          </a>
        </div>
      </div>
    </section>
  )
}
