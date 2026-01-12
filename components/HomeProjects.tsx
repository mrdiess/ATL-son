import ProjectCard from "@/components/ProjectCard"
import { projects } from "@/data/projects"

export default function HomeProjects() {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        {/* Başlık */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Projelerimiz
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Üretim sürecimizin her aşamasını şeffaf, planlı ve
            mühendislik temelli yaklaşımla yönetiyoruz.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              index={project.id}
              title={project.title}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
