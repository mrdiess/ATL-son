import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      {/* ÜST FOOTER */}
      <div className="container py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* LOGO & HAKKINDA */}
        <div className="space-y-4">
          <img
            src="/logo.svg"
            alt="ATL Çelik Yapı"
            className="h-8 w-auto"
          />
          <p className="text-sm text-muted-foreground leading-relaxed">
            ATL Çelik Yapı; çelik konstrüksiyon, ferforje, merdiven ve özel metal
            imalatlarında mühendislik odaklı çözümler sunar.
          </p>
        </div>

        {/* KURUMSAL */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-foreground">
            Kurumsal
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-primary transition">
                Ana Sayfa
              </Link>
            </li>
            <li>
              <Link href="/hakkimizda" className="hover:text-primary transition">
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link href="/hizmetler" className="hover:text-primary transition">
                Hizmetler
              </Link>
            </li>
            <li>
              <Link href="/projeler" className="hover:text-primary transition">
                Projeler
              </Link>
            </li>
          </ul>
        </div>

        {/* İLETİŞİM */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-foreground">
            İletişim
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>📍 Düzce / Türkiye</li>
            <li>
              📞{" "}
              <a
                href="tel:+90XXXXXXXXXX"
                className="hover:text-primary transition"
              >
                +90 XXX XXX XX XX
              </a>
            </li>
            <li>
              ✉️{" "}
              <a
                href="mailto:info@atlcelikyapi.com"
                className="hover:text-primary transition"
              >
                info@atlcelikyapi.com
              </a>
            </li>
          </ul>
        </div>

        {/* HARİTA */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-foreground">
            Konum
          </h3>

          <div className="rounded-xl overflow-hidden border border-border">
            <iframe
              src="https://www.google.com/maps?q=Düzce%20Küçük%20Sanayi%20Sitesi&output=embed"
              width="100%"
              height="220"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <a
            href="https://maps.app.goo.gl/qSeSM8RMnX9Q7Frt5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-sm text-primary hover:underline"
          >
            Google Maps’te Aç →
          </a>
        </div>
      </div>

      {/* ALT BAR */}
      <div className="border-t border-border py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>
            © {new Date().getFullYear()} ATL Çelik Yapı. Tüm hakları saklıdır.
          </span>

          <a
            href="https://instagram.com/rootbaran"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition"
          >
            Designed & Developed by{" "}
            <span className="text-foreground">rootbaran</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
