import { rootAPI } from '@/lib/apiSlice';
import {
  IBatchYearList,
  ICategoryList,
  IDepartmentList,
  IProjectDetail,
  IProjectList,
} from './types';

export const projectAPI = 'public/project-app';

export const projectAPISlice = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<IProjectList, any>({
      query: (params) => {
        const queryString = new URLSearchParams();

        if (params.department)
          queryString.set('department_id', params.department);
        if (params.batch) queryString.set('batch_year_id', params.batch);
        if (params.category) queryString.set('category_id', params.category);
        if (params.level) queryString.set('level', params.level);
        if (params.search) queryString.set('search', params.search);
        if (params.ordering) queryString.set('ordering', params.ordering);
        if (params.limit !== undefined)
          queryString.set('limit', String(params.limit));
        if (params.offset !== undefined)
          queryString.set('offset', String(params.offset));

        return {
          url: `${projectAPI}/projects?${queryString.toString()}`,
          method: 'GET',
        };
      },
    }),
    getProjectCategories: builder.query<ICategoryList, void>({
      query: () => ({ url: `${projectAPI}/categories` }),
    }),
    getProjectDepartments: builder.query<IDepartmentList, void>({
      query: () => ({ url: `${projectAPI}/departments` }),
    }),
    getProjectBatchYears: builder.query<IBatchYearList, void>({
      query: () => ({ url: `${projectAPI}/batch-years` }),
    }),
    getProjectDetail: builder.query<IProjectDetail, string>({
      query: (projectId) => ({
        url: `${projectAPI}/projects/${projectId}`,
      }),
    }),
    increaseProjectView: builder.mutation<{ views: number }, number>({
      query: (projectId) => ({
        url: `${projectAPI}/projects/${projectId}/increase-view`,
        method: 'POST',
      }),
    }),
    rateProject: builder.mutation<
      { message: string; rating: number },
      { projectId: number; rating: number }
    >({
      query: ({ projectId, rating }) => ({
        url: `${projectAPI}/projects/${projectId}/rate`,
        method: 'PATCH',
        data: { rating },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetProjectsQuery,
  useGetProjectCategoriesQuery,
  useRateProjectMutation,
  useGetProjectBatchYearsQuery,
  useIncreaseProjectViewMutation,
  useGetProjectDetailQuery,
  useGetProjectDepartmentsQuery,
} = projectAPISlice;
