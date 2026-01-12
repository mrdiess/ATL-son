import "./globals.css"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="min-h-screen flex flex-col m-0">
        <Header />

        {/* PAGE CONTENT */}
        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}
