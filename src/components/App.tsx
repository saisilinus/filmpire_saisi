/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useRef } from 'react';
import { CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Navbar } from '.';
import { ScrollToTop, useAlan } from './Common';

const App = () => {
  const alanBtnContainer = useRef<HTMLDivElement>(null);
  useAlan();

  return (
    <div css={css({
      display: 'flex',
      height: 1,
    })}
    >
      <CssBaseline />
      <Navbar />
      <main
        css={css({
          flexGrow: 1,
          padding: '2em',
          width: '100%',
        })}
        id="back-to-top-anchor"
      >
        <div css={css({ height: 70 })} />
        <Outlet />
      </main>
      <div ref={alanBtnContainer} />
      <ScrollToTop />
    </div>
  );
};

export default App;
