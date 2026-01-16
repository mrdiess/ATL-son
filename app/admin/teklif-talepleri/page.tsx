"use client"

import { useState } from "react"
import { Trash2, Phone, Calendar } from "lucide-react"

export default function TeklifTalepleriPage() {
  // Mock data
  const [quotes] = useState([
    { id: 1, name: "Ahmet Yılmaz", phone: "0532 123 45 67", subject: "Depo İnşaatı", date: "2024-01-15", read: false },
    {
      id: 2,
      name: "Mehmet Kaya",
      phone: "0543 234 56 78",
      subject: "Merdiven Montajı",
      date: "2024-01-14",
      read: true,
    },
    {
      id: 3,
      name: "Ayşe Demir",
      phone: "0555 345 67 89",
      subject: "Çelik Yapı Teklifi",
      date: "2024-01-13",
      read: true,
    },
    {
      id: 4,
      name: "Fatma Şahin",
      phone: "0501 456 78 90",
      subject: "Ferforje Korkuluk",
      date: "2024-01-12",
      read: false,
    },
  ])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Teklif Talepleri</h1>
        <p className="text-slate-400 mt-1">Müşteri teklif taleplerini görüntüleyin</p>
      </div>

      {/* Quotes List */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80">
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-300">Durum</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-300">Ad Soyad</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-300">Telefon</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-300">Konu</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-300">Tarih</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-slate-300">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote) => (
                <tr
                  key={quote.id}
                  className={`border-b border-slate-800 hover:bg-slate-800/50 transition-colors ${
                    !quote.read ? "bg-blue-950/20" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${quote.read ? "bg-slate-600" : "bg-blue-500"}`}
                    />
                  </td>
                  <td className="px-6 py-4 text-slate-200 font-medium">{quote.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Phone className="w-4 h-4 text-slate-500" />
                      {quote.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{quote.subject}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Calendar className="w-4 h-4" />
                      {quote.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-red-400 hover:text-red-300 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
