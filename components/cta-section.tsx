import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Mail } from "lucide-react"

export function CtaSection() {
  return (
    <section id="iletisim" className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projeniz İçin Ücretsiz Keşif</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Çelik yapı projeniz için uzman ekibimizden ücretsiz keşif ve fiyat teklifi alın. Size en uygun çözümü
            birlikte belirleyelim.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" variant="secondary" className="rounded-full px-8">
              Teklif Alın
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              <Phone className="w-4 h-4 mr-2" />
              0850 123 45 67
            </Button>
          </div>
          <div className="flex items-center justify-center gap-2 text-primary-foreground/70">
            <Mail className="w-4 h-4" />
            <span>info@atlcelikyapi.com</span>
          </div>
        </div>
      </div>
    </section>
  )
}
