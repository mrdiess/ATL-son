import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="bg-[#071829] text-white">

      {/* ================= HERO ================= */}
      <section className="relative h-[85vh] flex items-center">
        <Image
          src="/hero/hero-1.jpg"
          alt="ATL Çelik Yapı"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <p className="text-sky-400 mb-4">
            Profesyonel üretim ve montaj hizmetleri
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            Çelik Konstrüksiyon
          </h1>

          <div className="flex gap-4">
            <Link
              href="#"
              className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl transition"
            >
              Keşfet →
            </Link>
            <Link
              href="#iletisim"
              className="border border-white/20 hover:border-white/40 px-6 py-3 rounded-xl transition"
            >
              İletişime Geç
            </Link>
          </div>
        </div>
      </section>

      {/* ================= WHY ATL ================= */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <p className="text-sky-400 mb-3">
            ATL ÇELİK METAL SAN. VE TİC. LTD. ŞTİ.
          </p>
          <h2 className="text-4xl font-bold">
            Neden ATL Çelik Metal?
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            ["Gelişmiş Makina Parkuru", "İleri teknoloji üretim altyapısı"],
            ["Yüksek Kalite", "Başlangıçtan teslimata kalite kontrol"],
            ["Kaliteli Hammadde", "Birinci sınıf malzeme kullanımı"],
            ["Tecrübeli Ekip", "Alanında uzman mühendis kadro"],
          ].map(([title, desc], i) => (
            <div
              key={i}
              className="bg-[#0b2238] border border-white/10 rounded-2xl p-8 hover:border-sky-500/50 transition"
            >
              <h3 className="font-semibold mb-3">{title}</h3>
              <p className="text-slate-300 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 text-center mb-20">
          <p className="text-sky-400 tracking-widest text-sm mb-3">
            HİZMETLERİMİZ
          </p>
          <h2 className="text-4xl font-bold">
            Çelik ve Metal İşleme Çözümleri
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            "Çatı ve Sundurma",
            "Çelik Yapı",
            "Gölgelik",
            "Kasa İmalatı",
            "Korkuluk Sistemleri",
            "Merdiven",
            "Soğuk Hava Deposu",
            "Tır & Kamyon Bakım",
          ].map((title, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-[#0b2238] to-[#071829] border border-white/10 rounded-2xl p-8 hover:border-sky-500/50 hover:-translate-y-1 transition-all"
            >
              <h3 className="font-semibold mb-3">{title}</h3>
              <p className="text-slate-300 text-sm">
                Profesyonel ve dayanıklı çözümler
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="iletisim" className="py-32">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-sky-400 mb-3">İLETİŞİM</p>
            <h2 className="text-4xl font-bold mb-6">
              Bize Ulaşın
            </h2>
            <p className="text-slate-300 mb-8">
              Projeleriniz için profesyonel çözümler sunuyoruz.
            </p>

            <ul className="space-y-4 text-slate-300">
              <li>📍 Küçük Sanayi Sitesi Merkez, Düzce</li>
              <li>📞 +90 537 339 39 47</li>
              <li>✉️ info@atlcelikyapi.com</li>
            </ul>
          </div>

          <form className="bg-[#0b2238] border border-white/10 rounded-2xl p-8 space-y-4">
            <input
              className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3"
              placeholder="Adınız Soyadınız"
            />
            <input
              className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3"
              placeholder="E-posta Adresiniz"
            />
            <textarea
              className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3"
              rows={4}
              placeholder="Mesajınız"
            />
            <button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 py-3 rounded-xl font-semibold"
            >
              GÖNDER
            </button>
          </form>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-10 text-center text-slate-400 text-sm">
        © 2026 ATL Çelik Yapı. Tüm hakları saklıdır.
      </footer>

    </main>
  )
}
