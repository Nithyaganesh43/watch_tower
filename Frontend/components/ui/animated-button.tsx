"use client"
import { Button } from "@/components/ui/button"
import type React from "react"

import { cn } from "@/lib/utils"
import { useState } from "react"

interface AnimatedButtonProps {
  onClick: () => void
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

export function AnimatedButton({ onClick, children, className, disabled }: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative">
      <Button
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800",
          "hover:from-blue-500 hover:via-blue-600 hover:to-blue-700",
          "text-white font-semibold px-8 py-4 text-lg rounded-xl",
          "border border-blue-500/30 shadow-lg shadow-blue-500/25",
          "transition-all duration-300 ease-out",
          "hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105",
          "active:scale-95",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
          className,
        )}
      >
        {/* Sparkle animation background */}
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "absolute w-1 h-1 bg-white rounded-full animate-ping",
                i === 0 && "top-2 left-4 animation-delay-0",
                i === 1 && "top-4 right-6 animation-delay-200",
                i === 2 && "bottom-3 left-8 animation-delay-400",
                i === 3 && "bottom-2 right-4 animation-delay-600",
                i === 4 && "top-6 left-12 animation-delay-800",
                i === 5 && "bottom-4 right-8 animation-delay-1000",
              )}
              style={{
                animationDelay: `${i * 200}ms`,
                animationDuration: "2s",
              }}
            />
          ))}
        </div>

        {/* Glowing border effect */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl border-2 border-blue-400/0",
            "transition-all duration-300",
            isHovered && "border-blue-400/50 shadow-[0_0_20px_rgba(59,130,246,0.5)]",
          )}
        />

        <span className="relative z-10">{children}</span>
      </Button>
    </div>
  )
}
