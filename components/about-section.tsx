import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

const highlights = [
  "15 yıllık sektör tecrübesi",
  "500+ tamamlanmış proje",
  "Profesyonel uzman kadro",
  "İstanbul ve çevresinde hizmet",
]

export function AboutSection() {
  return (
    <section id="hakkimizda" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/professional-construction-team-renovation-site.jpg"
                alt="Eren İnşaat Ekibi"
                fill
                className="object-cover"
              />
            </div>
            {/* Stats overlay */}
            <div className="absolute -bottom-6 -right-6 bg-[#3b9ec9] text-white p-6 rounded-xl shadow-lg hidden md:block">
              <div className="text-4xl font-bold">15+</div>
              <div className="text-sm text-white/80">Yıllık Tecrübe</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-[#3b9ec9] font-medium mb-2 block">Hakkımızda</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e4a] mb-4">
              Güvenilir İnşaat ve Tadilat Çözümleri
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Eren İnşaat olarak 15 yılı aşkın tecrübemizle konut, işyeri ve ticari alanlarda sıva, alçı, boya,
              mantolama, yalıtım ve tüm tadilat işlerinizde profesyonel hizmet sunuyoruz.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Müşteri memnuniyetini ön planda tutarak, kaliteli malzeme ve uzman işçilikle projelerinizi zamanında ve
              bütçenize uygun şekilde tamamlıyoruz.
            </p>

            {/* Highlights */}
            <ul className="space-y-3 mb-8">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#3b9ec9]" />
                  <span className="text-[#1a2e4a]">{item}</span>
                </li>
              ))}
            </ul>

            <Button className="bg-[#1a2e4a] hover:bg-[#243a5a] text-white rounded px-8">Daha Fazla Bilgi</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
