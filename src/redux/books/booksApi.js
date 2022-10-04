import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const booksApi = createApi({
  reducerPath: 'books',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://booker-back-end.herokuapp.com/api/books',
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
  tagTypes: ['Books'],
  endpoints: builder => ({
    getAllBooks: builder.query({
      query: () => `/`,
      method: 'GET',
      providesTags: ['Books'],
    }),
    addBook: builder.mutation({
      query: ({ title, author,year,pages }) => ({
        url: '/',
        method: 'POST',
        body: { title: title, author: author, year: year, pages: pages },
      }),
      invalidatesTags: ['Books'],
    }),
    deleteBook: builder.mutation({
      query: id => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Books'],
    }),
  }),
});





export const {
  useGetAllBooksQuery,
  useAddBookMutation,
  useDeleteBookMutation,
} = booksApi;
