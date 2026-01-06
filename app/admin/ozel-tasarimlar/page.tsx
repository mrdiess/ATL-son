"use client"

import { useState } from "react"
import { Plus, X, GripVertical } from "lucide-react"
import Image from "next/image"

export default function OzelTasarimlarPage() {
  const [showAddModal, setShowAddModal] = useState(false)

  // Mock data
  const designs = [
    {
      id: 1,
      title: "Endüstriyel Çelik Yapı",
      description: "Modern depo çözümleri",
      order: 1,
      active: true,
      image: "/process/after-1.jpg",
    },
    {
      id: 2,
      title: "Özel Merdiven Tasarımı",
      description: "Tasarım odaklı çelik merdiven",
      order: 2,
      active: true,
      image: "/process/after-2.jpg",
    },
    {
      id: 3,
      title: "Dekoratif Korkuluklar",
      description: "Ferforje detaylı korkuluk",
      order: 3,
      active: false,
      image: "/process/after-3.jpg",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Özel Tasarımlar</h1>
          <p className="text-slate-400 mt-1">Ana sayfa slider içeriklerini yönetin</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Yeni Tasarım
        </button>
      </div>

      {/* Designs List */}
      <div className="space-y-3">
        {designs.map((design) => (
          <div
            key={design.id}
            className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center gap-4">
              <button className="text-slate-400 hover:text-slate-200 cursor-move">
                <GripVertical className="w-5 h-5" />
              </button>
              <div className="w-20 h-20 rounded-lg overflow-hidden border border-slate-800">
                <Image
                  src={design.image || "/placeholder.svg"}
                  alt={design.title}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-slate-100 font-medium">{design.title}</h3>
                  <span className="text-slate-500 text-sm">#{design.order}</span>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      design.active ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"
                    }`}
                  >
                    {design.active ? "Aktif" : "Pasif"}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mt-1">{design.description}</p>
              </div>
              <button className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200 transition-colors">
                Düzenle
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal (UI Only) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-100">Yeni Tasarım Ekle</h2>
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
                  placeholder="Tasarım başlığı"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Açıklama</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:border-blue-600 focus:outline-none"
                  placeholder="Kısa açıklama (1 satır)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Sıra No</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:border-blue-600 focus:outline-none"
                  placeholder="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Kapak Görseli</label>
                <div className="border-2 border-dashed border-slate-800 rounded-lg p-8 text-center hover:border-blue-600/50 transition-colors cursor-pointer">
                  <p className="text-slate-400 text-sm">Görseli sürükleyin</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="designActive" className="w-4 h-4" defaultChecked />
                <label htmlFor="designActive" className="text-sm text-slate-300">
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
