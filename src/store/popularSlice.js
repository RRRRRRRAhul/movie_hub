import { createSlice } from "@reduxjs/toolkit";
import { fetchFromApi } from "../services/api";

const initialState = {
  page: 1,
  hasMore: true,
  movies: [],
  loading: false,
  error: null,
};

const popularSlice = createSlice({
  name: "popular",
  initialState,
  reducers: {
    setPopularLoader: (state, action) => {
      state.loading = action.payload;
    },
    setPopularMovies: (state, action) => {
      state.movies = [...state.movies, ...action.payload];
    },
    setPopularError: (state, action) => {
      state.error = action.payload;
    },
    incrementPopularPage: (state) => {
      state.page += 1;
    },
    setPopularHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    resetPopularMovies: (state) => {
      state.movies = [];
      state.page = 1;
      state.error = null;
      state.loading = false;
      state.hasMore = true;
    },
  },
});

export const {
  setPopularError,
  setPopularLoader,
  setPopularMovies,
  setPopularHasMore,
  incrementPopularPage,
  resetPopularMovies,
} = popularSlice.actions;
const popularReducer = popularSlice.reducer;
export default popularReducer;

export const fetchPopularMoviesData = (page) => async (dispatch) => {
  try {
    dispatch(setPopularLoader(true)); // turn on the loader

    const data = await fetchFromApi(`/movie/popular?page=${page}`);
    dispatch(setPopularMovies(data?.results || []));
    if (data.page < data.total_pages) {
      dispatch(incrementPopularPage());
    } else {
      dispatch(setPopularHasMore(false));
    }

    dispatch(setPopularLoader(false)); // turn off the loader
  } catch (error) {
    dispatch(setPopularError(error.toString())); // getting the error
    dispatch(setPopularLoader(false)); // turn off the loader after getting the error
  }
};
