'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPage from './login';

export default function LoginWrapper() {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID!}
    >
      <LoginPage />
    </GoogleOAuthProvider>
  );
}
