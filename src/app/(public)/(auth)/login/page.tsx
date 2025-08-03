import Login from './login-wrapper';

export const metadata = {
  title: 'Login | Thapathali Campus',
  description:
    'Login to access your dashboard at Thapathali Campus. Secure access for students, faculty, and staff.',
  keywords: [
    'Thapathali Campus login',
    'student portal',
    'college login',
    'Thapathali engineering',
  ],
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Login - Thapathali Campus',
    description:
      'Secure login portal for Thapathali Campus students and faculty.',
    url: 'https://projects.tcioe.edu.np/login',
    siteName: 'Thapathali Campus',
    type: 'website',
  },
};

export default function Page() {
  return <Login />;
}
