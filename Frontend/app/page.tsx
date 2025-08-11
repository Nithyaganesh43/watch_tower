"use client"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Monitor, Activity, Globe, Loader2, X } from "lucide-react"
import Navbar from "@/components/ui/navbar"

const API_BASE_URL = "https://servermonitoringsystembyng.onrender.com"

export default function HomePage() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const router = useRouter()
  const [showCoffeePopup, setShowCoffeePopup] = useState(false)
  const isMounted = useRef(true) // Ref to track component mount status

  // Generate device ID
  const getDeviceId = () => {
    let deviceId = localStorage.getItem("deviceId")
    if (!deviceId) {
      deviceId = "device_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now()
      localStorage.setItem("deviceId", deviceId)
    }
    return deviceId
  }

  // Check if already authenticated immediately on load
  useEffect(() => {
    isMounted.current = true // Set to true on mount

    const checkAuth = async () => {
      try {
        const deviceId = getDeviceId()
        const storedEmail = localStorage.getItem("userEmail")

        if (storedEmail) {
          const response = await fetch(`${API_BASE_URL}/auth/check?deviceId=${deviceId}&email=${storedEmail}`, {
            credentials: "include",
            mode: "cors",
          })

          if (isMounted.current) {
            if (response.ok) {
              const data = await response.json()
              if (data.verified) {
                router.push("/dashboard")
                return // Exit early if redirecting
              } else {
                // If not verified, clear local storage
                localStorage.removeItem("userEmail")
                localStorage.removeItem("deviceId")
              }
            } else {
              // If API call fails (e.g., 401, network error), clear local storage
              console.error("Auth check API failed:", response.status, response.statusText)
              localStorage.removeItem("userEmail")
              localStorage.removeItem("deviceId")
            }
            // If not verified or response not ok, proceed to render homepage
            setIsCheckingAuth(false)
          }
        } else if (isMounted.current) {
          // No stored email, proceed to render homepage
          setIsCheckingAuth(false)
        }
      } catch (error) {
        console.error("Auth check error:", error)
        if (isMounted.current) {
          // On error, stop checking and render homepage, clear local storage
          localStorage.removeItem("userEmail")
          localStorage.removeItem("deviceId")
          setIsCheckingAuth(false)
        }
      }
    }

    checkAuth()

    return () => {
      isMounted.current = false // Set to false on unmount
    }
  }, [router])

  const handleGetStarted = () => {
    router.push("/get-started")
  }

  // Show loading screen while checking auth
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-white">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-16">
      <Navbar />
      {/* Background Images - Fixed positioning */}
      <div className="fixed inset-0 z-0">
        {/* Desktop Background */}
        <img
          src="https://res.cloudinary.com/dflgxymvs/image/upload/v1753938401/lecrowninteriors/m2j6q7xmue0bbikqrtkh.avif"
          alt="Watch Tower Background"
          className="hidden md:block w-full h-full object-cover object-right"
        />
        {/* Mobile Background */}
        <img
          src="https://res.cloudinary.com/dflgxymvs/image/upload/v1753939083/lecrowninteriors/dnxufxylqjzxsnsa8jkg.avif"
          alt="Watch Tower Mobile Background"
          className="md:hidden w-full h-full object-cover object-center"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/80 to-slate-900/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-8">
          <div className="w-full max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <div className="space-y-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Your Render server will never go to sleep again
                </h2>

                <div className="space-y-4 text-lg sm:text-xl text-slate-300">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                    <span>Monitor your servers 24/7 with instant email alerts</span>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                    <span>Keep your infrastructure running smoothly with our reliable monitoring solution</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                    <span>API call is made every 5 minutes</span>
                  </div>
                </div>

                {/* CTA Button - Made bigger and moved up */}
                <div className="pt-2">
                  <button
                    onClick={handleGetStarted}
                    className="px-12 py-4 text-xl font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    Get Started
                  </button>
                  <p className="text-lg text-slate-400 mt-6">Monitoring limit: 100 servers per account</p>
                </div>

                
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="px-4 sm:px-6 lg:px-8 py-16 bg-slate-900/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center space-y-4">
                <div className="p-4 bg-blue-600/20 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                  <Monitor className="h-10 w-10 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">24/7 Monitoring</h3>
                  <p className="text-lg text-slate-400">Continuous server health checks every 5 minutes</p>
                </div>
              </div>

              <div className="text-center space-y-4">
                <div className="p-4 bg-green-600/20 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                  <Activity className="h-10 w-10 text-green-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Instant Alerts</h3>
                  <p className="text-lg text-slate-400">Get notified immediately when servers go down</p>
                </div>
              </div>

              <div className="text-center space-y-4">
                <div className="p-4 bg-purple-600/20 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                  <Globe className="h-10 w-10 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Global Reach</h3>
                  <p className="text-lg text-slate-400">Monitor servers anywhere in the world</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <Card className="bg-slate-800/80 border-slate-700 backdrop-blur-sm text-center">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-green-400 mb-2">99.9%</div>
                  <div className="text-lg text-slate-300">Uptime Monitoring</div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/80 border-slate-700 backdrop-blur-sm text-center">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-blue-400 mb-2">5min</div>
                  <div className="text-lg text-slate-300">Check Interval</div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/80 border-slate-700 backdrop-blur-sm text-center">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-purple-400 mb-2">10</div>
                  <div className="text-lg text-slate-300">Free Servers</div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/80 border-slate-700 backdrop-blur-sm text-center">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">∞</div>
                  <div className="text-lg text-slate-300">History Storage</div>
                </CardContent>
              </Card>
            </div>

            {/* What You Get Section */}
            <Card className="bg-slate-800/80 border-slate-700 backdrop-blur-sm max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-white text-2xl text-center">What You Get</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                  <span className="text-lg text-slate-300">Real-time server monitoring</span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                  <span className="text-lg text-slate-300">Email alerts for downtime</span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                  <span className="text-lg text-slate-300">Response time tracking</span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                  <span className="text-lg text-slate-300">Historical data & reports</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-slate-900/90 backdrop-blur-sm border-t border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Logo and Description */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://res.cloudinary.com/dflgxymvs/image/upload/v1753945877/lecrowninteriors/u7oimuieazrfxzv4sl5n.avif"
                    alt="Watch Tower Logo"
                    className="w-10 h-10 rounded-lg"
                  />
                  <h3 className="text-xl font-bold text-white">Watch Tower 24/7</h3>
                </div>
                <p className="text-slate-400">
                  Professional server monitoring solution for developers and businesses worldwide.
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Quick Links</h4>
                <div className="space-y-2">
                  <a href="/terms" className="block text-slate-400 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                  <a href="/privacy" className="block text-slate-400 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </div>
              </div>

              {/* Connect with Developer */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Connect with Developer</h4>
                <div className="space-y-3">
                  <a
                    href="https://wa.me/919042421622"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-slate-400 hover:text-green-400 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/nithyaganesh43/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/Nithyaganesh43/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-slate-400 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-700">
              <div className="flex flex-col items-center justify-center space-y-2">
                <p className="text-slate-400 text-sm">Built with ❤️ by Nithya Ganesh</p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Buy Me Coffee Sticky Button - Using actual BMC button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setShowCoffeePopup(true)}
          className="transition-all duration-300 hover:scale-105 shadow-lg rounded-lg overflow-hidden"
          title="Buy me a coffee"
        >
          <img
            src="https://res.cloudinary.com/dflgxymvs/image/upload/v1754327079/lecrowninteriors/iaoqqc10tqeu7mhukznt.avif"
            alt="Buy me a coffee"
            className="h-12 w-auto sm:h-14"
          />
        </button>
      </div>

      {/* Coffee QR Popup - Fixed z-index to appear above navbar */}
      {showCoffeePopup && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[99999] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm mx-auto flex flex-col relative animate-in zoom-in-95 duration-300 shadow-2xl">
            {/* Header with BMC button and close */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <img
                src="https://res.cloudinary.com/dflgxymvs/image/upload/v1754327079/lecrowninteriors/iaoqqc10tqeu7mhukznt.avif"
                alt="Buy me a coffee"
                className="h-8 w-auto"
              />
              <button
                onClick={() => setShowCoffeePopup(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* QR Code - Optimized for 527x593 dimensions */}
            <div className="p-6">
              <div className="w-full bg-white rounded-xl border border-gray-100 p-4">
                <img
                  src="https://res.cloudinary.com/dflgxymvs/image/upload/v1754328353/lecrowninteriors/qtvfxv0uw7b3pmetnsnx.avif"
                  alt="Buy me a coffee QR Code"
                  className="w-full h-auto max-w-[280px] mx-auto block"
                  style={{ aspectRatio: "527/593" }}
                />
              </div>
              {typeof window !== "undefined" && window.innerWidth < 768 && (
                <button
                  onClick={() =>
                    (window.location.href =
                      "upi://pay?pa=nithyaganesh12345@okaxis&pn=NITHYA%20GANESH&aid=uGICAgKCikfCrdQ")
                  }
                  className="block mx-auto mt-13"
                >
                  <img
                    src="https://res.cloudinary.com/dflgxymvs/image/upload/v1754332399/lecrowninteriors/umsqnglzfxkh4av8rswu.avif"
                    alt="Pay via UPI"
                    width={220}
                    height={68}
                    className="w-24 h-auto"
                  />
                </button>
              )}
            </div> 
            <div className="px-6 pb-6 text-center">
              <p className="text-gray-700 text-sm font-medium mb-1">Scan to support my work!</p>
              <p className="text-gray-500 text-xs">Thank you for your support! ☕</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
