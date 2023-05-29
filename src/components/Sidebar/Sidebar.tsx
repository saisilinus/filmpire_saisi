/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { changeGenreOrCategory, SelectGenreOrCategoryName } from '../../features/currentGenreOrCategory';
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';
import { ItemNotFound, ProgressIndicator } from '../Common';

const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const categories = [
  {
    label: 'Popular',
    value: 'popular',
  },
  {
    label: 'Top Rated',
    value: 'top_rated',
  },
  {
    label: 'Upcoming',
    value: 'upcoming',
  },
];

type Props = {
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ setMobileOpen }: Props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { data: genreData, isFetching } = useGetGenresQuery({});
  const genreIdOrCategoryName = useSelector(SelectGenreOrCategoryName);

  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName]);

  return (
    <>
      <Link
        to="/"
        css={css({
          display: 'flex',
          justifyContent: 'center',
          padding: '10% 0',
        })}
      >
        <img
          css={css({ width: '70%' })}
          src={theme.palette.mode === 'light' ? redLogo : blueLogo}
          alt="Filmpire logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link
            key={value}
            to="/"
            css={css({
              color: theme.palette.text.primary,
              textDecoration: 'none',
            })}
          >
            <ListItem onClick={() => dispatch(changeGenreOrCategory(value))} button>
              <ListItemIcon>
                <img
                  src={genreIcons[label.toLowerCase() as keyof typeof genreIcons]}
                  height={30}
                  css={css({
                    filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'dark',
                  })}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <ProgressIndicator />
        ) : (!genreData || !(genreData.genres && genreData.genres.length)) ? (
          <ItemNotFound errorMessage="No genres found" />
        ) : genreData?.genres.map(({ id, name }) => (
          <Link
            key={id}
            to="/"
            css={css({
              color: theme.palette.text.primary,
              textDecoration: 'none',
            })}
          >
            <ListItem onClick={() => dispatch(changeGenreOrCategory(id))} button>
              <ListItemIcon>
                <img
                  src={genreIcons[name.toLowerCase() as keyof typeof genreIcons]}
                  height={30}
                  css={css({
                    filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'dark',
                  })}
                />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
};

export default Sidebar;
