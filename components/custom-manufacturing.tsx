"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface Project {
  slug: string
  before: string | null
  after: string | null
}

interface CustomManufacturingItem {
  id: number
  title: string
  before: string | null
  after: string | null
}

export default function CustomManufacturing() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<CustomManufacturingItem | null>(null)
  const [customItems, setCustomItems] = useState<CustomManufacturingItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects")
        if (!response.ok) throw new Error("Failed to fetch projects")
        const result = await response.json()

        if (result.data && Array.isArray(result.data)) {
          const items: CustomManufacturingItem[] = result.data
            .map((project: Project, index: number) => ({
              id: index + 1,
              title: project.slug || `Proje ${index + 1}`,
              before: project.before || null,
              after: project.after || null,
            }))
            .filter((item) => item.before && item.after)

          setCustomItems(items)
        }
      } catch (error) {
        console.error("Error fetching projects:", error)
        setCustomItems([])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const itemsPerPage = typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 3

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, customItems.length - itemsPerPage + 1))
  }

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.max(1, customItems.length - itemsPerPage + 1)) %
        Math.max(1, customItems.length - itemsPerPage + 1),
    )
  }

  const openModal = (item: CustomManufacturingItem) => {
    setSelectedItem(item)
    setModalOpen(true)
  }

  const visibleItems = customItems.slice(currentSlide, currentSlide + itemsPerPage)

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-blue-500 font-bold uppercase tracking-wider mb-2">Özel Üretimler</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Her Projeye Özel Tasarım</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Her projeye özel tasarım, ölçü ve mühendislik çözümleri.
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {visibleItems.map((item) => (
              <div key={item.id} onClick={() => openModal(item)} className="cursor-pointer group">
                {/* Card */}
                <div className="rounded-xl overflow-hidden border border-slate-700 hover:border-slate-500 transition-all duration-300">
                  <div className="relative h-48 bg-slate-800 overflow-hidden">
                    {item.after ? (
                      <img
                        src={item.after || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : null}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <span className="inline-block px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded text-xs font-medium mb-2">
                      Proje Galerileri
                    </span>
                    <h3 className="font-bold text-sm line-clamp-2">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation - Only show if more than one slide */}
          {customItems.length > itemsPerPage && (
            <>
              <button
                onClick={prevSlide}
                className="absolute -left-12 md:-left-16 top-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity p-2 hover:bg-slate-800 rounded-full"
                aria-label="Önceki"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute -right-12 md:-right-16 top-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity p-2 hover:bg-slate-800 rounded-full"
                aria-label="Sonraki"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#iletisim"
            className="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
          >
            Teklif Al
          </a>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && selectedItem && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setModalOpen(false)}
        >
          <div className="bg-background rounded-2xl max-w-2xl w-full relative" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative h-96 bg-slate-800">
              {selectedItem.after ? (
                <Image
                  src={selectedItem.after || "/placeholder.svg"}
                  alt={selectedItem.title}
                  fill
                  className="object-cover"
                />
              ) : null}
            </div>

            {/* Content */}
            <div className="p-8">
              <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded text-sm font-medium mb-3">
                Proje Galerileri
              </span>
              <h3 className="text-2xl font-bold mb-4">{selectedItem.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {selectedItem.title} projesinin öncesi-sonrası görüntüleri.
              </p>
              <a
                href="#iletisim"
                onClick={() => setModalOpen(false)}
                className="inline-block px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
              >
                Teklif Al
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
