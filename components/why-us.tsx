"use client"

import { Settings, Award, Package, Users } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

const features = [
  {
    icon: Settings,
    title: "Gelişmiş Makina Parkuru",
    description: "Üretimlerimizi ileri teknoloji makine parkurumuzda yapıyoruz.",
  },
  {
    icon: Award,
    title: "Yüksek Kalite",
    description: "Tüm üretimlerimizi başlangıçtan bitimine kadar hassasiyetle kontrol ediyoruz.",
  },
  {
    icon: Package,
    title: "Kaliteli Hammadde",
    description: "Birinci kalite malzemeler kullanıp hızlı ve yaratıcı çözümler sunuyoruz.",
  },
  {
    icon: Users,
    title: "Tecrübeli Ekip",
    description: "Mühendislerimiz ve teknik ekibimiz alanında uzmanlar arasında yer almaktadır.",
  },
]

export function WhyUs() {
  return (
    <section id="urunler" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="mb-4">
              <span className="text-primary text-sm font-bold tracking-widest uppercase">
                ATL ÇELİK METAL SAN. VE TİC. LTD. ŞTİ.
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance">
              Neden ATL Çelik Metal?
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <AnimatedSection key={index} animation="scale" delay={index * 0.1}>
                <div className="group bg-card border border-border rounded-2xl p-6 md:p-8 text-center hover:shadow-2xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-2xl mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
