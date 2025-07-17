let snackbarRef: (
  msg: string,
  options?: { variant: 'error' | 'success' | 'info' | 'warning' },
) => void;

export const setSnackbar = (enqueueSnackbar: typeof snackbarRef) => {
  snackbarRef = enqueueSnackbar;
};

export const showErrorToast = (message: string) => {
  if (snackbarRef) {
    snackbarRef(message, { variant: 'error' });
  } else {
    console.error('Snackbar not initialized');
  }
};
