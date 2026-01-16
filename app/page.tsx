import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="bg-gradient-to-b from-[#071829] via-[#071829] to-[#020617]">

      {/* ================= HERO ================= */}
      <section className="relative h-screen">
        <Image
          src="/hero/hero-1.jpg"
          alt="ATL Çelik Yapı"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-sky-400 mb-4">
              Profesyonel üretim ve montaj hizmetleri
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Sandviç Panel
            </h1>

            <div className="flex gap-4">
              <Link
                href="#hizmetler"
                className="px-6 py-3 rounded-xl bg-sky-500 text-white font-medium hover:bg-sky-600 transition"
              >
                Keşfet →
              </Link>
              <Link
                href="/iletisim"
                className="px-6 py-3 rounded-xl border border-white/30 text-white hover:bg-white/10 transition"
              >
                İletişime Geç
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY ATL ================= */}
      <section className="py-32 bg-[#071829]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sky-400 mb-3">
            ATL ÇELİK METAL SAN. VE TİC. LTD. ŞTİ.
          </p>
          <h2 className="text-4xl font-bold text-white mb-16">
            Neden ATL Çelik Metal?
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Gelişmiş Makina Parkuru",
                desc: "İleri teknoloji makina altyapısı",
              },
              {
                title: "Yüksek Kalite",
                desc: "Başlangıçtan teslimata kalite kontrol",
              },
              {
                title: "Kaliteli Hammadde",
                desc: "Birinci sınıf malzeme kullanımı",
              },
              {
                title: "Tecrübeli Ekip",
                desc: "Alanında uzman mühendis kadro",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl bg-[#0b2238] p-8 border border-white/5"
              >
                <h3 className="text-white font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="hizmetler" className="py-32 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sky-400 mb-3">HİZMETLERİMİZ</p>
          <h2 className="text-4xl font-bold text-white mb-16">
            Çelik ve Metal İşleme Çözümleri
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              "Çatı ve Sundurma",
              "Çelik Yapı",
              "Gölgelik",
              "Kasa İmalatı",
              "Korkuluk Sistemleri",
              "Merdiven",
              "Soğuk Hava Deposu",
              "Tır & Kamyon Bakımı",
            ].map((service, i) => (
              <div
                key={i}
                className="rounded-2xl bg-[#071829] p-8 border border-white/5 hover:border-sky-500/40 transition"
              >
                <h3 className="text-white font-semibold">
                  {service}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="py-32 bg-[#071829]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-sky-400 mb-3">İLETİŞİM</p>
            <h2 className="text-4xl font-bold text-white mb-6">
              Bize Ulaşın
            </h2>
            <p className="text-slate-300 mb-8">
              Projeleriniz için profesyonel çelik yapı çözümleri sunuyoruz.
            </p>

            <ul className="space-y-4 text-slate-300">
              <li>📍 Küçük Sanayi Sitesi Merkez, Düzce</li>
              <li>📞 +90 537 339 39 47</li>
              <li>✉️ info@atlcelikyapi.com</li>
            </ul>
          </div>

          <form className="bg-[#0b2238] p-8 rounded-2xl border border-white/5">
            <h3 className="text-white font-semibold mb-6">
              Teklif Formu
            </h3>
            <div className="space-y-4">
              <input
                placeholder="Adınız Soyadınız"
                className="w-full px-4 py-3 rounded-lg bg-[#071829] text-white border border-white/10"
              />
              <input
                placeholder="E-posta"
                className="w-full px-4 py-3 rounded-lg bg-[#071829] text-white border border-white/10"
              />
              <textarea
                placeholder="Mesajınız"
                className="w-full px-4 py-3 rounded-lg bg-[#071829] text-white border border-white/10"
              />
              <button className="w-full py-3 rounded-xl bg-sky-500 text-white font-medium hover:bg-sky-600 transition">
                GÖNDER
              </button>
            </div>
          </form>
        </div>
      </section>

    </main>
  )
}
