import Link from "next/link"

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full bg-gradient-to-b from-black/70 to-transparent backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="font-bold tracking-wide">
          ATL ÇELİK YAPI
        </Link>

        <nav className="hidden gap-8 md:flex">
          <Link href="/">Ana Sayfa</Link>
          <Link href="/hizmetler">Hizmetler</Link>
          <Link href="/projeler">Projeler</Link>
          <Link href="/hakkimizda">Hakkımızda</Link>
          <Link href="/iletisim">İletişim</Link>
        </nav>

        <a
          href="tel:+905373393947"
          className="rounded-xl bg-sky-500 px-5 py-2 text-sm font-semibold text-white"
        >
          Hemen Ara
        </a>
      </div>
    </header>
  )
}
