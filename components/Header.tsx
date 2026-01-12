"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
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

        {/* NAV */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {[
            { href: "/", label: "Ana Sayfa" },
            { href: "/hizmetler", label: "Hizmetler" },
            { href: "/projeler", label: "Projeler" },
            { href: "/hakkimizda", label: "Hakkımızda" },
            { href: "/iletisim", label: "İletişim" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white/90 hover:text-white transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="tel:+90XXXXXXXXXX"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 transition"
        >
          📞 Hemen Ara
        </a>

        {/* MOBILE MENU (placeholder) */}
        <button className="md:hidden text-white text-2xl">
          ☰
        </button>
      </div>
    </header>
  )
}
