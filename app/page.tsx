// app/page.tsx
import Link from "next/link"
import ProjectGrid from "../components/projects/ProjectGrid"

export default function HomePage() {
  return (
    <main className="space-y-24">
      {/* HERO */}
      <section className="container py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          ATL Çelik Yapı
        </h1>

        <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
          Anahtar teslim çelik yapı, villa, fabrika ve endüstriyel projeler.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/projeler"
            className="px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-black/90 transition"
          >
            Projeler
          </Link>

          <Link
            href="/galeri"
            className="px-6 py-3 rounded-lg border font-medium hover:bg-gray-100 transition"
          >
            Galeri
          </Link>
        </div>
      </section>

      {/* PROJELER */}
      <section className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">Son Projeler</h2>

          <Link
            href="/projeler"
            className="text-sm underline"
          >
            Tümünü Gör
          </Link>
        </div>

        <ProjectGrid limit={6} />
      </section>
    </main>
  )
}
