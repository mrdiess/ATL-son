import Image from "next/image"
import Link from "next/link"

export default function Page() {
  return (
    <main className="bg-[#071829] text-white">
      {/* HERO */}
      <section className="relative h-screen w-full">
        <Image
          src="/hero/hero-1.jpg"
          alt="Sandviç Panel"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <p className="text-sky-400 mb-3">
              Profesyonel üretim ve montaj hizmetleri
            </p>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-8">
              Sandviç Panel
            </h1>

            <div className="flex gap-4">
              <Link
                href="/projeler"
                className="bg-sky-500 hover:bg-sky-600 transition px-7 py-4 rounded-xl font-semibold"
              >
                Keşfet →
              </Link>

              <Link
                href="/iletisim"
                className="border border-white/40 hover:bg-white/10 transition px-7 py-4 rounded-xl font-semibold"
              >
                İletişime Geç
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NEDEN ATL */}
      <section className="py-28 bg-gradient-to-b from-[#071829] to-[#04101d]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sky-400 text-sm mb-3">
            ATL ÇELİK METAL SAN. VE TİC. LTD. ŞTİ.
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-16">
            Neden ATL Çelik Metal?
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Gelişmiş Makina Parkuru",
                desc: "İleri teknoloji üretim altyapısı",
              },
              {
                title: "Yüksek Kalite",
                desc: "Başlangıçtan teslimata kalite kontrol",
              },
              {
                title: "Kaliteli Hammadde",
                desc: "Birinci sınıf malzemeler",
              },
              {
                title: "Tecrübeli Ekip",
                desc: "Alanında uzman mühendis kadro",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 text-left hover:bg-white/10 transition"
              >
                <h3 className="font-semibold text-lg mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-white/70">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HİZMETLER */}
      <section className="py-28 bg-[#071829]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sky-400 text-sm mb-3">
            HİZMETLERİMİZ
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-16">
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
              "Tır & Kamyon Bakım",
            ].map((title) => (
              <div
                key={title}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 text-left hover:bg-white/10 transition"
              >
                <h3 className="font-semibold text-lg mb-2">
                  {title}
                </h3>
                <p className="text-sm text-white/70">
                  Profesyonel üretim ve montaj çözümleri
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* İLETİŞİM */}
      <section className="py-28 bg-gradient-to-b from-[#071829] to-[#020b15]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-sky-400 text-sm mb-3">İLETİŞİM</p>
            <h2 className="text-4xl font-bold mb-6">
              Bize Ulaşın
            </h2>

            <p className="text-white/70 mb-10 max-w-md">
              Projeleriniz için profesyonel çelik yapı çözümleri sunuyoruz.
            </p>

            <ul className="space-y-4 text-white/80">
              <li>📞 +90 537 339 39 47</li>
              <li>✉️ info@atlcelikyapi.com</li>
              <li>📍 Düzce, Türkiye</li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-10">
            <h3 className="text-xl font-semibold mb-6">
              Teklif Formu
            </h3>

            <form className="space-y-4">
              <input className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3" placeholder="Adınız Soyadınız" />
              <input className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3" placeholder="E-posta Adresiniz" />
              <input className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3" placeholder="Telefon Numaranız" />
              <textarea className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3" placeholder="Mesajınız" />
              <button className="w-full bg-sky-500 hover:bg-sky-600 transition py-3 rounded-lg font-semibold">
                GÖNDER
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
