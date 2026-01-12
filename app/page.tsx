import Image from "next/image"
import Link from "next/link"

export default function Page() {
  return (
    <main className="w-full">
      {/* HERO */}
      <section className="relative h-screen w-full">
        <Image
          src="/hero/hero-1.jpg"
          alt="Çelik Konstrüksiyon"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex h-full items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl text-white">
              <p className="text-sky-400 mb-3 text-sm md:text-base">
                Endüstriyel tesis ve depo çözümleriniz için
              </p>

              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8">
                Çelik <br /> Konstrüksiyon
              </h1>

              <div className="flex gap-4">
                <Link
                  href="/projeler"
                  className="bg-sky-500 hover:bg-sky-600 transition text-white px-7 py-4 rounded-xl font-semibold"
                >
                  Keşfet →
                </Link>

                <Link
                  href="/iletisim"
                  className="border border-white/70 hover:bg-white/20 transition text-white px-7 py-4 rounded-xl font-semibold"
                >
                  İletişime Geç
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HİZMETLER */}
      <section className="bg-white py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-20">
            <span className="text-sky-500 font-semibold text-sm uppercase tracking-wide">
              Hizmetlerimiz
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-4 mb-6">
              Anahtar Teslim Çelik Yapı Çözümleri
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Projelendirmeden üretime, montajdan teslimata kadar tüm süreci
              mühendislik disipliniyle tek çatı altında yönetiyoruz.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 hover:-translate-y-1 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-4">
                Çelik Konstrüksiyon
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Endüstriyel ve ticari yapılar için yüksek dayanımlı,
                uzun ömürlü çelik çözümler.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-900 text-white p-10 hover:-translate-y-1 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-4">
                Anahtar Teslim
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Projelendirme, üretim ve montaj dahil olmak üzere tüm süreci
                tek noktadan yönettiğimiz çözümler.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 hover:-translate-y-1 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-4">
                Metal İşleme
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Kesim, büküm, kaynak ve özel metal imalatlarında yüksek
                hassasiyetli üretim.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HAKKIMIZDA */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <Image
            src="/about/about-1.jpg"
            alt="ATL Çelik Yapı"
            width={800}
            height={520}
            className="rounded-2xl object-cover"
          />

          <div>
            <h2 className="text-3xl font-bold mb-4">
              Güvenilir Çelik Yapı Ortağınız
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Düzce merkezli ATL Çelik Yapı olarak Türkiye genelinde
              mühendislik odaklı çelik yapı çözümleri sunuyoruz.
            </p>

            <Link
              href="/hakkimizda"
              className="inline-block bg-sky-500 hover:bg-sky-600 transition text-white px-7 py-4 rounded-xl font-semibold"
            >
              Hakkımızda →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
