"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const API_BASE_URL = "https://servermonitoringsystembyng.onrender.com"

export default function VerifyPage() {
  const [verificationStatus, setVerificationStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  useEffect(() => {
    const verifyDevice = async () => {
      if (!token) {
        setVerificationStatus("error")
        setMessage("Verification token is missing.")
        return
      }

      try {
        const response = await fetch(`${API_BASE_URL}/auth/verify?token=${token}`, {
          method: "POST",
          credentials: "include",
          mode: "cors",
        })

        const data = await response.json()

        if (response.ok) {
          setVerificationStatus("success")
          setMessage("Device verified successfully!")
          // Attempt to close the window after 1 second
       
        } else {
          setVerificationStatus("error")
          setMessage( "Verification failed. Invalid or expired token.") 
        }
          setTimeout(() => { 
              window.close() 
          }, 2 * 1000) // Close the window after 2 seconds
      } catch (error) {
        console.error("Error during verification:", error)
        setVerificationStatus("error")
        setMessage("Network error during verification. Please try again.")
         
      }
    }

    verifyDevice()
  }, [token, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800/90 border-slate-700 backdrop-blur-sm text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Device Verification</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          {verificationStatus === "loading" && (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-blue-400" />
              <p className="text-lg">Verifying your device...</p>
            </>
          )}
          {verificationStatus === "success" && (
            <>
              <CheckCircle className="h-12 w-12 text-green-400" />
              <p className="text-lg font-semibold text-center">{message}</p>
              <p className="text-sm text-slate-400">Redirecting you to the dashboard...</p>
            </>
          )}
          {verificationStatus === "error" && (
            <>
              <AlertCircle className="h-12 w-12 text-red-400" />
              <p className="text-lg font-semibold text-center">{message}</p>
              <p className="text-sm text-slate-400">Redirecting you to the get started page...</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
