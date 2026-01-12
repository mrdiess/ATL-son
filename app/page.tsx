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
        <Image
          src="/hero/hero-1.jpg"
          alt="Çelik Konstrüksiyon"
          fill
          priority
          style={{ objectFit: "cover" }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0.1) 100%)",
          }}
        />

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
              padding: "0 64px",
            }}
          >
            <div style={{ maxWidth: "720px" }}>
              <div
                style={{
                  marginBottom: "20px",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "#38bdf8",
                }}
              >
                Endüstriyel tesis ve depo çözümleriniz için
              </div>

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

              <div style={{ display: "flex", gap: "20px" }}>
                <Link
                  href="/projeler"
                  style={{
                    padding: "16px 36px",
                    backgroundColor: "#0ea5e9",
                    color: "#ffffff",
                    borderRadius: "14px",
                    fontWeight: 600,
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
      </section>

      {/* NE YAPIYORUZ */}
      <section
        style={{
          backgroundColor: "#ffffff",
          padding: "96px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
          }}
        >
          <div style={{ maxWidth: "720px", marginBottom: "64px" }}>
            <h2
              style={{
                fontSize: "40px",
                fontWeight: 700,
                marginBottom: "20px",
              }}
            >
              Anahtar Teslim Çelik Yapı Çözümleri
            </h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#475569" }}>
              ATL Çelik Yapı olarak endüstriyel tesisler, depolar, ferforje ve
              özel metal imalatlarında projelendirmeden montaja kadar tüm
              süreci tek çatı altında yürütüyoruz.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "32px",
            }}
          >
            {[
              {
                title: "Çelik Konstrüksiyon",
                desc: "Endüstriyel ve ticari yapılar için dayanıklı çelik çözümler",
              },
              {
                title: "Ferforje & Merdiven",
                desc: "Özel tasarım, estetik ve fonksiyonel metal imalatları",
              },
              {
                title: "Anahtar Teslim",
                desc: "Projelendirme, üretim ve montaj dahil uçtan uca hizmet",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  padding: "32px",
                  borderRadius: "20px",
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e5e7eb",
                }}
              >
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    marginBottom: "12px",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: "15px", color: "#475569" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
