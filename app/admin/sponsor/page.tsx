"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Edit2 } from "lucide-react"

interface Sponsor {
  id: string
  name: string
  logo?: string
  website: string
  isActive: boolean
}

export default function SponsorPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([
    { id: "1", name: "Partner 1", logo: "🏢", website: "https://example.com", isActive: true },
    { id: "2", name: "Partner 2", logo: "🏭", website: "https://example.com", isActive: true },
    { id: "3", name: "Partner 3", logo: "🏗️", website: "https://example.com", isActive: false },
  ])

  const toggleActive = (id: string) => {
    setSponsors((prev) =>
      prev.map((sponsor) => (sponsor.id === id ? { ...sponsor, isActive: !sponsor.isActive } : sponsor)),
    )
  }

  const handleDelete = (id: string) => {
    setSponsors((prev) => prev.filter((sponsor) => sponsor.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">İş Ortakları</h1>
        <p className="text-slate-400">Sponsor ve iş ortaklarını yönetin</p>
      </div>

      <Button className="bg-blue-600 hover:bg-blue-700">
        <Plus className="w-4 h-4 mr-2" />
        Yeni Sponsor Ekle
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sponsors.map((sponsor) => (
          <Card key={sponsor.id} className="bg-slate-900 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="text-6xl">{sponsor.logo}</div>
                <div className="flex-1">
                  <p className="text-white font-medium">{sponsor.name}</p>
                  <a
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:underline truncate block"
                  >
                    {sponsor.website}
                  </a>
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      onClick={() => toggleActive(sponsor.id)}
                      className={sponsor.isActive ? "bg-green-600" : "bg-slate-600"}
                    >
                      {sponsor.isActive ? "Aktif" : "İnaktif"}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(sponsor.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
