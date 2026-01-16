export default function Contact() {
  return (
    <section className="bg-[#0a1628] py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sky-400">İLETİŞİM</p>
          <h2 className="mb-6 text-4xl font-bold">Bize Ulaşın</h2>
          <p className="text-white/70">
            Projeleriniz için ücretsiz keşif ve teklif alın.
          </p>
        </div>

        <form className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <input className="mb-4 w-full rounded-lg p-3" placeholder="Ad Soyad" />
          <input className="mb-4 w-full rounded-lg p-3" placeholder="E-posta" />
          <textarea
            className="mb-4 w-full rounded-lg p-3"
            placeholder="Mesajınız"
          />
          <button className="w-full rounded-lg bg-sky-500 py-3 font-semibold">
            GÖNDER
          </button>
        </form>
      </div>
    </section>
  )
}
