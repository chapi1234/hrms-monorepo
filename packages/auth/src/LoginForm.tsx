import React, { useState } from 'react';
import { Button, Input, Card } from '@hrms/ui';
import { LogIn } from 'lucide-react';

interface LoginFormProps {
  onSuccess: (user: any) => void;
  onLogin: (creds: any) => Promise<any>;
}

export const LoginForm = ({ onSuccess, onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await onLogin({ email, password });
      onSuccess(user);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <div className="flex flex-col items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900/30 mb-4">
          <LogIn className="h-6 w-6 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-gray-500 dark:text-gray-400">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="admin@hrms.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button 
          type="submit" 
          className="w-full" 
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </Card>
  );
};
