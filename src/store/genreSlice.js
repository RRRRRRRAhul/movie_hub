import { createSlice } from "@reduxjs/toolkit";
import { fetchFromApi } from "../services/api";

const initialState = {
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
      state.movie = action.payload;
    },
  },
});

export const { setGenreError, setGenreLoader, setGenreMovie } =
  genreSlice.actions;
const genreReducer = genreSlice.reducer;
export default genreReducer;

export const fetchGenreMovies = (genreId) => async (dispatch) => {
  try {
    dispatch(setGenreLoader(true));

    const data = await fetchFromApi(`/discover/movie?with_genres=${genreId}`);

    dispatch(setGenreMovie(data?.results || []));

    dispatch(setGenreLoader(false));
  } catch (error) {
    dispatch(setGenreError(error.toString()));
    dispatch(setGenreLoader(false));
  }
};
