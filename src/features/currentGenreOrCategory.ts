/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

type GenreOrCategoryState = {
  genreIdOrCategoryName: string | number,
  page: number,
  searchQuery: string,
}

const initialState: GenreOrCategoryState = {
  genreIdOrCategoryName: '',
  page: 1,
  searchQuery: '',
};

export const genreOrCategory = createSlice({
  name: 'genreOrCategory',
  initialState,
  reducers: {
    changeGenreOrCategory: (state, action: PayloadAction<GenreOrCategoryState['genreIdOrCategoryName']>) => {
      state.genreIdOrCategoryName = action.payload;
      state.searchQuery = '';
      state.page = 1;
    },
    changeSearchQuery: (state, action: PayloadAction<GenreOrCategoryState['searchQuery']>) => {
      state.searchQuery = action.payload;
    },
    changeSearchQuerySlowly: (state, action: PayloadAction<GenreOrCategoryState['searchQuery']>) => {
      if (action.payload.length % 3 === 0) {
        state.searchQuery = action.payload;
      }
    },
    changePage: (state, action: PayloadAction<GenreOrCategoryState['page']>) => {
      state.page = action.payload;
    },
  },
});

export const { changeGenreOrCategory, changeSearchQuery, changePage, changeSearchQuerySlowly } = genreOrCategory.actions;

export const SelectGenreOrCategoryName = (state: RootState) => state.currentGenreOrCategory.genreIdOrCategoryName;
export const SelectSearchQuery = (state: RootState) => state.currentGenreOrCategory.searchQuery;
export const SelectPage = (state: RootState) => state.currentGenreOrCategory.page;

export default genreOrCategory.reducer;
