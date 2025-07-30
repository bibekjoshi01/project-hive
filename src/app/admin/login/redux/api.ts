import { rootAPI } from '@/lib/apiSlice';

export const authAPI = 'admin/auth-app';

export const authAPISlice = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ values }) => {
        return {
          url: `${authAPI}/login`,
          method: 'POST',
          data: values,
        };
      },
    }),
    getProfile: builder.query({
      query: () => ({
        url: `${authAPI}/profile`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery } = authAPISlice;
