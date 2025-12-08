import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { fetchFromApi } from "../services/api";


const Navbar = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const [searchResults, setSearchResults] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // ✅ Fetch suggestions with debounce
  useEffect(() => {
    if (searchResults.trim().length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      const data = await fetchFromApi(`/search/movie?query=${searchResults}`);
      setSuggestions(data.results.slice(0, 5));
      setShowSuggestions(true);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchResults]);

  // ✅ Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (movieId) => {
    navigate(`/movie/${movieId}`);
    setSearchResults("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchResults.trim().length === 0) return;

    navigate(`/search/${searchResults}`);
    setSearchResults("");
    setShowSuggestions(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 py-2">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand fw-bold text-light" to="/">
          <h3>🎬MovieDB</h3>
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* LEFT LINKS */}
          <ul className="navbar-nav me-auto gap-2">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/movie/popular">
                Popular
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/movie/top_rated">
                Top Rated
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/movie/upcoming">
                Upcoming
              </Link>
            </li>
          </ul>

          {/* RIGHT SEARCH + SUGGESTIONS */}
          <div className="position-relative" ref={searchRef}>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control me-2"
                placeholder="Search movies..."
                value={searchResults}
                onChange={(e) => setSearchResults(e.target.value)}
                onFocus={() =>
                  suggestions.length > 0 && setShowSuggestions(true)
                }
              />
              <button className="btn btn-outline-light" type="submit">
                Search
              </button>
            </form>

            {/* ✅ Suggestion Box */}
            {showSuggestions && suggestions.length > 0 && (
              <ul
                className="list-group position-absolute w-100 mt-1 shadow"
                style={{ zIndex: 1000 }}
              >
                {suggestions.map((movie) => (
                  <li
                    key={movie.id}
                    className="list-group-item list-group-item-action"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSuggestionClick(movie.id)}
                  >
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                          : "https://via.placeholder.com/60x90?text=No+Image"
                      }
                      alt={movie.title}
                      style={{
                        width: "45px",
                        height: "65px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                    <div className="d-flex flex-column">
                      <span className="fw-semibold">{movie.title}</span>
                      <small className="text-muted">
                        {movie.release_date
                          ? movie.release_date.slice(0, 4)
                          : "Unknown Year"}
                      </small>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
