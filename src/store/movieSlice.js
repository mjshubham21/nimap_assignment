import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../services/api';

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopular',
  async (page) => {
    const response = await api.getPopularMovies(page);
    return response.data;
  }
);

export const fetchTopRatedMovies = createAsyncThunk(
  'movies/fetchTopRated',
  async (page) => {
    const response = await api.getTopRatedMovies(page);
    return response.data;
  }
);

export const fetchUpcomingMovies = createAsyncThunk(
  'movies/fetchUpcoming',
  async (page) => {
    const response = await api.getUpcomingMovies(page);
    return response.data;
  }
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchDetails',
  async (movieId) => {
    const [details, credits] = await Promise.all([
      api.getMovieDetails(movieId),
      api.getMovieCredits(movieId)
    ]);
    return { ...details.data, credits: credits.data };
  }
);

export const searchMovies = createAsyncThunk(
  'movies/search',
  async ({ query, page }) => {
    const response = await api.searchMovies(query, page);
    return response.data;
  }
);

const initialState = {
  popular: { results: [], page: 1, total_pages: 1, loading: false },
  topRated: { results: [], page: 1, total_pages: 1, loading: false },
  upcoming: { results: [], page: 1, total_pages: 1, loading: false },
  searchResults: { results: [], page: 1, total_pages: 1, loading: false },
  movieDetails: { loading: false, data: null },
  error: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.popular.loading = true;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.popular = {
          ...action.payload,
          loading: false
        };
      })
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.topRated.loading = true;
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.topRated = {
          ...action.payload,
          loading: false
        };
      })
      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.upcoming.loading = true;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.upcoming = {
          ...action.payload,
          loading: false
        };
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.movieDetails.loading = true;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.movieDetails = {
          data: action.payload,
          loading: false
        };
      })
      .addCase(searchMovies.pending, (state) => {
        state.searchResults.loading = true;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.searchResults = {
          ...action.payload,
          loading: false
        };
      });
  },
});

export default movieSlice.reducer;