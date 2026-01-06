"use client"

import { Suspense, useState } from "react"
import { Plus, Search, X } from "lucide-react"
import Image from "next/image"

const categories = ["Tümü", "Çelik Yapı", "Merdiven", "Korkuluk", "Ferforje", "Kamyon Kasa", "Diğer"]

function GaleriContent() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)

  // Mock data
  const images = [
    { id: 1, title: "Çelik Yapı 1", category: "Çelik Yapı", url: "/process/after-1.jpg", active: true },
    { id: 2, title: "Merdiven 1", category: "Merdiven", url: "/process/after-2.jpg", active: true },
    { id: 3, title: "Korkuluk 1", category: "Korkuluk", url: "/process/after-3.jpg", active: false },
    { id: 4, title: "Ferforje 1", category: "Ferforje", url: "/process/after-4.jpg", active: true },
  ]

  const filteredImages = images.filter((img) => {
    const matchesCategory = selectedCategory === "Tümü" || img.category === selectedCategory
    const matchesSearch = img.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Galeri</h1>
          <p className="text-slate-400 mt-1">Görselleri yönetin</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Yeni Görsel
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Görsel ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-800 rounded-lg text-slate-200 placeholder:text-slate-500 focus:border-blue-600 focus:outline-none"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-slate-900/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className="group relative aspect-square rounded-lg overflow-hidden border border-slate-800 hover:border-blue-600/50 transition-colors"
          >
            <Image src={image.url || "/placeholder.svg"} alt={image.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-medium text-sm">{image.title}</p>
                <p className="text-slate-300 text-xs mt-1">{image.category}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      image.active ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"
                    }`}
                  >
                    {image.active ? "Aktif" : "Pasif"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal (UI Only) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-100">Yeni Görsel Ekle</h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Başlık</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:border-blue-600 focus:outline-none"
                  placeholder="Görsel başlığı"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Kategori</label>
                <select className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:border-blue-600 focus:outline-none">
                  {categories
                    .filter((c) => c !== "Tümü")
                    .map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Görsel</label>
                <div className="border-2 border-dashed border-slate-800 rounded-lg p-8 text-center hover:border-blue-600/50 transition-colors cursor-pointer">
                  <p className="text-slate-400 text-sm">Görseli sürükleyin veya tıklayın</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="active" className="w-4 h-4" />
                <label htmlFor="active" className="text-sm text-slate-300">
                  Aktif
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Kaydet
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function GaleriPage() {
  return (
    <Suspense fallback={null}>
      <GaleriContent />
    </Suspense>
  )
}
