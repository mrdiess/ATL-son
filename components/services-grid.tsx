"use client"

import { Home, Building2, Sun, Shield, Fence, ArrowUpDown, Snowflake, Truck } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

const services = [
  {
    icon: Home,
    title: "Çatı ve Sundurma",
    description: "Dayanıklı ve estetik çatı sistemleri ile sundurma çözümleri",
  },
  {
    icon: Building2,
    title: "Çelik Yapı",
    description: "Endüstriyel ve ticari çelik yapı projeleri",
  },
  {
    icon: Sun,
    title: "Gölgelik",
    description: "Modern tasarımlı gölgelik ve tente sistemleri",
  },
  {
    icon: Shield,
    title: "Kasa İmalatı",
    description: "Güvenli ve dayanıklı kasa imalatı çözümleri",
  },
  {
    icon: Fence,
    title: "Korkuluk Sistemleri",
    description: "Dekoratif ve güvenli korkuluk sistemleri",
  },
  {
    icon: ArrowUpDown,
    title: "Merdiven",
    description: "İç ve dış mekan çelik merdiven imalatı",
  },
  {
    icon: Snowflake,
    title: "Soğuk Hava Deposu",
    description: "Soğuk hava deposu panel satışı ve montajı",
  },
  {
    icon: Truck,
    title: "Tır & Kamyon Bakım",
    description: "Tır ve kamyon kasa bakım ve onarım hizmetleri",
  },
]

export function ServicesGrid() {
  return (
    <section id="hizmetlerimiz" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="mb-4">
              <span className="text-primary text-sm font-bold tracking-widest uppercase">HİZMETLERİMİZ</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance">
              Çelik ve Metal İşleme Çözümleri
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <AnimatedSection key={index} animation="scale" delay={index * 0.1}>
                <div className="group bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-2xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-xl mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
