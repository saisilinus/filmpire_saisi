/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, useTheme } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { changeSearchQuery, changeSearchQuerySlowly } from '../../features/currentGenreOrCategory';

const Search = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();
  const [query, setQuery] = useState('');

  useEffect(() => {
    setQuery('');
  }, [location]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(changeSearchQuery(query));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    dispatch(changeSearchQuerySlowly(e.target.value));
  };

  if (location.pathname !== '/') return null;
  return (
    <div css={css({
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      },
    })}
    >
      <TextField
        onKeyPress={handleKeyPress}
        value={query}
        onChange={handleChange}
        variant="standard"
        InputProps={{
          sx: {
            ...(theme.palette.mode === 'light' && { color: 'black' }),
            ...(theme.palette.mode === 'light' && { filter: 'invert(1)' }),
            [theme.breakpoints.down('sm')]: {
              marginTop: '-10px',
              marginBottom: '10px',
            },
          },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Search;
