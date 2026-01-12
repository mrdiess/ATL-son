import HeroSlider from "../components/HeroSlider"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="w-full">
      {/* HERO SLIDER */}
      <HeroSlider />

      {/* HİZMETLER */}
      <section className="container py-24">
        <h2 className="text-2xl md:text-3xl font-semibold mb-12 text-center">
          Hizmet Alanlarımız
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Çelik Yapı",
              desc: "Dayanıklı, uzun ömürlü ve mühendislik odaklı çelik yapı çözümleri.",
            },
            {
              title: "Ferforje Sistemler",
              desc: "Estetik ve sağlam ferforje korkuluk, kapı ve özel tasarımlar.",
            },
            {
              title: "Merdiven & Özel İmalat",
              desc: "Projeye özel ölçü, modern ve fonksiyonel metal imalatlar.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="border rounded-xl p-8 text-center hover:shadow-lg transition"
            >
              <h3 className="text-lg font-medium mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJELERE YÖNLENDİRME */}
      <section className="container py-24">
        <div className="rounded-2xl bg-gray-100 p-10 md:p-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Projelerimizi İnceleyin
          </h2>

          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Gerçekleştirdiğimiz projelerle kalite ve işçiliğimizi yakından görün.
          </p>

          <Link
            href="/projeler"
            className="inline-block mt-8 px-8 py-3 rounded-lg bg-black text-white font-medium hover:bg-black/90 transition"
          >
            Projelere Git
          </Link>
        </div>
      </section>

      {/* GALERİ YÖNLENDİRME */}
      <section className="container py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">
              Galerimiz
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Üretim ve uygulama süreçlerimizden seçilmiş görselleri inceleyin.
            </p>
          </div>

          <Link
            href="/galeri"
            className="px-8 py-3 rounded-lg border font-medium hover:bg-gray-100 transition"
          >
            Galeriye Git
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-32 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Projeniz İçin Teklif Alın
        </h2>

        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          İhtiyacınıza özel çözümler ve fiyatlandırma için bizimle iletişime geçin.
        </p>

        <Link
          href="/iletisim"
          className="inline-block mt-8 px-10 py-4 rounded-lg bg-sky-500 text-white font-medium hover:bg-sky-600 transition"
        >
          İletişime Geç
        </Link>
      </section>
    </main>
  )
}
