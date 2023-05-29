/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export type User = {
  avatar: {
    gravatar: {
      hash: string;
    },
    tmdb: {
      avatar_path: string | null;
    },
  },
  id: number,
  iso_639_1: string,
  iso_3166_1: string,
  name: string,
  include_adult?: boolean,
  username: string,
};

type AuthState = {
  user: null | User,
  isAuthenticated: boolean,
  sessionId: string | null,
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  sessionId: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.sessionId = localStorage.getItem('session_id');

      localStorage.setItem('accountId', String(action.payload.id));
    },
  },
});

export const { setUser } = authSlice.actions;

export const SelectAuthDetails = (state: RootState) => state.auth;

export default authSlice.reducer;
