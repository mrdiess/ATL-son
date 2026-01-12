"use client"

import { useState } from "react"
import Link from "next/link"

const slides = [
  {
    image: "/hero/hero-1.jpg",
    subtitle: "Yüksek hassasiyet ve teknoloji ile metal işleme",
    title: "Lazer Kesim",
  },
  {
    image: "/hero/hero-2.jpg",
    subtitle: "Estetik ve dayanıklılığı bir arada",
    title: "Ferforje Sistemler",
  },
  {
    image: "/hero/hero-3.jpg",
    subtitle: "Özel ölçü, güçlü mühendislik",
    title: "Merdiven & Özel İmalat",
  },
]

export default function HeroSlider() {
  const [index, setIndex] = useState(0)

  const prev = () =>
    setIndex((i) => (i === 0 ? slides.length - 1 : i - 1))

  const next = () =>
    setIndex((i) => (i === slides.length - 1 ? 0 : i + 1))

  const slide = slides[index]

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background */}
      <img
        src={slide.image}
        alt={slide.title}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container">
          <p className="text-sky-400 text-sm md:text-base mb-4">
            {slide.subtitle}
          </p>

          <h1 className="text-white text-4xl md:text-6xl font-bold max-w-3xl">
            {slide.title}
          </h1>

          <div className="mt-10 flex gap-4">
            <Link
              href="/projeler"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-500 text-white font-medium hover:bg-sky-600 transition"
            >
              Keşfet →
            </Link>

            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/40 text-white hover:bg-white/10 transition"
            >
              İletişime Geç
            </Link>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/40 text-white text-xl flex items-center justify-center hover:bg-black/70"
      >
        ‹
      </button>

      <button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/40 text-white text-xl flex items-center justify-center hover:bg-black/70"
      >
        ›
      </button>
    </section>
  )
}
