"use client"

import { useTheme } from "next-themes"

export function ATLLogo({
  className = "",
  width = 240,
  height = 100,
}: { className?: string; width?: number; height?: number }) {
  const { theme } = useTheme()
  const darkBlueColor = theme === "dark" ? "#FFFFFF" : "#1a3a6f"
  const textColor = theme === "dark" ? "#FFFFFF" : "#000000"

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 240 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Line 1 - Dark blue (leftmost) - white in dark mode */}
      <polygon points="10,75 28,15 38,15 20,75" fill={darkBlueColor} />

      {/* Line 2 - Medium blue (middle) */}
      <polygon points="32,75 50,15 60,15 42,75" fill="#2563eb" />

      {/* Line 3 - Light blue (rightmost) */}
      <polygon points="54,75 72,15 82,15 64,75" fill="#0ea5e9" />

      <text
        x="100"
        y="50"
        fontFamily="Arial, sans-serif"
        fontSize="42"
        fontWeight="900"
        fill={textColor}
        letterSpacing="2"
      >
        ATL
      </text>

      <text
        x="100"
        y="78"
        fontFamily="Arial, sans-serif"
        fontSize="16"
        fontWeight="700"
        fill={textColor}
        letterSpacing="2"
      >
        ÇELİK YAPI
      </text>
    </svg>
  )
}

export function ATLLogoIcon({
  className = "",
  width = 80,
  height = 60,
}: { className?: string; width?: number; height?: number }) {
  const { theme } = useTheme()
  const darkBlueColor = theme === "dark" ? "#FFFFFF" : "#1a3a6f"

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Line 1 - Dark blue - white in dark mode */}
      <polygon points="5,50 18,10 25,10 12,50" fill={darkBlueColor} />

      {/* Line 2 - Medium blue */}
      <polygon points="22,50 35,10 42,10 29,50" fill="#2563eb" />

      {/* Line 3 - Light blue */}
      <polygon points="39,50 52,10 59,10 46,50" fill="#0ea5e9" />
    </svg>
  )
}

export default ATLLogo
