import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const getPopularMovies = (page = 1) => api.get(`/movie/popular`, { params: { page } });
export const getTopRatedMovies = (page = 1) => api.get(`/movie/top_rated`, { params: { page } });
export const getUpcomingMovies = (page = 1) => api.get(`/movie/upcoming`, { params: { page } });
export const getMovieDetails = (movieId) => api.get(`/movie/${movieId}`);
export const getMovieCredits = (movieId) => api.get(`/movie/${movieId}/credits`);
export const searchMovies = (query, page = 1) => 
  api.get(`/search/movie`, { params: { query, page } });