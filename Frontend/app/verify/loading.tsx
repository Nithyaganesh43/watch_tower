import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
      <div className="flex items-center space-x-2 text-white">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span>Loading verification...</span>
      </div>
    </div>
  )
}
