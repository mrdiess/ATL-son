import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container py-20 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* LOGO & HAKKINDA */}
        <div className="space-y-4">
          <img
            src="/logo.svg"
            alt="ATL Çelik Yapı"
            className="h-8 w-auto"
          />
          <p className="text-sm text-white/70">
            ATL Çelik Yapı; çelik konstrüksiyon, ferforje, merdiven ve özel metal
            imalatlarında mühendislik odaklı çözümler sunar.
          </p>
        </div>

        {/* KURUMSAL */}
        <div>
          <h3 className="text-sm font-semibold mb-4">Kurumsal</h3>
          <ul className="space-y-3 text-sm text-white/70">
            <li>
              <Link href="/" className="hover:text-white transition">
                Ana Sayfa
              </Link>
            </li>
            <li>
              <Link href="/hakkimizda" className="hover:text-white transition">
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link href="/hizmetler" className="hover:text-white transition">
                Hizmetler
              </Link>
            </li>
            <li>
              <Link href="/projeler" className="hover:text-white transition">
                Projeler
              </Link>
            </li>
          </ul>
        </div>

        {/* HİZMETLER */}
        <div>
          <h3 className="text-sm font-semibold mb-4">Hizmetler</h3>
          <ul className="space-y-3 text-sm text-white/70">
            <li>Çelik Yapı</li>
            <li>Ferforje Sistemler</li>
            <li>Merdiven İmalatı</li>
            <li>Özel Metal İşleri</li>
          </ul>
        </div>

        {/* İLETİŞİM */}
        <div>
          <h3 className="text-sm font-semibold mb-4">İletişim</h3>
          <ul className="space-y-3 text-sm text-white/70">
            <li>📍 Türkiye</li>
            <li>
              📞{" "}
              <a
                href="tel:+90XXXXXXXXXX"
                className="hover:text-white transition"
              >
                +90 537 339 3947
              </a>
            </li>
            <li>
              ✉️{" "}
              <a
                href="mailto:info@atlcelikyapi.com"
                className="hover:text-white transition"
              >
                info@atlcelikyapi.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ALT BAR */}
      <div className="border-t border-white/10 py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <span>
            © {new Date().getFullYear()} ATL Çelik Yapı. Tüm hakları saklıdır.
          </span>

          <a
            href="https://instagram.com/rootbaran"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            Designed & Developed by <span className="text-white">rootbaran</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
