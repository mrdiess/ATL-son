import { Building2, Shield, Clock, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Building2,
    title: "Çelik Konstrüksiyon",
    description:
      "Endüstriyel tesisler, fabrikalar ve depolar için dayanıklı çelik konstrüksiyon sistemleri üretiyoruz.",
  },
  {
    icon: Shield,
    title: "Güvenli & Dayanıklı",
    description: "TSE ve CE sertifikalı malzemeler ile depreme dayanıklı, uzun ömürlü yapılar inşa ediyoruz.",
  },
  {
    icon: Clock,
    title: "Hızlı Montaj",
    description: "Prefabrik üretim avantajı ile geleneksel yapılara göre %50 daha hızlı teslim süresi.",
  },
  {
    icon: Award,
    title: "25 Yıllık Tecrübe",
    description: "500+ başarılı proje ve memnun müşteri portföyümüzle sektörün güvenilir markasıyız.",
  },
]

export function FeaturesSection() {
  return (
    <section id="hizmetler" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border border-border hover:border-primary/50 transition-colors group">
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-lg border border-border flex items-center justify-center mb-4 group-hover:border-primary/50 transition-colors">
                  <feature.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
