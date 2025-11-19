import { useDispatch, useSelector } from "react-redux";
import { fetchUpcomingMoviesData } from "../store/upcomingMoviesSlice";
import { useEffect } from "react";
import MovieList from "../components/MovieList";

const Upcoming = () => {
  const dispatch = useDispatch();
  const { movies, loading, error, page, hasMore } = useSelector(
    (state) => state.upcoming
  );

  useEffect(() => {
    dispatch(fetchUpcomingMoviesData(1));
  }, [dispatch]);

  // Infinite Scroll Effect
  useEffect(() => {
    let isThrottled = false;

    const handleScroll = () => {
      if (isThrottled) return;

      isThrottled = true;
      setTimeout(() => (isThrottled = false), 300); // throttle delay

      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 200 &&
        !loading &&
        hasMore
      ) {
        dispatch(fetchUpcomingMoviesData(page));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, loading, hasMore, page]);

  return (
    <div className="container py-4">
      <h2 className="text-light mb-3">Upcoming Movies</h2>

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

export default Upcoming;
