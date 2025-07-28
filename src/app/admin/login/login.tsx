'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Simple mock authentication:
    // In a real application, you would send these credentials to a backend API
    // and validate them securely.
    if (username === 'admin' && password === 'password') {
      // Simulate successful login
      console.log('Login successful!');
      router.push('/dashboard'); // Redirect to dashboard
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-2xl'>Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin dashboard.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='username'>Username</Label>
              <Input
                id='username'
                type='text'
                placeholder='admin'
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className='text-sm text-red-500'>{error}</p>}
          </CardContent>
          <CardFooter>
            <Button type='submit' className='w-full'>
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
