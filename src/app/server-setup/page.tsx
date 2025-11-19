'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useServerStore } from '@/lib/store/server-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Server, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ServerSetupPage() {
  const router = useRouter();
  const { setServerUrl, isConfigured, serverUrl } = useServerStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showReconfigure, setShowReconfigure] = useState(false);
  const [formData, setFormData] = useState({
    apiUrl: serverUrl || '',
  });
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [connectionMessage, setConnectionMessage] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const testConnection = async () => {
    if (!formData.apiUrl) {
      setErrors({ apiUrl: 'API URL is required to test connection' });
      return;
    }

    if (!formData.apiUrl.startsWith('http://') && !formData.apiUrl.startsWith('https://')) {
      setErrors({ apiUrl: 'API URL must start with http:// or https://' });
      return;
    }

    setIsTestingConnection(true);
    setConnectionStatus('testing');
    setConnectionMessage('Testing connection...');
    setErrors({}); // Clear URL errors

    try {
      const validation = await validateServerConnection(formData.apiUrl);

      if (validation.isValid) {
        setConnectionStatus('success');
        setConnectionMessage('✅ Server is healthy and reachable!');
        toast.success('Server connection successful!');
      } else {
        setConnectionStatus('error');
        setConnectionMessage(`❌ ${validation.error}`);
        toast.error('Server connection failed');
      }
    } catch (_: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      setConnectionStatus('error');
      setConnectionMessage('❌ Failed to test connection');
      toast.error('Connection test failed');
    } finally {
      setIsTestingConnection(false);
    }
  };
  
  const validateServerConnection = async (url: string): Promise<{ isValid: boolean; error?: string }> => {
    try {
      // Test basic connectivity first
      const response = await fetch(`${url}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Set a reasonable timeout
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (!response.ok) {
        return {
          isValid: false,
          error: `Server responded with status ${response.status}. Please check if this is a valid Second Brain Database server.`
        };
      }

      const healthData = await response.json();

      // Check if it's a valid Second Brain Database server by looking for expected health response
      if (healthData.status !== 'healthy' && healthData.status !== 'ok') {
        return {
          isValid: false,
          error: 'Server is not responding with expected health status. Please ensure this is a Second Brain Database server.'
        };
      }

      return { isValid: true };
    } catch (error) {
      console.error('Server validation error:', error);

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return {
            isValid: false,
            error: 'Server connection timed out. Please check the URL and ensure the server is running.'
          };
        }

        if (error.message.includes('fetch')) {
          return {
            isValid: false,
            error: 'Cannot connect to server. Please check the URL and ensure the server is accessible.'
          };
        }
      }

      return {
        isValid: false,
        error: 'Failed to validate server connection. Please check the URL and try again.'
      };
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.apiUrl) {
      newErrors.apiUrl = 'API URL is required';
    } else if (!formData.apiUrl.startsWith('http://') && !formData.apiUrl.startsWith('https://')) {
      newErrors.apiUrl = 'API URL must start with http:// or https://';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({}); // Clear any previous errors

    try {
      // First, validate that the server is reachable and healthy
      toast.info('Validating server connection...');
      const validation = await validateServerConnection(formData.apiUrl);

      if (!validation.isValid) {
        setErrors({ apiUrl: validation.error || 'Server validation failed' });
        toast.error('Server validation failed. Please check the server URL.');
        setIsLoading(false);
        return;
      }

      // Server is valid, save the configuration
      setServerUrl(formData.apiUrl);
      toast.success(showReconfigure ? 'Server reconfigured successfully!' : 'Server configured successfully!');

      if (showReconfigure) {
        // If reconfiguring, go back to the configured state
        setShowReconfigure(false);
      } else {
        // If initial setup, go to login
        router.push('/auth/login');
      }
    } catch (error) {
      console.error('Server configuration error:', error);
      toast.error('Failed to configure server. Please check your settings.');
      setIsLoading(false);
    }
  };

  if (isConfigured && !showReconfigure) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#040508] via-[#0C0F15] to-[#040508] flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/5 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mb-4 mx-auto">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-xl font-semibold text-white">Server Configured</CardTitle>
            <CardDescription className="text-white/70">
              Your Second Brain Database server is already configured and ready to use.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-sm text-white/60">Current Server:</p>
              <p className="text-sm font-mono text-white/80 break-all">{serverUrl}</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => router.push('/auth/login')}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Go to Login
              </Button>
              <Button
                onClick={() => setShowReconfigure(true)}
                variant="outline"
                className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Reconfigure
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#040508] via-[#0C0F15] to-[#040508] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full mb-4">
            <Server className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {showReconfigure ? 'Reconfigure Server' : 'Server Setup'}
          </h1>
          <p className="text-white/70">
            {showReconfigure 
              ? 'Update your Second Brain Database server configuration'
              : 'Point the app at an existing Second Brain Database API'
            }
          </p>
          <p className="text-sm text-white/50 mt-1">
            {showReconfigure 
              ? 'Test the connection before updating your server URL'
              : 'Test the connection to verify the server is healthy before configuring'
            }
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/5 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl font-semibold text-center text-white">Configuration</CardTitle>
            <CardDescription className="text-center text-white/70">
              Enter your server configuration details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="apiUrl" className="text-sm font-medium text-white flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  API URL
                </Label>
                <Input
                  id="apiUrl"
                  type="text"
                  placeholder="http://localhost:8000"
                  value={formData.apiUrl}
                  onChange={(e) => setFormData({ ...formData, apiUrl: e.target.value })}
                  disabled={isLoading}
                  className={`h-11 transition-all duration-200 bg-white/10 border-white/20 text-white placeholder:text-white/50 ${
                    errors.apiUrl ? 'border-red-300 focus:border-red-500' : 'border-white/20 focus:border-orange-500'
                  }`}
                />
                {errors.apiUrl && (
                  <p className="text-sm text-red-400 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                    {errors.apiUrl}
                  </p>
                )}
                {connectionMessage && (
                  <div className={`text-sm p-2 rounded-md ${
                    connectionStatus === 'success' 
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                      : connectionStatus === 'error'
                      ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  }`}>
                    {connectionMessage}
                  </div>
                )}
              </div>

              {/* Test Connection Button */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={testConnection}
                  disabled={isTestingConnection || isLoading || !formData.apiUrl}
                  variant="outline"
                  className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
                >
                  {isTestingConnection ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Testing...
                    </div>
                  ) : (
                    'Test Connection'
                  )}
                </Button>
              </div>

              <div className="flex gap-3">
                {showReconfigure && (
                  <Button
                    type="button"
                    onClick={() => setShowReconfigure(false)}
                    variant="outline"
                    className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  disabled={isLoading || connectionStatus !== 'success'}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {showReconfigure ? 'Reconfiguring...' : 'Configuring server...'}
                    </div>
                  ) : (
                    showReconfigure ? 'Update Server' : 'Configure Server'
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-white/60">
                Need help with configuration?{' '}
                <a
                  href="/docs"
                  className="text-orange-400 hover:text-orange-300 font-medium transition-colors hover:underline"
                >
                  View documentation
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}