import "./globals.css"
import Header from "../components/Header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="m-0">
        <Header />
        {children}
      </body>
    </html>
  )
}
