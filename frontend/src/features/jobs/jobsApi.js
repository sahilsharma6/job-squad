import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.REACT_APP_BACKEND_URL}/jobs`,
    credentials: 'include' // Important for cookies
  }),
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/all`,
        method: 'GET',
        params: { page, limit },
      }),
    }),
    getJobById: builder.query({
      query: (jobId) => ({
        url: `/jobs/${jobId}`,
        method: 'GET',
      }),
    }),
    getFilteredJobs: builder.query({
      query: (filters) => ({
        url: '/jobbyfilters',
        method: 'GET',
        params: filters,
      }),
    }),
  }),
});

export const { 
  useGetAllJobsQuery,
  useGetJobByIdQuery,
  useGetFilteredJobsQuery,
} = jobsApi;