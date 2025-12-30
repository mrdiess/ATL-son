import Image from "next/image"

const steps = [
  {
    image: "/construction-site-survey-engineering-team.jpg",
    title: "Keşif & Analiz",
    description: "Arazi keşfi yaparak projenizin ihtiyaçlarını belirliyoruz.",
  },
  {
    image: "/architectural-blueprint-steel-structure-design.jpg",
    title: "Proje & Tasarım",
    description: "Mühendislik ekibimiz statik hesaplamalar ve 3D tasarım hazırlıyor.",
  },
  {
    image: "/steel-beam-fabrication-factory-welding.jpg",
    title: "Üretim",
    description: "Modern tesislerimizde çelik elemanları hassas toleranslarla üretiyoruz.",
  },
  {
    image: "/steel-structure-crane-assembly-construction.jpg",
    title: "Montaj & Teslim",
    description: "Deneyimli ekibimizle hızlı ve güvenli montaj gerçekleştiriyoruz.",
  },
]

export function ProcessSection() {
  return (
    <section id="surec" className="py-16 md:py-24 bg-foreground text-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Çalışma Sürecimiz</h2>
          <p className="text-background/70 max-w-2xl mx-auto">
            Projelerinizi dört aşamada anahtar teslim olarak hayata geçiriyoruz.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="group">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                <Image
                  src={step.image || "/placeholder.svg"}
                  alt={step.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-background/20 group-hover:bg-background/10 transition-colors" />
                <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-background/70 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
