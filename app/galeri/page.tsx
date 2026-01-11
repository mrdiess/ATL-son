import Image from "next/image"
import { Header } from "@/components/Header"

const categories = {
  Fabrika: [
    "/gallery/görsel1.jpg",
    "/gallery/görsel2.jpg",
  ],
  Depo: [
    "/gallery/görsel3.jpg",
    "/gallery/görsel4.jpg",
  ],
  Ticari: [
    "/gallery/görsel5.jpg",
  ],
}

export default function GaleriPage() {
  return (
    <>
      <Header />

      <main style={{ padding: "80px 40px" }}>
        <h1 style={{ fontSize: 40, marginBottom: 40 }}>Foto Galeri</h1>

        {Object.entries(categories).map(([category, images]) => (
          <section key={category} style={{ marginBottom: 60 }}>
            <h2 style={{ fontSize: 28, marginBottom: 20 }}>{category}</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: 20,
              }}
            >
              {images.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt={category}
                  width={400}
                  height={300}
                  style={{ borderRadius: 12, objectFit: "cover" }}
                />
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  )
}
