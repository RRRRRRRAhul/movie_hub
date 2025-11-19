import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesDataById } from "../store/movieDetailSlice";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { movie, loading, error } = useSelector((state) => state.movieDetail);

  useEffect(() => {
    dispatch(fetchMoviesDataById(id));
  }, [dispatch, id]);

  if (loading || !movie) {
    return <h2 className="text-light">Loading movie details...</h2>;
  }

  if (error) {
    return <h2 className="text-danger">{error}</h2>;
  }

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="container py-4 text-light">
      <div className="row">
        <div className="col-md-4">
          <img
            src={imageUrl}
            alt={movie.title}
            className="img-fluid rounded shadow"
          />
        </div>

        <div className="col-md-8">
          <h2>{movie.title}</h2>

          <p className="text-warning fw-bold">⭐ {movie.rating}</p>

          <p>
            <strong>Release Date:</strong> {movie.releaseDate}
          </p>

          <p>
            <strong>Runtime:</strong> {movie.runtime} mins
          </p>

          {/* ⭐ FIXED GENRES SECTION */}
          <p>
            <strong>Genres:</strong>
          </p>

          <div className="d-flex flex-wrap gap-2 mb-3">
            {movie.genres.map((genre) => (
              <Link
                key={genre.id}
                to={`/movie/genre/${genre.id}/${genre.name}`} // correct id
                className="btn btn-sm btn-outline-warning rounded-pill px-3 text-decoration-none"
              >
                {genre.name} {/* correct name */}
              </Link>
            ))}
          </div>

          <h5 className="mt-3">Overview</h5>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
