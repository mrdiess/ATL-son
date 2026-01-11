"use client"

import Link from "next/link"

export function Header() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 50,
        background: "rgba(0,0,0,0.7)",
        color: "white",
        padding: "16px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <strong>ATL Çelik Yapı</strong>

      <nav style={{ display: "flex", gap: 24 }}>
        <Link href="/">Anasayfa</Link>
        <Link href="/galeri">Galeri</Link>
      </nav>
    </header>
  )
}
