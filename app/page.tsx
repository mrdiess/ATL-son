import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
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
              "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0.1) 100%)",
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
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              width: "100%",
              margin: "0 auto",
              paddingLeft: "64px",
              paddingRight: "64px",
            }}
          >
            <div style={{ maxWidth: "720px" }}>
              {/* Subtitle */}
              <div
                style={{
                  marginBottom: "20px",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "#38bdf8",
                  letterSpacing: "0.4px",
                }}
              >
                Endüstriyel tesis ve depo çözümleriniz için
              </div>

              {/* Title */}
              <h1
                style={{
                  marginBottom: "36px",
                  fontSize: "72px",
                  fontWeight: 800,
                  lineHeight: 1.05,
                  color: "#ffffff",
                }}
              >
                Çelik
                <br />
                Konstrüksiyon
              </h1>

              {/* Buttons */}
              <div style={{ display: "flex", gap: "20px" }}>
                <Link
                  href="/projeler"
                  style={{
                    padding: "16px 36px",
                    backgroundColor: "#0ea5e9",
                    color: "#ffffff",
                    borderRadius: "14px",
                    fontWeight: 600,
                    fontSize: "16px",
                    textDecoration: "none",
                  }}
                >
                  Keşfet →
                </Link>

                <Link
                  href="/iletisim"
                  style={{
                    padding: "16px 36px",
                    border: "1px solid rgba(255,255,255,0.6)",
                    color: "#ffffff",
                    borderRadius: "14px",
                    fontWeight: 600,
                    fontSize: "16px",
                    textDecoration: "none",
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                >
                  İletişime Geç
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Hint */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(255,255,255,0.6)",
            fontSize: "13px",
            letterSpacing: "1px",
          }}
        >
          KAYDIR
        </div>
      </section>
    </main>
  )
}
