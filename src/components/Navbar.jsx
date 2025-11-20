import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault;
    if(searchResults.trim().length === 0){
      return;
    }

    navigate(`search/${searchResults}`);
    setSearchResults("");

  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 py-2">
      <div className="container-fluid">

        {/* Brand */}
        
        <Link className="navbar-brand fw-bold text-light" to="/"><h3>🎬MovieDB</h3></Link>
        
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Left Links + Right Search */}
        <div className="collapse navbar-collapse" id="navbarNav">

          {/* LEFT SIDE NAV LINKS */}
          <ul className="navbar-nav me-auto gap-2">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/movie/popular">Popular</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/movie/top_rated">Top Rated</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/movie/upcoming">Upcoming</Link>
            </li>
          </ul>

          {/* RIGHT SEARCH BAR */}
          <form
            className="d-flex"
            role="search"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search movies..."
              value={searchResults}
              onChange={(e)=>setSearchResults(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
