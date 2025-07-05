import { ReactNode } from 'react';
import Link from 'next/link';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex min-h-screen w-full flex-col bg-white text-gray-900'>
      {/* Header */}
      <header className='sticky top-0 z-50 border-b bg-white py-0'>
        <div className='container mx-auto flex h-16 items-center justify-between px-0'>
          <Link href='/' className='flex items-center space-x-4'>
            <GraduationCap className='text-primary h-8 w-8' />
            <span className='text-xl font-bold text-gray-900'>
              ProjectHive
            </span>
          </Link>

          <nav className='hidden items-center space-x-4 md:flex'>
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
          <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
            {/* Logo and Description */}
            <div className='md:col-span-2'>
              <div className='mb-4 flex items-center space-x-2'>
                <GraduationCap className='text-primary h-8 w-8' />
                <span className='text-xl font-bold'>ProjectArchive</span>
              </div>
              <p className='mb-4 max-w-md text-gray-400'>
                Preserving and showcasing the innovative work of our students. A
                digital repository of academic excellence and creative
                achievements.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className='mb-4 font-semibold'>Quick Links</h3>
              <ul className='space-y-2 text-gray-400'>
                <li>
                  <Link
                    href='/browse'
                    className='transition-colors hover:text-white'
                  >
                    Browse Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href='/submit'
                    className='transition-colors hover:text-white'
                  >
                    Submit Project
                  </Link>
                </li>
                <li>
                  <Link
                    href='/about'
                    className='transition-colors hover:text-white'
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href='/guidelines'
                    className='transition-colors hover:text-white'
                  >
                    Guidelines
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className='mb-4 font-semibold'>Contact</h3>
              <ul className='space-y-2 text-gray-400'>
                <li className='flex items-center space-x-2'>
                  <Mail className='h-4 w-4' />
                  <span>tcioe@college.edu</span>
                </li>
                <li className='flex items-center space-x-2'>
                  <Phone className='h-4 w-4' />
                  <span>+1 (555) 000-0000</span>
                </li>
                <li className='flex items-center space-x-2'>
                  <MapPin className='h-4 w-4' />
                  <span>123 College Thapathali, Kathamandu</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className='mt-8 flex flex-col items-center justify-between border-t border-gray-800 pt-8 md:flex-row'>
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
