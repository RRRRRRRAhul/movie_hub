import { useParams } from "react-router-dom";
import { fetchGenreMovies } from "../store/genreSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import MovieList from "../components/MovieList";

const Genre = () => {
  const dispatch = useDispatch();
  const { genreId } = useParams();
  const { genreName } = useParams();
  const { movie, loading, error, page, hasMore } = useSelector((state) => state.genre);

  useEffect(() => {
    dispatch(fetchGenreMovies(genreId));
  }, [dispatch, genreId]);

  // Infinite Scroll Effect
    useEffect(() => {
      let isThrottled = false;
  
      const handleScroll = () => {
        if (isThrottled) return;
        isThrottled = true;
  
        setTimeout(() => (isThrottled = false), 300);
  
        const reachedBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.offsetHeight - 200;
  
        if (reachedBottom && !loading && hasMore) {
          dispatch(fetchGenreMovies(genreId)); // fetch next page
        }
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [dispatch, loading, hasMore, page]);
  

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
