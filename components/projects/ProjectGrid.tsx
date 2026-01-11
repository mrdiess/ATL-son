type Project = {
  id: string
  title: string
  image: string
}

const projects: Project[] = [
  { id: "1", title: "Villa Projesi", image: "/projects/1.jpg" },
  { id: "2", title: "Fabrika Projesi", image: "/projects/2.jpg" },
  { id: "3", title: "Çelik Çatı", image: "/projects/3.jpg" },
]

export default function ProjectGrid({ limit }: { limit?: number }) {
  const list = limit ? projects.slice(0, limit) : projects

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {list.map((p) => (
        <div
          key={p.id}
          className="rounded-xl overflow-hidden border"
        >
          <img
            src={p.image}
            alt={p.title}
            className="w-full h-56 object-cover"
          />
          <div className="p-4 font-medium">{p.title}</div>
        </div>
      ))}
    </div>
  )
}
