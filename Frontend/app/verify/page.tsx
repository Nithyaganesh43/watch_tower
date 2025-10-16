'use client';

import { useEffect, useState } from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const API_BASE_URL = 'https://thewatchtower.onrender.com';

export default function VerifyPage() {
  const [verificationStatus, setVerificationStatus] = useState<
    'loading' | 'success' | 'error'
  >('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/check`, {
          method: 'GET',
          credentials: 'include',
          mode: 'cors',
        });
        const data = await response.json();

        if (response.ok && data.message === 'Authorized') {
          setVerificationStatus('success');
          setMessage('Authorization successful.');
        } else {
          setVerificationStatus('error');
          setMessage('Unauthorized access detected.');
        }

        setTimeout(() => window.close(), 2000);
      } catch (error) {
        console.error('Error during verification:', error);
        setVerificationStatus('error');
        setMessage('Network error during verification. Please try again.');
      }
    };

    verifyAuth();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800/90 border-slate-700 backdrop-blur-sm text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Authorization Check</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          {verificationStatus === 'loading' && (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-blue-400" />
              <p className="text-lg">Checking authorization...</p>
            </>
          )}
          {verificationStatus === 'success' && (
            <>
              <CheckCircle className="h-12 w-12 text-green-400" />
              <p className="text-lg font-semibold text-center">{message}</p>
            </>
          )}
          {verificationStatus === 'error' && (
            <>
              <AlertCircle className="h-12 w-12 text-red-400" />
              <p className="text-lg font-semibold text-center">{message}</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
