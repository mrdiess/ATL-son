import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="w-full">
      {/* HERO */}
      <section className="relative h-screen w-full">
        <Image
          src="/hero/hero-1.jpg"
          alt="Çelik Konstrüksiyon"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-6 flex h-full items-center">
          <div className="max-w-3xl text-white">
            <span className="block text-sky-400 text-sm md:text-base mb-3">
              Endüstriyel tesis ve depo çözümleriniz için
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              Çelik <br /> Konstrüksiyon
            </h1>

            <div className="flex gap-4">
              <Link
                href="/projeler"
                className="bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-600 transition"
              >
                Keşfet
              </Link>
              <Link
                href="/iletisim"
                className="border border-white px-6 py-3 rounded-lg text-white font-semibold hover:bg-white/20 transition"
              >
                İletişime Geç
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HIZMETLER */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Anahtar Teslim Çelik Yapı Çözümleri
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Çelik Konstrüksiyon",
                desc: "Endüstriyel ve ticari yapılar için dayanıklı çelik çözümler",
              },
              {
                title: "Metal İşleme",
                desc: "Kesim, büküm, kaynak ve özel metal imalatları",
              },
              {
                title: "Anahtar Teslim",
                desc: "Projelendirme, üretim ve montaj dahil uçtan uca hizmet",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border p-6 rounded-xl hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HAKKIMIZDA */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:flex md:items-center md:gap-12">
          <div className="md:w-1/2">
            <Image
              src="/about/about-1.jpg"
              alt="Hakkımızda"
              width={800}
              height={500}
              className="rounded-xl object-cover"
            />
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <h2 className="text-3xl font-bold mb-4">
              Hakkımızda
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Düzce merkezli ATL Çelik Yapı olarak çelik konstrüksiyon,
              metal işleme ve anahtar teslim projelerde Türkiye genelinde
              hizmet veriyoruz.
            </p>
            <Link
              href="/hakkimizda"
              className="mt-6 inline-block bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-600 transition"
            >
              Devamını Oku
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
