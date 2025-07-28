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
import { useLoginMutation, useOAuthMutation } from '../redux/auth.api';
import { loginSuccess } from '../redux/auth.slice';
import { useAppDispatch } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useGoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
  const [optStage, setIsOtpStage] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
  });
  const [login, { isLoading: loadingLogin }] = useLoginMutation();
  const [OAuth, { isLoading: loadingOAuthLogin }] = useOAuthMutation();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login({ values: formData }).unwrap();
      // Proceed to OTP Verification Step
      setIsOtpStage(true);
    } catch (err: any) {
      console.error('Login failed:', err?.data || err?.message);
    }
  };

  const handleGoogleLogin = async ({ token }: { token: string }) => {
    setGoogleLoading(true);

    const values = {
      thirdPartyApp: 'GOOGLE',
      authToken: token,
    };

    try {
      const response = await OAuth(values).unwrap();
      dispatch(loginSuccess(response));
      enqueueSnackbar('Login successful!', { variant: 'success' });
      router.push('/login');
    } catch (e) {
      enqueueSnackbar('Error signin with google', { variant: 'error' });
    } finally {
      setGoogleLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      handleGoogleLogin({ token: tokenResponse?.access_token });
    },
  });

  const handleGithubLogin = () => {
    setGithubLoading(true);

    const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!;
    const GITHUB_REDIRECT_URI = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI!;

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user:email&redirect_uri=${encodeURIComponent(GITHUB_REDIRECT_URI)}`;
    window.location.href = githubAuthUrl;
  };

  return (
    <div className='flex items-center justify-center bg-white sm:min-h-0 lg:min-h-screen'>
      <div className='my-16 w-full max-w-lg lg:my-0'>
        {optStage ? (
          <OtpVerification email={formData?.email} />
        ) : (
          <Card className='border-none px-0 py-12 shadow-none'>
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
                  disabled={loadingLogin}
                >
                  {loadingLogin ? 'Signing in...' : 'Continue with Email'}
                  <ArrowRight
                    size={'20px'}
                    style={{ display: `${loadingLogin && 'none'}` }}
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
                onClick={() => googleLogin()}
                disabled={loadingOAuthLogin}
              >
                <GoogleLogo />
                {loadingOAuthLogin && googleLoading
                  ? 'Signing in...'
                  : 'Continue with Google'}
              </Button>

              {/* Github Login Button */}
              <Button
                variant='outline'
                className='flex h-12 w-full cursor-pointer items-center justify-center gap-2 border border-gray-300 bg-transparent text-base font-medium transition-colors duration-200 hover:bg-gray-100'
                onClick={handleGithubLogin}
                disabled={loadingOAuthLogin}
              >
                <GithubLogo />
                {loadingOAuthLogin && githubLoading
                  ? 'Signing in...'
                  : 'Continue with GitHub'}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
