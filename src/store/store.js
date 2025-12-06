import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";
import movieDetailReducer from "./movieDetailSlice";
import popularReducer from "./popularSlice";
import topRatedReducer from "./topRatedSlice";
import upcomingMovieReducer from "./upcomingMoviesSlice";
import genreReducer from "./genreSlice";
import searchReducer from "./searchSlice";
import castAndCrewReducer from "./castAndCrewSlice";

const store = configureStore({
    reducer: {
        movies : moviesReducer,
        movieDetail: movieDetailReducer,
        popular: popularReducer,
        topRated: topRatedReducer,
        upcoming: upcomingMovieReducer,
        genre: genreReducer,
        search: searchReducer,
        castAndCrew: castAndCrewReducer,
    }
});

export default store;