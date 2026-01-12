const items = [
  {
    title: "Gelişmiş Makina Parkuru",
    desc: "Üretimlerimizi ileri teknoloji makina parkurumuzda yapıyoruz.",
    icon: "⚙️",
  },
  {
    title: "Yüksek Kalite",
    desc: "Tüm üretimlerimizi baştan sona hassasiyetle kontrol ediyoruz.",
    icon: "🏅",
  },
  {
    title: "Kaliteli Hammadde",
    desc: "Birinci kalite malzemelerle hızlı ve yaratıcı çözümler sunuyoruz.",
    icon: "📦",
  },
  {
    title: "Tecrübeli Ekip",
    desc: "Mühendis ve teknik ekibimiz alanında uzmandır.",
    icon: "👥",
  },
]

export default function WhyATL() {
  return (
    <section className="bg-atl-bg py-32">
      <div className="container text-center mb-20">
        <p className="text-atl-primary text-sm mb-4 tracking-widest">
          ATL ÇELİK METAL SAN. VE TİC. LTD. ŞTİ.
        </p>

        <h2 className="text-4xl font-bold text-atl-text">
          Neden ATL Çelik Metal?
        </h2>
      </div>

      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item) => (
          <div
            key={item.title}
            className="bg-atl-bgSoft border border-atl-border rounded-2xl p-8 text-center hover:translate-y-[-6px] transition"
          >
            <div className="text-4xl mb-6">{item.icon}</div>
            <h3 className="text-lg font-semibold text-atl-text mb-3">
              {item.title}
            </h3>
            <p className="text-sm text-atl-muted">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
