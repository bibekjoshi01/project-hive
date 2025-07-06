import { rootAPI } from '@/lib/apiSlice';
import { IAuthState, ILoginFormDataType } from './types';

export const authAPI = 'public/user-app/auth';

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
    logout: builder.mutation({
      query: (values) => {
        return {
          url: `${authAPI}/logout`,
          method: 'POST',
          data: values,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authAPISlice;
