'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Loader2,
  Plus,
  Globe,
  AlertCircle,
  CheckCircle,
  Search,
  Filter,
  Server,
  X,
  Trash2,
  AlertTriangle,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const API_BASE_URL = 'https://thewatchtower.onrender.com';

function RenderWarningPopup({ isOpen, onClose, onAgree }) {
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

function calculateUptime(createdAt) {
  try {
    if (!createdAt || createdAt === 'undefined' || createdAt === 'null') {
      return 'No data';
    }
    const createdDate = new Date(createdAt);
    const now = new Date();
    if (isNaN(createdDate.getTime()) || createdDate.getTime() > now.getTime()) {
      return 'Invalid date';
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
    return parts.slice(0, 2).join(' ');
  } catch {
    return 'Error';
  }
}

function useUptime(createdAt) {
  const [uptime, setUptime] = useState(() => calculateUptime(createdAt));

  useEffect(() => {
    const updateUptime = () => {
      setUptime(calculateUptime(createdAt));
    };
    if (createdAt) {
      updateUptime();
      const interval = setInterval(updateUptime, 1000);
      return () => clearInterval(interval);
    }
  }, [createdAt]);

  return uptime;
}

function ServerItem({ server, onDelete }) {
  const uptime = useUptime(server.createdAt);
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusDisplay = (status) => {
    switch (status) {
      case 'online':
        return {
          icon: <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>,
          color: 'text-green-400',
          text: 'Online',
        };
      case 'offline':
        return {
          icon: <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>,
          color: 'text-red-400',
          text: 'Offline',
        };
      case 'checking':
        return {
          icon: (
            <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse"></div>
          ),
          color: 'text-blue-400',
          text: 'Checking',
        };
      default:
        return {
          icon: <div className="w-2.5 h-2.5 rounded-full bg-slate-400"></div>,
          color: 'text-slate-400',
          text: 'Unknown',
        };
    }
  };

  const statusDisplay = getStatusDisplay(server.status);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(server.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Card className="bg-slate-800/90 border-slate-700 hover:bg-slate-800/95 transition-all">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Status Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {statusDisplay.icon}
              <span
                className={cn('font-semibold text-sm', statusDisplay.color)}>
                {statusDisplay.text}
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-slate-400 hover:text-white transition-colors flex items-center space-x-1">
              <span className="text-sm font-medium">
                {isExpanded ? 'Hide' : 'Details'}
              </span>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* URL Row */}
          <div className="flex items-start space-x-2">
            <p className="text-white text-sm break-all flex-1 leading-relaxed">
              {server.url}
            </p>
            <button
              onClick={handleCopy}
              className="text-slate-400 hover:text-white transition-colors flex-shrink-0 mt-0.5"
              title="Copy URL">
              {copied ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Dropdown Details */}
          {isExpanded && (
            <div className="pt-3 border-t border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Uptime</span>
                <span className="text-white font-medium text-sm">{uptime}</span>
              </div>

              {server.lastCheck && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Last Checked</span>
                  <span className="text-slate-300 text-sm">
                    {new Date(server.lastCheck).toLocaleString()}
                  </span>
                </div>
              )}

              {server.responseTime !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Response Time</span>
                  <span className="text-slate-300 text-sm">
                    {server.responseTime}ms
                  </span>
                </div>
              )}

              <Button
                onClick={() => onDelete(server.id)}
                variant="outline"
                size="sm"
                className="w-full bg-red-700/80 border-red-600/80 text-white hover:bg-red-700 hover:border-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Server
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newServerUrl, setNewServerUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showRenderWarning, setShowRenderWarning] = useState(false);

  const isRenderUrl = (url) => {
    return url.toLowerCase().includes('onrender');
  };

  const fetchDashboardData = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/servers/`, {
        credentials: 'include',
        mode: 'cors',
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          window.location.href = '/'; // Redirect to login on auth error
          return;
        }
        throw new Error('Failed to fetch servers');
      }

      const json = await res.json();
      const servers = (json?.servers || []).map((s) => ({
        id: s.id,
        url: s.url,
        status: s.status ?? 'checking',
        lastCheck: s.lastCheck,
        createdAt: s.createdAt,
        responseTime: s.responseTime,
        consecutiveFailures: s.consecutiveFailures,
      }));

      const stats = servers.reduce(
        (acc, s) => {
          acc.total += 1;
          if (s.status === 'online') acc.online += 1;
          else if (s.status === 'offline') acc.offline += 1;
          else acc.checking += 1;
          return acc;
        },
        { total: 0, online: 0, offline: 0, checking: 0 }
      );

      setData({
        servers,
        maxServers: 100,
        currentCount: servers.length,
        stats,
      });
      setError('');
    } catch (err) {
      console.error('Error fetching dashboard:', err);
      setError(
        'Failed to load dashboard data. Please try refreshing the page.'
      );
    }
  }, []);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      await fetchDashboardData();
      setLoading(false);
    };
    loadDashboard();

    // Set up polling to refresh data every 30 seconds
    const pollingInterval = setInterval(fetchDashboardData, 30000);

    return () => {
      clearInterval(pollingInterval);
    };
  }, [fetchDashboardData]);

  const handleAddServer = async (e) => {
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
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({ NewUrl: newServerUrl.trim() }),
      });

      const result = await response.json();
      if (response.ok) {
        setNewServerUrl('');
        setShowAddForm(false);
        await fetchDashboardData();
      } else {
        setError(result?.error || result?.message || 'Failed to add server');
      }
    } catch {
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

  const handleDeleteServer = async (serverId) => {
    if (!window.confirm('Are you sure you want to delete this server?')) return;
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
        setError(result?.error || result?.message || 'Failed to delete server');
      }
    } catch {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-white">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 sm:mb-0">
            Dashboard
          </h1>
        </div>

        {/* Stats Cards */}
        {data && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-slate-800/90 border-slate-700">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Server className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-slate-400">Total Servers</span>
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
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 bg-red-900/50 border-red-700 text-red-300">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search servers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500"
              />
            </div>

            {/* Status Filter */}
            <div className="relative sm:w-48">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 text-white rounded-md focus:border-blue-500 focus:outline-none appearance-none">
                <option value="all">All Status</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="checking">Checking</option>
              </select>
            </div>
          </div>

          {/* Add Server Button */}
          <Button
            onClick={() => {
              setShowAddForm(true);
              setNewServerUrl('');
              setError('');
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
            disabled={data && data.currentCount >= data.maxServers}>
            <Plus className="h-4 w-4 mr-2" />
            Add Server
          </Button>
        </div>

        {/* Add Server Form */}
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

                <div className="flex flex-col sm:flex-row gap-3">
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

        {/* Servers List */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredServers.map((server) => (
              <ServerItem
                key={server.id}
                server={server}
                onDelete={handleDeleteServer}
              />
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
  );
}
