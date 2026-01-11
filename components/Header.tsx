import Link from "next/link"

export function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 40px",
        borderBottom: "1px solid #eee",
      }}
    >
      <strong>ATL Çelik Yapı</strong>

      <nav style={{ display: "flex", gap: 20 }}>
        <Link href="/">Anasayfa</Link>
        <Link href="/galeri">Galeri</Link>
      </nav>
    </header>
  )
}
