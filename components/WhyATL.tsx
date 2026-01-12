"use client"

/* ===================== */
/* ATL ÖZEL SVG İKONLAR */
/* ===================== */

function MachineIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7"
    >
      <rect x="8" y="36" width="48" height="12" rx="2" />
      <rect x="14" y="20" width="36" height="12" rx="2" />
      <circle cx="20" cy="52" r="3" />
      <circle cx="44" cy="52" r="3" />
      <path d="M32 20V12" />
    </svg>
  )
}

function QualityIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7"
    >
      <circle cx="32" cy="26" r="12" />
      <path d="M20 40l-4 12 16-6 16 6-4-12" />
    </svg>
  )
}

function MaterialIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7"
    >
      <path d="M12 22l20-10 20 10-20 10-20-10z" />
      <path d="M12 22v20l20 10 20-10V22" />
    </svg>
  )
}

function TeamIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7"
    >
      <circle cx="24" cy="24" r="6" />
      <circle cx="40" cy="24" r="6" />
      <path d="M12 48c0-6 6-10 12-10" />
      <path d="M52 48c0-6-6-10-12-10" />
    </svg>
  )
}

/* ===================== */
/* CONTENT */
/* ===================== */

const items = [
  {
    title: "Gelişmiş Makina Parkuru",
    desc: "Üretimlerimizi ileri teknoloji makina parkurumuzda gerçekleştiriyoruz.",
    icon: MachineIcon,
  },
  {
    title: "Yüksek Kalite",
    desc: "Tüm üretimlerimizi başlangıçtan teslimata kadar titizlikle kontrol ediyoruz.",
    icon: QualityIcon,
  },
  {
    title: "Kaliteli Hammadde",
    desc: "Birinci sınıf hammaddeler ile uzun ömürlü ve güvenilir yapılar üretiyoruz.",
    icon: MaterialIcon,
  },
  {
    title: "Tecrübeli Ekip",
    desc: "Alanında uzman mühendis ve teknik kadromuz ile hizmet veriyoruz.",
    icon: TeamIcon,
  },
]

export default function WhyATL() {
  return (
    <section className="bg-background py-32">
      <div className="container text-center mb-20">
        <p className="text-primary text-sm mb-4 tracking-widest uppercase">
          ATL ÇELİK METAL SAN. VE TİC. LTD. ŞTİ.
        </p>

        <h2 className="text-4xl font-bold text-foreground">
          Neden ATL Çelik Metal?
        </h2>
      </div>

      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item) => {
          const Icon = item.icon

          return (
            <div
              key={item.title}
              className="
                group
                bg-card
                border border-border
                rounded-2xl
                p-8
                text-center
                transition
                hover:-translate-y-2
                hover:border-primary/60
              "
            >
              {/* ICON */}
              <div
                className="
                  mx-auto mb-6
                  flex h-14 w-14 items-center justify-center
                  rounded-xl
                  bg-primary/10
                  text-primary
                  transition
                  group-hover:bg-primary
                  group-hover:text-black
                "
              >
                <Icon />
              </div>

              {/* TITLE */}
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {item.title}
              </h3>

              {/* DESC */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
