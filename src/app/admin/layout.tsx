'use client';

import type React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, you'd clear session/token here
    router.push('/login');
  };

  return (
    <div className='flex min-h-screen w-full flex-col bg-gray-100 dark:bg-gray-950'>
      <header className='sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6 dark:bg-gray-900'>
        <h1 className='text-lg font-semibold md:text-xl'>Admin Dashboard</h1>
        <div className='ml-auto'>
          <Button variant='outline' onClick={handleLogout}>
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
