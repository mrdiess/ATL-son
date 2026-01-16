"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="ATL Çelik Yapı"
              width={40}
              height={40}
              priority
            />
            <span className="font-bold">ATL Çelik Yapı</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-blue-400 transition">
              Anasayfa
            </Link>
            <Link href="/projeler" className="hover:text-blue-400 transition">
              Projeler
            </Link>
            <Link href="/iletisim" className="hover:text-blue-400 transition">
              İletişim
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Teklif Al
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
