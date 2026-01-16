"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface CustomManufacturingItem {
  id: number
  title: string
  category: string
  image: string
  description: string
}

const CUSTOM_ITEMS: CustomManufacturingItem[] = [
  {
    id: 1,
    title: "Özel Çelik Merdiven",
    category: "Özel Tasarım",
    image: "/process/after-1.jpg",
    description: "Proje özelliklerine uygun olarak tasarlanan ve üretilen metal merdivenler.",
  },
  {
    id: 2,
    title: "Projeye Özel Konstrüksiyon",
    category: "Proje Bazlı",
    image: "/process/after-2.jpg",
    description: "Müşterinin özel ihtiyaçlarına göre mühendislik çözümleri ile tasarlanan yapılar.",
  },
  {
    id: 3,
    title: "Kişiye Özel Kamyon Kasa",
    category: "Kişiye Özel",
    image: "/process/after-3.jpg",
    description: "Taşıma ihtiyaçlarına göre özelleştirilmiş kamyon ve araç kasaları.",
  },
  {
    id: 4,
    title: "Özel Ölçü Ferforje",
    category: "Özel Tasarım",
    image: "/process/after-4.jpg",
    description: "İstenen ölçü ve desende hazırlanan ferforje yapılar ve dekorasyonlar.",
  },
  {
    id: 5,
    title: "Endüstriyel Özel Üretim",
    category: "Kişiye Özel",
    image: "/process/after-5.jpg",
    description: "Fabrika ve endüstriyel tesisler için özelleştirilmiş çelik yapı çözümleri.",
  },
]

export default function CustomManufacturing() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<CustomManufacturingItem | null>(null)

  const itemsPerPage = typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 3

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, CUSTOM_ITEMS.length - itemsPerPage + 1))
  }

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.max(1, CUSTOM_ITEMS.length - itemsPerPage + 1)) %
        Math.max(1, CUSTOM_ITEMS.length - itemsPerPage + 1),
    )
  }

  const openModal = (item: CustomManufacturingItem) => {
    setSelectedItem(item)
    setModalOpen(true)
  }

  const visibleItems = CUSTOM_ITEMS.slice(currentSlide, currentSlide + itemsPerPage)

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
                  {/* Image */}
                  <div className="relative h-48 bg-slate-800 overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    {/* Hover Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                        <ChevronRight className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <span className="inline-block px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded text-xs font-medium mb-2">
                      {item.category}
                    </span>
                    <h3 className="font-bold text-sm line-clamp-2">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation - Only show if more than one slide */}
          {CUSTOM_ITEMS.length > itemsPerPage && (
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

            {/* Image */}
            <div className="relative h-96 bg-slate-800">
              <Image
                src={selectedItem.image || "/placeholder.svg"}
                alt={selectedItem.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-8">
              <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded text-sm font-medium mb-3">
                {selectedItem.category}
              </span>
              <h3 className="text-2xl font-bold mb-4">{selectedItem.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{selectedItem.description}</p>
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
