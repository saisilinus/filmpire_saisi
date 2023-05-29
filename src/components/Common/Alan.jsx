import { useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { alanApiKey } from '../../config/constants';
import { useColorModeContext } from './ToggleColorMode';
import { fetchToken } from '../../utils';
import { changeGenreOrCategory, changeSearchQuery } from '../../features/currentGenreOrCategory';

const useAlan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setMode } = useColorModeContext();

  useEffect(() => {
    alanBtn({
      key: alanApiKey,
      onCommand: ({ command, mode, genreOrCategory, genres, query }) => {
        if (command === 'chooseGenre') {
          const foundGenre = genres.find((g) => g.name.toLowerCase() === genreOrCategory.toLowerCase());
          if (foundGenre) {
            navigate('/');
            dispatch(changeGenreOrCategory(foundGenre.id));
          } else {
            const category = genreOrCategory.startsWith('top') ? 'top_rated' : genreOrCategory;
            navigate('/');
            dispatch(changeGenreOrCategory(category));
          }
        } else if (command === 'changeMode') {
          if (mode === 'light') {
            setMode('light');
          } else {
            setMode('dark');
          }
        } else if (command === 'login') {
          fetchToken();
        } else if (command === 'logout') {
          localStorage.clear();
          navigate('/');
        } else if (command === 'search') {
          dispatch(changeSearchQuery(query));
        }
      },
    });
  }, []);
};

export default useAlan;
