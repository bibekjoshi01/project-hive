import { rootAPI } from '@/lib/apiSlice';
import {
  IBatchesResponse,
  ICategoriesResponse,
  IDepartmentsResponse,
} from '../types';

export const projectAPI = 'public/project-app';

export const homeAPISlice = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query<IDepartmentsResponse, void>({
      query: () => ({ url: `${projectAPI}/departments` }),
    }),
    getProjectCategories: builder.query<ICategoriesResponse, void>({
      query: () => ({ url: `${projectAPI}/categories` }),
    }),
    getBatches: builder.query<IBatchesResponse, void>({
      query: () => ({ url: `${projectAPI}/batch-years` }),
    }),
    submitProject: builder.mutation<void, void>({
      query: (data) => ({
        url: `${projectAPI}/submit-project`,
        method: 'POST',
        data
      }),
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useGetProjectCategoriesQuery,
  useSubmitProjectMutation,
  useGetBatchesQuery,
} = homeAPISlice;
