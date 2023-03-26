interface IRoutePath {
  relativePath: string;
  absolutePath: string;
}

interface IRoutes {
  Home: IRoutePath;
  NotFound: IRoutePath;
  Profile: IRoutePath;
  Movie: IRoutePath;
  Actor: IRoutePath;
}

const paths: Record<keyof IRoutes, string> = {
  Home: '/',
  NotFound: 'not-found',
  Profile: 'profile',
  Movie: 'movies',
  Actor: 'actors',
};

const routes: IRoutes = {
  Home: { relativePath: paths.Home, absolutePath: paths.Home },
  NotFound: { relativePath: paths.NotFound, absolutePath: `/${paths.NotFound}` },
  Profile: { relativePath: `${paths.Profile}/:id`, absolutePath: `/${paths.Profile}/:id` },
  Movie: { relativePath: `${paths.Movie}/:id`, absolutePath: `/${paths.Movie}/:id` },
  Actor: { relativePath: `${paths.Actor}/:id`, absolutePath: `/${paths.Actor}/:id` },
};

export default routes;
