export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section
        style={{
          height: "70vh",
          backgroundImage: "url(/images/hero/hero-1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* GALERİ */}
      <section style={{ padding: "40px" }}>
        <h2>Galeri</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          <img src="/images/gallery/01.jpg" />
          <img src="/images/gallery/02.jpg" />
          <img src="/images/gallery/03.jpg" />
        </div>
      </section>
    </main>
  );
}
