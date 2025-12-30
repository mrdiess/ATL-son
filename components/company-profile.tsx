"use client"

import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"
import Image from "next/image"

export function CompanyProfile() {
  return (
    <section id="kurumsal" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <AnimatedSection animation="left">
            <div className="relative">
              <div className="relative h-[400px] md:h-[550px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/company-profile.jpg"
                  alt="ATL Çelik Yapı - Çelik Konstrüksiyon"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  priority
                />
                <div className="absolute bottom-10 left-10 bg-card text-card-foreground p-8 rounded-2xl shadow-2xl border border-border">
                  <div className="text-5xl font-bold mb-2 text-primary">12+</div>
                  <div className="text-sm font-medium text-muted-foreground">Yıllık Tecrübe</div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Content Side */}
          <AnimatedSection animation="right" delay={0.2}>
            <div>
              <div className="mb-6">
                <span className="text-primary text-sm font-bold tracking-widest uppercase">ŞİRKET PROFİLİ</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight text-balance">
                Çelik Sektöründe Yüksek Standart
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Düzce Küçük Sanayi Sitesinde; Sandviç Panel Satış ve Montajı, Sac Kesme ve Bükme, Demir Çelik Sac ve
                  Profil Çeşitleri, Soğuk Hava Deposu panel Satışı ve Montajı ve Her türlü Kayıklı-Kayıksız Yapılar
                  konusunda uzman teknik personel ve kaliteli ekipman ile hizmet vermekteyiz.
                </p>
                <p>
                  Firmamız; sektörün ihtiyaçlarına ve kalite beklentilerine uyumlu düzenleme ve değişikliklerle günümüz
                  rekabet ortamında, gün geçtikçe artan bir hacimiyle faaliyetlerine devam etmektedir.
                </p>
              </div>
              <Button
                size="lg"
                className="mt-10 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-10 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Daha Fazla Bilgi
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
