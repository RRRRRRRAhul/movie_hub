import MovieList from "../components/MovieList";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesData, resetMovies } from "../store/moviesSlice";
import { useEffect } from "react";

const HomePage = () => {
  const dispatch = useDispatch();
  const { loading, error, movies, page, hasMore } = useSelector(
    (state) => state.movies
  );

  // Load the first batch of movies
  useEffect(() => {
    dispatch(resetMovies());
    dispatch(fetchMoviesData(1));
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
        dispatch(fetchMoviesData(page)); // fetch next page
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, loading, hasMore, page]);

  return (
    <div className="container py-4">
      <h2 className="text-light text-center mb-3">Trending Movies</h2>

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

export default HomePage;
