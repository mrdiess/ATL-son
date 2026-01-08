"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, Phone } from "lucide-react"
import { getFallbackGalleryData } from "@/data/fallbackGalleryData"

const CATEGORIES = [
  { id: "tumu", label: "Tümü", slug: "tumu" },
  { id: "celik-yapi", label: "Çelik Yapı", slug: "celik-yapi" },
  { id: "merdiven", label: "Merdiven", slug: "merdiven" },
  { id: "korkuluk", label: "Korkuluk", slug: "korkuluk" },
  { id: "ferforje", label: "Ferforje", slug: "ferforje" },
  { id: "kamyon-kasa", label: "Kamyon Kasa", slug: "kamyon-kasa" },
  { id: "diger", label: "Diğer", slug: "diger" },
]

interface GalleryItem {
  src: string
  title: string
  alt: string
}

interface GalleryData {
  [key: string]: GalleryItem[]
}

export default function GaleriPage() {
  const [galleryData, setGalleryData] = useState<GalleryData>({})
  const [selectedCategory, setSelectedCategory] = useState("tumu")
  const [isLoading, setIsLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL

        if (!apiUrl) {
          console.log("[v0] Google Apps Script URL not configured, using fallback data")
          setGalleryData(getFallbackGalleryData())
          setIsLoading(false)
          return
        }

        const response = await fetch(apiUrl, {
          cache: "no-store",
        })
        if (!response.ok) throw new Error("API verisi yüklenemedi")

        const data = await response.json()

        if (data.gallery && Array.isArray(data.gallery)) {
          const organizedData: GalleryData = {}

          data.gallery.forEach((item: any) => {
            const category = item.category || "diger"
            if (!organizedData[category]) {
              organizedData[category] = []
            }
            organizedData[category].push({
              src: item.src,
              title: item.title || "Başlıksız",
              alt: item.alt || item.title || "Galeri görseli",
            })
          })

          setGalleryData(organizedData)
        } else {
          setGalleryData(getFallbackGalleryData())
        }
      } catch (error) {
        console.error("[v0] Galeri API hatası:", error)
        setGalleryData(getFallbackGalleryData())
      } finally {
        setIsLoading(false)
      }
    }

    fetchGallery()
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getFilteredItems = (): GalleryItem[] => {
    if (selectedCategory === "tumu") {
      return Object.values(galleryData).flat()
    }
    return galleryData[selectedCategory] || []
  }

  const filteredItems = getFilteredItems()

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => setLightboxOpen(false)

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length)
  }

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md border-b shadow-sm" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/">
              <img src="/lightmodelogo.png" alt="ATL Çelik Yapı" className="h-12 md:h-16 dark:hidden" />
              <img src="/darkmodelogo.png" alt="ATL Çelik Yapı" className="h-12 md:h-16 hidden dark:block" />
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-foreground hover:text-blue-500 transition-colors font-medium">
                Ana Sayfa
              </Link>
              <a href="/#hizmetler" className="text-foreground hover:text-blue-500 transition-colors font-medium">
                Hizmetler
              </a>
              <a href="/#projeler" className="text-foreground hover:text-blue-500 transition-colors font-medium">
                Projeler
              </a>
              <a href="/#hakkimizda" className="text-foreground hover:text-blue-500 transition-colors font-medium">
                Hakkımızda
              </a>
              <Link href="/galeri" className="text-blue-500 font-medium">
                Galeri
              </Link>
              <a href="/#iletisim" className="text-foreground hover:text-blue-500 transition-colors font-medium">
                İletişim
              </a>
            </nav>

            <div className="flex items-center gap-2 md:gap-4">
              <ThemeToggle />
              <a
                href="tel:+905373393947"
                className="flex items-center gap-2 px-3 md:px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm md:text-base font-semibold"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">Hemen Ara</span>
              </a>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-foreground">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t bg-background/95 backdrop-blur-md">
              <div className="flex flex-col gap-4">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-foreground hover:text-blue-500 transition-colors font-medium py-2"
                >
                  Ana Sayfa
                </Link>
                <a
                  href="/#hizmetler"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-foreground hover:text-blue-500 transition-colors font-medium py-2"
                >
                  Hizmetler
                </a>
                <a
                  href="/#projeler"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-foreground hover:text-blue-500 transition-colors font-medium py-2"
                >
                  Projeler
                </a>
                <a
                  href="/#hakkimizda"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-foreground hover:text-blue-500 transition-colors font-medium py-2"
                >
                  Hakkımızda
                </a>
                <Link
                  href="/galeri"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-blue-500 font-medium py-2"
                >
                  Galeri
                </Link>
                <a
                  href="/#iletisim"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-foreground hover:text-blue-500 transition-colors font-medium py-2"
                >
                  İletişim
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero - max 260px */}
      <section className="relative h-[260px] pt-16">
        <div className="absolute inset-0 bg-slate-950">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "url(data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E)",
            }}
          />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Foto Galeri</h1>
          <p className="text-slate-400 text-sm md:text-base mt-2 max-w-xl">
            Tamamladığımız projeler ve çalışmalarımızdan görseller
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="mb-12 border-b border-slate-200 dark:border-slate-800">
          <div className="flex overflow-x-auto gap-0 -mx-4 px-4 md:gap-0 md:mx-0 md:px-0 scrollbar-hide">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 font-medium text-sm md:text-base transition-colors whitespace-nowrap border-b-2 ${
                  selectedCategory === category.id
                    ? "text-blue-500 border-blue-500"
                    : "text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid - 4:3 oran */}
        {isLoading ? (
          <div className="text-center py-12 text-slate-500">Galeri yükleniyor...</div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item, index) => (
              <div
                key={`${item.src}-${index}`}
                onClick={() => openLightbox(index)}
                className="group relative aspect-[4/3] bg-slate-200 dark:bg-slate-800 rounded overflow-hidden cursor-pointer"
              >
                <Image
                  src={item.src || "/placeholder.svg?height=300&width=400&query=steel construction"}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                    />
                  </svg>
                </div>
                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-medium truncate">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500">Seçilen kategoride fotoğraf bulunmamaktadır.</div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && filteredItems.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={closeLightbox}>
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-slate-300 transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-slate-300 transition-colors p-2"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="relative max-w-5xl max-h-[85vh] w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <Image
              src={filteredItems[lightboxIndex].src || "/placeholder.svg"}
              alt={filteredItems[lightboxIndex].alt}
              width={1200}
              height={900}
              className="object-contain w-full h-full max-h-[85vh]"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white text-lg font-medium">{filteredItems[lightboxIndex].title}</p>
              <p className="text-slate-300 text-sm">
                {lightboxIndex + 1} / {filteredItems.length}
              </p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-slate-300 transition-colors p-2"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-8 md:py-12 border-t">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center">
            <p className="text-sm md:text-base">© 2026 ATL Çelik Yapı. Tüm hakları saklıdır.</p>
            <p className="text-xs md:text-sm text-slate-500 mt-2">Tasarım: rootbarann</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
