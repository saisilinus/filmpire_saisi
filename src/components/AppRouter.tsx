import React from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from '../config/routes';
import { Actors, MovieInformation, Movies, Profile, App } from '.';

const AppRouter = () => (
  <Routes>
    <Route path={routes.Home.relativePath} element={<App />}>
      <Route index element={<Movies />} />
      <Route path={routes.Profile.relativePath} element={<Profile />} />
      <Route path={routes.Movie.relativePath} element={<MovieInformation />} />
      <Route path={routes.Actor.relativePath} element={<Actors />} />
    </Route>
    <Route path="*" element={<h1>Not Found</h1>} />
  </Routes>
);

export default AppRouter;
