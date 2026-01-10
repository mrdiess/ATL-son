export type Theme = "light" | "dark" | "system"

const STORAGE_KEY = "theme"

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(STORAGE_KEY) as Theme | null
}

export function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

export function setTheme(theme: Theme) {
  if (typeof window === "undefined") return

  const root = document.documentElement
  root.classList.remove("light", "dark")

  const appliedTheme = theme === "system" ? getSystemTheme() : theme
  root.classList.add(appliedTheme)

  localStorage.setItem(STORAGE_KEY, theme)
}
