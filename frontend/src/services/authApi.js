import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '../features/auth/authSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3300/api/v1/',
    credentials: 'include' // Important for cookies
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'user/signin',
        method: 'POST',
        body: credentials
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data.user));
        } catch (error) {
          // Handle error if needed
        }
      }
    }),
    signup: builder.mutation({
      query: (userInfo) => ({
        url: 'user/signup',
        method: 'POST',
        body: userInfo
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data.user));
        } catch (error) {
          // Handle error if needed
        }
      }
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'POST'
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error) {
          // Handle error if needed
        }
      }
    })
  })
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation
} = authApi;