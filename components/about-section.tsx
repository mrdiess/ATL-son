import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function AboutSection() {
  return (
    <section className="relative w-full py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hakkimizda-bg.jpg"
          alt="ATL Çelik Yapı"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left spacer */}
          <div />

          {/* Text */}
          <div className="text-white">
            <span className="text-blue-400 font-semibold uppercase tracking-wider text-sm">
              Hakkımızda
            </span>

            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6 leading-tight">
              Çelik Sektöründe <br /> Güvenilir Çözüm Ortağı
            </h2>

            <p className="text-white/85 leading-relaxed mb-6">
              Düzce merkezli olmakla birlikte 81 ilde profesyonel hizmet vermekteyiz.
              Sandviç Panel, Sac Kesme–Bükme, Demir Çelik Profil, Soğuk Hava Deposu
              ve her türlü kaynaklı yapılar konusunda uzman ekibimizle yanınızdayız.
            </p>

            <ul className="grid grid-cols-2 gap-3 mb-8 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full" />
                ISO 9001 Belgeli
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full" />
                CE Sertifikalı
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full" />
                Zamanında Teslimat
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full" />
                Garantili İşçilik
              </li>
            </ul>

            <Button className="bg-blue-500 hover:bg-blue-600">
              Daha Fazla Bilgi
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
