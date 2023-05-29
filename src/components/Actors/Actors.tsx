/* eslint-disable react/jsx-indent */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { useGetActorsDetailsQuery, useGetMoviesByActorIdQuery } from '../../services/TMDB';
import { Pagination, ProgressIndicator } from '../Common';
import MovieList from '../MovieList/MovieList';

const Actors = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data: actor, isLoading, error } = useGetActorsDetailsQuery({ id: id as string });
  const { data: movies } = useGetMoviesByActorIdQuery({ id: id as string, params: { page } });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <ProgressIndicator />
    );
  }

  if (error || !actor) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} color="primary">Go back</Button>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={2}>
          <img
            src={`https://image.tmdb.org/t/p/w780/${actor.profile_path}`}
            alt={actor.name}
            css={css({
              maxWidth: '90%',
              borderRadius: '20px',
              objectFit: 'cover',
              boxShadow: '0.5em 0.5em 1em',
              display: 'flex',
              margin: '0 auto',
            })}
          />
        </Grid>
        <Grid item lg={7} xl={10} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography variant="h2" gutterBottom>{actor.name}</Typography>
          {actor.birthday && (<Typography variant="h5" gutterBottom>{`Born: ${new Date(actor.birthday).toDateString()}`}</Typography>)}
          <Typography variant="body1" align="justify" paragraph>{actor.biography ?? 'Sorry, no biography yet...'}</Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${actor.imdb_id}`}>IMDB</Button>
            <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} color="primary">Back</Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">Movies</Typography>
        {movies && <MovieList movies={movies.results} numberOfMovies={12} />}
        {movies && <Pagination currentPage={page} setPage={setPage} totalPages={movies.total_pages} />}
      </Box>
    </>
  );
};

export default Actors;
