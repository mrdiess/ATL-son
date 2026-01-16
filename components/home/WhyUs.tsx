const items = [
  {
    title: "Gelişmiş Makina Parkuru",
    desc: "Üretimlerimizi ileri teknoloji makine parkurumuzda yapıyoruz.",
  },
  {
    title: "Yüksek Kalite",
    desc: "Başlangıçtan teslimata kadar kalite kontrol.",
  },
  {
    title: "Kaliteli Hammadde",
    desc: "Birinci sınıf malzemeler kullanıyoruz.",
  },
  {
    title: "Tecrübeli Ekip",
    desc: "Alanında uzman mühendis ve teknik kadro.",
  },
]

export default function WhyUs() {
  return (
    <section className="bg-gradient-to-b from-[#0a1628] to-[#06101f] py-32">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-3 text-center text-sky-400">
          ATL ÇELİK METAL SAN. VE TİC. LTD. ŞTİ.
        </p>
        <h2 className="mb-16 text-center text-4xl font-bold">
          Neden ATL Çelik Metal?
        </h2>

        <div className="grid gap-8 md:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur"
            >
              <h3 className="mb-3 text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-white/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
