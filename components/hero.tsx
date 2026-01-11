import Image from "next/image"

export function Hero() {
  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* BACKGROUND */}
      <Image
        src="/hero/hero1.jpg"
        alt="ATL Çelik Yapı"
        fill
        priority
        style={{ objectFit: "cover" }}
      />

      {/* OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.3))",
        }}
      />

      {/* CONTENT */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: 80,
          maxWidth: 700,
          color: "white",
        }}
      >
        <span style={{ color: "#38bdf8", marginBottom: 12 }}>
          Yüksek hassasiyet ve teknoloji
        </span>

        <h1 style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1 }}>
          Çelik Yapı
          <br />
          Çözümleri
        </h1>

        <p style={{ marginTop: 20, fontSize: 18, opacity: 0.9 }}>
          Endüstriyel yapılar, depo sistemleri ve anahtar teslim projeler.
        </p>

        <div style={{ marginTop: 32, display: "flex", gap: 16 }}>
          <a
            href="/projeler"
            style={{
              background: "#0ea5e9",
              padding: "14px 24px",
              borderRadius: 8,
              fontWeight: 600,
            }}
          >
            Keşfet →
          </a>

          <a
            href="/iletisim"
            style={{
              border: "1px solid white",
              padding: "14px 24px",
              borderRadius: 8,
              fontWeight: 600,
            }}
          >
            İletişime Geç
          </a>
        </div>
      </div>
    </section>
  )
}
