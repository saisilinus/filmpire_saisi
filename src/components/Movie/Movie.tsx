/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { LeanMovie } from '../../services/TMDB.types';
import { paths } from '../../config/routes';

type Props = {
  movie: LeanMovie;
  i: number;
}

const Movie = ({ movie, i }: Props) => {
  const theme = useTheme();

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={2}
      sx={{
        padding: '5px',
      }}
    >
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Link
          to={`/${paths.Movie}/${movie.id}`}
          css={css({
            alignItems: 'center',
            fontWeight: 'bolder',
            textDecoration: 'none',
            [theme.breakpoints.up('xs')]: {
              display: 'flex',
              flexDirection: 'column',
            },
            '&:hover': {
              cursor: 'pointer',
            },
          })}
        >
          <img
            alt={movie.title}
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://www.fillmurray.com/200/300'}
            css={css({
              borderRadius: '20px',
              height: '300px',
              marginBottom: '10px',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            })}
          />
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.text.primary,
              textOverflow: 'ellipsis',
              width: '230px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              marginTop: '10px',
              marginBottom: 0,
              textAlign: 'center',
            }}
          >
            {movie.title}
          </Typography>
          {movie.vote_average && (
          <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>
          </Tooltip>
          )}
        </Link>
      </Grow>
    </Grid>
  );
};

export default Movie;
