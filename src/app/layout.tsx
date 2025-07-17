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

export const metadata: Metadata = {
  title: 'ProjectHive',
  description: 'College Project Archive Platform',
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
