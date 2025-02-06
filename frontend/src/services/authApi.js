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
    companylogin: builder.mutation({
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
    companysignup: builder.mutation({
      query: (userInfo) => ({
        url: 'company/signup',
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
    }),
    // googleLogin: builder.mutation({
    //   query: () => ({
    //     url: "/user/request",
    //     method: "POST",
    //     credentials: "include",
    //   }),
    //   async onQueryStarted(arg, { queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled;
    //       if (data.url) {
    //         window.location.href = data.url;
    //       } else {
    //         console.error("Google OAuth URL not found in response.");
    //       }
    //     } catch (error) {
    //       console.error("Google login failed", error);
    //     }
    //   },
    // }),
    googleLogin: builder.mutation({
      query: () => ({
        url: "/user/request",
        method: "POST",
      }),
    }),
    fetchUser: builder.query({
      query: () => "/user/me", // Fetch user details
    }),

    googleCallback: builder.mutation({
      query: (code) => ({
        url: "/user/callback",
        method: "POST",
        body: { code },
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data.user));
        } catch (error) {
          console.error("Google callback failed", error);
        }
      },
    }),
  })
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useCompanyloginMutation,
  useCompanysignupMutation,
  useGoogleLoginMutation,
  useGoogleCallbackMutation,
  useFetchUserQuery
} = authApi;