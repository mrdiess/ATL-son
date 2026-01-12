"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="container h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.svg"
            alt="ATL Çelik Yapı"
            className="h-8 w-auto"
          />
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/" className="text-white/90 hover:text-white transition">
            Ana Sayfa
          </Link>
          <Link
            href="/hizmetler"
            className="text-white/90 hover:text-white transition"
          >
            Hizmetler
          </Link>
          <Link
            href="/projeler"
            className="text-white/90 hover:text-white transition"
          >
            Projeler
          </Link>
          <Link
            href="/hakkimizda"
            className="text-white/90 hover:text-white transition"
          >
            Hakkımızda
          </Link>
          <Link
            href="/iletisim"
            className="text-white/90 hover:text-white transition"
          >
            İletişim
          </Link>
        </nav>

        {/* CTA */}
        <a
          href="tel:+905388789073"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 transition"
        >
          Hemen Ara
        </a>

        {/* MOBILE MENU ICON (şimdilik pasif) */}
        <button className="md:hidden text-white text-2xl">
          ☰
        </button>
      </div>
    </header>
  )
}
