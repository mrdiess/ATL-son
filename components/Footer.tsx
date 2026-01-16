export default function Footer() {
  return (
    <footer className="bg-[#061423] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-8 text-sm text-white/70">
        <div>
          <h4 className="text-white font-semibold mb-4">ATL Çelik Yapı</h4>
          <p>
            Çelik konstrüksiyon, metal işleme ve anahtar teslim projelerde
            mühendislik odaklı çözümler sunar.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Hizmetler</h4>
          <ul className="space-y-2">
            <li>Çelik Yapı</li>
            <li>Merdiven</li>
            <li>Korkuluk</li>
            <li>Metal İşleme</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Kurumsal</h4>
          <ul className="space-y-2">
            <li>Hakkımızda</li>
            <li>Projeler</li>
            <li>İletişim</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">İletişim</h4>
          <ul className="space-y-2">
            <li>Düzce / Türkiye</li>
            <li>+90 537 339 39 47</li>
            <li>info@atlcelikyapi.com</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-white/40 py-6 border-t border-white/10">
        © 2026 ATL Çelik Yapı. Tüm hakları saklıdır.
      </div>
    </footer>
  )
}
