'use client';

import type React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import {
  ADMIN_ACCESS_TOKEN,
  ADMIN_REFRESH_TOKEN,
} from '@/constants/admin/tokens';
import { useSnackbar } from 'notistack';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = () => {
    Cookies.remove(ADMIN_ACCESS_TOKEN);
    Cookies.remove(ADMIN_REFRESH_TOKEN);
    enqueueSnackbar('Logout Successful.', { variant: 'success' });
    Cookies.set('logout', 'true');
    router.push('/admin/login');
  };

  return (
    <div className='flex min-h-screen w-full flex-col bg-gray-100 dark:bg-gray-950'>
      <header className='sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6 dark:bg-gray-900'>
        <h1 className='text-lg font-semibold md:text-xl'>Admin Dashboard</h1>

        {/* Navigation Buttons */}
        <div className='ml-4 flex gap-2'>
          <Button
            variant='ghost'
            className='cursor-pointer'
            onClick={() => router.push('/admin')}
          >
            Dashboard
          </Button>
          <Button
            variant='ghost'
            className='cursor-pointer'
            onClick={() => router.push('/admin/contacts')}
          >
            Contacts
          </Button>
          <Button
            variant='ghost'
            className='cursor-pointer'
            onClick={() => router.push('/admin/projects')}
          >
            Projects
          </Button>
        </div>

        <div className='ml-auto'>
          <Button
            variant='outline'
            className='cursor-pointer'
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </header>

      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
        {children}
      </main>
    </div>
  );
}
