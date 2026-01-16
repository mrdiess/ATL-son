import Image from "next/image"
import { notFound } from "next/navigation"
import { fetchDriveData } from "@/lib/drive"

export const revalidate = 300

type Props = {
  params: {
    slug: string
  }
}

export default async function ProjeDetayPage({ params }: Props) {
  const data = await fetchDriveData()
  const project = data.projeler.find(p => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <section className="container mx-auto py-16">
      <h1 className="text-3xl font-bold mb-10 capitalize">
        {project.slug.replace(/-/g, " ")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {project.before && (
          <div>
            <h2 className="font-semibold mb-2">Önce</h2>
            <Image
              src={project.before}
              alt="Before"
              width={800}
              height={600}
              className="rounded object-cover"
            />
          </div>
        )}

        {project.after && (
          <div>
            <h2 className="font-semibold mb-2">Sonra</h2>
            <Image
              src={project.after}
              alt="After"
              width={800}
              height={600}
              className="rounded object-cover"
            />
          </div>
        )}
      </div>
    </section>
  )
}
