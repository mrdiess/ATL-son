export const dynamic = "force-dynamic"

async function getData() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL!,
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("API fetch failed")
  }

  return res.json()
}

export default async function ApiTestPage() {
  const data = await getData()

  return (
    <div style={{ padding: 40 }}>
      <h1>API TEST</h1>

      {data.projects?.map((p: any, i: number) => (
        <div key={i} style={{ marginBottom: 40 }}>
          <h2>{p.title}</h2>

          <img src={p.before} width={300} />
          <img src={p.after} width={300} />
        </div>
      ))}

      <h2>Sponsors</h2>

      {data.sponsors?.map((s: any, i: number) => (
        <img
          key={i}
          src={s.logo}
          width={150}
          style={{ marginRight: 20 }}
        />
      ))}
    </div>
  )
}
