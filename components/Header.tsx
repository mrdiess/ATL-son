"use client"

import Link from "next/link"
import Image from "next/image"

export function Header() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 50,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "14px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LOGO */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="ATL Çelik Yapı"
            width={160}
            height={50}
            priority
          />
        </Link>

        {/* MENU */}
        <nav
          style={{
            display: "flex",
            gap: 28,
            color: "white",
            fontSize: 15,
            fontWeight: 500,
          }}
        >
          <Link href="/">Ana Sayfa</Link>
          <Link href="/projeler">Projeler</Link>
          <Link href="/galeri">Galeri</Link>
          <Link href="/iletisim">İletişim</Link>
        </nav>
      </div>
    </header>
  )
}
