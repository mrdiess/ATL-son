export type Theme = "light" | "dark" | "system"

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system"
  return (localStorage.getItem("theme") as Theme) ?? "system"
}

export function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

export function setTheme(theme: Theme) {
  if (typeof window === "undefined") return

  const root = window.document.documentElement
  root.classList.remove("light", "dark")

  const resolvedTheme =
    theme === "system" ? getSystemTheme() : theme

  root.classList.add(resolvedTheme)
  localStorage.setItem("theme", theme)
}
