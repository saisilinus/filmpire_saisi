/* eslint-disable react/jsx-indent */
/** @jsxImportSource @emotion/react */
import { css, Theme } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, Rating, useTheme, SxProps } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { useGetListQuery, useGetMovieQuery, useGetRecommendationsQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';
import { changeGenreOrCategory } from '../../features/currentGenreOrCategory';
import MovieList from '../MovieList/MovieList';
import { Pagination } from '../Common';
import { SelectAuthDetails, User } from '../../features/auth';
import { tmdbApiKey } from '../../config/constants';

const MovieInformation = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector(SelectAuthDetails);
  const sessionId = localStorage.getItem('session_id') as string;

  if (!id) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  const { data: movie, isLoading, error } = useGetMovieQuery({ id: id as string });
  const { data: favoriteMovies } = useGetListQuery({ accountId: (user as User).id, sessionId, listName: 'favorite/movies', page: 1 });
  const { data: watchlistedMovies } = useGetListQuery({ accountId: (user as User).id, sessionId, listName: 'watchlist/movies', page: 1 });
  const { data: recommendations } = useGetRecommendationsQuery({ id: id as string, list: 'recommendations', params: { page } });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setIsMovieFavorited(!!(favoriteMovies?.results.find((favorite) => favorite.id === movie?.id)));
  }, [favoriteMovies, movie]);

  useEffect(() => {
    setIsMovieWatchlisted(!!(watchlistedMovies?.results.find((watchlisted) => watchlisted.id === movie?.id)));
  }, [watchlistedMovies, movie]);

  const containerSpaceAround: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '10px 0 !important',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
  };

  const buttonsContainer: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  };

  const getTrailer = () => movie?.videos.results.find((video) => video.type === 'Trailer')?.key ?? movie?.videos.results[0].key;

  const addToFavorites = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user && user.id}/favorite?api_key=${tmdbApiKey}&session_id=${sessionId}`, {
      media_type: 'movie',
      media_id: id,
      favorite: !isMovieFavorited,
    });

    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchlist = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user && user.id}/watchlist?api_key=${tmdbApiKey}&session_id=${sessionId}`, {
      media_type: 'movie',
      media_id: id,
      watchlist: !isMovieWatchlisted,
    });

    setIsMovieWatchlisted((prev) => !prev);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error || !movie) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something has gone wrong - Go back</Link>
      </Box>
    );
  }

  return (
    <Grid
      container
      sx={containerSpaceAround}
    >
      <Grid item sm={12} lg={5} xl={3}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          css={css({
            borderRadius: '20px',
            boxShadow: '0.5em 1em 1em rgb(64,64,70)',
            width: '80%',
            [theme.breakpoints.down('md')]: {
              margin: '0 auto',
              width: '50%',
              // height: '350px',
              display: 'flex',
              marginBottom: '30px',
            },
            [theme.breakpoints.down('sm')]: {
              margin: '0 auto',
              width: '100%',
              // height: '350px',
              marginBottom: '30px',
            },
          })}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {movie.title} ({movie.release_date.split('-')[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {movie?.tagline}
        </Typography>
        <Grid
          item
          sx={containerSpaceAround}
        >
          <Box display="flex" alignContent="center" justifyContent="center">
            <Rating readOnly value={movie.vote_average / 2} />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{
                marginLeft: '10px',
              }}
            >
              {movie.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {movie.runtime}min | Language: {movie.spoken_languages[0].english_name ?? movie.spoken_languages[0].name}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            margin: '10px 0 !important',
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}
        >
          {movie.genres.map((genre) => (
            <Link
              key={genre.id}
              to="/"
              onClick={() => dispatch(changeGenreOrCategory(genre.id))}
              css={css({
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textDecoration: 'none',
                [theme.breakpoints.down('sm')]: {
                  padding: '0.5rem 1rem',
                },
              })}
            >
              <img
                src={genreIcons[genre.name.toLowerCase() as keyof typeof genreIcons]}
                height={30}
                css={css({
                  filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'dark',
                  marginRight: '10px',
                })}
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: '2rem' }}>{movie.overview}</Typography>
        <Typography variant="h5" gutterBottom>Top Cast</Typography>
        <Grid item container spacing={2}>
          {movie.credits && movie.credits.cast.map((character, i) => (
            character.profile_path && (
              <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{ textDecoration: 'none' }}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                  alt={character.name}
                  css={css({
                    width: '100%',
                    maxWidth: '7em',
                    height: '8em',
                    objectFit: 'cover',
                    borderRadius: '10px',
                  })}
                />
                <Typography color="textPrimary">{character.name}</Typography>
                <Typography color="textSecondary">{character.character.split('/')[0]}</Typography>
              </Grid>
            )
          )).slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: '2rem' }}>
          <div css={css(buttonsContainer as unknown as TemplateStringsArray)}>
            <Grid item xs={12} sm={6} sx={buttonsContainer}>
              <ButtonGroup size="small" variant="outlined">
                {movie.homepage && <Button target="_blank" rel="noopener noreferrer" href={movie.homepage} endIcon={<Language />}>Website</Button>}
                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${movie.imdb_id}`} endIcon={<MovieIcon />}>IMDB</Button>
                <Button onClick={() => setOpen(true)} href="#" endIcon={<Theaters />}>Trailer</Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} sx={buttonsContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button
                  onClick={addToFavorites}
                  endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}
                >
                  {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button
                  onClick={addToWatchlist}
                  endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                >
                  Watchlist
                </Button>
                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                  <Typography style={{ textDecoration: 'none' }} component={Link} to="/" color="inherit" variant="subtitle2">Back</Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">You might also like</Typography>
        {/* Loop through the recommended movies */}
        {recommendations
          ? (
            <>
              <MovieList movies={recommendations.results} numberOfMovies={12} />
              <Pagination currentPage={page} setPage={setPage} totalPages={recommendations.total_pages} />
            </>
          )
          : <Box>Sorry, nothing was found</Box>}
      </Box>
      <Modal
        closeAfterTransition
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {(movie.videos.results.length > 0)
          ? (
          <iframe
            frameBorder="0"
            title="Trailer"
            src={`https://www.youtube.com/embed/${getTrailer()}?autoplay=1`}
            allow="autoplay"
            css={css({
              width: '50%',
              height: '50%',
              [theme.breakpoints.down('sm')]: {
                width: '90%',
                height: '90%',
              },
            })}
          />
          )
          : <Box>Sorry, nothing was found</Box>}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;
