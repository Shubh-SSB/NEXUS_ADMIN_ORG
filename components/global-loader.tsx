"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"

export function GlobalLoader() {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsLoading(true)
    const timeout = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timeout)
  }, [pathname])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/20 backdrop-blur-[12px]">
      <div className="flex flex-col items-center gap-6 rounded-[2rem] border border-white/20 bg-white/5 p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] ring-1 ring-inset ring-white/10 dark:bg-black/5 dark:ring-white/5">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full bg-foreground/5 blur-xl" />
          <Spinner className="h-full w-full text-foreground" />
        </div>
        <p className="font-serif text-xs font-medium tracking-[0.2em] uppercase text-foreground/40">Loading</p>
      </div>
    </div>
  )
}
