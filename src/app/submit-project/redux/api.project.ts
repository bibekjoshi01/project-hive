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
    submitProject: builder.mutation<void, SubmitProjectPayload>({
      query: (data) => ({
        url: `${projectAPI}/submit-project`,
        method: 'POST',
        data,
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

export interface SubmitProjectPayload {
  title: string;
  abstract: string;
  batch_year: number;
  category: number;
  department: number;
  level: 'Masters' | 'Bachelors' | 'PHD';
  supervisor?: string;
  project_details: string;
  technologies_used: string;
  github_link?: string;
  documentation_link?: string;
}
