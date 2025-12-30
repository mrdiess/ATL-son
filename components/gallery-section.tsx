"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

const initialGalleryImages = [
  {
    src: "/modern-warehouse-steel-construction-building.jpg",
    title: "Depo Projesi - İstanbul",
    category: "Depo",
  },
  {
    src: "/industrial-factory-steel-metal-building-production.jpg",
    title: "Fabrika Binası - Bursa",
    category: "Fabrika",
  },
  {
    src: "/large-aircraft-hangar-steel-structure-construction.jpg",
    title: "Hangar Projesi - Ankara",
    category: "Hangar",
  },
  {
    src: "/modern-shopping-mall-steel-structure-interior.jpg",
    title: "AVM Projesi - İzmir",
    category: "Ticari",
  },
  {
    src: "/modern-office-building-steel-frame-architecture.jpg",
    title: "Ofis Binası - Antalya",
    category: "Ticari",
  },
  {
    src: "/agricultural-greenhouse-farm-steel-metal-structure.jpg",
    title: "Tarımsal Tesis - Konya",
    category: "Tarımsal",
  },
  {
    src: "/sports-facility-gymnasium-steel-structure-building.jpg",
    title: "Spor Salonu - Kayseri",
    category: "Spor",
  },
  {
    src: "/logistics-center-warehouse-steel-construction.jpg",
    title: "Lojistik Merkezi - Kocaeli",
    category: "Depo",
  },
]

const categories = ["Tümü", "Depo", "Fabrika", "Hangar", "Ticari", "Tarımsal", "Spor"]

export function GallerySection() {
  const [galleryImages, setGalleryImages] = useState(initialGalleryImages)
  const [selectedCategory, setSelectedCategory] = useState("Tümü")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    // Fetch gallery images from database
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/media")
        const data = await response.json()

        if (Array.isArray(data) && data.length > 0) {
          const galleryItems = data
            .filter((item: any) => item.type === "image")
            .map((item: any) => ({
              src: item.url,
              title: item.alt || item.name,
              category: item.category || "Diğer",
            }))

          if (galleryItems.length > 0) {
            setGalleryImages([...initialGalleryImages, ...galleryItems])
          }
        }
      } catch (error) {
        console.error("[v0] Error fetching gallery:", error)
        // Use default images if fetch fails
      }
    }

    fetchImages()
  }, [])

  const filteredImages =
    selectedCategory === "Tümü" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => setLightboxOpen(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
  }

  return (
    <section id="galeri" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">Projelerimizden Kareler</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-foreground">Foto Galeri</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tamamladığımız projelerin fotoğraflarını inceleyerek işçiliğimiz hakkında fikir edinin.
            </p>
          </div>
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card text-muted-foreground hover:bg-muted border border-border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <AnimatedSection key={index} animation="scale" delay={index * 0.05}>
              <div
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex items-end justify-start p-4">
                  <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-primary text-xs font-medium">{image.category}</span>
                    <h4 className="text-white font-semibold">{image.title}</h4>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="relative w-full max-w-4xl aspect-video">
              <Image
                src={filteredImages[currentImageIndex].src || "/placeholder.svg"}
                alt={filteredImages[currentImageIndex].title}
                fill
                className="object-contain"
              />
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-white">
              <h4 className="font-semibold">{filteredImages[currentImageIndex].title}</h4>
              <span className="text-white/70 text-sm">
                {currentImageIndex + 1} / {filteredImages.length}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
