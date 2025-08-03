'use client';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import { useAppDispatch } from '@/lib/hooks';
import { useSnackbar } from 'notistack';
import { useOAuthMutation } from '../../redux/auth.api';
import { loginSuccess } from '../../redux/auth.slice';

export default function GithubCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [OAuth, { isLoading }] = useOAuthMutation();
  const code = searchParams.get('code');
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!code || hasRun.current || isProcessing) return;

    hasRun.current = true;
    setIsProcessing(true);

    async function handleOAuth() {
      try {
        const response = await OAuth({
          thirdPartyApp: 'GITHUB',
          authToken: code,
        }).unwrap();

        dispatch(loginSuccess(response));
        enqueueSnackbar('Login successful!', { variant: 'success' });
        router.push('/');
      } catch (e: any) {
        setError('Failed to login with GitHub.');
        enqueueSnackbar('Failed to login with GitHub.', { variant: 'error' });
        router.push('/login');
      } finally {
        setIsProcessing(false);
      }
    }

    handleOAuth();
  }, [code, OAuth, dispatch, enqueueSnackbar, router, isProcessing]);

  if (error) {
    return <div className='mt-10 text-center text-red-500'>{error}</div>;
  }

  return <Loading text='Logging In with GitHub...' />;
}
