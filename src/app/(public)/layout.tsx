import WebsiteLayout from '@/components/WebsiteLayout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <WebsiteLayout>{children}</WebsiteLayout>;
}
