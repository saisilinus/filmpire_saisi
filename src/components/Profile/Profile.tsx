import React, { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { SelectAuthDetails, User } from '../../features/auth';
import { useGetListQuery } from '../../services/TMDB';
import { RatedCards } from '../Common';

const Profile = () => {
  const { user } = useSelector(SelectAuthDetails);
  const sessionId = localStorage.getItem('session_id') as string;

  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({ accountId: (user as User).id, sessionId, listName: 'favorite/movies', page: 1 });
  const { data: watchlistedMovies, refetch: refetchWatchlist } = useGetListQuery({ accountId: (user as User).id, sessionId, listName: 'watchlist/movies', page: 1 });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlist();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>My Profile</Typography>
        <Button color="inherit" onClick={logout}>Logout &nbsp; <ExitToApp /></Button>
      </Box>
      {!((!favoriteMovies || favoriteMovies?.results.length) && (!watchlistedMovies || watchlistedMovies?.results.length))
        ? <Typography>Add favorites or watchlist some movies to see them here!</Typography>
        : (
          <Box>
            {(favoriteMovies && favoriteMovies.results.length) && <RatedCards title="Favorite Movies" data={favoriteMovies.results} />}
            {(watchlistedMovies && watchlistedMovies.results.length) && <RatedCards title="Watchlist" data={watchlistedMovies.results} />}
          </Box>
        )}
    </Box>
  );
};

export default Profile;
