import Image from "next/image"

type Project = {
  title: string
  before: string
  after: string
}

type GalleryItem = {
  src: string
  alt: string
}

type SiteData = {
  projects: Project[]
  gallery: Record<string, GalleryItem[]>
  sponsors: { name: string; logo: string }[]
}

async function getData(): Promise<SiteData> {
  const res = await fetch(
    "https://script.google.com/macros/s/AKfycbyvmIgjGp0qXucZ6yIC2Tj1d2kBJNfXhuNSYZ52mEWcE-IWCOgiGv-aLR14JvDMyxIA/exec",
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Drive verisi alınamadı")
  }

  return res.json()
}

export default async function Home() {
  const data = await getData()

  return (
    <main className="bg-background text-foreground">
      {/* HERO */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            ATL Çelik Yapı
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Google Drive altyapılı, hızlı ve sürdürülebilir çelik yapı çözümleri
          </p>
        </div>
      </section>

      {/* PROJELER */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Projelerimiz
          </h2>

          <div className="space-y-16">
            {data.projects.map((p, i) => (
              <div key={i} className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-4">{p.title}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Image
                      src={p.before}
                      alt="Önce"
                      width={500}
                      height={350}
                      className="rounded-xl object-cover"
                    />
                    <Image
                      src={p.after}
                      alt="Sonra"
                      width={500}
                      height={350}
                      className="rounded-xl object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERİ */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Galeri
          </h2>

          {Object.entries(data.gallery).map(([category, images]) => (
            <div key={category} className="mb-14">
              <h3 className="text-xl font-semibold mb-6">{category}</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((img, i) => (
                  <Image
                    key={i}
                    src={img.src}
                    alt={img.alt}
                    width={400}
                    height={300}
                    className="rounded-xl object-cover hover:scale-105 transition-transform"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* İŞ ORTAKLARI */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">
            İş Ortaklarımız
          </h2>

          <div className="flex flex-wrap justify-center gap-12">
            {data.sponsors.map((s, i) => (
              <Image
                key={i}
                src={s.logo}
                alt={s.name}
                width={160}
                height={80}
                className="object-contain grayscale hover:grayscale-0 transition"
              />
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 bg-slate-900 text-slate-300 text-center text-sm">
        © {new Date().getFullYear()} ATL Çelik Yapı
      </footer>
    </main>
  )
}
