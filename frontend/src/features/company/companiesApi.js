import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const companiesApi = createApi({
  reducerPath: 'companiesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.REACT_APP_BACKEND_URL}/company`,
    credentials: 'include'
  }),
  endpoints: (builder) => ({
    getAllCompanies: builder.query({
      query: () => ({
        url: '/all',
        method: 'GET',
      }),
    }),
    getCompanyById: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { 
  useGetAllCompaniesQuery,
  useGetCompanyByIdQuery,
} = companiesApi;