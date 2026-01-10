export const metadata = {
  title: "Bakımda - ATL Çelik Yapı",
  robots: "noindex, nofollow",
}

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="text-6xl font-bold text-blue-500 mb-4">🔧</div>
        <h1 className="text-4xl font-bold text-white mb-4">Bakımda</h1>
        <p className="text-slate-400 mb-8">Siteimiz şu anda bakımda. Lütfen daha sonra tekrar ziyaret edin.</p>
        <p className="text-slate-500 text-sm">
          Sorularınız için:{" "}
          <a href="tel:+905373393947" className="text-blue-500 hover:underline">
            0537 339 39 47
          </a>
        </p>
      </div>
    </div>
  )
}
