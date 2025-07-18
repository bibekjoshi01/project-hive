import { rootAPI } from '@/lib/apiSlice';

export const contactAPI = 'public/website-app';

export const contactAPISlice = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    contact: builder.mutation({
      query: (data) => ({
        url: `${contactAPI}/contact`,
        method: 'POST',
        data,
      }),
    }),
  }),
});

export const { useContactMutation } = contactAPISlice;
