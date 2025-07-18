import { rootAPI } from '@/lib/apiSlice';
import { IAuthState, ILoginFormDataType, IProfileResponse } from './types';

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
    OAuth: builder.mutation({
      query: (data) => ({
        url: `${authAPI}/oauth`,
        method: 'POST',
        data,
      }),
    }),
    getProfile: builder.query<IProfileResponse, void>({
      query: () => ({
        url: `${authAPI}/profile`,
        method: 'GET',
      }),
    }),
    updateProfile: builder.mutation<void, FormData>({
      query: (data) => {
        return {
          url: `${authAPI}/profile/update`,
          method: 'PATCH',
          data,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useVerifyOtpMutation,
  useOAuthMutation,
  useUpdateProfileMutation,
  useGetProfileQuery,
} = authAPISlice;
