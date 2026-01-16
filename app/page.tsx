import Header from "@/components/layout/Header"
import Hero from "@/components/home/Hero"
import Gallery from "@/components/home/Gallery"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header />
      <Hero />
      <Gallery />
    </main>
  )
}
