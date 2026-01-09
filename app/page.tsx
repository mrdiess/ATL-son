import Image from "next/image"

type MediaItem = {
  url?: string
  file_type?: string
}

type ApiResponse = {
  gallery?: MediaItem[]
}

async function getData(): Promise<ApiResponse> {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL as string, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("API fetch failed")
  }

  return res.json()
}

export default async function HomePage() {
  const data = await getData()

  const images: string[] =
    data.gallery
      ?.filter(
        (item): item is Required<Pick<MediaItem, "url" | "file_type">> =>
          typeof item.url === "string" &&
          typeof item.file_type === "string" &&
          item.file_type.startsWith("image"),
      )
      .map((item) => item.url) ?? []

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Galeri</h1>

      {images.length === 0 && (
        <p className="text-muted-foreground">Görüntü bulunamadı.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative w-full aspect-[4/3] overflow-hidden rounded-lg"
          >
            <Image
              src={src}
              alt={`Galeri ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ))}
      </div>
    </main>
  )
}
