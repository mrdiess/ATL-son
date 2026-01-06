"use client"

import { useEffect, useState } from "react"
import { ImageIcon, Palette, Handshake, FileText } from "lucide-react"
import Image from "next/image"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalImages: 0,
    totalDesigns: 0,
    totalPartners: 0,
    totalQuotes: 0,
  })
  const [recentImages, setRecentImages] = useState<any[]>([])

  useEffect(() => {
    // Mock data - UI only
    setStats({
      totalImages: 156,
      totalDesigns: 12,
      totalPartners: 8,
      totalQuotes: 24,
    })

    setRecentImages([
      { id: 1, title: "Çelik Yapı 1", url: "/process/after-1.jpg" },
      { id: 2, title: "Merdiven 1", url: "/process/after-2.jpg" },
      { id: 3, title: "Korkuluk 1", url: "/process/after-3.jpg" },
      { id: 4, title: "Ferforje 1", url: "/process/after-4.jpg" },
    ])
  }, [])

  const statCards = [
    { label: "Galeri Görseli", value: stats.totalImages, icon: ImageIcon, color: "blue" },
    { label: "Özel Tasarım", value: stats.totalDesigns, icon: Palette, color: "purple" },
    { label: "İş Ortağı", value: stats.totalPartners, icon: Handshake, color: "green" },
    { label: "Teklif Talebi", value: stats.totalQuotes, icon: FileText, color: "orange" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Dashboard</h1>
        <p className="text-slate-400 mt-1">Genel bakış ve istatistikler</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-100 mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-600/20`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Images */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-slate-100 mb-4">Son Eklenen Görseller</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recentImages.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-square rounded-lg overflow-hidden border border-slate-800 hover:border-blue-600/50 transition-colors"
            >
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <p className="text-white text-sm font-medium">{image.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
