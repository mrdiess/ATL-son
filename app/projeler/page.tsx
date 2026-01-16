import Image from "next/image"
import Link from "next/link"
import { fetchDriveData } from "@/lib/drive"

export const revalidate = 300

export default async function ProjelerPage() {
  const data = await fetchDriveData()

  return (
    <section className="container mx-auto py-16">
      <h1 className="text-3xl font-bold mb-10">Projelerimiz</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.projeler.map((project) => (
          <Link
            key={project.slug}
            href={`/projeler/${project.slug}`}
            className="group block border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <div className="relative w-full h-64">
              {project.after && (
                <Image
                  src={project.after}
                  alt={project.slug}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
              )}
            </div>

            <div className="p-4">
              <h2 className="text-lg font-semibold capitalize">
                {project.slug.replace("-", " ")}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
