import Image from "next/image"

const references = [
  {
    name: "Mercedes-Benz",
    logo: "/mercedes-benz-logo-simple.jpg",
  },
  {
    name: "Arçelik",
    logo: "/arcelik-logo-simple.jpg",
  },
  {
    name: "Vestel",
    logo: "/vestel-logo-simple.jpg",
  },
  {
    name: "THY",
    logo: "/turkish-airlines-logo-simple.jpg",
  },
  {
    name: "Ford Otosan",
    logo: "/ford-logo-simple.jpg",
  },
  {
    name: "Bosch",
    logo: "/bosch-logo-simple.jpg",
  },
  {
    name: "Siemens",
    logo: "/siemens-logo-simple.jpg",
  },
  {
    name: "Tofaş",
    logo: "/tofas-fiat-logo-simple.jpg",
  },
]

export function ReferencesSection() {
  return (
    <section id="referanslar" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Güvenilir İş Ortakları</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Referanslarımız</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Türkiye'nin önde gelen kuruluşlarıyla gerçekleştirdiğimiz projelerle güvenilirliğimizi kanıtladık.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {references.map((ref, index) => (
            <div
              key={index}
              className="bg-background rounded-xl p-6 flex items-center justify-center h-24 hover:shadow-lg transition-shadow border border-border"
            >
              <Image
                src={ref.logo || "/placeholder.svg"}
                alt={ref.name}
                width={120}
                height={60}
                className="opacity-60 hover:opacity-100 transition-opacity object-contain"
              />
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">500+</div>
            <div className="text-muted-foreground text-sm">Tamamlanan Proje</div>
          </div>
          <div className="p-4">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">25+</div>
            <div className="text-muted-foreground text-sm">Yıllık Deneyim</div>
          </div>
          <div className="p-4">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">150+</div>
            <div className="text-muted-foreground text-sm">Uzman Personel</div>
          </div>
          <div className="p-4">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">81</div>
            <div className="text-muted-foreground text-sm">İl Genelinde Hizmet</div>
          </div>
        </div>
      </div>
    </section>
  )
}
