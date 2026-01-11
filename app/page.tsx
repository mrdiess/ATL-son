import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { BeforeAfterGrid } from "@/components/BeforeAfterGrid"

export default function Page() {
  const projects = [
    {
      id: "1",
      title: "Endüstriyel Tesis",
      before: "/projects/proje1/before.jpg",
      after: "/projects/proje1/after.jpg",
    },
  ]

  return (
    <>
      <Header />
      <Hero />
      <BeforeAfterGrid projects={projects} />
    </>
  )
}
