"use client"

import { useState } from "react"
import { Plus, X, ExternalLink } from "lucide-react"
import Image from "next/image"

export default function IsOrtaklariPage() {
  const [showAddModal, setShowAddModal] = useState(false)

  // Mock data
  const partners = [
    { id: 1, name: "ABC İnşaat", website: "https://abc.com", logo: "/process/after-1.jpg", active: true },
    { id: 2, name: "XYZ Mühendislik", website: "https://xyz.com", logo: "/process/after-2.jpg", active: true },
    { id: 3, name: "DEF Yapı", website: "", logo: "/process/after-3.jpg", active: false },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">İş Ortakları</h1>
          <p className="text-slate-400 mt-1">İş ortağı logolarını yönetin</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Yeni Ortak
        </button>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-colors"
          >
            <div className="aspect-video rounded-lg overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center mb-4">
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                width={200}
                height={100}
                className="object-contain max-h-20"
              />
            </div>
            <div>
              <h3 className="text-slate-100 font-medium">{partner.name}</h3>
              {partner.website && (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 text-sm flex items-center gap-1 mt-1 hover:text-blue-300"
                >
                  {partner.website}
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              <div className="flex items-center justify-between mt-4">
                <span
                  className={`px-3 py-1 rounded text-xs ${
                    partner.active ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"
                  }`}
                >
                  {partner.active ? "Aktif" : "Pasif"}
                </span>
                <button className="text-slate-400 hover:text-slate-200 text-sm transition-colors">Düzenle</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-100">Yeni İş Ortağı Ekle</h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Firma Adı</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:border-blue-600 focus:outline-none"
                  placeholder="Firma adı"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Website (Opsiyonel)</label>
                <input
                  type="url"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:border-blue-600 focus:outline-none"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Logo</label>
                <div className="border-2 border-dashed border-slate-800 rounded-lg p-8 text-center hover:border-blue-600/50 transition-colors cursor-pointer">
                  <p className="text-slate-400 text-sm">Logoyu sürükleyin</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="partnerActive" className="w-4 h-4" defaultChecked />
                <label htmlFor="partnerActive" className="text-sm text-slate-300">
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
