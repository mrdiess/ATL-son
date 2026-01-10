import Image from "next/image"

export default function Home() {
  return (
    <main>
      {/* HEADER */}
      <header style={{ padding: 20, display: "flex", alignItems: "center", gap: 20 }}>
        <Image src="/logo.png" alt="ATL Çelik Yapı" width={140} height={50} />
        <nav style={{ display: "flex", gap: 16 }}>
          <a href="#">Ana Sayfa</a>
          <a href="#">Hizmetler</a>
          <a href="#">Projeler</a>
          <a href="#">İletişim</a>
        </nav>
      </header>

      {/* HERO */}
      <section style={{ position: "relative", height: "80vh" }}>
        <Image
          src="/hero/hero1.jpg"
          alt="Hero"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 60,
          }}
        >
          <h1 style={{ fontSize: 56 }}>Çelik Konstrüksiyon</h1>
          <p>Endüstriyel tesis ve depo çözümleri</p>
        </div>
      </section>
    </main>
  )
}
