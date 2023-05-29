import React from 'react';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LeanMoviesQueryResult } from '../../services/TMDB.types';
import { Movie } from '..';

type Props = {
  movies: LeanMoviesQueryResult['results'];
  numberOfMovies?: number;
  excludeFirst?: boolean;
}

const MovieList = ({ movies, numberOfMovies, excludeFirst }: Props) => {
  const theme = useTheme();
  const startFrom = excludeFirst ? 1 : 0;
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        overflow: 'auto',
        [theme.breakpoints.down('sm')]: {
          justifyContent: 'center',
        },
      }}
    >
      {movies && movies.slice(startFrom, numberOfMovies).map((movie, index) => (
        <Movie key={index} movie={movie} i={index} />
      ))}
    </Grid>
  );
};

MovieList.defaultProps = {
  numberOfMovies: 20,
  excludeFirst: false,
};

export default MovieList;
