"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Menu, X, Home, User, LogOut } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const API_BASE_URL = "https://thewatchtower.onrender.com"

interface UserData {
  email?: string | null
}

export default function Navbar({
  context = "default" as "default" | "dashboard",
}: { context?: "default" | "dashboard" }) {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<UserData | null>(null)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const router = useRouter()

  // Check auth via backend cookie session (no UI change, just logic)
  useEffect(() => {
    let isActive = true
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/check`, {
          credentials: "include",
          mode: "cors",
        })
        if (!isActive) return
        if (res.ok) {
          // Authorized. Email is not exposed by API; keep UI consistent.
          setUser({ email: null })
        } else {
          setUser(null)
        }
      } catch {
        if (!isActive) return
        setUser(null)
      }
    }
    checkAuth()
    return () => {
      isActive = false
    }
  }, [])

  const handleGetStarted = () => {
    router.push("/get-started")
  }

  const handleHowItWorks = () => {
    router.push("/how-it-works")
  }

  const handleHome = () => {
    router.push("/")
  }

  const handleDashboard = () => {
    router.push("/dashboard")
  }

  const handleLogout = async () => {
    setShowLogoutDialog(true)
  }

  const confirmLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        mode: "cors",
      })
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setUser(null)
      router.push("/")
      setShowLogoutDialog(false)
    }
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={handleHome}>
              <img
                src="/images/design-mode/u7oimuieazrfxzv4sl5n.avif"
                alt="Watch Tower Logo"
                className="w-10 h-10 rounded-lg"
              />
              <span className="text-xl font-bold text-white">Watch Tower</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {context === "dashboard" || user ? (
                <button
                  onClick={handleDashboard}
                  className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
                >
                  <Home className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
              ) : (
                <button
                  onClick={handleHome}
                  className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </button>
              )}

              <button
                onClick={handleHowItWorks}
                className="text-slate-300 hover:text-white transition-colors font-bold"
              >
                How It Works
              </button>

              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-slate-300">
                    <User className="w-4 h-4" />
                    {user.email ? (
                      <span className="text-sm">{user.email}</span>
                    ) : (
                      <span className="sr-only">Logged in</span>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : context !== "dashboard" ? (
                <button
                  onClick={handleGetStarted}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors duration-200 text-lg"
                >
                  Get Started
                </button>
              ) : null}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white transition-colors">
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-800/95 rounded-lg mt-2">
                {context === "dashboard" || user ? (
                  <button
                    onClick={() => {
                      handleDashboard()
                      setIsOpen(false)
                    }}
                    className="flex items-center space-x-2 w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
                  >
                    <Home className="w-4 h-4" />
                    <span>Dashboard</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleHome()
                      setIsOpen(false)
                    }}
                    className="flex items-center space-x-2 w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
                  >
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    handleHowItWorks()
                    setIsOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors font-bold"
                >
                  How It Works
                </button>
                {user ? (
                  <div className="flex items-center space-x-2 px-3 py-2 text-slate-300 border-t border-slate-700 mt-2 pt-2">
                    <User className="w-4 h-4" />
                    {user.email ? <span className="text-sm">{user.email}</span> : <span className="sr-only">User</span>}
                  </div>
                ) : context !== "dashboard" ? (
                  <button
                    onClick={() => {
                      handleGetStarted()
                      setIsOpen(false)
                    }}
                    className="block w-full text-left px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition-colors"
                  >
                    Get Started
                  </button>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-300">
              Sure, want to logout your account <span className="font-semibold text-white">{user?.email ?? ""}</span>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-white">
              Stay logged in
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmLogout} className="bg-red-600 hover:bg-red-700 text-white">
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
