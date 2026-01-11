"use client"

import Image from "next/image"
import Link from "next/link"

export function Header() {
  return (
    <header
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 50,
        padding: "20px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "white",
      }}
    >
      {/* LOGO */}
      <Link href="/">
        <Image src="/logo.png" alt="ATL Çelik Yapı" width={120} height={40} />
      </Link>

      {/* MENU */}
      <nav style={{ display: "flex", gap: 24 }}>
        <Link href="/">Ana Sayfa</Link>
        <Link href="/hizmetler">Hizmetler</Link>
        <Link href="/projeler">Projeler</Link>
        <Link href="/galeri">Galeri</Link>
        <Link href="/iletisim">İletişim</Link>
        <Link href="/galeri">Galeri</Link>

      </nav>

      {/* CTA */}
      <a
        href="tel:+905XXXXXXXXX"
        style={{
          background: "#0ea5e9",
          padding: "10px 16px",
          borderRadius: 8,
          fontWeight: 600,
        }}
      >
        Hemen Ara
      </a>
    </header>
  )
}
