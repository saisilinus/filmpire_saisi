/* eslint-disable camelcase */
import axios from 'axios';
import { baseUrl, tmdbApiKey } from '../config/constants';

export const moviesApi = axios.create({
  baseURL: baseUrl,
  params: {
    api_key: tmdbApiKey,
  },
});

type AuthResponse = {
  success: boolean;
  expires_at: string;
  request_token: string;
};

export const fetchToken = async () => {
  try {
    const { data } = await moviesApi.get<AuthResponse>('/authentication/token/new');
    if (data.success) {
      localStorage.setItem('request_token', data.request_token);
      window.location.href = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=${window.location.origin}`;
    }
  } catch (error) {
    console.error(error);
  }
};

type SessionResponse = {
  success?: boolean;
  session_id?: boolean;
};

export const createSessionId = async () => {
  const request_token = localStorage.getItem('request_token');

  if (request_token) {
    try {
      const { data: { session_id } } = await moviesApi.post<SessionResponse>('/authentication/session/new', { request_token });

      localStorage.setItem('session_id', String(session_id));
      return session_id;
    } catch (error) {
      console.error(error);
    }
  }
};
