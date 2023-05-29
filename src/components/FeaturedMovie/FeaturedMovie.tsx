import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { LeanMovie } from '../../services/TMDB.types';
import './styles.css';

type Props = {
  movie: LeanMovie;
}

const FeaturedMovie = ({ movie }: Props) => {
  const theme = useTheme();
  if (!movie) return null;

  return (
    <Box
      component={Link}
      to={`/movies/${movie.id}`}
      sx={{
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'center',
        height: '490px',
        textDecoration: 'none',
      }}
    >
      <Card
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          flexDirection: 'column',
          backgroundColor: 'rgba(0,0,0,1)',
        }}
        classes={{ root: 'cardRoot' }}
      >
        <CardMedia
          component="img"
          alt={movie.title}
          image={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          title={movie.title}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            height: '100%',
            width: '100%',
            opacity: 0.575,
          }}
        />
        <Box padding="20px">
          <CardContent
            sx={{
              color: '#fff',
              width: '40%',
              [theme.breakpoints.down('sm')]: {
                width: '100%',
              },
            }}
            classes={{ root: 'cardContentRoot' }}
          >
            <Typography variant="h5" gutterBottom>{movie.title}</Typography>
            <Typography variant="body2">{movie.overview}</Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default FeaturedMovie;
