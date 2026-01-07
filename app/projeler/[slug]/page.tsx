import type { Metadata } from "next"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Proje Detayı - ATL Çelik Yapı",
  description: "ATL Çelik Yapı proje detayları ve görselleri",
}

interface Props {
  params: { slug: string }
}

async function getProje(slug: string) {
  try {
    const response = await fetch("/data/projeler.json", { cache: "no-store" })
    const data = await response.json()
    return data.projeler.find((p: any) => p.slug === slug)
  } catch {
    return null
  }
}

export default async function ProjeDetailPage({ params }: Props) {
  const proje = await getProje(params.slug)

  if (!proje) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Proje bulunamadı</h1>
          <Link href="/projeler" className="text-blue-500 hover:underline">
            Tüm projelere dön
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 mt-16">
        <Link href="/projeler" className="flex items-center gap-2 text-blue-500 hover:text-blue-600 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Tüm Projeler
        </Link>

        <h1 className="text-4xl font-bold mb-4">{proje.title}</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">{proje.description}</p>

        {/* Project Info */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 p-6 bg-slate-100 dark:bg-slate-900 rounded-lg">
          <div>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Konum</p>
            <p className="text-lg font-semibold">{proje.location}</p>
          </div>
          <div>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Bina Türü</p>
            <p className="text-lg font-semibold">{proje.building_type}</p>
          </div>
          <div>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Süre</p>
            <p className="text-lg font-semibold">{proje.duration}</p>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-96 rounded-lg overflow-hidden mb-12">
          <Image src={proje.image || "/placeholder.svg"} alt={proje.title} fill className="object-cover" />
        </div>

        <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">{proje.description}</p>
      </div>
    </div>
  )
}
