import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiKey = import.meta.env.VITE_API_KEY;
const excludeGenres = [
  '',
  'новости',
  'для взрослых',
  'церемония',
  'реальное ТВ',
  'ток-шоу',
];

export const kinoApi = createApi({
  reducerPath: 'kinoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://kinopoiskapiunofficial.tech/api',
    prepareHeaders: headers => {
      headers.set('X-API-KEY', apiKey);
      headers.set('Content-Type', 'application/json');
    },
  }),
  endpoints: builder => ({
    getMoviesCollections: builder.query({
      query: ({ type, page }) =>
        `/v2.2/films/collections?type=${type}&page=${page}`,
    }),

    getMovies: builder.query({
      query: ({
        countries,
        genreId,
        order = 'NUM_VOTE',
        type = 'FILM',
        year,
        page,
        keyword = '',
      }) =>
        `/v2.2/films?countries=${countries}&genres=${genreId}&order=${order}&type=${type}&yearTo=${year}&page=${page}&keyword=${keyword}`,
    }),

    getMovie: builder.query({
      query: id => `/v2.2/films/${id}`,
    }),

    getGenresAndCountries: builder.query({
      query: () => '/v2.2/films/filters',
      transformResponse: response => ({
        ...response,
        genres: response.genres.filter(
          ({ genre }) => !excludeGenres.includes(genre),
        ),
      }),
    }),

    getSequelsAndPrequels: builder.query({
      query: id => `/v2.1/films/${id}/sequels_and_prequels`,
      transformResponse: response =>
        response.map(el => ({ ...el, kinopoiskId: el.filmId })),
    }),

    getStaff: builder.query({
      query: id => `/v1/staff?filmId=${id}`,
    }),
  }),
});
export const {
  useGetMoviesCollectionsQuery,
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetGenresAndCountriesQuery,
  useGetSequelsAndPrequelsQuery,
  useGetStaffQuery,
} = kinoApi;
