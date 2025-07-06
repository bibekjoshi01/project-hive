'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import GoogleLogo from '@/icons/GoogleLogo';

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
    <div className='flex min-h-screen items-center justify-center bg-white'>
      <div className='w-full max-w-md'>
        <Card className=''>
          <CardHeader className='space-y-1 pb-2'>
            <CardTitle className='text-center text-2xl font-bold text-black'>
              Sign In Your Account
            </CardTitle>
          </CardHeader>

          <CardContent className='space-y-6'>
            {/* Google Login Button */}
            <Button
              variant='outline'
              className='flex h-12 w-full cursor-pointer items-center justify-center gap-2 border border-gray-300 bg-transparent text-base font-medium transition-colors duration-200 hover:bg-gray-100'
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <GoogleLogo />
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
                    className='h-12 w-full rounded-md border border-gray-300 pl-12 transition-colors duration-200 focus:border-none focus:outline-none'
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
                    className='h-12 w-full rounded-md border border-gray-300 pl-12 transition-colors duration-200 focus:border-none focus:outline-none'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute cursor-pointer top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-black'
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
                className='h-12 cursor-pointer w-full bg-black text-base font-bold text-white transition-all duration-200 hover:bg-gray-800'
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>

          <CardFooter className='flex flex-col space-y-4 pt-2'>
            <Separator className='border-gray-300' />
            <div className='text-center text-sm text-gray-600'>
              Don&lsquo;t have an account?&nbsp;&nbsp;
              <Link
                href='/signup'
                className='font-semibold text-black hover:underline'
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
