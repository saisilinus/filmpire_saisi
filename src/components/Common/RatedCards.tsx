import React from 'react';
import { Typography, Box } from '@mui/material';
import Movie from '../Movie/Movie';
import { LeanMovie } from '../../services/TMDB.types';

type Props = {
  title: string;
  data: [LeanMovie];
}

const RatedCards = ({ title, data }: Props) => (
  <Box>
    <Typography variant="h5" gutterBottom>{title}</Typography>
    <Box display="flex" flexWrap="wrap">
      {data.map((movie, i) => (
        <Movie key={movie.id} movie={movie} i={i} />
      ))}
    </Box>
  </Box>
);

export default RatedCards;
