"use client"

import type React from "react"
import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("relative flex items-center justify-center", className)}
      {...props}
    >
      <div className="absolute inset-0 rounded-full border-2 border-foreground/5" />
      <div
        className="absolute inset-0 rounded-full border-2 border-transparent border-t-foreground/40"
        style={{
          animation: "spinner-spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        }}
      />
      <style jsx>{`
        @keyframes spinner-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export { Spinner }
