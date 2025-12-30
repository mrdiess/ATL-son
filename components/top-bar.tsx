import { Mail, Phone } from "lucide-react"

export function TopBar() {
  return (
    <div className="bg-[#1a2e4a] text-white py-2">
      <div className="container mx-auto px-4 flex justify-between items-center text-sm">
        <div className="flex items-center gap-6">
          <a
            href="mailto:info@ereninşaat.com"
            className="flex items-center gap-2 hover:text-[#3b9ec9] transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">info@ereninsaat.com</span>
          </a>
          <a href="tel:+905551234567" className="flex items-center gap-2 hover:text-[#3b9ec9] transition-colors">
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">+90 555 123 45 67</span>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" aria-label="Facebook" className="hover:text-[#3b9ec9] transition-colors">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-[#3b9ec9] transition-colors">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-[#3b9ec9] transition-colors">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <rect
                x="2"
                y="2"
                width="20"
                height="20"
                rx="5"
                ry="5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="currentColor" strokeWidth="2" />
              <line
                x1="17.5"
                y1="6.5"
                x2="17.51"
                y2="6.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </a>
          <a href="#" aria-label="YouTube" className="hover:text-[#3b9ec9] transition-colors">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#1a2e4a" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
