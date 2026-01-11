import Image from "next/image"

export function Hero() {
  return (
    <section style={{ position: "relative", height: "70vh" }}>
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
          background: "rgba(0,0,0,.55)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          paddingLeft: 48,
        }}
      >
        <div>
          <h1 style={{ fontSize: 48 }}>Çelik Yapı Çözümleri</h1>
          <p>Endüstriyel • Ticari • Anahtar Teslim</p>
        </div>
      </div>
    </section>
  )
}
