import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Tamamlanan Projeler - ATL Çelik Yapı",
  description: "ATL Çelik Yapı tarafından tamamlanan endüstriyel çelik konstrüksiyon ve metal işleme projeleri",
  openGraph: {
    title: "Tamamlanan Projeler - ATL Çelik Yapı",
    description: "Başarılı tamamlanan projelerimiz ve referanslarımız",
  },
}

async function getProjeler() {
  try {
    const response = await fetch("/data/projeler.json", { cache: "no-store" })
    if (!response.ok) throw new Error("Projeler yüklenemedi")
    const data = await response.json()
    return data.projeler || []
  } catch {
    return []
  }
}

export default async function ProjelerPage() {
  const projeler = await getProjeler()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero - 260px */}
      <section className="relative h-[260px] pt-16 mt-4">
        <div className="absolute inset-0 bg-slate-950">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "url(data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E)",
            }}
          />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Tamamlanan Projeler</h1>
          <p className="text-slate-400 text-sm md:text-base mt-2">
            Başarıyla tamamladığımız endüstriyel çelik yapı projeleri
          </p>
        </div>
      </section>

      {/* Projeler Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {projeler.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projeler.map((proje: any) => (
              <Link key={proje.slug} href={`/projeler/${proje.slug}`}>
                <div className="group relative aspect-[4/3] bg-slate-200 dark:bg-slate-800 rounded overflow-hidden cursor-pointer">
                  <Image
                    src={proje.image || "/placeholder.svg?height=300&width=400&query=çelik yapı"}
                    alt={proje.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold text-lg">{proje.title}</h3>
                    <p className="text-slate-300 text-sm">{proje.location}</p>
                    <div className="flex items-center gap-2 mt-2 text-blue-400">
                      <span className="text-sm font-medium">Detaylar</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500">Proje bulunmamaktadır.</div>
        )}
      </div>
    </div>
  )
}
