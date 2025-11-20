import { createSlice } from "@reduxjs/toolkit";
import { fetchFromApi } from "../services/api";

const initialState = {
  query: "",
  results: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  hasMore: true,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },

    resetResults: (state) => {
      state.results = [];
      state.page = 1;
    },

    setResults: (state, action) => {
      state.results = action.payload;
    },

    appendResults: (state, action) => {
      state.results = [...state.results, ...action.payload];
    },

    incrementSearchPage: (state) => {
      state.page += 1;
    },

    setSearchLoading: (state, action) => {
      state.loading = action.payload;
    },

    setSearchError: (state, action) => {
      state.error = action.payload;
    },

    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },

    setSearchHasMore: (state, action) => {
        state.hasMore = action.payload;
    }
  },
});

export const {
  setQuery,
  setResults,
  appendResults,
  setSearchError,
  setSearchLoading,
  setTotalPages,
  resetResults,
  incrementSearchPage,
  setSearchHasMore
} = searchSlice.actions;
const searchReducer = searchSlice.reducer;
export default searchReducer;

export const fetchSearchMovies =
  (query, page = 1) =>
  async (dispatch, getState) => {
    try {
      dispatch(setSearchLoading(true));

      // Save query only for first page
      if (page === 1) {
        dispatch(setQuery(query));
      } else {
        // If page not given, read it from state for infinite scroll
        query = getState().search.query;
      }

      const data = await fetchFromApi(
        `/search/movie?query=${query}&page=${page}`
      );

      if (page === 1) {
        // First page → replace results
        dispatch(setResults(data.results));
      } else {
        // Next pages → append new results
        dispatch(appendResults(data.results));
      }

      // Check if more pages exist
      if (data.page < data.total_pages) {
        dispatch(incrementSearchPage());
      } else {
        dispatch(setSearchHasMore(false));
      }

      dispatch(setSearchLoading(false));
    } catch (error) {
      dispatch(setSearchError(error.toString()));
      dispatch(setSearchLoading(false));
    }
  };
