import { createSlice } from "@reduxjs/toolkit";
import { fetchFromApi } from "../services/api";

const initialState = {
  page: 1,
  hasMore: true,
  movie: [],
  loading: false,
  error: null,
};

const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {
    setGenreLoader: (state, action) => {
      state.loading = action.payload;
    },
    setGenreError: (state, action) => {
      state.error = action.payload;
    },
    setGenreMovie: (state, action) => {
      state.movie = [...state.movie,...action.payload]
    },
    incrementGenrePage: (state) => {
      state.page += 1;
    },
    setGenreHasMore: (state, action) => {
      state.hasMore = action.payload;
    }
  },
});

export const { setGenreError, setGenreLoader, setGenreMovie, incrementGenrePage, setGenreHasMore } =
  genreSlice.actions;
const genreReducer = genreSlice.reducer;
export default genreReducer;

export const fetchGenreMovies = (genreId) => async (dispatch, getState) => {
  try {
    dispatch(setGenreLoader(true));

    const { page } = getState().genre;  // <-- Read page from Redux

    const data = await fetchFromApi(
      `/discover/movie?with_genres=${genreId}&page=${page}`
    );

    dispatch(setGenreMovie(data?.results || []));

    if (data.page < data.total_pages) {
      dispatch(incrementGenrePage());
    } else {
      dispatch(setGenreHasMore(false));
    }

    dispatch(setGenreLoader(false));
  } catch (error) {
    dispatch(setGenreError(error.toString()));
    dispatch(setGenreLoader(false));
  }
};

