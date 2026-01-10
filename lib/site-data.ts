import Image from "next/image"
import { getSiteData } from "@/lib/site-data"

export default async function GalleryPage() {
  const data = await getSiteData()

  return (
    <main className="max-w-7xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-bold mb-12">Galeri</h1>

      {Object.entries(data.gallery).map(([category, images]) => (
        <section key={category} className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 capitalize">
            {category}
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] rounded-xl overflow-hidden border"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
