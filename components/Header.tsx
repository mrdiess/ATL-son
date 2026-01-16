"use client"

import Link from "next/link"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#071829]/90 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          ATL Çelik Yapı
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
          <Link href="/">Ana Sayfa</Link>
          <Link href="/hizmetler">Hizmetler</Link>
          <Link href="/projeler">Projeler</Link>
          <Link href="/hakkimizda">Hakkımızda</Link>
          <Link href="/iletisim">İletişim</Link>
        </nav>

        <a
          href="tel:+905373393947"
          className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Hemen Ara
        </a>
      </div>
    </header>
  )
}
