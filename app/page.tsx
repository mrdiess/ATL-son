export default function Page() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a1628",
        color: "#ffffff",
        textAlign: "center",
        padding: "40px",
      }}
    >
      <div style={{ maxWidth: "520px" }}>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 700,
            marginBottom: "16px",
          }}
        >
          Bakım Çalışması
        </h1>

        <p
          style={{
            fontSize: "16px",
            lineHeight: 1.6,
            opacity: 0.85,
            marginBottom: "24px",
          }}
        >
          ATL Çelik Yapı web sitesi şu anda bakım çalışması nedeniyle
          geçici olarak yayında değildir.
          <br />
          <br />
          Kısa süre içerisinde daha güçlü bir altyapı ve yenilenmiş
          tasarımla tekrar yayında olacağız.
        </p>

        <span style={{ fontSize: "14px", opacity: 0.6 }}>
          © {new Date().getFullYear()} ATL Çelik Yapı
        </span>
      </div>
    </main>
  )
}
