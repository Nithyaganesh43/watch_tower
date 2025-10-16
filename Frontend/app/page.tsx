"use client"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Monitor, Activity, Globe, Loader2, X } from "lucide-react"
import Navbar from "@/components/ui/navbar"

const API_BASE_URL = "https://thewatchtower.onrender.com"

export default function HomePage() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const router = useRouter()
  const [showCoffeePopup, setShowCoffeePopup] = useState(false)
  const isMounted = useRef(true)

  // Check session via /auth/check (no email/deviceId)
  useEffect(() => {
    isMounted.current = true

    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/check`, {
          credentials: "include",
          mode: "cors",
        })
        if (isMounted.current) {
          if (response.ok) {
            router.push("/dashboard")
            return
          }
          setIsCheckingAuth(false)
        }
      } catch (error) {
        if (isMounted.current) {
          setIsCheckingAuth(false)
        }
      }
    }

    checkAuth()

    return () => {
      isMounted.current = false
    }
  }, [router])

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

  const handleGetStarted = () => {
    router.push("/get-started")
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-16">
      <Navbar />
      {/* Background Images - Fixed positioning */}
      <div className="fixed inset-0 z-0">
        {/* Desktop Background */}
        <img
          src="/images/design-mode/m2j6q7xmue0bbikqrtkh.avif"
          alt="Watch Tower Background"
          className="hidden md:block w-full h-full object-cover object-right"
        />
        {/* Mobile Background */}
        <img
          src="/images/design-mode/dnxufxylqjzxsnsa8jkg.avif"
          alt="Watch Tower Mobile Background"
          className="md:hidden w-full h-full object-cover object-center"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/80 to-slate-900/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 -mt-8">
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
      </div>

        {/* Buy Me Coffee Sticky Button - Using actual BMC button */}
        <div className="fixed bottom-6 right-0 z-50">
          <button
            onClick={() => setShowCoffeePopup(true)}
            className="transition-all duration-300 hover:scale-105 shadow-lg rounded-lg overflow-hidden"
            title="Buy me a coffee">
            <img
              src="/images/design-mode/iaoqqc10tqeu7mhukznt.avif"
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
                  src="/images/design-mode/iaoqqc10tqeu7mhukznt.avif"
                  alt="Buy me a coffee"
                  className="h-8 w-auto"
                />
                <button
                  onClick={() => setShowCoffeePopup(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* QR Code - Optimized for 527x593 dimensions */}
              <div className="p-6">
                <div className="w-full bg-white rounded-xl border border-gray-100 p-4">
                  <img
                    src="/images/design-mode/qtvfxv0uw7b3pmetnsnx.avif"
                    alt="Buy me a coffee QR Code"
                    className="w-full h-auto max-w-[280px] mx-auto block"
                    style={{ aspectRatio: '527/593' }}
                  />
                </div>{' '}
                {typeof window !== 'undefined' && window.innerWidth < 768 && (
                  <button
                    onClick={() =>
                      (window.location.href =
                        'upi://pay?pa=nithyaganesh12345@okaxis&pn=NITHYA%20GANESH&aid=uGICAgKCikfCrdQ')
                    }
                    className="block mx-auto mt-13">
                    <img
                      src="/images/design-mode/umsqnglzfxkh4av8rswu.avif"
                      alt="Pay via UPI"
                      width={220}
                      height={68}
                      className="w-24 h-auto"
                    />
                  </button>
                )}
              </div>
              {/* Footer text */}
              <div className="px-6 pb-6 text-center">
                <p className="text-gray-700 text-sm font-medium mb-1">
                  Scan to support my work!
                </p>
                <p className="text-gray-500 text-xs">
                  Thank you for your support! ☕
                </p>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}
