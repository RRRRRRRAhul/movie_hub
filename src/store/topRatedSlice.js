import { createSlice } from "@reduxjs/toolkit";
import { fetchFromApi } from "../services/api";

const initialState = {
  page: 1,
  hasMore: true,
  movies: [],
  loading: false,
  error: null,
};

const topRatedSlice = createSlice({
  name: "toprated",
  initialState,
  reducers: {
    setTopRatedLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTopRatedMovies: (state, action) => {
      state.movies = [...state.movies, ...action.payload];
    },
    setTopRatedError: (state, action) => {
      state.error = action.payload;
    },
    incrementTopRatedPage: (state) => {
      state.page += 1;
    },
    setTopRatedHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    resetTopRatedMovies: (state) => {
      state.movies = [];
      state.page = 1;
      state.error = null;
      state.loading = false;
      state.hasMore = true;
    },
  },
});

export const {
  setTopRatedError,
  setTopRatedLoading,
  setTopRatedMovies,
  incrementTopRatedPage,
  setTopRatedHasMore,
  resetTopRatedMovies
} = topRatedSlice.actions;
const topRatedReducer = topRatedSlice.reducer;
export default topRatedReducer;

export const fetchTopRatedMoviesData = (page) => async (dispatch) => {
  try {
    dispatch(setTopRatedLoading(true)); // turn on the loader

    const data = await fetchFromApi(`/movie/top_rated?page=${page}`);
    
    dispatch(setTopRatedMovies(data.results));
    if (data.page < data.total_pages) {
      dispatch(incrementTopRatedPage());
    } else {
      dispatch(setTopRatedHasMore(false));
    }

    dispatch(setTopRatedLoading(false)); // turn off the loader
  } catch (error) {
    dispatch(setTopRatedError(error.toString())); // getting the error
    dispatch(setTopRatedLoading(false)); // turn off the loader after getting the error
  }
};
