"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <section id="iletisim" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <AnimatedSection animation="left">
            <div>
              <div className="mb-6">
                <span className="text-primary text-sm font-bold tracking-widest uppercase">İLETİŞİM</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 text-balance">
                Bize Ulaşın
              </h2>
              <p className="text-muted-foreground text-base md:text-lg mb-12 leading-relaxed">
                Projeleriniz için profesyonel çelik yapı çözümleri sunuyoruz. Detaylı bilgi almak ve ücretsiz keşif için
                bizimle iletişime geçin.
              </p>

              <div className="space-y-6 md:space-y-8">
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2 text-base md:text-lg">Telefon</h3>
                    <p className="text-muted-foreground text-sm md:text-base">+90 537 339 39 47</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 md:gap-6">
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2 text-base md:text-lg">E-posta</h3>
                    <p className="text-muted-foreground text-sm md:text-base">info@atlcelikyapi.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 md:gap-6">
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2 text-base md:text-lg">Adres</h3>
                    <p className="text-muted-foreground text-sm md:text-base">
                      Küçük Sanayi Sitesi Merkez, Düzce, Türkiye
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection animation="right" delay={0.2}>
            <div className="bg-card border border-border rounded-2xl shadow-xl p-6 md:p-10">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Teklif Formu</h3>
              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                <div>
                  <Input
                    type="text"
                    placeholder="Adınız Soyadınız"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-12 md:h-14 text-base rounded-lg bg-background border-border focus:border-primary"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="E-posta Adresiniz"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-12 md:h-14 text-base rounded-lg bg-background border-border focus:border-primary"
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="Telefon Numaranız"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="h-12 md:h-14 text-base rounded-lg bg-background border-border focus:border-primary"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Mesajınız"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="resize-none text-base rounded-lg bg-background border-border focus:border-primary"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 md:h-14 rounded-lg text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  GÖNDER
                </Button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
