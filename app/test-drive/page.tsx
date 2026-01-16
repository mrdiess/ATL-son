import Image from "next/image"
import { fetchDriveData } from "@/lib/drive"

export const revalidate = 0 // anında test için

export default async function TestDrivePage() {
  const data = await fetchDriveData()

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-2xl font-bold mb-8">
        Drive Entegrasyon Testi
      </h1>

      <pre className="bg-black text-green-400 p-4 rounded mb-10 text-sm overflow-auto">
        {JSON.stringify(data.projeler, null, 2)}
      </pre>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.projeler.map((p) => (
          <div key={p.slug} className="border rounded-lg p-4">
            <h2 className="font-semibold mb-4">{p.slug}</h2>

            <div className="grid grid-cols-2 gap-4">
              {p.before && (
                <Image
                  src={p.before}
                  alt="before"
                  width={400}
                  height={300}
                  className="object-cover rounded"
                />
              )}
              {p.after && (
                <Image
                  src={p.after}
                  alt="after"
                  width={400}
                  height={300}
                  className="object-cover rounded"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
