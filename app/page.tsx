import { Hero } from "@/components/hero"
import { BeforeAfterGrid } from "@/components/BeforeAfterGrid"

const projects = [
  {
    id: "p1",
    title: "Fabrika Projesi",
    before: "/projects/proje1/before.jpg",
    after: "/projects/proje1/after.jpg",
  },
]

export default function Page() {
  return (
    <main>
      <Hero />
      <BeforeAfterGrid projects={projects} />
    </main>
  )
}
