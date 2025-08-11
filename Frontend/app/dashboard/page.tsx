'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import type React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Navbar from '@/components/ui/navbar';
import {
  Loader2,
  Plus,
  Globe,
  AlertCircle,
  CheckCircle,
  Search,
  Filter,
  TrendingUp,
  Server,
  X,
  Trash2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Clock,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const API_BASE_URL = 'https://servermonitoringsystembyng.onrender.com';

interface ServerData {
  _id: string;
  url: string;
  status: 'online' | 'offline' | 'checking';
  responseTime?: number;
  lastCheck?: string;
  alertEnabled: boolean;
  consecutiveFailures: number;
  createdAt?: string;
}

interface DashboardData {
  servers: ServerData[];
  maxServers: number;
  currentCount: number;
  stats: {
    total: number;
    online: number;
    offline: number;
    checking: number;
  };
}

function RenderWarningPopup({
  isOpen,
  onClose,
  onAgree,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-slate-800 border-slate-700 max-w-md w-full">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <CardTitle className="text-white text-lg">
                Render.com Server Detected
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 text-slate-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h3 className="text-yellow-400 font-semibold mb-2">
              Important: Render Free Tier Limitations
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              You are getting 24/7 uptime for free — but remember this:
            </p>
            <ul className="text-slate-300 text-sm mt-2 space-y-1 list-disc list-inside">
              <li>
                One Render account = One always-awake server on the free tier
              </li>
              <li>
                For more always-awake servers, create a new Render account for
                each one
              </li>
              <li>
                Don't keep two or more servers always awake on the same Render
                account — you'll burn through the 750 free instance hours and
                they'll go offline before month end
              </li>
            </ul>
          </div>

          <div className="flex space-x-3 pt-2">
            <Button
              onClick={onAgree}
              className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white">
              I Agree
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function calculateUptimeAndPings(createdAt: string | undefined) {
  try {
    if (!createdAt || createdAt === 'undefined' || createdAt === 'null') {
      return { uptime: 'No data', totalPings: 0 };
    }

    const createdDate = new Date(createdAt);
    const now = new Date();

    if (isNaN(createdDate.getTime()) || createdDate.getTime() > now.getTime()) {
      return { uptime: 'Invalid date', totalPings: 0 };
    }

    const totalMs = now.getTime() - createdDate.getTime();
    const totalSeconds = Math.floor(totalMs / 1000);

    const d = Math.floor(totalSeconds / 86400);
    const h = Math.floor((totalSeconds % 86400) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    const parts = [];
    if (d > 0) parts.push(`${d}d`);
    if (h > 0) parts.push(`${h}h`);
    if (m > 0) parts.push(`${m}m`);
    if (s > 0 || parts.length === 0) parts.push(`${s}s`);

    const uptime = parts.slice(0, 2).join(' ');

    const totalMinutes = Math.floor(totalMs / (1000 * 60));
    const totalPings = Math.max(0, Math.floor(totalMinutes / 5));

    return { uptime, totalPings };
  } catch (error) {
    return { uptime: 'Error', totalPings: 0 };
  }
}

function useUptimeAndPings(createdAt: string | undefined) {
  const [uptimeData, setUptimeData] = useState(() =>
    calculateUptimeAndPings(createdAt)
  );

  useEffect(() => {
    const updateValues = () => {
      setUptimeData(calculateUptimeAndPings(createdAt));
    };

    if (createdAt) {
      updateValues();
      const interval = setInterval(updateValues, 1000);
      return () => clearInterval(interval);
    }
  }, [createdAt]);

  return uptimeData;
}

function ServerItem({
  server,
  onDelete,
}: {
  server: ServerData;
  onDelete: (id: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { uptime, totalPings } = useUptimeAndPings(server.createdAt);

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'online':
        return {
          icon: <div className="w-3 h-3 rounded-full bg-green-400"></div>,
          color: 'text-green-400',
          bgColor: 'bg-green-400/10',
          borderColor: 'border-green-400/20',
        };
      case 'offline':
        return {
          icon: <div className="w-3 h-3 rounded-full bg-red-400"></div>,
          color: 'text-red-400',
          bgColor: 'bg-red-400/10',
          borderColor: 'border-red-400/20',
        };
      case 'checking':
        return {
          icon: (
            <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
          ),
          color: 'text-blue-400',
          bgColor: 'bg-blue-400/10',
          borderColor: 'border-blue-400/20',
        };
      default:
        return {
          icon: <div className="w-3 h-3 rounded-full bg-slate-400"></div>,
          color: 'text-slate-400',
          bgColor: 'bg-slate-400/10',
          borderColor: 'border-slate-400/20',
        };
    }
  };

  const statusDisplay = getStatusDisplay(server.status);

  return (
    <Card className="bg-slate-800/90 border-slate-700 hover:bg-slate-800/95 transition-colors">
      <div
        className="p-4 cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          {statusDisplay.icon}
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-white truncate font-medium">
              {server.url}
            </span>
            <div className="flex items-center space-x-4 mt-1">
              <span
                className={cn(
                  'text-sm font-semibold capitalize',
                  statusDisplay.color
                )}>
                {server.status}
              </span>
             
               
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-slate-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-slate-400" />
          )}
        </div>
      </div>

      {isExpanded && (
        <CardContent className="pt-0 px-4 pb-4 border-t border-slate-700">
          <div className="space-y-4">
            <div>
              <span className="text-slate-400 text-sm">Server URL:</span>
              <p className="text-white font-medium break-all">{server.url}</p>
            </div>

            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="h-4 w-4 text-blue-400 mr-1" />
                  <span className="text-slate-400 text-sm">Response Time</span>
                </div>
                <p className="font-semibold text-blue-400">
                  {server.responseTime
                    ? `${Math.round(server.responseTime)}ms`
                    : 'N/A'}
                </p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center mb-2">
                  <AlertCircle className="h-4 w-4 text-red-400 mr-1" />
                  <span className="text-slate-400 text-sm">Failures</span>
                </div>
                <p className="font-semibold text-red-400">
                  {server.consecutiveFailures || 0}
                </p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-4 w-4 text-purple-400 mr-1" />
                  <span className="text-slate-400 text-sm">Uptime</span>
                </div>
                <p className="font-semibold text-purple-400">{uptime}</p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-slate-400 text-sm">Total Pings</span>
                </div>
                <p className="font-semibold text-green-400">{totalPings}</p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <Button
                onClick={() => onDelete(server._id)}
                variant="outline"
                size="sm"
                className="bg-red-700/20 border-red-600/50 text-red-300 hover:bg-red-600/30 hover:border-red-500 transition-colors">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Server
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newServerUrl, setNewServerUrl] = useState('');
  const [newServerAlertEnabled, setNewServerAlertEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showRenderWarning, setShowRenderWarning] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  const isRenderUrl = (url: string) => {
    return url.toLowerCase().includes('onrender');
  };

  const fetchDashboardData = useCallback(
    async (showLoadingState = false) => {
      if (showLoadingState) {
        setIsRefreshing(true);
      }

      try {
        const statusResponse = await fetch(`${API_BASE_URL}/servers/status`, {
          credentials: 'include',
          mode: 'cors',
        });

        const allServersResponse = await fetch(`${API_BASE_URL}/servers`, {
          credentials: 'include',
          mode: 'cors',
        });

        if (
          statusResponse.status === 429 ||
          allServersResponse.status === 429
        ) {
          setIsRateLimited(true);
          setError('Rate limited. Please wait before refreshing again.');
          return;
        }

        if (!statusResponse.ok || !allServersResponse.ok) {
          if (
            statusResponse.status === 401 ||
            allServersResponse.status === 401
          ) {
            router.push('/');
            return;
          }
          throw new Error('Failed to fetch dashboard data');
        }

        setIsRateLimited(false);

        const statusResult = await statusResponse.json();
        const allServersResult = await allServersResponse.json();

        const mergedServers = allServersResult.servers.map(
          (server: ServerData) => {
            const statusData = statusResult.servers.find(
              (s: ServerData) => s._id === server._id
            );

            return {
              _id: server._id,
              url: server.url,
              createdAt: server.createdAt,
              alertEnabled: server.alertEnabled,
              status: statusData?.status || 'checking',
              responseTime: statusData?.responseTime,
              lastCheck: statusData?.lastCheck,
              consecutiveFailures: statusData?.consecutiveFailures || 0,
            };
          }
        );

        setData({
          servers: mergedServers,
          maxServers: allServersResult.maxServers,
          currentCount: allServersResult.currentCount,
          stats: statusResult.stats,
        });
        setError('');
      } catch (err) {
        setError('Failed to load dashboard data');
        setIsRateLimited(false);
      } finally {
        if (showLoadingState) {
          setIsRefreshing(false);
        }
      }
    },
    [router]
  );

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      await fetchDashboardData();
      setLoading(false);
    };

    loadDashboard();
  }, [fetchDashboardData]);

  const handleManualRefresh = () => {
    if (!isRateLimited && !isRefreshing) {
      fetchDashboardData(true);
    }
  };

  const handleAddServer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newServerUrl.trim()) {
      setError('Please enter a server URL');
      return;
    }

    if (isRenderUrl(newServerUrl.trim())) {
      setShowRenderWarning(true);
      return;
    }

    await addServerToAPI();
  };

  const addServerToAPI = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/servers/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({
          url: newServerUrl.trim(),
          alertEnabled: newServerAlertEnabled,
        }),
      });

      if (response.status === 429) {
        setError(
          'Too many requests. Please wait a moment before trying again.'
        );
        setIsSubmitting(false);
        return;
      }

      const result = await response.json();

      if (response.ok) {
        setNewServerUrl('');
        setNewServerAlertEnabled(false);
        setShowAddForm(false);
        await fetchDashboardData();
      } else {
        setError(result.error || 'Failed to add server');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRenderWarningAgree = () => {
    setShowRenderWarning(false);
    addServerToAPI();
  };

  const handleRenderWarningClose = () => {
    setShowRenderWarning(false);
  };

  const handleDeleteServer = async (serverId: string) => {
    if (!confirm('Are you sure you want to delete this server?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/servers/${serverId}`, {
        method: 'DELETE',
        credentials: 'include',
        mode: 'cors',
      });

      if (response.ok) {
        await fetchDashboardData();
      } else {
        const result = await response.json();
        setError(result.error || 'Failed to delete server');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  const filteredServers =
    data?.servers.filter((server) => {
      const matchesSearch = server.url
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'online' && server.status === 'online') ||
        (statusFilter === 'offline' && server.status === 'offline') ||
        (statusFilter === 'checking' && server.status === 'checking');

      return matchesSearch && matchesStatus;
    }) || [];

  const overallStats = data?.stats;

  const avgUptime =
    overallStats && overallStats.total > 0
      ? (overallStats.online / overallStats.total) * 100
      : 0;

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center pt-16">
          <div className="flex items-center space-x-2 text-white">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading dashboard...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              </div>
              <Button
                onClick={handleManualRefresh}
                disabled={isRateLimited || isRefreshing}
                variant="outline"
                size="sm"
                className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600">
                {isRefreshing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Refresh'
                )}
              </Button>
            </div>
          </div>

          {data && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-slate-800/90 border-slate-700">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Server className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-slate-400">
                      Total Servers
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-blue-400">
                    {data.currentCount || 0}
                  </div>
                  <div className="text-xs text-slate-500">
                    of {data.maxServers} max
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/90 border-slate-700">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-slate-400">Online</span>
                  </div>
                  <div className="text-2xl font-bold text-green-400">
                    {overallStats?.online || 0}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/90 border-slate-700">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <span className="text-sm text-slate-400">Offline</span>
                  </div>
                  <div className="text-2xl font-bold text-red-400">
                    {overallStats?.offline || 0}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/90 border-slate-700">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-purple-400" />
                    <span className="text-sm text-slate-400">Avg Uptime</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-400">
                    {avgUptime.toFixed(1)}%
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {error && (
            <Alert className="mb-6 bg-red-900/50 border-red-700 text-red-300">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search servers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 text-white rounded-md focus:border-blue-500 focus:outline-none">
                  <option value="all">All Status</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="checking">Checking</option>
                </select>
              </div>
            </div>

            <Button
              onClick={() => {
                setShowAddForm(true);
                setNewServerUrl('');
                setNewServerAlertEnabled(false);
                setError('');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={data && data.currentCount >= data.maxServers}>
              <Plus className="h-4 w-4 mr-2" />
              Add Server
            </Button>
          </div>

          {showAddForm && (
            <Card className="bg-slate-800/90 border-slate-700 mb-6">
              <CardHeader>
                <CardTitle className="text-white">Add New Server</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddServer} className="space-y-4">
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
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="serverAlert"
                      checked={newServerAlertEnabled}
                      onChange={(e) =>
                        setNewServerAlertEnabled(e.target.checked)
                      }
                      className="h-5 w-5 rounded text-blue-500 focus:ring-blue-500 bg-slate-700 border-slate-600 focus:ring-2"
                    />
                    <Label htmlFor="serverAlert" className="text-slate-300">
                      Enable email alerts for this server
                    </Label>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 text-white">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        'Add Server'
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowAddForm(false);
                        setNewServerUrl('');
                        setNewServerAlertEnabled(false);
                        setError('');
                      }}
                      className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600">
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Server Accordion List */}
          <div className="space-y-3">
            {filteredServers.length === 0 ? (
              <Card className="bg-slate-800/90 border-slate-700">
                <CardContent className="p-8 text-center">
                  <Globe className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {data?.servers.length === 0
                      ? 'No servers added yet'
                      : 'No servers match your filters'}
                  </h3>
                  <p className="text-slate-400 mb-4">
                    {data?.servers.length === 0
                      ? 'Add your first server to start monitoring'
                      : 'Try adjusting your search or filter criteria'}
                  </p>
                  {data?.servers.length === 0 && (
                    <Button
                      onClick={() => {
                        setShowAddForm(true);
                        setNewServerUrl('');
                        setNewServerAlertEnabled(false);
                        setError('');
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Server
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              filteredServers.map((server) => (
                <ServerItem
                  key={server._id}
                  server={server}
                  onDelete={handleDeleteServer}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <RenderWarningPopup
        isOpen={showRenderWarning}
        onClose={handleRenderWarningClose}
        onAgree={handleRenderWarningAgree}
      />
    </>
  );
}
