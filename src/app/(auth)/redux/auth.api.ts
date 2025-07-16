import { rootAPI } from '@/lib/apiSlice';
import { IAuthState, ILoginFormDataType } from './types';

export const authAPI = 'public/auth-app';

export const authAPISlice = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IAuthState, { values: ILoginFormDataType }>({
      query: ({ values }) => {
        return {
          url: `${authAPI}/login`,
          method: 'POST',
          data: values,
        };
      },
    }),
    verifyOtp: builder.mutation<any, { email: string; otp: string }>({
      query: (data) => ({
        url: `${authAPI}/verify-otp`,
        method: 'POST',
        data,
      }),
    }),
  }),
});

export const { useLoginMutation, useVerifyOtpMutation } = authAPISlice;
