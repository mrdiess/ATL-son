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
    <main style={{ padding: 40 }}>
      <h1>ATL Çelik Yapı</h1>

      {/* PROJELER */}
      <section>
        <h2>Projeler</h2>
        {data.projects.map((p, i) => (
          <div key={i} style={{ marginBottom: 40 }}>
            <h3>{p.title}</h3>
            <div style={{ display: "flex", gap: 20 }}>
              <Image src={p.before} alt="Before" width={400} height={300} />
              <Image src={p.after} alt="After" width={400} height={300} />
            </div>
          </div>
        ))}
      </section>

      {/* GALERİ */}
      <section>
        <h2>Galeri</h2>

        {Object.entries(data.gallery).map(([category, images]) => (
          <div key={category} style={{ marginBottom: 30 }}>
            <h3>{category}</h3>

            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {images.map((img, i) => (
                <Image
                  key={i}
                  src={img.src}
                  alt={img.alt}
                  width={300}
                  height={200}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* İŞ ORTAKLARI */}
      <section>
        <h2>İş Ortakları</h2>

        <div style={{ display: "flex", gap: 40 }}>
          {data.sponsors.map((s, i) => (
            <Image
              key={i}
              src={s.logo}
              alt={s.name}
              width={150}
              height={80}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
