import { rootAPI } from '@/lib/apiSlice';
import {
  DashboardSummaryResponse,
  IContactList,
  IProjectDetail,
  IProjectList,
} from './types';

export const projectAPI = 'admin/project-app';
export const websiteAPI = 'admin/website-app';

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
    getContacts: builder.query<
      IContactList,
      { search?: string; limit: number; offset: number }
    >({
      query: ({ search, limit, offset }) => {
        const params = new URLSearchParams();

        if (search) params.set('search', search);
        params.set('limit', limit.toString());
        params.set('offset', offset.toString());

        return {
          url: `${websiteAPI}/contacts?${params.toString()}`,
        };
      },
    }),

    getDashboardStats: builder.query<DashboardSummaryResponse, void>({
      query: () => {
        return {
          url: `${websiteAPI}/dashboard-summary`,
        };
      },
    }),
    // Mutation to accept or reject project
    reviewProject: builder.mutation<
      { message: string },
      { projectId: string; status: 'APPROVED' | 'REJECTED' }
    >({
      query: ({ projectId, status }) => ({
        url: `${projectAPI}/review-project`,
        method: 'POST',
        data: { projectId, status },
      }),
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetProjectsQuery,
  useGetProjectDetailQuery,
  useGetDashboardStatsQuery,
  useReviewProjectMutation,
  useGetContactsQuery,
} = projectAPISlice;
