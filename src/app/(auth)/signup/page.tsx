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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import Link from 'next/link';

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    gender: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate signup process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Signup attempt:', formData);
    setIsLoading(false);
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-white p-4'>
      <div className='w-full max-w-2xl'>
        <Card className=''>
          <CardHeader className='space-y-1 pb-6'>
            <CardTitle className='text-center text-2xl font-bold text-black'>
              Sign Up Your Account
            </CardTitle>
          </CardHeader>

          <CardContent className='space-y-6'>
            {/* Signup Form */}
            <form onSubmit={handleSubmit} className='space-y-4'>
              {/* Name Fields */}
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label
                    htmlFor='firstName'
                    className='text-sm font-semibold text-black'
                  >
                    First Name
                  </Label>
                  <div className='relative'>
                    <User className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400' />
                    <Input
                      id='firstName'
                      name='firstName'
                      type='text'
                      placeholder='First name'
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className='h-12 border-2 border-gray-300 pl-12 focus:border-black'
                      required
                    />
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label
                    htmlFor='lastName'
                    className='text-sm font-semibold text-black'
                  >
                    Last Name
                  </Label>
                  <Input
                    id='lastName'
                    name='lastName'
                    type='text'
                    placeholder='Last name'
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className='h-12 border-2 border-gray-300 focus:border-black'
                    required
                  />
                </div>
              </div>

              {/* Email */}
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

              {/* Role and Gender */}
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label className='text-sm font-semibold text-black'>
                    Role
                  </Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => handleSelectChange('role', value)}
                  >
                    <SelectTrigger className='h-12 w-full rounded-md border-2 border-gray-300 focus:border-black'>
                      <SelectValue placeholder='Select role' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='student'>Student</SelectItem>
                      <SelectItem value='visitor'>Visitor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label className='text-sm font-semibold text-black'>
                    Gender
                  </Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      handleSelectChange('gender', value)
                    }
                  >
                    <SelectTrigger className='h-12 w-full rounded-md border-2 border-gray-300 focus:border-black'>
                      <SelectValue placeholder='Select gender' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='male'>Male</SelectItem>
                      <SelectItem value='female'>Female</SelectItem>
                      <SelectItem value='other'>Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Password Fields */}
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
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
                      placeholder='Create password'
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

                <div className='space-y-2'>
                  <Label
                    htmlFor='confirmPassword'
                    className='text-sm font-semibold text-black'
                  >
                    Confirm Password
                  </Label>
                  <div className='relative'>
                    <Lock className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400' />
                    <Input
                      id='confirmPassword'
                      name='confirmPassword'
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder='Confirm password'
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className='h-12 border-2 border-gray-300 pr-12 pl-12 focus:border-black'
                      required
                    />
                    <button
                      type='button'
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className='absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-black'
                    >
                      {showConfirmPassword ? (
                        <EyeOff className='h-5 w-5' />
                      ) : (
                        <Eye className='h-5 w-5' />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <Button
                type='submit'
                className='mt-2 h-12 w-full bg-black text-base font-bold text-white transition-all duration-200 hover:bg-gray-800'
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
          </CardContent>

          <CardFooter className='flex flex-col space-y-4 pt-4'>
            <Separator className='border-gray-300' />
            <div className='text-center text-sm text-gray-600'>
              Already have an account?{' '}
              <Link
                href='/login'
                className='cursor-pointer font-semibold text-black hover:underline'
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
