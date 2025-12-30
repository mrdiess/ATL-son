"use client"

import type React from "react"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: "up" | "left" | "right" | "scale"
  delay?: number
}

export function AnimatedSection({ children, className, animation = "up", delay = 0 }: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()

  const animationClass = {
    up: "",
    left: "animate-left",
    right: "animate-right",
    scale: "animate-scale",
  }[animation]

  return (
    <div
      ref={ref}
      className={cn("animate-on-scroll", animationClass, isVisible && "animate-visible", className)}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}
