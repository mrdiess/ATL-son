import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        atl: {
          bg: "#071827",        // ana arka plan
          bgSoft: "#0B2238",    // kart arka plan
          border: "#12324D",
          primary: "#0EA5E9",   // mavi vurgu
          text: "#E5EEF6",
          muted: "#9FB3C8",
        },
      },
    },
  },
  plugins: [],
}

export default config
