import Image from "next/image"

const services = [
  {
    image: "/plastering-wall-smooth-finish-construction.jpg",
    category: "Yüzeylerin Kusursuz Başlangıcı",
    title: "Sıva ve Alçı Uygulamaları",
    description:
      "Yapılarınızın iç ve dış yüzeylerini pürüzsüz ve dayanıklı bir zemine kavuşturur, sonraki işlemler için ideal taban hazırlar.",
  },
  {
    image: "/drywall-partition-modern-office-interior.jpg",
    category: "Esnek Alanlar, Akılcı Çözümler",
    title: "Alçıpan Uygulamaları",
    description:
      "Hızlı, temiz ve modern bölmeler, tavanlar ve dekoratif nişler oluşturarak mekanlarınızı işlevsel ve estetik bir şekilde yeniden düzenleyin.",
  },
  {
    image: "/interior-painting-colorful-wall-decorator.jpg",
    category: "Mekanınızın Karakterini Yansıtın",
    title: "Boya ve Dekoratif Uygulamalar",
    description:
      "Geniş renk ve doku seçenekleriyle iç ve dış mekanlarınıza hayat verir, kişisel zevkinize uygun kalıcı güzellikler yaratırız.",
  },
  {
    image: "/epoxy-floor-coating-industrial-warehouse.jpg",
    category: "Ayakların Altındaki Güven ve Stil",
    title: "Zemin Kaplama Sistemleri",
    description:
      "Estetik, dayanıklı ve uzun ömürlü malzemelerle yaşam ve çalışma alanlarınızın zeminlerini, ihtiyacınıza en uygun sistemlerle kaplarız.",
  },
  {
    image: "/exterior-building-facade-insulation-construction.jpg",
    category: "Binalarınız İçin Zırh ve Estetik",
    title: "Dış Cephe Mantolama ve Boya",
    description:
      "Binanızın dış cephesini enerji verimliliğini artıran mantolama sistemleriyle korur, modern ve çarpıcı boya çözümleriyle tamamlarız.",
  },
  {
    image: "/thermal-insulation-soundproofing-wall-construction.jpg",
    category: "Konforunuzun Teminatı",
    title: "Isı, Ses ve Su Yalıtımı",
    description:
      "Yapılarınızı nem, gürültü ve enerji kaybına karşı koruma altına alarak daha sağlıklı, sessiz ve düşük maliyetli yaşam alanları sunarız.",
  },
  {
    image: "/metal-welding-steel-construction-industrial.jpg",
    category: "Sağlam Bağlantılar, Kalıcı Güven",
    title: "Kaynak Uygulamaları",
    description:
      "Metal yapıların birleştirilmesi, onarılması ve güçlendirilmesi için profesyonel ve güvenilir kaynak çözümleriyle yapısal bütünlüğü sağlarız.",
  },
  {
    image: "/tile-ceramic-flooring-bathroom-installation.jpg",
    category: "Temelden Detaya Kaliteli İşçilik",
    title: "Şap, Fayans & Seramik Uygulamaları",
    description:
      "Zeminlerde düzgünlük sağlayan şap işlemleri ve ıslak hacimler için yüksek dayanıklılığa sahip fayans/seramik döşeme hizmetleri sunarız.",
  },
]

export function ServicesSection() {
  return (
    <section id="hizmetler" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e4a] mb-4">Hizmetlerimiz</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            15 yılı aşkın geçmişiyle verimli daha güvenilir yıllarca birlikte olma düşüncesiyle gelişmelere açık ve
            örnek bir kuruluş olma amacındadır.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg h-[380px] cursor-pointer">
              <Image
                src={service.image || "/placeholder.svg"}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e4a] via-[#1a2e4a]/70 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <span className="text-xs text-[#3b9ec9] mb-2">{service.category}</span>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
