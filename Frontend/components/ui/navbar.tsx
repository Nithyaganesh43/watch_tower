'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X, Home, UserIcon, LogOut } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const API_BASE_URL = 'https://servermonitoringsystembyng.onrender.com';

interface UserData {
  email: string;
  name?: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUser({ email: storedEmail });
    } else {
      setUser(null);
    }
  }, []);

  const handleGetStarted = () => router.push('/get-started');
  const handleHowItWorks = () => router.push('/how-it-works');
  const handleHome = () => router.push('/');
  const handleDashboard = () => router.push('/dashboard');

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('userEmail');
      localStorage.removeItem('deviceId');
      setUser(null);
      router.push('/');
      setShowLogoutDialog(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={handleHome}>
              <img
                src="https://res.cloudinary.com/dflgxymvs/image/upload/v1753945877/lecrowninteriors/u7oimuieazrfxzv4sl5n.avif"
                alt="Watch Tower Logo"
                className="w-10 h-10 rounded-lg"
              />
              <span className="text-xl font-bold text-white">Watch Tower</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {!user && (
                <button
                  onClick={handleHome}
                  className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </button>
              )}
              {user && (
                <button
                  onClick={handleDashboard}
                  className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </button>
              )}
              <button
                onClick={handleHowItWorks}
                className="text-slate-300 hover:text-white transition-colors font-bold">
                How It Works
              </button>

              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-slate-300">
                    <UserIcon className="w-4 h-4" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <button
                    onClick={() => setShowLogoutDialog(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleGetStarted}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors duration-200 text-lg">
                  Get Started
                </button>
              )}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-300 hover:text-white transition-colors">
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-800/95 rounded-lg mt-2">
                {!user && (
                  <button
                    onClick={() => {
                      handleHome();
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors">
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </button>
                )}
                {user && (
                  <button
                    onClick={() => {
                      handleDashboard();
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors">
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    handleHowItWorks();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors font-bold">
                  How It Works
                </button>

                {user ? (
                  <>
                    <div className="flex items-center space-x-2 px-3 py-2 text-slate-300 border-t border-slate-700 mt-2 pt-2">
                      <UserIcon className="w-4 h-4" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                    <button
                      onClick={() => {
                        setShowLogoutDialog(true);
                        setIsOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full text-left px-3 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors">
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      handleGetStarted();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition-colors">
                    Get Started
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Confirm Logout
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-300">
              Sure, want to logout your account{' '}
              <span className="font-semibold text-white">{user?.email}</span>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-white">
              Stay logged in
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white">
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
