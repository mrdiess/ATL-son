import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <main>
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "90vh",
          overflow: "hidden",
        }}
      >
        {/* Background Image */}
        <Image
          src="/hero/hero-1.jpg"
          alt="Çelik Konstrüksiyon"
          fill
          priority
          style={{ objectFit: "cover" }}
        />

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.5), rgba(0,0,0,0.2))",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            alignItems: "center",
            paddingLeft: "64px",
            paddingRight: "64px",
            color: "#ffffff",
            maxWidth: "1200px",
          }}
        >
          <div>
            <div
              style={{
                marginBottom: "16px",
                fontSize: "14px",
                color: "#38bdf8",
                fontWeight: 500,
              }}
            >
              Endüstriyel tesis ve depo çözümleriniz için
            </div>

            <h1
              style={{
                fontSize: "64px",
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: "32px",
              }}
            >
              Çelik <br /> Konstrüksiyon
            </h1>

            <div style={{ display: "flex", gap: "16px" }}>
              <Link
                href="/projeler"
                style={{
                  padding: "14px 32px",
                  backgroundColor: "#0ea5e9",
                  color: "#ffffff",
                  borderRadius: "12px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Keşfet →
              </Link>

              <Link
                href="/iletisim"
                style={{
                  padding: "14px 32px",
                  border: "1px solid rgba(255,255,255,0.5)",
                  color: "#ffffff",
                  borderRadius: "12px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                İletişime Geç
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
