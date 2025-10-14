"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Loader2,
  Plus,
  Globe,
  AlertCircle,
  CheckCircle,
  Server,
  X,
  Trash2,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"

const API_BASE_URL = "https://thewatchtower.onrender.com"

function RenderWarningPopup({ isOpen, onClose, onAgree }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-slate-800 border-slate-700 max-w-md w-full">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <CardTitle className="text-white text-lg">Render.com Server Detected</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 text-slate-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h3 className="text-yellow-400 font-semibold mb-2">Important: Render Free Tier Limitations</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              You are getting 24/7 uptime for free — but remember this:
            </p>
            <ul className="text-slate-300 text-sm mt-2 space-y-1 list-disc list-inside">
              <li>One Render account = One always-awake server on the free tier</li>
              <li>For more always-awake servers, create a new Render account for each one</li>
              <li>
                Don't keep two or more servers always awake on the same Render account — you'll burn through
                the 750 free instance hours and they'll go offline before month end
              </li>
            </ul>
          </div>

          <div className="flex space-x-3 pt-2">
            <Button onClick={onAgree} className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white">
              I Agree
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function calculateUptime(createdAt) {
  try {
    if (!createdAt || createdAt === "undefined" || createdAt === "null") {
      return "No data"
    }
    const createdDate = new Date(createdAt)
    const now = new Date()
    if (isNaN(createdDate.getTime()) || createdDate.getTime() > now.getTime()) {
      return "Invalid date"
    }
    const totalMs = now.getTime() - createdDate.getTime()
    const totalMinutes = Math.floor(totalMs / 60000)
    const totalHours = Math.floor(totalMinutes / 60)
    const totalDays = Math.floor(totalHours / 24)

    if (totalDays > 0) {
      return `${totalDays}d`
    } else if (totalHours > 0) {
      return `${totalHours}h`
    } else if (totalMinutes > 0) {
      return `${totalMinutes}m`
    } else {
      return "0m"
    }
  } catch {
    return "Error"
  }
}

function useUptime(createdAt) {
  const [uptime, setUptime] = useState(() => calculateUptime(createdAt))

  useEffect(() => {
    const updateUptime = () => {
      setUptime(calculateUptime(createdAt))
    }
    if (createdAt) {
      updateUptime()
      const interval = setInterval(updateUptime, 60000) // Update every minute
      return () => clearInterval(interval)
    }
  }, [createdAt])

  return uptime
}

function ServerItem({ server, onDelete }) {
  const uptime = useUptime(server.createdAt)

  const getStatusDisplay = (status) => {
    switch (status) {
      case "online":
        return {
          icon: <div className="w-2 h-2 rounded-full bg-green-400"></div>,
          color: "text-green-400",
          text: "Online",
        }
      case "offline":
        return {
          icon: <div className="w-2 h-2 rounded-full bg-red-400"></div>,
          color: "text-red-400",
          text: "Offline",
        }
      case "checking":
        return {
          icon: <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>,
          color: "text-blue-400",
          text: "Checking",
        }
      default:
        return {
          icon: <div className="w-2 h-2 rounded-full bg-slate-400"></div>,
          color: "text-slate-400",
          text: "Unknown",
        }
    }
  }

  const statusDisplay = getStatusDisplay(server.status)

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 hover:bg-slate-800/70 transition-all">
      <div className="space-y-3">
        {/* URL */}
        <div>
          <div className="text-slate-400 text-xs mb-1">URL</div>
          <p className="text-white text-sm break-all">{server.url}</p>
        </div>

        {/* Status and Uptime Row */}
        <div className="flex items-center justify-between gap-4">
          {/* Status */}
          <div className="flex-1">
            <div className="text-slate-400 text-xs mb-1">Status</div>
            <div className="flex items-center space-x-2">
              {statusDisplay.icon}
              <span className={cn("font-semibold text-sm", statusDisplay.color)}>{statusDisplay.text}</span>
            </div>
          </div>

          {/* Uptime */}
          <div className="flex-1">
            <div className="text-slate-400 text-xs mb-1">Uptime</div>
            <div className="text-white font-medium text-sm">{uptime}</div>
          </div>
        </div>

        {/* Delete Button */}
        <Button
          onClick={() => onDelete(server.id)}
          variant="outline"
          size="sm"
          className="w-full bg-red-700/20 border-red-600/50 text-red-400 hover:bg-red-700/40 hover:border-red-600 text-sm"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [newServerUrl, setNewServerUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showRenderWarning, setShowRenderWarning] = useState(false)
  const pollingIntervalRef = useRef(null)

  const isRenderUrl = (url) => {
    return url.toLowerCase().includes("onrender")
  }

  const fetchDashboardData = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/servers/`, {
        credentials: "include",
        mode: "cors",
      })

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          window.location.href = "/"
          return
        }
        throw new Error("Failed to fetch servers")
      }

      const json = await res.json()
      const servers = (json?.servers || []).map((s) => ({
        id: s.id,
        url: s.url,
        status: s.status ?? "checking",
        lastCheck: s.lastCheck,
        createdAt: s.createdAt,
        responseTime: s.responseTime,
        consecutiveFailures: s.consecutiveFailures,
      }))

      const stats = servers.reduce(
        (acc, s) => {
          acc.total += 1
          if (s.status === "online") acc.online += 1
          else if (s.status === "offline") acc.offline += 1
          else acc.checking += 1
          return acc
        },
        { total: 0, online: 0, offline: 0, checking: 0 },
      )

      setData({
        servers,
        maxServers: 100,
        currentCount: servers.length,
        stats,
      })
      setError("")
    } catch (err) {
      console.error("Error fetching dashboard:", err)
      setError("Failed to load dashboard data")
    }
  }, [])

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true)
      await fetchDashboardData()
      setLoading(false)
    }
    loadDashboard()
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current)
      }
    }
  }, [fetchDashboardData])

  const handleAddServer = (e) => {
    e.preventDefault()

    if (!newServerUrl.trim()) {
      setError("Please enter a server URL")
      return
    }

    if (isRenderUrl(newServerUrl.trim())) {
      setShowRenderWarning(true)
      return
    }

    addServerToAPI()
  }

  const addServerToAPI = async () => {
    setIsSubmitting(true)
    setError("")
    try {
      const response = await fetch(`${API_BASE_URL}/servers/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        mode: "cors",
        body: JSON.stringify({ NewUrl: newServerUrl.trim() }),
      })

      const result = await response.json()
      if (response.ok) {
        setNewServerUrl("")
        setShowAddForm(false)
        await fetchDashboardData()
      } else {
        setError(result?.error || result?.message || "Failed to add server")
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRenderWarningAgree = () => {
    setShowRenderWarning(false)
    addServerToAPI()
  }

  const handleRenderWarningClose = () => {
    setShowRenderWarning(false)
  }

  const handleDeleteServer = async (serverId) => {
    if (!confirm("Are you sure you want to delete this server?")) return
    try {
      const response = await fetch(`${API_BASE_URL}/servers/${serverId}`, {
        method: "DELETE",
        credentials: "include",
        mode: "cors",
      })
      if (response.ok) {
        await fetchDashboardData()
      } else {
        const result = await response.json()
        setError(result?.error || result?.message || "Failed to delete server")
      }
    } catch {
      setError("Network error. Please try again.")
    }
  }

  const overallStats = data?.stats

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4">
        <div className="flex items-center space-x-2 text-white">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading dashboard...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation Bar */}
      <nav className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Server className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold text-white">Server Monitor</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-slate-300 text-sm">Dashboard</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto max-w-7xl py-6 px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
        </div>

        {/* Stats Cards */}
        {data && (
          <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
              <CardContent className="p-3 md:p-4 text-center">
                <div className="flex items-center justify-center space-x-1 md:space-x-2 mb-1 md:mb-2">
                  <Server className="h-3 w-3 md:h-4 md:w-4 text-blue-400" />
                  <span className="text-xs md:text-sm text-slate-400">Total</span>
                </div>
                <div className="text-xl md:text-2xl font-bold text-blue-400">{data.currentCount || 0}</div>
                <div className="text-xs text-slate-500">of {data.maxServers}</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
              <CardContent className="p-3 md:p-4 text-center">
                <div className="flex items-center justify-center space-x-1 md:space-x-2 mb-1 md:mb-2">
                  <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-400" />
                  <span className="text-xs md:text-sm text-slate-400">Online</span>
                </div>
                <div className="text-xl md:text-2xl font-bold text-green-400">{overallStats?.online || 0}</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
              <CardContent className="p-3 md:p-4 text-center">
                <div className="flex items-center justify-center space-x-1 md:space-x-2 mb-1 md:mb-2">
                  <AlertCircle className="h-3 w-3 md:h-4 md:w-4 text-red-400" />
                  <span className="text-xs md:text-sm text-slate-400">Offline</span>
                </div>
                <div className="text-xl md:text-2xl font-bold text-red-400">{overallStats?.offline || 0}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 bg-red-900/50 border-red-700 text-red-300">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Add Server Button */}
        <div className="mb-6">
          <Button
            onClick={() => {
              setShowAddForm(true)
              setNewServerUrl("")
              setError("")
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto"
            disabled={data && data.currentCount >= data.maxServers}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Server
          </Button>
        </div>

        {/* Add Server Form */}
        {showAddForm && (
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 mb-6">
            <CardHeader>
              <CardTitle className="text-white text-lg md:text-xl">Add New Server</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="serverUrl" className="text-slate-300">
                    Server URL
                  </Label>
                  <Input
                    id="serverUrl"
                    type="url"
                    placeholder="https://example.com"
                    value={newServerUrl}
                    onChange={(e) => setNewServerUrl(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleAddServer}
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      "Add Server"
                    )}
                  </Button>
                  <Button
                    onClick={() => {
                      setShowAddForm(false)
                      setNewServerUrl("")
                      setError("")
                    }}
                    variant="outline"
                    className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Servers Grid */}
        {!data?.servers || data.servers.length === 0 ? (
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
            <CardContent className="p-6 md:p-8 text-center">
              <Globe className="h-10 w-10 md:h-12 md:w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">No servers added yet</h3>
              <p className="text-sm md:text-base text-slate-400 mb-4">Add your first server to start monitoring</p>
              <Button
                onClick={() => {
                  setShowAddForm(true)
                  setNewServerUrl("")
                  setError("")
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Server
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.servers.map((server) => (
              <ServerItem key={server.id} server={server} onDelete={handleDeleteServer} />
            ))}
          </div>
        )}
      </div>

        {/* Render Warning Popup */}
        <RenderWarningPopup
          isOpen={showRenderWarning}
          onClose={handleRenderWarningClose}
          onAgree={handleRenderWarningAgree}
        />
      </div>
    </div>
  )
}
