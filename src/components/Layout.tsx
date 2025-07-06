import { ReactNode } from 'react';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex min-h-screen w-full flex-col bg-white text-gray-900'>
      {/* Header */}
      <header className='sticky top-0 z-50 border-b bg-white py-0'>
        <div className='container mx-auto flex h-16 items-center justify-between px-0'>
          <Link href='/' className='flex items-center space-x-4'>
            <GraduationCap className='text-primary h-8 w-8' />
            <span className='text-xl font-bold text-gray-900'>ProjectHive</span>
          </Link>

          <nav className='hidden items-center space-x-4 shadow-none md:flex'>
            <Button asChild variant='outline' className='px-6'>
              <Link href='/contact'>Contact</Link>
            </Button>

            <Button asChild variant='default' className='px-6'>
              <Link href='/login'>Login</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className='flex-1 bg-gray-50'>{children}</main>

      {/* Footer */}
      <footer className='bg-gray-900 text-white'>
        <div className='container mx-auto px-4 py-12 lg:px-6'>
          {/* Bottom Bar */}
          <div className='flex flex-col items-center justify-between border-t border-gray-800 pt-8 md:flex-row'>
            <p className='text-sm text-gray-400'>
              © {new Date().getFullYear()} College Project Archive. All rights
              reserved.
            </p>
            <div className='mt-4 flex space-x-6 md:mt-0'>
              <Link
                href='/privacy'
                className='text-sm text-gray-400 transition-colors hover:text-white'
              >
                Privacy Policy
              </Link>
              <Link
                href='/terms'
                className='text-sm text-gray-400 transition-colors hover:text-white'
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
