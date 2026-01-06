"use client"

import { useState } from "react"
import { AlertTriangle, Save } from "lucide-react"

export default function AyarlarPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Ayarlar</h1>
        <p className="text-slate-400 mt-1">Site ayarlarını yönetin</p>
      </div>

      {/* Maintenance Mode */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-slate-100">Bakım Modu</h2>
            <p className="text-slate-400 mt-2">
              Bakım modu aktif olduğunda, site ziyaretçilere "Bakımdayız" sayfası gösterilir.
            </p>
            {maintenanceMode && (
              <div className="flex items-center gap-2 mt-4 p-3 bg-orange-950/30 border border-orange-900/50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                <p className="text-orange-300 text-sm">Bakım modu aktif! Ziyaretçiler siteyi görüntüleyemeyecek.</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setMaintenanceMode(!maintenanceMode)}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
              maintenanceMode ? "bg-blue-600" : "bg-slate-700"
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                maintenanceMode ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
          <Save className="w-5 h-5" />
          Değişiklikleri Kaydet
        </button>
      </div>
    </div>
  )
}
