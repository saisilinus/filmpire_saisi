import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetGenresQueryResult, GetGenresRequest, GetMovieRequest, GetMoviesRequest, Movie, LeanMoviesQueryResult, GetRecommendationsQuery, Actor, GetActorRequest, GetMoviesByActorRequest, GetFavoritesRequest } from './TMDB.types';
import { baseUrl, tmdbApiKey } from '../config/constants';

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    //* Get Genres
    getGenres: builder.query<GetGenresQueryResult, Omit<GetGenresRequest, 'api_key'>>({
      query: (params) => ({
        url: '/genre/movie/list',
        method: 'GET',
        params: {
          ...params,
          api_key: tmdbApiKey,
        },
      }),
    }),

    //* Get movies by [TYPE]
    getMovies: builder.query<LeanMoviesQueryResult, GetMoviesRequest>({
      query: ({ genreIdOrCategoryName, params, searchQuery }) => {
        //* Get movies by search
        if (searchQuery) {
          return {
            url: '/search/movie',
            method: 'GET',
            params: {
              ...params,
              query: searchQuery,
              api_key: tmdbApiKey,
            },
          };
        }
        //* Get movies by category
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
          return {
            url: `/movie/${genreIdOrCategoryName}`,
            method: 'GET',
            params: {
              ...params,
              api_key: tmdbApiKey,
            },
          };
        }

        //* Get movies by genre
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
          return {
            url: '/discover/movie',
            method: 'GET',
            params: {
              ...params,
              with_genres: genreIdOrCategoryName,
              api_key: tmdbApiKey,
            },
          };
        }

        //* Get popular movies
        return {
          url: '/movie/popular',
          method: 'GET',
          params: {
            ...params,
            api_key: tmdbApiKey,
          },
        };
      },
    }),

    //* Get Movie
    getMovie: builder.query<Movie, GetMovieRequest>({
      query: ({ id, params }) => ({
        url: `/movie/${id}`,
        method: 'GET',
        params: {
          ...params,
          append_to_response: 'videos,credits',
          api_key: tmdbApiKey,
        },
      }),
    }),

    //* Get favorited and watchlisted movies
    getList: builder.query<LeanMoviesQueryResult, GetFavoritesRequest>({
      query: ({ accountId, sessionId, listName, page }) => ({
        url: `/account/${accountId}/${listName}`,
        method: 'GET',
        params: {
          page,
          session_id: sessionId,
          api_key: tmdbApiKey,
        },
      }),
    }),

    //* Get user specific lists
    getRecommendations: builder.query<LeanMoviesQueryResult, GetRecommendationsQuery>({
      query: ({ id, list, params }) => ({
        url: `/movie/${id}/${list}`,
        method: 'GET',
        params: {
          ...params,
          api_key: tmdbApiKey,
        },
      }),
    }),

    //* Get actor's details
    getActorsDetails: builder.query<Actor, GetActorRequest>({
      query: ({ id, params }) => ({
        url: `/person/${id}`,
        method: 'GET',
        params: {
          ...params,
          api_key: tmdbApiKey,
        },
      }),
    }),

    //* Get movies by actor id
    getMoviesByActorId: builder.query<LeanMoviesQueryResult, GetMoviesByActorRequest>({
      query: ({ id, params }) => ({
        url: '/discover/movie',
        method: 'GET',
        params: {
          ...params,
          with_cast: id,
          api_key: tmdbApiKey,
        },
      }),
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorsDetailsQuery,
  useGetMoviesByActorIdQuery,
  useGetListQuery,
} = tmdbApi;
