/* eslint-disable camelcase */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Sidebar, Search } from '..';
import { createSessionId, fetchToken, moviesApi } from '../../utils';
import { SelectAuthDetails, setUser, User } from '../../features/auth';
import { useColorModeContext } from '../Common/ToggleColorMode';

const drawerWidth = '240px';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const dispatch = useDispatch();
  const { toggleColorMode } = useColorModeContext();
  const { isAuthenticated, user } = useSelector(SelectAuthDetails);
  const request_token = localStorage.getItem('request_token');
  const session_id = localStorage.getItem('session_id');

  useEffect(() => {
    const logInUser = async () => {
      if (request_token) {
        if (session_id) {
          const { data: userData } = await moviesApi.get<User>(`/account?session_id=${session_id}`);
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get<User>(`/account?session_id=${sessionId}`);
          dispatch(setUser(userData));
        }
      }
    };

    logInUser();
  }, [request_token]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            height: 80,
            display: 'flex',
            justifyContent: 'space-between',
            marginLeft: '240px',
            [theme.breakpoints.down('sm')]: {
              marginLeft: 0,
              flexWrap: 'wrap',
            },
          }}
        >
          {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            style={{ outline: 'none' }}
            onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
            sx={{
              marginRight: 2,
              [theme.breakpoints.up('sm')]: {
                display: 'none',
              },
            }}
          >
            <Menu />
          </IconButton>
          )}
          <IconButton
            color="inherit"
            sx={{
              ml: 1,
            }}
            onClick={toggleColorMode}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {(!isAuthenticated || !user) ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
                onClick={() => {}}
                sx={{
                  '&:hover': {
                    color: 'white !important',
                    textDecoration: 'none',
                  },
                }}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user.avatar.tmdb.avatar_path}`}
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav
          css={css({
            [theme.breakpoints.up('sm')]: {
              width: drawerWidth,
              flexShrink: 0,
            },
          })}
        >
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              ModalProps={{ keepMounted: true }}
              sx={{
                width: drawerWidth,
              }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              sx={{
                width: drawerWidth,
              }}
              variant="permanent"
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
