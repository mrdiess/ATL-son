"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    title: "Lazer Kesim",
    subtitle: "Yüksek hassasiyet ve teknoloji ile metal işleme",
    image: "/laser-cutting-machine-industrial-metal-processing.jpg",
  },
  {
    id: 2,
    title: "Sandviç Panel",
    subtitle: "Profesyonel üretim ve montaj hizmetleri",
    image: "/sandwich-panel-production-manufacturing-line.jpg",
  },
  {
    id: 3,
    title: "Çelik Konstrüksiyon",
    subtitle: "Endüstriyel tesis ve depo çözümleriniz için",
    image: "/steel-construction-industrial.jpg",
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 z-10" />
          <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
              <div className="max-w-3xl">
                <p className="text-primary text-base md:text-lg font-semibold mb-6 tracking-wide">{slide.subtitle}</p>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-10 leading-tight text-balance">
                  {slide.title}
                </h1>
                <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white rounded-lg px-10 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    Keşfet
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-foreground rounded-lg px-10 py-6 text-lg font-semibold transition-all duration-300"
                  >
                    İletişime Geç
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white transition-colors rounded"
        aria-label="Önceki slayt"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white transition-colors rounded"
        aria-label="Sonraki slayt"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-primary w-12" : "bg-white/50 w-2"
            }`}
            aria-label={`Slayt ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
