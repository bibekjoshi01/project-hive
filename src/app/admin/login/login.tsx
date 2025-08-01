'use client';

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
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAdminLoginMutation } from './redux/api';
import { useSnackbar } from 'notistack';
import {
  ADMIN_ACCESS_TOKEN,
  ADMIN_REFRESH_TOKEN,
} from '@/constants/admin/tokens';

type FormData = {
  email: string;
  password: string;
};

export default function AdminLoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [adminLogin, { isLoading }] = useAdminLoginMutation();
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setError('');
    try {
      const res = await adminLogin({ values: data }).unwrap();
      Cookies.set(ADMIN_ACCESS_TOKEN, res?.accessToken);
      Cookies.set(ADMIN_REFRESH_TOKEN, res?.refreshToken);
      Cookies.set('logout', 'false');

      enqueueSnackbar('Logged In Successfully.', { variant: 'success' });
      router.push('/admin/projects');
    } catch (err: any) {
      setError(err?.data?.detail || 'Login failed');
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950'>
      <Card className='w-full max-w-md shadow-none'>
        <CardHeader>
          <CardTitle className='text-2xl'>Admin Login</CardTitle>
          <CardDescription>
            Enter your admin credentials to access the dashboard.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='text'
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <p className='text-sm text-red-500'>{errors.email.message}</p>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && (
                <p className='text-sm text-red-500'>
                  {errors.password.message}
                </p>
              )}
            </div>
            {error && <p className='text-sm text-red-500'>{error}</p>}
          </CardContent>
          <CardFooter className='mt-8'>
            <Button
              type='submit'
              className='w-full cursor-pointer'
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
