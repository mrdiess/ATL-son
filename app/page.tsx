import Image from "next/image"
import Link from "next/link"

export default function Page() {
  return (
    <main style={{ width: "100%", overflowX: "hidden" }}>
      {/* HERO */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          width: "100%",
        }}
      >
        <Image
          src="/hero/hero-1.jpg"
          alt="ATL Çelik Yapı"
          fill
          priority
          style={{ objectFit: "cover" }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0.25) 75%, rgba(0,0,0,0.1) 100%)",
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
              margin: "0 auto",
              padding: "0 32px",
            }}
          >
            <div style={{ maxWidth: "640px", color: "#fff" }}>
                <p style={{ color: "#38bdf8", marginBottom: "12px" }}>
                  Endüstriyel tesis ve depo çözümleriniz için
                </p>

                <h1
                  style={{
                    fontSize: "64px",
                    fontWeight: 800,
                    lineHeight: 1.05,
                    marginBottom: "28px",
                  }}
                >
                  Çelik <br /> Konstrüksiyon
                </h1>

                <div style={{ display: "flex", gap: "16px" }}>
                  <Link
                    href="/projeler"
                    style={{
                      padding: "16px 32px",
                      backgroundColor: "#0ea5e9",
                      color: "#fff",
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
                      padding: "16px 32px",
                      border: "1px solid rgba(255,255,255,0.6)",
                      color: "#fff",
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

      {/* HİZMETLER */}
      <section style={{ backgroundColor: "#ffffff", padding: "96px 32px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "40px",
              fontWeight: 700,
              marginBottom: "20px",
            }}
          >
            Anahtar Teslim Çelik Yapı Çözümleri
          </h2>

          <p
            style={{
              maxWidth: "720px",
              fontSize: "16px",
              lineHeight: 1.7,
              color: "#475569",
              marginBottom: "64px",
            }}
          >
            Projelendirmeden üretime, montajdan teslimata kadar tüm süreci
            mühendislik disipliniyle tek çatı altında yönetiyoruz.
          </p>

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
                desc: "Endüstriyel ve ticari yapılar için uzun ömürlü çözümler",
              },
              {
                title: "Anahtar Teslim",
                desc: "Projelendirme, üretim ve montaj dahil uçtan uca hizmet",
              },
              {
                title: "Metal İşleme",
                desc: "Kesim, büküm, kaynak ve özel metal imalatları",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  padding: "32px",
                  borderRadius: "20px",
                  border: "1px solid #e5e7eb",
                  backgroundColor: "#f8fafc",
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
                <p style={{ color: "#475569", lineHeight: 1.6 }}>
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
