'use client';

import { setSnackbar } from '@/utils/notifier';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useEffect } from 'react';

export function SnackbarInitializer() {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setSnackbar(enqueueSnackbar);
  }, [enqueueSnackbar]);

  return null; // no UI needed
}

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={3000}
    >
      <SnackbarInitializer />
      {children}
    </SnackbarProvider>
  );
}
