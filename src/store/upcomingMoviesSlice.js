import { createSlice } from "@reduxjs/toolkit";
import { fetchFromApi } from "../services/api";

const initialState = {
  page: 1,
  hasMore: true,
  movies: [],
  loading: false,
  error: null,
};

const upcomingMovieSlice = createSlice({
  name: "upcoming",
  initialState,
  reducers: {
    setUpcomingLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUpcomingError: (state, action) => {
      state.error = action.payload;
    },
    setUpcomingMovies: (state, action) => {
      state.movies = [...state.movies, ...action.payload];
    },
    incrementUpcominMovies: (state) => {
      state.page += 1;
    },
    setUpcomingHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    resetUpcomingMovies: (state) => {
      state.movies = [];
      state.page = 1;
      state.error = null;
      state.loading = false;
      state.hasMore = true;
    },
  },
});

export const {
  setUpcomingError,
  setUpcomingLoading,
  setUpcomingMovies,
  setUpcomingHasMore,
  incrementUpcominMovies,
  resetUpcomingMovies
} = upcomingMovieSlice.actions;
const upcomingMovieReducer = upcomingMovieSlice.reducer;
export default upcomingMovieReducer;

export const fetchUpcomingMoviesData = (page) => async (dispatch) => {
  try {
    dispatch(setUpcomingLoading(true)); // turn on the loader

    const data = await fetchFromApi(`/movie/upcoming?page=${page}`);
    dispatch(setUpcomingMovies(data.results));

    if (data.page < data.total_pages) {
      dispatch(incrementUpcominMovies());
    } else {
      dispatch(setUpcomingHasMore(false));
    }
    
    dispatch(setUpcomingLoading(false)); // turn off the loader
  } catch (error) {
    dispatch(setUpcomingError(error.toString())); // getting the error
    dispatch(setUpcomingLoading(false)); // turn off the loader after getting the error
  }
};
