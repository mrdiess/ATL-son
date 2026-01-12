export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0a1628", color: "#e5e7eb" }}>
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "80px 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "56px",
        }}
      >
        <div>
          <h3 style={{ fontSize: "20px", color: "#fff", marginBottom: "16px" }}>
            ATL Çelik Yapı
          </h3>
          <p style={{ fontSize: "14px", lineHeight: 1.7, opacity: 0.85 }}>
            Çelik konstrüksiyon, ferforje, merdiven ve özel metal imalatlarında
            mühendislik odaklı çözümler sunar.
          </p>
        </div>

        <div>
          <h4 style={{ color: "#fff", marginBottom: "16px" }}>Kurumsal</h4>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "14px" }}>
            {["Ana Sayfa", "Hakkımızda", "Hizmetler", "Projeler"].map(
              (item) => (
                <li key={item} style={{ marginBottom: "10px", opacity: 0.85 }}>
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h4 style={{ color: "#fff", marginBottom: "16px" }}>İletişim</h4>
          <p style={{ fontSize: "14px", marginBottom: "10px" }}>
            📍 Düzce / Türkiye
          </p>
          <p style={{ fontSize: "14px", marginBottom: "10px" }}>
            📞 +90 XXX XXX XX XX
          </p>
          <p style={{ fontSize: "14px" }}>✉️ info@atlcelikyapi.com</p>
        </div>
      </div>

      <div
        style={{
          height: "300px",
          borderTop: "1px solid #1e293b",
        }}
      >
        <iframe
          src="https://www.google.com/maps?q=Düzce%20Küçük%20Sanayi&output=embed"
          width="100%"
          height="100%"
          loading="lazy"
          style={{ border: 0 }}
        />
      </div>

      <div
        style={{
          backgroundColor: "#020617",
          textAlign: "center",
          padding: "16px",
          fontSize: "13px",
          color: "#94a3b8",
        }}
      >
        © {new Date().getFullYear()} ATL Çelik Yapı. Tüm hakları saklıdır.
      </div>
    </footer>
  )
}
