import { createSlice } from "@reduxjs/toolkit";
import { fetchFromApi } from "../services/api";

const initialState = {
  page: 1,
  hasMore: true,
  movies: [],
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setMovies: (state, action) => {
      state.movies = [...state.movies, ...(action.payload || [])];

    },
    incrementPage: (state) => {
      state.page += 1;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    resetMovies: (state) => {
      state.movies = []
      state.page = 1
      state.error = null
      state.loading = false
      state.hasMore = true
    }
  },
});

export const {
  setLoader,
  setError,
  setMovies,
  incrementPage,
  setHasMore,
  resetMovies
} = moviesSlice.actions;

export default moviesSlice.reducer;

// async thunk
export const fetchMoviesData = (page) => async (dispatch) => {
  try {
    dispatch(setLoader(true));

    const data = await fetchFromApi(`/movie/popular?page=${page}`);

    dispatch(setMovies(data?.results || []));

    if (data.page < data.total_pages) {
      dispatch(incrementPage());
    } else {
      dispatch(setHasMore(false));
    }

    dispatch(setLoader(false));
  } catch (error) {
    dispatch(setError(error.toString()));
    dispatch(setLoader(false));
  }
};

