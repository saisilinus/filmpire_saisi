export const validateEnv = (description: string, envVariable?: string) => {
  if (!envVariable) {
    console.error(`Please add the environment variable: ${description}`);
    process.exit(1);
  } else {
    return envVariable;
  }
};

export const baseUrl = 'https://api.themoviedb.org/3';
export const tmdbApiKey = validateEnv('TMDB API Key', process.env.REACT_APP_TMDB_KEY);
export const alanApiKey = validateEnv('ALAN API Key', process.env.REACT_APP_ALAN_KEY);
