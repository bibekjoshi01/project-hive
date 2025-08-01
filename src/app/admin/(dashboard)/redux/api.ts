import { rootAPI } from '@/lib/apiSlice';
import { IProjectDetail, IProjectList } from './types';

export const projectAPI = 'public/project-app';

export const projectAPISlice = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<IProjectList, any>({
      query: (params) => {
        const queryString = new URLSearchParams();

        if (params.search) queryString.set('search', params.search);
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
    getProjectDetail: builder.query<IProjectDetail, string>({
      query: (projectId) => ({
        url: `${projectAPI}/projects/${projectId}`,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetProjectsQuery, useGetProjectDetailQuery } =
  projectAPISlice;
