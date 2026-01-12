import Link from "next/link"
import { gallery } from "../data/gallery"
import { beforeAfterItems } from "../data/beforeAfter"

export default function HomePage() {
  return (
    <main className="space-y-32">
      {/* HERO */}
      <section className="container py-28 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          ATL Çelik Yapı
        </h1>

        <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
          Anahtar teslim çelik yapı, ferforje, merdiven ve özel metal imalatları.
          Projeye değer katan mühendislik çözümleri.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/projeler"
            className="px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-black/90 transition"
          >
            Projelerimiz
          </Link>

          <Link
            href="/galeri"
            className="px-6 py-3 rounded-lg border font-medium hover:bg-gray-100 transition"
          >
            Galeri
          </Link>
        </div>
      </section>

      {/* HİZMETLER */}
      <section className="container">
        <h2 className="text-2xl font-semibold mb-8">
          Hizmet Alanlarımız
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "Çelik Yapı",
            "Ferforje Sistemler",
            "Merdiven & Özel İmalat",
          ].map((item) => (
            <div
              key={item}
              className="p-6 border rounded-xl text-center"
            >
              <h3 className="font-medium">{item}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Projeye özel ölçü, kaliteli işçilik ve uzun ömürlü çözümler.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ÖNE ÇIKAN PROJELER */}
      <section className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">
            Öne Çıkan Projeler
          </h2>

          <Link href="/projeler" className="text-sm underline">
            Tüm Projeler
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {beforeAfterItems.slice(0, 2).map((item) => (
            <div
              key={item.id}
              className="relative aspect-video overflow-hidden rounded-xl border"
            >
              <img
                src={item.after}
                alt={item.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 text-sm">
                {item.title}
              </div>
            </div>
          ))}
