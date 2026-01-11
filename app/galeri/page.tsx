import Image from "next/image"

const categories = [
  {
    title: "Fabrika",
    images: [
      "/gallery/görsel1.jpg",
      "/gallery/görsel2.jpg",
    ],
  },
  {
    title: "Çelik Yapı",
    images: [
      "/gallery/görsel3.jpg",
      "/gallery/görsel4.jpg",
      "/gallery/görsel5.jpg",
    ],
  },
]

export default function GaleriPage() {
  return (
    <main style={{ padding: 40 }}>
      <h1 style={{ fontSize: 40, marginBottom: 40 }}>Galeri</h1>

      {categories.map((cat) => (
        <section key={cat.title} style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 28, marginBottom: 20 }}>{cat.title}</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            {cat.images.map((src, i) => (
              <Image
                key={i}
                src={src}
                alt=""
                width={400}
                height={300}
                style={{ width: "100%", height: "auto" }}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
