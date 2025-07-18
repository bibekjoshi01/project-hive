import { rootAPI } from '@/lib/apiSlice';

export const homeAPI = 'public/website-app';

export const homeAPISlice = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query<StatsType, void>({
      query: () => ({ url: `${homeAPI}/stats` }),
    }),
    getCategories: builder.query<CategoryList, void>({
      query: () => ({ url: `${homeAPI}/categories` }),
    }),
    subscribeNewsletter: builder.mutation<
      { message: string },
      { email: string }
    >({
      query: (data) => ({
        url: `${homeAPI}/subscribe-newsletter`,
        method: 'POST',
        data,
      }),
    }),
  }),
});

export const {
  useGetStatsQuery,
  useGetCategoriesQuery,
  useSubscribeNewsletterMutation,
} = homeAPISlice;
