import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

// project imports
import { useLoginMutation } from '../redux/auth.api';
import { ILoginFormDataType } from '../redux/types';
import { useAppDispatch } from '@/lib/hooks';
import { handleClientError } from '@/utils/handleError';
import { defaultValues, loginSchema } from '../login/config';
import { loginSuccess } from '../redux/auth.slice';

export const useLogin = () => {
  const [login, { isLoading: loadingLogin }] = useLoginMutation();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
    reset
  } = useForm<ILoginFormDataType>({
    resolver: zodResolver(loginSchema),
    defaultValues
  });

  const onSubmit = async (values: ILoginFormDataType) => {
    try {
      const response = await login({ values }).unwrap();

      dispatch(loginSuccess({ ...response }));
      enqueueSnackbar(response?.message, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        }
      });
      reset(defaultValues);
    } catch (err: any) {
      handleClientError<ILoginFormDataType>({
        error: err,
        setError,
        enqueueSnackbar,
        fieldKeyMap: {
          email: 'email',
          password: 'password'
        }
      });
    }
  };

  return {
    handleSubmit,
    onSubmit,
    loadingLogin,
    errors,
    reset,
    watch,
    control
  };
};
