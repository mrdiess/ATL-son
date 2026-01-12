import Link from "next/link"

export default function CompanyProfile() {
  return (
    <section className="bg-atl-bg py-28">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* IMAGE */}
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src="/hero/hero-1.jpg"
            alt="ATL Çelik Metal"
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-6 left-6 bg-atl-bgSoft px-6 py-4 rounded-xl">
            <div className="text-3xl font-bold text-atl-primary">12+</div>
            <div className="text-sm text-atl-muted">Yıllık Tecrübe</div>
          </div>
        </div>

        {/* CONTENT */}
        <div>
          <p className="text-atl-primary text-sm mb-4 tracking-widest">
            ŞİRKET PROFİLİ
          </p>

          <h2 className="text-4xl font-bold text-atl-text mb-6">
            Çelik Sektöründe <br /> Yüksek Standart
          </h2>

          <p className="text-atl-muted leading-relaxed mb-6">
            Düzce Küçük Sanayi Sitesi’nde; sandviç panel satış ve montajı,
            sac kesme ve bükme, demir çelik sac ve profil çeşitleri,
            soğuk hava deposu panel satış ve montajı ve her türlü
            kayıklı-kayıksız yapılar konusunda uzman teknik personel
            ve kaliteli ekipman ile hizmet vermekteyiz.
          </p>

          <p className="text-atl-muted leading-relaxed mb-8">
            Firmamız; sektörün ihtiyaçlarına ve kalite beklentilerine
            uyumlu düzenleme ve değişikliklerle faaliyetlerine
            artan bir hacimle devam etmektedir.
          </p>

          <Link
            href="/hakkimizda"
            className="inline-block px-8 py-3 rounded-lg bg-atl-primary text-black font-medium hover:opacity-90 transition"
          >
            Daha Fazla Bilgi
          </Link>
        </div>
      </div>
    </section>
  )
}
