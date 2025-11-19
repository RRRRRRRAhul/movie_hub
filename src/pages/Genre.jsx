import { useParams } from "react-router-dom";
import { fetchGenreMovies } from "../store/genreSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import MovieList from "../components/MovieList";

const Genre = () => {
  const dispatch = useDispatch();
  const { genreId } = useParams();
  const { genreName } = useParams();
  const { movie, loading, error } = useSelector((state) => state.genre);

  useEffect(() => {
    dispatch(fetchGenreMovies(genreId));
  }, [dispatch, genreId]);

  return (
    <div className="container py-4">
      <div className="text-light mb-3">
        <h1>
          {" "}
          <b>{genreName}</b> movies
        </h1>{" "}
      </div>

      {movie.length === 0 && loading && (
        <p className="text-light">Loading movies...</p>
      )}

      {error && <p className="text-danger">{error}</p>}

      <MovieList movies={movie} />
    </div>
  );
};

export default Genre;
