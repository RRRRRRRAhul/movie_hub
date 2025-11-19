import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg px-3"
      style={{ background: "#0d1b2a", boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}
    >
      <Link className="navbar-brand text-light fw-bold fs-4" to={"/"}>
        🎬 MovieHub
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto gap-2">
          <li className="nav-item">
            <Link className="nav-link text-light" to={"/"}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to={"/movie/popular"}>
              Popular
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to={"/movie/top_rated"}>
              Top Rated
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to={"/movie/upcoming"}>
              Upcoming
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
