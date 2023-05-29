export type TMDBError = {
  status_message?: string;
  status_code?: number;
};

export type GetMoviesParams = {
  language?: string;
  page?: number;
  region?: string;
};

export type GetMoviesRequest = {
  genreIdOrCategoryName?: string | number;
  params?: GetMoviesParams;
  searchQuery?: string;
};

export type LeanMovie = {
  poster_path?: string | null;
  adult?: boolean;
  overview?: string;
  release_date?: string;
  genre_ids?: [number];
  id?: number;
  original_title?: string;
  original_language?: string;
  title?: string;
  backdrop_path?: string | null;
  popularity?: number;
  vote_count?: number;
  video?: boolean;
  vote_average?: number;
}

export type LeanMoviesQueryResult = {
  page: number;
  results: [LeanMovie];
  total_results: number;
  total_pages: number;
}

export type GetGenresRequest = {
  api_key: string;
  language?: string;
}

export type Genre = {
  id: number;
  name: string;
}

export type GetGenresQueryResult = {
  genres?: [Genre];
}

export type GetMovieParams = {
  language?: string;
  append_to_response?: string;
}

export type GetMovieRequest = {
  id: string;
  params?: GetMovieParams;
}

export type Cast = {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path?: string;
}

export type Crew = {
  adult: boolean;
  department: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  job: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export type Video = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null | {
    backdrop_path: string | null;
    id: number;
    name: string;
    poster_path: string | null;
  };
  credits?: {
    cast: [Cast];
    crew: [Crew];
  };
  budget: number;
  genres: [Genre];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: [{
    name: string;
    id: number;
    logo_path: string | null;
    origin_country: string;
  }];
  production_countries: [{
    iso_3166_1: string;
    name: string;
  }];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: [{
    iso_639_1: string;
    name: string;
    english_name?: string;
  }];
  status: string;
  tagline?: string | null;
  title: string;
  video: boolean;
  videos: {
    results: [Video];
  };
  vote_average: number;
  vote_count: number;
}

export type GetRecommendationsParams = {
  language?: string;
  page?: number;
}

export type GetRecommendationsQuery = {
  id: string;
  list: string;
  params?: GetRecommendationsParams;
}

export type GetActorParams = {
  language?: string;
  append_to_response?: string;
}

export type GetActorRequest = {
  id: string;
  params?: GetActorParams;
}

export type Actor = {
  birthday: string | null;
  known_for_department: string;
  deathday: string | null;
  id: number;
  name: string;
  also_known_as: [string];
  gender: 0 | 1 | 2 | 3;
  biography: string | null;
  popularity: number;
  place_of_birth: string | null;
  profile_path: string | null;
  adult: boolean;
  imdb_id: string;
  homepage: string | null;
}

export type GetMoviesByActorRequest = {
  id: string;
  params?: {
    page?: number;
    sort_by?: string;
  }
}

export type GetFavoritesRequest = {
  accountId: number;
  sessionId: string;
  listName: string;
  page?: number;
}
