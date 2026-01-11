import Image from "next/image"
import Link from "next/link"
import { BeforeAfterGrid } from "@/components/BeforeAfterGrid"

const projects = [
  {
    id: "1",
    title: "Fabrika İnşaatı",
    before: "/projects/proje1/before.jpg",
    after: "/projects/proje1/after.jpg",
  },
]

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section style={{ position: "relative", height: "80vh" }}>
        <Image
          src="/hero/hero1.jpg"
          alt="ATL Çelik Yapı"
          fill
          priority
          style={{ objectFit: "cover" }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 60px",
          }}
        >
          <h1 style={{ fontSize: 56, maxWidth: 700 }}>
            Çelik Yapıda Güvenilir Çözümler
          </h1>
          <p style={{ fontSize: 20, marginTop: 16 }}>
            Endüstriyel tesis, depo ve fabrika projeleri
          </p>

          <Link
            href="/galeri"
            style={{
              marginTop: 30,
              width: "fit-content",
              padding: "14px 28px",
              background: "#fff",
              color: "#000",
              fontWeight: 600,
            }}
          >
            Projelerimizi Gör
          </Link>
        </div>
      </section>

      {/* HAKKIMIZDA */}
      <section style={{ padding: "80px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ fontSize: 36, marginBottom: 20 }}>
          ATL Çelik Yapı
        </h2>
        <p style={{ fontSize: 18, lineHeight: 1.6 }}>
          Anahtar teslim çelik yapı projelerinde; tasarım, üretim ve montaj
          süreçlerini tek çatı altında sunuyoruz. Dayanıklı, hızlı ve ekonomik
          çözümlerle projelerinizi hayata geçiriyoruz.
        </p>
      </section>

      {/* BEFORE / AFTER */}
      <BeforeAfterGrid projects={projects} />

      {/* CTA */}
      <section
        style={{
          padding: "80px 40px",
          background: "#111",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: 32, marginBottom: 20 }}>
          Projenizi Birlikte Hayata Geçirelim
        </h2>

        <Link
          href="/galeri"
          style={{
            display: "inline-block",
            marginTop: 20,
            padding: "14px 32px",
            background: "#fff",
            color: "#000",
            fontWeight: 600,
          }}
        >
          Galeriye Git
        </Link>
      </section>
    </main>
  )
}
