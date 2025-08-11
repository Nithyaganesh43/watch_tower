"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Clock, Activity, TrendingUp, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const API_BASE_URL = "https://servermonitoringsystembyng.onrender.com"

interface PingData {
  pingTime: string
  responseTime: number
  isSuccess: boolean
  statusCode?: number
  errorMessage?: string
}

interface ServerInfo {
  _id: string
  url: string
  index: number
}

interface Statistics {
  totalPings: number
  successfulPings: number
  avgResponseTime: number
  minResponseTime: number
  maxResponseTime: number
  uptime: number
}

interface PingHistoryData {
  server: ServerInfo
  history: PingData[]
  statistics: Statistics
  timeRange: string
}

interface PingHistoryChartProps {
  serverId: string
  serverUrl: string
}

const TIME_RANGES = [
  { value: "1h", label: "1 Hour", blocks: 24, duration: 2.5 * 60 * 1000 }, // 2.5 min per block
  { value: "6h", label: "6 Hours", blocks: 24, duration: 15 * 60 * 1000 }, // 15 min per block
  { value: "24h", label: "24 Hours", blocks: 48, duration: 30 * 60 * 1000 }, // 30 min per block
  { value: "7d", label: "7 Days", blocks: 42, duration: 4 * 60 * 60 * 1000 }, // 4 hours per block
  { value: "30d", label: "30 Days", blocks: 30, duration: 24 * 60 * 60 * 1000 }, // 1 day per block
]

export function PingHistoryChart({ serverId, serverUrl }: PingHistoryChartProps) {
  const [data, setData] = useState<PingHistoryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedRange, setSelectedRange] = useState("24h")

  const fetchPingHistory = async (timeRange: string) => {
    try {
      setLoading(true)
      setError("")

      const response = await fetch(`${API_BASE_URL}/server/history/${serverId}?timeRange=${timeRange}&limit=1000`, {
        credentials: "include",
        mode: "cors",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch ping history")
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      console.error("Error fetching ping history:", err)
      setError("Failed to load ping history")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPingHistory(selectedRange)
  }, [serverId, selectedRange])

  const generateTimelineBlocks = () => {
    if (!data) return []

    const range = TIME_RANGES.find((r) => r.value === selectedRange)
    if (!range) return []

    const now = new Date()
    const blocks = []

    // Create time blocks from now going backwards
    for (let i = 0; i < range.blocks; i++) {
      const blockEnd = new Date(now.getTime() - i * range.duration)
      const blockStart = new Date(blockEnd.getTime() - range.duration)

      // Find pings in this time block
      const pingsInBlock = data.history.filter((ping) => {
        const pingTime = new Date(ping.pingTime)
        return pingTime >= blockStart && pingTime < blockEnd
      })

      let status = "no-data"
      let avgResponseTime = 0
      let successRate = 0

      if (pingsInBlock.length > 0) {
        const successfulPings = pingsInBlock.filter((p) => p.isSuccess).length
        successRate = (successfulPings / pingsInBlock.length) * 100
        avgResponseTime = pingsInBlock.reduce((sum, p) => sum + p.responseTime, 0) / pingsInBlock.length

        if (successRate === 100) {
          status = "online"
        } else if (successRate === 0) {
          status = "offline"
        } else {
          status = "mixed"
        }
      }

      blocks.unshift({
        id: i,
        start: blockStart,
        end: blockEnd,
        status,
        pings: pingsInBlock,
        avgResponseTime,
        successRate,
        totalPings: pingsInBlock.length,
      })
    }

    return blocks
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "offline":
        return "bg-red-500"
      case "mixed":
        return "bg-yellow-500"
      default:
        return "bg-gray-400"
    }
  }

  const formatTime = (date: Date) => {
    if (selectedRange === "1h" || selectedRange === "6h") {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    } else if (selectedRange === "24h") {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    } else if (selectedRange === "7d") {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
      })
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    }
  }

  const blocks = generateTimelineBlocks()

  if (loading) {
    return (
      <Card className="bg-slate-800/90 border-slate-700">
        <CardContent className="flex items-center justify-center p-8">
          <div className="flex items-center space-x-2 text-slate-300">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading ping history...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-slate-800/90 border-slate-700">
        <CardContent className="flex items-center justify-center p-8">
          <div className="flex items-center space-x-2 text-red-400">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Server Info Header */}
      <Card className="bg-slate-800/90 border-slate-700">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <CardTitle className="text-white text-xl">Ping History</CardTitle>
              <p className="text-slate-400 text-sm mt-1 break-all">{serverUrl}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {TIME_RANGES.map((range) => (
                <Button
                  key={range.value}
                  variant={selectedRange === range.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRange(range.value)}
                  className={cn(
                    "text-xs",
                    selectedRange === range.value
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600",
                  )}
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Statistics Cards */}
      {data && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-slate-800/90 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Activity className="h-4 w-4 text-green-400" />
                <span className="text-sm text-slate-400">Uptime</span>
              </div>
              <div className="text-2xl font-bold text-green-400">{data.statistics.uptime.toFixed(1)}%</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/90 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-slate-400">Avg Response</span>
              </div>
              <div className="text-2xl font-bold text-blue-400">{Math.round(data.statistics.avgResponseTime)}ms</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/90 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <TrendingUp className="h-4 w-4 text-purple-400" />
                <span className="text-sm text-slate-400">Total Pings</span>
              </div>
              <div className="text-2xl font-bold text-purple-400">{data.statistics.totalPings}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/90 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <AlertCircle className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-slate-400">Max Response</span>
              </div>
              <div className="text-2xl font-bold text-yellow-400">{Math.round(data.statistics.maxResponseTime)}ms</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Timeline Visualization */}
      <Card className="bg-slate-800/90 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">Timeline Visualization</CardTitle>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-slate-400">Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-slate-400">Offline</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span className="text-slate-400">Mixed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-400 rounded"></div>
              <span className="text-slate-400">No Data</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Desktop View */}
            <div className="hidden md:block">
              <div className="grid grid-cols-12 gap-1 mb-4">
                {blocks.map((block, index) => (
                  <div
                    key={block.id}
                    className={cn(
                      "h-8 rounded cursor-pointer transition-all duration-200 hover:scale-110 hover:z-10 relative group",
                      getStatusColor(block.status),
                    )}
                    title={`${formatTime(block.start)} - ${formatTime(block.end)}\nStatus: ${block.status}\nPings: ${block.totalPings}\nSuccess Rate: ${block.successRate.toFixed(1)}%${block.avgResponseTime > 0 ? `\nAvg Response: ${Math.round(block.avgResponseTime)}ms` : ""}`}
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20 whitespace-nowrap">
                      <div className="font-semibold">
                        {formatTime(block.start)} - {formatTime(block.end)}
                      </div>
                      <div>
                        Status:{" "}
                        <Badge variant="outline" className="text-xs">
                          {block.status}
                        </Badge>
                      </div>
                      <div>Pings: {block.totalPings}</div>
                      <div>Success: {block.successRate.toFixed(1)}%</div>
                      {block.avgResponseTime > 0 && <div>Avg Response: {Math.round(block.avgResponseTime)}ms</div>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Time labels for desktop */}
              <div className="grid grid-cols-6 gap-1 text-xs text-slate-400">
                {[
                  0,
                  Math.floor(blocks.length / 5),
                  Math.floor((blocks.length * 2) / 5),
                  Math.floor((blocks.length * 3) / 5),
                  Math.floor((blocks.length * 4) / 5),
                  blocks.length - 1,
                ].map((index) => (
                  <div key={index} className="text-center">
                    {blocks[index] && formatTime(blocks[index].start)}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden">
              <div className="grid grid-cols-6 gap-1 mb-4">
                {blocks
                  .filter((_, index) => index % 2 === 0)
                  .map((block, index) => (
                    <div
                      key={block.id}
                      className={cn(
                        "h-8 rounded cursor-pointer transition-all duration-200 hover:scale-110 relative group",
                        getStatusColor(block.status),
                      )}
                      title={`${formatTime(block.start)}\nStatus: ${block.status}\nPings: ${block.totalPings}\nSuccess: ${block.successRate.toFixed(1)}%`}
                    >
                      {/* Mobile Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20 whitespace-nowrap">
                        <div className="font-semibold">{formatTime(block.start)}</div>
                        <div>
                          {block.status} ({block.successRate.toFixed(1)}%)
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Time labels for mobile */}
              <div className="grid grid-cols-3 gap-1 text-xs text-slate-400">
                {[0, Math.floor(blocks.length / 2), blocks.length - 1].map((index) => (
                  <div key={index} className="text-center">
                    {blocks[index] && formatTime(blocks[index].start)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Pings Details */}
      {data && data.history.length > 0 && (
        <Card className="bg-slate-800/90 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Recent Pings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {data.history.slice(0, 20).map((ping, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={cn("w-3 h-3 rounded-full", ping.isSuccess ? "bg-green-500" : "bg-red-500")} />
                    <span className="text-slate-300 text-sm">{new Date(ping.pingTime).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-slate-400 text-sm">{Math.round(ping.responseTime)}ms</span>
                    {ping.statusCode && (
                      <Badge variant="outline" className="text-xs">
                        {ping.statusCode}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
