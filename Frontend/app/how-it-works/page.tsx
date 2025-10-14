"use client"
import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Mail, Shield, Server, X, Monitor, Activity, Globe } from "lucide-react"
import Navbar from "@/components/ui/navbar"

const HowItWorksPage = () => {
  const [showCoffeePopup, setShowCoffeePopup] = useState(false)

  const features = [
    {
      icon: <Clock className="w-8 h-8 text-blue-400" />,
      title: "5-Minute Monitoring",
      description:
        "Your servers are checked every 5 minutes, 24/7, ensuring continuous uptime monitoring without overwhelming your resources.",
    },
    {
      icon: <Mail className="w-8 h-8 text-red-400" />,
      title: "Instant Email Alerts",
      description:
        "Get immediate notifications when your server goes down. After 3 consecutive failures, we'll send you an alert email with details.",
    },
    {
      icon: <Shield className="w-8 h-8 text-green-400" />,
      title: "Smart Pause System",
      description:
        "After 3 failures, monitoring automatically pauses to prevent spam. Easily restart monitoring with one click when ready.",
    },
    {
      icon: <Server className="w-8 h-8 text-purple-400" />,
      title: "Multiple Server Support",
      description:
        "Monitor up to 10 servers simultaneously. Each server gets its own dashboard with detailed statistics and history.",
    },
  ]

  const steps = [
    {
      step: "1",
      title: "Add Your Server",
      description: "Simply enter your server URL (HTTP/HTTPS). We'll validate it and start monitoring immediately.",
      color: "bg-blue-500",
    },
    {
      step: "2",
      title: "Continuous Monitoring",
      description: "Every 5 minutes, we send a request to your server to check if it's responding properly.",
      color: "bg-green-500",
    },
    {
      step: "3",
      title: "Real-time Dashboard",
      description: "View live status, response times, uptime percentage, and detailed history for each server.",
      color: "bg-purple-500",
    },
    {
      step: "4",
      title: "Smart Notifications",
      description:
        "Get email alerts only when needed. After 3 consecutive failures, we notify you and pause monitoring.",
      color: "bg-red-500",
    },
  ]

  const benefits = [
    "🚀 Free server monitoring for developers and small businesses",
    "🛡️ Keep Render free tier servers awake 24/7 - guaranteed!",
    "🔔 Smart alerting system that prevents notification spam",
    "💻 Clean, intuitive dashboard for all your servers",
    "📱 Mobile-responsive interface for monitoring on-the-go",
    "🔒 Secure authentication with device verification",
    "📈 Historical data and performance trends",
    "⚡ Quick server restart and management controls",
  ]

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <section className="text-center mb-12">
            <h1 className="text-3xl font-bold text-white">How Watch Tower 24/7 Works</h1>
            <p className="mt-4 text-slate-300">
              Learn how we keep your Render servers always online with real-time monitoring and alerts.
            </p>
          </section>

          {/* Key Features Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Feature 1: Monitoring */}
            <Card className="bg-slate-800/90 border-slate-700">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <div className="p-4 bg-blue-600/20 rounded-full mb-4">
                  <Monitor className="h-10 w-10 text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">24/7 Monitoring</h3>
                <p className="text-slate-400">
                  We continuously check your server status every 5 minutes from multiple locations.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2: Alerts */}
            <Card className="bg-slate-800/90 border-slate-700">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <div className="p-4 bg-green-600/20 rounded-full mb-4">
                  <Activity className="h-10 w-10 text-green-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">Instant Alerts</h3>
                <p className="text-slate-400">
                  Receive immediate email notifications whenever your server experiences downtime.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3: Reliability */}
            <Card className="bg-slate-800/90 border-slate-700">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <div className="p-4 bg-purple-600/20 rounded-full mb-4">
                  <Globe className="h-10 w-10 text-purple-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">Global Reach</h3>
                <p className="text-slate-400">
                  Our monitoring covers servers hosted worldwide, ensuring constant uptime.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Step-by-Step Process Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">How It Works: A Step-by-Step Guide</h2>

            {/* Step 1: Add Your Server */}
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mr-4">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Add Your Server</h3>
                <p className="text-slate-300">Provide your server URL, and we'll start monitoring its status.</p>
              </div>
            </div>

            {/* Step 2: Continuous Monitoring */}
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-green-600 text-white font-bold flex items-center justify-center mr-4">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Continuous Monitoring</h3>
                <p className="text-slate-300">
                  Our system automatically pings your server every 5 minutes to check its availability.
                </p>
              </div>
            </div>

            {/* Step 3: Instant Alerts */}
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-yellow-600 text-white font-bold flex items-center justify-center mr-4">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Instant Alerts</h3>
                <p className="text-slate-300">
                  If your server doesn't respond, we'll immediately send you an email alert.
                </p>
              </div>
            </div>

            {/* Step 4: Peace of Mind */}
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-red-600 text-white font-bold flex items-center justify-center mr-4">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Peace of Mind</h3>
                <p className="text-slate-300">
                  With Watch Tower 24/7, rest assured that your servers are constantly monitored and protected.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-slate-300 mb-8">
              Join Watch Tower 24/7 today and experience reliable, 24/7 server monitoring!
            </p>
            <Button asChild>
              <Link href="/get-started" className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Started
              </Link>
            </Button>
          </section>
        </div>
      </div>

      {/* Buy Me Coffee Sticky Button - Using actual BMC button */}
      <div className="fixed bottom-6 right-0 z-50">
        <button
          onClick={() => setShowCoffeePopup(true)}
          className="transition-all duration-300 hover:scale-105 shadow-lg rounded-lg overflow-hidden"
          title="Buy me a coffee"
        >
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
                className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
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
                  style={{ aspectRatio: "527/593" }}
                />
              </div>{" "}
              {typeof window !== "undefined" && window.innerWidth < 768 && (
                <button
                  onClick={() =>
                    (window.location.href =
                      "upi://pay?pa=nithyaganesh12345@okaxis&pn=NITHYA%20GANESH&aid=uGICAgKCikfCrdQ")
                  }
                  className="block mx-auto mt-13"
                >
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
              <p className="text-gray-700 text-sm font-medium mb-1">Scan to support my work!</p>
              <p className="text-gray-500 text-xs">Thank you for your support! ☕</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default HowItWorksPage
