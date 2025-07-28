import type { Metadata } from 'next';
import './globals.css';
import WebsiteLayout from '../components/Layout';
import { Montserrat, Poppins } from 'next/font/google';
import StoreProvider from '@/lib/StoreProvider';
import ClientLayoutWrapper from '@/lib/SnackBarProvider';

export const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

// SEO Meta Information
export const metadata: Metadata = {
  title: 'Project Archive | Thapathali Campus - IOE',
  description:
    'Explore a curated collection of student and faculty projects from Thapathali Campus, IOE. Browse projects by categories and contribute to our knowledge hub.',
  keywords: [
    'Thapathali Campus',
    'IOE',
    'Engineering Projects',
    'Student Projects',
    'Project Archive',
    'Nepal Engineering College',
    'Final Year Projects',
    'Computer Engineering',
    'Electronics Projects',
  ],
  authors: [{ name: 'Thapathali Campus IOE' }],
  openGraph: {
    title: 'Project Archive | Thapathali Campus - IOE',
    description:
      'A public archive of academic projects by students of Thapathali Campus, IOE. Find, explore, and contribute to student-driven innovation.',
    url: 'https://projects.tcioe.edu.np',
    siteName: 'Project Archive - Thapathali Campus',
    images: [
      {
        url: 'https://projects.tcioe.edu.np/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Project Archive Thapathali Campus',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  metadataBase: new URL('https://projects.tcioe.edu.np'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${montserrat.variable} ${poppins.variable} font-sans`}>
        <StoreProvider>
          <ClientLayoutWrapper>
            <WebsiteLayout>{children}</WebsiteLayout>
          </ClientLayoutWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
