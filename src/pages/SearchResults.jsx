import MovieList from "../components/MovieList";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSearchMovies } from "../store/searchSlice";
import { useEffect } from "react";

const SearchResults = () => {
  const dispatch = useDispatch();
  const { query } = useParams();

  const { page, results, loading, error, hasMore } = useSelector(
    (state) => state.search
  );

  // Fetch first results OR fetch new page
  useEffect(() => {
    if (query) {
      dispatch(fetchSearchMovies(query, page));
    }
  }, [dispatch, page, query]);

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.offsetHeight - 200 &&
        !loading &&
        hasMore
      ) {
        dispatch(fetchSearchMovies(query, page));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, loading, hasMore, page, query]);

  return (
    <div className="container mt-4">

      {/* PAGE TITLE */}
      <h2 className="mb-4 text-light">
        Search Results for: <span className="text-info">"{query}"</span>
      </h2>

      {/* ERROR UI */}
      {error && <p className="text-danger">{error}</p>}

      {/* MOVIES LIST */}
      <MovieList movies={results} />

      {/* LOADING UI */}
      {loading && (
        <div className="text-center mt-4">
          <p className="text-light">Loading...</p>
        </div>
      )}

      {/* NO MORE DATA */}
      {!hasMore && (
        <p className="text-center text-secondary mt-4">
          No more results available
        </p>
      )}
    </div>
  );
};

export default SearchResults;
