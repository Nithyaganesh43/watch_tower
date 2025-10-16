'use client';
import { useState } from 'react';
import Navbar from '@/components/ui/navbar';
import {
  Clock,
  Mail,
  Shield,
  Server,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  X,
} from 'lucide-react';

const HowItWorksPage = () => {
  const [showCoffeePopup, setShowCoffeePopup] = useState(false);

  const features = [
    {
      icon: <Clock className="w-8 h-8 text-blue-400" />,
      title: '5-Minute Monitoring',
      description:
        'Your servers are checked every 5 minutes, 24/7, ensuring continuous uptime monitoring without overwhelming your resources.',
    },
    {
      icon: <Mail className="w-8 h-8 text-red-400" />,
      title: 'Instant Email Alerts',
      description:
        "Get immediate notifications when your server goes down. After 3 consecutive failures, we'll send you an alert email with details.",
    },
    {
      icon: <Shield className="w-8 h-8 text-green-400" />,
      title: 'Smart Pause System',
      description:
        'After 3 failures, monitoring automatically pauses to prevent spam. Easily restart monitoring with one click when ready.',
    },
    {
      icon: <Server className="w-8 h-8 text-purple-400" />,
      title: 'Multiple Server Support',
      description:
        'Monitor up to 10 servers simultaneously. Each server gets its own dashboard with detailed statistics and history.',
    },
  ];

  const steps = [
    {
      step: '1',
      title: 'Add Your Server',
      description:
        "Simply enter your server URL (HTTP/HTTPS). We'll validate it and start monitoring immediately.",
      color: 'bg-blue-500',
    },
    {
      step: '2',
      title: 'Continuous Monitoring',
      description:
        "Every 5 minutes, we send a request to your server to check if it's responding properly.",
      color: 'bg-green-500',
    },
    {
      step: '3',
      title: 'Real-time Dashboard',
      description:
        'View live status, response times, uptime percentage, and detailed history for each server.',
      color: 'bg-purple-500',
    },
    {
      step: '4',
      title: 'Smart Notifications',
      description:
        'Get email alerts only when needed. After 3 consecutive failures, we notify you and pause monitoring.',
      color: 'bg-red-500',
    },
  ];

  const benefits = [
    '🚀 Free server monitoring for developers and small businesses',
    '🛡️ Keep Render free tier servers awake 24/7 - guaranteed!',
    '🔔 Smart alerting system that prevents notification spam',
    '💻 Clean, intuitive dashboard for all your servers',
    '📱 Mobile-responsive interface for monitoring on-the-go',
    '🔒 Secure authentication with device verification',
    '📈 Historical data and performance trends',
    '⚡ Quick server restart and management controls',
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-16">
        {/* Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <img
                src="/images/design-mode/u7oimuieazrfxzv4sl5n.avif"
                alt="WatchTower Logo"
                className="w-20 h-20 mx-auto mb-8 rounded-full shadow-lg"
              />
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                How <span className="text-blue-400">WatchTower</span> Works
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Your reliable, free server monitoring solution that keeps your
                services running smoothly with intelligent 5-minute health
                checks.
              </p>
            </div>
          </div>
        </div>

        {/* Visual Overview */}
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              The Complete Picture
            </h2>
            <p className="text-gray-300 text-lg">
              See how our centralized monitoring system works
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="/images/design-mode/f22mt6lnihzmejdjdg1p.avif"
                alt="Centralized Server Management"
                className="w-full rounded-2xl shadow-2xl border border-blue-500/30"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h3 className="text-3xl font-bold text-white">
                Centralized Monitoring Hub
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Our system acts as a central command center, continuously
                monitoring all your servers from a single point. This approach
                ensures consistent, reliable monitoring while providing you with
                a unified view of your entire infrastructure.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
                  <CheckCircle className="w-8 h-8 text-green-400 mb-2" />
                  <h4 className="font-semibold text-white">Always Online</h4>
                  <p className="text-sm text-gray-300">
                    24/7 monitoring service
                  </p>
                </div>
                <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                  <AlertTriangle className="w-8 h-8 text-yellow-400 mb-2" />
                  <h4 className="font-semibold text-white">Smart Alerts</h4>
                  <p className="text-sm text-gray-300">
                    Intelligent notifications
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Steps */}
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-gray-300 text-lg">
              From setup to monitoring in minutes
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 h-full">
                  <div
                    className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center text-white font-bold text-xl mb-6`}>
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Monitoring Flow */}
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">
                Monitoring Flow Process
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Our intelligent monitoring system follows a carefully designed
                flow to ensure reliable service while preventing unnecessary
                alerts. Here's exactly what happens every 5 minutes:
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">
                      Health Check Initiated
                    </h4>
                    <p className="text-gray-300">
                      System sends HTTP request to your server
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300">
                      Response time and status code are recorded
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <AlertTriangle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">
                      Smart Decision Making
                    </h4>
                    <p className="text-gray-300">
                      Success continues monitoring, failure triggers alert logic
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Pause className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">
                      Auto-Pause Protection
                    </h4>
                    <p className="text-gray-300">
                      After 3 failures, monitoring pauses and alert is sent
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="/images/design-mode/pxdqoqpyybaxbzqxrdeq.avif"
                alt="Monitoring Flowchart"
                className="w-full rounded-2xl shadow-2xl border border-purple-500/30"
              />
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-gray-300 text-lg">
              Everything you need for comprehensive server monitoring
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-3xl p-12 border border-blue-500/30">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Why Choose WatchTower?
              </h2>
              <p className="text-gray-300 text-lg">
                Built for developers, by developers
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
                  <span className="text-2xl">{benefit.split(' ')[0]}</span>
                  <span className="text-gray-300">
                    {benefit.split(' ').slice(1).join(' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Technical Specifications
            </h2>
            <p className="text-gray-300 text-lg">
              Reliable monitoring with smart defaults
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">
                Monitoring Frequency
              </h3>
              <p className="text-gray-300 mb-4">Every 5 minutes, 24/7</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• 288 checks per day per server</li>
                <li>• 10-second timeout per request</li>
                <li>• HTTP and HTTPS support</li>
                <li>• Response time tracking</li>
              </ul>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50">
              <h3 className="text-2xl font-bold text-green-400 mb-4">
                Alert System
              </h3>
              <p className="text-gray-300 mb-4">Smart failure detection</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• 3 consecutive failures trigger alert</li>
                <li>• Email notifications with details</li>
                <li>• Auto-pause after alert sent</li>
                <li>• One-click restart monitoring</li>
              </ul>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50">
              <h3 className="text-2xl font-bold text-purple-400 mb-4">
                Data & Limits
              </h3>
              <p className="text-gray-300 mb-4">Generous free tier</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Up to 10 servers per account</li>
                <li>• 30 days of historical data</li>
                <li>• Detailed uptime statistics</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Render Special Feature */}
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-3xl p-12 border border-green-500/30">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4">
                🚀 Special for Render Users
              </h2>
              <p className="text-gray-300 text-lg">
                Keep your free Render services alive 24/7
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="bg-red-900/30 p-6 rounded-xl border border-red-500/30">
                  <h3 className="text-xl font-bold text-red-300 mb-3">
                    ❌ Without WatchTower
                  </h3>
                  <p className="text-gray-300">
                    Render free tier servers sleep after 15 minutes of
                    inactivity, causing downtime and slow cold starts for your
                    users.
                  </p>
                </div>

                <div className="bg-green-900/30 p-6 rounded-xl border border-green-500/30">
                  <h3 className="text-xl font-bold text-green-300 mb-3">
                    ✅ With WatchTower
                  </h3>
                  <p className="text-gray-300">
                    Our 5-minute pings keep your Render server awake 24/7.{' '}
                    <strong className="text-white">
                      We guarantee your server will never sleep!
                    </strong>
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/50 p-8 rounded-2xl border border-yellow-500/30">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                  ⚠️ Important Constraint
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    <strong className="text-white">
                      Keep only ONE server per Render account under WatchTower
                      monitoring.
                    </strong>
                  </p>
                  <p className="text-gray-300 text-sm">
                    Monitoring multiple servers from the same Render account may
                    exceed the free tier limits and could result in charges.
                  </p>
                  <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
                    <p className="text-blue-300 text-sm">
                      💡 <strong>Pro Tip:</strong> Choose your most important
                      server for monitoring to maximize uptime while staying
                      within free limits.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-12 border border-blue-500/30">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Monitor Your Servers?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of developers who trust WatchTower to keep their
              services running smoothly. Start monitoring in less than 2
              minutes.
            </p>
            <div className="flex justify-center">
              <a
                href="https://watchtower-24-7.vercel.app"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors duration-200 transform hover:scale-105 inline-block">
                Start Monitoring Now
              </a>
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
    </>
  );
};

export default HowItWorksPage;
