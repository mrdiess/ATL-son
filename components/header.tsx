"use client"

import Link from "next/link"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="ATL Çelik Yapı" className="h-8" />
        </Link>

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-white">
          <a href="#anasayfa" className="hover:text-blue-400">Ana Sayfa</a>
          <a href="#hizmetler" className="hover:text-blue-400">Hizmetler</a>
          <a href="#projeler" className="hover:text-blue-400">Projeler</a>
          <a href="#hakkimizda" className="hover:text-blue-400">Hakkımızda</a>
          <a href="#galeri" className="hover:text-blue-400">Galeri</a>
          <a href="#iletisim" className="hover:text-blue-400">İletişim</a>
        </nav>

        {/* Call */}
        <a
          href="tel:+90XXXXXXXXXX"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Ara
        </a>
      </div>
    </header>
  )
}
