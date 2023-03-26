import React from 'react';
import { CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import { Navbar } from '.';

const ToolBar = styled.div`
  height: 70px
`;

const Root = styled.div`
  display: flex;
  height: 100%;  
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 2em;
`;

const App = () => (
  <Root>
    <CssBaseline />
    <Navbar />
    <Content>
      <ToolBar />
      <Outlet />
    </Content>
  </Root>
);

export default App;
