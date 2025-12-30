import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    image: "/modern-living-room-renovation-completed.jpg",
    title: "Villa Komple Tadilat",
    badge: "Tadilat",
    location: "Kadıköy, İstanbul",
  },
  {
    image: "/office-interior-renovation-modern-design.jpg",
    title: "Ofis Dekorasyonu",
    badge: "Dekorasyon",
    location: "Ataşehir, İstanbul",
  },
  {
    image: "/apartment-building-exterior-painting-facade.jpg",
    title: "Dış Cephe Mantolama",
    badge: "Mantolama",
    location: "Maltepe, İstanbul",
  },
  {
    image: "/bathroom-renovation-tile-installation-modern.jpg",
    title: "Banyo Yenileme",
    badge: "Seramik",
    location: "Beşiktaş, İstanbul",
  },
]

export function ProjectsSection() {
  return (
    <section id="projeler" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
          <div>
            <span className="text-[#3b9ec9] font-medium mb-2 block">Portföyümüz</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e4a] mb-2">Projelerimiz</h2>
            <p className="text-gray-600 max-w-xl">
              Tamamladığımız başarılı tadilat ve dekorasyon projelerimizden örnekler.
            </p>
          </div>
          <Button
            variant="outline"
            className="rounded border-[#1a2e4a] text-[#1a2e4a] hover:bg-[#1a2e4a] hover:text-white self-start bg-transparent"
          >
            Tüm Projeler
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl">
              <div className="aspect-[3/2] relative">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e4a]/80 via-[#1a2e4a]/20 to-transparent" />
              </div>

              {/* Badge */}
              <Badge className="absolute top-4 right-4 bg-[#3b9ec9] text-white hover:bg-[#2d8ab5]">
                {project.badge}
              </Badge>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <div>
                  <p className="text-white/70 text-sm mb-1">{project.location}</p>
                  <h3 className="text-white font-semibold text-lg">{project.title}</h3>
                </div>
                <Button size="sm" className="rounded bg-white text-[#1a2e4a] hover:bg-gray-100">
                  Detay
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
