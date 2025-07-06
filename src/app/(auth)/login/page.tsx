'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Mail, ArrowRight } from 'lucide-react';
import GoogleLogo from '@/assets/icons/GoogleLogo';
import GithubLogo from '@/assets/icons/GithubLogo';
import OtpVerification from './OTPVerification';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log('Login attempt:', formData);
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
      <div className='w-full max-w-lg'>
        {isLoading ? (
          <OtpVerification email={formData?.email} />
        ) : (
          <Card className='border-none px-6 py-12 shadow-none'>
            <CardHeader className='space-y-1 pb-2'>
              <CardTitle className='text-center text-2xl font-bold text-black'>
                Sign In Your Account
              </CardTitle>
            </CardHeader>

            <CardContent className='space-y-6'>
              {/* Email/Password Form */}
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='relative space-y-2'>
                  <Mail className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400' />
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Enter your email address'
                    value={formData.email}
                    onChange={handleInputChange}
                    className='h-12 w-full rounded-md border border-gray-300 pl-12 transition-colors duration-200 focus:border-black lg:text-base lg:focus:ring-0'
                    required
                  />
                </div>

                <Button
                  type='submit'
                  className='flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-black py-3 text-base font-medium text-white transition-all duration-200 hover:bg-gray-800'
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Continue with Email'}
                  <ArrowRight
                    size={'20px'}
                    style={{ display: `${isLoading && 'none'}` }}
                  />
                </Button>
              </form>

              {/* Seperator */}
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <Separator className='w-full border-gray-300' />
                </div>
                <div className='relative flex justify-center text-sm uppercase'>
                  <span className='bg-white px-4 font-medium text-gray-500'>
                    Or
                  </span>
                </div>
              </div>

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
              {/* Github Login Button */}
              <Button
                variant='outline'
                className='flex h-12 w-full cursor-pointer items-center justify-center gap-2 border border-gray-300 bg-transparent text-base font-medium transition-colors duration-200 hover:bg-gray-100'
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <GithubLogo />
                {isLoading ? 'Signing in...' : 'Continue with GitHub'}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
