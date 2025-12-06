import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesDataById } from "../store/movieDetailSlice";
import { fetchCastaandCrewByMovieId } from "../store/castAndCrewSlice";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { movie, loading, error } = useSelector((state) => state.movieDetail);
  const { cast, crew, cdloading, cderror } = useSelector(
    (state) => state.castAndCrew
  );
  const director = crew.find((person) => person.job === "Director");
  const topCast = cast.slice(0, 20);

  useEffect(() => {
    dispatch(fetchMoviesDataById(id));
    dispatch(fetchCastaandCrewByMovieId(id));
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

          <hr />

          {/* 🎬 Director */}
          {director && (
            <div className="mt-5 d-flex align-items-center gap-3">
              <img
                src={
                  director.profile_path
                    ? `https://image.tmdb.org/t/p/w185${director.profile_path}`
                    : "https://via.placeholder.com/80x120?text=No+Image"
                }
                alt={director.name}
                className="rounded shadow-sm"
                style={{ width: "80px", height: "120px", objectFit: "cover" }}
              />

              <h3 className="mb-0">
                <b>Director:</b> {director.name}
              </h3>
            </div>
          )}

          {/* 🎭 Cast Section */}
          <h4 className="mt-4">Top Cast</h4>

          {cdloading && <p>Loading cast...</p>}
          {cderror && <p className="text-danger">{cderror}</p>}

          <div className="row mt-2">
            {topCast.map((actor) => (
              <div key={actor.id} className="col-6 col-md-3 col-lg-2 mb-3">
                <div className="text-center">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "https://via.placeholder.com/185x278?text=No+Image"
                    }
                    alt={actor.name}
                    className="img-fluid rounded shadow-sm"
                  />
                  <p className="mt-2 mb-0 fw-bold">{actor.name}</p>
                  <small className="text-muted">{actor.character}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
