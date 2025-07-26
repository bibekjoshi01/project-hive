import { rootAPI } from '@/lib/apiSlice';
import {
  ELevels,
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
  overrideExisting: true,
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
  batchYear: number;
  category: number;
  department: number;
  level: ELevels;
  supervisor?: string;
  projectDetails: string;
  technologiesUsed: string;
  githubLink?: string;
  documentationLink?: string;
  teamMembers: {
    fullName: string;
    rollNo: string;
    photo: string | null;
  }[];
  files: {
    fileType: string;
    file: string;
  }[];
}
