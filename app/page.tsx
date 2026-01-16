export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="h-[90vh] flex items-center justify-center text-center">
        <div>
          <p className="text-sky-400 mb-4">
            Profesyonel üretim ve montaj hizmetleri
          </p>
          <h1 className="text-5xl font-bold mb-6">Çelik Yapı Çözümleri</h1>
          <div className="flex justify-center gap-4">
            <button className="bg-sky-500 px-6 py-3 rounded-md">
              Keşfet
            </button>
            <button className="border border-white/20 px-6 py-3 rounded-md">
              İletişime Geç
            </button>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-24 bg-[#061423]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Neden ATL Çelik Metal?
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              ["Gelişmiş Makina", "İleri teknoloji üretim altyapısı"],
              ["Yüksek Kalite", "Başlangıçtan teslimata kalite kontrol"],
              ["Kaliteli Hammadde", "Birinci sınıf malzeme kullanımı"],
              ["Tecrübeli Ekip", "Alanında uzman mühendis kadro"],
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#071829] border border-white/10 rounded-xl p-8 text-center"
              >
                <h3 className="font-semibold mb-3">{item[0]}</h3>
                <p className="text-sm text-white/60">{item[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
