import { useDispatch, useSelector } from "react-redux";
import {
  fetchPopularMoviesData,
  resetPopularMovies,
} from "../store/popularSlice";
import { useEffect } from "react";
import MovieList from "../components/MovieList";

const Popular = () => {
  const dispatch = useDispatch();
  const { movies, loading, error, page, hasMore } = useSelector(
    (state) => state.popular
  );

  useEffect(() => {
    dispatch(resetPopularMovies());
    dispatch(fetchPopularMoviesData(1));
  }, [dispatch]);

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
        dispatch(fetchPopularMoviesData(page)); // fetch next page
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, loading, hasMore, page]);
  
  return (
    <div className="container py-4">
      <h2 className="text-light text-center mb-3">Popular Movies</h2>

      {movies.length === 0 && loading && (
        <p className="text-light">Loading movies...</p>
      )}

      {error && <p className="text-danger">{error}</p>}

      <MovieList movies={movies} />

      {loading && <p className="text-light mt-3">Loading more...</p>}
      {!hasMore && <p className="text-secondary mt-3">No more movies</p>}
    </div>
  );
};

export default Popular;
