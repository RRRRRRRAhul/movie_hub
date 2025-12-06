import { createSlice } from "@reduxjs/toolkit";
import { fetchFromApi } from "../services/api";

const initialState = {
  cast: [],
  crew: [],
  cdloading: false,
  cderror: null,
};

const castAndCrewSlice = createSlice({
  name: "castAndCrew",
  initialState,
  reducers: {
    setCastandCrewLoader: (state, action) => {
      state.cdloading = action.payload;
    },
    setCastandCrewError: (state, action) => {
      state.cderror = action.payload;
    },
    setCast: (state, action) => {
      state.cast = action.payload;
    },
    setCrew: (state, action) => {
      state.crew = action.payload;
    },
  },
});

export const { setCast, setCastandCrewError, setCastandCrewLoader, setCrew } =
  castAndCrewSlice.actions;

const castAndCrewReducer = castAndCrewSlice.reducer;
export default castAndCrewReducer;

// Thunk to fetch cast and crew details
export const fetchCastaandCrewByMovieId = (id) => async (dispatch) => {
  dispatch(setCastandCrewError(null));
  dispatch(setCastandCrewLoader(true));
  try {
    const data = await fetchFromApi(`/movie/${id}/credits`);
    dispatch(setCast(data.cast || []));
    dispatch(setCrew(data.crew || []));
    dispatch(setCastandCrewLoader(false));
  } catch (error) {
    dispatch(setCastandCrewError(error.toString()));
    dispatch(setCastandCrewLoader(false));
  } finally {
    dispatch(setCastandCrewLoader(false));
  }
};
