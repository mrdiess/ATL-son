"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const slides = [
    {
      image: "/steel-construction-industrial-factory-building.jpg",
      title: "Endüstriyel Çelik Yapılarda Güvenilir Çözüm Ortağınız",
      subtitle:
        "Çelik konstrüksiyon, sandviç panel ve metal işleme alanlarında anahtar teslim projeler.",
    },
    {
      image: "/sandwich-panel-building-construction-modern.jpg",
      title: "Modern ve Dayanıklı Yapılar",
      subtitle:
        "Yüksek kalite malzeme ve mühendislik çözümleriyle uzun ömürlü yapılar.",
    },
    {
      image: "/industrial-steel-factory-workers-warehouse.jpg",
      title: "Anahtar Teslim Projeler",
      subtitle:
        "Tasarımdan montaja kadar tüm süreçlerde profesyonel hizmet.",
    },
  ]

  return (
    <section className="relative h-screen">
      {/* Background Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === i ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold max-w-2xl mb-6">
            {slides[currentSlide].title}
          </h1>
          <p className="max-w-xl text-slate-300 mb-8">
            {slides[currentSlide].subtitle}
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Projelerimizi İnceleyin
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-10 right-10 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === i ? "bg-blue-500" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
