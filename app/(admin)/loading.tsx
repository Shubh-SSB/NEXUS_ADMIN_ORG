import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <div className="flex h-full items-center justify-center bg-transparent">
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm dark:bg-black/5">
        <Spinner className="h-8 w-8 text-foreground/70" />
        <p className="font-serif text-xs font-medium tracking-wider text-foreground/50">LOADING</p>
      </div>
    </div>
  )
}
