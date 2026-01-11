import Image from "next/image"

const images = [
  "/gallery/görsel1.jpg",
  "/gallery/görsel2.jpg",
  "/gallery/görsel3.jpg",
  "/gallery/görsel4.jpg",
  "/gallery/görsel5.jpg",
]

export default function GaleriPage() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Galeri</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))",
          gap: 20,
          marginTop: 24,
        }}
      >
        {images.map((src) => (
          <Image key={src} src={src} alt="" width={400} height={300} />
        ))}
      </div>
    </main>
  )
}
