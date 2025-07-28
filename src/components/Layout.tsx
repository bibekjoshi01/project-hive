'use client';
import { type ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/lib/hooks';
import Image from 'next/image';
import { authState } from '@/app/(auth)/redux/selector';
import ProfileImage from '@/assets/images/avatar.png';
import { useRouter } from 'next/navigation';

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const { isAuthenticated, fullName, photo } = useAppSelector(authState);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className='flex min-h-screen w-full flex-col bg-white text-gray-900'>
      {/* Header */}
      <header className='sticky top-0 z-50 border-b bg-white px-6 py-0'>
        <div className='container mx-auto flex h-16 items-center justify-between px-0'>
          <Link href='/' className='flex items-center space-x-4'>
            <GraduationCap className='text-primary h-8 w-8' />
            <span className='text-xl font-bold text-gray-900'>ProjectHive</span>
          </Link>
          <nav className='items-center space-x-4 shadow-none md:flex'>
            {isAuthenticated ? (
              <div className='flex items-center justify-center gap-2'>
                <span className='xs:inline hidden font-medium text-gray-800 sm:inline'>
                  {fullName?.trim() || 'Hello!'}
                </span>
                <div
                  className='h-10 w-10 cursor-pointer overflow-hidden rounded-full border border-gray-300'
                  onClick={() => router.push('/profile')}
                >
                  <Image
                    src={photo || ProfileImage}
                    alt='Profile'
                    width={40}
                    height={40}
                  />
                </div>
              </div>
            ) : (
              <Button asChild variant='default' className='px-6'>
                <Link href='/login'>Login</Link>
              </Button>
            )}
          </nav>
        </div>
      </header>

      {/* Main content - Added flex-grow here */}
      <main className='flex-grow'>{children}</main>

      {/* Footer */}
      <footer className='bg-gray-900 text-white'>
        <div className='container mx-auto px-4 py-12 lg:px-6'>
          <div className='flex flex-col items-center justify-between border-t border-gray-800 pt-8 md:flex-row'>
            <p className='text-sm text-gray-400'>
              © {new Date().getFullYear()} College Project Archive. All rights
              reserved.
            </p>
            <div className='mt-4 flex space-x-6 text-center md:mt-0'>
              <Link
                href='/privacy-policies'
                className='text-xs text-gray-400 transition-colors hover:text-white sm:text-sm'
              >
                Privacy Policy
              </Link>
              <Link
                href='/terms-and-conditions'
                className='text-xs text-gray-400 transition-colors hover:text-white sm:text-sm'
              >
                Terms of Service
              </Link>
              <Link
                href='/contact-us'
                className='text-xs text-gray-400 transition-colors hover:text-white sm:text-sm'
              >
                Contact Us
              </Link>
              <Link
                href='/developer'
                className='text-xs text-gray-400 transition-colors hover:text-white sm:text-sm'
              >
                Developer Info
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
