const services = [
  "Çatı ve Sundurma",
  "Çelik Yapı",
  "Gölgelik",
  "Kasa İmalatı",
  "Korkuluk Sistemleri",
  "Merdiven",
  "Soğuk Hava Deposu",
  "Tır & Kamyon Bakım",
]

export default function Services() {
  return (
    <section className="bg-[#06101f] py-32">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-3 text-center text-sky-400">HİZMETLERİMİZ</p>
        <h2 className="mb-16 text-center text-4xl font-bold">
          Çelik ve Metal İşleme Çözümleri
        </h2>

        <div className="grid gap-8 md:grid-cols-4">
          {services.map((s) => (
            <div
              key={s}
              className="rounded-2xl border border-white/10 bg-white/5 p-8"
            >
              <h3 className="font-semibold">{s}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
