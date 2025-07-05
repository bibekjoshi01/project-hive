'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Login attempt:', formData);
    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);

    // Simulate Google OAuth process
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Google login initiated');
    setIsLoading(false);
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-white p-4'>
      <div className='w-full max-w-md'>
        {/* Header */}
        <div className='mb-8 text-center'>
          <h1 className='mb-2 text-4xl font-bold text-black'>Welcome Back</h1>
          <p className='text-lg text-gray-600'>
            Sign in to access your project archive
          </p>
        </div>

        <Card className='border-2 border-gray-200 shadow-lg'>
          <CardHeader className='space-y-1 pb-6'>
            <CardTitle className='text-center text-2xl font-bold text-black'>
              Sign In
            </CardTitle>
            <CardDescription className='text-center text-gray-600'>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-6'>
            {/* Google Login Button */}
            <Button
              variant='outline'
              className='h-12 w-full border-2 border-black bg-transparent text-base font-semibold transition-all duration-200 hover:bg-black hover:text-white'
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <svg className='mr-3 h-5 w-5' viewBox='0 0 24 24'>
                <path
                  fill='#4285F4'
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                />
                <path
                  fill='#34A853'
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                />
                <path
                  fill='#FBBC05'
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                />
                <path
                  fill='#EA4335'
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                />
              </svg>
              {isLoading ? 'Signing in...' : 'Continue with Google'}
            </Button>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <Separator className='w-full border-gray-300' />
              </div>
              <div className='relative flex justify-center text-sm uppercase'>
                <span className='bg-white px-4 font-medium text-gray-500'>
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <Label
                  htmlFor='email'
                  className='text-sm font-semibold text-black'
                >
                  Email Address
                </Label>
                <div className='relative'>
                  <Mail className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400' />
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Enter your email'
                    value={formData.email}
                    onChange={handleInputChange}
                    className='h-12 border-2 border-gray-300 pl-12 focus:border-black'
                    required
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label
                  htmlFor='password'
                  className='text-sm font-semibold text-black'
                >
                  Password
                </Label>
                <div className='relative'>
                  <Lock className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400' />
                  <Input
                    id='password'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter your password'
                    value={formData.password}
                    onChange={handleInputChange}
                    className='h-12 border-2 border-gray-300 pr-12 pl-12 focus:border-black'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-black'
                  >
                    {showPassword ? (
                      <EyeOff className='h-5 w-5' />
                    ) : (
                      <Eye className='h-5 w-5' />
                    )}
                  </button>
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <input
                    id='remember'
                    type='checkbox'
                    className='rounded border-2 border-gray-300 text-black focus:ring-black'
                  />
                  <Label
                    htmlFor='remember'
                    className='text-sm font-medium text-gray-600'
                  >
                    Remember me
                  </Label>
                </div>
                <Link
                  href='/forgot-password'
                  className='text-sm font-medium text-black hover:underline'
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type='submit'
                className='h-12 w-full bg-black text-base font-bold text-white transition-all duration-200 hover:bg-gray-800'
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>

          <CardFooter className='flex flex-col space-y-4 pt-6'>
            <Separator className='border-gray-300' />
            <div className='text-center text-sm text-gray-600'>
              Don&lsquo;t have an account?&nbsb;
              <Link
                href='/signup'
                className='font-semibold text-black hover:underline'
              >
                Sign up here
              </Link>
            </div>
            <div className='text-center text-xs text-gray-500'>
              By signing in, you agree to our{' '}
              <Link href='/terms' className='text-black hover:underline'>
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href='/privacy' className='text-black hover:underline'>
                Privacy Policy
              </Link>
            </div>
          </CardFooter>
        </Card>

        {/* Additional Links */}
        <div className='mt-8 text-center'>
          <Link
            href='/'
            className='text-sm font-semibold text-gray-600 transition-colors hover:text-black'
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
