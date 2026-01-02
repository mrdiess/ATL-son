"use client"

export type Theme = "light" | "dark" | "system"

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark"
  const stored = localStorage.getItem("theme-preference")
  return (stored as Theme) || "system"
}

export function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "dark"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function getActiveTheme(): "light" | "dark" {
  const stored = getStoredTheme()
  if (stored === "system") {
    return getSystemTheme()
  }
  return stored
}

export function setTheme(theme: Theme) {
  if (typeof window === "undefined") return
  localStorage.setItem("theme-preference", theme)

  const html = document.documentElement
  const activeTheme = theme === "system" ? getSystemTheme() : theme

  if (activeTheme === "dark") {
    html.classList.add("dark")
  } else {
    html.classList.remove("dark")
  }
}
