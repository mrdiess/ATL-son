"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, GripVertical } from "lucide-react"

interface Slide {
  id: string
  title: string
  description: string
  image?: string
  status: "active" | "inactive"
}

export default function SliderPage() {
  const [slides, setSlides] = useState<Slide[]>([
    { id: "1", title: "Lazer Kesim", description: "Yüksek hassasiyet ve teknoloji", image: "🔴", status: "active" },
    { id: "2", title: "Sandviç Panel", description: "Profesyonel üretim", image: "🟢", status: "active" },
    { id: "3", title: "Çelik Konstrüksiyon", description: "Endüstriyel tesis", image: "🔵", status: "inactive" },
  ])

  const toggleStatus = (id: string) => {
    setSlides((prev) =>
      prev.map((slide) =>
        slide.id === id ? { ...slide, status: slide.status === "active" ? "inactive" : "active" } : slide,
      ),
    )
  }

  const handleDelete = (id: string) => {
    setSlides((prev) => prev.filter((slide) => slide.id !== id))
  }

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const newSlides = [...slides]
      ;[newSlides[index], newSlides[index - 1]] = [newSlides[index - 1], newSlides[index]]
      setSlides(newSlides)
    }
  }

  const handleMoveDown = (index: number) => {
    if (index < slides.length - 1) {
      const newSlides = [...slides]
      ;[newSlides[index], newSlides[index + 1]] = [newSlides[index + 1], newSlides[index]]
      setSlides(newSlides)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Hero Slider</h1>
        <p className="text-slate-400">Ana sayfa slaytlarını yönetin</p>
      </div>

      {/* Add Slide Button */}
      <Button className="bg-blue-600 hover:bg-blue-700 mb-4">
        <Plus className="w-4 h-4 mr-2" />
        Yeni Slayt Ekle
      </Button>

      {/* Slides List */}
      <div className="space-y-3">
        {slides.map((slide, index) => (
          <Card key={slide.id} className="bg-slate-900 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <GripVertical className="w-5 h-5 text-slate-400 cursor-move" />
                <div className="text-4xl">{slide.image}</div>
                <div className="flex-1">
                  <p className="text-white font-medium">{slide.title}</p>
                  <p className="text-sm text-slate-400">{slide.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="text-xs"
                  >
                    ↑
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleMoveDown(index)}
                    disabled={index === slides.length - 1}
                    className="text-xs"
                  >
                    ↓
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => toggleStatus(slide.id)}
                    className={slide.status === "active" ? "bg-green-600" : "bg-slate-600"}
                  >
                    {slide.status === "active" ? "Aktif" : "İnaktif"}
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(slide.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
