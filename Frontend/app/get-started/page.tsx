"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Mail, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/ui/navbar" // Assuming Navbar is imported here

const API_BASE_URL = "https://servermonitoringsystembyng.onrender.com"

export default function GetStartedPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVerificationSent, setIsVerificationSent] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true) // For initial load check
  const [isPolling, setIsPolling] = useState(false) // To show loader during polling
  const router = useRouter()
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const pollingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const maxPollingDuration = 10 * 60 * 1000 // 10 minutes in milliseconds
  const pollingInterval =  5 * 1000 // 5 seconds in milliseconds

  // Generate device ID
  const getDeviceId = () => {
    let deviceId = localStorage.getItem("deviceId")
    if (!deviceId) {
      deviceId = "device_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now()
      localStorage.setItem("deviceId", deviceId)
    }
    return deviceId
  }

  // Function to check authentication status
  const checkAuthStatus = async (currentEmail: string, currentDeviceId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/check?deviceId=${currentDeviceId}&email=${currentEmail}`, {
        credentials: "include",
        mode: "cors",
      })

      if (response.ok) {
        const data = await response.json()
        if (data.verified) {
          // User is verified, stop polling and redirect
          if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current)
          if (pollingTimeoutRef.current) clearTimeout(pollingTimeoutRef.current)
          router.push("/dashboard")
          return true
        }
        // Not verified yet, continue polling
        return false
      } else {
        // API returned an error (e.g., invalid email/device ID, server error)
        // This means the current session/token is invalid, so clear local storage
        localStorage.removeItem("userEmail")
        localStorage.removeItem("deviceId")
        if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current)
        if (pollingTimeoutRef.current) clearTimeout(pollingTimeoutRef.current)
        setError("Verification session expired or invalid. Please request a new email.")
        setMessage("")
        setIsPolling(false) // Stop polling UI
        setIsVerificationSent(false) // Go back to initial state
        return false
      }
    } catch (err) {
      console.error("Error during authentication check:", err)
      // Network error, keep polling but clear local storage if it's a persistent issue
      // For now, just return false to continue polling, the timeout will handle it
      return false
    }
  }

  // Start polling for verification
  const startPolling = (emailToPoll: string, deviceIdToPoll: string) => {
    setIsPolling(true)
    // Clear any existing intervals/timeouts before starting new ones
    if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current)
    if (pollingTimeoutRef.current) clearTimeout(pollingTimeoutRef.current)

    // Set a timeout for the maximum polling duration
    pollingTimeoutRef.current = setTimeout(() => {
      if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current)
      setIsPolling(false)
      setError("Verification timed out. Please request a new email.")
      setMessage("")
      setIsVerificationSent(false) // Allow user to send new email
      localStorage.removeItem("userEmail")
      localStorage.removeItem("deviceId")
    }, maxPollingDuration)

    // Start polling interval
    pollingIntervalRef.current = setInterval(async () => {
      await checkAuthStatus(emailToPoll, deviceIdToPoll)
    }, pollingInterval)
  }

  // Initial auth check on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail")
    const storedDeviceId = localStorage.getItem("deviceId")

    if (storedEmail && storedDeviceId) {
      setEmail(storedEmail)
      setIsVerificationSent(true) // Assume verification was sent if email is stored
      checkAuthStatus(storedEmail, storedDeviceId).then((verified) => {
        if (!verified) {
          // If not immediately verified, start polling
          startPolling(storedEmail, storedDeviceId)
        }
        setIsCheckingAuth(false)
      })
    } else {
      setIsCheckingAuth(false)
    }

    return () => {
      // Cleanup on unmount
      if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current)
      if (pollingTimeoutRef.current) clearTimeout(pollingTimeoutRef.current)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    setMessage("")

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.")
      setIsSubmitting(false)
      return
    }

    const deviceId = getDeviceId()

    try {
      const response = await fetch(`${API_BASE_URL}/auth/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        mode: "cors",
        body: JSON.stringify({ email: email.trim(), deviceId }),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage(result.message || "Verification email sent! Please check your inbox.")
        setIsVerificationSent(true)
        localStorage.setItem("userEmail", email.trim())
        localStorage.setItem("deviceId", deviceId)

        // Start polling for verification status
        startPolling(email.trim(), deviceId)
      } else {
        setError(result.error || "Failed to send verification email. Please try again.")
        // Clear local storage if email request fails
        localStorage.removeItem("userEmail")
        localStorage.removeItem("deviceId")
        setIsVerificationSent(false) // Ensure UI reverts to input form
      }
    } catch (err) {
      console.error("Error sending verification email:", err)
      setError("Network error. Please check your connection and try again.")
      // Clear local storage on network error
      localStorage.removeItem("userEmail")
      localStorage.removeItem("deviceId")
      setIsVerificationSent(false) // Ensure UI reverts to input form
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSendDifferentEmail = () => {
    // Reset all states to allow sending a new email
    setEmail("")
    setMessage("")
    setError("")
    setIsSubmitting(false)
    setIsVerificationSent(false)
    setIsPolling(false)
    if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current)
    if (pollingTimeoutRef.current) clearTimeout(pollingTimeoutRef.current)
    localStorage.removeItem("userEmail")
    localStorage.removeItem("deviceId")
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
          <p className="text-slate-300 text-center">
            {isVerificationSent && isPolling
              ? "Waiting for email verification"
              : "Enter your email to start monitoring your servers"}
          </p>

          {error && (
            <Alert className="bg-red-900/50 border-red-700 text-red-300">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {message && (
            <Alert className="bg-green-900/50 border-green-700 text-green-300">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          {!isVerificationSent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 text-lg font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-5 w-5" />
                    Send Verification Email
                  </>
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-6 text-center">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="relative">
                    <CheckCircle className="h-16 w-16 text-green-400" />
                     
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white">Email Sent!</h3>
                  <p className="text-slate-300">
                    We've sent a verification link to <span className="font-medium text-blue-400">{email}</span>
                  </p>
                </div>
                {isPolling && (
                  <div className="flex items-center justify-center space-x-2 text-slate-400">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Waiting for you to verify your email...</span>
                  </div>
                )}
              </div>
              <p className="text-slate-400 text-center text-sm">
                If you don&apos;t receive the email, please check your spam folder.
              </p>
              <Button
                onClick={handleSendDifferentEmail}
                variant="outline"
                className="w-full bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
              >
                Send Different Email
              </Button>
            </div>
          )}

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
