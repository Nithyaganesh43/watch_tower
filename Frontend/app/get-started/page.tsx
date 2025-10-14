"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/ui/navbar"

const API_BASE_URL = "https://thewatchtower.onrender.com"

export default function GetStartedPage() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const router = useRouter()

  // On mount: if already authorized, go to dashboard (smooth)
  useEffect(() => {
    let active = true
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/check`, {
          credentials: "include",
          mode: "cors",
        })
        if (!active) return
        if (res.ok) {
          router.push("/dashboard")
          return
        }
      } catch {
        // ignore
      } finally {
        if (active) setIsCheckingAuth(false)
      }
    }
    checkAuth()
    return () => {
      active = false
    }
  }, [router])

  const handleGoogle = () => {
    setIsSigningIn(true)
    // Start Google OAuth on backend (passport handles callback + redirect)
    window.location.href = `${API_BASE_URL}/auth/google`
  }

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-white">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Checking authentication...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-16">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="w-full max-w-md bg-slate-800/90 border border-slate-700 rounded-lg shadow-xl p-8 space-y-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-white text-center">Get Started</h1>
          <p className="text-slate-300 text-center">Sign in with Google to start monitoring your servers</p>

          <Button
            onClick={handleGoogle}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-bold"
            disabled={isSigningIn}
          >
            {isSigningIn ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Redirecting to Google...
              </>
            ) : (
              <>Continue with Google</>
            )}
          </Button>

          <div className="text-center space-y-4">
            <div className="text-sm text-slate-400">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="text-blue-400 hover:text-blue-300">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-blue-400 hover:text-blue-300">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
