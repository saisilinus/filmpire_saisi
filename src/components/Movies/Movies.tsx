import { useEffect, useState } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { useGetMoviesQuery } from '../../services/TMDB';
import { MovieList, FeaturedMovie } from '..';
import { SelectGenreOrCategoryName, SelectSearchQuery } from '../../features/currentGenreOrCategory';
import { Pagination } from '../Common';

const Movies = () => {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const location = useLocation();
  const genreIdOrCategoryName = useSelector(SelectGenreOrCategoryName);
  const searchQuery = useSelector(SelectSearchQuery);
  const { data, isLoading } = useGetMoviesQuery({ genreIdOrCategoryName, params: { page }, searchQuery });

  const md = useMediaQuery(theme.breakpoints.only('md'));
  const numberOfMovies = md ? 19 : 17;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if ((data && data.results && !data.results.length) || !data) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies that match that name.
          <br />
          Please search for something else
        </Typography>
      </Box>
    );
  }

  return (
    <div>
      <FeaturedMovie movie={data.results[0]} />
      <MovieList movies={data.results} numberOfMovies={numberOfMovies} excludeFirst />
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
    </div>
  );
};

export default Movies;
