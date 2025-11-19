import { createSlice } from "@reduxjs/toolkit";
import { fetchFromApi } from "../services/api";

const initialState = {
  movie: null,
  loading: false,
  error: null,
};

const movieDetailSlice = createSlice({
  name: "movieDetail",
  initialState,
  reducers: {
    setDetailLoader: (state, action) => {
      state.loading = action.payload;
    },
    setMoviesDetail: (state, action) => {
      state.movie = action.payload;
    },
    setDetailError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setDetailError, setDetailLoader, setMoviesDetail } =
  movieDetailSlice.actions;

const movieDetailReducer = movieDetailSlice.reducer;
export default movieDetailReducer;

// Thunk to fetch movie details
export const fetchMoviesDataById = (id) => async (dispatch) => {
  try {
    dispatch(setDetailLoader(true));

    const data = await fetchFromApi(`/movie/${id}`);
    const structuredMovie = {
      ...data,
      rating: data.vote_average,
      releaseDate: data.release_date,
      genres: data.genres.map((g) => ({
        id: g.id,
        name: g.name,
      })),
    };

    dispatch(setMoviesDetail(structuredMovie));

    dispatch(setDetailLoader(false));
  } catch (error) {
    dispatch(setDetailError(error.toString()));
    dispatch(setDetailLoader(false));
  }
};
