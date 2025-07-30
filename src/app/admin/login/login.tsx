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
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLoginMutation } from './redux/api';

type FormData = {
  username: string;
  password: string;
};

export default function AdminLoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setError('');
    try {
      const res = await login(data).unwrap();

      // Set cookies

      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err?.data?.message || 'Login failed');
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-2xl'>Admin Login</CardTitle>
          <CardDescription>
            Enter your admin credentials to access the dashboard.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='username'>Username</Label>
              <Input
                id='username'
                type='text'
                placeholder='admin'
                {...register('username', { required: 'Username is required' })}
              />
              {errors.username && (
                <p className='text-sm text-red-500'>
                  {errors.username.message}
                </p>
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
            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
