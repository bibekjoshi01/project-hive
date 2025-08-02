import { rootAPI } from '@/lib/apiSlice';

export const authAPI = 'admin/auth-app';

export const authAPISlice = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: ({ values }) => {
        return {
          url: `${authAPI}/login`,
          method: 'POST',
          data: values,
        };
      },
    }),
    getAdminProfile: builder.query<any, void>({
      query: () => ({
        url: `${authAPI}/profile`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useAdminLoginMutation, useGetAdminProfileQuery } = authAPISlice;
