import ProjectCard from "@/components/ProjectCard"
import { projects } from "@/data/projects"

export default function HomeProjects() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        {/* Başlık */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-foreground">
            Projelerimiz
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              index={project.id}
              title={project.title}
              image={project.image}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
