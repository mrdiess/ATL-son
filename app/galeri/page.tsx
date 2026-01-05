"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { PhotoLightbox } from "@/components/photo-lightbox"
import { Menu, X, Phone } from "lucide-react"

interface MediaItem {
  id: string
  filename: string
  url: string
  file_type: string
  category: string
  size: number
  created_at: string
  title?: string
  stage?: string
}

export default function GaleryPage() {
  const [allMediaItems, setAllMediaItems] = useState<MediaItem[]>([])
  const [filteredItems, setFilteredItems] = useState<MediaItem[]>([])
  const [categories, setCategories] = useState<string[]>(["Tümü"])
  const [selectedCategory, setSelectedCategory] = useState("Tümü")
  const [isLoading, setIsLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch("/api/media")
        if (!response.ok) throw new Error("Media fetch failed")
        const result = await response.json()
        if (result.data) {
          const imageItems = result.data.filter((item: MediaItem) => item.file_type.startsWith("image"))
          setAllMediaItems(imageItems)

          const uniqueCategories = [
            "Tümü",
            ...Array.from(new Set(imageItems.map((item: MediaItem) => item.category).filter(Boolean))),
          ]
          setCategories(uniqueCategories)
          setFilteredItems(imageItems)
        }
      } catch (error) {
        console.error("Galeri yükleme hatası:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMedia()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (selectedCategory === "Tümü") {
      setFilteredItems(allMediaItems)
    } else {
      setFilteredItems(allMediaItems.filter((item) => item.category === selectedCategory))
    }
  }, [selectedCategory, allMediaItems])

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const handleNavClick = () => {
    setMobileMenuOpen(false)
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
              <Link href="/galeri" className="text-foreground hover:text-blue-500 transition-colors font-medium">
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
                  onClick={handleNavClick}
                  className="text-foreground hover:text-blue-500 transition-colors font-medium py-2"
                >
                  Ana Sayfa
                </Link>
                <a
                  href="/#hizmetler"
                  onClick={handleNavClick}
                  className="text-foreground hover:text-blue-500 transition-colors font-medium py-2"
                >
                  Hizmetler
                </a>
                <a
                  href="/#projeler"
                  onClick={handleNavClick}
                  className="text-foreground hover:text-blue-500 transition-colors font-medium py-2"
                >
                  Projeler
                </a>
                <a
                  href="/#hakkimizda"
                  onClick={handleNavClick}
                  className="text-foreground hover:text-blue-500 transition-colors font-medium py-2"
                >
                  Hakkımızda
                </a>
                <Link
                  href="/galeri"
                  onClick={handleNavClick}
                  className="text-foreground hover:text-blue-500 transition-colors font-medium py-2"
                >
                  Galeri
                </Link>
                <a
                  href="/#iletisim"
                  onClick={handleNavClick}
                  className="text-foreground hover:text-blue-500 transition-colors font-medium py-2"
                >
                  İletişim
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-64 md:h-96 pt-16 md:pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "url(data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E)",
            }}
          />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Foto Galeri</h1>
          <p className="text-blue-200 max-w-2xl">Tamamladığımız projeler ve çalışmalarımızdan görseller</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all font-medium text-sm md:text-base ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Galeri yükleniyor...</div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className="group relative h-64 rounded-lg overflow-hidden cursor-pointer bg-secondary/20"
              >
                <Image
                  src={item.url || "/placeholder.svg"}
                  alt={item.title || `Galeri ${index}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all" />
                {item.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white text-sm font-medium">{item.title}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">Seçilen kategoride fotoğraf bulunmamaktadır.</div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <PhotoLightbox
          images={filteredItems.map((item) => item.url)}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNext={() => setLightboxIndex((prev) => (prev + 1) % filteredItems.length)}
          onPrev={() => setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)}
        />
      )}

      {/* Footer - same as main page */}
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
