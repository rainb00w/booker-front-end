import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const trainingApi = createApi({
  reducerPath: 'training',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://booker-back-end.herokuapp.com/api/training',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      // console.log('TOKEN', token);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 1,
  tagTypes: ['Training'],
  endpoints: builder => ({
    getAllTrainings: builder.query({
      query: () => `/`,
      method: 'GET',
      providesTags: ['Training'],
    }),
    addTraining: builder.mutation({
      query: ({startDate, finishDate, books }) => ({
        url: '/',
        method: 'POST',
        body: {startDate, finishDate, books },
      }),
      invalidatesTags: ['Training'],
    }),
    deleteTraining: builder.mutation({
      query: id => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Training'],
    }),
  }),
});

export const {
  useGetAllTrainingsQuery,
  useAddTrainingMutation,
  useDeleteTrainingMutation,
} = trainingApi;
