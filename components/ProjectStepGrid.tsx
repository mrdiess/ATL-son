"use client"

type Step = {
  id: number
  title: string
}

const steps: Step[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Yapım Adımı ${String(i + 1).padStart(2, "0")}`,
}))

export function ProjectStepsGrid() {
  return (
    <section style={{ padding: "60px 40px" }}>
      <h2 style={{ fontSize: 32, marginBottom: 32 }}>
        Yapım Süreci
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 16,
        }}
      >
        {steps.map((step) => (
          <div
            key={step.id}
            style={{
              background: "#d9d9d9",
              borderRadius: 12,
              padding: "20px 16px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 14, marginBottom: 12 }}>
              {step.title}
            </div>

            <div
              style={{
                background: "#2563eb",
                color: "#fff",
                borderRadius: 6,
                display: "inline-block",
                padding: "6px 10px",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {String(step.id).padStart(2, "0")}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
